#!/bin/bash
set -e

# Ensure moodledata directory exists and has proper permissions
if [ ! -d /var/www/moodledata ]; then
    mkdir -p /var/www/moodledata
fi

chown -R www-data:www-data /var/www/moodledata
chmod -R 0777 /var/www/moodledata

# If config.php exists (e.g. created by CLI installer), make it readable by Apache.
if [ -f /var/www/html/config.php ]; then
    chown www-data:www-data /var/www/html/config.php
    chmod 0640 /var/www/html/config.php
fi

# Execute the original entrypoint with the command
exec docker-php-entrypoint "$@"
