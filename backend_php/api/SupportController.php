<?php
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/ResponseHelper.php';
require_once __DIR__ . '/../includes/Validator.php';

class SupportController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Create support ticket
    public function createTicket() {
        Auth::validateRequest();
        
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'subject' => ['required' => true, 'min_length' => 5, 'max_length' => 255],
            'message' => ['required' => true, 'min_length' => 10],
            'category' => ['required' => true, 'enum' => ['general', 'order', 'payment', 'product', 'technical']],
            'priority' => ['enum' => ['low', 'medium', 'high', 'urgent']]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        try {
            $ticketId = $this->generateTicketId();
            
            $this->db->execute(
                'INSERT INTO support_tickets (id, userId, subject, message, category, priority, status, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                [
                    $ticketId,
                    $GLOBALS['current_user']['id'],
                    $data['subject'],
                    $data['message'],
                    $data['category'],
                    $data['priority'] ?? 'medium',
                    'open'
                ]
            );
            
            // Send notification email (in real implementation)
            $this->sendTicketNotification($ticketId, 'created');
            
            ResponseHelper::sendSuccess([
                'ticketId' => $ticketId,
                'status' => 'open'
            ], 'Support ticket created successfully', 201);
            
        } catch (Exception $e) {
            error_log("Support ticket creation error: " . $e->getMessage());
            ResponseHelper::sendError('Failed to create support ticket', 500);
        }
    }
    
    // Get user tickets
    public function getUserTickets() {
        Auth::validateRequest();
        
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = min(50, max(10, intval($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;
        
        $status = $_GET['status'] ?? null;
        $statusCondition = $status ? 'AND status = ?' : '';
        $params = [$GLOBALS['current_user']['id']];
        
        if ($status) {
            $params[] = $status;
        }
        
        $tickets = $this->db->fetchAll(
            "SELECT st.*, 
                    (SELECT COUNT(*) FROM support_messages sm WHERE sm.ticketId = st.id) as messageCount,
                    (SELECT createdAt FROM support_messages sm WHERE sm.ticketId = st.id ORDER BY createdAt DESC LIMIT 1) as lastReply
             FROM support_tickets st 
             WHERE userId = ? $statusCondition 
             ORDER BY updatedAt DESC 
             LIMIT $limit OFFSET $offset",
            $params
        );
        
        // Get total count
        $totalResult = $this->db->fetchOne(
            "SELECT COUNT(*) as total FROM support_tickets WHERE userId = ? $statusCondition",
            $params
        );
        $total = intval($totalResult['total']);
        
        ResponseHelper::sendSuccess([
            'tickets' => $tickets,
            'pagination' => [
                'page' => $page,
                'limit' => $limit,
                'total' => $total,
                'pages' => ceil($total / $limit)
            ]
        ]);
    }
    
    // Get ticket details
    public function getTicket() {
        Auth::validateRequest();
        
        $ticketId = $_GET['id'] ?? '';
        
        if (empty($ticketId)) {
            ResponseHelper::sendError('Ticket ID is required', 400);
        }
        
        // Get ticket
        $ticket = $this->db->fetchOne(
            'SELECT st.*, u.name as userName FROM support_tickets st LEFT JOIN users u ON st.userId = u.id WHERE st.id = ? AND st.userId = ?',
            [$ticketId, $GLOBALS['current_user']['id']]
        );
        
        if (!$ticket) {
            ResponseHelper::sendError('Ticket not found', 404);
        }
        
        // Get messages
        $messages = $this->db->fetchAll(
            'SELECT sm.*, u.name as senderName FROM support_messages sm LEFT JOIN users u ON sm.userId = u.id WHERE sm.ticketId = ? ORDER BY sm.createdAt ASC',
            [$ticketId]
        );
        
        ResponseHelper::sendSuccess([
            'ticket' => $ticket,
            'messages' => $messages
        ]);
    }
    
    // Add message to ticket
    public function addMessage() {
        Auth::validateRequest();
        
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'ticketId' => ['required' => true],
            'message' => ['required' => true, 'min_length' => 1]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        try {
            // Verify ticket ownership
            $ticket = $this->db->fetchOne(
                'SELECT * FROM support_tickets WHERE id = ? AND userId = ?',
                [$data['ticketId'], $GLOBALS['current_user']['id']]
            );
            
            if (!$ticket) {
                ResponseHelper::sendError('Ticket not found', 404);
            }
            
            if ($ticket['status'] === 'closed') {
                ResponseHelper::sendError('Cannot add message to closed ticket', 400);
            }
            
            $messageId = $this->generateId();
            
            $this->db->beginTransaction();
            
            // Add message
            $this->db->execute(
                'INSERT INTO support_messages (id, ticketId, userId, message, isStaff, createdAt) VALUES (?, ?, ?, ?, ?, NOW())',
                [
                    $messageId,
                    $data['ticketId'],
                    $GLOBALS['current_user']['id'],
                    $data['message'],
                    0
                ]
            );
            
            // Update ticket status and timestamp
            $this->db->execute(
                'UPDATE support_tickets SET status = ?, updatedAt = NOW() WHERE id = ?',
                ['waiting_staff', $data['ticketId']]
            );
            
            $this->db->commit();
            
            // Send notification
            $this->sendTicketNotification($data['ticketId'], 'message_added');
            
            ResponseHelper::sendSuccess([
                'messageId' => $messageId
            ], 'Message added successfully', 201);
            
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Support message error: " . $e->getMessage());
            ResponseHelper::sendError('Failed to add message', 500);
        }
    }
    
    // Close ticket
    public function closeTicket() {
        Auth::validateRequest();
        
        $ticketId = $_POST['ticketId'] ?? $_GET['id'] ?? '';
        
        if (empty($ticketId)) {
            ResponseHelper::sendError('Ticket ID is required', 400);
        }
        
        try {
            // Verify ticket ownership
            $ticket = $this->db->fetchOne(
                'SELECT * FROM support_tickets WHERE id = ? AND userId = ?',
                [$ticketId, $GLOBALS['current_user']['id']]
            );
            
            if (!$ticket) {
                ResponseHelper::sendError('Ticket not found', 404);
            }
            
            $this->db->execute(
                'UPDATE support_tickets SET status = ?, updatedAt = NOW() WHERE id = ?',
                ['closed', $ticketId]
            );
            
            ResponseHelper::sendSuccess(null, 'Ticket closed successfully');
            
        } catch (Exception $e) {
            error_log("Support ticket close error: " . $e->getMessage());
            ResponseHelper::sendError('Failed to close ticket', 500);
        }
    }
    
    // Get knowledge base articles
    public function getKnowledgeBase() {
        $category = $_GET['category'] ?? null;
        $search = $_GET['search'] ?? null;
        
        $whereConditions = ['published = 1'];
        $params = [];
        
        if ($category) {
            $whereConditions[] = 'category = ?';
            $params[] = $category;
        }
        
        if ($search) {
            $whereConditions[] = '(title LIKE ? OR content LIKE ?)';
            $params[] = "%$search%";
            $params[] = "%$search%";
        }
        
        $whereClause = implode(' AND ', $whereConditions);
        
        $articles = $this->db->fetchAll(
            "SELECT id, title, excerpt, category, views, createdAt 
             FROM knowledge_base 
             WHERE $whereClause 
             ORDER BY views DESC, createdAt DESC 
             LIMIT 50",
            $params
        );
        
        // Get categories
        $categories = $this->db->fetchAll(
            "SELECT DISTINCT category, COUNT(*) as count 
             FROM knowledge_base 
             WHERE published = 1 
             GROUP BY category 
             ORDER BY category"
        );
        
        ResponseHelper::sendSuccess([
            'articles' => $articles,
            'categories' => $categories
        ]);
    }
    
    // Get knowledge base article
    public function getKnowledgeBaseArticle() {
        $articleId = $_GET['id'] ?? '';
        
        if (empty($articleId)) {
            ResponseHelper::sendError('Article ID is required', 400);
        }
        
        $article = $this->db->fetchOne(
            'SELECT * FROM knowledge_base WHERE id = ? AND published = 1',
            [$articleId]
        );
        
        if (!$article) {
            ResponseHelper::sendError('Article not found', 404);
        }
        
        // Increment view count
        $this->db->execute(
            'UPDATE knowledge_base SET views = views + 1 WHERE id = ?',
            [$articleId]
        );
        
        ResponseHelper::sendSuccess(['article' => $article]);
    }
    
    // Get FAQ
    public function getFAQ() {
        $faqs = $this->db->fetchAll(
            'SELECT * FROM faq WHERE published = 1 ORDER BY sortOrder ASC, id ASC'
        );
        
        ResponseHelper::sendSuccess(['faqs' => $faqs]);
    }
    
    // Admin methods (for staff)
    public function getAllTickets() {
        Auth::validateRequest('admin');
        
        $page = max(1, intval($_GET['page'] ?? 1));
        $limit = min(100, max(10, intval($_GET['limit'] ?? 20)));
        $offset = ($page - 1) * $limit;
        
        $status = $_GET['status'] ?? null;
        $priority = $_GET['priority'] ?? null;
        $category = $_GET['category'] ?? null;
        
        $whereConditions = [];
        $params = [];
        
        if ($status) {
            $whereConditions[] = 'st.status = ?';
            $params[] = $status;
        }
        
        if ($priority) {
            $whereConditions[] = 'st.priority = ?';
            $params[] = $priority;
        }
        
        if ($category) {
            $whereConditions[] = 'st.category = ?';
            $params[] = $category;
        }
        
        $whereClause = !empty($whereConditions) ? 'WHERE ' . implode(' AND ', $whereConditions) : '';
        
        $tickets = $this->db->fetchAll(
            "SELECT st.*, u.name as userName, u.email as userEmail,
                    (SELECT COUNT(*) FROM support_messages sm WHERE sm.ticketId = st.id) as messageCount
             FROM support_tickets st 
             LEFT JOIN users u ON st.userId = u.id 
             $whereClause
             ORDER BY 
                CASE st.priority 
                    WHEN 'urgent' THEN 1
                    WHEN 'high' THEN 2
                    WHEN 'medium' THEN 3
                    WHEN 'low' THEN 4
                END,
                st.updatedAt DESC
             LIMIT $limit OFFSET $offset",
            $params
        );
        
        ResponseHelper::sendSuccess(['tickets' => $tickets]);
    }
    
    // Helper methods
    private function generateTicketId() {
        return 'TK' . date('Ymd') . str_pad(mt_rand(1, 9999), 4, '0', STR_PAD_LEFT);
    }
    
    private function generateId() {
        return substr(str_replace('-', '', (string) \Ramsey\Uuid\Uuid::uuid4()), 0, 16);
    }
    
    private function sendTicketNotification($ticketId, $action) {
        // In a real implementation, send email notifications
        error_log("Ticket notification: $action for ticket $ticketId");
    }
}
?>