#!/bin/bash
set -e

# Ensure moodledata directory exists and has proper permissions
if [ ! -d /var/www/moodledata ]; then
    mkdir -p /var/www/moodledata
fi

chown -R www-data:www-data /var/www/moodledata
chmod -R 0777 /var/www/moodledata

# Execute the original entrypoint with the command
exec docker-php-entrypoint "$@"
