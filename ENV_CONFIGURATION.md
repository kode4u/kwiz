# Environment Configuration - Single Source of Truth

## Overview

This project uses **`docker/.env`** as the **single source of truth** for all environment variables.

## File Structure

```
kwiz/
├── docker/
│   ├── .env              ← SINGLE SOURCE OF TRUTH (edit this file)
│   └── env.template      ← Template file (copy to .env)
├── .env                  ← Auto-copied from docker/.env (for Docker Compose compatibility)
└── docker-compose.yml    ← Reads from root .env (which mirrors docker/.env)
```

## How It Works

### 1. Docker Compose
- **Location**: `docker-compose.yml` (root directory)
- **Behavior**: Automatically reads from root `.env` file
- **Solution**: Root `.env` is automatically synced from `docker/.env`
- **Note**: Docker Compose looks for `.env` in the same directory as `docker-compose.yml`

### 2. Moodle Plugin
- **Files**: 
  - `moodle-plugin/mod/gamifiedquiz/lib.php`
  - `moodle-plugin/mod/gamifiedquiz/db/upgrade.php`
- **Behavior**: 
  - First checks environment variable `JWT_SECRET` (set by Docker)
  - Then reads directly from `docker/.env` file
  - Auto-syncs on plugin installation/upgrade
- **Priority**: Environment variable → `docker/.env` → Default fallback

### 3. LLM API Service
- **File**: `llmapi/app.py`
- **Behavior**: Gets environment variables from Docker Compose
- **Source**: Docker Compose reads from root `.env` (which mirrors `docker/.env`)

### 4. WebSocket Server
- **File**: `websocket-server/server.js`
- **Behavior**: Gets environment variables from Docker Compose
- **Source**: Docker Compose reads from root `.env` (which mirrors `docker/.env`)

## Setup Instructions

1. **Copy template**:
   ```bash
   cp docker/env.template docker/.env
   ```

2. **Edit configuration**:
   ```bash
   # Edit docker/.env with your values
   notepad docker/.env  # Windows
   nano docker/.env     # Linux/Mac
   ```

3. **Sync to root** (for Docker Compose):
   ```bash
   # Windows PowerShell
   Copy-Item docker\.env .env -Force
   
   # Linux/Mac
   cp docker/.env .env
   ```

4. **Start services**:
   ```bash
   docker-compose up -d
   ```

## Important Notes

✅ **Always edit `docker/.env`** - This is the single source of truth  
✅ **Root `.env` is auto-synced** - Keep it in sync with `docker/.env`  
✅ **Moodle auto-syncs** - JWT_SECRET is automatically synced from `docker/.env`  
✅ **Never commit `.env` files** - They contain sensitive information  

## Environment Variables Reference

Key variables in `docker/.env`:

- `OPENAI_API_KEY` - OpenAI API key for question generation
- `JWT_SECRET` - Secret key for JWT token generation (must match WebSocket server)
- `MYSQL_PASSWORD` - MySQL database password
- `MYSQL_USER` - MySQL database user
- `MYSQL_DATABASE` - MySQL database name
- `WS_PORT` - WebSocket server port (default: 3001)
- `LLM_API_PORT` - LLM API port (default: 5000)
- `MOODLE_URL` - Moodle URL (default: http://localhost:8080)
- `CORS_ORIGIN` - CORS origin for WebSocket (default: http://localhost:8080)

## Troubleshooting

### JWT Secret Mismatch
If you get "Authentication error: Invalid token":
1. Check `docker/.env` has `JWT_SECRET` set
2. Ensure root `.env` matches `docker/.env`
3. Restart containers: `docker-compose restart`
4. Moodle plugin will auto-sync on next JWT generation

### Environment Variables Not Loading
1. Verify `docker/.env` exists and has correct values
2. Copy to root: `cp docker/.env .env`
3. Restart containers: `docker-compose restart`

