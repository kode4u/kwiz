# LBE JICA — AI-Enhanced Gamified Moodle Quiz

A comprehensive system that integrates AI-powered question generation with real-time gamified quizzes in Moodle.

## 🏗️ Project Structure

```
jica/
├── moodle-plugin/          # Moodle PHP plugin
├── websocket-server/       # Node.js real-time server
├── llmapi/                 # LLM adapter service (Python/Flask)
├── docker/                 # Docker Compose and configurations
└── docs/                   # Documentation
```
 
## 🚀 Quick Start

See [QUICKSTART.md](QUICKSTART.md) for a 5-minute setup guide!

**Windows Users**: See [WINDOWS_SETUP.md](WINDOWS_SETUP.md) for Windows-specific setup instructions.

### Prerequisites 

- Docker & Docker Compose
- Git
- OpenAI API key (optional, for question generation)

### Running the System

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd jica
   cp docker/env.template docker/.env
   # Edit docker/.env with your settings (especially OPENAI_API_KEY)
   ```

2. **Start all services:**
   ```bash
   docker-compose up -d
   ```

3. **Access services:**
   - Moodle: http://localhost:8080
   - WebSocket Server: ws://localhost:3001
   - LLM API: http://localhost:5000
   - Redis: localhost:6379

4. **View logs:**
   ```bash
   docker-compose logs -f
   ```

5. **Initialize Moodle:**
   - Open http://localhost:8080
   - Complete installation wizard
   - Configure plugin settings (see [QUICKSTART.md](QUICKSTART.md))

## 📚 Documentation

- [Architecture Overview](docs/ARCHITECTURE.md)
- [Installation Guide](docs/INSTALLATION.md)
- [Development Guide](docs/DEVELOPMENT.md)
- [API Documentation](docs/API.md)
- [Deployment Guide](docs/DEPLOYMENT.md)

## 🔧 Services

### 1. Moodle Plugin (`moodle-plugin/`)
- PHP-based Moodle activity plugin
- Teacher dashboard for quiz sessions
- Student interface for participation
- JWT token generation for WebSocket auth

### 2. WebSocket Server (`websocket-server/`)
- Real-time communication hub
- Room/session management
- Leaderboard updates
- Timer synchronization

### 3. LLM API (`llmapi/`)
- Question generation service
- Supports multiple LLM backends
- Structured MCQ output
- Multi-language support (English, Khmer)

## 🐳 Docker Services

All services are containerized:
- `moodle-plugin`: Moodle with plugin installed
- `websocket-server`: Node.js Socket.IO server
- `llmapi`: Python Flask API
- `redis`: Caching and pub/sub
- `mysql`: Database (Moodle)

## 📋 Development Workflow

1. **Local Development:**
   - Each service can run independently
   - Use `docker-compose.dev.yml` for development
   - Hot-reload enabled for Node.js and Python

2. **Testing:**
   - Unit tests in each service
   - Integration tests in `tests/`
   - Load testing with k6/Artillery

3. **Deployment:**
   - Production Docker Compose
   - Kubernetes manifests (optional)
   - CI/CD with GitHub Actions

## 🔐 Security

- JWT authentication for WebSocket
- HTTPS/WSS in production
- Rate limiting on APIs
- Input sanitization
- Environment-based secrets

## 📊 Monitoring

- Prometheus metrics (optional)
- Application logs via Docker
- Health check endpoints

## 🤝 Contributing

See [CONTRIBUTING.md](docs/CONTRIBUTING.md) for guidelines.

## 📄 License

GPL v3 (Moodle plugin compatibility)

## 📞 Support

For issues and questions, please open a GitHub issue.

---

**Project Timeline:** Oct 2025 - Sep 2026  
**Status:** Development Phase