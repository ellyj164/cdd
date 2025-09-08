import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  DollarSign,
  Target,
  TrendingUp,
  Gift,
  Award,
  BarChart3,
  Calendar,
  CheckCircle,
  Star,
  ArrowRight,
  ExternalLink,
  Link as LinkIcon,
  Smartphone,
  Globe,
  Shield,
  Zap,
  Calculator,
  Clock,
  Mail,
  Phone,
  FileText,
  Download
} from 'lucide-react';

const AffiliatePage = () => {
  const [calculatorSales, setCalculatorSales] = useState(1000);
  const [calculatorCommission, setCalculatorCommission] = useState(8);

  const commissionTiers = [
    {
      tier: 'Bronze',
      sales: '$0 - $5,000',
      commission: '5%',
      color: 'from-orange-400 to-orange-600',
      benefits: ['Basic affiliate tools', 'Monthly payouts', 'Email support']
    },
    {
      tier: 'Silver',
      sales: '$5,001 - $25,000',
      commission: '8%',
      color: 'from-gray-400 to-gray-600',
      benefits: ['Priority support', 'Custom banners', 'Weekly payouts']
    },
    {
      tier: 'Gold',
      sales: '$25,001 - $100,000',
      commission: '12%',
      color: 'from-yellow-400 to-yellow-600',
      benefits: ['Dedicated manager', 'Early product access', 'Real-time payouts']
    },
    {
      tier: 'Platinum',
      sales: '$100,000+',
      commission: '15%',
      color: 'from-purple-400 to-purple-600',
      benefits: ['VIP support', 'Custom deals', 'Co-marketing opportunities']
    }
  ];

  const features = [
    {
      icon: DollarSign,
      title: 'High Commissions',
      description: 'Earn up to 15% commission on all sales with our tiered structure'
    },
    {
      icon: Clock,
      title: 'Real-time Tracking',
      description: 'Monitor your clicks, conversions, and earnings in real-time'
    },
    {
      icon: Target,
      title: 'Quality Products',
      description: 'Promote products from trusted brands with high conversion rates'
    },
    {
      icon: Shield,
      title: 'Reliable Payments',
      description: 'Get paid on time with multiple payment options available'
    },
    {
      icon: BarChart3,
      title: 'Advanced Analytics',
      description: 'Detailed reports and insights to optimize your performance'
    },
    {
      icon: Users,
      title: 'Dedicated Support',
      description: 'Get help from our experienced affiliate success team'
    }
  ];

  const tools = [
    {
      name: 'Affiliate Dashboard',
      description: 'Comprehensive dashboard with real-time analytics and reporting',
      features: ['Performance metrics', 'Commission tracking', 'Payment history']
    },
    {
      name: 'Marketing Materials',
      description: 'Professional banners, product images, and promotional content',
      features: ['Custom banners', 'Product catalogs', 'Email templates']
    },
    {
      name: 'Link Generator',
      description: 'Create trackable affiliate links for any product or category',
      features: ['Deep linking', 'Mobile optimization', 'Link shortening']
    },
    {
      name: 'Mobile App',
      description: 'Manage your affiliate business on the go',
      features: ['iOS & Android', 'Push notifications', 'Offline access']
    }
  ];

  const success = [
    {
      name: 'Sarah Johnson',
      earnings: '$15,000/month',
      specialty: 'Fashion & Lifestyle',
      quote: 'Global Nexus has transformed my blogging income. The products are high-quality and the commission rates are excellent.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Mike Chen',
      earnings: '$22,000/month',
      specialty: 'Tech Reviews',
      quote: 'The affiliate program is incredibly user-friendly. I love the real-time tracking and fast payments.',
      image: '/api/placeholder/80/80'
    },
    {
      name: 'Emma Rodriguez',
      earnings: '$8,500/month',
      specialty: 'Home & Garden',
      quote: 'Great conversion rates and awesome support team. This program has exceeded my expectations.',
      image: '/api/placeholder/80/80'
    }
  ];

  const requirements = [
    'Have an active website, blog, or social media presence',
    'Comply with our affiliate terms and conditions',
    'Provide accurate tax information for payments',
    'Follow FTC guidelines for affiliate disclosures',
    'Maintain professional and ethical marketing practices'
  ];

  const applicationSteps = [
    {
      step: 1,
      title: 'Apply Online',
      description: 'Complete our simple application form with your website/social details'
    },
    {
      step: 2,
      title: 'Review Process',
      description: 'Our team reviews your application within 24-48 hours'
    },
    {
      step: 3,
      title: 'Get Approved',
      description: 'Once approved, you receive access to your affiliate dashboard'
    },
    {
      step: 4,
      title: 'Start Earning',
      description: 'Begin promoting products and earning commissions immediately'
    }
  ];

  const calculateEarnings = () => {
    return (calculatorSales * calculatorCommission / 100).toFixed(2);
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
              <Users className="h-16 w-16 mx-auto mb-4 text-teal-200" />
              <h1 className="text-4xl font-bold mb-4">Affiliate Program</h1>
              <p className="text-xl text-teal-100">
                Join thousands of affiliates earning money by promoting our products
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">15%</div>
                <div className="text-sm text-teal-200">Max Commission</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-sm text-teal-200">Active Affiliates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">$2M+</div>
                <div className="text-sm text-teal-200">Paid Out</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Commission Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
            <Calculator className="h-6 w-6 mr-3 text-green-600" />
            Earnings Calculator
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Monthly Sales Volume
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  value={calculatorSales}
                  onChange={(e) => setCalculatorSales(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Commission Rate
              </label>
              <select
                value={calculatorCommission}
                onChange={(e) => setCalculatorCommission(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              >
                <option value="5">Bronze - 5%</option>
                <option value="8">Silver - 8%</option>
                <option value="12">Gold - 12%</option>
                <option value="15">Platinum - 15%</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Your Earnings
              </label>
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-3">
                <div className="text-2xl font-bold text-green-600">
                  ${calculateEarnings()}
                </div>
                <div className="text-sm text-green-700 dark:text-green-200">
                  per month
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Commission Tiers */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Commission Tiers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {commissionTiers.map((tier, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`h-24 bg-gradient-to-r ${tier.color} flex items-center justify-center`}>
                  <div className="text-center text-white">
                    <div className="text-2xl font-bold">{tier.tier}</div>
                    <div className="text-sm opacity-90">{tier.commission}</div>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="text-center mb-4">
                    <div className="font-semibold text-gray-900 dark:text-white mb-1">
                      Monthly Sales
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {tier.sales}
                    </div>
                  </div>
                  
                  <ul className="space-y-2">
                    {tier.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          {benefit}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Key Features */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Choose Our Program?
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <feature.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Success Stories */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Success Stories
            </h3>
            
            <div className="space-y-6">
              {success.map((story, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-12 h-12 bg-gray-300 rounded-full"></div>
                    <div>
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {story.name}
                        </h4>
                        <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs">
                          {story.earnings}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                        {story.specialty}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300 italic">
                        "{story.quote}"
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Tools & Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Tools & Resources
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool, index) => (
              <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                  {tool.name}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {tool.description}
                </p>
                <ul className="space-y-1">
                  {tool.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center space-x-2">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </motion.div>

        {/* How to Apply */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              Ready to Start Earning?
            </h3>
            <p className="text-green-700 dark:text-green-200 max-w-2xl mx-auto">
              Join our affiliate program today and start earning commissions on every sale you generate.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {applicationSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-12 h-12 bg-green-600 text-white rounded-full flex items-center justify-center mx-auto mb-3 font-bold">
                  {step.step}
                </div>
                <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">
                  {step.title}
                </h4>
                <p className="text-sm text-green-700 dark:text-green-200">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-6">
            <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
              Requirements:
            </h4>
            <ul className="space-y-2">
              {requirements.map((req, index) => (
                <li key={index} className="flex items-start space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {req}
                  </span>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="text-center">
            <button className="bg-green-600 text-white px-8 py-4 rounded-lg hover:bg-green-700 transition-colors duration-200 font-semibold flex items-center space-x-2 mx-auto">
              <span>Apply Now</span>
              <ArrowRight className="h-5 w-5" />
            </button>
            <p className="text-sm text-green-600 dark:text-green-300 mt-4">
              Application review typically takes 24-48 hours
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AffiliatePage;
