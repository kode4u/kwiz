# KwizRAG — AI-Enhanced Gamified Moodle Quiz System

**KwizRAG** is a local RAG-powered, gamified assessment system integrated with Moodle (`mod_gamifiedquiz`). It combines on-premise AI question generation (`qwen2.5-coder:7b` + `nomic-embed-text` vector caching) with real-time multiplayer gamification (Socket.IO + Redis).

## 🏗️ Project Structure

```
jica/
├── moodle-plugin/          # Moodle PHP plugin
├── websocket-server/       # Node.js real-time server
├── llmapi/                 # LLM adapter service (Python/Flask)
├── docker/                 # Docker Compose and configurations
├── docs/                   # Documentation
└── evaluate/               # Research evaluation (metrics, SUS, JMeter, classroom)
```

## 📄 Research Paper & Publication

This repository contains the full draft and reproducible evaluation code for our research paper:

*   **Conference Paper Draft**: [paper.md](paper.md) — *Design and Evaluation of an AI-Enhanced Gamified Quiz Plugin for Moodle: Integrating Local LLM-Based Question Generation*
*   **Academic References & BibTeX**: [references.md](references.md) — Citations for RAG, Cosine Similarity, SHA-256 caching, Cohen's Kappa, and SUS metrics.
*   **System Documentation**: [docs/PROJECT_OVERVIEW.md](docs/PROJECT_OVERVIEW.md) — System features and architecture.

## 🚀 Quick Start (Docker)

1. **Clone and setup:**
   ```bash
   git clone <repository-url>
   cd kwiz
   cp docker/env.template docker/.env
   # Edit docker/.env with your settings
   ```

2. **Start all services:**
   ```bash
   docker compose up -d
   ```

3. **Access services:**
   - Moodle: `http://localhost:8080`
   - WebSocket Server: `ws://localhost:3001`
   - LLM API: `http://localhost:5001`
   - Redis: `localhost:6379`

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