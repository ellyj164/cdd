'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Star,
  Award,
  Gift,
  Calendar,
  TrendingUp,
  Users,
  Target,
  Zap,
  Crown,
  Coins,
  Trophy,
  ShoppingBag,
  Heart,
  Share2,
  Clock,
  CheckCircle,
  Plus,
  ArrowRight
} from 'lucide-react'

interface LoyaltyTier {
  id: string
  name: string
  color: string
  minPoints: number
  benefits: string[]
  perks: string[]
  discount: number
  icon: any
}

interface RewardActivity {
  id: string
  type: 'earned' | 'redeemed' | 'bonus'
  description: string
  points: number
  date: string
  category: string
}

const LoyaltyRewardsProgram: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('overview')
  const [userPoints] = useState(2450)
  const [currentTier] = useState('gold')

  const tiers: LoyaltyTier[] = [
    {
      id: 'bronze',
      name: 'Bronze',
      color: 'from-amber-600 to-amber-800',
      minPoints: 0,
      benefits: ['1x points on purchases', 'Standard shipping', 'Email support'],
      perks: ['Birthday bonus', 'Welcome gift'],
      discount: 5,
      icon: Award
    },
    {
      id: 'silver',
      name: 'Silver',
      color: 'from-gray-400 to-gray-600',
      minPoints: 1000,
      benefits: ['1.5x points on purchases', 'Free shipping on $50+', 'Priority support'],
      perks: ['Monthly exclusive deals', 'Early sale access', '10% birthday bonus'],
      discount: 10,
      icon: Star
    },
    {
      id: 'gold',
      name: 'Gold',
      color: 'from-yellow-400 to-yellow-600',
      minPoints: 2000,
      benefits: ['2x points on purchases', 'Free shipping always', '24/7 support'],
      perks: ['VIP customer events', 'Personal shopper', '15% birthday bonus', 'Free returns'],
      discount: 15,
      icon: Crown
    },
    {
      id: 'platinum',
      name: 'Platinum',
      color: 'from-purple-500 to-purple-700',
      minPoints: 5000,
      benefits: ['3x points on purchases', 'Premium shipping', 'Dedicated support'],
      perks: ['Concierge service', 'Exclusive products', '20% birthday bonus', 'Private sales'],
      discount: 20,
      icon: Trophy
    }
  ]

  const recentActivities: RewardActivity[] = [
    {
      id: '1',
      type: 'earned',
      description: 'Purchase at Electronics Store',
      points: 150,
      date: '2024-01-15',
      category: 'Shopping'
    },
    {
      id: '2',
      type: 'bonus',
      description: 'Product Review Bonus',
      points: 50,
      date: '2024-01-14',
      category: 'Engagement'
    },
    {
      id: '3',
      type: 'redeemed',
      description: 'Free Shipping Voucher',
      points: -200,
      date: '2024-01-12',
      category: 'Benefit'
    },
    {
      id: '4',
      type: 'earned',
      description: 'Referral Bonus',
      points: 500,
      date: '2024-01-10',
      category: 'Referral'
    }
  ]

  const availableRewards = [
    {
      id: '1',
      title: '$10 Off Next Purchase',
      points: 500,
      category: 'discount',
      description: 'Valid on orders over $50',
      expiresIn: '30 days',
      popular: true
    },
    {
      id: '2',
      title: 'Free Premium Shipping',
      points: 200,
      category: 'shipping',
      description: 'Upgrade to premium shipping for free',
      expiresIn: '60 days',
      popular: false
    },
    {
      id: '3',
      title: 'Exclusive Product Access',
      points: 1000,
      category: 'access',
      description: 'Early access to limited edition products',
      expiresIn: '90 days',
      popular: true
    },
    {
      id: '4',
      title: '25% Off Home & Garden',
      points: 750,
      category: 'discount',
      description: 'Special discount on home and garden items',
      expiresIn: '45 days',
      popular: false
    }
  ]

  const getCurrentTier = () => {
    return tiers.find(tier => tier.id === currentTier) || tiers[0]
  }

  const getNextTier = () => {
    const currentIndex = tiers.findIndex(tier => tier.id === currentTier)
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
  }

  const getProgressToNextTier = () => {
    const nextTier = getNextTier()
    if (!nextTier) return 100
    
    const current = getCurrentTier()
    const progress = ((userPoints - current.minPoints) / (nextTier.minPoints - current.minPoints)) * 100
    return Math.min(progress, 100)
  }

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'earned':
        return <Plus className="w-4 h-4 text-green-500" />
      case 'redeemed':
        return <ShoppingBag className="w-4 h-4 text-blue-500" />
      case 'bonus':
        return <Gift className="w-4 h-4 text-purple-500" />
      default:
        return <Coins className="w-4 h-4 text-gray-500" />
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'discount':
        return <Target className="w-5 h-5" />
      case 'shipping':
        return <Zap className="w-5 h-5" />
      case 'access':
        return <Crown className="w-5 h-5" />
      default:
        return <Gift className="w-5 h-5" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-full text-purple-800 dark:text-purple-300 text-sm font-medium mb-4"
        >
          <Trophy className="w-4 h-4 mr-2" />
          Loyalty & Rewards Program
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Your Rewards Dashboard
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Earn points with every purchase, unlock exclusive benefits, and enjoy personalized rewards.
        </p>
      </div>

      {/* Points Summary */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center mb-2">
              <Coins className="w-8 h-8 mr-3" />
              <div>
                <h3 className="text-2xl font-bold">{userPoints.toLocaleString()} Points</h3>
                <p className="text-purple-100">Available to spend</p>
              </div>
            </div>
            
            <div className="flex items-center mt-4">
              <div className={`p-2 bg-gradient-to-r ${getCurrentTier().color} rounded-lg mr-3`}>
                {React.createElement(getCurrentTier().icon, { className: 'w-5 h-5 text-white' })}
              </div>
              <div>
                <div className="font-semibold">{getCurrentTier().name} Member</div>
                <div className="text-sm text-purple-100">{getCurrentTier().discount}% exclusive discount</div>
              </div>
            </div>
          </div>

          <div className="text-center md:text-right">
            {getNextTier() && (
              <>
                <div className="text-sm text-purple-100 mb-2">
                  {getNextTier()!.minPoints - userPoints} points to {getNextTier()!.name}
                </div>
                <div className="w-48 bg-purple-700 rounded-full h-3 mb-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-orange-400 h-3 rounded-full transition-all duration-500"
                    style={{ width: `${getProgressToNextTier()}%` }}
                  />
                </div>
                <div className="text-xs text-purple-200">
                  {Math.round(getProgressToNextTier())}% progress
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'overview', label: 'Overview', icon: TrendingUp },
          { id: 'rewards', label: 'Available Rewards', icon: Gift },
          { id: 'activity', label: 'Recent Activity', icon: Clock },
          { id: 'tiers', label: 'Membership Tiers', icon: Crown }
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
            {React.createElement(tab.icon, { className: 'w-4 h-4 mr-2' })}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    {userPoints.toLocaleString()}
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Total Points</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Lifetime earnings</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <ShoppingBag className="w-6 h-6 text-blue-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">1,250</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Points Redeemed</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">This year</p>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">3</span>
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Referrals</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">Friends referred</p>
              </div>
            </div>

            {/* Popular Rewards Preview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Popular Rewards
                </h3>
                <button 
                  onClick={() => setActiveTab('rewards')}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center"
                >
                  View All
                  <ArrowRight className="w-4 h-4 ml-1" />
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {availableRewards.filter(reward => reward.popular).map((reward) => (
                  <div key={reward.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{reward.title}</h4>
                      <span className="bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 px-2 py-1 rounded text-xs font-medium">
                        {reward.points} pts
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{reward.description}</p>
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                      Redeem Now
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'rewards' && (
          <motion.div
            key="rewards"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Available Rewards
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableRewards.map((reward, index) => (
                <motion.div
                  key={reward.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="border border-gray-200 dark:border-gray-700 rounded-lg p-6 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      {getCategoryIcon(reward.category)}
                    </div>
                    {reward.popular && (
                      <span className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 px-2 py-1 rounded-full text-xs font-medium">
                        Popular
                      </span>
                    )}
                  </div>
                  
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {reward.title}
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {reward.description}
                  </p>
                  
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-lg font-bold text-blue-600">
                      {reward.points} points
                    </span>
                    <span className="text-xs text-gray-500">
                      Expires in {reward.expiresIn}
                    </span>
                  </div>
                  
                  <button 
                    className={`w-full py-2 px-4 rounded-lg text-sm font-medium transition-colors ${
                      userPoints >= reward.points
                        ? 'bg-blue-600 text-white hover:bg-blue-700'
                        : 'bg-gray-200 dark:bg-gray-700 text-gray-500 cursor-not-allowed'
                    }`}
                    disabled={userPoints < reward.points}
                  >
                    {userPoints >= reward.points ? 'Redeem' : 'Insufficient Points'}
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div
            key="activity"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
              Recent Activity
            </h3>
            
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg"
                >
                  <div className="flex items-center">
                    <div className="mr-4">
                      {getActivityIcon(activity.type)}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">
                        {activity.description}
                      </h4>
                      <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(activity.date).toLocaleDateString()}
                        <span className="mx-2">•</span>
                        <span className="capitalize">{activity.category}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className={`text-lg font-semibold ${
                    activity.points > 0 ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {activity.points > 0 ? '+' : ''}{activity.points}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'tiers' && (
          <motion.div
            key="tiers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {tiers.map((tier, index) => (
              <motion.div
                key={tier.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border-2 ${
                  tier.id === currentTier ? 'border-blue-500' : 'border-transparent'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className={`p-3 bg-gradient-to-r ${tier.color} rounded-lg mr-4`}>
                      {React.createElement(tier.icon, { className: 'w-6 h-6 text-white' })}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {tier.name}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {tier.minPoints.toLocaleString()}+ points required
                      </p>
                    </div>
                  </div>
                  
                  {tier.id === currentTier && (
                    <div className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                      Current Tier
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Benefits</h4>
                    <ul className="space-y-2">
                      {tier.benefits.map((benefit, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {benefit}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Exclusive Perks</h4>
                    <ul className="space-y-2">
                      {tier.perks.map((perk, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                          <Star className="w-4 h-4 text-yellow-500 mr-2" />
                          {perk}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default LoyaltyRewardsProgram