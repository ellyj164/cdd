import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Shield,
  Lock,
  ArrowLeft,
  Home,
  User,
  AlertTriangle,
  Key,
  Settings,
  HelpCircle,
  Mail,
  Phone,
  ExternalLink,
  LogIn,
  UserPlus,
  Crown,
  Building
} from 'lucide-react';

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const accessLevels = [
    {
      level: 'Guest',
      icon: User,
      description: 'Browse products and view basic information',
      features: ['Product browsing', 'Public pages', 'Contact support'],
      current: true
    },
    {
      level: 'Registered User',
      icon: UserPlus,
      description: 'Create account to access member features',
      features: ['Order history', 'Wishlist', 'Faster checkout', 'Member discounts'],
      action: { text: 'Register Now', link: '/register' }
    },
    {
      level: 'Vendor',
      icon: Building,
      description: 'Sell products on our platform',
      features: ['Product management', 'Sales analytics', 'Vendor dashboard', 'Revenue tracking'],
      action: { text: 'Apply as Vendor', link: '/vendor/apply' }
    },
    {
      level: 'Administrator',
      icon: Crown,
      description: 'Full system access and management',
      features: ['User management', 'System settings', 'Analytics', 'Content management'],
      restricted: true
    }
  ];

  const commonReasons = [
    {
      icon: Lock,
      title: 'Account Required',
      description: 'This feature requires you to be logged in',
      solution: 'Create an account or sign in to continue',
      action: { text: 'Sign In', link: '/login' }
    },
    {
      icon: Crown,
      title: 'Insufficient Permissions',
      description: 'Your account level doesn\'t have access to this resource',
      solution: 'Contact support if you believe this is an error',
      action: { text: 'Contact Support', link: '/contact' }
    },
    {
      icon: Key,
      title: 'Subscription Required',
      description: 'This feature is available to premium members only',
      solution: 'Upgrade your account to access premium features',
      action: { text: 'View Plans', link: '/pricing' }
    },
    {
      icon: Settings,
      title: 'Admin Access Only',
      description: 'This area is restricted to administrators',
      solution: 'Administrator access cannot be granted to regular users',
      restricted: true
    }
  ];

  const supportOptions = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help via email',
      contact: 'support@globalnexus.com',
      response: 'Response within 24 hours'
    },
    {
      icon: Phone,
      title: 'Phone Support',
      description: 'Speak with our team',
      contact: '+1 (555) 123-4567',
      response: 'Mon-Fri, 8AM-8PM EST'
    },
    {
      icon: HelpCircle,
      title: 'Help Center',
      description: 'Browse our knowledge base',
      contact: 'View Articles',
      response: 'Instant access to guides'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full">
        
        {/* Main Error Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900 rounded-full flex items-center justify-center mx-auto mb-6">
              <Shield className="h-10 w-10 text-red-600" />
            </div>
            
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Access Denied
            </h1>
            
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-6">
              You don't have permission to access this resource
            </p>
            
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6 mb-6">
              <div className="flex items-start space-x-3">
                <AlertTriangle className="h-6 w-6 text-red-600 mt-1 flex-shrink-0" />
                <div className="text-left">
                  <h3 className="font-semibold text-red-900 dark:text-red-100 mb-2">
                    HTTP 403 - Forbidden
                  </h3>
                  <p className="text-red-700 dark:text-red-200 text-sm">
                    The server understood your request but refuses to authorize it. 
                    This could be due to insufficient permissions, account restrictions, 
                    or attempting to access protected content.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={handleGoBack}
                className="bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <ArrowLeft className="h-4 w-4" />
                <span>Go Back</span>
              </button>
              
              <Link
                to="/"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2"
              >
                <Home className="h-4 w-4" />
                <span>Go Home</span>
              </Link>
              
              <Link
                to="/login"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors duration-200 flex items-center space-x-2"
              >
                <LogIn className="h-4 w-4" />
                <span>Sign In</span>
              </Link>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Common Reasons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Common Reasons
              </h2>
              
              <div className="space-y-6">
                {commonReasons.map((reason, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <reason.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {reason.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                          {reason.description}
                        </p>
                        <p className="text-gray-500 dark:text-gray-500 text-xs mb-3">
                          {reason.solution}
                        </p>
                        
                        {reason.action && !reason.restricted && (
                          <Link
                            to={reason.action.link}
                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <span>{reason.action.text}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                        
                        {reason.restricted && (
                          <span className="inline-flex items-center text-red-600 text-sm font-medium">
                            <Lock className="h-3 w-3 mr-1" />
                            Restricted Access
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Access Levels */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Access Levels
              </h2>
              
              <div className="space-y-6">
                {accessLevels.map((level, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className={`border rounded-lg p-4 ${
                      level.current 
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                        : level.restricted
                        ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                        level.current 
                          ? 'bg-green-100 dark:bg-green-900' 
                          : level.restricted
                          ? 'bg-red-100 dark:bg-red-900'
                          : 'bg-blue-100 dark:bg-blue-900'
                      }`}>
                        <level.icon className={`h-5 w-5 ${
                          level.current 
                            ? 'text-green-600' 
                            : level.restricted
                            ? 'text-red-600'
                            : 'text-blue-600'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h3 className="font-semibold text-gray-900 dark:text-white">
                            {level.level}
                          </h3>
                          {level.current && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Current
                            </span>
                          )}
                          {level.restricted && (
                            <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                              Restricted
                            </span>
                          )}
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                          {level.description}
                        </p>
                        
                        <ul className="space-y-1 mb-3">
                          {level.features.map((feature, idx) => (
                            <li key={idx} className="flex items-center space-x-2 text-xs text-gray-500 dark:text-gray-500">
                              <div className="w-1 h-1 bg-gray-400 rounded-full"></div>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                        
                        {level.action && (
                          <Link
                            to={level.action.link}
                            className="inline-flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            <span>{level.action.text}</span>
                            <ExternalLink className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Support Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Need Help?
          </h2>
          
          <p className="text-gray-600 dark:text-gray-400 text-center mb-8">
            If you believe you should have access to this resource, please contact our support team.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {supportOptions.map((option, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-center p-6 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-300 dark:hover:border-blue-600 transition-colors duration-200 cursor-pointer"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <option.icon className="h-6 w-6 text-blue-600" />
                </div>
                
                <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {option.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {option.description}
                </p>
                
                <div className="space-y-1">
                  <div className="font-medium text-blue-600 text-sm">
                    {option.contact}
                  </div>
                  <div className="text-gray-500 dark:text-gray-500 text-xs">
                    {option.response}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default UnauthorizedPage;
