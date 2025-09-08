<?php
/**
 * Cart Controller
 * Handles shopping cart operations
 */

class CartController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Get user's cart
    public function get() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        
        $sql = "
            SELECT 
                ci.*,
                p.name as productName,
                p.price as productPrice,
                p.images as productImages,
                p.stockQuantity,
                v.businessName as vendorName
            FROM cart_items ci
            LEFT JOIN products p ON ci.productId = p.id
            LEFT JOIN vendors v ON p.vendorId = v.id
            WHERE ci.userId = ? AND p.status = 'active'
            ORDER BY ci.createdAt DESC
        ";
        
        $items = $this->db->fetchAll($sql, [$user['id']]);
        
        // Format data and calculate totals
        $total = 0;
        foreach ($items as &$item) {
            if ($item['productImages']) {
                $item['productImages'] = json_decode($item['productImages'], true);
            }
            $item['subtotal'] = $item['quantity'] * $item['productPrice'];
            $total += $item['subtotal'];
        }
        
        ResponseHelper::sendSuccess([
            'items' => $items,
            'total' => $total,
            'itemCount' => count($items)
        ]);
    }
    
    // Add item to cart
    public function add() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'productId' => ['required' => true, 'type' => 'uuid'],
            'quantity' => ['required' => true, 'type' => 'integer', 'min' => 1]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        // Check if product exists and is available
        $product = $this->db->fetchOne(
            'SELECT id, stockQuantity FROM products WHERE id = ? AND status = "active"',
            [$data['productId']]
        );
        
        if (!$product) {
            ResponseHelper::sendError('Product not found or unavailable', 404);
        }
        
        if ($product['stockQuantity'] < $data['quantity']) {
            ResponseHelper::sendError('Insufficient stock available', 400);
        }
        
        // Check if item already exists in cart
        $existingItem = $this->db->fetchOne(
            'SELECT id, quantity FROM cart_items WHERE userId = ? AND productId = ?',
            [$user['id'], $data['productId']]
        );
        
        try {
            if ($existingItem) {
                // Update existing item
                $newQuantity = $existingItem['quantity'] + $data['quantity'];
                
                if ($newQuantity > $product['stockQuantity']) {
                    ResponseHelper::sendError('Cannot add more items than available in stock', 400);
                }
                
                $this->db->update(
                    'UPDATE cart_items SET quantity = ?, updatedAt = NOW() WHERE id = ?',
                    [$newQuantity, $existingItem['id']]
                );
            } else {
                // Add new item
                $this->db->insert(
                    'INSERT INTO cart_items (userId, productId, quantity, variantId, createdAt, updatedAt) VALUES (?, ?, ?, ?, NOW(), NOW())',
                    [$user['id'], $data['productId'], $data['quantity'], $data['variantId'] ?? null]
                );
            }
            
            ResponseHelper::sendSuccess(null, 'Item added to cart successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to add item to cart', 500);
        }
    }
    
    // Update cart item quantity
    public function update() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'itemId' => ['required' => true, 'type' => 'uuid'],
            'quantity' => ['required' => true, 'type' => 'integer', 'min' => 1]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        // Check if cart item exists and belongs to user
        $cartItem = $this->db->fetchOne(
            'SELECT ci.*, p.stockQuantity FROM cart_items ci 
             LEFT JOIN products p ON ci.productId = p.id 
             WHERE ci.id = ? AND ci.userId = ?',
            [$data['itemId'], $user['id']]
        );
        
        if (!$cartItem) {
            ResponseHelper::sendNotFound('Cart item not found');
        }
        
        if ($data['quantity'] > $cartItem['stockQuantity']) {
            ResponseHelper::sendError('Insufficient stock available', 400);
        }
        
        try {
            $this->db->update(
                'UPDATE cart_items SET quantity = ?, updatedAt = NOW() WHERE id = ?',
                [$data['quantity'], $data['itemId']]
            );
            
            ResponseHelper::sendSuccess(null, 'Cart item updated successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update cart item', 500);
        }
    }
    
    // Remove item from cart
    public function remove($itemId) {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        
        if (!Validator::uuid($itemId)) {
            ResponseHelper::sendError('Invalid item ID format', 400);
        }
        
        // Check if cart item exists and belongs to user
        $cartItem = $this->db->fetchOne(
            'SELECT id FROM cart_items WHERE id = ? AND userId = ?',
            [$itemId, $user['id']]
        );
        
        if (!$cartItem) {
            ResponseHelper::sendNotFound('Cart item not found');
        }
        
        try {
            $this->db->delete('DELETE FROM cart_items WHERE id = ?', [$itemId]);
            ResponseHelper::sendSuccess(null, 'Item removed from cart successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to remove item from cart', 500);
        }
    }
    
    // Clear entire cart
    public function clear() {
        Auth::validateRequest();
        $user = $GLOBALS['current_user'];
        
        try {
            $this->db->delete('DELETE FROM cart_items WHERE userId = ?', [$user['id']]);
            ResponseHelper::sendSuccess(null, 'Cart cleared successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to clear cart', 500);
        }
    }
}
?>