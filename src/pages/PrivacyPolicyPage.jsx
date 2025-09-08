import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Shield,
  Eye,
  Lock,
  Users,
  Globe,
  Mail,
  Phone,
  FileText,
  Download,
  Calendar,
  AlertCircle,
  Check,
  ExternalLink,
  Database,
  Settings,
  UserCheck,
  Trash2,
  Edit,
  Share2
} from 'lucide-react';

const PrivacyPolicyPage = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', title: 'Overview', icon: Eye },
    { id: 'collection', title: 'Information We Collect', icon: Database },
    { id: 'usage', title: 'How We Use Information', icon: Settings },
    { id: 'sharing', title: 'Information Sharing', icon: Share2 },
    { id: 'security', title: 'Data Security', icon: Lock },
    { id: 'rights', title: 'Your Rights', icon: UserCheck },
    { id: 'cookies', title: 'Cookies & Tracking', icon: Globe },
    { id: 'children', title: 'Children\'s Privacy', icon: Users },
    { id: 'changes', title: 'Policy Changes', icon: Edit },
    { id: 'contact', title: 'Contact Us', icon: Mail }
  ];

  const lastUpdated = "December 15, 2024";

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Shield className="h-16 w-16 mx-auto mb-4 text-blue-200" />
              <h1 className="text-4xl font-bold mb-4">Privacy Policy</h1>
              <p className="text-xl text-blue-100 mb-4">
                Your privacy is important to us. Learn how we collect, use, and protect your information.
              </p>
              <div className="flex items-center justify-center space-x-2 text-blue-200">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Last updated: {lastUpdated}</span>
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
                        ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
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
                    <span>Email Policy</span>
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
                    <Eye className="h-6 w-6 mr-3 text-blue-600" />
                    Privacy Policy Overview
                  </h2>
                  
                  <div className="prose prose-lg dark:prose-invert max-w-none">
                    <p className="text-gray-600 dark:text-gray-400 mb-6">
                      At Global Nexus, we respect your privacy and are committed to protecting your personal data. 
                      This privacy policy explains how we collect, use, and safeguard your information when you 
                      use our e-commerce platform.
                    </p>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6 mb-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Key Privacy Commitments
                      </h3>
                      <ul className="space-y-2">
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 dark:text-blue-200">
                            We never sell your personal information to third parties
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 dark:text-blue-200">
                            You have full control over your data and privacy settings
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 dark:text-blue-200">
                            We use industry-standard security measures to protect your data
                          </span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <Check className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                          <span className="text-blue-800 dark:text-blue-200">
                            We comply with GDPR, CCPA, and other privacy regulations
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Shield className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Secure</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Your data is encrypted and protected
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <UserCheck className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Transparent</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Clear policies and practices
                        </p>
                      </div>
                      <div className="text-center p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Settings className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                        <h4 className="font-semibold text-gray-900 dark:text-white">Controlled</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          You control your data preferences
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Information Collection Section */}
              {activeSection === 'collection' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Database className="h-6 w-6 mr-3 text-blue-600" />
                    Information We Collect
                  </h2>
                  
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Information You Provide Directly
                      </h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Account Information:</strong> Name, email address, phone number, password</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Profile Information:</strong> Date of birth, preferences, profile picture</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Billing Information:</strong> Billing address, payment method details</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Communication Data:</strong> Customer service interactions, reviews, feedback</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        Information Collected Automatically
                      </h3>
                      <ul className="space-y-2 text-gray-600 dark:text-gray-400">
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Device Information:</strong> IP address, browser type, operating system</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Usage Data:</strong> Pages visited, time spent, click patterns</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Location Data:</strong> Approximate location based on IP address</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span><strong>Cookies & Tracking:</strong> Website functionality and analytics cookies</span>
                        </li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                            Sensitive Information
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-200">
                            We do not collect sensitive personal information such as social security numbers, 
                            health records, or financial account numbers beyond what's necessary for payment processing.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Usage Section */}
              {activeSection === 'usage' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Settings className="h-6 w-6 mr-3 text-blue-600" />
                    How We Use Your Information
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Essential Services
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Process and fulfill orders</li>
                          <li>• Manage your account</li>
                          <li>• Handle payments and billing</li>
                          <li>• Provide customer support</li>
                          <li>• Send transactional emails</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Service Improvement
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Personalize your experience</li>
                          <li>• Recommend products</li>
                          <li>• Analyze website performance</li>
                          <li>• Prevent fraud and abuse</li>
                          <li>• Improve security</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Marketing (Optional)
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Send promotional emails</li>
                          <li>• Show relevant advertisements</li>
                          <li>• Notify about sales and offers</li>
                          <li>• Share product updates</li>
                          <li>• Conduct surveys</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                          Legal Compliance
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Comply with legal obligations</li>
                          <li>• Respond to legal requests</li>
                          <li>• Protect rights and property</li>
                          <li>• Enforce terms of service</li>
                          <li>• Resolve disputes</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-green-900 dark:text-green-100 mb-1">
                            Your Control
                          </h4>
                          <p className="text-sm text-green-700 dark:text-green-200">
                            You can opt out of marketing communications at any time and control how we use 
                            your data through your account settings.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Sharing Section */}
              {activeSection === 'sharing' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Share2 className="h-6 w-6 mr-3 text-blue-600" />
                    Information Sharing
                  </h2>
                  
                  <div className="space-y-6">
                    <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-red-900 dark:text-red-100 mb-3">
                        What We DON'T Do
                      </h3>
                      <ul className="space-y-2 text-red-700 dark:text-red-200">
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>We never sell your personal information</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>We don't rent your data to third parties</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <div className="w-2 h-2 bg-red-600 rounded-full mt-2 flex-shrink-0"></div>
                          <span>We don't share data for marketing purposes without consent</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                        When We May Share Information
                      </h3>
                      
                      <div className="space-y-4">
                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Service Providers
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                            We share data with trusted partners who help us operate our business:
                          </p>
                          <ul className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <li>• Payment processors (Stripe, PayPal)</li>
                            <li>• Shipping companies (FedEx, UPS, USPS)</li>
                            <li>• Cloud hosting providers (AWS, Google Cloud)</li>
                            <li>• Analytics services (Google Analytics)</li>
                          </ul>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Legal Requirements
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            We may disclose information when required by law, court order, or to protect 
                            our rights, users, or the public from harm.
                          </p>
                        </div>

                        <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Business Transfers
                          </h4>
                          <p className="text-gray-600 dark:text-gray-400 text-sm">
                            In the event of a merger, acquisition, or sale of assets, your information 
                            may be transferred to the new entity.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Security Section */}
              {activeSection === 'security' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Lock className="h-6 w-6 mr-3 text-blue-600" />
                    Data Security
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      We implement comprehensive security measures to protect your personal information 
                      from unauthorized access, alteration, disclosure, or destruction.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <Shield className="h-5 w-5 mr-2 text-blue-600" />
                          Technical Safeguards
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• SSL/TLS encryption for data transmission</li>
                          <li>• AES-256 encryption for data at rest</li>
                          <li>• Regular security audits and testing</li>
                          <li>• Secure server infrastructure</li>
                          <li>• Automated backup systems</li>
                        </ul>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 flex items-center">
                          <UserCheck className="h-5 w-5 mr-2 text-blue-600" />
                          Access Controls
                        </h3>
                        <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm">
                          <li>• Multi-factor authentication</li>
                          <li>• Role-based access permissions</li>
                          <li>• Regular access reviews</li>
                          <li>• Employee security training</li>
                          <li>• Strict data handling policies</li>
                        </ul>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Incident Response
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-sm mb-3">
                        In the unlikely event of a data breach, we have procedures in place to:
                      </p>
                      <ul className="space-y-1 text-blue-700 dark:text-blue-200 text-sm">
                        <li>• Immediately contain and assess the incident</li>
                        <li>• Notify affected users within 72 hours</li>
                        <li>• Report to relevant authorities as required</li>
                        <li>• Provide support and remediation steps</li>
                        <li>• Conduct thorough post-incident analysis</li>
                      </ul>
                    </div>

                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex items-start space-x-3">
                        <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-1">
                            Your Role in Security
                          </h4>
                          <p className="text-sm text-yellow-700 dark:text-yellow-200">
                            Help keep your account secure by using strong passwords, enabling two-factor 
                            authentication, and never sharing your login credentials.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Rights Section */}
              {activeSection === 'rights' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <UserCheck className="h-6 w-6 mr-3 text-blue-600" />
                    Your Privacy Rights
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      You have several rights regarding your personal information. We respect these rights 
                      and provide easy ways to exercise them.
                    </p>

                    <div className="grid grid-cols-1 gap-4">
                      {[
                        {
                          title: 'Access Your Data',
                          description: 'Request a copy of all personal information we have about you',
                          icon: Eye,
                          action: 'Request Data Export'
                        },
                        {
                          title: 'Correct Your Data',
                          description: 'Update or correct any inaccurate personal information',
                          icon: Edit,
                          action: 'Update Information'
                        },
                        {
                          title: 'Delete Your Data',
                          description: 'Request deletion of your personal information (right to be forgotten)',
                          icon: Trash2,
                          action: 'Request Deletion'
                        },
                        {
                          title: 'Restrict Processing',
                          description: 'Limit how we use your personal information',
                          icon: Settings,
                          action: 'Manage Preferences'
                        },
                        {
                          title: 'Data Portability',
                          description: 'Receive your data in a structured, machine-readable format',
                          icon: Download,
                          action: 'Export Data'
                        },
                        {
                          title: 'Withdraw Consent',
                          description: 'Opt out of marketing communications and optional data processing',
                          icon: UserCheck,
                          action: 'Manage Consent'
                        }
                      ].map((right, index) => (
                        <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start space-x-4">
                              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                                <right.icon className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                                  {right.title}
                                </h3>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  {right.description}
                                </p>
                              </div>
                            </div>
                            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm whitespace-nowrap">
                              {right.action}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-green-900 dark:text-green-100 mb-3">
                        How to Exercise Your Rights
                      </h3>
                      <p className="text-green-700 dark:text-green-200 text-sm mb-3">
                        To exercise any of these rights, you can:
                      </p>
                      <ul className="space-y-1 text-green-700 dark:text-green-200 text-sm">
                        <li>• Visit your account settings page</li>
                        <li>• Contact our privacy team at privacy@globalnexus.com</li>
                        <li>• Call our customer service at +1 (555) 123-4567</li>
                        <li>• Use the contact form on this page</li>
                      </ul>
                      <p className="text-green-700 dark:text-green-200 text-sm mt-3">
                        We will respond to your request within 30 days and may request verification of your identity.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Contact Section */}
              {activeSection === 'contact' && (
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                    <Mail className="h-6 w-6 mr-3 text-blue-600" />
                    Contact Our Privacy Team
                  </h2>
                  
                  <div className="space-y-6">
                    <p className="text-gray-600 dark:text-gray-400">
                      If you have questions about this privacy policy or our privacy practices, 
                      please don't hesitate to contact us.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Mail className="h-5 w-5 mr-2 text-blue-600" />
                            Email Us
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong className="text-gray-900 dark:text-white">Privacy Officer:</strong>
                              <div className="text-gray-600 dark:text-gray-400">privacy@globalnexus.com</div>
                            </div>
                            <div>
                              <strong className="text-gray-900 dark:text-white">General Inquiries:</strong>
                              <div className="text-gray-600 dark:text-gray-400">support@globalnexus.com</div>
                            </div>
                          </div>
                        </div>

                        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                          <h3 className="font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                            <Phone className="h-5 w-5 mr-2 text-blue-600" />
                            Call Us
                          </h3>
                          <div className="space-y-2 text-sm">
                            <div>
                              <strong className="text-gray-900 dark:text-white">Privacy Hotline:</strong>
                              <div className="text-gray-600 dark:text-gray-400">+1 (555) 123-PRIV</div>
                            </div>
                            <div className="text-gray-600 dark:text-gray-400">
                              Monday - Friday, 9AM - 6PM EST
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
                        <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
                          Mailing Address
                        </h3>
                        <address className="text-sm text-gray-600 dark:text-gray-400 not-italic">
                          Global Nexus Privacy Team<br />
                          123 Privacy Street<br />
                          San Francisco, CA 94105<br />
                          United States
                        </address>
                        
                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-600">
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                            Response Times
                          </h4>
                          <div className="text-sm text-gray-600 dark:text-gray-400 space-y-1">
                            <div>• Email: Within 24 hours</div>
                            <div>• Phone: Immediate assistance</div>
                            <div>• Mail: Within 10 business days</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                      <h3 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-3">
                        Data Protection Authorities
                      </h3>
                      <p className="text-blue-700 dark:text-blue-200 text-sm">
                        If you're not satisfied with our response to your privacy concerns, you have the right 
                        to lodge a complaint with your local data protection authority. For EU residents, you can 
                        find your local authority at <a href="#" className="underline">edpb.europa.eu</a>.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
