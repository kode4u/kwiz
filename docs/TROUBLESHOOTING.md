# Troubleshooting Guide

## Windows-Specific Issues

### Docker Daemon Not Running

**Error**: `unable to get image: error during connect: in the default daemon configuration on Windows, the docker client must be run with elevated privileges`

**Solutions**:

1. **Start Docker Desktop**:
   - Open Docker Desktop application
   - Wait for it to fully start (whale icon in system tray should be steady)
   - Verify it's running: `docker ps`

2. **Run PowerShell as Administrator**:
   - Right-click PowerShell
   - Select "Run as Administrator"
   - Navigate to project directory
   - Run `docker-compose up -d`

3. **Check Docker Service**:
   ```powershell
   # Check if Docker service is running
   Get-Service *docker*
   
   # If not running, start it (requires admin)
   Start-Service docker
   ```

4. **Restart Docker Desktop**:
   - Right-click Docker Desktop icon in system tray
   - Click "Restart"
   - Wait for restart to complete

5. **Verify Docker Installation**:
   ```powershell
   docker --version
   docker-compose --version
   docker ps
   ```

### Port Already in Use

**Error**: `Bind for 0.0.0.0:8080 failed: port is already allocated`

**Solutions**:

1. **Find process using port**:
   ```powershell
   netstat -ano | findstr :8080
   ```

2. **Kill process** (replace PID with actual process ID):
   ```powershell
   taskkill /PID <PID> /F
   ```

3. **Change port in docker-compose.yml**:
   ```yaml
   ports:
     - "8081:8080"  # Use 8081 instead of 8080
   ```

### WSL2 Issues (Windows)

If using WSL2 backend:

1. **Update WSL2**:
   ```powershell
   wsl --update
   ```

2. **Set WSL2 as default**:
   ```powershell
   wsl --set-default-version 2
   ```

3. **Restart Docker Desktop** after WSL2 changes

### File Path Issues

**Error**: `invalid volume specification`

**Solutions**:

1. **Use forward slashes or escaped backslashes**:
   ```yaml
   volumes:
     - ./moodle-plugin/mod/gamifiedquiz:/bitnami/moodle/moodle/mod/gamifiedquiz
   ```

2. **Use absolute paths**:
   ```yaml
   volumes:
     - C:/Users/Admin/Desktop/jica/moodle-plugin/mod/gamifiedquiz:/bitnami/moodle/moodle/mod/gamifiedquiz
   ```

## General Issues

### Services Won't Start

1. **Check logs**:
   ```powershell
   docker-compose logs
   docker-compose logs <service-name>
   ```

2. **Check service status**:
   ```powershell
   docker-compose ps
   ```

3. **Restart services**:
   ```powershell
   docker-compose restart
   docker-compose restart <service-name>
   ```

### Container Build Failures

1. **Clean build**:
   ```powershell
   docker-compose build --no-cache
   ```

2. **Remove old containers**:
   ```powershell
   docker-compose down
   docker system prune -a
   ```

### Database Connection Issues

1. **Wait for database to be ready**:
   ```powershell
   # Check database health
   docker-compose exec db mysqladmin ping -h localhost
   ```

2. **Check database logs**:
   ```powershell
   docker-compose logs db
   ```

3. **Verify environment variables**:
   - Check `docker/.env` file
   - Ensure database credentials match

### Redis Connection Issues

1. **Test Redis connection**:
   ```powershell
   docker-compose exec redis redis-cli ping
   ```

2. **Check Redis logs**:
   ```powershell
   docker-compose logs redis
   ```

### Moodle Plugin Not Appearing

1. **Run Moodle upgrade**:
   ```powershell
   docker-compose exec moodle php /var/www/html/moodle/admin/cli/upgrade.php
   ```

2. **Clear Moodle cache**:
   ```powershell
   docker-compose exec moodle php /var/www/html/moodle/admin/cli/purge_caches.php
   ```

3. **Check plugin directory**:
   ```powershell
   docker-compose exec moodle ls -la /bitnami/moodle/moodle/mod/gamifiedquiz
   ```

4. **Verify plugin files**:
   - Ensure `version.php` exists
   - Check file permissions

### WebSocket Connection Fails

1. **Check WebSocket server logs**:
   ```powershell
   docker-compose logs websocket-server
   ```

2. **Verify JWT secret matches**:
   - Check `docker/.env` → `JWT_SECRET`
   - Check Moodle plugin settings → JWT Secret
   - They must be identical

3. **Test WebSocket connection**:
   ```powershell
   # Install wscat
   npm install -g wscat
   
   # Test connection (need valid JWT token)
   wscat -c ws://localhost:3001 -H "Authorization: Bearer <token>"
   ```

4. **Check CORS settings**:
   - Verify `CORS_ORIGIN` in `docker/.env`
   - Should match Moodle URL

### LLM API Issues

1. **Check API health**:
   ```powershell
   curl http://localhost:5000/health
   ```

2. **Check API logs**:
   ```powershell
   docker-compose logs llmapi
   ```

3. **Verify OpenAI API key**:
   - Check `docker/.env` → `OPENAI_API_KEY`
   - Ensure key is valid and has credits

4. **Test question generation**:
   ```powershell
   curl -X POST http://localhost:5000/generate `
     -H "Content-Type: application/json" `
     -d '{\"topic\": \"Python\", \"level\": \"easy\", \"n_questions\": 1}'
   ```

### Memory Issues

**Error**: Container killed due to memory limit

**Solutions**:

1. **Increase Docker memory limit**:
   - Docker Desktop → Settings → Resources
   - Increase Memory (recommended: 8GB+)

2. **Reduce services**:
   - Start only needed services
   - Comment out unused services in `docker-compose.yml`

### Network Issues

1. **Check network**:
   ```powershell
   docker network ls
   docker network inspect jica_jica-network
   ```

2. **Recreate network**:
   ```powershell
   docker-compose down
   docker network prune
   docker-compose up -d
   ```

## Quick Diagnostic Commands

```powershell
# Check all containers
docker-compose ps

# Check all logs
docker-compose logs

# Check resource usage
docker stats

# Check Docker system info
docker system info

# Check disk usage
docker system df

# Clean up unused resources
docker system prune
```

## Getting Help

1. **Check logs first**:
   ```powershell
   docker-compose logs > logs.txt
   ```

2. **Gather system info**:
   ```powershell
   docker system info > docker-info.txt
   docker-compose config > config.txt
   ```

3. **Open GitHub issue** with:
   - Error messages
   - Log files
   - System information
   - Steps to reproduce

## Common Solutions Summary

| Issue | Solution |
|-------|----------|
| Docker daemon not running | Start Docker Desktop |
| Port in use | Change port or kill process |
| Build fails | `docker-compose build --no-cache` |
| Services won't start | Check logs, verify environment |
| Plugin not appearing | Run Moodle upgrade, clear cache |
| WebSocket fails | Check JWT secret, CORS settings |
| API errors | Verify API keys, check logs |

