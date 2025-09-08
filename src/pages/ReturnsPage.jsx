import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  RotateCcw,
  Package,
  Clock,
  Shield,
  CreditCard,
  CheckCircle,
  XCircle,
  AlertTriangle,
  FileText,
  Truck,
  Mail,
  Phone,
  Calculator,
  Calendar,
  DollarSign,
  Info,
  ExternalLink,
  Download,
  Search,
  ArrowRight,
  RefreshCw,
  Star,
  ThumbsUp
} from 'lucide-react';

const ReturnsPage = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [email, setEmail] = useState('');
  const [returnReason, setReturnReason] = useState('');

  const returnPolicies = [
    {
      category: 'Electronics',
      icon: Package,
      timeframe: '15 days',
      condition: 'Unopened original packaging',
      restockingFee: '15%',
      details: [
        'Must be in original packaging with all accessories',
        'No signs of wear or damage',
        'All protective films and seals intact',
        'Original receipt or order confirmation required'
      ]
    },
    {
      category: 'Clothing & Accessories',
      icon: Star,
      timeframe: '30 days',
      condition: 'Unworn with tags',
      restockingFee: 'None',
      details: [
        'Items must be unworn and unwashed',
        'Original tags must be attached',
        'No perfume, deodorant, or makeup stains',
        'Returned in original packaging when applicable'
      ]
    },
    {
      category: 'Home & Garden',
      icon: Package,
      timeframe: '30 days',
      condition: 'Unused condition',
      restockingFee: '10%',
      details: [
        'Items must be unused and in original condition',
        'All parts and hardware included',
        'Original packaging preferred but not required',
        'Assembly instructions and manuals included'
      ]
    },
    {
      category: 'Books & Media',
      icon: FileText,
      timeframe: '30 days',
      condition: 'Like new condition',
      restockingFee: 'None',
      details: [
        'No writing, highlighting, or markings',
        'Spine must be intact with no creases',
        'Dust jackets included for hardcover books',
        'Digital content codes must be unused'
      ]
    }
  ];

  const returnReasons = [
    { id: 'defective', label: 'Defective or damaged item', description: 'Item arrived broken or not working' },
    { id: 'wrong_item', label: 'Wrong item received', description: 'Different item than what was ordered' },
    { id: 'not_as_described', label: 'Not as described', description: 'Item doesn\'t match product description' },
    { id: 'size_fit', label: 'Size or fit issues', description: 'Item doesn\'t fit as expected' },
    { id: 'quality', label: 'Quality concerns', description: 'Item quality below expectations' },
    { id: 'no_longer_needed', label: 'No longer needed', description: 'Changed mind about purchase' },
    { id: 'late_delivery', label: 'Delivered too late', description: 'Item arrived after needed date' },
    { id: 'other', label: 'Other reason', description: 'Specify reason in comments' }
  ];

  const returnProcess = [
    {
      step: 1,
      title: 'Initiate Return',
      description: 'Start your return request online or contact customer service',
      icon: FileText,
      details: [
        'Log into your account and find your order',
        'Select items you want to return',
        'Choose reason for return',
        'Provide additional details if needed'
      ]
    },
    {
      step: 2,
      title: 'Get Return Label',
      description: 'Download and print your prepaid return shipping label',
      icon: Download,
      details: [
        'Return authorization number generated',
        'Prepaid shipping label emailed to you',
        'Package items securely in original or similar box',
        'Attach return label to outside of package'
      ]
    },
    {
      step: 3,
      title: 'Ship Your Return',
      description: 'Drop off your package at any authorized shipping location',
      icon: Truck,
      details: [
        'Drop off at UPS, FedEx, or USPS location',
        'No additional shipping charges',
        'Get receipt with tracking number',
        'Tracking updates sent via email'
      ]
    },
    {
      step: 4,
      title: 'Processing & Refund',
      description: 'We process your return and issue refund within 5-10 business days',
      icon: CreditCard,
      details: [
        'Items inspected upon arrival',
        'Refund processed to original payment method',
        'Email confirmation sent when complete',
        'Store credit available for faster processing'
      ]
    }
  ];

  const nonReturnableItems = [
    'Personalized or custom-made items',
    'Perishable goods and food items',
    'Intimate apparel and swimwear',
    'Digital downloads and software',
    'Gift cards and promotional items',
    'Items damaged by misuse',
    'Health and personal care items',
    'Hazardous materials'
  ];

  const refundMethods = [
    {
      method: 'Original Payment Method',
      timeframe: '5-10 business days',
      description: 'Refund to the credit card or payment method used for purchase',
      preferred: true
    },
    {
      method: 'Store Credit',
      timeframe: 'Instant',
      description: 'Receive store credit that never expires',
      preferred: false
    },
    {
      method: 'Exchange',
      timeframe: '3-5 business days',
      description: 'Exchange for different size, color, or similar item',
      preferred: false
    }
  ];

  const handleReturnSubmit = (e) => {
    e.preventDefault();
    // Handle return request submission
    console.log('Return request submitted', { orderNumber, email, returnReason });
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-teal-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <RotateCcw className="h-16 w-16 mx-auto mb-4 text-teal-200" />
              <h1 className="text-4xl font-bold mb-4">Returns & Exchanges</h1>
              <p className="text-xl text-teal-100">
                Easy returns and exchanges. Your satisfaction is our priority.
              </p>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">30</div>
                <div className="text-sm text-teal-200">Day Return Window</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Free</div>
                <div className="text-sm text-teal-200">Return Shipping</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24h</div>
                <div className="text-sm text-teal-200">Processing Time</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Return Request Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <RefreshCw className="h-6 w-6 mr-3 text-green-600" />
            Start a Return
          </h2>
          
          <form onSubmit={handleReturnSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Order Number
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                    placeholder="Enter your order number"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Reason for Return
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                required
              >
                <option value="">Select a reason</option>
                {returnReasons.map((reason) => (
                  <option key={reason.id} value={reason.id}>
                    {reason.label}
                  </option>
                ))}
              </select>
              {returnReason && (
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                  {returnReasons.find(r => r.id === returnReason)?.description}
                </p>
              )}
            </div>
            
            <button
              type="submit"
              className="w-full bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold flex items-center justify-center space-x-2"
            >
              <span>Start Return Process</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </form>
          
          <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-blue-700 dark:text-blue-200">
                  Don't have your order number? Check your email confirmation or 
                  <a href="#" className="underline ml-1">contact customer service</a> for assistance.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Return Process */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Return Process
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {returnProcess.map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 relative"
              >
                <div className="absolute -top-3 left-6 w-6 h-6 bg-green-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {step.step}
                </div>
                
                <div className="mt-4">
                  <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-xl flex items-center justify-center mb-4">
                    <step.icon className="h-6 w-6 text-green-600" />
                  </div>
                  
                  <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-1">
                    {step.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <div className="w-1.5 h-1.5 bg-green-600 rounded-full mt-2 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">
                          {detail}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Return Policies by Category */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Return Policies by Category
            </h2>
            
            <div className="space-y-6">
              {returnPolicies.map((policy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                      <policy.icon className="h-5 w-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                        {policy.category}
                      </h3>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {policy.timeframe}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Return window</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Shield className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {policy.condition}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Required condition</p>
                        </div>
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <DollarSign className="h-4 w-4 text-gray-500" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">
                              {policy.restockingFee}
                            </span>
                          </div>
                          <p className="text-xs text-gray-600 dark:text-gray-400">Restocking fee</p>
                        </div>
                      </div>
                      
                      <ul className="space-y-1">
                        {policy.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <CheckCircle className="h-3 w-3 text-green-500 mt-1 flex-shrink-0" />
                            <span className="text-xs text-gray-600 dark:text-gray-400">
                              {detail}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Refund Information and Restrictions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-8"
          >
            {/* Refund Methods */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <CreditCard className="h-6 w-6 mr-3 text-green-600" />
                Refund Options
              </h3>
              
              <div className="space-y-4">
                {refundMethods.map((method, index) => (
                  <div
                    key={index}
                    className={`border rounded-lg p-4 ${
                      method.preferred 
                        ? 'border-green-200 dark:border-green-800 bg-green-50 dark:bg-green-900/20' 
                        : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                            {method.method}
                          </h4>
                          {method.preferred && (
                            <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                              Recommended
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mb-2">
                          {method.description}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-medium text-gray-900 dark:text-white">
                          {method.timeframe}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <XCircle className="h-6 w-6 mr-3 text-red-600" />
                Non-Returnable Items
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                The following items cannot be returned for health, safety, or legal reasons:
              </p>
              
              <ul className="space-y-2">
                {nonReturnableItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Customer Support */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Need Help with Returns?
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Our customer service team is here to help with your return questions.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      +1 (555) 123-4567
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Mon-Fri, 8AM-8PM EST
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-green-600" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      returns@globalnexus.com
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Response within 4 hours
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm">
                  Contact Support
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm flex items-center justify-center space-x-2">
                  <Download className="h-4 w-4" />
                  <span>Return Guide</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Customer Satisfaction */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 mt-8"
        >
          <div className="text-center">
            <ThumbsUp className="h-12 w-12 text-green-600 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              98% Customer Satisfaction
            </h3>
            <p className="text-green-700 dark:text-green-200 mb-6 max-w-2xl mx-auto">
              Our customers love our easy return process. We're committed to making returns 
              and exchanges as simple as possible, so you can shop with confidence.
            </p>
            <div className="flex justify-center space-x-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">4.9/5</div>
                <div className="text-sm text-green-700 dark:text-green-200">Return Experience Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">24h</div>
                <div className="text-sm text-green-700 dark:text-green-200">Average Processing Time</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-600">Free</div>
                <div className="text-sm text-green-700 dark:text-green-200">Return Shipping</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ReturnsPage;
