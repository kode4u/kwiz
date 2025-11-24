# Windows Setup Guide

This guide provides step-by-step instructions for setting up the project on Windows.

## Prerequisites

### 1. Install Docker Desktop for Windows

1. **Download Docker Desktop**:
   - Visit: https://www.docker.com/products/docker-desktop
   - Download Docker Desktop for Windows

2. **Install Docker Desktop**:
   - Run the installer
   - Follow installation wizard
   - Restart computer if prompted

3. **Start Docker Desktop**:
   - Launch Docker Desktop from Start menu
   - Wait for Docker to start (whale icon in system tray)
   - Verify it's running: Open PowerShell and run:
     ```powershell
     docker --version
     docker ps
     ```

4. **Configure Docker Desktop**:
   - Open Docker Desktop → Settings
   - **Resources** → Set Memory to at least 8GB (recommended)
   - **General** → Enable "Use the WSL 2 based engine" (if available)
   - Click "Apply & Restart"

### 2. Install Git (if not already installed)

1. Download from: https://git-scm.com/download/win
2. Install with default options
3. Verify installation:
   ```powershell
   git --version
   ```

### 3. Install Node.js (Optional, for local development)

1. Download from: https://nodejs.org/
2. Install LTS version
3. Verify installation:
   ```powershell
   node --version
   npm --version
   ```

## Project Setup

### Step 1: Clone Repository

```powershell
# Navigate to your desired directory
cd C:\Users\Admin\Desktop

# Clone repository (replace with actual URL)
git clone <repository-url> jica
cd jica
```

### Step 2: Configure Environment

```powershell
# Copy environment template
Copy-Item docker\env.template docker\.env

# Edit .env file (use Notepad, VS Code, or any text editor)
notepad docker\.env
```

**Required settings in `docker/.env`**:
- `OPENAI_API_KEY` - Your OpenAI API key (get from https://platform.openai.com/api-keys)
- `JWT_SECRET` - Generate a random secret: `openssl rand -hex 32` (or use any random string)
- `WS_SECRET` - Same as JWT_SECRET or generate another

**Quick setup** (minimum required):
```env
OPENAI_API_KEY=sk-your-key-here
JWT_SECRET=your-random-secret-here
WS_SECRET=your-random-secret-here
```

### Step 3: Start Services

**Important**: Run PowerShell as Administrator for best results.

1. **Open PowerShell as Administrator**:
   - Press `Win + X`
   - Select "Windows PowerShell (Admin)" or "Terminal (Admin)"

2. **Navigate to project**:
   ```powershell
   cd C:\Users\Admin\Desktop\jica
   ```

3. **Start all services**:
   ```powershell
   docker-compose up -d
   ```

4. **Check status**:
   ```powershell
   docker-compose ps
   ```

5. **View logs** (if needed):
   ```powershell
   docker-compose logs -f
   ```

### Step 4: Initialize Moodle

1. **Open browser**:
   - Go to: http://localhost:8080

2. **Complete Moodle installation**:
   - Select language
   - Database settings:
     - **Database type**: MySQL
     - **Database host**: `db`
     - **Database name**: `moodle`
     - **Database user**: `moodle`
     - **Database password**: (from `docker/.env`, default: `moodlepass`)
   - Continue with installation
   - Create admin account (or use defaults from `.env`)

3. **Login to Moodle**:
   - Username: `admin` (or from `.env`)
   - Password: (from `.env`, default: `Admin@123`)

### Step 5: Configure Plugin

1. **Go to plugin settings**:
   - Site administration → Plugins → Activity modules → Gamified Quiz

2. **Configure settings**:
   - **WebSocket Server URL**: `ws://localhost:3001`
   - **LLM API URL**: `http://localhost:5000`
   - **JWT Secret**: (must match `JWT_SECRET` in `docker/.env`)

3. **Save settings**

### Step 6: Verify Services

```powershell
# Test LLM API
curl http://localhost:5000/health

# Test WebSocket server
curl http://localhost:3001/health

# Test Redis
docker-compose exec redis redis-cli ping
```

## Common Windows Issues

### Issue 1: Docker Daemon Not Running

**Symptoms**: Error about docker_engine pipe

**Solution**:
1. Open Docker Desktop application
2. Wait for it to fully start
3. Verify: `docker ps` should work
4. If still fails, restart Docker Desktop

### Issue 2: Port Already in Use

**Symptoms**: `Bind for 0.0.0.0:8080 failed`

**Solution**:
```powershell
# Find process using port
netstat -ano | findstr :8080

# Kill process (replace PID)
taskkill /PID <PID> /F

# Or change port in docker-compose.yml
```

### Issue 3: Permission Denied

**Symptoms**: Access denied errors

**Solution**:
- Run PowerShell as Administrator
- Or adjust Docker Desktop settings:
  - Settings → General → Uncheck "Use the WSL 2 based engine"
  - Apply & Restart

### Issue 4: Slow Performance

**Solutions**:
1. Increase Docker memory: Settings → Resources → Memory (8GB+)
2. Enable WSL 2 backend (if available)
3. Close other applications
4. Use SSD for better performance

## Useful Commands

```powershell
# Start services
docker-compose up -d

# Stop services
docker-compose down

# View logs
docker-compose logs -f
docker-compose logs <service-name>

# Restart service
docker-compose restart <service-name>

# Rebuild service
docker-compose build <service-name>
docker-compose up -d <service-name>

# Check status
docker-compose ps

# Access container shell
docker-compose exec <service-name> sh
docker-compose exec moodle bash

# Clean up
docker-compose down -v  # Removes volumes too
docker system prune     # Removes unused resources
```

## Next Steps

1. **Create a test course** in Moodle
2. **Add Gamified Quiz activity**
3. **Generate questions** (requires OpenAI API key)
4. **Test teacher and student workflows**

See [QUICKSTART.md](QUICKSTART.md) for detailed usage instructions.

## Getting Help

If you encounter issues:

1. Check [TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
2. Check service logs: `docker-compose logs <service-name>`
3. Verify Docker Desktop is running
4. Ensure all prerequisites are installed
5. Open a GitHub issue with error details

---

**Note**: On Windows, it's recommended to use PowerShell (not Command Prompt) for better Docker support.

