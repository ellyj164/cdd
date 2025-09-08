<?php
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/ResponseHelper.php';

class AnalyticsController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Get platform analytics (Admin only)
    public function getPlatformAnalytics() {
        Auth::validateRequest('admin');
        
        $period = $_GET['period'] ?? '30d';
        $dateCondition = $this->getDateCondition($period);
        
        // Get key metrics
        $metrics = [
            'revenue' => $this->getTotalRevenue($dateCondition),
            'orders' => $this->getTotalOrders($dateCondition),
            'users' => $this->getTotalUsers($dateCondition),
            'vendors' => $this->getTotalVendors($dateCondition),
            'products' => $this->getTotalProducts($dateCondition),
            'conversion_rate' => $this->getConversionRate($dateCondition)
        ];
        
        // Get charts data
        $charts = [
            'revenue_chart' => $this->getRevenueChart($period),
            'orders_chart' => $this->getOrdersChart($period),
            'top_products' => $this->getTopProducts($dateCondition),
            'top_vendors' => $this->getTopVendors($dateCondition),
            'user_growth' => $this->getUserGrowthChart($period)
        ];
        
        ResponseHelper::sendSuccess([
            'metrics' => $metrics,
            'charts' => $charts,
            'period' => $period
        ]);
    }
    
    // Get vendor analytics
    public function getVendorAnalytics() {
        Auth::validateRequest('vendor');
        
        $period = $_GET['period'] ?? '30d';
        $dateCondition = $this->getDateCondition($period);
        $vendorId = $GLOBALS['current_user']['id'];
        
        // Get vendor metrics
        $metrics = [
            'revenue' => $this->getVendorRevenue($vendorId, $dateCondition),
            'orders' => $this->getVendorOrders($vendorId, $dateCondition),
            'products' => $this->getVendorProducts($vendorId),
            'avg_order_value' => $this->getVendorAOV($vendorId, $dateCondition),
            'conversion_rate' => $this->getVendorConversionRate($vendorId, $dateCondition)
        ];
        
        // Get charts data
        $charts = [
            'revenue_chart' => $this->getVendorRevenueChart($vendorId, $period),
            'orders_chart' => $this->getVendorOrdersChart($vendorId, $period),
            'top_products' => $this->getVendorTopProducts($vendorId, $dateCondition),
            'sales_by_category' => $this->getVendorSalesByCategory($vendorId, $dateCondition)
        ];
        
        ResponseHelper::sendSuccess([
            'metrics' => $metrics,
            'charts' => $charts,
            'period' => $period
        ]);
    }
    
    // Get customer analytics
    public function getCustomerAnalytics() {
        Auth::validateRequest('customer');
        
        $userId = $GLOBALS['current_user']['id'];
        
        // Get customer metrics
        $metrics = [
            'total_orders' => $this->getCustomerOrders($userId),
            'total_spent' => $this->getCustomerSpent($userId),
            'avg_order_value' => $this->getCustomerAOV($userId),
            'favorite_categories' => $this->getCustomerFavoriteCategories($userId)
        ];
        
        // Get order history chart
        $orderHistory = $this->getCustomerOrderHistory($userId);
        
        ResponseHelper::sendSuccess([
            'metrics' => $metrics,
            'order_history' => $orderHistory
        ]);
    }
    
    // Helper methods
    private function getDateCondition($period) {
        switch ($period) {
            case '7d':
                return "AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 7 DAY)";
            case '30d':
                return "AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
            case '90d':
                return "AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 90 DAY)";
            case '1y':
                return "AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)";
            default:
                return "AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)";
        }
    }
    
    // Platform metrics
    private function getTotalRevenue($dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COALESCE(SUM(total), 0) as revenue FROM orders WHERE status = 'completed' $dateCondition"
        );
        return floatval($result['revenue']);
    }
    
    private function getTotalOrders($dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM orders WHERE 1=1 $dateCondition"
        );
        return intval($result['count']);
    }
    
    private function getTotalUsers($dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM users WHERE role = 'customer' $dateCondition"
        );
        return intval($result['count']);
    }
    
    private function getTotalVendors($dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM users WHERE role = 'vendor' $dateCondition"
        );
        return intval($result['count']);
    }
    
    private function getTotalProducts($dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM products WHERE 1=1 $dateCondition"
        );
        return intval($result['count']);
    }
    
    private function getConversionRate($dateCondition) {
        // Simplified conversion rate calculation
        $orders = $this->getTotalOrders($dateCondition);
        $users = $this->getTotalUsers($dateCondition);
        
        if ($users > 0) {
            return round(($orders / $users) * 100, 2);
        }
        return 0;
    }
    
    // Chart data methods
    private function getRevenueChart($period) {
        $interval = $this->getChartInterval($period);
        
        $data = $this->db->fetchAll(
            "SELECT DATE(createdAt) as date, COALESCE(SUM(total), 0) as revenue 
             FROM orders 
             WHERE status = 'completed' 
             AND DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL $interval) 
             GROUP BY DATE(createdAt) 
             ORDER BY date ASC"
        );
        
        return $this->formatChartData($data, 'revenue');
    }
    
    private function getOrdersChart($period) {
        $interval = $this->getChartInterval($period);
        
        $data = $this->db->fetchAll(
            "SELECT DATE(createdAt) as date, COUNT(*) as orders 
             FROM orders 
             WHERE DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL $interval) 
             GROUP BY DATE(createdAt) 
             ORDER BY date ASC"
        );
        
        return $this->formatChartData($data, 'orders');
    }
    
    private function getTopProducts($dateCondition) {
        return $this->db->fetchAll(
            "SELECT p.id, p.name, p.price, COUNT(oi.id) as sales, SUM(oi.quantity * oi.price) as revenue
             FROM products p
             LEFT JOIN order_items oi ON p.id = oi.productId
             LEFT JOIN orders o ON oi.orderId = o.id
             WHERE o.status = 'completed' $dateCondition
             GROUP BY p.id
             ORDER BY revenue DESC
             LIMIT 10"
        );
    }
    
    private function getTopVendors($dateCondition) {
        return $this->db->fetchAll(
            "SELECT u.id, u.name, COUNT(o.id) as orders, SUM(o.total) as revenue
             FROM users u
             LEFT JOIN products p ON u.id = p.vendorId
             LEFT JOIN order_items oi ON p.id = oi.productId
             LEFT JOIN orders o ON oi.orderId = o.id
             WHERE u.role = 'vendor' AND o.status = 'completed' $dateCondition
             GROUP BY u.id
             ORDER BY revenue DESC
             LIMIT 10"
        );
    }
    
    private function getUserGrowthChart($period) {
        $interval = $this->getChartInterval($period);
        
        $data = $this->db->fetchAll(
            "SELECT DATE(createdAt) as date, COUNT(*) as users 
             FROM users 
             WHERE DATE(createdAt) >= DATE_SUB(CURDATE(), INTERVAL $interval) 
             GROUP BY DATE(createdAt) 
             ORDER BY date ASC"
        );
        
        return $this->formatChartData($data, 'users');
    }
    
    // Vendor specific methods
    private function getVendorRevenue($vendorId, $dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COALESCE(SUM(oi.quantity * oi.price), 0) as revenue
             FROM order_items oi
             LEFT JOIN orders o ON oi.orderId = o.id
             LEFT JOIN products p ON oi.productId = p.id
             WHERE p.vendorId = ? AND o.status = 'completed' $dateCondition",
            [$vendorId]
        );
        return floatval($result['revenue']);
    }
    
    private function getVendorOrders($vendorId, $dateCondition) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(DISTINCT o.id) as count
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.orderId
             LEFT JOIN products p ON oi.productId = p.id
             WHERE p.vendorId = ? $dateCondition",
            [$vendorId]
        );
        return intval($result['count']);
    }
    
    private function getVendorProducts($vendorId) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM products WHERE vendorId = ?",
            [$vendorId]
        );
        return intval($result['count']);
    }
    
    private function getVendorAOV($vendorId, $dateCondition) {
        $revenue = $this->getVendorRevenue($vendorId, $dateCondition);
        $orders = $this->getVendorOrders($vendorId, $dateCondition);
        
        if ($orders > 0) {
            return round($revenue / $orders, 2);
        }
        return 0;
    }
    
    private function getVendorConversionRate($vendorId, $dateCondition) {
        // Simplified calculation
        return rand(1, 5); // Placeholder
    }
    
    // Customer specific methods
    private function getCustomerOrders($userId) {
        $result = $this->db->fetchOne(
            "SELECT COUNT(*) as count FROM orders WHERE userId = ?",
            [$userId]
        );
        return intval($result['count']);
    }
    
    private function getCustomerSpent($userId) {
        $result = $this->db->fetchOne(
            "SELECT COALESCE(SUM(total), 0) as spent FROM orders WHERE userId = ? AND status = 'completed'",
            [$userId]
        );
        return floatval($result['spent']);
    }
    
    private function getCustomerAOV($userId) {
        $spent = $this->getCustomerSpent($userId);
        $orders = $this->getCustomerOrders($userId);
        
        if ($orders > 0) {
            return round($spent / $orders, 2);
        }
        return 0;
    }
    
    private function getCustomerFavoriteCategories($userId) {
        return $this->db->fetchAll(
            "SELECT c.name, COUNT(*) as purchases
             FROM categories c
             LEFT JOIN products p ON c.id = p.categoryId
             LEFT JOIN order_items oi ON p.id = oi.productId
             LEFT JOIN orders o ON oi.orderId = o.id
             WHERE o.userId = ? AND o.status = 'completed'
             GROUP BY c.id
             ORDER BY purchases DESC
             LIMIT 5",
            [$userId]
        );
    }
    
    private function getCustomerOrderHistory($userId) {
        return $this->db->fetchAll(
            "SELECT DATE(createdAt) as date, total
             FROM orders
             WHERE userId = ?
             ORDER BY createdAt DESC
             LIMIT 50",
            [$userId]
        );
    }
    
    // Helper methods
    private function getChartInterval($period) {
        switch ($period) {
            case '7d': return '7 DAY';
            case '30d': return '30 DAY';
            case '90d': return '90 DAY';
            case '1y': return '1 YEAR';
            default: return '30 DAY';
        }
    }
    
    private function formatChartData($data, $valueKey) {
        $formatted = [];
        foreach ($data as $row) {
            $formatted[] = [
                'date' => $row['date'],
                'value' => floatval($row[$valueKey])
            ];
        }
        return $formatted;
    }
}
?>