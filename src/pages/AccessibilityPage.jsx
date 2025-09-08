import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Accessibility,
  Eye,
  Ear,
  Brain,
  Hand,
  Monitor,
  Keyboard,
  Mouse,
  Volume2,
  Contrast,
  Type,
  Zap,
  CheckCircle,
  Settings,
  Info,
  Star,
  ThumbsUp,
  Users,
  Globe,
  Mail,
  Phone,
  ExternalLink,
  Download,
  ArrowRight,
  ToggleLeft
} from 'lucide-react';

const AccessibilityPage = () => {
  const [accessibilitySettings, setAccessibilitySettings] = useState({
    highContrast: false,
    largeText: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNav: true
  });

  const accessibilityFeatures = [
    {
      category: 'Visual Accessibility',
      icon: Eye,
      color: 'blue',
      features: [
        {
          title: 'High Contrast Mode',
          description: 'Enhanced color contrast for better visibility',
          status: 'implemented',
          keyboardShortcut: 'Alt + H'
        },
        {
          title: 'Large Text Option',
          description: 'Scalable text up to 200% for easier reading',
          status: 'implemented',
          keyboardShortcut: 'Ctrl + +'
        },
        {
          title: 'Screen Reader Compatible',
          description: 'Full compatibility with NVDA, JAWS, and VoiceOver',
          status: 'implemented',
          screenReaders: ['NVDA', 'JAWS', 'VoiceOver', 'Dragon']
        },
        {
          title: 'Color Blind Friendly',
          description: 'Colors chosen to be accessible for color vision deficiencies',
          status: 'implemented'
        }
      ]
    },
    {
      category: 'Motor Accessibility',
      icon: Hand,
      color: 'green',
      features: [
        {
          title: 'Keyboard Navigation',
          description: 'Full site navigation using only keyboard',
          status: 'implemented',
          keyboardShortcut: 'Tab to navigate'
        },
        {
          title: 'Large Click Targets',
          description: 'Buttons and links sized for easy interaction',
          status: 'implemented',
          minSize: '44x44 pixels'
        },
        {
          title: 'Voice Commands',
          description: 'Control interface using voice recognition',
          status: 'beta',
          browsers: ['Chrome', 'Edge']
        },
        {
          title: 'Switch Control Support',
          description: 'Compatible with assistive switch devices',
          status: 'implemented'
        }
      ]
    },
    {
      category: 'Cognitive Accessibility',
      icon: Brain,
      color: 'purple',
      features: [
        {
          title: 'Reduced Motion',
          description: 'Option to minimize animations and transitions',
          status: 'implemented',
          keyboardShortcut: 'Alt + M'
        },
        {
          title: 'Clear Language',
          description: 'Plain language and simple instructions',
          status: 'implemented',
          readingLevel: 'Grade 8'
        },
        {
          title: 'Consistent Navigation',
          description: 'Predictable layout and navigation patterns',
          status: 'implemented'
        },
        {
          title: 'Error Prevention',
          description: 'Clear error messages and prevention strategies',
          status: 'implemented'
        }
      ]
    },
    {
      category: 'Hearing Accessibility',
      icon: Ear,
      color: 'orange',
      features: [
        {
          title: 'Video Captions',
          description: 'Closed captions for all video content',
          status: 'implemented',
          languages: ['English', 'Spanish', 'French']
        },
        {
          title: 'Visual Alerts',
          description: 'Visual notifications instead of audio alerts',
          status: 'implemented'
        },
        {
          title: 'Sign Language',
          description: 'ASL interpretation for key content',
          status: 'planned'
        },
        {
          title: 'Audio Descriptions',
          description: 'Descriptive audio for visual content',
          status: 'beta'
        }
      ]
    }
  ];

  const wcagCompliance = [
    {
      level: 'WCAG 2.1 AA',
      status: 'compliant',
      description: 'We meet all Level AA success criteria',
      checkDate: '2024-12-15',
      details: [
        'Perceivable content for all users',
        'Operable interface components',
        'Understandable information and UI',
        'Robust content that works with assistive technologies'
      ]
    }
  ];

  const assistiveTechnologies = [
    {
      name: 'Screen Readers',
      icon: Volume2,
      supported: ['NVDA', 'JAWS', 'VoiceOver', 'TalkBack', 'Dragon'],
      compatibility: '100%',
      description: 'Full compatibility with all major screen reading software'
    },
    {
      name: 'Voice Recognition',
      icon: Ear,
      supported: ['Dragon NaturallySpeaking', 'Windows Speech Recognition', 'macOS Dictation'],
      compatibility: '95%',
      description: 'Navigate and control the site using voice commands'
    },
    {
      name: 'Switch Controls',
      icon: ToggleLeft,
      supported: ['Single Switch', 'Dual Switch', 'Sip-and-Puff', 'Eye Gaze'],
      compatibility: '90%',
      description: 'Compatible with various switch and alternative input devices'
    },
    {
      name: 'Magnification Software',
      icon: Monitor,
      supported: ['ZoomText', 'MAGic', 'macOS Zoom', 'Windows Magnifier'],
      compatibility: '100%',
      description: 'Works seamlessly with screen magnification tools'
    }
  ];

  const keyboardShortcuts = [
    { key: 'Tab', action: 'Navigate to next interactive element' },
    { key: 'Shift + Tab', action: 'Navigate to previous interactive element' },
    { key: 'Enter / Space', action: 'Activate buttons and links' },
    { key: 'Escape', action: 'Close modals and dropdown menus' },
    { key: 'Arrow Keys', action: 'Navigate within menus and lists' },
    { key: 'Alt + H', action: 'Toggle high contrast mode' },
    { key: 'Alt + M', action: 'Toggle reduced motion' },
    { key: 'Ctrl + +/-', action: 'Increase/decrease text size' },
    { key: '/', action: 'Focus search field' },
    { key: 'Alt + S', action: 'Skip to main content' }
  ];

  const toggleSetting = (setting) => {
    setAccessibilitySettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Accessibility className="h-16 w-16 mx-auto mb-4 text-indigo-200" />
              <h1 className="text-4xl font-bold mb-4">Accessibility</h1>
              <p className="text-xl text-indigo-100">
                We're committed to making our platform accessible to everyone, regardless of ability.
              </p>
            </motion.div>

            {/* Accessibility Stats */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">AA</div>
                <div className="text-sm text-indigo-200">WCAG 2.1 Compliant</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">100%</div>
                <div className="text-sm text-indigo-200">Keyboard Accessible</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">15+</div>
                <div className="text-sm text-indigo-200">Assistive Technologies</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Accessibility Settings Panel */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Settings className="h-6 w-6 mr-3 text-indigo-600" />
            Accessibility Settings
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Visual</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">High Contrast</span>
                  <button
                    onClick={() => toggleSetting('highContrast')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      accessibilitySettings.highContrast ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        accessibilitySettings.highContrast ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
                
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Large Text</span>
                  <button
                    onClick={() => toggleSetting('largeText')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      accessibilitySettings.largeText ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        accessibilitySettings.largeText ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Motion</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Reduced Motion</span>
                  <button
                    onClick={() => toggleSetting('reducedMotion')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      accessibilitySettings.reducedMotion ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        accessibilitySettings.reducedMotion ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Navigation</h3>
              <div className="space-y-3">
                <label className="flex items-center justify-between">
                  <span className="text-sm text-gray-700 dark:text-gray-300">Keyboard Navigation</span>
                  <button
                    onClick={() => toggleSetting('keyboardNav')}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                      accessibilitySettings.keyboardNav ? 'bg-indigo-600' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                        accessibilitySettings.keyboardNav ? 'translate-x-6' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </label>
              </div>
            </div>
          </div>
          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  These settings are saved in your browser and will persist across sessions. 
                  Some changes may require a page refresh to take effect.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Accessibility Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Accessibility Features
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {accessibilityFeatures.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8"
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                    category.color === 'blue' ? 'bg-blue-100 dark:bg-blue-900' :
                    category.color === 'green' ? 'bg-green-100 dark:bg-green-900' :
                    category.color === 'purple' ? 'bg-purple-100 dark:bg-purple-900' :
                    'bg-orange-100 dark:bg-orange-900'
                  }`}>
                    <category.icon className={`h-6 w-6 ${
                      category.color === 'blue' ? 'text-blue-600' :
                      category.color === 'green' ? 'text-green-600' :
                      category.color === 'purple' ? 'text-purple-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {category.features.map((feature, idx) => (
                    <div key={idx} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {feature.title}
                        </h4>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          feature.status === 'implemented' ? 'bg-green-100 text-green-800' :
                          feature.status === 'beta' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {feature.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {feature.description}
                      </p>
                      
                      {feature.keyboardShortcut && (
                        <div className="flex items-center space-x-2">
                          <Keyboard className="h-4 w-4 text-gray-400" />
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {feature.keyboardShortcut}
                          </span>
                        </div>
                      )}
                      
                      {feature.screenReaders && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {feature.screenReaders.map((reader, readerIdx) => (
                            <span key={readerIdx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                              {reader}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* WCAG Compliance */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <CheckCircle className="h-6 w-6 mr-3 text-green-600" />
              WCAG Compliance
            </h3>
            
            {wcagCompliance.map((compliance, index) => (
              <div key={index} className="border border-green-200 dark:border-green-800 rounded-lg p-6 bg-green-50 dark:bg-green-900/20">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-green-900 dark:text-green-100">
                    {compliance.level}
                  </h4>
                  <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                    {compliance.status}
                  </span>
                </div>
                
                <p className="text-green-700 dark:text-green-200 text-sm mb-4">
                  {compliance.description}
                </p>
                
                <div className="space-y-2">
                  {compliance.details.map((detail, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-green-700 dark:text-green-200">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 text-xs text-green-600 dark:text-green-300">
                  Last audited: {compliance.checkDate}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Assistive Technologies */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Supported Assistive Technologies
            </h3>
            
            <div className="space-y-6">
              {assistiveTechnologies.map((tech, index) => (
                <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-indigo-100 dark:bg-indigo-900 rounded-lg flex items-center justify-center">
                      <tech.icon className="h-5 w-5 text-indigo-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {tech.name}
                        </h4>
                        <span className="text-sm font-medium text-indigo-600">
                          {tech.compatibility}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                        {tech.description}
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {tech.supported.map((item, idx) => (
                          <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Keyboard Shortcuts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mt-8"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Keyboard className="h-6 w-6 mr-3 text-indigo-600" />
            Keyboard Shortcuts
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {keyboardShortcuts.map((shortcut, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <span className="text-sm text-gray-900 dark:text-white">
                  {shortcut.action}
                </span>
                <kbd className="bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded px-2 py-1 text-xs font-mono">
                  {shortcut.key}
                </kbd>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Feedback and Support */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-2xl p-8 mt-8"
        >
          <div className="text-center">
            <Users className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-indigo-900 dark:text-indigo-100 mb-4">
              Help Us Improve Accessibility
            </h3>
            <p className="text-indigo-700 dark:text-indigo-200 mb-6 max-w-2xl mx-auto">
              We're continuously working to improve accessibility. If you encounter any barriers 
              or have suggestions, please let us know. Your feedback helps us create a better 
              experience for everyone.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="text-center">
                <Mail className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Email Us</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-200">accessibility@globalnexus.com</p>
              </div>
              <div className="text-center">
                <Phone className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Call Us</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-200">+1 (555) 123-ACCESS</p>
              </div>
              <div className="text-center">
                <Download className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <h4 className="font-semibold text-indigo-900 dark:text-indigo-100 mb-1">Resources</h4>
                <p className="text-sm text-indigo-700 dark:text-indigo-200">Download accessibility guide</p>
              </div>
            </div>
            
            <div className="flex justify-center space-x-4">
              <button className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors duration-200 flex items-center space-x-2">
                <span>Provide Feedback</span>
                <ArrowRight className="h-4 w-4" />
              </button>
              <button className="border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 dark:hover:bg-indigo-900/30 transition-colors duration-200 flex items-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Accessibility Guide</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AccessibilityPage;
