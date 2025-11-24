"""
LLM API Service for Question Generation
Generates structured MCQ questions using LLM backends
"""

from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from dotenv import load_dotenv
from pydantic import BaseModel, Field
from typing import List, Optional
import json

load_dotenv()

app = Flask(__name__)
CORS(app)

# Configuration
LLM_BACKEND = os.getenv('LLM_BACKEND', 'openai')
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY', '')
MAX_QUESTIONS = int(os.getenv('MAX_QUESTIONS', '10'))
DEFAULT_LANGUAGE = os.getenv('DEFAULT_LANGUAGE', 'en')


class QuestionRequest(BaseModel):
    topic: str = Field(..., description="Topic for question generation")
    level: str = Field(default="medium", description="Difficulty level: easy, medium, hard")
    n_questions: int = Field(default=1, ge=1, le=MAX_QUESTIONS, description="Number of questions")
    language: str = Field(default=DEFAULT_LANGUAGE, description="Language code: en, km")
    bloom_level: Optional[str] = Field(default=None, description="Bloom's taxonomy level")
    context: Optional[str] = Field(default=None, description="Additional context")


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
        
        # Initialize client
        # Note: If using a proxy service, you may need to set base_url
        # For standard OpenAI keys (starting with sk-), use default initialization
        if OPENAI_API_KEY.startswith('sk-'):
            # Standard OpenAI API key
            client = OpenAI(api_key=OPENAI_API_KEY)
        else:
            # Non-standard key format - might be proxy service
            # Try with default initialization first
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

Return ONLY valid JSON, no markdown formatting."""

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


def generate_with_local_llm(topic: str, level: str, n_questions: int, language: str, bloom_level: Optional[str], context: Optional[str]) -> List[Question]:
    """Generate questions using local LLM (Ollama, etc.)"""
    # Placeholder for local LLM integration
    # This would connect to Ollama, llama.cpp, or similar
    raise NotImplementedError("Local LLM backend not yet implemented. Use 'openai' backend.")


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
        
        # Generate questions based on backend
        if LLM_BACKEND == 'openai':
            if not OPENAI_API_KEY:
                return jsonify({'error': 'OpenAI API key not configured'}), 500
            questions = generate_with_openai(
                req.topic, req.level, req.n_questions, 
                req.language, req.bloom_level, req.context
            )
        elif LLM_BACKEND == 'local':
            questions = generate_with_local_llm(
                req.topic, req.level, req.n_questions,
                req.language, req.bloom_level, req.context
            )
        else:
            return jsonify({'error': f'Unknown backend: {LLM_BACKEND}'}), 400
        
        response = QuestionResponse(
            questions=questions,
            metadata={
                'topic': req.topic,
                'language': req.language,
                'count': len(questions),
                'backend': LLM_BACKEND
            }
        )
        
        return jsonify(response.dict()), 200
        
    except Exception as e:
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

