"""
LLM API Service for Question Generation
Generates structured MCQ questions using LLM backends
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
import time
import threading
import requests as http_requests
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List, Optional
import json

from metrics_logger import (
    append_metric,
    log_generation,
    log_hardware_once,
)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
LLM_BACKEND = os.getenv('LLM_BACKEND', 'openai')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
GEMINI_API_KEY = os.getenv('GEMINI_API_KEY', '')
LOCAL_LLM_URL = os.getenv('LOCAL_LLM_URL', 'http://localhost:11434')  # Ollama default
MAX_QUESTIONS = int(os.getenv('MAX_QUESTIONS', '20'))
DEFAULT_LANGUAGE = os.getenv('DEFAULT_LANGUAGE', 'en')
LOCAL_LLM_TIMEOUT = int(os.getenv('LOCAL_LLM_TIMEOUT', '1200'))
MAX_LESSON_CONTEXT_CHARS = int(os.getenv('MAX_LESSON_CONTEXT_CHARS', '12000'))
LOCAL_GEN_BATCH_SIZE = int(os.getenv('LOCAL_GENERATION_BATCH_SIZE', '3'))
WEBHOOK_TIMEOUT = int(os.getenv('WEBHOOK_TIMEOUT', '30'))
# Optional: comma-separated list of Ollama models to pre-pull on startup
OLLAMA_PRELOAD_MODELS = os.getenv('OLLAMA_PRELOAD_MODELS', '').strip()
OLLAMA_MODEL_DEFAULT = os.getenv('OLLAMA_MODEL', 'deepseek-coder:latest')

log_hardware_once(LOCAL_LLM_URL, OLLAMA_MODEL_DEFAULT, LLM_BACKEND)


class QuestionRequest(BaseModel):
    topic: str = Field(..., description="Topic for question generation")
    level: str = Field(default="medium", description="Difficulty level: easy, medium, hard")
    n_questions: int = Field(default=1, ge=1, le=MAX_QUESTIONS, description="Number of questions")
    language: str = Field(default=DEFAULT_LANGUAGE, description="Language code: en, km")
    bloom_level: Optional[str] = Field(default=None, description="Bloom's taxonomy level")
    context: Optional[str] = Field(default=None, description="Optional lesson material to base questions on")
    backend: Optional[str] = Field(default=None, description="LLM backend: openai, gemini, local")
    model: Optional[str] = Field(default=None, description="Override model name for local backend")
    openai_api_key: Optional[str] = Field(default=None, description="Per-request OpenAI API key override")
    gemini_api_key: Optional[str] = Field(default=None, description="Per-request Gemini API key override")


class Choice(BaseModel):
    text: str
    is_correct: bool


class Question(BaseModel):
    question: str
    choices: List[Choice]
    correct_index: int
    difficulty: str
    bloom_level: str
    explanation: Optional[str] = None


class QuestionResponse(BaseModel):
    questions: List[Question]
    metadata: dict


class AsyncGenerateRequest(QuestionRequest):
    request_uuid: str = Field(..., description="Job id shared with Moodle")
    webhook_url: str = Field(..., description="Moodle callback URL when generation finishes")
    webhook_token: str = Field(..., description="Shared secret for webhook auth")


def _preload_ollama_models():
    """
    Optionally pre-pull a set of Ollama models on startup.
    Controlled via OLLAMA_PRELOAD_MODELS env var (comma-separated list).
    """
    if not OLLAMA_PRELOAD_MODELS:
        return
    if not LOCAL_LLM_URL:
        logger.warning("OLLAMA_PRELOAD_MODELS is set but LOCAL_LLM_URL is empty; skipping preload.")
        return

    models = [m.strip() for m in OLLAMA_PRELOAD_MODELS.split(',') if m.strip()]
    if not models:
        return

    try:
        import requests
        logger.info(f"Preloading Ollama models: {models}")

        # Get currently available models
        try:
            resp = requests.get(f"{LOCAL_LLM_URL}/api/tags", timeout=15)
            resp.raise_for_status()
            tags = resp.json().get('models', []) or []
            existing = {m.get('name') or m.get('model') for m in tags}
        except Exception as e:
            logger.warning(f"Could not list existing Ollama models at {LOCAL_LLM_URL}: {e}")
            existing = set()

        # Pull any missing models
        for model in models:
            if model in existing:
                logger.info(f"Ollama model already present: {model}")
                continue
            try:
                logger.info(f"Pre-pulling Ollama model: {model}")
                pull_resp = requests.post(
                    f"{LOCAL_LLM_URL}/api/pull",
                    json={"model": model, "stream": False},
                    timeout=1800,  # up to 30 minutes for large models
                )
                if pull_resp.status_code != 200:
                    logger.error(
                        "Failed to pull Ollama model %s: %s %s",
                        model,
                        pull_resp.status_code,
                        pull_resp.text[:200],
                    )
                else:
                    logger.info(f"Successfully pulled Ollama model: {model}")
            except Exception as e:
                logger.error(f"Error while pulling Ollama model {model}: {e}")
    except Exception as e:
        logger.error(f"Error during Ollama preload: {e}", exc_info=True)


def format_lesson_context(context: Optional[str]) -> str:
    """Format optional pasted lesson text for inclusion in generation prompts."""
    if not context or not str(context).strip():
        return ''
    text = str(context).strip()
    if len(text) > MAX_LESSON_CONTEXT_CHARS:
        text = text[:MAX_LESSON_CONTEXT_CHARS] + "\n[... lesson truncated for length ...]"
    return (
        "\n- Base questions primarily on the following lesson material "
        "(stay faithful to the content; do not invent facts beyond it):\n"
        "---\n"
        f"{text}\n"
        "---\n"
    )


def generate_with_openai(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str], api_key_override: Optional[str] = None) -> List[Question]:
    """Generate questions using OpenAI API"""
    try:
        from openai import OpenAI
        
        # Initialize client with just the API key
        # OpenAI library 2.x+ uses simple initialization
        api_key = api_key_override or OPENAI_API_KEY
        client = OpenAI(api_key=api_key)
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{format_lesson_context(context)}

For each question, provide:
1. A clear question text
2. Exactly 4 answer choices (only one correct)
3. The index (0-3) of the correct answer
4. A brief explanation

CRITICAL: Return ONLY valid JSON array. No markdown, no code blocks, no explanations outside JSON.

Format as JSON array:
[
  {{
    "question": "Question text",
    "choices": [
      {{"text": "Choice 1", "is_correct": true}},
      {{"text": "Choice 2", "is_correct": false}},
      {{"text": "Choice 3", "is_correct": false}},
      {{"text": "Choice 4", "is_correct": false}}
    ],
    "correct_index": 0,
    "difficulty": "{level}",
    "bloom_level": "{bloom_level or 'comprehension'}",
    "explanation": "Brief explanation"
  }}
]

IMPORTANT: 
- Ensure all strings are properly escaped
- No trailing commas
- Valid JSON syntax only
- Return the array directly, nothing else."""

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are an expert educational content generator. Always return valid JSON."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.7,
            max_tokens=2000
        )
        
        content = response.choices[0].message.content.strip()
        # Remove markdown code blocks if present
        if content.startswith("```"):
            content = content.split("```")[1]
            if content.startswith("json"):
                content = content[4:]
        content = content.strip()
        
        questions_data = json.loads(content)
        questions = []
        
        for q_data in questions_data:
            correct_index = None
            choices_list = []
            for idx, choice_data in enumerate(q_data['choices']):
                choices_list.append(Choice(**choice_data))
                if choice_data.get('is_correct'):
                    correct_index = idx
            
            if correct_index is None:
                correct_index = q_data.get('correct_index', 0)
            
            questions.append(Question(
                question=q_data['question'],
                choices=choices_list,
                correct_index=correct_index,
                difficulty=q_data.get('difficulty', level),
                bloom_level=q_data.get('bloom_level', bloom_level or 'comprehension'),
                explanation=q_data.get('explanation')
            ))
        
        return questions
        
    except Exception as e:
        raise Exception(f"OpenAI generation error: {str(e)}")


