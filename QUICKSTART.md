# Quick Start Guide

Get the AI-Enhanced Gamified Moodle Quiz system running in 5 minutes!

## Prerequisites

- Docker & Docker Compose installed
- 8GB+ RAM available
- OpenAI API key (optional, for question generation)

## Step 1: Clone and Setup

```bash
# Clone the repository
git clone <repository-url>
cd jica

# Create environment file
cp docker/.env.example docker/.env
```

## Step 2: Configure (Optional)

Edit `docker/.env` if you want to change defaults:

```env
# Required for LLM question generation
OPENAI_API_KEY=your-openai-api-key-here

# Change these for production
JWT_SECRET=your-secret-key-here
WS_SECRET=your-secret-key-here
```

**Note**: If you don't have an OpenAI API key, the LLM API will still start but question generation will fail. You can test other features.

## Step 3: Start Services

```bash
# Start all services
docker-compose up -d

# Watch logs
docker-compose logs -f
```

This will start:
- MySQL database (port 3306)
- Redis (port 6379)
- LLM API service (port 5000)
- WebSocket server (port 3001)
- Moodle (port 8080)

## Step 4: Initialize Moodle

1. **Open Moodle in browser:**
   ```
   http://localhost:8080
   ```

2. **Complete installation:**
   - Database host: `db`
   - Database user: `moodle`
   - Database password: (from `.env` file, default: `moodlepass`)
   - Database name: `moodle`

3. **Login:**
   - Username: `admin` (or from `.env`)
   - Password: (from `.env`, default: `Admin@123`)

## Step 5: Configure Plugin

1. **Go to plugin settings:**
   - Site administration → Plugins → Activity modules → Gamified Quiz

2. **Configure:**
   - WebSocket Server URL: `ws://localhost:3001`
   - LLM API URL: `http://localhost:5000`
   - JWT Secret: (must match `JWT_SECRET` in `.env`)

## Step 6: Create Your First Quiz

1. **Create a course:**
   - Go to "Site home"
   - Click "Add a new course"
   - Fill in course details and save

2. **Add Gamified Quiz:**
   - Enter your course
   - Click "Add an activity or resource"
   - Select "Gamified Quiz"
   - Fill in:
     - Name: "My First Quiz"
     - Topic: "Python Programming"
     - Difficulty: Medium
     - Language: English
   - Save and display

3. **Test as Teacher:**
   - Click "Generate Questions" (requires OpenAI API key)
   - Review generated questions
   - Click "Start Session"
   - Push questions to students

4. **Test as Student:**
   - Open quiz in another browser/incognito
   - Login as a student user
   - Wait for teacher to start session
   - Answer questions as they appear

## Verify Services

Check all services are running:

```bash
# Check containers
docker-compose ps

# Test LLM API
curl http://localhost:5000/health

# Test WebSocket server
curl http://localhost:3001/health

# Test Redis
docker exec -it jica-redis redis-cli ping
```

## Common Issues

### Port Already in Use

If ports are already in use, change them in `docker-compose.yml` or stop conflicting services.

### Moodle Plugin Not Appearing

```bash
# Run Moodle upgrade
docker exec -it jica-moodle php /var/www/html/moodle/admin/cli/upgrade.php

# Clear cache
docker exec -it jica-moodle php /var/www/html/moodle/admin/cli/purge_caches.php
```

### WebSocket Connection Fails

- Verify WebSocket URL in Moodle settings
- Check JWT secret matches in both places
- Check browser console for errors

### Questions Not Generating

- Verify OpenAI API key is set in `.env`
- Check LLM API logs: `docker-compose logs llmapi`
- Test API directly: `curl -X POST http://localhost:5000/generate ...`

## Next Steps

- Read [INSTALLATION.md](docs/INSTALLATION.md) for detailed setup
- Read [DEVELOPMENT.md](docs/DEVELOPMENT.md) for development guide
- Read [API.md](docs/API.md) for API documentation
- Read [ARCHITECTURE.md](docs/ARCHITECTURE.md) for system overview

## Stop Services

```bash
# Stop all services
docker-compose down

# Stop and remove volumes (deletes data)
docker-compose down -v
```

## Get Help

- Check [docs/](docs/) directory for detailed documentation
- Review logs: `docker-compose logs <service-name>`
- Open GitHub issue for bugs

---

**Happy Quizzing! 🎓**

