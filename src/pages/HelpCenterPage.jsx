import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search,
  MessageCircle,
  Phone,
  Mail,
  Clock,
  ChevronRight,
  HelpCircle,
  Book,
  Shield,
  CreditCard,
  Truck,
  RefreshCw,
  User,
  Star,
  ThumbsUp,
  ThumbsDown,
  ExternalLink,
  Download,
  PlayCircle,
  FileText,
  Headphones,
  Video
} from 'lucide-react';

const HelpCenterPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  // FAQ Categories
  const faqCategories = [
    { id: 'all', name: 'All Topics', icon: Book },
    { id: 'account', name: 'Account & Profile', icon: User },
    { id: 'orders', name: 'Orders & Shipping', icon: Truck },
    { id: 'payments', name: 'Payments & Billing', icon: CreditCard },
    { id: 'returns', name: 'Returns & Refunds', icon: RefreshCw },
    { id: 'security', name: 'Security & Privacy', icon: Shield }
  ];

  // FAQ Data
  const faqs = [
    {
      id: 1,
      category: 'account',
      question: 'How do I create an account?',
      answer: 'Creating an account is easy! Click the "Register" button in the top right corner of our website. Fill in your email, create a secure password, and verify your email address. You\'ll then be able to track orders, save favorites, and enjoy faster checkout.',
      helpful: 124,
      notHelpful: 8
    },
    {
      id: 2,
      category: 'account',
      question: 'How can I reset my password?',
      answer: 'If you\'ve forgotten your password, click "Forgot Password?" on the login page. Enter your email address and we\'ll send you a secure link to reset your password. The link expires after 24 hours for security purposes.',
      helpful: 89,
      notHelpful: 3
    },
    {
      id: 3,
      category: 'orders',
      question: 'How long does shipping take?',
      answer: 'Shipping times depend on your location and selected method:\n• Standard shipping: 3-7 business days\n• Express shipping: 1-3 business days\n• Overnight shipping: Next business day\n\nOrders placed before 2 PM EST ship the same day.',
      helpful: 156,
      notHelpful: 12
    },
    {
      id: 4,
      category: 'orders',
      question: 'Can I track my order?',
      answer: 'Yes! Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order by logging into your account and visiting the "Orders" section, or use our Track Order page.',
      helpful: 203,
      notHelpful: 5
    },
    {
      id: 5,
      category: 'payments',
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, Google Pay, and Shop Pay. All transactions are secured with SSL encryption and we never store your payment information.',
      helpful: 178,
      notHelpful: 7
    },
    {
      id: 6,
      category: 'payments',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption and are PCI DSS compliant. Your payment information is processed securely by our certified payment partners and is never stored on our servers.',
      helpful: 142,
      notHelpful: 2
    },
    {
      id: 7,
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 30-day return policy for most items. Items must be unused, in original packaging, and in resalable condition. Electronics have a 15-day return window. Custom or personalized items cannot be returned unless defective.',
      helpful: 234,
      notHelpful: 18
    },
    {
      id: 8,
      category: 'returns',
      question: 'How do I return an item?',
      answer: 'To return an item:\n1. Log into your account and go to "Orders"\n2. Find your order and click "Return Items"\n3. Select items to return and reason\n4. Print the prepaid return label\n5. Package items securely and drop off\n\nRefunds are processed within 3-5 business days after we receive your return.',
      helpful: 167,
      notHelpful: 9
    },
    {
      id: 9,
      category: 'security',
      question: 'How do you protect my personal information?',
      answer: 'We take privacy seriously. Your personal information is encrypted, stored securely, and never shared with third parties without your consent. We comply with GDPR, CCPA, and other privacy regulations. Read our Privacy Policy for full details.',
      helpful: 98,
      notHelpful: 4
    },
    {
      id: 10,
      category: 'security',
      question: 'How can I make my account more secure?',
      answer: 'Enhance your account security by:\n• Using a strong, unique password\n• Enabling two-factor authentication\n• Keeping your email address updated\n• Logging out of shared devices\n• Monitoring your account for suspicious activity',
      helpful: 76,
      notHelpful: 3
    }
  ];

  // Popular Articles
  const popularArticles = [
    {
      id: 1,
      title: 'Complete Guide to Order Tracking',
      description: 'Learn how to track your orders and understand delivery statuses',
      views: 12450,
      category: 'Orders',
      readTime: '5 min',
      icon: Truck
    },
    {
      id: 2,
      title: 'Payment Security & Methods',
      description: 'Everything you need to know about secure payments',
      views: 9870,
      category: 'Payments',
      readTime: '3 min',
      icon: Shield
    },
    {
      id: 3,
      title: 'Return & Refund Process',
      description: 'Step-by-step guide to returns and refunds',
      views: 8320,
      category: 'Returns',
      readTime: '4 min',
      icon: RefreshCw
    },
    {
      id: 4,
      title: 'Account Settings & Management',
      description: 'Manage your profile, preferences, and security settings',
      views: 7890,
      category: 'Account',
      readTime: '6 min',
      icon: User
    }
  ];

  // Contact Options
  const contactOptions = [
    {
      id: 1,
      type: 'Live Chat',
      description: 'Chat with our support team',
      availability: 'Available 24/7',
      responseTime: 'Typically responds in 2-3 minutes',
      icon: MessageCircle,
      color: 'bg-green-500',
      action: 'Start Chat'
    },
    {
      id: 2,
      type: 'Phone Support',
      description: 'Call our customer service',
      availability: 'Mon-Fri 8AM-8PM EST',
      responseTime: '+1 (555) 123-4567',
      icon: Phone,
      color: 'bg-blue-500',
      action: 'Call Now'
    },
    {
      id: 3,
      type: 'Email Support',
      description: 'Send us a detailed message',
      availability: 'We respond to all emails',
      responseTime: 'Typically responds within 12 hours',
      icon: Mail,
      color: 'bg-purple-500',
      action: 'Send Email'
    },
    {
      id: 4,
      type: 'Video Support',
      description: 'Schedule a video call',
      availability: 'By appointment only',
      responseTime: 'Available for complex issues',
      icon: Video,
      color: 'bg-orange-500',
      action: 'Schedule Call'
    }
  ];

  // Resources
  const resources = [
    {
      id: 1,
      title: 'User Manual',
      description: 'Complete guide to using our platform',
      type: 'PDF',
      size: '2.4 MB',
      icon: FileText,
      downloads: 5420
    },
    {
      id: 2,
      title: 'Video Tutorials',
      description: 'Step-by-step video guides',
      type: 'Video Series',
      duration: '45 min',
      icon: PlayCircle,
      views: 8930
    },
    {
      id: 3,
      title: 'API Documentation',
      description: 'For developers and integrations',
      type: 'Online',
      updated: 'Last updated 2 days ago',
      icon: ExternalLink,
      visits: 1240
    }
  ];

  // Filter FAQs
  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Headphones className="h-16 w-16 mx-auto mb-4 text-primary-100" />
              <h1 className="text-4xl font-bold mb-4">Help Center</h1>
              <p className="text-xl text-primary-100">
                Find answers to your questions or get in touch with our support team
              </p>
            </motion.div>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-2xl mx-auto"
            >
              <input
                type="text"
                placeholder="Search for help articles, FAQs, or topics..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 text-lg"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-6 w-6 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Quick Contact Options */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Get Help Instantly
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactOptions.map((option, index) => (
              <motion.div
                key={option.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 text-center hover:-translate-y-1"
              >
                <div className={`w-12 h-12 ${option.color} rounded-xl mx-auto mb-4 flex items-center justify-center`}>
                  <option.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                  {option.type}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-3">
                  {option.description}
                </p>
                <div className="text-xs text-gray-500 dark:text-gray-400 mb-3">
                  <p>{option.availability}</p>
                  <p>{option.responseTime}</p>
                </div>
                <button className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-lg hover:bg-primary-600 hover:text-white transition-colors duration-200">
                  {option.action}
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Popular Articles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Popular Help Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {popularArticles.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1 cursor-pointer"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                    <article.icon className="h-5 w-5 text-primary-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {article.description}
                    </p>
                    <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                      <div className="flex items-center space-x-4">
                        <span className="bg-primary-100 dark:bg-primary-900 text-primary-600 px-2 py-1 rounded-full">
                          {article.category}
                        </span>
                        <span>{article.readTime} read</span>
                      </div>
                      <span>{article.views.toLocaleString()} views</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* FAQ Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Frequently Asked Questions
              </h2>

              {/* FAQ Categories */}
              <div className="flex flex-wrap gap-2 mb-6">
                {faqCategories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center space-x-2 ${
                      selectedCategory === category.id
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    <category.icon className="h-4 w-4" />
                    <span>{category.name}</span>
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                  >
                    <button
                      onClick={() => setExpandedFAQ(expandedFAQ === faq.id ? null : faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white pr-4">
                          {faq.question}
                        </h3>
                        <ChevronRight 
                          className={`h-5 w-5 text-gray-400 transform transition-transform duration-200 ${
                            expandedFAQ === faq.id ? 'rotate-90' : ''
                          }`} 
                        />
                      </div>
                    </button>
                    
                    {expandedFAQ === faq.id && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="px-6 pb-6"
                      >
                        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                          <p className="text-gray-600 dark:text-gray-400 leading-relaxed whitespace-pre-line">
                            {faq.answer}
                          </p>
                          
                          <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-700">
                            <span className="text-sm text-gray-500 dark:text-gray-400">
                              Was this helpful?
                            </span>
                            <div className="flex items-center space-x-4">
                              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-green-600">
                                <ThumbsUp className="h-4 w-4" />
                                <span>Yes ({faq.helpful})</span>
                              </button>
                              <button className="flex items-center space-x-1 text-sm text-gray-500 hover:text-red-600">
                                <ThumbsDown className="h-4 w-4" />
                                <span>No ({faq.notHelpful})</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>

              {filteredFAQs.length === 0 && (
                <div className="text-center py-12">
                  <HelpCircle className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    No FAQs found
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    Try adjusting your search terms or browse different categories
                  </p>
                  <button 
                    onClick={() => {
                      setSearchTerm('');
                      setSelectedCategory('all');
                    }}
                    className="bg-primary-600 text-white px-6 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </motion.div>
          </div>

          {/* Resources Sidebar */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Additional Resources
              </h3>
              
              <div className="space-y-4">
                {resources.map((resource, index) => (
                  <motion.div
                    key={resource.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 1 + index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer hover:-translate-y-1"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <resource.icon className="h-5 w-5 text-primary-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                          {resource.title}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                          {resource.description}
                        </p>
                        <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span className="bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full">
                            {resource.type}
                          </span>
                          <span>
                            {resource.size || resource.duration || resource.updated}
                          </span>
                        </div>
                        {(resource.downloads || resource.views || resource.visits) && (
                          <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                            {resource.downloads && `${resource.downloads} downloads`}
                            {resource.views && `${resource.views} views`}
                            {resource.visits && `${resource.visits} visits`}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Emergency Contact */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.3 }}
                className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-6 mt-8"
              >
                <div className="flex items-center space-x-3 mb-3">
                  <Phone className="h-5 w-5 text-red-600" />
                  <h4 className="font-semibold text-red-900 dark:text-red-100">
                    Need Urgent Help?
                  </h4>
                </div>
                <p className="text-sm text-red-700 dark:text-red-200 mb-4">
                  For urgent issues that need immediate attention, call our priority support line.
                </p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-red-600" />
                    <span className="text-red-700 dark:text-red-200">Available 24/7</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-red-600" />
                    <span className="text-red-700 dark:text-red-200 font-medium">
                      +1 (555) 911-HELP
                    </span>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HelpCenterPage;
