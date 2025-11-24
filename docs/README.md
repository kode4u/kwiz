# Documentation Index

Welcome to the LBE JICA AI-Enhanced Gamified Moodle Quiz documentation!

## Getting Started

- **[Quick Start Guide](../QUICKSTART.md)** - Get running in 5 minutes
- **[Installation Guide](INSTALLATION.md)** - Detailed installation instructions
- **[Project Overview](PROJECT_OVERVIEW.md)** - High-level project information

## Technical Documentation

- **[Architecture](ARCHITECTURE.md)** - System architecture and design
- **[API Documentation](API.md)** - API endpoints and WebSocket events
- **[Development Guide](DEVELOPMENT.md)** - Development setup and workflow
- **[Deployment Guide](DEPLOYMENT.md)** - Production deployment instructions

## Service-Specific Documentation

- **[LLM API README](../llmapi/README.md)** - LLM API service documentation
- **[WebSocket Server README](../websocket-server/README.md)** - WebSocket server documentation
- **[Moodle Plugin README](../moodle-plugin/mod/gamifiedquiz/README.md)** - Moodle plugin documentation

## Project Structure

```
jica/
├── moodle-plugin/          # Moodle PHP plugin
│   └── mod/gamifiedquiz/
├── websocket-server/       # Node.js real-time server
├── llmapi/                 # Python Flask LLM service
├── docker/                 # Docker configurations
├── docs/                   # This documentation
├── docker-compose.yml      # Main Docker Compose file
└── README.md              # Main project README
```

## Quick Reference

### Start Services
```bash
docker-compose up -d
```

### Stop Services
```bash
docker-compose down
```

### View Logs
```bash
docker-compose logs -f [service-name]
```

### Access Services
- Moodle: http://localhost:8080
- LLM API: http://localhost:5000
- WebSocket: ws://localhost:3001

## Common Tasks

### Generate Questions
```bash
curl -X POST http://localhost:5000/generate \
  -H "Content-Type: application/json" \
  -d '{"topic": "Python", "level": "medium", "n_questions": 3}'
```

### Check Health
```bash
curl http://localhost:5000/health
curl http://localhost:3001/health
```

### Moodle Upgrade
```bash
docker exec -it jica-moodle php /var/www/html/moodle/admin/cli/upgrade.php
```

## Support

- **Issues**: Open a GitHub issue
- **Documentation**: Check relevant docs in this directory
- **Questions**: Review [DEVELOPMENT.md](DEVELOPMENT.md) troubleshooting section

## Contributing

See [DEVELOPMENT.md](DEVELOPMENT.md) for development guidelines and contribution instructions.

---

**Last Updated**: January 2025

