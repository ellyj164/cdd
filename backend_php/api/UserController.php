<?php
class UserController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getProfile() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        ResponseHelper::sendSuccess($user);
    }
    
    public function updateProfile() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        $updateFields = [];
        $params = [];
        
        $allowedFields = ['name', 'email', 'phone'];
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updateFields[] = "{$field} = ?";
                $params[] = $data[$field];
            }
        }
        
        if (empty($updateFields)) {
            ResponseHelper::sendError('No valid fields to update');
        }
        
        $updateFields[] = "updatedAt = NOW()";
        $params[] = $user['id'];
        
        $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        try {
            $this->db->update($sql, $params);
            ResponseHelper::sendSuccess(null, 'Profile updated successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update profile', 500);
        }
    }
}
?>