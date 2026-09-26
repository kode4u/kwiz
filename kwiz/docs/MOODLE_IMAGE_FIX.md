# Fix: Moodle Docker Image Not Found

## Problem

Error: `failed to resolve reference "docker.io/bitnami/moodle:4": not found`

The Bitnami Moodle images are not available on Docker Hub. **This has been fixed by creating a custom Moodle Dockerfile.**

## ✅ Solution: Custom Moodle Dockerfile (Already Implemented)

The project now uses a custom Dockerfile that builds Moodle from source. This is already configured in `docker-compose.yml`.

**No action needed** - just run:
```powershell
docker-compose up -d
```

The Dockerfile will:
- Download and install Moodle 4.3
- Set up all required PHP extensions
- Configure Apache
- Mount your plugin automatically

## Solution 1: Use Available Bitnami Tag (Recommended)

The docker-compose.yml has been updated to use `bitnami/moodle:4.3` which is a valid tag.

Try again:
```powershell
docker-compose up -d
```

## Solution 2: Check Available Tags

If `4.3` doesn't work, check available tags:

```powershell
# List available tags (requires docker hub account or use web)
# Visit: https://hub.docker.com/r/bitnami/moodle/tags
```

Common available tags:
- `bitnami/moodle:latest` - Latest version
- `bitnami/moodle:4.3` - Moodle 4.3
- `bitnami/moodle:4.4` - Moodle 4.4 (if available)
- `bitnami/moodle:4.3-debian-11` - Specific OS version

## Solution 3: Use Specific Version

Edit `docker-compose.yml` and change:

```yaml
moodle:
  image: bitnami/moodle:4.3  # Try different versions
```

Or use latest:
```yaml
moodle:
  image: bitnami/moodle:latest
```

## Solution 4: Pull Image Manually

```powershell
# Pull the image first
docker pull bitnami/moodle:4.3

# Then start services
docker-compose up -d
```

## Solution 5: Use Alternative Image

If Bitnami images don't work, you can use the official Moodle setup:

1. **Use the alternative compose file**:
   ```powershell
   docker-compose -f docker-compose.yml -f docker-compose.alternative.yml up -d
   ```

2. **Or manually install Moodle**:
   - Use a base PHP image
   - Install Moodle manually
   - Mount your plugin

## Verify Image Exists

Check if image exists before using:
```powershell
docker pull bitnami/moodle:4.3
```

If this fails, the tag doesn't exist. Try:
```powershell
docker pull bitnami/moodle:latest
```

## Recommended Fix

1. **Update docker-compose.yml** to use a known working tag:
   ```yaml
   image: bitnami/moodle:4.3
   ```

2. **Or use latest**:
   ```yaml
   image: bitnami/moodle:latest
   ```

3. **Pull image first**:
   ```powershell
   docker pull bitnami/moodle:4.3
   docker-compose up -d
   ```

## Check Current Configuration

The current `docker-compose.yml` uses `bitnami/moodle:4.3`. If this still fails:

1. Check Docker Hub: https://hub.docker.com/r/bitnami/moodle/tags
2. Find a valid tag
3. Update `docker-compose.yml` with that tag
4. Try again

## Alternative: Build Custom Moodle Image

If Bitnami images continue to have issues, create a custom Dockerfile:

```dockerfile
FROM php:8.1-apache

# Install dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev libjpeg-dev libfreetype6-dev libzip-dev unzip git \
    && docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli pdo pdo_mysql zip \
    && a2enmod rewrite

WORKDIR /var/www/html

# Download and install Moodle
RUN curl -L https://download.moodle.org/download.php/direct/stable403/moodle-latest-403.tgz | tar -xz \
    && chown -R www-data:www-data /var/www/html

EXPOSE 80
CMD ["apache2-foreground"]
```

Then update docker-compose.yml:
```yaml
moodle:
  build:
    context: ./docker/moodle
    dockerfile: Dockerfile
  # ... rest of config
```

