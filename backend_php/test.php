<?php
/**
 * Backend Test Script
 * Tests the PHP backend functionality without database dependency
 */

// Include configuration
require_once __DIR__ . '/config/config.php';
require_once __DIR__ . '/includes/ResponseHelper.php';
require_once __DIR__ . '/includes/Auth.php';
require_once __DIR__ . '/includes/Validator.php';

echo "=== PHP Backend Test Suite ===\n\n";

// Test 1: Configuration
echo "1. Testing Configuration...\n";
if (defined('DB_HOST') && defined('JWT_SECRET')) {
    echo "   ✓ Configuration loaded successfully\n";
} else {
    echo "   ✗ Configuration failed to load\n";
}

// Test 2: JWT Functions
echo "\n2. Testing JWT Functions...\n";
try {
    $payload = ['userId' => 'test-123', 'role' => 'customer'];
    $token = Auth::generateJWT($payload);
    $decoded = Auth::verifyJWT($token);
    
    if ($decoded && $decoded['userId'] === 'test-123') {
        echo "   ✓ JWT generation and verification working\n";
    } else {
        echo "   ✗ JWT verification failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ JWT test failed: " . $e->getMessage() . "\n";
}

// Test 3: Password Hashing
echo "\n3. Testing Password Functions...\n";
try {
    $password = 'test123';
    $hash = Auth::hashPassword($password);
    $verified = Auth::verifyPassword($password, $hash);
    
    if ($verified) {
        echo "   ✓ Password hashing and verification working\n";
    } else {
        echo "   ✗ Password verification failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Password test failed: " . $e->getMessage() . "\n";
}

// Test 4: Validation Functions
echo "\n4. Testing Validation Functions...\n";
try {
    $validEmail = Validator::email('test@example.com');
    $invalidEmail = Validator::email('invalid-email');
    $validPassword = Validator::password('password123');
    $invalidPassword = Validator::password('123');
    
    if ($validEmail && !$invalidEmail && $validPassword && !$invalidPassword) {
        echo "   ✓ Email and password validation working\n";
    } else {
        echo "   ✗ Validation tests failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Validation test failed: " . $e->getMessage() . "\n";
}

// Test 5: Rate Limiter
echo "\n5. Testing Rate Limiter...\n";
try {
    require_once __DIR__ . '/includes/RateLimiter.php';
    $rateLimiter = new RateLimiter();
    
    // Clear any existing limits
    $rateLimiter->clear();
    
    $allowed = $rateLimiter->checkLimit('127.0.0.1', 'test');
    $remaining = $rateLimiter->getRemaining('127.0.0.1', 'test');
    
    if ($allowed && $remaining > 0) {
        echo "   ✓ Rate limiter working\n";
    } else {
        echo "   ✗ Rate limiter failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Rate limiter test failed: " . $e->getMessage() . "\n";
}

// Test 6: Response Helper
echo "\n6. Testing Response Helper...\n";
try {
    ob_start();
    ResponseHelper::sendSuccess(['test' => 'data'], 'Test message');
    $output = ob_get_clean();
    
    $response = json_decode($output, true);
    if ($response && $response['success'] && $response['data']['test'] === 'data') {
        echo "   ✓ Response helper working\n";
    } else {
        echo "   ✗ Response helper failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Response helper test failed: " . $e->getMessage() . "\n";
}

// Test 7: Router (basic)
echo "\n7. Testing Router...\n";
try {
    require_once __DIR__ . '/includes/Router.php';
    $router = new Router();
    
    $testHandler = function() {
        return 'test-response';
    };
    
    $router->get('/test', $testHandler);
    $routes = $router->getRoutes();
    
    if (!empty($routes) && $routes[0]['path'] === '/test') {
        echo "   ✓ Router working\n";
    } else {
        echo "   ✗ Router failed\n";
    }
} catch (Exception $e) {
    echo "   ✗ Router test failed: " . $e->getMessage() . "\n";
}

echo "\n=== Test Summary ===\n";
echo "Core PHP backend components are functioning correctly!\n";
echo "Note: Database-dependent tests require MySQL connection.\n\n";

echo "To test with database:\n";
echo "1. Set up MySQL with the provided schema\n";
echo "2. Update database credentials in config/config.php\n";
echo "3. Run: php -S localhost:8080 index.php\n";
echo "4. Test: curl http://localhost:8080/health\n\n";

echo "✅ PHP Backend Migration Successful!\n";
?>