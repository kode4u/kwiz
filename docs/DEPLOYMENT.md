# Deployment Guide

## Production Deployment

### Prerequisites

- Server with Docker & Docker Compose
- Domain name with DNS configured
- SSL certificates (Let's Encrypt recommended)
- Minimum 4GB RAM, 2 CPU cores
- 20GB+ disk space

### Step 1: Server Setup

1. **Update system:**
   ```bash
   sudo apt update && sudo apt upgrade -y
   ```

2. **Install Docker:**
   ```bash
   curl -fsSL https://get.docker.com -o get-docker.sh
   sudo sh get-docker.sh
   sudo usermod -aG docker $USER
   ```

3. **Install Docker Compose:**
   ```bash
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   ```

### Step 2: Clone and Configure

1. **Clone repository:**
   ```bash
   git clone <repository-url>
   cd jica
   ```

2. **Create production environment file:**
   ```bash
   cp docker/.env.example docker/.env.production
   ```

3. **Edit `docker/.env.production`:**
   ```env
   # Moodle
   MOODLE_URL=https://your-domain.com
   MOODLE_ADMIN_USER=admin
   MOODLE_ADMIN_PASS=StrongPassword123!
   MOODLE_ADMIN_EMAIL=admin@your-domain.com

   # Database
   MYSQL_ROOT_PASSWORD=StrongRootPassword123!
   MYSQL_DATABASE=moodle
   MYSQL_USER=moodle
   MYSQL_PASSWORD=StrongDBPassword123!

   # Redis
   REDIS_PASSWORD=StrongRedisPassword123!

   # WebSocket Server
   WS_PORT=3001
   WS_SECRET=$(openssl rand -hex 32)
   CORS_ORIGIN=https://your-domain.com

   # LLM API
   LLM_API_PORT=5001
   LLM_BACKEND=openai
   OPENAI_API_KEY=your-production-openai-key
   MAX_QUESTIONS=10
   DEFAULT_LANGUAGE=en

   # JWT
   JWT_SECRET=$(openssl rand -hex 32)
   JWT_EXPIRY=3600
   ```

### Step 3: SSL/TLS Setup

1. **Install Certbot:**
   ```bash
   sudo apt install certbot
   ```

2. **Obtain certificates:**
   ```bash
   sudo certbot certonly --standalone -d your-domain.com
   ```

3. **Set up Nginx reverse proxy** (see `docker/nginx.conf.example`)

### Step 4: Deploy with Docker Compose

1. **Use production compose file:**
   ```bash
   docker-compose -f docker-compose.yml -f docker-compose.prod.yml --env-file docker/.env.production up -d
   ```

2. **Verify services:**
   ```bash
   docker-compose ps
   docker-compose logs -f
   ```

### Step 5: Configure Moodle

1. **Access Moodle:**
   - Open https://your-domain.com
   - Complete installation wizard

2. **Configure plugin:**
   - Site administration → Plugins → Activity modules → Gamified Quiz
   - Set WebSocket URL: `wss://your-domain.com`
   - Set LLM API URL: `https://your-domain.com/api`
   - Set JWT Secret (must match WebSocket server)

### Step 6: Security Hardening

1. **Firewall:**
   ```bash
   sudo ufw allow 22/tcp
   sudo ufw allow 80/tcp
   sudo ufw allow 443/tcp
   sudo ufw enable
   ```

2. **Database security:**
   - Use strong passwords
   - Restrict database access to Docker network only
   - Enable SSL for database connections

3. **Redis security:**
   - Set Redis password
   - Bind Redis to localhost only
   - Use Redis ACLs

4. **Environment variables:**
   - Never commit `.env` files
   - Use secrets management (Docker secrets, Vault, etc.)
   - Rotate secrets regularly

### Step 7: Monitoring

1. **Set up logging:**
   ```bash
   # Configure log rotation
   docker-compose logs -f > /var/log/jica/app.log
   ```

2. **Health checks:**
   - Monitor `/health` endpoints
   - Set up uptime monitoring (UptimeRobot, etc.)
   - Configure alerts

3. **Resource monitoring:**
   ```bash
   docker stats
   ```

## Docker Swarm Deployment (Optional)

For multi-server deployment:

1. **Initialize swarm:**
   ```bash
   docker swarm init
   ```

2. **Deploy stack:**
   ```bash
   docker stack deploy -c docker-compose.swarm.yml jica
   ```

3. **Scale services:**
   ```bash
   docker service scale jica_websocket-server=3
   ```

## Kubernetes Deployment (Optional)

1. **Create namespace:**
   ```bash
   kubectl create namespace jica
   ```

2. **Apply configurations:**
   ```bash
   kubectl apply -f k8s/
   ```

3. **Expose services:**
   ```bash
   kubectl expose deployment llmapi --type=LoadBalancer
   ```

## Backup Strategy

### Database Backup

1. **Automated daily backup:**
   ```bash
   # Create backup script
   docker exec jica-mysql mysqldump -u moodle -p moodle > backup_$(date +%Y%m%d).sql
   ```

2. **Restore:**
   ```bash
   docker exec -i jica-mysql mysql -u moodle -p moodle < backup_20250101.sql
   ```

### Moodle Data Backup

1. **Backup moodle_data volume:**
   ```bash
   docker run --rm -v jica_moodle_data:/data -v $(pwd):/backup alpine tar czf /backup/moodle_data_$(date +%Y%m%d).tar.gz /data
   ```

2. **Restore:**
   ```bash
   docker run --rm -v jica_moodle_data:/data -v $(pwd):/backup alpine tar xzf /backup/moodle_data_20250101.tar.gz -C /
   ```

## Scaling

### Horizontal Scaling

1. **WebSocket Server:**
   - Use Redis adapter for Socket.IO
   - Deploy multiple instances behind load balancer
   - Use sticky sessions or Redis pub/sub

2. **LLM API:**
   - Stateless, can scale horizontally
   - Use load balancer
   - Implement rate limiting per instance

### Vertical Scaling

- Increase container resources in `docker-compose.yml`:
  ```yaml
  services:
    websocket-server:
      deploy:
        resources:
          limits:
            cpus: '2'
            memory: 2G
  ```

## Maintenance

### Updates

1. **Pull latest code:**
   ```bash
   git pull
   ```

2. **Rebuild and restart:**
   ```bash
   docker-compose build
   docker-compose up -d
   ```

3. **Run Moodle upgrade:**
   ```bash
   docker exec -it moodle php /var/www/html/moodle/admin/cli/upgrade.php
   ```

### Log Rotation

Configure log rotation in `/etc/logrotate.d/docker-containers`:
```
/var/lib/docker/containers/*/*.log {
    rotate 7
    daily
    compress
    size=1M
    missingok
    delaycompress
    copytruncate
}
```

## Troubleshooting

### Service Won't Start

1. Check logs: `docker-compose logs <service>`
2. Verify environment variables
3. Check port conflicts
4. Verify disk space

### Performance Issues

1. Check resource usage: `docker stats`
2. Review application logs
3. Check database performance
4. Monitor Redis memory usage

### SSL Certificate Renewal

1. **Automatic renewal:**
   ```bash
   sudo certbot renew --dry-run
   ```

2. **Update Nginx configuration** if needed
3. **Reload Nginx:**
   ```bash
   sudo nginx -s reload
   ```

## Disaster Recovery

1. **Regular backups** (daily database, weekly full)
2. **Test restore procedures** regularly
3. **Document recovery steps**
4. **Keep backup copies off-site**

## Support

For deployment issues:
- Check logs: `docker-compose logs`
- Review [TROUBLESHOOTING.md](TROUBLESHOOTING.md)
- Open GitHub issue
- Contact system administrator

