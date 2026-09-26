# Development Guide

## Development Setup

### Prerequisites

- Docker & Docker Compose
- Node.js 18+ (for WebSocket server development)
- Python 3.10+ (for LLM API development)
- PHP 8.x (for Moodle plugin development)
- Git

### Quick Start

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd jica
   ```

2. **Copy environment file:**
   ```bash
   cp docker/.env.example docker/.env
   # Edit docker/.env with your settings
   ```

3. **Start development environment:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up
   ```

## Development Workflow

### Working on LLM API

1. **Local development:**
   ```bash
   cd llmapi
   python -m venv venv
   source venv/bin/activate  # Windows: venv\Scripts\activate
   pip install -r requirements.txt
   export OPENAI_API_KEY=your-key
   python app.py
   ```

2. **With Docker (hot-reload):**
   ```bash
   docker-compose up llmapi
   # Edit files, changes are reflected
   ```

3. **Testing:**
   ```bash
   curl -X POST http://localhost:5001/generate \
     -H "Content-Type: application/json" \
     -d '{"topic": "Python", "level": "easy", "n_questions": 1}'
   ```

### Working on WebSocket Server

1. **Local development:**
   ```bash
   cd websocket-server
   npm install
   export REDIS_URL=redis://localhost:6379
   export JWT_SECRET=dev-secret
   npm run dev  # Uses nodemon for auto-reload
   ```

2. **With Docker:**
   ```bash
   docker-compose up websocket-server
   ```

3. **Testing:**
   ```bash
   # Install wscat
   npm install -g wscat
   
   # Connect (need valid JWT token)
   wscat -c ws://localhost:3001 -H "Authorization: Bearer your-jwt-token"
   ```

### Working on Moodle Plugin

1. **Local development:**
   - Copy plugin to Moodle mod directory
   - Run Moodle upgrade
   - Edit files directly
   - Clear Moodle cache after changes

2. **With Docker:**
   ```bash
   # Plugin is mounted as volume
   # Edit files in moodle-plugin/mod/gamifiedquiz/
   # Clear Moodle cache
   docker exec -it moodle php /var/www/html/moodle/admin/cli/purge_caches.php
   ```

3. **Testing:**
   - Access Moodle at http://localhost:8080
   - Create test course
   - Add Gamified Quiz activity
   - Test teacher and student workflows

## Code Structure

### LLM API (`llmapi/`)

```
llmapi/
├── app.py              # Main Flask application
├── requirements.txt    # Python dependencies
├── Dockerfile         # Docker configuration
└── README.md          # Service documentation
```

**Key files:**
- `app.py`: Main application with routes and LLM integration
- Add new backends by creating `generate_with_<backend>()` functions

### WebSocket Server (`websocket-server/`)

```
websocket-server/
├── server.js          # Main server file
├── package.json       # Node.js dependencies
├── Dockerfile         # Docker configuration
└── README.md          # Service documentation
```

**Key files:**
- `server.js`: Socket.IO server, event handlers, Redis integration
- Add new events by adding socket event listeners

### Moodle Plugin (`moodle-plugin/`)

```
moodle-plugin/mod/gamifiedquiz/
├── version.php        # Plugin version
├── lib.php            # Core functions
├── view.php           # Activity view
├── mod_form.php       # Activity form
├── settings.php       # Plugin settings
├── db/
│   └── install.xml    # Database schema
├── lang/
│   └── en/            # Language strings
└── js/
    └── app.js         # Frontend JavaScript
```

**Key files:**
- `lib.php`: Core functions (JWT generation, API calls)
- `view.php`: Main activity page
- `js/app.js`: Frontend WebSocket client

## Adding Features

### Adding a New LLM Backend

1. Edit `llmapi/app.py`:
   ```python
   def generate_with_ollama(topic, level, n_questions, language, bloom_level, context):
       # Implementation here
       pass
   ```

2. Update `/generate` endpoint to handle new backend:
   ```python
   elif LLM_BACKEND == 'ollama':
       questions = generate_with_ollama(...)
   ```

