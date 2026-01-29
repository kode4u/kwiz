# LLM API Service

Python Flask service for generating AI-powered multiple-choice questions.

## Features

- Generate structured MCQ questions from topics
- Support for multiple LLM backends (OpenAI, local LLMs)
- Multi-language support (English, Khmer)
- Difficulty level adjustment
- Bloom's taxonomy classification
- JSON-structured output

## Quick Start

### Using Docker

```bash
docker-compose up llmapi
```

### Local Development

```bash
# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export LLM_BACKEND=openai
export OPENAI_API_KEY=your-key-here

# Run
python app.py
```

## API Endpoints

### `POST /generate`

Generate MCQ questions.

**Request:**
```json
{
  "topic": "Photosynthesis",
  "level": "medium",
  "n_questions": 3,
  "language": "en",
  "bloom_level": "application",
  "context": "High school biology course"
}
```

**Response:**
```json
{
  "questions": [
    {
      "question": "What is the primary product of photosynthesis?",
      "choices": [
        {"text": "Glucose", "is_correct": true},
        {"text": "Oxygen", "is_correct": false},
        {"text": "Carbon dioxide", "is_correct": false},
        {"text": "Water", "is_correct": false}
      ],
      "correct_index": 0,
      "difficulty": "medium",
      "bloom_level": "comprehension",
      "explanation": "Glucose is the main carbohydrate produced..."
    }
  ],
  "metadata": {
    "topic": "Photosynthesis",
    "language": "en",
    "count": 1,
    "backend": "openai"
  }
}
```

### `GET /health`

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "backend": "openai",
  "service": "llmapi"
}
```

## Configuration

Environment variables:

- `LLM_BACKEND`: Backend to use (`openai`, `local`, `ollama`)
- `OPENAI_API_KEY`: OpenAI API key (if using OpenAI)
- `MAX_QUESTIONS`: Maximum questions per request (default: 10)
- `DEFAULT_LANGUAGE`: Default language code (default: `en`)
- `FLASK_PORT`: Port to run on (default: 5001)

## Supported Backends

### OpenAI (Current)

Uses GPT-3.5-turbo or GPT-4 for question generation.

### Local LLM (Planned)

Integration with:
- Ollama
- llama.cpp
- Hugging Face models

## Development

### Adding a New Backend

1. Create a function `generate_with_<backend>(...)` that returns `List[Question]`
2. Add backend check in `/generate` endpoint
3. Update `LLM_BACKEND` environment variable

### Testing

```bash
# Test health endpoint
curl http://localhost:5001/health

# Test question generation
curl -X POST http://localhost:5001/generate \
  -H "Content-Type: application/json" \
  -d '{
    "topic": "Python programming",
    "level": "easy",
    "n_questions": 1
  }'
```

## Docker

Build image:
```bash
docker build -t jica-llmapi .
```

Run container:
```bash
docker run -p 5001:5001 \
  -e OPENAI_API_KEY=your-key \
  -e LLM_BACKEND=openai \
  jica-llmapi
```

