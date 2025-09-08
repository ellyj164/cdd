<?php
/**
 * Rate Limiter Class
 * Prevents API abuse with configurable rate limiting
 */

class RateLimiter {
    private $storage;
    
    public function __construct() {
        // Use file-based storage for simplicity (in production, use Redis)
        $this->storage = __DIR__ . '/../cache/rate_limits.json';
        
        // Create cache directory if it doesn't exist
        $cacheDir = dirname($this->storage);
        if (!is_dir($cacheDir)) {
            mkdir($cacheDir, 0755, true);
        }
    }
    
    // Check if request is within rate limits
    public function checkLimit($clientIP, $endpoint = 'default') {
        $now = time();
        $windowStart = $now - RATE_LIMIT_WINDOW;
        
        // Load existing data
        $data = $this->loadData();
        
        // Clean old entries
        $this->cleanOldEntries($data, $windowStart);
        
        // Create key for this client/endpoint combination
        $key = hash('sha256', $clientIP . ':' . $endpoint);
        
        // Initialize if not exists
        if (!isset($data[$key])) {
            $data[$key] = [];
        }
        
        // Count requests in current window
        $requestCount = count(array_filter($data[$key], function($timestamp) use ($windowStart) {
            return $timestamp > $windowStart;
        }));
        
        // Check if limit exceeded
        if ($requestCount >= RATE_LIMIT_REQUESTS) {
            return false;
        }
        
        // Add current request
        $data[$key][] = $now;
        
        // Save data
        $this->saveData($data);
        
        return true;
    }
    
    // Get current usage for a client
    public function getUsage($clientIP, $endpoint = 'default') {
        $now = time();
        $windowStart = $now - RATE_LIMIT_WINDOW;
        
        $data = $this->loadData();
        $key = hash('sha256', $clientIP . ':' . $endpoint);
        
        if (!isset($data[$key])) {
            return 0;
        }
        
        return count(array_filter($data[$key], function($timestamp) use ($windowStart) {
            return $timestamp > $windowStart;
        }));
    }
    
    // Get remaining requests
    public function getRemaining($clientIP, $endpoint = 'default') {
        $used = $this->getUsage($clientIP, $endpoint);
        return max(0, RATE_LIMIT_REQUESTS - $used);
    }
    
    // Get reset time
    public function getResetTime($clientIP, $endpoint = 'default') {
        $data = $this->loadData();
        $key = hash('sha256', $clientIP . ':' . $endpoint);
        
        if (!isset($data[$key]) || empty($data[$key])) {
            return time();
        }
        
        $oldestRequest = min($data[$key]);
        return $oldestRequest + RATE_LIMIT_WINDOW;
    }
    
    // Load rate limit data
    private function loadData() {
        if (!file_exists($this->storage)) {
            return [];
        }
        
        $content = file_get_contents($this->storage);
        $data = json_decode($content, true);
        
        return $data ?: [];
    }
    
    // Save rate limit data
    private function saveData($data) {
        $content = json_encode($data, JSON_PRETTY_PRINT);
        file_put_contents($this->storage, $content, LOCK_EX);
    }
    
    // Clean old entries to prevent memory bloat
    private function cleanOldEntries(&$data, $windowStart) {
        foreach ($data as $key => &$requests) {
            $requests = array_filter($requests, function($timestamp) use ($windowStart) {
                return $timestamp > $windowStart;
            });
            
            // Remove empty keys
            if (empty($requests)) {
                unset($data[$key]);
            }
        }
    }
    
    // Clear all rate limit data (for testing)
    public function clear() {
        if (file_exists($this->storage)) {
            unlink($this->storage);
        }
    }
    
    // Get statistics
    public function getStats() {
        $data = $this->loadData();
        $now = time();
        $windowStart = $now - RATE_LIMIT_WINDOW;
        
        $totalClients = count($data);
        $activeClients = 0;
        $totalRequests = 0;
        
        foreach ($data as $requests) {
            $recentRequests = array_filter($requests, function($timestamp) use ($windowStart) {
                return $timestamp > $windowStart;
            });
            
            if (!empty($recentRequests)) {
                $activeClients++;
                $totalRequests += count($recentRequests);
            }
        }
        
        return [
            'total_clients' => $totalClients,
            'active_clients' => $activeClients,
            'total_requests_in_window' => $totalRequests,
            'rate_limit' => RATE_LIMIT_REQUESTS,
            'window_seconds' => RATE_LIMIT_WINDOW
        ];
    }
}
?>