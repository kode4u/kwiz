# Installation Guide

## Prerequisites

### Required

- **Docker** 20.10+ and **Docker Compose** 2.0+
- **Git**
- **8GB+ RAM** (for running all services)
- **10GB+ disk space**

### Optional

- **Moodle 4.x** (if not using Docker Moodle)
- **Node.js 18+** (for local development)
- **Python 3.10+** (for local development)
- **PHP 8.x** (for local Moodle development)

## Quick Installation (Docker)

### Step 1: Clone Repository

```bash
git clone <repository-url>
cd jica
```

### Step 2: Configure Environment

Copy environment template:

```bash
cp docker/.env.example docker/.env
```

Edit `docker/.env` with your settings:

```env
# Moodle
MOODLE_URL=http://localhost:8080
MOODLE_ADMIN_USER=admin
MOODLE_ADMIN_PASS=Admin@123
MOODLE_ADMIN_EMAIL=admin@example.com

# Database
MYSQL_ROOT_PASSWORD=rootpass
MYSQL_DATABASE=moodle
MYSQL_USER=moodle
MYSQL_PASSWORD=moodlepass

# Redis
REDIS_PASSWORD=

# WebSocket Server
WS_PORT=3001
WS_SECRET=your-secret-key-here

# LLM API
LLM_API_PORT=5000
LLM_API_KEY=your-api-key
LLM_BACKEND=openai  # or 'local', 'ollama', etc.
OPENAI_API_KEY=your-openai-key  # if using OpenAI

# JWT
JWT_SECRET=your-jwt-secret-key
JWT_EXPIRY=3600
```

### Step 3: Start Services

```bash
cd docker
docker-compose up -d
```

This will start:
- MySQL database
- Redis
- Moodle with plugin
- WebSocket server
- LLM API service

### Step 4: Initialize Moodle

1. Open http://localhost:8080 in browser
2. Follow Moodle installation wizard:
   - Database: `db` (hostname in Docker network)
   - Database user: `moodle`
   - Database password: (from .env)
   - Database name: `moodle`
3. Complete Moodle setup
4. Login as admin

### Step 5: Install Plugin

The plugin should be automatically mounted. If not:

```bash
# Copy plugin to Moodle
docker exec -it moodle cp -r /var/www/html/mod/gamifiedquiz /var/www/html/moodle/mod/
docker exec -it moodle php /var/www/html/moodle/admin/cli/upgrade.php
```

### Step 6: Verify Installation

Check all services are running:

```bash
docker-compose ps
```

Test endpoints:

```bash
# LLM API health
curl http://localhost:5000/health

# WebSocket server (check logs)
docker-compose logs websocket-server

# Redis
docker exec -it redis redis-cli ping
```

## Manual Installation (Development)

### 1. LLM API Service

```bash
cd llmapi

# Create virtual environment
python -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set environment variables
export LLM_BACKEND=openai
export OPENAI_API_KEY=your-key

# Run
python app.py
```

### 2. WebSocket Server

```bash
cd websocket-server

# Install dependencies
npm install

# Set environment variables
export REDIS_URL=redis://localhost:6379
export JWT_SECRET=your-secret
export PORT=3001

# Run
npm start
```

### 3. Moodle Plugin

```bash
# Copy to Moodle mod directory
cp -r moodle-plugin/mod/gamifiedquiz /path/to/moodle/mod/

# Run Moodle upgrade
cd /path/to/moodle
php admin/cli/upgrade.php
```

## Configuration

### Moodle Plugin Configuration

1. Login to Moodle as admin
2. Go to: Site administration → Plugins → Activity modules → Gamified Quiz
3. Configure:
   - WebSocket Server URL: `ws://localhost:3001` (dev) or `wss://your-domain.com` (prod)
   - LLM API URL: `http://localhost:5000` (dev) or `https://your-domain.com/api` (prod)
   - JWT Secret: (must match WebSocket server)

### WebSocket Server Configuration

Edit `websocket-server/.env`:

```env
PORT=3001
REDIS_URL=redis://localhost:6379
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:8080
```

### LLM API Configuration

Edit `llmapi/.env`:

```env
FLASK_PORT=5000
LLM_BACKEND=openai
OPENAI_API_KEY=your-key
MAX_QUESTIONS=10
DEFAULT_LANGUAGE=en
```

## Troubleshooting

### Services won't start

```bash
# Check logs
docker-compose logs

# Check ports
netstat -an | grep -E '3001|5000|8080|6379'

# Restart services
docker-compose restart
```

### Moodle plugin not appearing

```bash
# Check plugin is mounted
docker exec -it moodle ls -la /var/www/html/moodle/mod/gamifiedquiz

# Run Moodle upgrade
docker exec -it moodle php /var/www/html/moodle/admin/cli/upgrade.php

# Clear Moodle cache
docker exec -it moodle php /var/www/html/moodle/admin/cli/purge_caches.php
```

### WebSocket connection fails

1. Check WebSocket server is running: `docker-compose logs websocket-server`
2. Verify JWT secret matches in Moodle and WebSocket config
3. Check CORS settings
4. Test connection: `wscat -c ws://localhost:3001`

### LLM API errors

1. Check API key is set correctly
2. Verify backend is accessible
3. Check logs: `docker-compose logs llmapi`
4. Test endpoint: `curl http://localhost:5000/health`

## Production Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for production setup with:
- HTTPS/WSS
- Domain configuration
- Load balancing
- Monitoring
- Backup strategies

## Next Steps

After installation:
1. Read [DEVELOPMENT.md](DEVELOPMENT.md) for development setup
2. Review [API.md](API.md) for API documentation
3. Check [ARCHITECTURE.md](ARCHITECTURE.md) for system overview

