<?php
class BannerController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    public function getAll() {
        $params = ResponseHelper::getQueryParams();
        
        $sql = "SELECT * FROM banners";
        $conditions = [];
        $values = [];
        
        // Filter by type
        if (!empty($params['type'])) {
            $conditions[] = "type = ?";
            $values[] = $params['type'];
        }
        
        // Filter by status
        if (!empty($params['status'])) {
            $conditions[] = "status = ?";
            $values[] = $params['status'];
        } else {
            // Default to active banners for public endpoints
            $conditions[] = "status = ?";
            $values[] = 'active';
        }
        
        if (!empty($conditions)) {
            $sql .= " WHERE " . implode(" AND ", $conditions);
        }
        
        $sql .= " ORDER BY sortOrder ASC, createdAt DESC";
        
        $banners = $this->db->fetchAll($sql, $values);
        ResponseHelper::sendSuccess($banners);
    }
    
    public function getHero() {
        $banners = $this->db->fetchAll(
            "SELECT * FROM banners WHERE type = 'hero' AND status = 'active' ORDER BY sortOrder ASC",
            []
        );
        ResponseHelper::sendSuccess($banners);
    }
    
    public function getById($id) {
        if (empty($id)) {
            ResponseHelper::sendError('Banner ID is required', 400);
            return;
        }
        
        $banner = $this->db->fetchOne("SELECT * FROM banners WHERE id = ?", [$id]);
        
        if (!$banner) {
            ResponseHelper::sendError('Banner not found', 404);
            return;
        }
        
        ResponseHelper::sendSuccess($banner);
    }
    
    public function create() {
        AuthService::requireAdmin();
        
        $data = ResponseHelper::getRequestData();
        
        // Validate required fields
        $required = ['title', 'description', 'imageUrl', 'type'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                ResponseHelper::sendError("Field '$field' is required", 400);
                return;
            }
        }
        
        // Generate ID
        $id = 'banner-' . uniqid();
        
        // Set default values
        $data['id'] = $id;
        $data['status'] = $data['status'] ?? 'active';
        $data['sortOrder'] = $data['sortOrder'] ?? 0;
        $data['createdAt'] = date('Y-m-d H:i:s');
        $data['updatedAt'] = date('Y-m-d H:i:s');
        
        // Validate type
        $validTypes = ['hero', 'promotional', 'category', 'seasonal'];
        if (!in_array($data['type'], $validTypes)) {
            ResponseHelper::sendError('Invalid banner type', 400);
            return;
        }
        
        // Validate status
        $validStatuses = ['active', 'inactive', 'scheduled'];
        if (!in_array($data['status'], $validStatuses)) {
            ResponseHelper::sendError('Invalid banner status', 400);
            return;
        }
        
        try {
            $sql = "INSERT INTO banners (id, title, description, imageUrl, mobileImageUrl, type, status, linkUrl, buttonText, sortOrder, startDate, endDate, targetAudience, analytics, createdAt, updatedAt) 
                    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
            
            $this->db->execute($sql, [
                $data['id'],
                $data['title'],
                $data['description'],
                $data['imageUrl'],
                $data['mobileImageUrl'] ?? null,
                $data['type'],
                $data['status'],
                $data['linkUrl'] ?? null,
                $data['buttonText'] ?? null,
                $data['sortOrder'],
                $data['startDate'] ?? null,
                $data['endDate'] ?? null,
                isset($data['targetAudience']) ? json_encode($data['targetAudience']) : null,
                isset($data['analytics']) ? json_encode($data['analytics']) : null,
                $data['createdAt'],
                $data['updatedAt']
            ]);
            
            ResponseHelper::sendSuccess([
                'id' => $id,
                'message' => 'Banner created successfully'
            ], 201);
            
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to create banner: ' . $e->getMessage(), 500);
        }
    }
    
    public function update($id) {
        AuthService::requireAdmin();
        
        if (empty($id)) {
            ResponseHelper::sendError('Banner ID is required', 400);
            return;
        }
        
        $data = ResponseHelper::getRequestData();
        
        // Check if banner exists
        $existingBanner = $this->db->fetchOne("SELECT * FROM banners WHERE id = ?", [$id]);
        if (!$existingBanner) {
            ResponseHelper::sendError('Banner not found', 404);
            return;
        }
        
        // Validate type if provided
        if (isset($data['type'])) {
            $validTypes = ['hero', 'promotional', 'category', 'seasonal'];
            if (!in_array($data['type'], $validTypes)) {
                ResponseHelper::sendError('Invalid banner type', 400);
                return;
            }
        }
        
        // Validate status if provided
        if (isset($data['status'])) {
            $validStatuses = ['active', 'inactive', 'scheduled'];
            if (!in_array($data['status'], $validStatuses)) {
                ResponseHelper::sendError('Invalid banner status', 400);
                return;
            }
        }
        
        try {
            $updateFields = [];
            $updateValues = [];
            
            $allowedFields = ['title', 'description', 'imageUrl', 'mobileImageUrl', 'type', 'status', 'linkUrl', 'buttonText', 'sortOrder', 'startDate', 'endDate'];
            
            foreach ($allowedFields as $field) {
                if (isset($data[$field])) {
                    $updateFields[] = "$field = ?";
                    $updateValues[] = $data[$field];
                }
            }
            
            if (isset($data['targetAudience'])) {
                $updateFields[] = "targetAudience = ?";
                $updateValues[] = json_encode($data['targetAudience']);
            }
            
            if (isset($data['analytics'])) {
                $updateFields[] = "analytics = ?";
                $updateValues[] = json_encode($data['analytics']);
            }
            
            if (empty($updateFields)) {
                ResponseHelper::sendError('No valid fields to update', 400);
                return;
            }
            
            $updateFields[] = "updatedAt = ?";
            $updateValues[] = date('Y-m-d H:i:s');
            $updateValues[] = $id;
            
            $sql = "UPDATE banners SET " . implode(", ", $updateFields) . " WHERE id = ?";
            $this->db->execute($sql, $updateValues);
            
            ResponseHelper::sendSuccess([
                'id' => $id,
                'message' => 'Banner updated successfully'
            ]);
            
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update banner: ' . $e->getMessage(), 500);
        }
    }
    
    public function delete($id) {
        AuthService::requireAdmin();
        
        if (empty($id)) {
            ResponseHelper::sendError('Banner ID is required', 400);
            return;
        }
        
        // Check if banner exists
        $existingBanner = $this->db->fetchOne("SELECT * FROM banners WHERE id = ?", [$id]);
        if (!$existingBanner) {
            ResponseHelper::sendError('Banner not found', 404);
            return;
        }
        
        try {
            $this->db->execute("DELETE FROM banners WHERE id = ?", [$id]);
            
            ResponseHelper::sendSuccess([
                'id' => $id,
                'message' => 'Banner deleted successfully'
            ]);
            
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to delete banner: ' . $e->getMessage(), 500);
        }
    }
    
    public function updateSortOrder() {
        AuthService::requireAdmin();
        
        $data = ResponseHelper::getRequestData();
        
        if (empty($data['banners']) || !is_array($data['banners'])) {
            ResponseHelper::sendError('Banners array is required', 400);
            return;
        }
        
        try {
            $this->db->beginTransaction();
            
            foreach ($data['banners'] as $index => $bannerId) {
                $this->db->execute(
                    "UPDATE banners SET sortOrder = ?, updatedAt = ? WHERE id = ?",
                    [$index + 1, date('Y-m-d H:i:s'), $bannerId]
                );
            }
            
            $this->db->commit();
            
            ResponseHelper::sendSuccess([
                'message' => 'Banner order updated successfully'
            ]);
            
        } catch (Exception $e) {
            $this->db->rollback();
            ResponseHelper::sendError('Failed to update banner order: ' . $e->getMessage(), 500);
        }
    }
}

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
        return $this->db->fetchAll(
            "SELECT * FROM banners WHERE status = 'active' ORDER BY sortOrder ASC, createdAt DESC"
        );
    }
    
    private function getStats() {
        return [
            'totalProducts' => $this->db->fetchOne('SELECT COUNT(*) as count FROM products WHERE status = "active"')['count'],
            'totalVendors' => $this->db->fetchOne('SELECT COUNT(*) as count FROM vendors WHERE status = "active"')['count']
        ];
    }
}
?>