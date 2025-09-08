<?php
class AdminController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getDashboard() {
        Auth::validateRequest('admin');
        
        // Get dashboard statistics
        $stats = [
            'totalUsers' => $this->db->fetchOne('SELECT COUNT(*) as count FROM users')['count'],
            'totalProducts' => $this->db->fetchOne('SELECT COUNT(*) as count FROM products WHERE status = "active"')['count'],
            'totalOrders' => $this->db->fetchOne('SELECT COUNT(*) as count FROM orders')['count'],
            'totalRevenue' => $this->db->fetchOne('SELECT SUM(total) as total FROM orders WHERE status = "completed"')['total'] ?? 0
        ];
        
        ResponseHelper::sendSuccess($stats);
    }
    
    public function getUsers() {
        Auth::validateRequest('admin');
        $params = ResponseHelper::getQueryParams();
        $pagination = Validator::pagination($params);
        
        $sql = "SELECT id, email, phone, name, role, accountType, isActive, createdAt FROM users ORDER BY createdAt DESC LIMIT {$pagination['limit']} OFFSET {$pagination['offset']}";
        $users = $this->db->fetchAll($sql);
        
        ResponseHelper::sendPaginated($users, $pagination['page'], $pagination['limit']);
    }
    
    public function getAnalytics() {
        Auth::validateRequest('admin');
        
        $analytics = [
            'recentOrders' => $this->db->fetchAll('SELECT * FROM orders ORDER BY createdAt DESC LIMIT 10'),
            'topProducts' => $this->db->fetchAll('SELECT * FROM products ORDER BY totalOrders DESC LIMIT 10'),
            'userGrowth' => $this->db->fetchAll('SELECT DATE(createdAt) as date, COUNT(*) as count FROM users WHERE createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY) GROUP BY DATE(createdAt)')
        ];
        
        ResponseHelper::sendSuccess($analytics);
    }
}
?>