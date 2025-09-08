<?php
class ReviewController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getByProduct() {
        $params = ResponseHelper::getQueryParams();
        $pagination = Validator::pagination($params);
        
        if (empty($params['productId'])) {
            ResponseHelper::sendError('Product ID is required', 400);
        }
        
        $sql = "
            SELECT r.*, u.name as userName
            FROM reviews r
            LEFT JOIN users u ON r.userId = u.id
            WHERE r.productId = ?
            ORDER BY r.createdAt DESC
            LIMIT {$pagination['limit']} OFFSET {$pagination['offset']}
        ";
        
        $reviews = $this->db->fetchAll($sql, [$params['productId']]);
        
        ResponseHelper::sendPaginated($reviews, $pagination['page'], $pagination['limit']);
    }
    
    public function create() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        $errors = Validator::validateSchema($data, [
            'productId' => ['required' => true, 'type' => 'uuid'],
            'rating' => ['required' => true, 'type' => 'integer', 'min' => 1, 'max' => 5],
            'comment' => ['required' => true, 'min_length' => 10]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        $reviewId = $this->generateUUID();
        
        try {
            $this->db->insert(
                'INSERT INTO reviews (id, userId, productId, rating, comment, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, NOW(), NOW())',
                [$reviewId, $user['id'], $data['productId'], $data['rating'], $data['comment']]
            );
            
            ResponseHelper::sendSuccess(['id' => $reviewId], 'Review created successfully', 201);
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to create review', 500);
        }
    }
    
    public function update($id) {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        $review = $this->db->fetchOne('SELECT * FROM reviews WHERE id = ? AND userId = ?', [$id, $user['id']]);
        if (!$review) {
            ResponseHelper::sendNotFound('Review not found');
        }
        
        try {
            $this->db->update(
                'UPDATE reviews SET rating = ?, comment = ?, updatedAt = NOW() WHERE id = ?',
                [$data['rating'], $data['comment'], $id]
            );
            
            ResponseHelper::sendSuccess(null, 'Review updated successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update review', 500);
        }
    }
    
    public function delete($id) {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        
        $review = $this->db->fetchOne('SELECT * FROM reviews WHERE id = ? AND userId = ?', [$id, $user['id']]);
        if (!$review) {
            ResponseHelper::sendNotFound('Review not found');
        }
        
        try {
            $this->db->delete('DELETE FROM reviews WHERE id = ?', [$id]);
            ResponseHelper::sendSuccess(null, 'Review deleted successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to delete review', 500);
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