import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Mail,
  CheckCircle,
  XCircle,
  Clock,
  RefreshCw,
  ArrowRight,
  Shield,
  Sparkles,
  AlertTriangle,
  Home,
  User,
  Phone,
  ExternalLink
} from 'lucide-react';

const VerifyEmailPage = () => {
  const [searchParams] = useSearchParams();
  const [verificationStatus, setVerificationStatus] = useState('pending'); // pending, success, error, expired
  const [email, setEmail] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const [isResending, setIsResending] = useState(false);

  // Get token and email from URL parameters
  const token = searchParams.get('token');
  const emailParam = searchParams.get('email');

  useEffect(() => {
    if (emailParam) {
      setEmail(emailParam);
    }

    // Auto-verify if token is present
    if (token) {
      verifyEmail(token);
    }
  }, [token, emailParam]);

  // Countdown for resend button
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => {
        setResendCooldown(resendCooldown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const verifyEmail = async (verificationToken) => {
    try {
      // Simulate API call
      setVerificationStatus('pending');
      
      // Mock verification delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Mock response based on token
      if (verificationToken === 'expired') {
        setVerificationStatus('expired');
      } else if (verificationToken === 'invalid') {
        setVerificationStatus('error');
      } else {
        setVerificationStatus('success');
      }
    } catch (error) {
      setVerificationStatus('error');
    }
  };

  const handleResendEmail = async () => {
    setIsResending(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Set cooldown
      setResendCooldown(60);
      
      // Show success message (you could show a toast here)
      console.log('Verification email resent');
    } catch (error) {
      console.error('Failed to resend email');
    } finally {
      setIsResending(false);
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        
        {/* Pending Verification */}
        {verificationStatus === 'pending' && !token && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mail className="h-8 w-8 text-blue-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Check Your Email
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We've sent a verification link to{' '}
                <span className="font-medium text-blue-600">{email || 'your email address'}</span>
              </p>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Clock className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-blue-900 dark:text-blue-100 text-sm mb-1">
                      What's next?
                    </h3>
                    <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                      <li>• Check your inbox (and spam folder)</li>
                      <li>• Click the verification link</li>
                      <li>• You'll be redirected to confirm your account</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email"
                  />
                </div>
                
                <button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0 || isResending}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : resendCooldown > 0 ? (
                    <span>Resend in {resendCooldown}s</span>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Resend Email</span>
                    </>
                  )}
                </button>
                
                <Link
                  to="/login"
                  className="block text-center text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                >
                  Back to Login
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Processing Verification */}
        {verificationStatus === 'pending' && token && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="h-8 w-8 text-blue-600 animate-spin" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verifying Your Email
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400">
                Please wait while we verify your email address...
              </p>
            </div>
          </motion.div>
        )}

        {/* Verification Success */}
        {verificationStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              
              <div className="mb-6">
                <Sparkles className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  Email Verified!
                </h2>
                
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Your email has been successfully verified. Your account is now active and ready to use.
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
                <h3 className="font-semibold text-green-900 dark:text-green-100 text-sm mb-2">
                  Account Benefits Unlocked:
                </h3>
                <ul className="text-sm text-green-700 dark:text-green-200 space-y-1 text-left">
                  <li>• Access to your personal dashboard</li>
                  <li>• Order tracking and history</li>
                  <li>• Wishlist and saved items</li>
                  <li>• Exclusive member discounts</li>
                  <li>• Faster checkout process</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <Link
                  to="/dashboard"
                  className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <User className="h-4 w-4" />
                  <span>Go to Dashboard</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                
                <Link
                  to="/"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Home className="h-4 w-4" />
                  <span>Continue Shopping</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Verification Error */}
        {verificationStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="h-8 w-8 text-red-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Verification Failed
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                We couldn't verify your email address. The verification link may be invalid or corrupted.
              </p>
              
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-red-900 dark:text-red-100 text-sm mb-1">
                      Common Issues:
                    </h3>
                    <ul className="text-sm text-red-700 dark:text-red-200 space-y-1">
                      <li>• Link was copied incorrectly</li>
                      <li>• Link was already used</li>
                      <li>• Link has expired</li>
                    </ul>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0 || isResending}
                  className="w-full bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <RefreshCw className="h-4 w-4" />
                      <span>Request New Link</span>
                    </>
                  )}
                </button>
                
                <Link
                  to="/contact"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <Phone className="h-4 w-4" />
                  <span>Contact Support</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Expired Link */}
        {verificationStatus === 'expired' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="w-16 h-16 bg-yellow-100 dark:bg-yellow-900 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-yellow-600" />
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Link Expired
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                This verification link has expired. For security reasons, verification links are only valid for 24 hours.
              </p>
              
              <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
                <div className="flex items-start space-x-3">
                  <Shield className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 text-sm mb-1">
                      Security Notice
                    </h3>
                    <p className="text-sm text-yellow-700 dark:text-yellow-200">
                      We expire verification links to protect your account security. 
                      Request a new verification email to continue.
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <button
                  onClick={handleResendEmail}
                  disabled={resendCooldown > 0 || isResending}
                  className="w-full bg-yellow-600 text-white py-3 px-4 rounded-lg hover:bg-yellow-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  {isResending ? (
                    <>
                      <RefreshCw className="h-4 w-4 animate-spin" />
                      <span>Sending...</span>
                    </>
                  ) : (
                    <>
                      <Mail className="h-4 w-4" />
                      <span>Send New Verification Email</span>
                    </>
                  )}
                </button>
                
                <Link
                  to="/login"
                  className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2"
                >
                  <ArrowRight className="h-4 w-4" />
                  <span>Back to Login</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}

        {/* Help Links */}
        <div className="text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Need help?
          </p>
          <div className="flex justify-center space-x-4 text-sm">
            <Link
              to="/contact"
              className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Contact Support</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
            <Link
              to="/help"
              className="text-blue-600 hover:text-blue-700 flex items-center space-x-1"
            >
              <span>Help Center</span>
              <ExternalLink className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmailPage;