def generate_with_gemini(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str], api_key_override: Optional[str] = None) -> List[Question]:
    """Generate questions using Google Gemini API"""
    try:
        import google.generativeai as genai
        
        effective_api_key = api_key_override or GEMINI_API_KEY
        if not effective_api_key:
            raise Exception("Gemini API key not configured")
        
        genai.configure(api_key=effective_api_key)
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{format_lesson_context(context)}

For each question, provide:
1. A clear question text
2. Exactly 4 answer choices (only one correct)
3. The index (0-3) of the correct answer
4. A brief explanation

CRITICAL: Return ONLY valid JSON array. No markdown, no code blocks, no explanations outside JSON.

Format as JSON array:
[
  {{
    "question": "Question text",
    "choices": [
      {{"text": "Choice 1", "is_correct": true}},
      {{"text": "Choice 2", "is_correct": false}},
      {{"text": "Choice 3", "is_correct": false}},
      {{"text": "Choice 4", "is_correct": false}}
    ],
    "correct_index": 0,
    "difficulty": "{level}",
    "bloom_level": "{bloom_level or 'comprehension'}",
    "explanation": "Brief explanation"
  }}
]

IMPORTANT: 
- Ensure all strings are properly escaped
- No trailing commas
- Valid JSON syntax only
- Return the array directly, nothing else."""
        
        response = model.generate_content(prompt)
        content = response.text.strip()
        
        # Remove markdown code blocks if present
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
            content = content.strip()
        
        questions_data = json.loads(content)
        questions = []
        
        for q_data in questions_data:
            choices = [Choice(text=choice['text'], is_correct=choice['is_correct']) 
                      for choice in q_data['choices']]
            question = Question(
                question=q_data['question'],
                choices=choices,
                correct_index=q_data['correct_index'],
                difficulty=q_data.get('difficulty', level),
                bloom_level=q_data.get('bloom_level', bloom_level or 'comprehension'),
                explanation=q_data.get('explanation')
            )
            questions.append(question)
        
        return questions
        
    except Exception as e:
        raise Exception(f"Gemini generation error: {str(e)}")


def generate_with_local_llm(topic: str, level: str, n_questions: int, language: str,
                            bloom_level: Optional[str], context: Optional[str],
                            model: Optional[str] = None) -> List[Question]:
    """Generate questions using local LLM (Ollama)"""
    try:
        import requests
        
        ollama_model = model or os.getenv('OLLAMA_MODEL', 'deepseek-coder:latest')
        logger.info(f"Connecting to Ollama at {LOCAL_LLM_URL} with model {ollama_model}")
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{format_lesson_context(context)}

For each question, provide:
1. A clear question text
2. Exactly 4 answer choices (only one correct)
3. The index (0-3) of the correct answer
4. A brief explanation

CRITICAL: Return ONLY valid JSON array. No markdown, no code blocks, no explanations outside JSON.

Format as JSON array:
[
  {{
    "question": "Question text",
    "choices": [
      {{"text": "Choice 1", "is_correct": true}},
      {{"text": "Choice 2", "is_correct": false}},
      {{"text": "Choice 3", "is_correct": false}},
      {{"text": "Choice 4", "is_correct": false}}
    ],
    "correct_index": 0,
    "difficulty": "{level}",
    "bloom_level": "{bloom_level or 'comprehension'}",
    "explanation": "Brief explanation"
  }}
]

IMPORTANT: 
- Ensure all strings are properly escaped
- No trailing commas
- Valid JSON syntax only
- Return the array directly, nothing else."""
        
        # Use Ollama API
        response = requests.post(
            f"{LOCAL_LLM_URL}/api/generate",
            json={
                "model": ollama_model,
                "prompt": prompt,
                "stream": False
            },
            timeout=LOCAL_LLM_TIMEOUT
        )
        
        if response.status_code != 200:
            error_detail = response.text if hasattr(response, 'text') else 'Unknown error'
            logger.error(f"Ollama API error: {response.status_code} - {error_detail}")
            raise Exception(f"Local LLM API error: {response.status_code} - {error_detail}")
        
        logger.info("Successfully received response from Ollama")
        
        result = response.json()
        content = result.get('response', '').strip()
        
        # Remove markdown code blocks if present
        if content.startswith('```'):
            content = content.split('```')[1]
            if content.startswith('json'):
                content = content[4:]
            content = content.strip()
        
        # Try to extract JSON from the response if it contains extra text
        # Look for JSON array or object patterns
        import re
        json_match = re.search(r'(\[[\s\S]*\]|\{[\s\S]*\})', content)
        if json_match:
            content = json_match.group(1)
        
        # Try to parse JSON with better error handling
        try:
            questions_data = json.loads(content)
        except json.JSONDecodeError as e:
            # Try to fix common JSON issues
            # Remove trailing commas before closing brackets/braces
            content = re.sub(r',\s*}', '}', content)
            content = re.sub(r',\s*]', ']', content)
            # Fix unescaped quotes in strings (basic attempt)
            # Remove any text before first [ or {
            content = re.sub(r'^[^[{]*', '', content)
            # Remove any text after last ] or }
            content = re.sub(r'[^}\]]*$', '', content)
            # Try parsing again
            try:
                questions_data = json.loads(content)
            except json.JSONDecodeError as e2:
                # Try to extract just the array/object part more aggressively
                # Find the first complete JSON structure
                bracket_count = 0
                brace_count = 0
                start_idx = -1
                for i, char in enumerate(content):
                    if char in '[{':
                        if start_idx == -1:
                            start_idx = i
                        if char == '[':
                            bracket_count += 1
                        else:
                            brace_count += 1
                    elif char in ']}':
                        if char == ']':
                            bracket_count -= 1
                        else:
                            brace_count -= 1
                        if start_idx != -1 and bracket_count == 0 and brace_count == 0:
                            # Found complete structure
                            content = content[start_idx:i+1]
                            try:
                                questions_data = json.loads(content)
                                break
                            except:
                                pass
                
                # Final attempt
                try:
                    questions_data = json.loads(content)
                except json.JSONDecodeError as e3:
                    # Log the problematic content for debugging
                    error_msg = f"Invalid JSON from LLM: {str(e3)}. Position: line {e3.lineno}, col {e3.colno}. Response preview: {content[max(0, e3.pos-100):e3.pos+100]}"
                    raise Exception(error_msg)
        
        # Handle both single object and array responses
        if not isinstance(questions_data, list):
            questions_data = [questions_data]
        
        questions = []
        
        for q_data in questions_data:
            choices = [Choice(text=choice['text'], is_correct=choice['is_correct']) 
                      for choice in q_data['choices']]
            question = Question(
                question=q_data['question'],
                choices=choices,
                correct_index=q_data['correct_index'],
                difficulty=q_data.get('difficulty', level),
                bloom_level=q_data.get('bloom_level', bloom_level or 'comprehension'),
                explanation=q_data.get('explanation')
            )
            questions.append(question)
        
        logger.info(f"Successfully generated {len(questions)} questions")
        return questions
        
    except requests.exceptions.ConnectionError as e:
        error_msg = f"Cannot connect to Ollama at {LOCAL_LLM_URL}. Make sure Ollama is running and accessible from Docker container."
        logger.error(error_msg)
        raise Exception(f"Local LLM generation error: {error_msg} - {str(e)}")
    except requests.exceptions.Timeout as e:
        error_msg = f"Ollama request timed out after {LOCAL_LLM_TIMEOUT} seconds"
        logger.error(error_msg)
        raise Exception(f"Local LLM generation error: {error_msg}")
    except Exception as e:
        logger.error(f"Local LLM generation error: {str(e)}", exc_info=True)
        raise Exception(f"Local LLM generation error: {str(e)}")


