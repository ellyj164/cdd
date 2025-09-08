import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText,
  Scale,
  ShoppingBag,
  CreditCard,
  Truck,
  RefreshCw,
  Shield,
  AlertTriangle,
  User,
  Globe,
  Mail,
  Calendar,
  Download,
  ExternalLink,
  Check,
  X,
  Info,
  Lock,
  Users,
  Building
} from 'lucide-react';

const TermsOfServicePage = () => {
  const [activeSection, setActiveSection] = useState('overview');
  const [acceptedTerms, setAcceptedTerms] = useState(false);

  const sections = [
    { id: 'overview', title: 'Overview', icon: FileText },
    { id: 'acceptance', title: 'Acceptance of Terms', icon: Check },
    { id: 'account', title: 'User Accounts', icon: User },
    { id: 'products', title: 'Products & Services', icon: ShoppingBag },
    { id: 'orders', title: 'Orders & Payment', icon: CreditCard },
    { id: 'shipping', title: 'Shipping & Delivery', icon: Truck },
    { id: 'returns', title: 'Returns & Refunds', icon: RefreshCw },
    { id: 'conduct', title: 'User Conduct', icon: Shield },
    { id: 'intellectual', title: 'Intellectual Property', icon: Lock },
    { id: 'limitation', title: 'Limitation of Liability', icon: AlertTriangle },
    { id: 'termination', title: 'Termination', icon: X },
    { id: 'governing', title: 'Governing Law', icon: Scale },
    { id: 'contact', title: 'Contact Information', icon: Mail }
  ];

  const lastUpdated = "December 15, 2024";
  const effectiveDate = "January 1, 2025";

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
              <Scale className="h-16 w-16 mx-auto mb-4 text-indigo-200" />
              <h1 className="text-4xl font-bold mb-4">Terms of Service</h1>
              <p className="text-xl text-indigo-100 mb-4">
                Please read these terms carefully before using our services.
              </p>
              <div className="flex items-center justify-center space-x-6 text-indigo-200 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Last updated: {lastUpdated}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4" />
                  <span>Effective: {effectiveDate}</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 sticky top-8">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Table of Contents
              </h3>
              <nav className="space-y-2">
                {sections.map((section, index) => (
                  <motion.button
                    key={section.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.05 }}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200 ${
                      activeSection === section.id
                        ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
                        : 'text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    <section.icon className="h-4 w-4 flex-shrink-0" />
                    <span className="text-sm font-medium">{section.title}</span>
                  </motion.button>
                ))}
              </nav>

              {/* Quick Actions */}
              <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
                  Quick Actions
                </h4>
                <div className="space-y-2">
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Download className="h-4 w-4" />
                    <span>Download PDF</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <Mail className="h-4 w-4" />
                    <span>Email Terms</span>
                  </button>
                  <button className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg">
                    <ExternalLink className="h-4 w-4" />
                    <span>Print Version</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Content Area */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-3"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
              
              {/* Overview Section */}
              {activeSection === 'overview' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <FileText className="h-6 w-6 mr-3 text-indigo-600" />
                    Terms of Service Overview
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      Welcome to Global Nexus! These Terms of Service ("Terms") govern your use of our 
                      e-commerce platform and services. By accessing or using our website, you agree to 
                      be bound by these Terms.
                    </p>

                    <div className="bg-indigo-50 dark:bg-indigo-900/20 border border-indigo-200 dark:border-indigo-800 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-100 mb-3">
                        Key Points
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-800 dark:text-indigo-200">
                            By using our services, you agree to these terms
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-800 dark:text-indigo-200">
                            You must be 18 or older to create an account
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-800 dark:text-indigo-200">
                            We reserve the right to update these terms
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-indigo-600 mt-0.5 flex-shrink-0" />
                          <span className="text-indigo-800 dark:text-indigo-200">
                            Violations may result in account suspension
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Building className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Global Nexus Inc.</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          California Corporation
                        </p>
                      </div>
                      <div className="text-center p-6 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Globe className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Global Service</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Available worldwide
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Acceptance Section */}
              {activeSection === 'acceptance' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Check className="h-6 w-6 mr-3 text-indigo-600" />
                    Acceptance of Terms
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      By accessing, browsing, or using the Global Nexus website or mobile application, 
                      you acknowledge that you have read, understood, and agree to be bound by these Terms.
                    </p>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                            Important Notice
                          </h3>
                          <p className="text-sm text-yellow-700 dark:text-yellow-200">
                            If you do not agree to these Terms, you must not access or use our services. 
                            Continued use of our platform constitutes acceptance of any updates to these Terms.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        How You Accept These Terms
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-indigo-600">1</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Creating an Account
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              When you register for an account, you explicitly agree to these Terms by checking 
                              the acceptance box during registration.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-indigo-600">2</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Making a Purchase
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              When you place an order, you confirm your acceptance of these Terms as part 
                              of the checkout process.
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3">
                          <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                            <span className="text-xs font-bold text-indigo-600">3</span>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 dark:text-white">
                              Continued Use
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                              Your continued use of our website after any changes to these Terms constitutes 
                              your acceptance of the new Terms.
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                        Age Requirement
                      </h3>
                      <p className="text-green-700 dark:text-green-200 text-sm">
                        You must be at least 18 years old to use our services. If you are under 18, 
                        you may only use our services with the involvement and consent of a parent or guardian.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* User Accounts Section */}
              {activeSection === 'account' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <User className="h-6 w-6 mr-3 text-indigo-600" />
                    User Accounts
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      To access certain features of our platform, you may need to create an account. 
                      You are responsible for maintaining the security of your account and all activities 
                      that occur under your account.
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Account Responsibilities
                      </h3>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <Check className="h-5 w-5 mr-2 text-green-600" />
                            You Must
                          </h4>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                            <li>• Provide accurate and complete information</li>
                            <li>• Keep your account information up to date</li>
                            <li>• Use a strong, unique password</li>
                            <li>• Keep your login credentials confidential</li>
                            <li>• Notify us immediately of unauthorized access</li>
                            <li>• Be responsible for all account activity</li>
                          </ul>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                            <X className="h-5 w-5 mr-2 text-red-600" />
                            You Must Not
                          </h4>
                          <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                            <li>• Share your account with others</li>
                            <li>• Create multiple accounts for the same person</li>
                            <li>• Use false or misleading information</li>
                            <li>• Impersonate another person or entity</li>
                            <li>• Create accounts for commercial resale</li>
                            <li>• Use automated tools to create accounts</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Account Security
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-sm mb-3">
                        We recommend the following security practices:
                      </p>
                      <ul className="space-y-1 text-blue-700 dark:text-blue-200 text-sm">
                        <li>• Enable two-factor authentication</li>
                        <li>• Use a password manager</li>
                        <li>• Log out from shared devices</li>
                        <li>• Regularly review account activity</li>
                        <li>• Update your password periodically</li>
                      </ul>
                    </div>

                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                        Account Suspension
                      </h3>
                      <p className="text-red-700 dark:text-red-200 text-sm">
                        We reserve the right to suspend or terminate accounts that violate these Terms, 
                        engage in fraudulent activity, or pose a security risk to our platform or other users.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Products & Services Section */}
              {activeSection === 'products' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <ShoppingBag className="h-6 w-6 mr-3 text-indigo-600" />
                    Products & Services
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      Global Nexus provides an e-commerce platform connecting buyers with sellers. 
                      We facilitate transactions but are not directly responsible for the products sold by third-party vendors.
                    </p>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        Product Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Accuracy of Information
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            We strive to provide accurate product descriptions, images, and pricing. However, 
                            we cannot guarantee that all information is completely accurate, current, or error-free.
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Pricing and Availability
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Prices are subject to change without notice. Product availability is not guaranteed 
                            and may vary by location. We reserve the right to limit quantities.
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Third-Party Sellers
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            Products sold by third-party sellers are subject to the seller's own terms and conditions. 
                            We facilitate these transactions but are not responsible for seller conduct.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-yellow-900 dark:text-yellow-100 mb-3">
                        Prohibited Items
                      </h3>
                      <p className="text-yellow-700 dark:text-yellow-200 text-sm mb-3">
                        The following items are prohibited on our platform:
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-yellow-700 dark:text-yellow-200 text-sm">
                        <div>• Illegal or regulated substances</div>
                        <div>• Counterfeit or pirated goods</div>
                        <div>• Weapons and explosives</div>
                        <div>• Stolen goods</div>
                        <div>• Adult content</div>
                        <div>• Items that infringe intellectual property</div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Orders & Payment Section */}
              {activeSection === 'orders' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <CreditCard className="h-6 w-6 mr-3 text-indigo-600" />
                    Orders & Payment
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      When you place an order through our platform, you enter into a contract with the seller 
                      (or with us for our own products). Payment processing is handled securely through our 
                      certified payment partners.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Order Process
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-indigo-600">1</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">Add to Cart</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Select products and quantities</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-indigo-600">2</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">Checkout</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Provide shipping and payment info</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-indigo-600">3</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">Confirmation</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Receive order confirmation</div>
                            </div>
                          </div>
                          <div className="flex items-start space-x-3">
                            <div className="w-6 h-6 bg-indigo-100 dark:bg-indigo-900 rounded-full flex items-center justify-center flex-shrink-0">
                              <span className="text-xs font-bold text-indigo-600">4</span>
                            </div>
                            <div>
                              <div className="font-medium text-gray-900 dark:text-white text-sm">Fulfillment</div>
                              <div className="text-xs text-gray-600 dark:text-gray-400">Order processing and shipping</div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Payment Terms
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Payment is due at time of order</li>
                          <li>• We accept major credit cards and PayPal</li>
                          <li>• All prices include applicable taxes</li>
                          <li>• Currency is USD unless specified</li>
                          <li>• Payment disputes must be reported within 30 days</li>
                          <li>• Refunds processed per our return policy</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Order Cancellation
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-sm">
                        You may cancel orders before they ship. Once shipped, you may return items according 
                        to our return policy. Sellers may have their own cancellation policies for their products.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Mail className="h-6 w-6 mr-3 text-indigo-600" />
                    Contact Information
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      If you have questions about these Terms of Service, please contact us using the information below.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <Building className="h-5 w-5 mr-2 text-indigo-600" />
                          Company Information
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong className="text-gray-900 dark:text-white">Legal Name:</strong>
                            <div className="text-gray-600 dark:text-gray-400">Global Nexus, Inc.</div>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Business Address:</strong>
                            <address className="text-gray-600 dark:text-gray-400 not-italic">
                              123 Commerce Street<br />
                              San Francisco, CA 94105<br />
                              United States
                            </address>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Registration:</strong>
                            <div className="text-gray-600 dark:text-gray-400">California Corporation #123456789</div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                          <Mail className="h-5 w-5 mr-2 text-indigo-600" />
                          Contact Details
                        </h3>
                        <div className="space-y-2 text-sm">
                          <div>
                            <strong className="text-gray-900 dark:text-white">Legal Department:</strong>
                            <div className="text-gray-600 dark:text-gray-400">legal@globalnexus.com</div>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Customer Service:</strong>
                            <div className="text-gray-600 dark:text-gray-400">support@globalnexus.com</div>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Phone:</strong>
                            <div className="text-gray-600 dark:text-gray-400">+1 (555) 123-4567</div>
                          </div>
                          <div>
                            <strong className="text-gray-900 dark:text-white">Business Hours:</strong>
                            <div className="text-gray-600 dark:text-gray-400">Monday - Friday, 9AM - 6PM PST</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                        Legal Notice Requirements
                      </h3>
                      <p className="text-green-700 dark:text-green-200 text-sm">
                        For formal legal notices, please send correspondence to our legal department at the 
                        address above or email legal@globalnexus.com. All legal notices must be in writing 
                        and will be deemed received when delivered in person, sent by certified mail, or 
                        emailed with confirmation of receipt.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Terms Acceptance Box */}
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="acceptTerms"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                  className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                />
                <label htmlFor="acceptTerms" className="text-sm text-gray-600 dark:text-gray-400">
                  I have read, understood, and agree to be bound by these Terms of Service. 
                  I acknowledge that these terms constitute a legally binding agreement between 
                  me and Global Nexus, Inc.
                </label>
              </div>
              
              {acceptedTerms && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg"
                >
                  <div className="flex items-center space-x-2">
                    <Check className="h-4 w-4 text-green-600" />
                    <span className="text-sm text-green-700 dark:text-green-200">
                      Thank you for accepting our Terms of Service. You can now use all features of our platform.
                    </span>
                  </div>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfServicePage;
