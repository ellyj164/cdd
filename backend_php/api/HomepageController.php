<?php
class HomepageController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getData() {
        // Get homepage data
        $data = [
            'featuredProducts' => $this->getFeaturedProducts(),
            'categories' => $this->getCategories(),
            'banners' => $this->getBanners(),
            'stats' => $this->getStats()
        ];
        
        ResponseHelper::sendSuccess($data);
    }
    
    public function getPerformanceMetrics() {
        $metrics = [
            'totalProducts' => $this->db->fetchOne('SELECT COUNT(*) as count FROM products WHERE status = "active"')['count'],
            'totalCategories' => $this->db->fetchOne('SELECT COUNT(*) as count FROM categories WHERE isActive = 1')['count'],
            'totalUsers' => $this->db->fetchOne('SELECT COUNT(*) as count FROM users WHERE isActive = 1')['count'],
            'averageRating' => $this->db->fetchOne('SELECT AVG(rating) as avg FROM reviews')['avg'] ?? 0
        ];
        
        ResponseHelper::sendSuccess($metrics);
    }
    
    private function getFeaturedProducts() {
        return $this->db->fetchAll(
            'SELECT p.*, c.name as categoryName FROM products p LEFT JOIN categories c ON p.categoryId = c.id WHERE p.isFeatured = 1 AND p.status = "active" LIMIT 8'
        );
    }
    
    private function getCategories() {
        return $this->db->fetchAll(
            'SELECT * FROM categories WHERE isActive = 1 ORDER BY displayOrder ASC LIMIT 10'
        );
    }
    
    private function getBanners() {
        return []; // Placeholder for banners
    }
    
    private function getStats() {
        return [
            'totalProducts' => $this->db->fetchOne('SELECT COUNT(*) as count FROM products WHERE status = "active"')['count'],
            'totalVendors' => $this->db->fetchOne('SELECT COUNT(*) as count FROM vendors WHERE status = "active"')['count']
        ];
    }
}

class BannerController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll() {
        $params = ResponseHelper::getQueryParams();
        
        $sql = "SELECT * FROM banners WHERE isActive = 1";
        if (!empty($params['type'])) {
            $sql .= " AND type = ?";
            $banners = $this->db->fetchAll($sql, [$params['type']]);
        } else {
            $banners = $this->db->fetchAll($sql);
        }
        
        ResponseHelper::sendSuccess($banners);
    }
    
    public function getHero() {
        $banners = $this->db->fetchAll("SELECT * FROM banners WHERE type = 'hero' AND isActive = 1 ORDER BY displayOrder ASC");
        ResponseHelper::sendSuccess($banners);
    }
}
?>