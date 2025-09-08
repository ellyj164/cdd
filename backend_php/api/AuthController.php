<?php
/**
 * Authentication Controller
 * Handles user authentication, registration, and profile management
 */

class AuthController {
    private $db;
    
    public function __construct() {
        $this->db = Database::getInstance();
    }
    
    // User login
    public function login() {
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'email' => ['required' => true, 'type' => 'email'],
            'password' => ['required' => true, 'min_length' => 1]
        ]);
        
        // Also accept phone login
        if (!empty($data['phone']) && empty($data['email'])) {
            $errors = Validator::validateSchema($data, [
                'phone' => ['required' => true, 'type' => 'phone'],
                'password' => ['required' => true, 'min_length' => 1]
            ]);
        }
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        $emailOrPhone = $data['email'] ?? $data['phone'];
        $password = $data['password'];
        
        $result = Auth::login($emailOrPhone, $password);
        
        if ($result['success']) {
            ResponseHelper::sendSuccess([
                'user' => $result['user'],
                'accessToken' => $result['accessToken'],
                'refreshToken' => $result['refreshToken'],
                'expiresIn' => $result['expiresIn']
            ], 'Login successful');
        } else {
            ResponseHelper::sendError($result['message'], 401);
        }
    }
    
    // User registration
    public function register() {
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'name' => ['required' => true, 'min_length' => 2, 'max_length' => 255],
            'password' => ['required' => true, 'type' => 'password'],
            'accountType' => ['required' => true, 'enum' => ['individual', 'business']],
            'email' => ['type' => 'email'],
            'phone' => ['type' => 'phone']
        ]);
        
        // Require at least email or phone
        if (empty($data['email']) && empty($data['phone'])) {
            $errors['contact'] = 'Either email or phone number is required';
        }
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        $result = Auth::register($data);
        
        if ($result['success']) {
            $response = [
                'userId' => $result['userId'],
                'requiresVerification' => $result['requiresVerification']
            ];
            
            if ($result['tokens']) {
                $response = array_merge($response, $result['tokens']);
            }
            
            ResponseHelper::sendSuccess($response, 'Registration successful', 201);
        } else {
            ResponseHelper::sendError($result['message'], 400);
        }
    }
    
    // Get current user profile
    public function getProfile() {
        Auth::validateRequest();
        
        $user = $GLOBALS['current_user'];
        ResponseHelper::sendSuccess($user);
    }
    
    // Update user profile
    public function updateProfile() {
        Auth::validateRequest();
        
        $user = $GLOBALS['current_user'];
        $data = ResponseHelper::getJsonInput();
        
        // Validate input
        $errors = Validator::validateSchema($data, [
            'name' => ['max_length' => 255],
            'email' => ['type' => 'email'],
            'phone' => ['type' => 'phone']
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        $updateFields = [];
        $params = [];
        
        // Update allowed fields
        $allowedFields = ['name', 'email', 'phone'];
        foreach ($allowedFields as $field) {
            if (isset($data[$field])) {
                $updateFields[] = "{$field} = ?";
                $params[] = $data[$field];
                
                // If updating email or phone, mark as unverified
                if ($field === 'email' && $data[$field] !== $user['email']) {
                    $updateFields[] = "emailVerified = 0";
                }
                if ($field === 'phone' && $data[$field] !== $user['phone']) {
                    $updateFields[] = "phoneVerified = 0";
                }
            }
        }
        
        // Update profile JSON
        if (isset($data['profile'])) {
            $currentProfile = $user['profile'] ?? [];
            $newProfile = array_merge($currentProfile, $data['profile']);
            $updateFields[] = "profile = ?";
            $params[] = json_encode($newProfile);
        }
        
        if (empty($updateFields)) {
            ResponseHelper::sendError('No valid fields to update');
        }
        
        $updateFields[] = "updatedAt = NOW()";
        $params[] = $user['id'];
        
        $sql = "UPDATE users SET " . implode(', ', $updateFields) . " WHERE id = ?";
        
        try {
            $this->db->update($sql, $params);
            
            // Get updated user
            $updatedUser = $this->db->fetchOne(
                'SELECT id, email, phone, name, role, accountType, emailVerified, phoneVerified, isActive, profile, lastLoginAt, createdAt FROM users WHERE id = ?',
                [$user['id']]
            );
            
            if ($updatedUser['profile']) {
                $updatedUser['profile'] = json_decode($updatedUser['profile'], true);
            }
            
            ResponseHelper::sendSuccess($updatedUser, 'Profile updated successfully');
        } catch (Exception $e) {
            ResponseHelper::sendError('Failed to update profile', 500);
        }
    }
    
    // Refresh JWT token
    public function refresh() {
        $data = ResponseHelper::getJsonInput();
        
        if (empty($data['refreshToken'])) {
            ResponseHelper::sendError('Refresh token required', 400);
        }
        
        $payload = Auth::verifyJWT($data['refreshToken']);
        
        if (!$payload || $payload['type'] !== 'refresh') {
            ResponseHelper::sendError('Invalid refresh token', 401);
        }
        
        // Get user
        $user = $this->db->fetchOne(
            'SELECT id, role FROM users WHERE id = ? AND isActive = 1',
            [$payload['userId']]
        );
        
        if (!$user) {
            ResponseHelper::sendError('User not found', 401);
        }
        
        // Generate new tokens
        $accessToken = Auth::generateJWT(['userId' => $user['id'], 'role' => $user['role']]);
        $refreshToken = Auth::generateJWT(['userId' => $user['id'], 'type' => 'refresh'], time() + JWT_REFRESH_EXPIRY);
        
        ResponseHelper::sendSuccess([
            'accessToken' => $accessToken,
            'refreshToken' => $refreshToken,
            'expiresIn' => JWT_EXPIRY
        ]);
    }
    
    // User logout
    public function logout() {
        Auth::validateRequest();
        
        // In a real implementation, you would invalidate the token
        // For JWT, this typically involves a blacklist or shorter expiry times
        
        ResponseHelper::sendSuccess(null, 'Logout successful');
    }
    
    // Forgot password
    public function forgotPassword() {
        $data = ResponseHelper::getJsonInput();
        
        if (empty($data['email'])) {
            ResponseHelper::sendError('Email is required', 400);
        }
        
        if (!Validator::email($data['email'])) {
            ResponseHelper::sendError('Invalid email format', 400);
        }
        
        // Check if user exists
        $user = $this->db->fetchOne(
            'SELECT id, email, name FROM users WHERE email = ? AND isActive = 1',
            [$data['email']]
        );
        
        if (!$user) {
            // Don't reveal if email exists or not
            ResponseHelper::sendSuccess(null, 'If the email exists, a reset link has been sent');
        }
        
        // Generate reset token
        $resetToken = Auth::generateToken();
        $expiresAt = date('Y-m-d H:i:s', time() + 3600); // 1 hour
        
        // Store reset token (in production, use a separate table)
        $this->db->update(
            'UPDATE users SET profile = JSON_SET(COALESCE(profile, "{}"), "$.resetToken", ?, "$.resetExpiry", ?) WHERE id = ?',
            [$resetToken, $expiresAt, $user['id']]
        );
        
        // In production, send email here
        // For now, we'll just log it
        error_log("Password reset token for {$user['email']}: {$resetToken}");
        
        ResponseHelper::sendSuccess(null, 'If the email exists, a reset link has been sent');
    }
    
    // Reset password
    public function resetPassword() {
        $data = ResponseHelper::getJsonInput();
        
        $errors = Validator::validateSchema($data, [
            'token' => ['required' => true],
            'password' => ['required' => true, 'type' => 'password']
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        // Find user with reset token
        $user = $this->db->fetchOne(
            'SELECT id, profile FROM users WHERE JSON_EXTRACT(profile, "$.resetToken") = ? AND isActive = 1',
            [$data['token']]
        );
        
        if (!$user) {
            ResponseHelper::sendError('Invalid or expired reset token', 400);
        }
        
        $profile = json_decode($user['profile'], true);
        
        // Check if token is expired
        if (!isset($profile['resetExpiry']) || strtotime($profile['resetExpiry']) < time()) {
            ResponseHelper::sendError('Reset token has expired', 400);
        }
        
        // Hash new password
        $hashedPassword = Auth::hashPassword($data['password']);
        
        // Update password and clear reset token
        unset($profile['resetToken'], $profile['resetExpiry']);
        
        $this->db->update(
            'UPDATE users SET password = ?, profile = ?, updatedAt = NOW() WHERE id = ?',
            [$hashedPassword, json_encode($profile), $user['id']]
        );
        
        ResponseHelper::sendSuccess(null, 'Password reset successful');
    }
    
    // Verify email
    public function verifyEmail() {
        $data = ResponseHelper::getJsonInput();
        
        if (empty($data['token'])) {
            ResponseHelper::sendError('Verification token required', 400);
        }
        
        // In a real implementation, you would have verification tokens stored
        // For now, we'll simulate a successful verification
        
        ResponseHelper::sendSuccess(null, 'Email verified successfully');
    }
    
    // Send verification code (OTP)
    public function sendVerificationCode() {
        $data = ResponseHelper::getJsonInput();
        
        if (empty($data['type']) || !in_array($data['type'], ['email', 'phone'])) {
            ResponseHelper::sendError('Verification type (email/phone) required', 400);
        }
        
        // Generate OTP
        $otp = sprintf('%06d', mt_rand(100000, 999999));
        
        // In production, send via email/SMS
        error_log("Verification code: {$otp}");
        
        ResponseHelper::sendSuccess([
            'message' => 'Verification code sent',
            'expiresIn' => 300 // 5 minutes
        ]);
    }
    
    // Verify code (OTP)
    public function verifyCode() {
        $data = ResponseHelper::getJsonInput();
        
        $errors = Validator::validateSchema($data, [
            'type' => ['required' => true, 'enum' => ['email', 'phone']],
            'code' => ['required' => true, 'min_length' => 6, 'max_length' => 6]
        ]);
        
        if (!empty($errors)) {
            ResponseHelper::sendValidationError($errors);
        }
        
        // In production, verify against stored OTP
        // For now, simulate successful verification
        
        ResponseHelper::sendSuccess(null, 'Code verified successfully');
    }
}
?>