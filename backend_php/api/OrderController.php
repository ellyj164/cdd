<?php
class OrderController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $params = ResponseHelper::getQueryParams();
        $pagination = Validator::pagination($params);
        
        $sql = "SELECT * FROM orders WHERE userId = ? ORDER BY createdAt DESC LIMIT {$pagination['limit']} OFFSET {$pagination['offset']}";
        $orders = $this->db->fetchAll($sql, [$user['id']]);
        
        ResponseHelper::sendPaginated($orders, $pagination['page'], $pagination['limit']);
    }
    
    public function getById($id) {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        
        $order = $this->db->fetchOne('SELECT * FROM orders WHERE id = ? AND userId = ?', [$id, $user['id']]);
        if (!$order) {
            ResponseHelper::sendNotFound('Order not found');
        }
        
        ResponseHelper::sendSuccess($order);
    }
    
    public function create() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        // Basic order creation - simplified for migration
        $orderId = $this->generateUUID();
        
        try {
            $this->db->beginTransaction();
            
            $this->db->insert(
                'INSERT INTO orders (id, userId, status, total, shippingAddress, billingAddress, items, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                [$orderId, $user['id'], 'pending', $data['total'] ?? 0, json_encode($data['shippingAddress'] ?? []), json_encode($data['billingAddress'] ?? []), json_encode($data['items'] ?? [])]
            );
            
            $this->db->commit();
            ResponseHelper::sendSuccess(['id' => $orderId], 'Order created successfully', 201);
        } catch (Exception $e) {
            $this->db->rollback();
            ResponseHelper::sendError('Failed to create order', 500);
        }
    }
    
    private function generateUUID() {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}
?>