@app.route('/health', methods=['GET'])
def health():
    """Health check endpoint"""
    return jsonify({
        'status': 'healthy',
        'backend': LLM_BACKEND,
        'service': 'llmapi'
    }), 200


@app.route('/models/ollama', methods=['GET'])
def list_ollama_models():
    """List models available in local Ollama."""
    try:
        import requests
        resp = requests.get(f"{LOCAL_LLM_URL}/api/tags", timeout=10)
        resp.raise_for_status()
        return jsonify(resp.json()), 200
    except Exception as e:
        logger.error(f"Error listing Ollama models: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500


@app.route('/models/ollama/pull', methods=['POST'])
def pull_ollama_model():
    """Trigger download (pull) of a specific Ollama model on demand."""
    try:
        import requests
        data = request.get_json(force=True, silent=True) or {}
        model = data.get('model')
        stream = bool(data.get('stream', False))

        if not model:
            return jsonify({'error': "Missing 'model' in request body"}), 400

        logger.info(f"Pulling Ollama model on demand: {model} (stream={stream})")
        resp = requests.post(
            f"{LOCAL_LLM_URL}/api/pull",
            json={"model": model, "stream": stream},
            timeout=1800,  # up to 30 minutes
            stream=stream,
        )

        # If streaming, proxy chunks back to client.
        if stream:
            def generate():
                try:
                    for chunk in resp.iter_content(chunk_size=None):
                        if chunk:
                            yield chunk
                except Exception as e:
                    logger.error(f"Error streaming Ollama pull for {model}: {e}", exc_info=True)
            return app.response_class(generate(), status=resp.status_code, mimetype='application/x-ndjson')

        # Non-streaming: just return JSON/text
        try:
            resp.raise_for_status()
        except Exception:
            logger.error(
                "Failed to pull Ollama model %s: %s %s",
                model,
                resp.status_code,
                getattr(resp, 'text', '')[:200],
            )
            return jsonify({'error': f"Failed to pull model {model}", 'status': resp.status_code, 'detail': resp.text}), resp.status_code

        # Try to pass through JSON if possible
        try:
            return jsonify(resp.json()), resp.status_code
        except Exception:
            return jsonify({'status': 'ok', 'detail': resp.text}), resp.status_code

    except Exception as e:
        logger.error(f"Error pulling Ollama model: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500


def execute_generation(req: QuestionRequest) -> List[Question]:
    """Run generation for one request (batched for slow local models)."""
    backend = req.backend or LLM_BACKEND
    if backend == 'local' and req.n_questions > LOCAL_GEN_BATCH_SIZE:
        all_questions: List[Question] = []
        remaining = req.n_questions
        batch_num = 0
        batch_total = (req.n_questions + LOCAL_GEN_BATCH_SIZE - 1) // LOCAL_GEN_BATCH_SIZE
        while remaining > 0:
            batch_num += 1
            n = min(LOCAL_GEN_BATCH_SIZE, remaining)
            logger.info(
                "LLM batch %s/%s n=%s",
                batch_num,
                batch_total,
                n,
            )
            batch_start = time.time()
            batch_req = req.model_copy(update={'n_questions': n})
            batch_questions = execute_generation_single(batch_req)
            batch_ms = int((time.time() - batch_start) * 1000)
            log_generation(
                request_uuid=getattr(req, 'request_uuid', '') or f"sync-batch-{batch_num}",
                mode='sync_batch',
                backend=backend,
                model=getattr(req, 'model', None) or OLLAMA_MODEL_DEFAULT,
                topic=req.topic,
                level=req.level,
                language=req.language,
                n_questions_requested=n,
                n_questions_generated=len(batch_questions),
                duration_ms=batch_ms,
                status='success',
                batch_index=batch_num,
                batch_total=batch_total,
                has_lesson_context=bool(req.context),
            )
            all_questions.extend(batch_questions)
            remaining -= n
        return all_questions
    return execute_generation_single(req)


def execute_generation_single(req: QuestionRequest) -> List[Question]:
    backend = req.backend or LLM_BACKEND
    if backend == 'openai':
        effective_openai_key = req.openai_api_key or OPENAI_API_KEY
        if not effective_openai_key:
            raise ValueError('OpenAI API key not configured')
        return generate_with_openai(
            req.topic, req.level, req.n_questions,
            req.language, req.bloom_level, req.context,
            api_key_override=req.openai_api_key,
        )
    if backend == 'gemini':
        effective_gemini_key = req.gemini_api_key or GEMINI_API_KEY
        if not effective_gemini_key:
            raise ValueError('Gemini API key not configured')
        return generate_with_gemini(
            req.topic, req.level, req.n_questions,
            req.language, req.bloom_level, req.context,
            api_key_override=req.gemini_api_key,
        )
    if backend == 'local':
        return generate_with_local_llm(
            req.topic, req.level, req.n_questions,
            req.language, req.bloom_level, req.context,
            model=req.model,
        )
    raise ValueError(f'Unknown backend: {backend}')


def post_moodle_webhook(webhook_url: str, webhook_token: str, body: dict) -> None:
    """POST status/result to Moodle complete_generation_job.php."""
    headers = {
        'Content-Type': 'application/json',
        'X-Worker-Token': webhook_token,
    }
    logger.info(
        "Webhook → Moodle status=%s request_uuid=%s",
        body.get('status'),
        body.get('request_uuid'),
    )
    resp = http_requests.post(
        webhook_url,
        json=body,
        headers=headers,
        timeout=WEBHOOK_TIMEOUT,
    )
    if resp.status_code >= 400:
        raise RuntimeError(f'Moodle webhook HTTP {resp.status_code}: {resp.text[:300]}')
    data = resp.json()
    if data.get('success') is False:
        raise RuntimeError(data.get('error') or 'Moodle webhook reported failure')


def _async_generation_worker(payload: dict) -> None:
    """Background thread: generate questions and webhook Moodle."""
    request_uuid = payload['request_uuid']
    webhook_url = payload['webhook_url']
    webhook_token = payload['webhook_token']
    gen_start = time.time()

    try:
        req = QuestionRequest(**{k: v for k, v in payload.items() if k in QuestionRequest.model_fields})
        backend = req.backend or LLM_BACKEND

        post_moodle_webhook(webhook_url, webhook_token, {
            'request_uuid': request_uuid,
            'status': 'processing',
        })

        logger.info(
            "LLM async START request_uuid=%s backend=%s n=%s topic=%r",
            request_uuid,
            backend,
            req.n_questions,
            (req.topic or '')[:80],
        )

        questions = execute_generation(req)
        duration_ms = int((time.time() - gen_start) * 1000)

        log_generation(
            request_uuid=request_uuid,
            mode='async',
            backend=backend,
            model=payload.get('model') or OLLAMA_MODEL_DEFAULT,
            topic=req.topic,
            level=req.level,
            language=req.language,
            n_questions_requested=req.n_questions,
            n_questions_generated=len(questions),
            duration_ms=duration_ms,
            status='success',
            has_lesson_context=bool(req.context),
        )

        question_payload = []
        for q in questions:
            question_payload.append({
                'question': q.question,
                'choices': [{'text': c.text, 'is_correct': c.is_correct} for c in q.choices],
                'correct_index': q.correct_index,
                'difficulty': q.difficulty,
                'bloom_level': q.bloom_level,
                'explanation': q.explanation,
            })

        post_moodle_webhook(webhook_url, webhook_token, {
            'request_uuid': request_uuid,
            'status': 'success',
            'questions': question_payload,
            'generated_count': len(question_payload),
            'duration_ms': duration_ms,
        })

        logger.info(
            "LLM async END request_uuid=%s count=%s duration=%.2fs",
            request_uuid,
            len(question_payload),
            duration_ms / 1000.0,
        )
    except Exception as e:
        duration_ms = int((time.time() - gen_start) * 1000)
        try:
            req = QuestionRequest(**{k: v for k, v in payload.items() if k in QuestionRequest.model_fields})
            log_generation(
                request_uuid=request_uuid,
                mode='async',
                backend=req.backend or LLM_BACKEND,
                model=payload.get('model') or OLLAMA_MODEL_DEFAULT,
                topic=req.topic,
                level=req.level,
                language=req.language,
                n_questions_requested=req.n_questions,
                n_questions_generated=0,
                duration_ms=duration_ms,
                status='error',
                error_message=str(e),
                has_lesson_context=bool(req.context),
            )
        except Exception:
            pass
        logger.error("LLM async FAIL request_uuid=%s: %s", request_uuid, e, exc_info=True)
        try:
            post_moodle_webhook(webhook_url, webhook_token, {
                'request_uuid': request_uuid,
                'status': 'error',
                'error_message': str(e),
                'duration_ms': duration_ms,
            })
        except Exception as webhook_err:
            logger.error(
                "Failed to send error webhook for %s: %s",
                request_uuid,
                webhook_err,
            )


@app.route('/generate/async', methods=['POST'])
def generate_questions_async():
    """Accept generation job and process in background; webhook Moodle when done."""
    try:
        data = request.json or {}
        async_req = AsyncGenerateRequest(**data)
        thread = threading.Thread(
            target=_async_generation_worker,
            args=(data,),
            daemon=True,
        )
        thread.start()
        logger.info(
            "LLM async ACCEPTED request_uuid=%s webhook=%s",
            async_req.request_uuid,
            async_req.webhook_url,
        )
        return jsonify({
            'status': 'accepted',
            'request_uuid': async_req.request_uuid,
            'message': 'Generation started; results will be sent via webhook',
        }), 202
    except Exception as e:
        logger.error(f"Error accepting async generation: {e}", exc_info=True)
        return jsonify({'error': str(e)}), 500


@app.route('/generate', methods=['POST'])
def generate_questions():
    """Generate MCQ questions (synchronous)."""
    try:
        data = request.json
        req = QuestionRequest(**data)

        backend = req.backend or LLM_BACKEND
        gen_start = time.time()
        logger.info(
            "LLM generate START backend=%s topic=%r n_questions=%s language=%s has_context=%s",
            backend,
            req.topic[:80] if req.topic else '',
            req.n_questions,
            req.language,
            bool(req.context),
        )

        questions = execute_generation(req)

        duration_s = time.time() - gen_start
        duration_ms = int(duration_s * 1000)
        log_generation(
            request_uuid=data.get('request_uuid', '') or f"sync-{int(gen_start)}",
            mode='sync',
            backend=backend,
            model=data.get('model') or OLLAMA_MODEL_DEFAULT,
            topic=req.topic,
            level=req.level,
            language=req.language,
            n_questions_requested=req.n_questions,
            n_questions_generated=len(questions),
            duration_ms=duration_ms,
            status='success',
            has_lesson_context=bool(req.context),
        )
        logger.info(
            "LLM generate END backend=%s count=%s duration=%.2fs",
            backend,
            len(questions),
            duration_s,
        )

        response = QuestionResponse(
            questions=questions,
            metadata={
                'topic': req.topic,
                'language': req.language,
                'count': len(questions),
                'backend': backend
            }
        )

        return jsonify(response.model_dump()), 200

    except Exception as e:
        logger.error(f"Error generating questions: {str(e)}", exc_info=True)
        try:
            data = request.json or {}
            req = QuestionRequest(**data)
            log_generation(
                request_uuid=data.get('request_uuid', '') or 'sync-error',
                mode='sync',
                backend=req.backend or LLM_BACKEND,
                model=data.get('model') or OLLAMA_MODEL_DEFAULT,
                topic=req.topic,
                level=req.level,
                language=req.language,
                n_questions_requested=req.n_questions,
                n_questions_generated=0,
                duration_ms=0,
                status='error',
                error_message=str(e),
                has_lesson_context=bool(req.context),
            )
        except Exception:
            pass
        return jsonify({'error': str(e)}), 500


@app.route('/validate', methods=['POST'])
def validate_question():
    """Validate question quality"""
    # Placeholder for question validation
    data = request.json
    return jsonify({
        'valid': True,
        'score': 0.85,
        'feedback': 'Question quality is good'
    }), 200


if __name__ == '__main__':
    _preload_ollama_models()
    port = int(os.getenv('FLASK_PORT', 5001))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('NODE_ENV') == 'development')

