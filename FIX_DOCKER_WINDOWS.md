# Quick Fix: Docker Issues on Windows

## Your Current Error

```
unable to get image 'jica-websocket-server': error during connect: 
in the default daemon configuration on Windows, the docker client must be 
run with elevated privileges to connect
```

## Immediate Solutions (Try in Order)

### Solution 1: Start Docker Desktop ⭐ (Most Common Fix)

1. **Open Docker Desktop**:
   - Click Start menu
   - Search for "Docker Desktop"
   - Click to open

2. **Wait for Docker to Start**:
   - Look for the Docker whale icon in system tray (bottom right)
   - Wait until it's steady (not animating)
   - This may take 1-2 minutes

3. **Verify Docker is Running**:
   ```powershell
   docker ps
   ```
   - If this works, Docker is running ✅
   - If you get an error, continue to Solution 2

### Solution 2: Run PowerShell as Administrator

1. **Close current PowerShell window**

2. **Open PowerShell as Admin**:
   - Press `Win + X`
   - Click "Windows PowerShell (Admin)" or "Terminal (Admin)"
   - Click "Yes" when prompted

3. **Navigate to project**:
   ```powershell
   cd C:\Users\Admin\Desktop\jica
   ```

4. **Try again**:
   ```powershell
   docker-compose up -d
   ```

### Solution 3: Restart Docker Desktop

1. **Right-click Docker Desktop icon** in system tray
2. **Click "Restart"**
3. **Wait for restart** (1-2 minutes)
4. **Try again**:
   ```powershell
   docker-compose up -d
   ```

### Solution 4: Check Docker Service

```powershell
# Check if Docker service is running
Get-Service *docker*

# If not running, start it (requires admin PowerShell)
Start-Service docker
```

### Solution 5: Reinstall Docker Desktop

If nothing else works:

1. **Uninstall Docker Desktop**:
   - Settings → Apps → Docker Desktop → Uninstall

2. **Download fresh installer**:
   - https://www.docker.com/products/docker-desktop

3. **Install and restart computer**

4. **Start Docker Desktop** and wait for it to fully start

## Verify Fix

After trying solutions above, verify:

```powershell
# 1. Check Docker version
docker --version

# 2. Check Docker is running
docker ps

# 3. Check Docker Compose
docker-compose --version

# 4. Try starting services
docker-compose up -d
```

## If Still Not Working

1. **Check Docker Desktop Settings**:
   - Open Docker Desktop
   - Settings → General
   - Ensure "Use the WSL 2 based engine" is checked (if available)
   - Click "Apply & Restart"

2. **Check Windows Features**:
   - Settings → Apps → Optional Features
   - Ensure "Windows Subsystem for Linux" is enabled
   - Restart if you enable it

3. **Check System Requirements**:
   - Windows 10 64-bit: Pro, Enterprise, or Education (Build 19041 or higher)
   - OR Windows 11 64-bit
   - Virtualization enabled in BIOS
   - At least 4GB RAM (8GB recommended)

## Next Steps After Fix

Once Docker is working:

1. **Create environment file**:
   ```powershell
   Copy-Item docker\env.template docker\.env
   ```

2. **Edit `.env` file** (add your OpenAI API key):
   ```powershell
   notepad docker\.env
   ```

3. **Start services**:
   ```powershell
   docker-compose up -d
   ```

4. **Check status**:
   ```powershell
   docker-compose ps
   ```

## Need More Help?

- See [WINDOWS_SETUP.md](WINDOWS_SETUP.md) for complete Windows setup
- See [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) for more troubleshooting
- Check Docker Desktop logs: Help → Troubleshoot → View logs

