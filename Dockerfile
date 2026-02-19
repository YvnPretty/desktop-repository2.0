FROM php:8.2-apache

# Install system dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libsqlite3-dev \
    && docker-php-ext-install pdo_sqlite

# Enable Apache mod_rewrite
RUN a2enmod rewrite

# Set working directory
WORKDIR /var/www/html

# Copy application source
COPY . /var/www/html/

# Set permissions for Apache to write to the directory (for SQLite file creation)
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html
