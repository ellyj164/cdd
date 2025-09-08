'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Building,
  Users,
  ShoppingCart,
  Video,
  Star,
  TrendingUp,
  DollarSign,
  Package,
  MessageSquare,
  Handshake,
  Globe,
  Award,
  Target,
  Zap,
  Eye,
  Play,
  UserCheck,
  Shield,
  Clock,
  CheckCircle,
  ArrowRight,
  Activity,
  BarChart3,
  Settings,
  Crown,
  FileText
} from 'lucide-react'

interface MarketplaceFeature {
  id: string
  title: string
  description: string
  category: 'b2b' | 'c2c' | 'live' | 'influencer'
  status: 'active' | 'beta' | 'coming-soon'
  users: number
  growth: number
  revenue?: number
}

interface LiveStream {
  id: string
  title: string
  host: string
  viewers: number
  products: number
  sales: number
  status: 'live' | 'scheduled' | 'ended'
  thumbnail: string
  category: string
}

const AdvancedMarketplaceFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('b2b')
  const [selectedStream, setSelectedStream] = useState<string | null>(null)

  const marketplaceFeatures: MarketplaceFeature[] = [
    {
      id: 'b2b-procurement',
      title: 'B2B Procurement Platform',
      description: 'Enterprise procurement with approval workflows and bulk ordering',
      category: 'b2b',
      status: 'active',
      users: 15420,
      growth: 24.5,
      revenue: 2850000
    },
    {
      id: 'quote-management',
      title: 'Quote Management System',
      description: 'RFQ processing with competitive bidding and negotiations',
      category: 'b2b',
      status: 'active',
      users: 8340,
      growth: 18.2,
      revenue: 1200000
    },
    {
      id: 'c2c-marketplace',
      title: 'Peer-to-Peer Marketplace',
      description: 'Consumer-to-consumer trading with escrow and safety features',
      category: 'c2c',
      status: 'active',
      users: 45680,
      growth: 35.7,
      revenue: 890000
    },
    {
      id: 'live-shopping',
      title: 'Live Shopping Streams',
      description: 'Interactive video commerce with real-time purchasing',
      category: 'live',
      status: 'beta',
      users: 23450,
      growth: 87.3,
      revenue: 450000
    },
    {
      id: 'influencer-program',
      title: 'Influencer Partnership Program',
      description: 'Creator collaboration with attribution tracking and commissions',
      category: 'influencer',
      status: 'active',
      users: 12890,
      growth: 42.1,
      revenue: 680000
    }
  ]

  const liveStreams: LiveStream[] = [
    {
      id: '1',
      title: 'Tech Tuesday: Latest Gadgets Showcase',
      host: 'TechGuru Sarah',
      viewers: 2847,
      products: 15,
      sales: 23400,
      status: 'live',
      thumbnail: 'https://via.placeholder.com/300x200/3B82F6/white?text=Tech+Show',
      category: 'Electronics'
    },
    {
      id: '2',
      title: 'Home Decor Makeover Special',
      host: 'Design Expert Mike',
      viewers: 1653,
      products: 8,
      sales: 15600,
      status: 'live',
      thumbnail: 'https://via.placeholder.com/300x200/10B981/white?text=Home+Decor',
      category: 'Home & Garden'
    },
    {
      id: '3',
      title: 'Fashion Forward: Spring Collection',
      host: 'Style Influencer Emma',
      viewers: 0,
      products: 25,
      sales: 0,
      status: 'scheduled',
      thumbnail: 'https://via.placeholder.com/300x200/F59E0B/white?text=Fashion',
      category: 'Fashion'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'beta':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'coming-soon':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      case 'live':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'scheduled':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'ended':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'b2b':
        return Building
      case 'c2c':
        return Users
      case 'live':
        return Video
      case 'influencer':
        return Star
      default:
        return Package
    }
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(num)
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
          <Crown className="w-4 h-4 mr-2" />
          Advanced Marketplace Features
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Next-Generation Commerce Ecosystem
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Cutting-edge marketplace features including B2B procurement, peer-to-peer trading, live shopping, and influencer partnerships.
        </p>
      </div>

      {/* Revenue Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: 'B2B Revenue', 
            value: formatCurrency(4050000),
            growth: '+22.3%',
            icon: Building,
            color: 'blue'
          },
          { 
            label: 'C2C Transactions', 
            value: formatNumber(156000),
            growth: '+35.7%',
            icon: Handshake,
            color: 'green'
          },
          { 
            label: 'Live Commerce', 
            value: formatCurrency(450000),
            growth: '+87.3%',
            icon: Video,
            color: 'red'
          },
          { 
            label: 'Influencer Sales', 
            value: formatCurrency(680000),
            growth: '+42.1%',
            icon: Star,
            color: 'purple'
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
                <span className="text-sm font-medium text-green-600">{stat.growth}</span>
              </div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'b2b', label: 'B2B Marketplace', icon: Building },
          { id: 'c2c', label: 'C2C Trading', icon: Users },
          { id: 'live', label: 'Live Shopping', icon: Video },
          { id: 'influencer', label: 'Influencer Program', icon: Star }
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
        {activeTab === 'b2b' && (
          <motion.div
            key="b2b"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* B2B Platform Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Building className="w-6 h-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Enterprise B2B Platform
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Key Features</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Multi-level Approval Workflows', desc: 'Customizable approval chains for purchase orders' },
                      { title: 'Bulk Ordering & Pricing', desc: 'Volume discounts and wholesale pricing tiers' },
                      { title: 'Corporate Account Management', desc: 'Company hierarchies and department budgets' },
                      { title: 'Integration APIs', desc: 'ERP, accounting, and procurement system integration' },
                      { title: 'Contract Management', desc: 'Digital contracts with e-signature support' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{feature.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Active Corporate Accounts', value: '1,247', change: '+18%' },
                      { label: 'Average Order Value', value: '$12,450', change: '+24%' },
                      { label: 'Quote Response Time', value: '2.3 hours', change: '-15%' },
                      { label: 'Approval Efficiency', value: '94%', change: '+8%' }
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{metric.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Quote Management System */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                RFQ & Quote Management
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Active RFQs',
                    value: '156',
                    description: 'Request for quotes in progress',
                    icon: FileText,
                    color: 'blue'
                  },
                  {
                    title: 'Average Response Time',
                    value: '4.2 hrs',
                    description: 'Time to receive first quote',
                    icon: Clock,
                    color: 'green'
                  },
                  {
                    title: 'Quote Acceptance Rate',
                    value: '78%',
                    description: 'Percentage of quotes converted',
                    icon: CheckCircle,
                    color: 'purple'
                  }
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.title} className="text-center">
                      <div className={`inline-flex p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg mb-3`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{stat.title}</div>
                      <div className="text-xs text-gray-500">{stat.description}</div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'c2c' && (
          <motion.div
            key="c2c"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* C2C Marketplace */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Users className="w-6 h-6 text-green-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Peer-to-Peer Marketplace
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Safety & Trust Features</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Identity Verification', desc: 'Multi-factor identity confirmation for all users' },
                      { title: 'Escrow Payment System', desc: 'Secure payment holding until delivery confirmation' },
                      { title: 'Dispute Mediation', desc: 'Professional mediation service for conflicts' },
                      { title: 'Rating & Review System', desc: 'Comprehensive feedback and reputation tracking' },
                      { title: 'Insurance Coverage', desc: 'Transaction protection up to $10,000' }
                    ].map((feature, i) => (
                      <div key={i} className="flex items-start">
                        <Shield className="w-5 h-5 text-green-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{feature.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{feature.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Marketplace Statistics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Active Users', value: '45,680', change: '+35%' },
                      { label: 'Monthly Transactions', value: '12,340', change: '+28%' },
                      { label: 'Success Rate', value: '96.8%', change: '+2%' },
                      { label: 'Average Rating', value: '4.7/5', change: '+0.2' }
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{metric.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Categories Performance */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Popular Categories
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { category: 'Electronics', listings: 8420, sales: '$2.1M', growth: 45 },
                  { category: 'Fashion', listings: 15680, sales: '$1.8M', growth: 32 },
                  { category: 'Home & Garden', listings: 6790, sales: '$1.2M', growth: 28 },
                  { category: 'Sports & Outdoors', listings: 4320, sales: '$890K', growth: 38 }
                ].map((cat, index) => (
                  <motion.div
                    key={cat.category}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{cat.category}</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Listings</span>
                        <span className="font-medium text-gray-900 dark:text-white">{formatNumber(cat.listings)}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Sales</span>
                        <span className="font-medium text-gray-900 dark:text-white">{cat.sales}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${cat.growth}%` }}
                        />
                      </div>
                      <div className="text-xs text-gray-500 text-center">{cat.growth}% growth</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'live' && (
          <motion.div
            key="live"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Live Shopping Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center">
                  <Video className="w-6 h-6 text-red-600 mr-3" />
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                    Live Shopping Experience
                  </h3>
                </div>
                <div className="flex items-center text-red-600">
                  <div className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">2 Live Now</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
                {[
                  { label: 'Live Viewers', value: '4,500', icon: Eye },
                  { label: 'Active Streams', value: '2', icon: Video },
                  { label: 'Products Featured', value: '23', icon: Package },
                  { label: 'Live Sales', value: '$39K', icon: DollarSign }
                ].map((stat) => {
                  const Icon = stat.icon
                  return (
                    <div key={stat.label} className="text-center">
                      <div className="p-3 bg-red-100 dark:bg-red-900/30 rounded-lg inline-flex mb-3">
                        <Icon className="w-6 h-6 text-red-600" />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{stat.value}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</div>
                    </div>
                  )
                })}
              </div>

              {/* Live Streams Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveStreams.map((stream, index) => (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedStream(stream.id)}
                  >
                    <div className="relative">
                      <img 
                        src={stream.thumbnail} 
                        alt={stream.title}
                        className="w-full h-40 object-cover"
                      />
                      <div className="absolute top-2 left-2">
                        <div className={`px-2 py-1 rounded text-xs font-medium ${getStatusColor(stream.status)}`}>
                          {stream.status === 'live' && <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-1 animate-pulse"></span>}
                          {stream.status.toUpperCase()}
                        </div>
                      </div>
                      {stream.status === 'live' && (
                        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white px-2 py-1 rounded text-xs">
                          {formatNumber(stream.viewers)} watching
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30">
                        <Play className="w-12 h-12 text-white opacity-80" />
                      </div>
                    </div>
                    
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
                        {stream.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                        by {stream.host} • {stream.category}
                      </p>
                      
                      <div className="flex items-center justify-between text-sm">
                        <div className="flex items-center space-x-4">
                          <span className="text-gray-600 dark:text-gray-300">
                            {stream.products} products
                          </span>
                          {stream.status === 'live' && (
                            <span className="text-green-600 font-medium">
                              ${formatNumber(stream.sales)} sales
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Live Shopping Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Interactive Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Real-time Chat',
                    description: 'Interactive viewer engagement with moderation',
                    icon: MessageSquare,
                    features: ['Live Q&A', 'Polls & Reactions', 'Chat moderation', 'VIP comments']
                  },
                  {
                    title: 'Instant Purchase',
                    description: 'One-click buying during live streams',
                    icon: ShoppingCart,
                    features: ['Flash sales', 'Limited offers', 'Quick checkout', 'Saved payment methods']
                  },
                  {
                    title: 'Stream Analytics',
                    description: 'Comprehensive performance tracking',
                    icon: BarChart3,
                    features: ['Viewer metrics', 'Engagement rates', 'Conversion tracking', 'Revenue analysis']
                  }
                ].map((feature) => {
                  const Icon = feature.icon
                  return (
                    <div key={feature.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-3">
                          <Icon className="w-5 h-5 text-blue-600" />
                        </div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">{feature.title}</h4>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{feature.description}</p>
                      <ul className="space-y-1">
                        {feature.features.map((item, i) => (
                          <li key={i} className="flex items-center text-xs text-gray-500">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'influencer' && (
          <motion.div
            key="influencer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Influencer Program */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <Star className="w-6 h-6 text-purple-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  Influencer Partnership Program
                </h3>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Program Benefits</h4>
                  <div className="space-y-3">
                    {[
                      { title: 'Tiered Commission Structure', desc: 'Up to 15% commission based on performance' },
                      { title: 'Real-time Attribution', desc: 'Advanced tracking across all channels' },
                      { title: 'Creator Dashboard', desc: 'Comprehensive analytics and earnings tracking' },
                      { title: 'Exclusive Products', desc: 'Early access to new launches and collections' },
                      { title: 'Marketing Support', desc: 'Co-branded content and campaign assistance' }
                    ].map((benefit, i) => (
                      <div key={i} className="flex items-start">
                        <Award className="w-5 h-5 text-purple-500 mr-3 mt-0.5" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{benefit.title}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{benefit.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'Active Influencers', value: '12,890', change: '+42%' },
                      { label: 'Total Commissions Paid', value: '$1.2M', change: '+38%' },
                      { label: 'Conversion Rate', value: '8.4%', change: '+1.2%' },
                      { label: 'Average Order Value', value: '$145', change: '+18%' }
                    ].map((metric, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</div>
                          <div className="text-lg font-semibold text-gray-900 dark:text-white">{metric.value}</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{metric.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Top Performers */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Top Performing Influencers
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    name: 'Sarah Tech Reviews',
                    category: 'Technology',
                    followers: '2.1M',
                    sales: '$145K',
                    commission: '$21.8K',
                    conversion: '12.4%',
                    tier: 'Gold'
                  },
                  {
                    name: 'Mike Home Design',
                    category: 'Home & Garden',
                    followers: '890K',
                    sales: '$98K',
                    commission: '$14.7K',
                    conversion: '9.8%',
                    tier: 'Silver'
                  },
                  {
                    name: 'Emma Fashion Forward',
                    category: 'Fashion',
                    followers: '1.5M',
                    sales: '$127K',
                    commission: '$19.1K',
                    conversion: '11.2%',
                    tier: 'Gold'
                  }
                ].map((influencer, index) => (
                  <motion.div
                    key={influencer.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
                          {influencer.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-gray-900 dark:text-white">{influencer.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{influencer.category}</p>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded text-xs font-medium ${
                        influencer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                        'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
                      }`}>
                        {influencer.tier}
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Followers</span>
                        <span className="font-medium text-gray-900 dark:text-white">{influencer.followers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Sales Generated</span>
                        <span className="font-medium text-gray-900 dark:text-white">{influencer.sales}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Commission Earned</span>
                        <span className="font-medium text-green-600">{influencer.commission}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-300">Conversion Rate</span>
                        <span className="font-medium text-gray-900 dark:text-white">{influencer.conversion}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Attribution & Tracking */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Target className="w-5 h-5 mr-2" />
                Advanced Attribution & Tracking
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Tracking Capabilities</h4>
                  <div className="space-y-3">
                    {[
                      'Multi-touch attribution modeling',
                      'Cross-device customer journeys',
                      'UTM parameter automation',
                      'Social media link tracking',
                      'Video engagement analytics',
                      'Promo code performance'
                    ].map((feature, i) => (
                      <div key={i} className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Real-time Dashboard</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Click-through Rate</span>
                        <span className="text-lg font-bold text-blue-600">8.4%</span>
                      </div>
                      <div className="w-full bg-blue-200 dark:bg-blue-800 rounded-full h-2">
                        <div className="bg-blue-600 h-2 rounded-full" style={{ width: '84%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Conversion Rate</span>
                        <span className="text-lg font-bold text-green-600">12.1%</span>
                      </div>
                      <div className="w-full bg-green-200 dark:bg-green-800 rounded-full h-2">
                        <div className="bg-green-600 h-2 rounded-full" style={{ width: '121%' }}></div>
                      </div>
                    </div>
                    
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-600 dark:text-gray-300">Revenue Attribution</span>
                        <span className="text-lg font-bold text-purple-600">$680K</span>
                      </div>
                      <div className="text-xs text-gray-500">This month</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default AdvancedMarketplaceFeatures