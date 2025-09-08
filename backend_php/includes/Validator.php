<?php
/**
 * Validator Class
 * Input validation and sanitization
 */

class Validator {
    
    // Validate email
    public static function email($email) {
        return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
    }
    
    // Validate phone number (basic international format)
    public static function phone($phone) {
        // Remove all non-digit characters
        $cleaned = preg_replace('/[^0-9]/', '', $phone);
        
        // Check if it's between 7 and 15 digits (international standard)
        return strlen($cleaned) >= 7 && strlen($cleaned) <= 15;
    }
    
    // Validate password strength
    public static function password($password) {
        // Minimum 8 characters, at least one letter and one number
        return strlen($password) >= 8 && 
               preg_match('/[A-Za-z]/', $password) && 
               preg_match('/[0-9]/', $password);
    }
    
    // Validate UUID
    public static function uuid($uuid) {
        return preg_match('/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i', $uuid);
    }
    
    // Validate required fields
    public static function required($data, $fields) {
        $missing = [];
        
        foreach ($fields as $field) {
            if (!isset($data[$field]) || trim($data[$field]) === '') {
                $missing[] = $field;
            }
        }
        
        return empty($missing) ? true : $missing;
    }
    
    // Sanitize string
    public static function sanitizeString($string) {
        return trim(htmlspecialchars($string, ENT_QUOTES, 'UTF-8'));
    }
    
    // Sanitize email
    public static function sanitizeEmail($email) {
        return filter_var(trim($email), FILTER_SANITIZE_EMAIL);
    }
    
    // Sanitize integer
    public static function sanitizeInt($value, $min = null, $max = null) {
        $int = filter_var($value, FILTER_SANITIZE_NUMBER_INT);
        $int = (int)$int;
        
        if ($min !== null && $int < $min) {
            $int = $min;
        }
        
        if ($max !== null && $int > $max) {
            $int = $max;
        }
        
        return $int;
    }
    
    // Sanitize float
    public static function sanitizeFloat($value, $min = null, $max = null) {
        $float = filter_var($value, FILTER_SANITIZE_NUMBER_FLOAT, FILTER_FLAG_ALLOW_FRACTION);
        $float = (float)$float;
        
        if ($min !== null && $float < $min) {
            $float = $min;
        }
        
        if ($max !== null && $float > $max) {
            $float = $max;
        }
        
        return $float;
    }
    
    // Validate and sanitize pagination parameters
    public static function pagination($params) {
        $page = isset($params['page']) ? self::sanitizeInt($params['page'], 1) : 1;
        $limit = isset($params['limit']) ? self::sanitizeInt($params['limit'], 1, MAX_PAGE_SIZE) : DEFAULT_PAGE_SIZE;
        $offset = ($page - 1) * $limit;
        
        return [
            'page' => $page,
            'limit' => $limit,
            'offset' => $offset
        ];
    }
    
    // Validate file upload
    public static function file($file) {
        $errors = [];
        
        // Check if file was uploaded
        if (!isset($file['tmp_name']) || !is_uploaded_file($file['tmp_name'])) {
            $errors[] = 'No file uploaded';
            return $errors;
        }
        
        // Check file size
        if ($file['size'] > UPLOAD_MAX_SIZE) {
            $errors[] = 'File size exceeds maximum allowed size (' . ResponseHelper::formatFileSize(UPLOAD_MAX_SIZE) . ')';
        }
        
        // Check file extension
        $extension = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
        if (!in_array($extension, ALLOWED_EXTENSIONS)) {
            $errors[] = 'File type not allowed. Allowed types: ' . implode(', ', ALLOWED_EXTENSIONS);
        }
        
        // Check for upload errors
        if ($file['error'] !== UPLOAD_ERR_OK) {
            $errors[] = 'File upload error: ' . self::getUploadErrorMessage($file['error']);
        }
        
        return $errors;
    }
    
    // Get upload error message
    private static function getUploadErrorMessage($error) {
        switch ($error) {
            case UPLOAD_ERR_INI_SIZE:
                return 'File exceeds upload_max_filesize directive';
            case UPLOAD_ERR_FORM_SIZE:
                return 'File exceeds MAX_FILE_SIZE directive';
            case UPLOAD_ERR_PARTIAL:
                return 'File was only partially uploaded';
            case UPLOAD_ERR_NO_FILE:
                return 'No file was uploaded';
            case UPLOAD_ERR_NO_TMP_DIR:
                return 'Missing temporary folder';
            case UPLOAD_ERR_CANT_WRITE:
                return 'Failed to write file to disk';
            case UPLOAD_ERR_EXTENSION:
                return 'File upload stopped by extension';
            default:
                return 'Unknown upload error';
        }
    }
    
    // Validate JSON data against schema
    public static function validateSchema($data, $schema) {
        $errors = [];
        
        foreach ($schema as $field => $rules) {
            $value = $data[$field] ?? null;
            
            // Check required
            if (isset($rules['required']) && $rules['required'] && ($value === null || $value === '')) {
                $errors[$field] = 'Field is required';
                continue;
            }
            
            // Skip validation if field is empty and not required
            if ($value === null || $value === '') {
                continue;
            }
            
            // Type validation
            if (isset($rules['type'])) {
                switch ($rules['type']) {
                    case 'email':
                        if (!self::email($value)) {
                            $errors[$field] = 'Invalid email format';
                        }
                        break;
                    case 'phone':
                        if (!self::phone($value)) {
                            $errors[$field] = 'Invalid phone number format';
                        }
                        break;
                    case 'password':
                        if (!self::password($value)) {
                            $errors[$field] = 'Password must be at least 8 characters with letters and numbers';
                        }
                        break;
                    case 'uuid':
                        if (!self::uuid($value)) {
                            $errors[$field] = 'Invalid UUID format';
                        }
                        break;
                    case 'integer':
                        if (!is_numeric($value) || (int)$value != $value) {
                            $errors[$field] = 'Must be an integer';
                        }
                        break;
                    case 'float':
                        if (!is_numeric($value)) {
                            $errors[$field] = 'Must be a number';
                        }
                        break;
                }
            }
            
            // Length validation
            if (isset($rules['min_length']) && strlen($value) < $rules['min_length']) {
                $errors[$field] = "Must be at least {$rules['min_length']} characters";
            }
            
            if (isset($rules['max_length']) && strlen($value) > $rules['max_length']) {
                $errors[$field] = "Must be no more than {$rules['max_length']} characters";
            }
            
            // Value validation
            if (isset($rules['min']) && $value < $rules['min']) {
                $errors[$field] = "Must be at least {$rules['min']}";
            }
            
            if (isset($rules['max']) && $value > $rules['max']) {
                $errors[$field] = "Must be no more than {$rules['max']}";
            }
            
            // Enum validation
            if (isset($rules['enum']) && !in_array($value, $rules['enum'])) {
                $errors[$field] = "Must be one of: " . implode(', ', $rules['enum']);
            }
        }
        
        return $errors;
    }
}
?>