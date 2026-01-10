"""
LLM API Service for Question Generation
Generates structured MCQ questions using LLM backends
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import logging
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List, Optional
import json

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
MAX_QUESTIONS = int(os.getenv('MAX_QUESTIONS', '10'))
DEFAULT_LANGUAGE = os.getenv('DEFAULT_LANGUAGE', 'en')


class QuestionRequest(BaseModel):
    topic: str = Field(..., description="Topic for question generation")
    level: str = Field(default="medium", description="Difficulty level: easy, medium, hard")
    n_questions: int = Field(default=1, ge=1, le=MAX_QUESTIONS, description="Number of questions")
    language: str = Field(default=DEFAULT_LANGUAGE, description="Language code: en, km")
    bloom_level: Optional[str] = Field(default=None, description="Bloom's taxonomy level")
    context: Optional[str] = Field(default=None, description="Additional context")
    backend: Optional[str] = Field(default=None, description="LLM backend: openai, gemini, local")


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


def generate_with_openai(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str]) -> List[Question]:
    """Generate questions using OpenAI API"""
    try:
        from openai import OpenAI
        
        # Initialize client with just the API key
        # OpenAI library 2.x+ uses simple initialization
        client = OpenAI(api_key=OPENAI_API_KEY)
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{f'- Additional context: {context}' if context else ''}

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


def generate_with_gemini(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str]) -> List[Question]:
    """Generate questions using Google Gemini API"""
    try:
        import google.generativeai as genai
        
        if not GEMINI_API_KEY:
            raise Exception("Gemini API key not configured")
        
        genai.configure(api_key=GEMINI_API_KEY)
        model = genai.GenerativeModel('gemini-pro')
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{f'- Additional context: {context}' if context else ''}

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


def generate_with_local_llm(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str]) -> List[Question]:
    """Generate questions using local LLM (Ollama)"""
    try:
        import requests
        
        ollama_model = os.getenv('OLLAMA_MODEL', 'deepseek-coder:latest')
        logger.info(f"Connecting to Ollama at {LOCAL_LLM_URL} with model {ollama_model}")
        
        prompt = f"""Generate {n_questions} multiple-choice question(s) on the topic: "{topic}"

Requirements:
- Difficulty level: {level}
- Language: {language}
- Bloom's taxonomy level: {bloom_level or 'comprehension'}
{f'- Additional context: {context}' if context else ''}

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
            timeout=180  # Increased timeout for local LLMs
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
        error_msg = f"Ollama request timed out after 180 seconds"
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


@app.route('/generate', methods=['POST'])
def generate_questions():
    """Generate MCQ questions"""
    try:
        data = request.json
        req = QuestionRequest(**data)
        
        # Use backend from request, fallback to environment default
        backend = req.backend or LLM_BACKEND
        
        # Generate questions based on backend
        if backend == 'openai':
            if not OPENAI_API_KEY:
                return jsonify({'error': 'OpenAI API key not configured'}), 500
            questions = generate_with_openai(
                req.topic, req.level, req.n_questions, 
                req.language, req.bloom_level, req.context
            )
        elif backend == 'gemini':
            if not GEMINI_API_KEY:
                return jsonify({'error': 'Gemini API key not configured'}), 500
            questions = generate_with_gemini(
                req.topic, req.level, req.n_questions,
                req.language, req.bloom_level, req.context
            )
        elif backend == 'local':
            questions = generate_with_local_llm(
                req.topic, req.level, req.n_questions,
                req.language, req.bloom_level, req.context
            )
        else:
            return jsonify({'error': f'Unknown backend: {backend}'}), 400
        
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
    port = int(os.getenv('FLASK_PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=os.getenv('NODE_ENV') == 'development')

