# API Documentation

## LLM API Service

Base URL: `http://localhost:5001` (development) or `https://your-domain.com/api` (production)

### POST /generate

Generate multiple-choice questions.

**Request:**
```json
{
  "topic": "Photosynthesis",
  "level": "medium",
  "n_questions": 5,
  "language": "en",
  "bloom_level": "application",
  "context": "High school biology course"
}
```

**Parameters:**
- `topic` (string, required): Topic for question generation
- `level` (string, optional): Difficulty level - `easy`, `medium`, `hard` (default: `medium`)
- `n_questions` (integer, optional): Number of questions (1-10, default: 1)
- `language` (string, optional): Language code - `en`, `km` (default: `en`)
- `bloom_level` (string, optional): Bloom's taxonomy level
- `context` (string, optional): Additional context for generation

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
      "explanation": "Glucose is the main carbohydrate produced during photosynthesis."
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

**Status Codes:**
- `200`: Success
- `400`: Bad request (invalid parameters)
- `500`: Server error (LLM generation failed)

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "backend": "openai",
  "service": "llmapi"
}
```

### POST /validate

Validate question quality (placeholder).

**Request:**
```json
{
  "question": "Question text",
  "choices": ["A", "B", "C", "D"],
  "correct_index": 0
}
```

**Response:**
```json
{
  "valid": true,
  "score": 0.85,
  "feedback": "Question quality is good"
}
```

## WebSocket Server

Base URL: `ws://localhost:3001` (development) or `wss://your-domain.com` (production)

### Authentication

Connect with JWT token in `auth.token`:

```javascript
const socket = io('ws://localhost:3001', {
  auth: {
    token: 'jwt-token-here'
  }
});
```

JWT payload must contain:
- `user_id`: User identifier
- `session_id`: Session identifier
- `role`: `teacher` or `student`
- `exp`: Expiration timestamp

### Events

#### Client → Server

##### `teacher:create_session`

Create a new quiz session.

**Payload:**
```json
{}
```

**Emitted by:** Teacher

##### `teacher:push_question`

Broadcast a question to all students.

**Payload:**
```json
{
  "question": {
    "id": "q1",
    "text": "What is 2+2?",
    "choices": ["3", "4", "5", "6"],
    "correct_index": 1
  },
  "timer": 60,
  "questionNumber": 1
}
```

**Emitted by:** Teacher

##### `teacher:end_session`

End the quiz session.

**Payload:**
```json
{}
```

**Emitted by:** Teacher

##### `student:submit_answer`

Submit an answer to the current question.

**Payload:**
```json
{
  "questionId": "q1",
  "answerIndex": 1,
  "timeSpent": 5
}
```

**Emitted by:** Student

##### `leaderboard:get`

Request current leaderboard.

**Payload:**
```json
{}
```

**Emitted by:** Any

#### Server → Client

##### `session:joined`

Confirmation of joining session.

**Payload:**
```json
{
  "sessionId": "session_123",
  "role": "student"
}
```

##### `session:created`

Session created by teacher.

**Payload:**
```json
{
  "sessionId": "session_123",
  "teacherId": 1
}
```

##### `question:new`

New question broadcast.

**Payload:**
```json
{
  "question": {
    "id": "q1",
    "text": "What is 2+2?",
    "choices": ["3", "4", "5", "6"],
    "correct_index": 1
  },
  "timer": 60,
  "questionNumber": 1
}
```

##### `answer:result`

Result of submitted answer.

**Payload:**
```json
{
  "isCorrect": true,
  "score": 150,
  "correctAnswer": 1
}
```

##### `leaderboard:update`

Updated leaderboard.

**Payload:**
```json
{
  "leaderboard": [
    {"userId": "1", "score": 500},
    {"userId": "2", "score": 400}
  ],
  "questionId": "q1"
}
```

##### `timer:update`

Timer countdown update.

**Payload:**
```json
{
  "remaining": 45
}
```

##### `question:timeout`

Question timer expired.

**Payload:**
```json
{}
```

##### `session:ended`

Session ended with final results.

**Payload:**
```json
{
  "finalLeaderboard": [
    {"userId": "1", "score": 500},
    {"userId": "2", "score": 400}
  ]
}
```

##### `error`

Error message.

**Payload:**
```json
{
  "message": "Unauthorized"
}
```

## HTTP Endpoints (WebSocket Server)

### GET /health

Health check endpoint.

**Response:**
```json
{
  "status": "healthy",
  "service": "websocket-server"
}
```

## Moodle Plugin API

### JWT Token Generation

The plugin generates JWT tokens using the function:

```php
gamifiedquiz_generate_jwt($userid, $sessionid, $role)
```

**Parameters:**
- `$userid`: Moodle user ID
- `$sessionid`: Session identifier (format: `session_{quizid}_{cmid}`)
- `$role`: `teacher` or `student`

**Returns:** JWT token string

### Question Generation

```php
gamifiedquiz_generate_questions($topic, $level, $n_questions, $language)
```

**Parameters:**
- `$topic`: Topic string
- `$level`: Difficulty level (`easy`, `medium`, `hard`)
- `$n_questions`: Number of questions
- `$language`: Language code (`en`, `km`)

**Returns:** Array of question objects or `false` on error

## Error Handling

### LLM API Errors

- **400 Bad Request**: Invalid parameters
- **500 Internal Server Error**: LLM generation failed, API key invalid, etc.

Error response format:
```json
{
  "error": "Error message here"
}
```

### WebSocket Errors

Errors are emitted via `error` event:
```javascript
socket.on('error', (error) => {
  console.error('Error:', error.message);
});
```

Common errors:
- `Authentication error: No token provided`
- `Authentication error: Invalid token`
- `Unauthorized` (wrong role for action)

## Rate Limiting

Currently no rate limiting implemented. For production:
- LLM API: Implement rate limiting per IP/user
- WebSocket: Limit connections per user
- Moodle: Use Moodle's built-in rate limiting

## CORS

WebSocket server accepts connections from:
- Development: `http://localhost:8080`
- Production: Configured via `CORS_ORIGIN` environment variable

LLM API accepts requests from any origin (configure via Flask-CORS if needed).