3. Update environment variable documentation

### Adding a New WebSocket Event

1. Edit `websocket-server/server.js`:
   ```javascript
   socket.on('new:event', async (data) => {
       // Handle event
       socket.emit('new:response', response);
   });
   ```

2. Update client code in `moodle-plugin/mod/gamifiedquiz/js/app.js`

3. Update API documentation

### Adding a New Moodle Feature

1. Add database fields in `moodle-plugin/mod/gamifiedquiz/db/install.xml`
2. Create upgrade script in `moodle-plugin/mod/gamifiedquiz/db/upgrade.php`
3. Update `lib.php` with new functions
4. Update `view.php` or create new pages
5. Add language strings in `lang/en/gamifiedquiz.php`

## Testing

### Unit Tests

**LLM API:**
```bash
cd llmapi
pytest tests/
```

**WebSocket Server:**
```bash
cd websocket-server
npm test
```

**Moodle Plugin:**
```bash
# Use PHPUnit
php admin/tool/phpunit/cli/init.php
php admin/tool/phpunit/cli/util.php --run mod_gamifiedquiz
```

### Integration Tests

1. Start all services:
   ```bash
   docker-compose up -d
   ```

2. Run integration test script:
   ```bash
   # Create tests/integration_test.sh
   # Test full flow: create session, generate questions, submit answers
   ```

### Load Testing

**Using k6:**
```bash
# Install k6
# Create load_test.js
k6 run load_test.js
```

**Using Artillery (for WebSocket):**
```bash
npm install -g artillery
artillery run websocket_load_test.yml
```

## Debugging

### LLM API

- Enable Flask debug mode: `export FLASK_DEBUG=1`
- Check logs: `docker-compose logs llmapi`
- Test endpoints with curl or Postman

### WebSocket Server

- Enable debug logging: `export DEBUG=socket.io:*`
- Check logs: `docker-compose logs websocket-server`
- Use browser DevTools Network tab for WebSocket frames

### Moodle Plugin

- Enable Moodle debugging: Site administration → Development → Debugging
- Check Moodle logs: `tail -f /path/to/moodle/data/moodledata/error.log`
- Use browser DevTools Console for JavaScript errors

## Code Style

### Python (LLM API)

- Follow PEP 8
- Use type hints
- Document functions with docstrings

### JavaScript (WebSocket Server, Frontend)

- Use ESLint
- Follow Airbnb style guide
- Use async/await for async operations

### PHP (Moodle Plugin)

- Follow Moodle coding standards
- Use Moodle's coding style checker
- Document functions with PHPDoc

## Git Workflow

1. Create feature branch: `git checkout -b feature/new-feature`
2. Make changes and commit
3. Push branch: `git push origin feature/new-feature`
4. Create pull request
5. Code review and merge

## Common Issues

### Port Already in Use

```bash
# Find process using port
lsof -i :3001  # or netstat -ano | findstr :3001 (Windows)

# Kill process or change port in docker-compose.yml
```

### Redis Connection Failed

- Check Redis is running: `docker-compose ps redis`
- Verify REDIS_URL environment variable
- Check network connectivity

### JWT Token Invalid

- Verify JWT_SECRET matches in Moodle and WebSocket server
- Check token expiration
- Verify token payload structure

### Moodle Plugin Not Appearing

- Run upgrade: `php admin/cli/upgrade.php`
- Clear cache: `php admin/cli/purge_caches.php`
- Check plugin directory permissions

## Performance Optimization

1. **LLM API:**
   - Cache generated questions
   - Use connection pooling
   - Implement request queuing

2. **WebSocket Server:**
   - Use Redis adapter for horizontal scaling
   - Implement connection pooling
   - Optimize leaderboard calculations

3. **Moodle Plugin:**
   - Cache API responses
   - Minimize database queries
   - Optimize JavaScript bundle

## Next Steps

- Set up CI/CD pipeline
- Add comprehensive test coverage
- Implement monitoring and logging
- Create deployment documentation
- Set up staging environment

