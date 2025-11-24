# System Architecture

## Overview

The AI-Enhanced Gamified Moodle Quiz system consists of three main components working together:

```
┌─────────────┐      ┌──────────────┐      ┌─────────────┐
│   Moodle    │◄────►│   WebSocket  │◄────►│   LLM API   │
│   Plugin    │      │    Server    │      │   Service   │
└─────────────┘      └──────────────┘      └─────────────┘
      │                     │                      │
      │                     │                      │
      └─────────────────────┴──────────────────────┘
                            │
                    ┌───────┴────────┐
                    │     Redis      │
                    │   (Cache/Pub)  │
                    └────────────────┘
```

## Components

### 1. Moodle Plugin (PHP)

**Responsibilities:**
- Activity creation and configuration
- Teacher dashboard UI
- Student quiz interface
- JWT token generation for WebSocket authentication
- Results persistence to Moodle database
- Integration with Moodle user management

**Technology:**
- PHP 8.x
- Moodle 4.x Plugin API
- MySQL/PostgreSQL (via Moodle)

**Key Files:**
- `mod/gamifiedquiz/` - Main plugin directory
- `lib.php` - Core functions
- `view.php` - Student/teacher views
- `classes/` - PHP classes

### 2. WebSocket Server (Node.js)

**Responsibilities:**
- Real-time bidirectional communication
- Room/session management
- Message routing (teacher → students, student → server)
- Leaderboard calculations
- Timer synchronization
- Ephemeral state management

**Technology:**
- Node.js 18+
- Socket.IO or `ws` library
- Redis for pub/sub and state
- JWT verification

**Key Features:**
- Room-based messaging
- Event-driven architecture
- Horizontal scaling support
- Connection management

### 3. LLM API Service (Python)

**Responsibilities:**
- Question generation from topics
- Structured MCQ creation
- Multi-language support
- Difficulty level adjustment
- Bloom's taxonomy classification

**Technology:**
- Python 3.10+
- Flask or FastAPI
- LLM integration (OpenAI, local LLM, etc.)
- JSON structured output

**Endpoints:**
- `POST /generate` - Generate questions
- `GET /health` - Health check
- `POST /validate` - Validate question quality

## Data Flow

### Quiz Session Flow

1. **Teacher creates session:**
   ```
   Moodle Plugin → WebSocket Server (create_room)
   ```

2. **Teacher generates questions:**
   ```
   Moodle Plugin → LLM API (generate)
   LLM API → Moodle Plugin (structured MCQs)
   ```

3. **Teacher starts quiz:**
   ```
   Moodle Plugin → WebSocket Server (push_question)
   WebSocket Server → All Students (broadcast)
   ```

4. **Student submits answer:**
   ```
   Student → WebSocket Server (submit_answer)
   WebSocket Server → Redis (update leaderboard)
   WebSocket Server → All Clients (leaderboard_update)
   ```

5. **Results saved:**
   ```
   WebSocket Server → Moodle Plugin API (save_results)
   Moodle Plugin → Database (persist)
   ```

## Authentication Flow

```
1. User logs into Moodle
2. Teacher creates quiz session
3. Moodle Plugin generates JWT token:
   {
     user_id: 123,
     session_id: "abc-123",
     role: "teacher" | "student",
     exp: timestamp
   }
4. Client connects to WebSocket with JWT
5. WebSocket Server validates JWT
6. Connection established
```

## Database Schema

### Moodle Tables (via Plugin)

- `mdl_gamifiedquiz` - Quiz sessions
- `mdl_gamifiedquiz_questions` - Generated questions
- `mdl_gamifiedquiz_responses` - Student answers
- `mdl_gamifiedquiz_sessions` - Active sessions

### Redis Keys

- `session:{session_id}:students` - Set of connected students
- `session:{session_id}:leaderboard` - Sorted set (score, user_id)
- `session:{session_id}:current_question` - Current question data
- `session:{session_id}:timer` - Timer state

## Scalability Considerations

### Horizontal Scaling

- **WebSocket Server:** Multiple instances behind load balancer
- **LLM API:** Stateless, can scale horizontally
- **Redis:** Cluster mode for high availability
- **Moodle:** Read replicas for reporting

### Load Balancing

- Nginx for HTTP/HTTPS
- Sticky sessions for WebSocket (or Redis adapter for Socket.IO)
- Health checks for all services

## Security Architecture

### Layers

1. **Network:**
   - HTTPS/WSS only in production
   - Firewall rules
   - VPC isolation (cloud)

2. **Application:**
   - JWT authentication
   - Rate limiting
   - Input validation
   - SQL injection prevention (Moodle ORM)

3. **Data:**
   - Encrypted at rest
   - Encrypted in transit
   - Anonymization for research data

## Monitoring & Observability

### Metrics

- Connection count (WebSocket)
- Message throughput
- API response times
- LLM generation latency
- Error rates

### Logging

- Structured JSON logs
- Correlation IDs for request tracing
- Log aggregation (ELK stack optional)

### Health Checks

- `/health` endpoint on all services
- Database connectivity
- Redis connectivity
- LLM service availability

## Deployment Architecture

### Development

```
Docker Compose:
- All services on localhost
- Port mapping
- Volume mounts for hot-reload
```

### Production

```
Option 1: Docker Swarm
- Services as Docker services
- Overlay network
- Service discovery

Option 2: Kubernetes
- Deployments for each service
- Services for networking
- ConfigMaps and Secrets
- Ingress for external access
```

## Technology Stack Summary

| Component | Technology | Purpose |
|-----------|-----------|---------|
| Moodle Plugin | PHP 8.x, Moodle 4.x | Core LMS integration |
| WebSocket | Node.js, Socket.IO | Real-time communication |
| LLM API | Python, Flask | Question generation |
| Cache | Redis | State & pub/sub |
| Database | MySQL/PostgreSQL | Persistent storage |
| Container | Docker | Isolation & deployment |
| Orchestration | Docker Compose / K8s | Service management |

## Sequence Diagrams

See [docs/SEQUENCES.md](SEQUENCES.md) for detailed sequence diagrams of key flows.

