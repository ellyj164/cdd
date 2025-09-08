<?php
/**
 * High-Performance Router Class
 * Handles API routing with parameter extraction and middleware support
 */

class Router {
    private $routes = [];
    private $middleware = [];
    
    public function __construct() {
        // Default middleware for authentication
        $this->middleware['auth'] = function() {
            return Auth::validateRequest();
        };
    }
    
    // Add GET route
    public function get($path, $handler, $middleware = []) {
        $this->addRoute('GET', $path, $handler, $middleware);
    }
    
    // Add POST route
    public function post($path, $handler, $middleware = []) {
        $this->addRoute('POST', $path, $handler, $middleware);
    }
    
    // Add PUT route
    public function put($path, $handler, $middleware = []) {
        $this->addRoute('PUT', $path, $handler, $middleware);
    }
    
    // Add DELETE route
    public function delete($path, $handler, $middleware = []) {
        $this->addRoute('DELETE', $path, $handler, $middleware);
    }
    
    // Add route with any method
    private function addRoute($method, $path, $handler, $middleware = []) {
        // Convert path parameters to regex
        $pattern = preg_replace('/\{([^}]+)\}/', '([^/]+)', $path);
        $pattern = '#^' . $pattern . '$#';
        
        $this->routes[] = [
            'method' => $method,
            'path' => $path,
            'pattern' => $pattern,
            'handler' => $handler,
            'middleware' => $middleware
        ];
    }
    
    // Route the request
    public function route($method, $path) {
        foreach ($this->routes as $route) {
            if ($route['method'] === $method && preg_match($route['pattern'], $path, $matches)) {
                // Extract parameters
                $params = array_slice($matches, 1);
                
                // Apply middleware
                if (!empty($route['middleware'])) {
                    foreach ($route['middleware'] as $middlewareName) {
                        if (isset($this->middleware[$middlewareName])) {
                            $result = $this->middleware[$middlewareName]();
                            if ($result === false) {
                                return; // Middleware blocked the request
                            }
                        }
                    }
                }
                
                // Call the handler
                if (is_array($route['handler'])) {
                    // Class method
                    $class = $route['handler'][0];
                    $method = $route['handler'][1];
                    
                    if (class_exists($class)) {
                        $instance = new $class();
                        if (method_exists($instance, $method)) {
                            call_user_func_array([$instance, $method], $params);
                            return;
                        }
                    }
                } elseif (is_callable($route['handler'])) {
                    // Function or closure
                    call_user_func_array($route['handler'], $params);
                    return;
                }
                
                ResponseHelper::sendError('Handler not found', 500);
                return;
            }
        }
        
        // No route found
        ResponseHelper::sendError('Endpoint not found', 404);
    }
    
    // Add middleware
    public function addMiddleware($name, $handler) {
        $this->middleware[$name] = $handler;
    }
    
    // Get all routes (for debugging)
    public function getRoutes() {
        return $this->routes;
    }
}
?>