import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';

// Base Input Component with validation
export const ValidatedInput = ({ 
  label,
  type = 'text',
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  error = '',
  success = '',
  helperText = '',
  autoComplete = '',
  validator,
  showPasswordToggle = false,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isTouched, setIsTouched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'text' : type;
  const hasError = error || validationError;
  const hasSuccess = success && !hasError;

  // Run validation
  useEffect(() => {
    if (validator && value && isTouched) {
      const result = validator(value);
      setValidationError(result || '');
    }
  }, [value, validator, isTouched]);

  const handleBlur = (e) => {
    setIsTouched(true);
    if (onBlur) onBlur(e);
  };

  const baseClasses = `
    w-full px-3 py-2 border rounded-md transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:bg-gray-700 dark:text-white dark:border-gray-600
  `;

  const statusClasses = hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
    : hasSuccess
    ? 'border-green-300 focus:border-green-500 focus:ring-green-500 dark:border-green-600'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          type={inputType}
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          autoComplete={autoComplete}
          className={`${baseClasses} ${statusClasses} ${
            isPassword && showPasswordToggle ? 'pr-10' : ''
          }`}
          {...props}
        />

        {/* Password Toggle */}
        {isPassword && showPasswordToggle && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4 text-gray-400" />
            ) : (
              <Eye className="h-4 w-4 text-gray-400" />
            )}
          </button>
        )}

        {/* Status Icon */}
        {(hasError || hasSuccess) && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            {hasError ? (
              <AlertCircle className="h-4 w-4 text-red-500" />
            ) : (
              <CheckCircle className="h-4 w-4 text-green-500" />
            )}
          </div>
        )}
      </div>

      {/* Help Text, Error, or Success Message */}
      {(hasError || hasSuccess || helperText) && (
        <div className="text-sm">
          {hasError ? (
            <span className="text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error || validationError}
            </span>
          ) : hasSuccess ? (
            <span className="text-green-600 dark:text-green-400 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              {success}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Textarea Component with validation
export const ValidatedTextarea = ({ 
  label,
  value,
  onChange,
  onBlur,
  placeholder = '',
  required = false,
  disabled = false,
  className = '',
  error = '',
  success = '',
  helperText = '',
  rows = 3,
  maxLength,
  validator,
  ...props
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const [validationError, setValidationError] = useState('');

  const hasError = error || validationError;
  const hasSuccess = success && !hasError;

  // Run validation
  useEffect(() => {
    if (validator && value && isTouched) {
      const result = validator(value);
      setValidationError(result || '');
    }
  }, [value, validator, isTouched]);

  const handleBlur = (e) => {
    setIsTouched(true);
    if (onBlur) onBlur(e);
  };

  const baseClasses = `
    w-full px-3 py-2 border rounded-md transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:bg-gray-700 dark:text-white dark:border-gray-600
    resize-none
  `;

  const statusClasses = hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
    : hasSuccess
    ? 'border-green-300 focus:border-green-500 focus:ring-green-500 dark:border-green-600'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          value={value}
          onChange={onChange}
          onBlur={handleBlur}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          rows={rows}
          maxLength={maxLength}
          className={`${baseClasses} ${statusClasses}`}
          {...props}
        />

        {/* Character Count */}
        {maxLength && (
          <div className="absolute bottom-2 right-2 text-xs text-gray-400">
            {value.length}/{maxLength}
          </div>
        )}
      </div>

      {/* Help Text, Error, or Success Message */}
      {(hasError || hasSuccess || helperText) && (
        <div className="text-sm">
          {hasError ? (
            <span className="text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error || validationError}
            </span>
          ) : hasSuccess ? (
            <span className="text-green-600 dark:text-green-400 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              {success}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Select Component with validation
export const ValidatedSelect = ({ 
  label,
  value,
  onChange,
  options = [],
  placeholder = 'Select an option',
  required = false,
  disabled = false,
  className = '',
  error = '',
  success = '',
  helperText = '',
  ...props
}) => {
  const hasError = !!error;
  const hasSuccess = success && !hasError;

  const baseClasses = `
    w-full px-3 py-2 border rounded-md transition-colors duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed
    dark:bg-gray-700 dark:text-white dark:border-gray-600
  `;

  const statusClasses = hasError
    ? 'border-red-300 focus:border-red-500 focus:ring-red-500 dark:border-red-600'
    : hasSuccess
    ? 'border-green-300 focus:border-green-500 focus:ring-green-500 dark:border-green-600'
    : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500 dark:border-gray-600';

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <select
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
        className={`${baseClasses} ${statusClasses}`}
        {...props}
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {/* Help Text, Error, or Success Message */}
      {(hasError || hasSuccess || helperText) && (
        <div className="text-sm">
          {hasError ? (
            <span className="text-red-600 dark:text-red-400 flex items-center">
              <AlertCircle className="h-3 w-3 mr-1" />
              {error}
            </span>
          ) : hasSuccess ? (
            <span className="text-green-600 dark:text-green-400 flex items-center">
              <CheckCircle className="h-3 w-3 mr-1" />
              {success}
            </span>
          ) : (
            <span className="text-gray-500 dark:text-gray-400">{helperText}</span>
          )}
        </div>
      )}
    </div>
  );
};

// Validation Helper Functions
export const validators = {
  required: (value) => !value ? 'This field is required' : '',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return !emailRegex.test(value) ? 'Please enter a valid email address' : '';
  },
  minLength: (min) => (value) => 
    value.length < min ? `Must be at least ${min} characters` : '',
  maxLength: (max) => (value) => 
    value.length > max ? `Must be no more than ${max} characters` : '',
  password: (value) => {
    if (value.length < 8) return 'Password must be at least 8 characters';
    if (!/(?=.*[a-z])/.test(value)) return 'Password must contain a lowercase letter';
    if (!/(?=.*[A-Z])/.test(value)) return 'Password must contain an uppercase letter';
    if (!/(?=.*\d)/.test(value)) return 'Password must contain a number';
    return '';
  },
  confirmPassword: (originalPassword) => (value) =>
    value !== originalPassword ? 'Passwords do not match' : '',
  phone: (value) => {
    const phoneRegex = /^\+?[\d\s\-\(\)]+$/;
    return !phoneRegex.test(value) ? 'Please enter a valid phone number' : '';
  }
};

export default {
  ValidatedInput,
  ValidatedTextarea,
  ValidatedSelect,
  validators
};