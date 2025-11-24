# Environment Configuration

This project uses **`docker/.env`** as the single source of truth for all environment variables.

## Setup

1. Copy the template file:
   ```bash
   cp docker/env.template docker/.env
   ```

2. Edit `docker/.env` with your configuration values.

## How It Works

- **Docker Compose**: Reads from `docker/.env` (or root `.env` if it exists)
- **Moodle Plugin**: Automatically reads `docker/.env` for JWT_SECRET
- **LLM API**: Gets environment variables from Docker Compose (which reads from `docker/.env`)
- **WebSocket Server**: Gets environment variables from Docker Compose (which reads from `docker/.env`)

## Important Notes

- All environment variables should be set in `docker/.env`
- The root `.env` file (if it exists) is only used as a fallback for Docker Compose
- Moodle plugin automatically syncs JWT_SECRET from `docker/.env` on installation/upgrade

