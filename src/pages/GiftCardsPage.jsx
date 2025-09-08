import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Gift,
  CreditCard,
  Mail,
  Download,
  Share2,
  Calendar,
  DollarSign,
  Star,
  Heart,
  Sparkles,
  Check,
  Copy,
  Send,
  ShoppingBag,
  Clock,
  Shield,
  ArrowRight,
  Zap,
  Users,
  Smartphone,
  Printer
} from 'lucide-react';

const GiftCardsPage = () => {
  const [selectedAmount, setSelectedAmount] = useState(50);
  const [customAmount, setCustomAmount] = useState('');
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState('email');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');

  // Predefined amounts
  const amounts = [25, 50, 100, 150, 200, 250];

  // Gift card designs
  const designs = [
    {
      id: 1,
      name: 'Birthday Celebration',
      description: 'Perfect for birthday gifts',
      image: '/api/placeholder/300/180',
      color: 'from-pink-500 to-purple-600',
      icon: Gift,
      category: 'Birthday'
    },
    {
      id: 2,
      name: 'Holiday Magic',
      description: 'Festive holiday design',
      image: '/api/placeholder/300/180',
      color: 'from-red-500 to-green-600',
      icon: Sparkles,
      category: 'Holiday'
    },
    {
      id: 3,
      name: 'Love & Romance',
      description: 'Perfect for special someone',
      image: '/api/placeholder/300/180',
      color: 'from-red-400 to-pink-500',
      icon: Heart,
      category: 'Love'
    },
    {
      id: 4,
      name: 'Graduation Success',
      description: 'Celebrate achievements',
      image: '/api/placeholder/300/180',
      color: 'from-blue-500 to-purple-600',
      icon: Star,
      category: 'Graduation'
    },
    {
      id: 5,
      name: 'Thank You',
      description: 'Show your appreciation',
      image: '/api/placeholder/300/180',
      color: 'from-yellow-400 to-orange-500',
      icon: Star,
      category: 'Thanks'
    },
    {
      id: 6,
      name: 'Classic Elegant',
      description: 'Timeless design for any occasion',
      image: '/api/placeholder/300/180',
      color: 'from-gray-600 to-gray-800',
      icon: Gift,
      category: 'Classic'
    }
  ];

  // Features
  const features = [
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'All gift cards are encrypted and protected'
    },
    {
      icon: Clock,
      title: 'No Expiration',
      description: 'Our gift cards never expire'
    },
    {
      icon: Smartphone,
      title: 'Mobile Friendly',
      description: 'Use easily on any device'
    },
    {
      icon: Users,
      title: 'Perfect for Groups',
      description: 'Ideal for group gifting'
    }
  ];

  // Benefits
  const benefits = [
    {
      icon: Zap,
      title: 'Instant Delivery',
      description: 'Send gift cards instantly via email or schedule for later delivery'
    },
    {
      icon: ShoppingBag,
      title: 'Flexible Shopping',
      description: 'Use on any product in our store with no restrictions'
    },
    {
      icon: Gift,
      title: 'Multiple Designs',
      description: 'Choose from beautiful designs for every occasion'
    },
    {
      icon: Share2,
      title: 'Easy to Share',
      description: 'Send directly to recipient or share via social media'
    }
  ];

  const handleAmountSelect = (amount) => {
    setSelectedAmount(amount);
    setCustomAmount('');
  };

  const handleCustomAmount = (value) => {
    setCustomAmount(value);
    setSelectedAmount(0);
  };

  const getCurrentAmount = () => {
    return customAmount ? parseFloat(customAmount) || 0 : selectedAmount;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Gift className="h-16 w-16 mx-auto mb-4 text-purple-200" />
              <h1 className="text-4xl font-bold mb-4">Gift Cards</h1>
              <p className="text-xl text-purple-100">
                The perfect gift for any occasion. Let them choose what they love.
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
                <div className="text-2xl font-bold">500K+</div>
                <div className="text-sm text-purple-200">Gift Cards Sold</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">98%</div>
                <div className="text-sm text-purple-200">Satisfaction Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">Instant</div>
                <div className="text-sm text-purple-200">Delivery</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Gift Card Builder */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                Create Your Gift Card
              </h2>

              {/* Amount Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Select Amount
                </h3>
                <div className="grid grid-cols-3 gap-3 mb-4">
                  {amounts.map(amount => (
                    <button
                      key={amount}
                      onClick={() => handleAmountSelect(amount)}
                      className={`p-3 rounded-lg border-2 transition-all duration-200 ${
                        selectedAmount === amount
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20 text-primary-600'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <div className="font-bold">${amount}</div>
                    </button>
                  ))}
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Custom amount (min $5, max $1000)"
                    value={customAmount}
                    onChange={(e) => handleCustomAmount(e.target.value)}
                    min="5"
                    max="1000"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  Minimum $5, Maximum $1,000
                </p>
              </div>

              {/* Design Selection */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Choose Design
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  {designs.map(design => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={`relative rounded-lg overflow-hidden border-3 transition-all duration-200 ${
                        selectedDesign === design.id
                          ? 'border-primary-600 ring-2 ring-primary-200'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <div className={`h-24 bg-gradient-to-br ${design.color} flex items-center justify-center`}>
                        <design.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="p-2 bg-white dark:bg-gray-700">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {design.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                          {design.category}
                        </div>
                      </div>
                      {selectedDesign === design.id && (
                        <div className="absolute top-2 right-2 bg-primary-600 rounded-full p-1">
                          <Check className="h-3 w-3 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Delivery Method */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Delivery Method
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'email', label: 'Email Delivery', icon: Mail, description: 'Instant delivery to email' },
                    { id: 'print', label: 'Print at Home', icon: Printer, description: 'Download and print' },
                    { id: 'schedule', label: 'Schedule Delivery', icon: Calendar, description: 'Send on specific date' }
                  ].map(method => (
                    <button
                      key={method.id}
                      onClick={() => setDeliveryMethod(method.id)}
                      className={`w-full p-4 rounded-lg border-2 transition-all duration-200 flex items-center space-x-3 ${
                        deliveryMethod === method.id
                          ? 'border-primary-600 bg-primary-50 dark:bg-primary-900/20'
                          : 'border-gray-200 dark:border-gray-600 hover:border-primary-300'
                      }`}
                    >
                      <method.icon className={`h-5 w-5 ${
                        deliveryMethod === method.id ? 'text-primary-600' : 'text-gray-400'
                      }`} />
                      <div className="text-left">
                        <div className={`font-medium ${
                          deliveryMethod === method.id ? 'text-primary-600' : 'text-gray-900 dark:text-white'
                        }`}>
                          {method.label}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {method.description}
                        </div>
                      </div>
                      {deliveryMethod === method.id && (
                        <div className="ml-auto">
                          <Check className="h-5 w-5 text-primary-600" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Recipient Information */}
              {deliveryMethod === 'email' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Recipient Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipient Name
                      </label>
                      <input
                        type="text"
                        value={recipientName}
                        onChange={(e) => setRecipientName(e.target.value)}
                        placeholder="Enter recipient's name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Recipient Email
                      </label>
                      <input
                        type="email"
                        value={recipientEmail}
                        onChange={(e) => setRecipientEmail(e.target.value)}
                        placeholder="Enter recipient's email"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        value={senderName}
                        onChange={(e) => setSenderName(e.target.value)}
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Delivery */}
              {deliveryMethod === 'schedule' && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                    Schedule Delivery
                  </h3>
                  <input
                    type="datetime-local"
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    min={new Date().toISOString().slice(0, 16)}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  />
                </div>
              )}

              {/* Personal Message */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Personal Message (Optional)
                </h3>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Write a personal message..."
                  rows={4}
                  maxLength={200}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
                <div className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                  {message.length}/200 characters
                </div>
              </div>

              {/* Purchase Summary */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                  Purchase Summary
                </h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Gift Card Value</span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${getCurrentAmount()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Processing Fee</span>
                    <span className="font-semibold text-gray-900 dark:text-white">Free</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 pt-2">
                    <div className="flex justify-between">
                      <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                      <span className="font-bold text-primary-600 text-lg">
                        ${getCurrentAmount()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Purchase Button */}
              <button
                disabled={getCurrentAmount() < 5}
                className="w-full bg-primary-600 text-white py-4 px-6 rounded-xl hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors duration-200 font-semibold text-lg flex items-center justify-center space-x-2"
              >
                <CreditCard className="h-5 w-5" />
                <span>Purchase Gift Card</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>
          </motion.div>

          {/* Preview and Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-8"
          >
            {/* Gift Card Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Gift Card Preview
              </h3>
              
              <div className="relative">
                <div className={`h-48 rounded-xl bg-gradient-to-br ${
                  designs.find(d => d.id === selectedDesign)?.color || 'from-primary-500 to-primary-600'
                } flex flex-col justify-between p-6 text-white`}>
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="text-lg font-bold mb-1">Global Nexus</h4>
                      <p className="text-sm opacity-90">Gift Card</p>
                    </div>
                    <Gift className="h-8 w-8 opacity-75" />
                  </div>
                  
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-2xl font-bold">
                        ${getCurrentAmount() || '00'}
                      </p>
                      <p className="text-sm opacity-75">
                        {designs.find(d => d.id === selectedDesign)?.name}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs opacity-75">Valid Until</p>
                      <p className="text-sm font-semibold">Never Expires</p>
                    </div>
                  </div>
                </div>
                
                {message && (
                  <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-400 italic">
                      "{message}"
                    </p>
                    {senderName && (
                      <p className="text-xs text-gray-500 dark:text-gray-500 mt-2">
                        - {senderName}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Features */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Gift Card Features
              </h3>
              
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="text-center p-4 rounded-lg bg-gray-50 dark:bg-gray-700"
                  >
                    <feature.icon className="h-8 w-8 text-primary-600 mx-auto mb-2" />
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Why Choose Our Gift Cards?
              </h3>
              
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="flex items-start space-x-3"
                  >
                    <div className="w-10 h-10 bg-primary-100 dark:bg-primary-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <benefit.icon className="h-5 w-5 text-primary-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                        {benefit.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {benefit.description}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Terms */}
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-6">
              <h4 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-2">
                Terms & Conditions
              </h4>
              <ul className="text-sm text-yellow-700 dark:text-yellow-200 space-y-1">
                <li>• Gift cards never expire and have no maintenance fees</li>
                <li>• Can be used for any products on our website</li>
                <li>• Cannot be redeemed for cash or combined with other offers</li>
                <li>• Lost or stolen gift cards cannot be replaced</li>
                <li>• Gift card codes are case-sensitive</li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default GiftCardsPage;
