import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Cookie,
  Settings,
  Eye,
  BarChart3,
  Target,
  Shield,
  Globe,
  Trash2,
  Download,
  Calendar,
  Info,
  CheckCircle,
  XCircle,
  ToggleLeft,
  ToggleRight,
  Smartphone,
  Monitor,
  Server,
  Lock,
  AlertTriangle,
  ExternalLink
} from 'lucide-react';

const CookiePolicyPage = () => {
  const [cookieSettings, setCookieSettings] = useState({
    necessary: true, // Cannot be disabled
    functional: true,
    analytics: false,
    marketing: false,
    personalization: true
  });

  const [showBanner, setShowBanner] = useState(true);

  const cookieTypes = [
    {
      id: 'necessary',
      name: 'Strictly Necessary Cookies',
      description: 'These cookies are essential for the website to function properly and cannot be disabled.',
      icon: Shield,
      required: true,
      color: 'red',
      examples: [
        'Authentication tokens',
        'Security cookies',
        'Session management',
        'Site functionality',
        'Shopping cart contents'
      ],
      duration: 'Session or up to 1 year',
      purpose: 'Enable core website functionality and security'
    },
    {
      id: 'functional',
      name: 'Functional Cookies',
      description: 'These cookies enhance functionality and personalization, such as language preferences.',
      icon: Settings,
      required: false,
      color: 'blue',
      examples: [
        'Language preferences',
        'Region settings',
        'Display preferences',
        'Accessibility settings',
        'Theme selection'
      ],
      duration: 'Up to 2 years',
      purpose: 'Remember your preferences and settings'
    },
    {
      id: 'analytics',
      name: 'Analytics Cookies',
      description: 'These cookies help us understand how visitors interact with our website.',
      icon: BarChart3,
      required: false,
      color: 'green',
      examples: [
        'Google Analytics',
        'Page view tracking',
        'User behavior analysis',
        'Performance monitoring',
        'Error tracking'
      ],
      duration: 'Up to 2 years',
      purpose: 'Analyze website usage and improve performance'
    },
    {
      id: 'marketing',
      name: 'Marketing Cookies',
      description: 'These cookies are used to deliver relevant advertisements and track campaign effectiveness.',
      icon: Target,
      required: false,
      color: 'purple',
      examples: [
        'Ad targeting',
        'Conversion tracking',
        'Retargeting pixels',
        'Social media plugins',
        'Campaign measurement'
      ],
      duration: 'Up to 1 year',
      purpose: 'Show relevant ads and measure advertising effectiveness'
    },
    {
      id: 'personalization',
      name: 'Personalization Cookies',
      description: 'These cookies help us provide personalized content and recommendations.',
      icon: Eye,
      required: false,
      color: 'orange',
      examples: [
        'Product recommendations',
        'Personalized content',
        'Recently viewed items',
        'Wish list contents',
        'Browsing history'
      ],
      duration: 'Up to 1 year',
      purpose: 'Personalize your shopping experience'
    }
  ];

  const thirdPartyCookies = [
    {
      name: 'Google Analytics',
      purpose: 'Website analytics and performance monitoring',
      provider: 'Google Inc.',
      privacy: 'https://policies.google.com/privacy',
      cookies: ['_ga', '_gid', '_gat'],
      duration: 'Up to 2 years'
    },
    {
      name: 'Google Ads',
      purpose: 'Advertising and conversion tracking',
      provider: 'Google Inc.',
      privacy: 'https://policies.google.com/privacy',
      cookies: ['_gcl_au', 'IDE', 'DSID'],
      duration: 'Up to 1 year'
    },
    {
      name: 'Facebook Pixel',
      purpose: 'Social media advertising and tracking',
      provider: 'Meta Platforms Inc.',
      privacy: 'https://www.facebook.com/privacy/policy',
      cookies: ['_fbp', '_fbc', 'fr'],
      duration: 'Up to 90 days'
    },
    {
      name: 'Stripe',
      purpose: 'Payment processing and fraud prevention',
      provider: 'Stripe Inc.',
      privacy: 'https://stripe.com/privacy',
      cookies: ['__stripe_mid', '__stripe_sid'],
      duration: '1 year'
    }
  ];

  const handleCookieToggle = (cookieType) => {
    if (cookieType === 'necessary') return; // Cannot disable necessary cookies
    
    setCookieSettings(prev => ({
      ...prev,
      [cookieType]: !prev[cookieType]
    }));
  };

  const acceptAllCookies = () => {
    setCookieSettings({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
      personalization: true
    });
    setShowBanner(false);
  };

  const acceptNecessaryOnly = () => {
    setCookieSettings({
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
      personalization: false
    });
    setShowBanner(false);
  };

  const saveSettings = () => {
    setShowBanner(false);
    // Here you would typically save settings to localStorage or send to server
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Cookie Consent Banner */}
      {showBanner && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t-2 border-blue-500 shadow-lg z-50 p-6"
        >
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between space-y-4 lg:space-y-0">
              <div className="flex items-start space-x-4">
                <Cookie className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    We Value Your Privacy
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 max-w-2xl">
                    We use cookies to enhance your browsing experience, serve personalized content, 
                    and analyze our traffic. You can accept all cookies or customize your preferences.
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center space-x-3">
                <button
                  onClick={() => setShowBanner(false)}
                  className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white underline"
                >
                  Learn More
                </button>
                <button
                  onClick={acceptNecessaryOnly}
                  className="px-4 py-2 text-sm border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300"
                >
                  Necessary Only
                </button>
                <button
                  onClick={acceptAllCookies}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Cookie className="h-16 w-16 mx-auto mb-4 text-blue-200" />
              <h1 className="text-4xl font-bold mb-4">Cookie Policy</h1>
              <p className="text-xl text-blue-100 mb-4">
                Learn about how we use cookies and similar technologies to improve your experience.
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last updated: December 15, 2024</span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Cookie Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center">
              <Settings className="h-6 w-6 mr-3 text-blue-600" />
              Cookie Preferences
            </h2>
            <button
              onClick={saveSettings}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
            >
              Save Settings
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {cookieTypes.map((cookie, index) => (
              <motion.div
                key={cookie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="border border-gray-200 dark:border-gray-700 rounded-xl p-6"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4 flex-1">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                      cookie.color === 'red' ? 'bg-red-100 dark:bg-red-900' :
                      cookie.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                      cookie.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                      cookie.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                      'bg-orange-100 dark:bg-orange-900'
                    }`}>
                      <cookie.icon className={`h-6 w-6 ${
                        cookie.color === 'red' ? 'text-red-600' :
                        cookie.color === 'blue' ? 'text-blue-600' :
                        cookie.color === 'green' ? 'text-green-600' :
                        cookie.color === 'purple' ? 'text-purple-600' :
                        'text-orange-600'
                      }`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {cookie.name}
                        </h3>
                        {cookie.required && (
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs font-medium">
                            Required
                          </span>
                        )}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {cookie.description}
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Purpose</h4>
                          <p className="text-gray-600 dark:text-gray-400">{cookie.purpose}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Duration</h4>
                          <p className="text-gray-600 dark:text-gray-400">{cookie.duration}</p>
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white mb-1">Examples</h4>
                          <ul className="text-gray-600 dark:text-gray-400 space-y-1">
                            {cookie.examples.slice(0, 3).map((example, idx) => (
                              <li key={idx}>• {example}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {cookieSettings[cookie.id] ? 'Enabled' : 'Disabled'}
                    </span>
                    <button
                      onClick={() => handleCookieToggle(cookie.id)}
                      disabled={cookie.required}
                      className={`transition-colors duration-200 ${cookie.required ? 'cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      {cookieSettings[cookie.id] ? (
                        <ToggleRight className={`h-8 w-8 ${
                          cookie.required ? 'text-red-500' : 'text-blue-600'
                        }`} />
                      ) : (
                        <ToggleLeft className="h-8 w-8 text-gray-400" />
                      )}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* What Are Cookies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Info className="h-6 w-6 mr-3 text-blue-600" />
              What Are Cookies?
            </h2>
            
            <div className="space-y-6">
              <p className="text-gray-600 dark:text-gray-400">
                Cookies are small text files that are stored on your device when you visit a website. 
                They help websites remember information about your visit, making your next visit easier 
                and more useful.
              </p>

              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Monitor className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Browser Cookies
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Traditional cookies stored in your web browser
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Smartphone className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Mobile Identifiers
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Device identifiers used in mobile applications
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-3">
                  <Server className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      Local Storage
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Data stored directly in your browser's local storage
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">
                  Why We Use Cookies
                </h3>
                <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
                  <li>• Remember your login status</li>
                  <li>• Keep items in your shopping cart</li>
                  <li>• Understand how you use our website</li>
                  <li>• Personalize your experience</li>
                  <li>• Improve website performance</li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Third-Party Cookies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Globe className="h-6 w-6 mr-3 text-blue-600" />
              Third-Party Services
            </h2>
            
            <div className="space-y-4">
              {thirdPartyCookies.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {service.name}
                    </h3>
                    <a
                      href={service.privacy}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                    {service.purpose}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Provider:</span>
                      <div className="text-gray-600 dark:text-gray-400">{service.provider}</div>
                    </div>
                    <div>
                      <span className="font-medium text-gray-900 dark:text-white">Duration:</span>
                      <div className="text-gray-600 dark:text-gray-400">{service.duration}</div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className="font-medium text-gray-900 dark:text-white text-xs">Cookies:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {service.cookies.map((cookie, idx) => (
                        <span
                          key={idx}
                          className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {cookie}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Managing Cookies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Trash2 className="h-6 w-6 mr-3 text-blue-600" />
            Managing Your Cookies
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Browser Settings
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                You can control cookies through your browser settings. Here's how to manage cookies 
                in popular browsers:
              </p>
              
              <div className="space-y-3">
                {[
                  { name: 'Chrome', steps: 'Settings → Privacy and security → Cookies and other site data' },
                  { name: 'Firefox', steps: 'Preferences → Privacy & Security → Cookies and Site Data' },
                  { name: 'Safari', steps: 'Preferences → Privacy → Cookies and website data' },
                  { name: 'Edge', steps: 'Settings → Site permissions → Cookies and site data' }
                ].map((browser, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {browser.name}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                      {browser.steps}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Opt-Out Tools
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                You can also use these industry tools to opt out of certain types of tracking:
              </p>
              
              <div className="space-y-3">
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        NAI Opt-Out
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Network Advertising Initiative opt-out tool
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </a>

                <a
                  href="https://optout.aboutads.info/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block border border-gray-200 dark:border-gray-700 rounded-lg p-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        DAA Opt-Out
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        Digital Advertising Alliance opt-out tool
                      </p>
                    </div>
                    <ExternalLink className="h-4 w-4 text-gray-400" />
                  </div>
                </a>

                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-3">
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    Do Not Track
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                    Enable "Do Not Track" in your browser settings
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                  Important Note
                </h3>
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  Disabling certain cookies may limit the functionality of our website. Some features 
                  may not work properly if you block or delete cookies. You can always re-enable 
                  cookies later if needed.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Questions About Cookies?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                If you have questions about our use of cookies or this policy, please contact us:
              </p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">Email:</span>
                  <span className="text-gray-600 dark:text-gray-400">privacy@globalnexus.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-gray-900 dark:text-white">Phone:</span>
                  <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</span>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors duration-200">
                Contact Support
              </button>
              <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-3 px-6 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Policy</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CookiePolicyPage;
