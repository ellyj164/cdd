import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Truck,
  Package,
  Clock,
  MapPin,
  CreditCard,
  Shield,
  Globe,
  Calculator,
  Zap,
  Plane,
  Ship,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Info,
  DollarSign,
  Scale,
  FileText,
  Phone,
  Mail,
  ExternalLink
} from 'lucide-react';

const ShippingPage = () => {
  const [selectedCountry, setSelectedCountry] = useState('US');
  const [packageWeight, setPackageWeight] = useState('1');
  const [shippingMethod, setShippingMethod] = useState('standard');

  const shippingMethods = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      description: 'Reliable delivery at an affordable price',
      icon: Truck,
      timeframe: '5-7 business days',
      cost: 'Free on orders $50+',
      tracking: true,
      insurance: 'Up to $100',
      features: ['Free on qualifying orders', 'Signature not required', 'Tracking included']
    },
    {
      id: 'express',
      name: 'Express Shipping',
      description: 'Faster delivery for important orders',
      icon: Zap,
      timeframe: '2-3 business days',
      cost: '$9.99',
      tracking: true,
      insurance: 'Up to $500',
      features: ['Priority handling', 'Weekend delivery available', 'SMS notifications']
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      description: 'Next business day delivery',
      icon: Plane,
      timeframe: 'Next business day',
      cost: '$24.99',
      tracking: true,
      insurance: 'Up to $1000',
      features: ['Guaranteed next day', 'Morning delivery', 'Signature required']
    },
    {
      id: 'international',
      name: 'International Shipping',
      description: 'Worldwide delivery options',
      icon: Globe,
      timeframe: '7-21 business days',
      cost: 'Varies by destination',
      tracking: true,
      insurance: 'Available',
      features: ['Customs handling', 'Multiple carriers', 'Duty calculator']
    }
  ];

  const shippingZones = [
    {
      zone: 'United States',
      countries: ['United States'],
      flag: '🇺🇸',
      methods: ['Standard', 'Express', 'Overnight'],
      freeThreshold: '$50',
      timeframe: '1-7 business days'
    },
    {
      zone: 'Canada',
      countries: ['Canada'],
      flag: '🇨🇦',
      methods: ['Standard', 'Express'],
      freeThreshold: '$75',
      timeframe: '5-10 business days'
    },
    {
      zone: 'Europe',
      countries: ['United Kingdom', 'Germany', 'France', 'Spain', 'Italy', 'Netherlands'],
      flag: '🇪🇺',
      methods: ['Standard', 'Express'],
      freeThreshold: '$100',
      timeframe: '7-14 business days'
    },
    {
      zone: 'Asia Pacific',
      countries: ['Australia', 'Japan', 'Singapore', 'South Korea', 'Hong Kong'],
      flag: '🌏',
      methods: ['Standard', 'Express'],
      freeThreshold: '$150',
      timeframe: '10-21 business days'
    },
    {
      zone: 'Rest of World',
      countries: ['Other countries'],
      flag: '🌍',
      methods: ['Standard'],
      freeThreshold: '$200',
      timeframe: '14-28 business days'
    }
  ];

  const shippingPolicies = [
    {
      title: 'Processing Time',
      icon: Clock,
      content: 'Orders are processed within 1-2 business days. Orders placed after 2 PM EST will be processed the next business day.',
      details: [
        'Order verification and payment processing',
        'Inventory allocation and picking',
        'Quality control and packaging',
        'Carrier pickup and tracking assignment'
      ]
    },
    {
      title: 'Packaging',
      icon: Package,
      content: 'All orders are carefully packaged to ensure safe delivery. We use eco-friendly materials whenever possible.',
      details: [
        'Recycled and biodegradable packaging materials',
        'Protective bubble wrap for fragile items',
        'Moisture-resistant sealing for electronics',
        'Discrete packaging for sensitive items'
      ]
    },
    {
      title: 'Address Requirements',
      icon: MapPin,
      content: 'Please ensure your shipping address is complete and accurate to avoid delivery delays.',
      details: [
        'Complete street address with apartment/unit number',
        'Valid city, state/province, and postal code',
        'Phone number for delivery notifications',
        'Special delivery instructions if needed'
      ]
    },
    {
      title: 'Delivery Attempts',
      icon: Truck,
      content: 'Carriers will attempt delivery up to 3 times. Failed deliveries may be held at local facilities.',
      details: [
        'Delivery notifications sent via email/SMS',
        'Redelivery can be scheduled online',
        'Packages held for 5-10 business days',
        'Return to sender after hold period'
      ]
    }
  ];

  const restrictedItems = [
    'Hazardous materials and chemicals',
    'Flammable liquids and gases',
    'Batteries (lithium and lead-acid)',
    'Aerosols and pressurized containers',
    'Perishable food items',
    'Live animals and plants',
    'Firearms and ammunition',
    'Controlled substances'
  ];

  const calculateShipping = () => {
    // Simplified shipping calculation for demo
    const baseRates = {
      standard: selectedCountry === 'US' ? 0 : 15,
      express: selectedCountry === 'US' ? 9.99 : 25,
      overnight: selectedCountry === 'US' ? 24.99 : 'N/A',
      international: selectedCountry === 'US' ? 'N/A' : 30
    };

    const weightMultiplier = Math.ceil(parseFloat(packageWeight) || 1);
    const rate = baseRates[shippingMethod];
    
    if (rate === 'N/A') return 'Not Available';
    return rate === 0 ? 'Free' : `$${(rate + (weightMultiplier - 1) * 5).toFixed(2)}`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Truck className="h-16 w-16 mx-auto mb-4 text-cyan-200" />
              <h1 className="text-4xl font-bold mb-4">Shipping Information</h1>
              <p className="text-xl text-cyan-100">
                Fast, reliable, and secure shipping worldwide. Get your orders delivered safely and on time.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Shipping Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calculator className="h-6 w-6 mr-3 text-blue-600" />
            Shipping Calculator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Destination Country
              </label>
              <select
                value={selectedCountry}
                onChange={(e) => setSelectedCountry(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="US">United States</option>
                <option value="CA">Canada</option>
                <option value="UK">United Kingdom</option>
                <option value="DE">Germany</option>
                <option value="AU">Australia</option>
                <option value="JP">Japan</option>
                <option value="OTHER">Other Country</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Package Weight (lbs)
              </label>
              <input
                type="number"
                value={packageWeight}
                onChange={(e) => setPackageWeight(e.target.value)}
                min="0.1"
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Shipping Method
              </label>
              <select
                value={shippingMethod}
                onChange={(e) => setShippingMethod(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="standard">Standard</option>
                <option value="express">Express</option>
                <option value="overnight">Overnight</option>
                <option value="international">International</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Estimated Cost
                </label>
                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-2">
                  <span className="text-lg font-bold text-blue-600">
                    {calculateShipping()}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Info className="h-5 w-5 text-yellow-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-yellow-700 dark:text-yellow-200">
                  Shipping costs are calculated based on destination, weight, and shipping method. 
                  Final rates may vary based on package dimensions and actual weight.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Shipping Methods */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shipping Options
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {shippingMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center">
                    <method.icon className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                      {method.name}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                      {method.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 mb-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Clock className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {method.timeframe}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <DollarSign className="h-4 w-4 text-gray-500" />
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {method.cost}
                          </span>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center space-x-2 mb-2">
                          <Package className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {method.tracking ? 'Tracking included' : 'No tracking'}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Shield className="h-4 w-4 text-gray-500" />
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            Insurance: {method.insurance}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      {method.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500 flex-shrink-0" />
                          <span className="text-xs text-gray-600 dark:text-gray-400">
                            {feature}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Shipping Zones */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Shipping Zones & Rates
          </h2>
          
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Zone
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Countries
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Methods
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Free Shipping
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Delivery Time
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {shippingZones.map((zone, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{zone.flag}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">
                            {zone.zone}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          {zone.countries.join(', ')}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-wrap gap-1">
                          {zone.methods.map((method, idx) => (
                            <span
                              key={idx}
                              className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs"
                            >
                              {method}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-green-600">
                          {zone.freeThreshold}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {zone.timeframe}
                        </span>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Shipping Policies */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Shipping Policies
            </h2>
            
            <div className="space-y-6">
              {shippingPolicies.map((policy, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
                >
                  <div className="flex items-start space-x-4">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                      <policy.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                        {policy.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                        {policy.content}
                      </p>
                      <ul className="space-y-1">
                        {policy.details.map((detail, idx) => (
                          <li key={idx} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
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

          {/* Restrictions and Support */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.8 }}
            className="space-y-8"
          >
            {/* Shipping Restrictions */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <AlertTriangle className="h-6 w-6 mr-3 text-orange-600" />
                Shipping Restrictions
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                The following items cannot be shipped due to safety and legal restrictions:
              </p>
              
              <ul className="space-y-2">
                {restrictedItems.map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              
              <div className="mt-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
                <p className="text-sm text-orange-700 dark:text-orange-200">
                  If you're unsure whether an item can be shipped, please contact our customer 
                  service team before placing your order.
                </p>
              </div>
            </div>

            {/* International Shipping */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
                <Globe className="h-6 w-6 mr-3 text-blue-600" />
                International Shipping
              </h3>
              
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <FileText className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Customs and Duties
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      International customers are responsible for customs duties and taxes
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Scale className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Weight Limits
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Maximum package weight is 70 lbs for international shipments
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3">
                  <Calendar className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                      Delivery Times
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Times may vary due to customs processing and local holidays
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Support */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Shipping Support
              </h3>
              
              <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
                Need help with shipping? Our customer service team is here to assist you.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Phone className="h-5 w-5 text-blue-600" />
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
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <span className="font-medium text-gray-900 dark:text-white text-sm">
                      shipping@globalnexus.com
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex space-x-3">
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm">
                  Contact Support
                </button>
                <button className="flex-1 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-sm">
                  Track Order
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ShippingPage;
