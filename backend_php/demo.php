<?php
/**
 * Demo PHP Backend for Screenshots
 * Provides mock data for demonstration purposes
 */

// Performance optimization: Enable output buffering
ob_start();

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

// Parse the request path
$request_uri = $_SERVER['REQUEST_URI'];
$path = parse_url($request_uri, PHP_URL_PATH);

// Remove /backend_php from the path if present
$path = preg_replace('#^/backend_php#', '', $path);

// Route the request
switch ($path) {
    case '/api/health':
        sendResponse([
            'status' => 'healthy',
            'message' => 'PHP Backend is running successfully',
            'timestamp' => date('c'),
            'version' => '1.0.0',
            'database' => 'mock',
            'performance' => [
                'response_time' => '< 50ms',
                'memory_usage' => '32MB',
                'cpu_usage' => 'Low'
            ]
        ]);
        break;
        
    case '/api/products':
        sendResponse([
            'products' => [
                [
                    'id' => '1',
                    'name' => 'Premium Laptop',
                    'price' => 1299.99,
                    'image' => 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
                    'rating' => 4.8,
                    'category' => 'Electronics',
                    'inStock' => true
                ],
                [
                    'id' => '2', 
                    'name' => 'Wireless Headphones',
                    'price' => 199.99,
                    'image' => 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
                    'rating' => 4.6,
                    'category' => 'Electronics',
                    'inStock' => true
                ],
                [
                    'id' => '3',
                    'name' => 'Smart Watch',
                    'price' => 299.99,
                    'image' => 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
                    'rating' => 4.7,
                    'category' => 'Electronics',
                    'inStock' => true
                ],
                [
                    'id' => '4',
                    'name' => 'Gaming Mouse',
                    'price' => 79.99,
                    'image' => 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400',
                    'rating' => 4.5,
                    'category' => 'Electronics',
                    'inStock' => true
                ]
            ],
            'pagination' => [
                'page' => 1,
                'totalPages' => 1,
                'totalItems' => 4
            ]
        ]);
        break;
        
    case '/api/categories':
        sendResponse([
            'categories' => [
                ['id' => '1', 'name' => 'Electronics', 'count' => 150],
                ['id' => '2', 'name' => 'Clothing', 'count' => 89],
                ['id' => '3', 'name' => 'Home & Garden', 'count' => 67],
                ['id' => '4', 'name' => 'Sports', 'count' => 45]
            ]
        ]);
        break;
        
    case '/api/auth/profile':
        sendResponse([
            'user' => [
                'id' => '1',
                'name' => 'Demo User',
                'email' => 'demo@example.com',
                'role' => 'customer'
            ]
        ]);
        break;
        
    case '/api/cart':
        sendResponse([
            'items' => [
                [
                    'id' => '1',
                    'productId' => '1',
                    'name' => 'Premium Laptop',
                    'price' => 1299.99,
                    'quantity' => 1,
                    'subtotal' => 1299.99
                ]
            ],
            'total' => 1299.99,
            'itemCount' => 1
        ]);
        break;
        
    case '/api/admin/dashboard':
        sendResponse([
            'stats' => [
                'totalUsers' => 1245,
                'totalProducts' => 351,
                'totalOrders' => 892,
                'revenue' => 45678.90
            ],
            'recentOrders' => [
                ['id' => '1', 'customer' => 'John Doe', 'amount' => 299.99, 'status' => 'completed'],
                ['id' => '2', 'customer' => 'Jane Smith', 'amount' => 149.99, 'status' => 'pending']
            ]
        ]);
        break;
        
    default:
        http_response_code(404);
        sendResponse([
            'error' => 'Endpoint not found',
            'path' => $path,
            'available_endpoints' => [
                '/api/health',
                '/api/products', 
                '/api/categories',
                '/api/auth/profile',
                '/api/cart',
                '/api/admin/dashboard'
            ]
        ]);
        break;
}

function sendResponse($data) {
    $response = [
        'success' => true,
        'timestamp' => date('c'),
        'data' => $data
    ];
    
    echo json_encode($response, JSON_PRETTY_PRINT);
    exit();
}
?>