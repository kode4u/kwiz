# WebSocket Server

Real-time WebSocket server for gamified Moodle quiz using Socket.IO.

## Features

- Real-time bidirectional communication
- Room/session management
- JWT authentication
- Leaderboard calculations
- Timer synchronization
- Redis integration for state management

## Quick Start

### Using Docker

```bash
docker-compose up websocket-server
```

### Local Development

```bash
# Install dependencies
npm install

# Set environment variables
export PORT=3001
export REDIS_URL=redis://localhost:6379
export JWT_SECRET=your-secret-key
export CORS_ORIGIN=http://localhost:8080

# Run
npm start

# Development mode (with auto-reload)
npm run dev
```

## Configuration

Environment variables:

- `PORT`: Server port (default: 3001)
- `REDIS_URL`: Redis connection URL (default: `redis://localhost:6379`)
- `JWT_SECRET`: Secret for JWT verification
- `CORS_ORIGIN`: Allowed CORS origin
- `NODE_ENV`: Environment (`development` or `production`)

## Socket Events

### Client → Server

#### Authentication
- Token provided in `auth.token` or `Authorization` header

#### Teacher Events
- `teacher:create_session` - Create a new quiz session
- `teacher:push_question` - Broadcast question to students
- `teacher:end_session` - End the quiz session

#### Student Events
- `student:submit_answer` - Submit answer to current question
- `leaderboard:get` - Request current leaderboard

### Server → Client

#### Session Events
- `session:joined` - Confirmation of joining session
- `session:created` - Session created by teacher
- `session:ended` - Session ended with final results

#### Question Events
- `question:new` - New question broadcast
- `question:timeout` - Question timer expired

#### Answer Events
- `answer:result` - Result of submitted answer

#### Leaderboard Events
- `leaderboard:update` - Updated leaderboard

#### Timer Events
- `timer:update` - Timer countdown update

## Example Usage

### Teacher Client

```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'jwt-token-from-moodle'
  }
});

// Create session
socket.emit('teacher:create_session', {});

// Push question
socket.emit('teacher:push_question', {
  question: {
    id: 'q1',
    text: 'What is 2+2?',
    choices: ['3', '4', '5', '6'],
    correct_index: 1
  },
  timer: 60,
  questionNumber: 1
});

// End session
socket.emit('teacher:end_session');
```

### Student Client

```javascript
const socket = io('http://localhost:3001', {
  auth: {
    token: 'jwt-token-from-moodle'
  }
});

// Listen for questions
socket.on('question:new', (data) => {
  console.log('New question:', data.question);
  console.log('Timer:', data.timer);
});

// Submit answer
socket.emit('student:submit_answer', {
  questionId: 'q1',
  answerIndex: 1,
  timeSpent: 5
});

// Listen for results
socket.on('answer:result', (data) => {
  console.log('Correct:', data.isCorrect);
  console.log('Score:', data.score);
});

// Listen for leaderboard
socket.on('leaderboard:update', (data) => {
  console.log('Leaderboard:', data.leaderboard);
});
```

## Redis Keys

The server uses the following Redis keys:

- `session:{sessionId}:students` - Set of student user IDs
- `session:{sessionId}:leaderboard` - Sorted set (score, user_id)
- `session:{sessionId}:current_question` - Current question JSON
- `session:{sessionId}:answers` - List of answer records

## Authentication

JWT tokens must contain:
- `user_id`: User identifier
- `session_id`: Session identifier
- `role`: `teacher` or `student`
- `exp`: Expiration timestamp

Tokens are verified on connection using the `JWT_SECRET`.

## Health Check

```bash
curl http://localhost:3001/health
```

Response:
```json
{
  "status": "healthy",
  "service": "websocket-server"
}
```

## Docker

Build image:
```bash
docker build -t jica-websocket .
```

Run container:
```bash
docker run -p 3001:3001 \
  -e REDIS_URL=redis://redis:6379 \
  -e JWT_SECRET=your-secret \
  -e CORS_ORIGIN=http://localhost:8080 \
  jica-websocket
```

## Testing

```bash
# Run tests
npm test

# Test with wscat
npm install -g wscat
wscat -c ws://localhost:3001 -H "Authorization: Bearer your-jwt-token"
```

## Scaling

For horizontal scaling:
1. Use Redis adapter for Socket.IO (instead of in-memory)
2. Use sticky sessions or Redis pub/sub
3. Load balance WebSocket connections

See [ARCHITECTURE.md](../docs/ARCHITECTURE.md) for details.

