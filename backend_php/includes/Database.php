<?php
/**
 * High-Performance Database Connection Class
 * Optimized for MySQL with connection pooling and caching
 */

class Database {
    private static $instance = null;
    private $connection = null;
    private $cache = [];
    private $cacheExpiry = [];
    
    private function __construct() {
        $this->connect();
    }
    
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new self();
        }
        return self::$instance;
    }
    
    private function connect() {
        try {
            $dsn = "mysql:host=" . DB_HOST . ";dbname=" . DB_NAME . ";charset=" . DB_CHARSET;
            
            $options = [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
                PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                PDO::ATTR_EMULATE_PREPARES => false,
                PDO::ATTR_PERSISTENT => true, // Connection pooling
                PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES " . DB_CHARSET,
                PDO::MYSQL_ATTR_USE_BUFFERED_QUERY => true
            ];
            
            $this->connection = new PDO($dsn, DB_USER, DB_PASS, $options);
            
            // Performance optimizations
            $this->connection->exec("SET SESSION sql_mode = 'STRICT_TRANS_TABLES,NO_ZERO_DATE,NO_ZERO_IN_DATE,ERROR_FOR_DIVISION_BY_ZERO'");
            $this->connection->exec("SET SESSION innodb_lock_wait_timeout = 10");
            
        } catch (PDOException $e) {
            error_log("Database connection failed: " . $e->getMessage());
            throw new Exception("Database connection failed");
        }
    }
    
    public function getConnection() {
        // Check if connection is still alive
        if ($this->connection === null) {
            $this->connect();
        }
        
        try {
            $this->connection->query('SELECT 1');
        } catch (PDOException $e) {
            $this->connect(); // Reconnect if connection is dead
        }
        
        return $this->connection;
    }
    
    // Execute query with parameters
    public function execute($sql, $params = []) {
        try {
            $stmt = $this->getConnection()->prepare($sql);
            $result = $stmt->execute($params);
            
            if (!$result) {
                throw new Exception("Query execution failed");
            }
            
            return $stmt;
        } catch (PDOException $e) {
            error_log("Query execution error: " . $e->getMessage() . " SQL: " . $sql);
            throw new Exception("Database query failed");
        }
    }
    
    // Fetch single row
    public function fetchOne($sql, $params = []) {
        $cacheKey = md5($sql . serialize($params));
        
        // Check cache
        if (CACHE_ENABLED && isset($this->cache[$cacheKey])) {
            if (time() < $this->cacheExpiry[$cacheKey]) {
                return $this->cache[$cacheKey];
            } else {
                unset($this->cache[$cacheKey], $this->cacheExpiry[$cacheKey]);
            }
        }
        
        $stmt = $this->execute($sql, $params);
        $result = $stmt->fetch();
        
        // Cache the result
        if (CACHE_ENABLED && $result !== false) {
            $this->cache[$cacheKey] = $result;
            $this->cacheExpiry[$cacheKey] = time() + CACHE_EXPIRY;
        }
        
        return $result;
    }
    
    // Fetch multiple rows
    public function fetchAll($sql, $params = []) {
        $cacheKey = md5($sql . serialize($params));
        
        // Check cache
        if (CACHE_ENABLED && isset($this->cache[$cacheKey])) {
            if (time() < $this->cacheExpiry[$cacheKey]) {
                return $this->cache[$cacheKey];
            } else {
                unset($this->cache[$cacheKey], $this->cacheExpiry[$cacheKey]);
            }
        }
        
        $stmt = $this->execute($sql, $params);
        $result = $stmt->fetchAll();
        
        // Cache the result
        if (CACHE_ENABLED) {
            $this->cache[$cacheKey] = $result;
            $this->cacheExpiry[$cacheKey] = time() + CACHE_EXPIRY;
        }
        
        return $result;
    }
    
    // Insert and return last insert ID
    public function insert($sql, $params = []) {
        $stmt = $this->execute($sql, $params);
        return $this->getConnection()->lastInsertId();
    }
    
    // Update and return affected rows
    public function update($sql, $params = []) {
        $stmt = $this->execute($sql, $params);
        return $stmt->rowCount();
    }
    
    // Delete and return affected rows
    public function delete($sql, $params = []) {
        $stmt = $this->execute($sql, $params);
        return $stmt->rowCount();
    }
    
    // Start transaction
    public function beginTransaction() {
        return $this->getConnection()->beginTransaction();
    }
    
    // Commit transaction
    public function commit() {
        return $this->getConnection()->commit();
    }
    
    // Rollback transaction
    public function rollback() {
        return $this->getConnection()->rollback();
    }
    
    // Clear cache
    public function clearCache() {
        $this->cache = [];
        $this->cacheExpiry = [];
    }
    
    // Get cache statistics
    public function getCacheStats() {
        return [
            'cached_queries' => count($this->cache),
            'cache_enabled' => CACHE_ENABLED,
            'cache_expiry' => CACHE_EXPIRY
        ];
    }
    
    // Escape string for LIKE queries
    public function escapeLike($string) {
        return str_replace(['\\', '%', '_'], ['\\\\', '\\%', '\\_'], $string);
    }
    
    // Build WHERE clause from array
    public function buildWhereClause($conditions, &$params = []) {
        if (empty($conditions)) {
            return '';
        }
        
        $clauses = [];
        foreach ($conditions as $field => $value) {
            if (is_array($value)) {
                // IN clause
                $placeholders = str_repeat('?,', count($value) - 1) . '?';
                $clauses[] = "`{$field}` IN ({$placeholders})";
                $params = array_merge($params, $value);
            } elseif (strpos($field, ' ') !== false) {
                // Custom operator
                $clauses[] = $field;
                $params[] = $value;
            } else {
                // Simple equality
                $clauses[] = "`{$field}` = ?";
                $params[] = $value;
            }
        }
        
        return 'WHERE ' . implode(' AND ', $clauses);
    }
    
    // Prevent cloning
    private function __clone() {}
    
    // Prevent unserialization
    public function __wakeup() {
        throw new Exception("Cannot unserialize singleton");
    }
}
?>