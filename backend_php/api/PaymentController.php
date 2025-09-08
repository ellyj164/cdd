<?php
require_once __DIR__ . '/../includes/Database.php';
require_once __DIR__ . '/../includes/Auth.php';
require_once __DIR__ . '/../includes/ResponseHelper.php';
require_once __DIR__ . '/../includes/Validator.php';

class PaymentController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // Process payment
    public function processPayment() {
        Auth::validateRequest();
        
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'orderId' => ['required' => true],
            'amount' => ['required' => true, 'type' => 'numeric'],
            'currency' => ['required' => true, 'enum' => ['USD', 'EUR', 'GBP', 'BTC', 'ETH']],
            'paymentMethod' => ['required' => true]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        try {
            $this->db->beginTransaction();
            
            // Get order details
            $order = $this->db->fetchOne(
                'SELECT * FROM orders WHERE id = ? AND userId = ?',
                [$data['orderId'], $GLOBALS['current_user']['id']]
            );
            
            if (!$order) {
                ResponseHelper::sendError('Order not found', 404);
            }
            
            if ($order['status'] !== 'pending') {
                ResponseHelper::sendError('Order cannot be processed', 400);
            }
            
            // Validate amount matches order total
            if (abs($data['amount'] - $order['total']) > 0.01) {
                ResponseHelper::sendError('Payment amount does not match order total', 400);
            }
            
            // Process payment based on method
            $paymentResult = $this->processPaymentMethod($data, $order);
            
            if ($paymentResult['success']) {
                // Create payment record
                $paymentId = $this->generateId();
                $this->db->execute(
                    'INSERT INTO payments (id, orderId, userId, amount, currency, paymentMethod, status, transactionId, gatewayResponse, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                    [
                        $paymentId,
                        $data['orderId'],
                        $GLOBALS['current_user']['id'],
                        $data['amount'],
                        $data['currency'],
                        json_encode($data['paymentMethod']),
                        'completed',
                        $paymentResult['transactionId'],
                        json_encode($paymentResult['response'])
                    ]
                );
                
                // Update order status
                $this->db->execute(
                    'UPDATE orders SET status = ?, paymentStatus = ?, updatedAt = NOW() WHERE id = ?',
                    ['confirmed', 'paid', $data['orderId']]
                );
                
                $this->db->commit();
                
                ResponseHelper::sendSuccess([
                    'paymentId' => $paymentId,
                    'transactionId' => $paymentResult['transactionId'],
                    'status' => 'completed'
                ], 'Payment processed successfully');
            } else {
                $this->db->rollback();
                ResponseHelper::sendError($paymentResult['message'], 400);
            }
            
        } catch (Exception $e) {
            $this->db->rollback();
            error_log("Payment error: " . $e->getMessage());
            ResponseHelper::sendError('Payment processing failed', 500);
        }
    }
    
    // Process different payment methods
    private function processPaymentMethod($data, $order) {
        $method = $data['paymentMethod'];
        
        switch ($method['type']) {
            case 'card':
                return $this->processCardPayment($method, $data['amount'], $data['currency']);
            case 'crypto':
                return $this->processCryptoPayment($method, $data['amount'], $data['currency']);
            case 'paypal':
                return $this->processPayPalPayment($method, $data['amount'], $data['currency']);
            case 'bank_transfer':
                return $this->processBankTransfer($method, $data['amount'], $data['currency']);
            default:
                return ['success' => false, 'message' => 'Unsupported payment method'];
        }
    }
    
    // Process card payment (Stripe integration)
    private function processCardPayment($method, $amount, $currency) {
        // In a real implementation, integrate with Stripe
        $transactionId = 'stripe_' . $this->generateId();
        
        // Simulate payment processing
        if ($amount > 0 && isset($method['token'])) {
            return [
                'success' => true,
                'transactionId' => $transactionId,
                'response' => [
                    'processor' => 'stripe',
                    'charge_id' => $transactionId,
                    'status' => 'succeeded'
                ]
            ];
        }
        
        return ['success' => false, 'message' => 'Card payment failed'];
    }
    
    // Process cryptocurrency payment
    private function processCryptoPayment($method, $amount, $currency) {
        // In a real implementation, integrate with crypto payment processor
        $transactionId = 'crypto_' . $this->generateId();
        
        // Simulate crypto payment
        if ($amount > 0 && isset($method['wallet'])) {
            return [
                'success' => true,
                'transactionId' => $transactionId,
                'response' => [
                    'processor' => 'crypto',
                    'blockchain' => $method['blockchain'] ?? 'ethereum',
                    'tx_hash' => hash('sha256', $transactionId . time()),
                    'status' => 'confirmed'
                ]
            ];
        }
        
        return ['success' => false, 'message' => 'Crypto payment failed'];
    }
    
    // Process PayPal payment
    private function processPayPalPayment($method, $amount, $currency) {
        $transactionId = 'paypal_' . $this->generateId();
        
        // Simulate PayPal payment
        if ($amount > 0 && isset($method['paypalId'])) {
            return [
                'success' => true,
                'transactionId' => $transactionId,
                'response' => [
                    'processor' => 'paypal',
                    'payment_id' => $transactionId,
                    'status' => 'approved'
                ]
            ];
        }
        
        return ['success' => false, 'message' => 'PayPal payment failed'];
    }
    
    // Process bank transfer
    private function processBankTransfer($method, $amount, $currency) {
        $transactionId = 'bank_' . $this->generateId();
        
        // Bank transfer requires manual verification
        if ($amount > 0 && isset($method['bankAccount'])) {
            return [
                'success' => true,
                'transactionId' => $transactionId,
                'response' => [
                    'processor' => 'bank_transfer',
                    'reference' => $transactionId,
                    'status' => 'pending_verification'
                ]
            ];
        }
        
        return ['success' => false, 'message' => 'Bank transfer setup failed'];
    }
    
    // Get payment methods
    public function getPaymentMethods() {
        ResponseHelper::sendSuccess([
            'methods' => [
                [
                    'type' => 'card',
                    'name' => 'Credit/Debit Card',
                    'currencies' => ['USD', 'EUR', 'GBP'],
                    'fees' => '2.9% + $0.30'
                ],
                [
                    'type' => 'paypal',
                    'name' => 'PayPal',
                    'currencies' => ['USD', 'EUR', 'GBP'],
                    'fees' => '3.4% + $0.30'
                ],
                [
                    'type' => 'crypto',
                    'name' => 'Cryptocurrency',
                    'currencies' => ['BTC', 'ETH', 'USDC'],
                    'fees' => '1.0%'
                ],
                [
                    'type' => 'bank_transfer',
                    'name' => 'Bank Transfer',
                    'currencies' => ['USD', 'EUR'],
                    'fees' => '$5.00'
                ]
            ]
        ]);
    }
    
    // Get cryptocurrency prices
    public function getCryptoPrices() {
        // In a real implementation, fetch from external API
        $prices = [
            'BTC' => ['usd' => 45000.00, 'change24h' => 2.5],
            'ETH' => ['usd' => 3200.00, 'change24h' => 1.8],
            'USDC' => ['usd' => 1.00, 'change24h' => 0.0],
            'USDT' => ['usd' => 1.00, 'change24h' => 0.0]
        ];
        
        ResponseHelper::sendSuccess([
            'timestamp' => date('c'),
            'prices' => $prices,
            'supported' => array_keys($prices)
        ]);
    }
    
    // Get payment history
    public function getPaymentHistory() {
        Auth::validateRequest();
        
        $payments = $this->db->fetchAll(
            'SELECT p.*, o.orderNumber FROM payments p 
             LEFT JOIN orders o ON p.orderId = o.id 
             WHERE p.userId = ? 
             ORDER BY p.createdAt DESC 
             LIMIT 50',
            [$GLOBALS['current_user']['id']]
        );
        
        // Parse JSON fields
        foreach ($payments as &$payment) {
            $payment['paymentMethod'] = json_decode($payment['paymentMethod'], true);
            $payment['gatewayResponse'] = json_decode($payment['gatewayResponse'], true);
        }
        
        ResponseHelper::sendSuccess(['payments' => $payments]);
    }
    
    // Generate unique ID
    private function generateId() {
        return substr(str_replace('-', '', (string) \Ramsey\Uuid\Uuid::uuid4()), 0, 16);
    }
}
?>