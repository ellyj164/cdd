'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  RefreshCw,
  Calendar,
  Package,
  Bell,
  Settings,
  Plus,
  Edit3,
  Trash2,
  Play,
  Pause,
  SkipForward,
  Clock,
  Truck,
  CheckCircle,
  AlertTriangle,
  DollarSign,
  Percent,
  TrendingUp,
  History,
  Heart,
  ShoppingCart,
  Star
} from 'lucide-react'

interface Subscription {
  id: string
  productId: string
  productName: string
  productImage: string
  frequency: string
  nextDelivery: string
  price: number
  discount: number
  status: 'active' | 'paused' | 'cancelled'
  deliveryHistory: Array<{
    date: string
    status: 'delivered' | 'shipped' | 'processing'
    trackingNumber?: string
  }>
  preferences: {
    autoRenew: boolean
    smartSubstitution: boolean
    flexibleScheduling: boolean
  }
}

interface SubscriptionPlan {
  frequency: string
  label: string
  discount: number
  popular?: boolean
}

const SubscriptionReplenishment: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('active')
  const [selectedSubscription, setSelectedSubscription] = useState<string | null>(null)
  const [showAddModal, setShowAddModal] = useState(false)

  const subscriptionPlans: SubscriptionPlan[] = [
    { frequency: 'weekly', label: 'Every Week', discount: 5 },
    { frequency: 'biweekly', label: 'Every 2 Weeks', discount: 10, popular: true },
    { frequency: 'monthly', label: 'Every Month', discount: 15 },
    { frequency: 'quarterly', label: 'Every 3 Months', discount: 20 }
  ]

  const [subscriptions] = useState<Subscription[]>([
    {
      id: '1',
      productId: 'coffee-beans-001',
      productName: 'Premium Coffee Beans (2 lbs)',
      productImage: 'https://via.placeholder.com/100x100/8B4513/white?text=Coffee',
      frequency: 'monthly',
      nextDelivery: '2024-02-15',
      price: 24.99,
      discount: 15,
      status: 'active',
      deliveryHistory: [
        { date: '2024-01-15', status: 'delivered', trackingNumber: 'TR123456789' },
        { date: '2023-12-15', status: 'delivered', trackingNumber: 'TR123456788' },
        { date: '2023-11-15', status: 'delivered', trackingNumber: 'TR123456787' }
      ],
      preferences: {
        autoRenew: true,
        smartSubstitution: true,
        flexibleScheduling: false
      }
    },
    {
      id: '2',
      productId: 'protein-powder-001',
      productName: 'Whey Protein Powder (5 lbs)',
      productImage: 'https://via.placeholder.com/100x100/4169E1/white?text=Protein',
      frequency: 'biweekly',
      nextDelivery: '2024-02-08',
      price: 49.99,
      discount: 10,
      status: 'active',
      deliveryHistory: [
        { date: '2024-01-25', status: 'delivered', trackingNumber: 'TR123456790' },
        { date: '2024-01-11', status: 'delivered', trackingNumber: 'TR123456789' }
      ],
      preferences: {
        autoRenew: true,
        smartSubstitution: false,
        flexibleScheduling: true
      }
    },
    {
      id: '3',
      productId: 'vitamins-001',
      productName: 'Daily Multivitamins (90 count)',
      productImage: 'https://via.placeholder.com/100x100/32CD32/white?text=Vitamins',
      frequency: 'quarterly',
      nextDelivery: '2024-03-15',
      price: 29.99,
      discount: 20,
      status: 'paused',
      deliveryHistory: [
        { date: '2023-12-15', status: 'delivered', trackingNumber: 'TR123456791' }
      ],
      preferences: {
        autoRenew: false,
        smartSubstitution: true,
        flexibleScheduling: false
      }
    }
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'paused':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'cancelled':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <Play className="w-4 h-4" />
      case 'paused':
        return <Pause className="w-4 h-4" />
      case 'cancelled':
        return <Trash2 className="w-4 h-4" />
      default:
        return <Clock className="w-4 h-4" />
    }
  }

  const getDeliveryStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'shipped':
        return <Truck className="w-4 h-4 text-blue-500" />
      case 'processing':
        return <Clock className="w-4 h-4 text-yellow-500" />
      default:
        return <AlertTriangle className="w-4 h-4 text-gray-500" />
    }
  }

  const calculateSavings = (price: number, discount: number) => {
    return (price * discount / 100).toFixed(2)
  }

  const formatFrequency = (frequency: string) => {
    switch (frequency) {
      case 'weekly':
        return 'Every Week'
      case 'biweekly':
        return 'Every 2 Weeks'
      case 'monthly':
        return 'Every Month'
      case 'quarterly':
        return 'Every 3 Months'
      default:
        return frequency
    }
  }

  const getDaysUntilNextDelivery = (nextDelivery: string) => {
    const now = new Date()
    const delivery = new Date(nextDelivery)
    const diffTime = delivery.getTime() - now.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const filteredSubscriptions = subscriptions.filter(sub => {
    if (activeTab === 'active') return sub.status === 'active'
    if (activeTab === 'paused') return sub.status === 'paused'
    if (activeTab === 'all') return true
    return true
  })

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-4"
        >
          <RefreshCw className="w-4 h-4 mr-2" />
          Subscription & Replenishment
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Never Run Out Again
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Set up automatic deliveries for your favorite products and save up to 20% with our flexible subscription plans.
        </p>
      </div>

      {/* Subscription Summary */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: 'Active Subscriptions', 
            value: subscriptions.filter(s => s.status === 'active').length,
            icon: RefreshCw,
            color: 'green'
          },
          { 
            label: 'Monthly Savings', 
            value: `$${subscriptions.reduce((acc, sub) => acc + parseFloat(calculateSavings(sub.price, sub.discount)), 0).toFixed(2)}`,
            icon: DollarSign,
            color: 'blue'
          },
          { 
            label: 'Next Delivery', 
            value: `${Math.min(...subscriptions.filter(s => s.status === 'active').map(s => getDaysUntilNextDelivery(s.nextDelivery)))} days`,
            icon: Calendar,
            color: 'purple'
          },
          { 
            label: 'Total Orders', 
            value: subscriptions.reduce((acc, sub) => acc + sub.deliveryHistory.length, 0),
            icon: Package,
            color: 'orange'
          }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  {stat.value}
                </span>
              </div>
              <h3 className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</h3>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-wrap gap-2">
          {[
            { id: 'active', label: 'Active', count: subscriptions.filter(s => s.status === 'active').length },
            { id: 'paused', label: 'Paused', count: subscriptions.filter(s => s.status === 'paused').length },
            { id: 'all', label: 'All Subscriptions', count: subscriptions.length }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab.label}
              <span className="ml-2 bg-white bg-opacity-20 px-2 py-1 rounded-full text-xs">
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Subscription
        </button>
      </div>

      {/* Subscriptions Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredSubscriptions.map((subscription, index) => (
          <motion.div
            key={subscription.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
          >
            {/* Subscription Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  <img
                    src={subscription.productImage}
                    alt={subscription.productName}
                    className="w-16 h-16 object-cover rounded-lg mr-4"
                  />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                      {subscription.productName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-2">
                      {formatFrequency(subscription.frequency)}
                    </p>
                    <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                      {getStatusIcon(subscription.status)}
                      <span className="ml-1 capitalize">{subscription.status}</span>
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    ${subscription.price}
                  </div>
                  <div className="text-sm text-green-600 flex items-center">
                    <Percent className="w-3 h-3 mr-1" />
                    Save ${calculateSavings(subscription.price, subscription.discount)}
                  </div>
                </div>
              </div>
            </div>

            {/* Next Delivery Info */}
            <div className="p-6 bg-blue-50 dark:bg-blue-900/20">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 text-blue-600 mr-2" />
                  <div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Next Delivery</div>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {new Date(subscription.nextDelivery).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                
                <div className="text-right">
                  <div className="text-sm text-gray-600 dark:text-gray-300">
                    {getDaysUntilNextDelivery(subscription.nextDelivery)} days
                  </div>
                  <div className="text-xs text-blue-600">until delivery</div>
                </div>
              </div>
            </div>

            {/* Subscription Controls */}
            <div className="p-6">
              <div className="flex flex-wrap gap-2 mb-4">
                <button className="flex items-center px-3 py-2 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Modify
                </button>
                
                {subscription.status === 'active' ? (
                  <button className="flex items-center px-3 py-2 text-sm bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-300 rounded-lg hover:bg-yellow-200 dark:hover:bg-yellow-900/50 transition-colors">
                    <Pause className="w-4 h-4 mr-2" />
                    Pause
                  </button>
                ) : (
                  <button className="flex items-center px-3 py-2 text-sm bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded-lg hover:bg-green-200 dark:hover:bg-green-900/50 transition-colors">
                    <Play className="w-4 h-4 mr-2" />
                    Resume
                  </button>
                )}
                
                <button className="flex items-center px-3 py-2 text-sm bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded-lg hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors">
                  <SkipForward className="w-4 h-4 mr-2" />
                  Skip Next
                </button>
              </div>

              {/* Delivery History */}
              <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3 flex items-center">
                  <History className="w-4 h-4 mr-2" />
                  Recent Deliveries
                </h4>
                
                <div className="space-y-2">
                  {subscription.deliveryHistory.slice(0, 3).map((delivery, i) => (
                    <div key={i} className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        {getDeliveryStatusIcon(delivery.status)}
                        <span className="ml-2 text-gray-600 dark:text-gray-300">
                          {new Date(delivery.date).toLocaleDateString()}
                        </span>
                      </div>
                      {delivery.trackingNumber && (
                        <span className="text-blue-600 hover:underline cursor-pointer">
                          {delivery.trackingNumber}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Subscription Modal */}
      <AnimatePresence>
        {showAddModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={() => setShowAddModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Subscription Plan
              </h3>
              
              <div className="space-y-3">
                {subscriptionPlans.map((plan) => (
                  <div
                    key={plan.frequency}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors hover:bg-gray-50 dark:hover:bg-gray-700 ${
                      plan.popular ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'border-gray-200 dark:border-gray-700'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          {plan.label}
                          {plan.popular && (
                            <span className="ml-2 bg-blue-100 dark:bg-blue-900/50 text-blue-800 dark:text-blue-300 px-2 py-1 rounded-full text-xs">
                              Most Popular
                            </span>
                          )}
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-300">
                          Save {plan.discount}% on every order
                        </div>
                      </div>
                      <TrendingUp className="w-5 h-5 text-green-500" />
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Start Subscription
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Benefits Section */}
      <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-2xl p-8">
        <div className="text-center mb-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            Why Choose Subscriptions?
          </h3>
          <p className="text-gray-600 dark:text-gray-300">
            Enjoy convenience, savings, and never run out of essentials
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            {
              icon: DollarSign,
              title: 'Save Money',
              description: 'Get up to 20% off regular prices with subscription discounts',
              color: 'green'
            },
            {
              icon: Clock,
              title: 'Save Time',
              description: 'Automatic deliveries mean no more remembering to reorder',
              color: 'blue'
            },
            {
              icon: Settings,
              title: 'Full Control',
              description: 'Modify, pause, or cancel anytime with complete flexibility',
              color: 'purple'
            }
          ].map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-4 bg-${benefit.color}-100 dark:bg-${benefit.color}-900/30 rounded-xl mb-4`}>
                  <Icon className={`w-8 h-8 text-${benefit.color}-600`} />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {benefit.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-300">
                  {benefit.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default SubscriptionReplenishment