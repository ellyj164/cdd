<?php
/**
 * Response Helper Class
 * Standardized API responses with performance optimizations
 */

class ResponseHelper {
    
    // Send success response
    public static function sendSuccess($data = null, $message = 'Success', $statusCode = 200) {
        http_response_code($statusCode);
        
        $response = [
            'success' => true,
            'message' => $message,
            'timestamp' => date('c')
        ];
        
        if ($data !== null) {
            $response['data'] = $data;
        }
        
        // Performance: Use JSON_UNESCAPED_UNICODE for better performance
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit();
    }
    
    // Send error response
    public static function sendError($message = 'An error occurred', $statusCode = 400, $details = null) {
        http_response_code($statusCode);
        
        $response = [
            'success' => false,
            'error' => $message,
            'timestamp' => date('c')
        ];
        
        if ($details !== null) {
            $response['details'] = $details;
        }
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit();
    }
    
    // Send paginated response
    public static function sendPaginated($data, $page = 1, $limit = 20, $total = null, $message = 'Success') {
        $response = [
            'success' => true,
            'message' => $message,
            'data' => $data,
            'pagination' => [
                'page' => (int)$page,
                'limit' => (int)$limit,
                'total' => $total,
                'pages' => $total ? ceil($total / $limit) : null,
                'hasNext' => $total ? ($page * $limit) < $total : null,
                'hasPrev' => $page > 1
            ],
            'timestamp' => date('c')
        ];
        
        echo json_encode($response, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
        exit();
    }
    
    // Send validation error response
    public static function sendValidationError($errors) {
        self::sendError('Validation failed', 422, $errors);
    }
    
    // Send unauthorized response
    public static function sendUnauthorized($message = 'Unauthorized') {
        self::sendError($message, 401);
    }
    
    // Send forbidden response
    public static function sendForbidden($message = 'Forbidden') {
        self::sendError($message, 403);
    }
    
    // Send not found response
    public static function sendNotFound($message = 'Resource not found') {
        self::sendError($message, 404);
    }
    
    // Get request body as JSON
    public static function getJsonInput() {
        $input = file_get_contents('php://input');
        $data = json_decode($input, true);
        
        if (json_last_error() !== JSON_ERROR_NONE) {
            self::sendError('Invalid JSON data', 400);
        }
        
        return $data ?: [];
    }
    
    // Get query parameters with defaults
    public static function getQueryParams($defaults = []) {
        $params = $_GET;
        
        // Apply defaults
        foreach ($defaults as $key => $value) {
            if (!isset($params[$key])) {
                $params[$key] = $value;
            }
        }
        
        return $params;
    }
    
    // Sanitize output data
    public static function sanitizeOutput($data) {
        if (is_array($data)) {
            return array_map([self::class, 'sanitizeOutput'], $data);
        } elseif (is_string($data)) {
            return htmlspecialchars($data, ENT_QUOTES, 'UTF-8');
        }
        
        return $data;
    }
    
    // Format file size
    public static function formatFileSize($bytes) {
        $units = ['B', 'KB', 'MB', 'GB', 'TB'];
        
        for ($i = 0; $bytes > 1024 && $i < count($units) - 1; $i++) {
            $bytes /= 1024;
        }
        
        return round($bytes, 2) . ' ' . $units[$i];
    }
    
    // Performance metrics helper
    public static function addPerformanceMetrics($data) {
        if (!is_array($data)) {
            $data = ['result' => $data];
        }
        
        $data['performance'] = [
            'execution_time' => round(microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'], 4),
            'memory_usage' => self::formatFileSize(memory_get_usage(true)),
            'peak_memory' => self::formatFileSize(memory_get_peak_usage(true))
        ];
        
        return $data;
    }
}
?>