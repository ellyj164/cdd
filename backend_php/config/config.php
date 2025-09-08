<?php
/**
 * Configuration file for high-performance PHP backend
 */

// Database configuration - Use existing MySQL schema
define('DB_HOST', 'localhost');
define('DB_NAME', 'marked');
define('DB_USER', 'duns1');
define('DB_PASS', 'Tumukunde');
define('DB_CHARSET', 'utf8mb4');

// JWT Configuration
define('JWT_SECRET', 'your-super-secure-jwt-secret-key-change-this-in-production');
define('JWT_ALGORITHM', 'HS256');
define('JWT_EXPIRY', 86400); // 24 hours
define('JWT_REFRESH_EXPIRY', 604800); // 7 days

// Application configuration
define('APP_NAME', 'High-Performance PHP Ecommerce Backend');
define('APP_VERSION', '1.0.0');
define('APP_URL', 'https://yourdomain.com');
define('API_BASE_URL', '/backend_php');

// Performance configuration
define('CACHE_ENABLED', true);
define('CACHE_EXPIRY', 3600); // 1 hour
define('RATE_LIMIT_REQUESTS', 100); // requests per minute
define('RATE_LIMIT_WINDOW', 60); // seconds

// File upload configuration
define('UPLOAD_PATH', __DIR__ . '/../uploads/');
define('UPLOAD_MAX_SIZE', 5242880); // 5MB
define('ALLOWED_EXTENSIONS', ['jpg', 'jpeg', 'png', 'gif', 'webp']);

// Email configuration (for password reset, etc.)
define('SMTP_HOST', 'your-smtp-host.com');
define('SMTP_PORT', 587);
define('SMTP_USERNAME', 'your-email@domain.com');
define('SMTP_PASSWORD', 'your-smtp-password');
define('SMTP_FROM_EMAIL', 'noreply@yourdomain.com');
define('SMTP_FROM_NAME', 'Ecommerce Platform');

// Security configuration
define('BCRYPT_COST', 12);
define('SESSION_LIFETIME', 7200); // 2 hours
define('CSRF_TOKEN_LENGTH', 32);

// Pagination defaults
define('DEFAULT_PAGE_SIZE', 20);
define('MAX_PAGE_SIZE', 100);

// Product configuration
define('FEATURED_PRODUCTS_LIMIT', 8);
define('TRENDING_PRODUCTS_LIMIT', 8);
define('DEALS_PRODUCTS_LIMIT', 8);
define('RECOMMENDATIONS_LIMIT', 8);

// Environment detection
define('IS_DEVELOPMENT', !empty($_SERVER['HTTP_HOST']) && strpos($_SERVER['HTTP_HOST'], 'localhost') !== false);

// Performance optimizations
if (!IS_DEVELOPMENT) {
    // Production optimizations
    ini_set('opcache.enable', 1);
    ini_set('opcache.memory_consumption', 128);
    ini_set('opcache.max_accelerated_files', 4000);
    ini_set('opcache.revalidate_freq', 60);
    ini_set('opcache.fast_shutdown', 1);
}

// Timezone
date_default_timezone_set('UTC');

// Error reporting
if (IS_DEVELOPMENT) {
    error_reporting(E_ALL);
    ini_set('display_errors', 1);
    ini_set('log_errors', 1);
} else {
    error_reporting(0);
    ini_set('display_errors', 0);
    ini_set('log_errors', 1);
}

// Set maximum execution time
set_time_limit(30);

// Set memory limit
ini_set('memory_limit', '128M');

?>