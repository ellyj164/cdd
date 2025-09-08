<?php
/**
 * Authentication Class
 * JWT-based authentication with refresh tokens and security features
 */

class Auth {
    private static $db = null;
    
    private static function getDB() {
        if (self::$db === null) {
            self::$db = Database::getInstance();
        }
        return self::$db;
    }
    
    // Generate JWT token
    public static function generateJWT($payload, $expiry = null) {
        if ($expiry === null) {
            $expiry = time() + JWT_EXPIRY;
        }
        
        $header = [
            'typ' => 'JWT',
            'alg' => JWT_ALGORITHM
        ];
        
        $payload['iat'] = time();
        $payload['exp'] = $expiry;
        
        $headerEncoded = base64url_encode(json_encode($header));
        $payloadEncoded = base64url_encode(json_encode($payload));
        
        $signature = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, JWT_SECRET, true);
        $signatureEncoded = base64url_encode($signature);
        
        return $headerEncoded . '.' . $payloadEncoded . '.' . $signatureEncoded;
    }
    
    // Verify JWT token
    public static function verifyJWT($token) {
        $parts = explode('.', $token);
        
        if (count($parts) !== 3) {
            return false;
        }
        
        [$headerEncoded, $payloadEncoded, $signatureEncoded] = $parts;
        
        // Verify signature
        $signature = hash_hmac('sha256', $headerEncoded . '.' . $payloadEncoded, JWT_SECRET, true);
        $expectedSignature = base64url_encode($signature);
        
        if (!hash_equals($expectedSignature, $signatureEncoded)) {
            return false;
        }
        
        // Decode payload
        $payload = json_decode(base64url_decode($payloadEncoded), true);
        
        // Check expiry
        if (!isset($payload['exp']) || $payload['exp'] < time()) {
            return false;
        }
        
        return $payload;
    }
    
    // Hash password
    public static function hashPassword($password) {
        return password_hash($password, PASSWORD_BCRYPT, ['cost' => BCRYPT_COST]);
    }
    
    // Verify password
    public static function verifyPassword($password, $hash) {
        return password_verify($password, $hash);
    }
    
    // Generate secure random token
    public static function generateToken($length = 32) {
        return bin2hex(random_bytes($length));
    }
    
    // Get current user from JWT token
    public static function getCurrentUser() {
        $token = self::getTokenFromRequest();
        
        if (!$token) {
            return null;
        }
        
        $payload = self::verifyJWT($token);
        
        if (!$payload) {
            return null;
        }
        
        // Get user from database
        $db = self::getDB();
        $user = $db->fetchOne(
            'SELECT id, email, phone, name, role, accountType, emailVerified, phoneVerified, isActive, profile, lastLoginAt, createdAt FROM users WHERE id = ? AND isActive = 1',
            [$payload['userId']]
        );
        
        if (!$user) {
            return null;
        }
        
        // Parse JSON fields
        if ($user['profile']) {
            $user['profile'] = json_decode($user['profile'], true);
        }
        
        return $user;
    }
    
    // Validate request authentication
    public static function validateRequest($requiredRole = null) {
        $user = self::getCurrentUser();
        
        if (!$user) {
            ResponseHelper::sendUnauthorized('Authentication required');
            return false;
        }
        
        if ($requiredRole && $user['role'] !== $requiredRole && $user['role'] !== 'admin') {
            ResponseHelper::sendForbidden('Insufficient permissions');
            return false;
        }
        
        // Store user in global scope for use in controllers
        $GLOBALS['current_user'] = $user;
        
        return true;
    }
    
    // Get token from request headers
    private static function getTokenFromRequest() {
        $headers = getallheaders();
        
        if (isset($headers['Authorization'])) {
            $authHeader = $headers['Authorization'];
            if (preg_match('/Bearer\s+(.*)$/i', $authHeader, $matches)) {
                return $matches[1];
            }
        }
        
        return null;
    }
    
    // Login user
    public static function login($emailOrPhone, $password) {
        $db = self::getDB();
        
        // Find user by email or phone
        $user = $db->fetchOne(
            'SELECT * FROM users WHERE (email = ? OR phone = ?) AND isActive = 1',
            [$emailOrPhone, $emailOrPhone]
        );
        
        if (!$user || !self::verifyPassword($password, $user['password'])) {
            return [
                'success' => false,
                'message' => 'Invalid credentials'
            ];
        }
        
        // Check if email/phone is verified
        if ($user['email'] === $emailOrPhone && !$user['emailVerified']) {
            return [
                'success' => false,
                'message' => 'Email not verified'
            ];
        }
        
        if ($user['phone'] === $emailOrPhone && !$user['phoneVerified']) {
            return [
                'success' => false,
                'message' => 'Phone number not verified'
            ];
        }
        
        // Generate tokens
        $accessToken = self::generateJWT(['userId' => $user['id'], 'role' => $user['role']]);
        $refreshToken = self::generateJWT(['userId' => $user['id'], 'type' => 'refresh'], time() + JWT_REFRESH_EXPIRY);
        
        // Update last login
        $db->update(
            'UPDATE users SET lastLoginAt = NOW() WHERE id = ?',
            [$user['id']]
        );
        
        // Remove sensitive data
        unset($user['password'], $user['twoFactorSecret']);
        
        // Parse JSON fields
        if ($user['profile']) {
            $user['profile'] = json_decode($user['profile'], true);
        }
        if ($user['kyc']) {
            $user['kyc'] = json_decode($user['kyc'], true);
        }
        if ($user['onboarding']) {
            $user['onboarding'] = json_decode($user['onboarding'], true);
        }
        
        return [
            'success' => true,
            'user' => $user,
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
            'expiresIn' => JWT_EXPIRY
        ];
    }
    
    // Register user
    public static function register($data) {
        $db = self::getDB();
        
        // Validate required fields
        $required = ['name', 'password', 'accountType'];
        foreach ($required as $field) {
            if (empty($data[$field])) {
                return [
                    'success' => false,
                    'message' => "Missing required field: {$field}"
                ];
            }
        }
        
        // Validate contact method
        if (empty($data['email']) && empty($data['phone'])) {
            return [
                'success' => false,
                'message' => 'Email or phone number is required'
            ];
        }
        
        // Check if user already exists
        $existingUser = null;
        if (!empty($data['email'])) {
            $existingUser = $db->fetchOne('SELECT id FROM users WHERE email = ?', [$data['email']]);
        }
        if (!$existingUser && !empty($data['phone'])) {
            $existingUser = $db->fetchOne('SELECT id FROM users WHERE phone = ?', [$data['phone']]);
        }
        
        if ($existingUser) {
            return [
                'success' => false,
                'message' => 'User already exists with this email or phone number'
            ];
        }
        
        // Generate user ID
        $userId = self::generateUUID();
        
        // Hash password
        $hashedPassword = self::hashPassword($data['password']);
        
        // Determine role
        $role = $data['accountType'] === 'business' ? 'vendor' : 'customer';
        
        // Prepare user data
        $userData = [
            'id' => $userId,
            'email' => $data['email'] ?? null,
            'phone' => $data['phone'] ?? null,
            'password' => $hashedPassword,
            'name' => $data['name'],
            'role' => $role,
            'accountType' => $data['accountType'],
            'emailVerified' => empty($data['email']) ? 1 : 0,
            'phoneVerified' => empty($data['phone']) ? 1 : 0,
            'isActive' => 1,
            'profile' => json_encode([
                'firstName' => $data['firstName'] ?? '',
                'lastName' => $data['lastName'] ?? '',
                'avatar' => null
            ]),
            'onboarding' => json_encode([
                'currentStep' => 1,
                'totalSteps' => $role === 'vendor' ? 8 : 5,
                'completedSteps' => ['registration'],
                'data' => [
                    'name' => $data['name'],
                    'accountType' => $data['accountType']
                ]
            ])
        ];
        
        try {
            $db->beginTransaction();
            
            // Insert user
            $db->insert(
                'INSERT INTO users (id, email, phone, password, name, role, accountType, emailVerified, phoneVerified, isActive, profile, onboarding, createdAt, updatedAt) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())',
                [
                    $userData['id'],
                    $userData['email'],
                    $userData['phone'],
                    $userData['password'],
                    $userData['name'],
                    $userData['role'],
                    $userData['accountType'],
                    $userData['emailVerified'],
                    $userData['phoneVerified'],
                    $userData['isActive'],
                    $userData['profile'],
                    $userData['onboarding']
                ]
            );
            
            $db->commit();
            
            // Generate tokens if no verification needed
            $tokens = null;
            if ($userData['emailVerified'] && $userData['phoneVerified']) {
                $accessToken = self::generateJWT(['userId' => $userId, 'role' => $role]);
                $refreshToken = self::generateJWT(['userId' => $userId, 'type' => 'refresh'], time() + JWT_REFRESH_EXPIRY);
                
                $tokens = [
                    'accessToken' => $accessToken,
                    'refreshToken' => $refreshToken,
                    'expiresIn' => JWT_EXPIRY
                ];
            }
            
            return [
                'success' => true,
                'userId' => $userId,
                'requiresVerification' => !($userData['emailVerified'] && $userData['phoneVerified']),
                'tokens' => $tokens
            ];
            
        } catch (Exception $e) {
            $db->rollback();
            error_log('Registration error: ' . $e->getMessage());
            return [
                'success' => false,
                'message' => 'Registration failed'
            ];
        }
    }
    
    // Generate UUID v4
    private static function generateUUID() {
        $data = random_bytes(16);
        $data[6] = chr(ord($data[6]) & 0x0f | 0x40);
        $data[8] = chr(ord($data[8]) & 0x3f | 0x80);
        return vsprintf('%s%s-%s-%s-%s-%s%s%s', str_split(bin2hex($data), 4));
    }
}

// Helper function for base64url encoding
function base64url_encode($data) {
    return rtrim(strtr(base64_encode($data), '+/', '-_'), '=');
}

// Helper function for base64url decoding
function base64url_decode($data) {
    return base64_decode(str_pad(strtr($data, '-_', '+/'), strlen($data) % 4, '=', STR_PAD_RIGHT));
}
?>