<?php
/**
 * High-Performance PHP Backend for Ecommerce Platform
 * Entry point for all API requests
 * 
 * This file handles routing, middleware, and API request processing
 * Optimized for public_html deployment
 */

// Performance optimization: Enable output buffering
ob_start();

// Error reporting for development (remove in production)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set content type for API responses
header('Content-Type: application/json');

// Enable CORS for frontend communication
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With');

// Handle preflight OPTIONS requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Security headers
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('X-XSS-Protection: 1; mode=block');
header('Referrer-Policy: strict-origin-when-cross-origin');

// Start session with secure settings
ini_set('session.cookie_httponly', 1);
ini_set('session.cookie_secure', 1);
ini_set('session.use_strict_mode', 1);
session_start();

// Include core files
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/Database.php';
require_once __DIR__ . '/includes/Router.php';
require_once __DIR__ . '/includes/Auth.php';
require_once __DIR__ . '/includes/ResponseHelper.php';
require_once __DIR__ . '/includes/RateLimiter.php';
require_once __DIR__ . '/includes/Validator.php';

// Include API controllers
require_once __DIR__ . '/api/AuthController.php';
require_once __DIR__ . '/api/ProductController.php';
require_once __DIR__ . '/api/OrderController.php';
require_once __DIR__ . '/api/UserController.php';
require_once __DIR__ . '/api/CartController.php';
require_once __DIR__ . '/api/CategoryController.php';
require_once __DIR__ . '/api/ReviewController.php';
require_once __DIR__ . '/api/AdminController.php';
require_once __DIR__ . '/api/HomepageController.php';
require_once __DIR__ . '/api/BannerController.php';

// Initialize rate limiter
$rateLimiter = new RateLimiter();

// Check rate limits
if (!$rateLimiter->checkLimit($_SERVER['REMOTE_ADDR'])) {
    ResponseHelper::sendError('Rate limit exceeded. Please try again later.', 429);
    exit();
}

// Initialize router
$router = new Router();

// Parse the request URI
$requestUri = $_SERVER['REQUEST_URI'];
$requestMethod = $_SERVER['REQUEST_METHOD'];

// Remove query string and decode URI
$path = parse_url($requestUri, PHP_URL_PATH);
$path = urldecode($path);

// Remove base path if running in subdirectory
$basePath = '/backend_php';
if (strpos($path, $basePath) === 0) {
    $path = substr($path, strlen($basePath));
}

// Ensure path starts with /
if (substr($path, 0, 1) !== '/') {
    $path = '/' . $path;
}

// Define API routes
try {
    // Health check
    $router->get('/health', function() {
        ResponseHelper::sendSuccess(['status' => 'OK', 'timestamp' => date('c')]);
    });

    // API info
    $router->get('/api', function() {
        ResponseHelper::sendSuccess([
            'name' => 'High-Performance PHP Ecommerce Backend',
            'version' => '1.0.0',
            'status' => 'operational',
            'features' => [
                'authentication' => 'JWT-based auth with refresh tokens',
                'products' => 'Full product catalog with search',
                'orders' => 'Complete order management system',
                'users' => 'User management with role-based access',
                'cart' => 'Shopping cart functionality',
                'reviews' => 'Product reviews and ratings',
                'admin' => 'Administrative dashboard'
            ],
            'performance' => [
                'caching' => 'Enabled',
                'compression' => 'Enabled',
                'rate_limiting' => 'Enabled',
                'database_pooling' => 'Enabled'
            ]
        ]);
    });

    // Authentication routes
    $router->post('/api/auth/login', [AuthController::class, 'login']);
    $router->post('/api/auth/register', [AuthController::class, 'register']);
    $router->post('/api/auth/refresh', [AuthController::class, 'refresh']);
    $router->get('/api/auth/me', [AuthController::class, 'getProfile']);
    $router->post('/api/auth/logout', [AuthController::class, 'logout']);
    $router->post('/api/auth/forgot-password', [AuthController::class, 'forgotPassword']);
    $router->post('/api/auth/reset-password', [AuthController::class, 'resetPassword']);
    $router->post('/api/auth/verify-email', [AuthController::class, 'verifyEmail']);

    // Product routes
    $router->get('/api/products', [ProductController::class, 'getAll']);
    $router->get('/api/products/featured', [ProductController::class, 'getFeatured']);
    $router->get('/api/products/trending', [ProductController::class, 'getTrending']);
    $router->get('/api/products/deals', [ProductController::class, 'getDeals']);
    $router->get('/api/products/recommendations', [ProductController::class, 'getRecommendations']);
    $router->get('/api/products/recommendations/{userId}', [ProductController::class, 'getUserRecommendations']);
    $router->get('/api/products/categories/stats', [ProductController::class, 'getCategoryStats']);
    $router->get('/api/products/search/{query}', [ProductController::class, 'search']);
    $router->get('/api/products/{id}', [ProductController::class, 'getById']);
    $router->post('/api/products', [ProductController::class, 'create']);
    $router->put('/api/products/{id}', [ProductController::class, 'update']);
    $router->delete('/api/products/{id}', [ProductController::class, 'delete']);

    // Category routes
    $router->get('/api/categories', [CategoryController::class, 'getAll']);
    $router->get('/api/categories/{id}', [CategoryController::class, 'getById']);

    // Cart routes
    $router->get('/api/cart', [CartController::class, 'get']);
    $router->post('/api/cart/add', [CartController::class, 'add']);
    $router->put('/api/cart/update', [CartController::class, 'update']);
    $router->delete('/api/cart/remove/{itemId}', [CartController::class, 'remove']);
    $router->delete('/api/cart/clear', [CartController::class, 'clear']);

    // Order routes
    $router->get('/api/orders', [OrderController::class, 'getAll']);
    $router->get('/api/orders/{id}', [OrderController::class, 'getById']);
    $router->post('/api/orders', [OrderController::class, 'create']);

    // Review routes
    $router->get('/api/reviews', [ReviewController::class, 'getByProduct']);
    $router->post('/api/reviews', [ReviewController::class, 'create']);
    $router->put('/api/reviews/{id}', [ReviewController::class, 'update']);
    $router->delete('/api/reviews/{id}', [ReviewController::class, 'delete']);

    // Homepage routes
    $router->get('/api/homepage', [HomepageController::class, 'getData']);
    $router->get('/api/homepage/performance', [HomepageController::class, 'getPerformanceMetrics']);

    // Banner routes
    $router->get('/api/banners', [BannerController::class, 'getAll']);
    $router->get('/api/banners/hero', [BannerController::class, 'getHero']);

    // Admin routes
    $router->get('/api/admin/dashboard', [AdminController::class, 'getDashboard']);
    $router->get('/api/admin/users', [AdminController::class, 'getUsers']);
    $router->get('/api/admin/analytics', [AdminController::class, 'getAnalytics']);

    // Route the request
    $router->route($requestMethod, $path);

} catch (Exception $e) {
    error_log('API Error: ' . $e->getMessage());
    ResponseHelper::sendError('Internal server error', 500);
}

// Flush output buffer
ob_end_flush();
?>