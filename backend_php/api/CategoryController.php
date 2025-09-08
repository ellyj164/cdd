<?php
/**
 * Category Controller
 * Handles product categories
 */

class CategoryController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Get all categories
    public function getAll() {
        $sql = "
            SELECT 
                c.*,
                COUNT(p.id) as productCount
            FROM categories c
            LEFT JOIN products p ON c.id = p.categoryId AND p.status = 'active'
            WHERE c.isActive = 1
            GROUP BY c.id
            ORDER BY c.displayOrder ASC, c.name ASC
        ";
        
        $categories = $this->db->fetchAll($sql);
        
        ResponseHelper::sendSuccess($categories);
    }
    
    // Get category by ID
    public function getById($id) {
        if (!Validator::uuid($id)) {
            ResponseHelper::sendError('Invalid category ID format', 400);
        }
        
        $sql = "
            SELECT 
                c.*,
                COUNT(p.id) as productCount
            FROM categories c
            LEFT JOIN products p ON c.id = p.categoryId AND p.status = 'active'
            WHERE c.id = ? AND c.isActive = 1
            GROUP BY c.id
        ";
        
        $category = $this->db->fetchOne($sql, [$id]);
        
        if (!$category) {
            ResponseHelper::sendNotFound('Category not found');
        }
        
        ResponseHelper::sendSuccess($category);
    }
}
?>