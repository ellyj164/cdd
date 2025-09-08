<?php
/**
 * Product Controller
 * Handles product catalog operations
 */

class ProductController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Get all products with filtering and pagination
    public function getAll() {
        $params = ResponseHelper::getQueryParams();
        $pagination = Validator::pagination($params);
        
        // Build WHERE clause for filtering
        $conditions = [];
        $whereParams = [];
        
        if (!empty($params['category'])) {
            $conditions['categoryId'] = $params['category'];
        }
        
        if (!empty($params['vendor'])) {
            $conditions['vendorId'] = $params['vendor'];
        }
        
        if (!empty($params['status'])) {
            $conditions['status'] = $params['status'];
        } else {
            $conditions['status'] = 'active'; // Only show active products by default
        }
        
        if (!empty($params['featured'])) {
            $conditions['isFeatured'] = 1;
        }
        
        if (!empty($params['price_min'])) {
            $conditions['price >='] = floatval($params['price_min']);
        }
        
        if (!empty($params['price_max'])) {
            $conditions['price <='] = floatval($params['price_max']);
        }
        
        $whereClause = $this->db->buildWhereClause($conditions, $whereParams);
        
        // Build ORDER BY clause
        $orderBy = 'ORDER BY createdAt DESC';
        if (!empty($params['sort'])) {
            switch ($params['sort']) {
                case 'price_asc':
                    $orderBy = 'ORDER BY price ASC';
                    break;
                case 'price_desc':
                    $orderBy = 'ORDER BY price DESC';
                    break;
                case 'name':
                    $orderBy = 'ORDER BY name ASC';
                    break;
                case 'popularity':
                    $orderBy = 'ORDER BY totalOrders DESC, averageRating DESC';
                    break;
                case 'rating':
                    $orderBy = 'ORDER BY averageRating DESC, totalReviews DESC';
                    break;
                case 'newest':
                    $orderBy = 'ORDER BY createdAt DESC';
                    break;
            }
        }
        
        // Get total count
        $countSql = "SELECT COUNT(*) as total FROM products {$whereClause}";
        $totalResult = $this->db->fetchOne($countSql, $whereParams);
        $total = $totalResult['total'];
        
        // Get products
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            {$whereClause}
            {$orderBy}
            LIMIT {$pagination['limit']} OFFSET {$pagination['offset']}
        ";
        
        $products = $this->db->fetchAll($sql, $whereParams);
        
        // Parse JSON fields and format data
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendPaginated(
            $products,
            $pagination['page'],
            $pagination['limit'],
            $total
        );
    }
    
    // Get product by ID
    public function getById($id) {
        if (!Validator::uuid($id)) {
            ResponseHelper::sendError('Invalid product ID format', 400);
        }
        
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                c.slug as categorySlug,
                v.businessName as vendorName,
                v.id as vendorId,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.id = ? AND p.status = 'active'
        ";
        
        $product = $this->db->fetchOne($sql, [$id]);
        
        if (!$product) {
            ResponseHelper::sendNotFound('Product not found');
        }
        
        $this->formatProduct($product);
        
        // Get related products
        $relatedProducts = $this->getRelatedProducts($id, $product['categoryId'], 4);
        $product['relatedProducts'] = $relatedProducts;
        
        ResponseHelper::sendSuccess($product);
    }
    
    // Get featured products
    public function getFeatured() {
        $params = ResponseHelper::getQueryParams(['limit' => FEATURED_PRODUCTS_LIMIT]);
        $limit = Validator::sanitizeInt($params['limit'], 1, 50);
        
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.status = 'active' AND p.isFeatured = 1
            ORDER BY p.averageRating DESC, p.totalOrders DESC
            LIMIT {$limit}
        ";
        
        $products = $this->db->fetchAll($sql);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendSuccess($products);
    }
    
    // Get trending products
    public function getTrending() {
        $params = ResponseHelper::getQueryParams(['limit' => TRENDING_PRODUCTS_LIMIT]);
        $limit = Validator::sanitizeInt($params['limit'], 1, 50);
        
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.status = 'active' 
            AND p.createdAt >= DATE_SUB(NOW(), INTERVAL 30 DAY)
            ORDER BY p.totalOrders DESC, p.averageRating DESC
            LIMIT {$limit}
        ";
        
        $products = $this->db->fetchAll($sql);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendSuccess($products);
    }
    
    // Get deals/discounted products
    public function getDeals() {
        $params = ResponseHelper::getQueryParams(['limit' => DEALS_PRODUCTS_LIMIT]);
        $limit = Validator::sanitizeInt($params['limit'], 1, 50);
        
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.status = 'active' 
            AND p.discountPercentage > 0
            ORDER BY p.discountPercentage DESC, p.totalOrders DESC
            LIMIT {$limit}
        ";
        
        $products = $this->db->fetchAll($sql);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendSuccess($products);
    }
    
    // Get product recommendations
    public function getRecommendations() {
        $params = ResponseHelper::getQueryParams(['limit' => RECOMMENDATIONS_LIMIT]);
        $limit = Validator::sanitizeInt($params['limit'], 1, 50);
        
        // For now, return highly rated products
        // In production, this would use AI/ML algorithms
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.status = 'active' 
            AND p.averageRating >= 4.0
            AND p.totalReviews >= 5
            ORDER BY RAND()
            LIMIT {$limit}
        ";
        
        $products = $this->db->fetchAll($sql);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendSuccess($products);
    }
    
    // Get user-specific recommendations
    public function getUserRecommendations($userId) {
        if (!Validator::uuid($userId)) {
            ResponseHelper::sendError('Invalid user ID format', 400);
        }
        
        // For now, return same as general recommendations
        // In production, this would analyze user behavior
        $this->getRecommendations();
    }
    
    // Search products
    public function search($query) {
        $params = ResponseHelper::getQueryParams();
        $pagination = Validator::pagination($params);
        
        $query = urldecode($query);
        $searchTerm = $this->db->escapeLike(Validator::sanitizeString($query));
        
        // Build search conditions
        $conditions = [];
        $whereParams = [];
        
        // Add search conditions
        $searchConditions = [
            "p.name LIKE ?",
            "p.description LIKE ?",
            "p.tags LIKE ?",
            "c.name LIKE ?"
        ];
        
        foreach ($searchConditions as $condition) {
            $whereParams[] = "%{$searchTerm}%";
        }
        
        $searchWhere = "(" . implode(" OR ", $searchConditions) . ")";
        
        // Add filters
        if (!empty($params['category'])) {
            $conditions['p.categoryId'] = $params['category'];
        }
        
        if (!empty($params['price_min'])) {
            $conditions['p.price >='] = floatval($params['price_min']);
        }
        
        if (!empty($params['price_max'])) {
            $conditions['p.price <='] = floatval($params['price_max']);
        }
        
        $conditions['p.status'] = 'active';
        
        $whereClause = $this->db->buildWhereClause($conditions, $whereParams);
        $whereClause = str_replace('WHERE', "WHERE {$searchWhere} AND", $whereClause);
        
        // Get total count
        $countSql = "
            SELECT COUNT(*) as total 
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            {$whereClause}
        ";
        $totalResult = $this->db->fetchOne($countSql, $whereParams);
        $total = $totalResult['total'];
        
        // Get products
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating,
                COALESCE(p.totalReviews, 0) as totalReviews,
                (
                    CASE 
                        WHEN p.name LIKE ? THEN 10
                        WHEN p.description LIKE ? THEN 5
                        WHEN p.tags LIKE ? THEN 3
                        WHEN c.name LIKE ? THEN 2
                        ELSE 1
                    END
                ) as relevance
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            {$whereClause}
            ORDER BY relevance DESC, p.averageRating DESC
            LIMIT {$pagination['limit']} OFFSET {$pagination['offset']}
        ";
        
        // Add relevance parameters
        $relevanceParams = array_merge($whereParams, [
            "%{$searchTerm}%",
            "%{$searchTerm}%", 
            "%{$searchTerm}%",
            "%{$searchTerm}%"
        ]);
        
        $products = $this->db->fetchAll($sql, $relevanceParams);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        ResponseHelper::sendPaginated(
            $products,
            $pagination['page'],
            $pagination['limit'],
            $total,
            "Found {$total} products for '{$query}'"
        );
    }
    
    // Get category statistics
    public function getCategoryStats() {
        $sql = "
            SELECT 
                c.id,
                c.name,
                c.slug,
                COUNT(p.id) as productCount,
                AVG(p.price) as averagePrice,
                MIN(p.price) as minPrice,
                MAX(p.price) as maxPrice
            FROM categories c
            LEFT JOIN products p ON c.id = p.categoryId AND p.status = 'active'
            GROUP BY c.id, c.name, c.slug
            ORDER BY productCount DESC
        ";
        
        $stats = $this->db->fetchAll($sql);
        
        ResponseHelper::sendSuccess($stats);
    }
    
    // Create product (vendor only)
    public function create() {
        Auth::validateRequest('vendor');
        
        $data = ResponseHelper::getJsonInput();
        $user = $GLOBALS['current_user'];
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'name' => ['required' => true, 'min_length' => 3, 'max_length' => 255],
            'description' => ['required' => true, 'min_length' => 10],
            'price' => ['required' => true, 'type' => 'float', 'min' => 0.01],
            'categoryId' => ['required' => true, 'type' => 'uuid'],
            'stockQuantity' => ['required' => true, 'type' => 'integer', 'min' => 0]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        // Generate product ID
        $productId = $this->generateUUID();
        
        // Get vendor ID
        $vendor = $this->db->fetchOne(
            'SELECT id FROM vendors WHERE businessName = ? OR id IN (SELECT id FROM users WHERE id = ? AND role = "vendor")',
            [$user['name'], $user['id']]
        );
        
        if (!$vendor) {
            ResponseHelper::sendError('Vendor profile not found', 400);
        }
        
        try {
            $this->db->beginTransaction();
            
            $insertData = [
                'id' => $productId,
                'vendorId' => $vendor['id'],
                'categoryId' => $data['categoryId'],
                'name' => $data['name'],
                'description' => $data['description'],
                'price' => $data['price'],
                'stockQuantity' => $data['stockQuantity'],
                'sku' => $data['sku'] ?? $this->generateSKU(),
                'status' => 'active',
                'isFeatured' => $data['isFeatured'] ?? 0,
                'discountPercentage' => $data['discountPercentage'] ?? 0,
                'tags' => $data['tags'] ?? '',
                'images' => isset($data['images']) ? json_encode($data['images']) : null,
                'variants' => isset($data['variants']) ? json_encode($data['variants']) : null,
                'specifications' => isset($data['specifications']) ? json_encode($data['specifications']) : null,
                'seoTitle' => $data['seoTitle'] ?? $data['name'],
                'seoDescription' => $data['seoDescription'] ?? substr($data['description'], 0, 160)
            ];
            
            $sql = "INSERT INTO products (" . implode(', ', array_keys($insertData)) . ", createdAt, updatedAt) VALUES (" . 
                   str_repeat('?,', count($insertData) - 1) . "?, NOW(), NOW())";
            
            $this->db->insert($sql, array_values($insertData));
            
            $this->db->commit();
            
            ResponseHelper::sendSuccess(['id' => $productId], 'Product created successfully', 201);
            
        } catch (Exception $e) {
            $this->db->rollback();
            error_log('Product creation error: ' . $e->getMessage());
            ResponseHelper::sendError('Failed to create product', 500);
        }
    }
    
    // Update product (vendor only)
    public function update($id) {
        Auth::validateRequest('vendor');
        
        if (!Validator::uuid($id)) {
            ResponseHelper::sendError('Invalid product ID format', 400);
        }
        
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        // Check if product exists and belongs to vendor
        $product = $this->db->fetchOne(
            'SELECT p.*, v.id as vendorId FROM products p 
             LEFT JOIN vendors v ON p.vendorId = v.id 
             WHERE p.id = ? AND (v.id IN (SELECT id FROM users WHERE id = ? AND role = "vendor") OR ? = "admin")',
            [$id, $user['id'], $user['role']]
        );
        
        if (!$product) {
            ResponseHelper::sendNotFound('Product not found or access denied');
        }
        
        // Validate input
        $allowedFields = ['name', 'description', 'price', 'stockQuantity', 'categoryId', 'status', 'isFeatured', 'discountPercentage', 'tags', 'images', 'variants', 'specifications', 'seoTitle', 'seoDescription'];
        $updateFields = [];
        $params = [];
        
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                if (in_array($field, ['images', 'variants', 'specifications'])) {
                    $updateFields[] = "{$field} = ?";
                    $params[] = json_encode($data[$field]);
                } else {
                    $updateFields[] = "{$field} = ?";
                    $params[] = $data[$field];
                }
            }
        }
        
        if (empty($updateFields)) {
            ResponseHelper::sendError('No valid fields to update');
        }
        
        $updateFields[] = "updatedAt = NOW()";
        $params[] = $id;
        
        $sql = "UPDATE products SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        try {
            $this->db->update($sql, $params);
            ResponseHelper::sendSuccess(null, 'Product updated successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update product', 500);
        }
    }
    
    // Delete product (vendor only)
    public function delete($id) {
        Auth::validateRequest('vendor');
        
        if (!Validator::uuid($id)) {
            ResponseHelper::sendError('Invalid product ID format', 400);
        }
        
        $user = $GLOBALS['current_user'];
        
        // Check if product exists and belongs to vendor
        $product = $this->db->fetchOne(
            'SELECT p.* FROM products p 
             LEFT JOIN vendors v ON p.vendorId = v.id 
             WHERE p.id = ? AND (v.id IN (SELECT id FROM users WHERE id = ? AND role = "vendor") OR ? = "admin")',
            [$id, $user['id'], $user['role']]
        );
        
        if (!$product) {
            ResponseHelper::sendNotFound('Product not found or access denied');
        }
        
        try {
            // Soft delete by setting status to 'deleted'
            $this->db->update(
                'UPDATE products SET status = "deleted", updatedAt = NOW() WHERE id = ?',
                [$id]
            );
            
            ResponseHelper::sendSuccess(null, 'Product deleted successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to delete product', 500);
        }
    }
    
    // Helper method to format product data
    private function formatProduct(&$product) {
        // Parse JSON fields
        if ($product['images']) {
            $product['images'] = json_decode($product['images'], true);
        }
        if ($product['variants']) {
            $product['variants'] = json_decode($product['variants'], true);
        }
        if ($product['specifications']) {
            $product['specifications'] = json_decode($product['specifications'], true);
        }
        
        // Calculate discounted price
        if ($product['discountPercentage'] > 0) {
            $product['discountedPrice'] = $product['price'] * (1 - $product['discountPercentage'] / 100);
        }
        
        // Format ratings
        $product['averageRating'] = floatval($product['averageRating']);
        $product['totalOrders'] = intval($product['totalOrders']);
        $product['totalReviews'] = intval($product['totalReviews']);
        
        // Convert string numbers to proper types
        $product['price'] = floatval($product['price']);
        $product['stockQuantity'] = intval($product['stockQuantity']);
        $product['discountPercentage'] = floatval($product['discountPercentage']);
    }
    
    // Get related products
    private function getRelatedProducts($productId, $categoryId, $limit = 4) {
        $sql = "
            SELECT 
                p.*,
                c.name as categoryName,
                v.businessName as vendorName,
                COALESCE(p.totalOrders, 0) as totalOrders,
                COALESCE(p.averageRating, 0) as averageRating
            FROM products p
            LEFT JOIN categories c ON p.categoryId = c.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE p.categoryId = ? AND p.id != ? AND p.status = 'active'
            ORDER BY p.averageRating DESC, p.totalOrders DESC
            LIMIT {$limit}
        ";
        
        $products = $this->db->fetchAll($sql, [$categoryId, $productId]);
        
        foreach ($products as &$product) {
            $this->formatProduct($product);
        }
        
        return $products;
    }
    
    // Generate UUID v4
    private function generateUUID() {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
    
    // Generate SKU
    private function generateSKU() {
        return 'PRD-' . strtoupper(substr(md5(uniqid()), 0, 8));
    }
}
?>