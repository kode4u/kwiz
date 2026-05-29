FROM php:8.1-apache

# Install system dependencies required by Moodle
RUN apt-get update && apt-get install -y \
    --no-install-recommends \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    libicu-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libonig-dev \
    unzip \
    git \
    curl \
    && rm -rf /var/lib/apt/lists/*

# Install PHP extensions required by Moodle
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install -j$(nproc) gd mysqli pdo_mysql zip intl soap opcache \
    && a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Download and install Moodle 4.3 (GitHub; moodle.org/packaging.moodle.org blocks curl with 403)
RUN curl -fsSL "https://codeload.github.com/moodle/moodle/tar.gz/refs/heads/MOODLE_403_STABLE" -o /tmp/moodle.tgz \
    && mkdir -p /tmp/moodle-src \
    && tar -xzf /tmp/moodle.tgz -C /tmp/moodle-src --strip-components=1 \
    && cp -a /tmp/moodle-src/. /var/www/html/ \
    && rm -rf /tmp/moodle.tgz /tmp/moodle-src \
    && chown -R www-data:www-data /var/www/html

# Configure PHP for Moodle
RUN echo "memory_limit = 256M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "upload_max_filesize = 64M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "post_max_size = 64M" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "max_execution_time = 600" >> /usr/local/etc/php/conf.d/moodle.ini \
    && echo "max_input_vars = 10000" >> /usr/local/etc/php/conf.d/moodle.ini

# Copy entrypoint script
COPY docker-entrypoint.sh /usr/local/bin/
RUN chmod +x /usr/local/bin/docker-entrypoint.sh

# Expose port 80
EXPOSE 80

# Use custom entrypoint
ENTRYPOINT ["/usr/local/bin/docker-entrypoint.sh"]
CMD ["apache2-foreground"]
