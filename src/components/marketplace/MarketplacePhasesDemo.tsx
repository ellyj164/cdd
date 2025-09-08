'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  ShoppingCart,
  Package,
  TrendingUp,
  Users,
  Star,
  Shield,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
  Play,
  Eye,
  Award,
  Target,
  Rocket,
  Heart,
  Brain,
  Gift,
  RefreshCw,
  Building,
  Video,
  Search as SearchIcon,
  Award as AwardIcon
} from 'lucide-react'

import IntelligentSearch from '../IntelligentSearch'
import CatalogManagement from '../CatalogManagement'
import AdvancedShoppingCart from '../AdvancedShoppingCart'
import ProfessionalSellerConsole from '../ProfessionalSellerConsole'
import AIPersonalization from '../AIPersonalization'
import LoyaltyRewardsProgram from '../LoyaltyRewardsProgram'
import SubscriptionReplenishment from '../SubscriptionReplenishment'
import OperationsCompliance from '../OperationsCompliance'
import AdvancedMarketplaceFeatures from '../AdvancedMarketplaceFeatures'
import TechnicalExcellence from '../TechnicalExcellence'

interface Phase {
  id: string
  title: string
  description: string
  icon: any
  status: 'complete' | 'in-progress' | 'planned'
  features: string[]
  component?: React.ComponentType<any>
  componentProps?: any
}

const MarketplacePhasesDemo: React.FC = () => {
  const [activePhase, setActivePhase] = useState<string | null>(null)
  const [activeDemo, setActiveDemo] = useState<string | null>(null)

  const phases: Phase[] = [
    {
      id: 'phase1',
      title: 'Phase 1: Enterprise Authentication',
      description: 'Complete authentication system with multi-channel registration, KYC verification, and smart onboarding',
      icon: Shield,
      status: 'complete',
      features: [
        'Multi-channel registration (email, phone, social, SSO)',
        'OTP verification with progressive backoff',
        '2FA enrollment and session management',
        'KYC verification for individuals and businesses',
        'Smart onboarding flows with save & resume',
        'Device fingerprinting and security alerts'
      ]
    },
    {
      id: 'phase2',
      title: 'Phase 2: Discovery & Catalog Management',
      description: 'Intelligent search capabilities and professional catalog management tools',
      icon: Search,
      status: 'complete',
      features: [
        'Intelligent search with voice and image support',
        'Natural language search processing',
        'Advanced product catalog management',
        'Bulk product operations and import/export',
        'Real-time inventory tracking',
        'Product performance analytics'
      ],
      component: IntelligentSearch,
      componentProps: { onSearch: (query: string) => console.log('Search:', query) }
    },
    {
      id: 'phase3',
      title: 'Phase 3: Shopping Experience',
      description: 'Advanced shopping cart, checkout process, and payment integration',
      icon: ShoppingCart,
      status: 'complete',
      features: [
        'Multi-seller cart grouping',
        'Smart coupon and discount system',
        'Multiple shipping options',
        'Save for later functionality',
        'Real-time price calculations',
        'Secure checkout with multiple payment methods'
      ],
      component: AdvancedShoppingCart
    },
    {
      id: 'phase4',
      title: 'Phase 4: Seller Tools',
      description: 'Professional seller console with analytics and inventory management',
      icon: TrendingUp,
      status: 'complete',
      features: [
        'Comprehensive seller dashboard',
        'Real-time sales analytics',
        'Inventory management tools',
        'Performance metrics and insights',
        'Bulk product management',
        'Customer communication tools'
      ],
      component: ProfessionalSellerConsole,
      componentProps: { sellerId: 'demo-seller', sellerName: 'Demo Store' }
    },
    {
      id: 'phase5',
      title: 'Phase 5: Content & Personalization',
      description: 'AI-powered personalization, loyalty programs, and subscription services',
      icon: Brain,
      status: 'complete',
      features: [
        'AI-powered personalization engine',
        'Loyalty & rewards program with tiered memberships',
        'Subscription & replenishment services',
        'Global localization and currency support',
        'Dynamic content management system',
        'Machine learning recommendations'
      ],
      component: AIPersonalization
    },
    {
      id: 'phase6',
      title: 'Phase 6: Operations & Compliance',
      description: 'Tax framework, shipping logistics, accessibility, and security compliance',
      icon: Shield,
      status: 'complete',
      features: [
        'Global tax calculation and legal framework',
        'Multi-carrier shipping and logistics integration',
        'WCAG 2.2 AA accessibility compliance',
        'Comprehensive security and privacy controls',
        'Advanced fraud prevention systems',
        'Real-time compliance monitoring'
      ],
      component: OperationsCompliance
    },
    {
      id: 'phase7',
      title: 'Phase 7: Advanced Features',
      description: 'B2B marketplace, C2C trading, live shopping, and influencer programs',
      icon: Building,
      status: 'complete',
      features: [
        'B2B marketplace with enterprise procurement',
        'C2C marketplace with escrow and safety features',
        'Live shopping streams with real-time interaction',
        'Influencer partnership program with attribution',
        'Quote management and RFQ systems',
        'Multi-channel commerce solutions'
      ],
      component: AdvancedMarketplaceFeatures
    },
    {
      id: 'phase8',
      title: 'Phase 8: Technical Excellence',
      description: 'SEO optimization, analytics, support infrastructure, and regulatory compliance',
      icon: AwardIcon,
      status: 'complete',
      features: [
        'Advanced SEO optimization and social sharing',
        'Comprehensive analytics and reporting dashboard',
        'AI-powered support infrastructure',
        'Regulatory compliance and audit systems',
        'Performance monitoring and optimization',
        'API access and technical integrations'
      ],
      component: TechnicalExcellence
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'complete':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'planned':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete':
        return <CheckCircle className="w-4 h-4" />
      case 'in-progress':
        return <Zap className="w-4 h-4" />
      case 'planned':
        return <Eye className="w-4 h-4" />
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
                <Award className="w-4 h-4 mr-2" />
                Ultimate E-Commerce Platform - All 8 Phases Complete
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Enterprise Marketplace
                <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Platform Demo
                </span>
              </h1>
              
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                Experience our complete enterprise-grade e-commerce platform with all 8 phases implemented: 
                authentication, discovery, shopping experience, seller tools, personalization, compliance, advanced features, and technical excellence.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveDemo('overview')}
                  className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                >
                  <Play className="w-5 h-5 mr-2" />
                  View Platform Demo
                </motion.button>
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => window.open('/auth/demo', '_blank')}
                  className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center"
                >
                  <Shield className="w-5 h-5 mr-2" />
                  Auth Demo
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
          <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { 
              label: 'Phases Complete', 
              value: '8/8', 
              icon: CheckCircle, 
              bgClass: 'bg-green-100 dark:bg-green-900/30',
              iconClass: 'text-green-600' 
            },
            { 
              label: 'Features Implemented', 
              value: '50+', 
              icon: Star, 
              bgClass: 'bg-blue-100 dark:bg-blue-900/30',
              iconClass: 'text-blue-600' 
            },
            { 
              label: 'Security Standards', 
              value: '99.9%', 
              icon: Shield, 
              bgClass: 'bg-purple-100 dark:bg-purple-900/30',
              iconClass: 'text-purple-600' 
            },
            { 
              label: 'Enterprise Ready', 
              value: '100%', 
              icon: Award, 
              bgClass: 'bg-orange-100 dark:bg-orange-900/30',
              iconClass: 'text-orange-600' 
            }
          ].map((stat, index) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className={`inline-flex p-3 ${stat.bgClass} rounded-lg mb-3`}>
                  <Icon className={`w-6 h-6 ${stat.iconClass}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-300">
                  {stat.label}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Implementation Phases */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Implementation Phases
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Our systematic approach to building the ultimate e-commerce platform, 
            with each phase building upon the previous foundation.
          </p>
        </div>

        <div className="space-y-6">
          {phases.map((phase, index) => {
            const Icon = phase.icon
            const isExpanded = activePhase === phase.id
            
            return (
              <motion.div
                key={phase.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden shadow-sm hover:shadow-lg transition-shadow"
              >
                <div 
                  className="p-6 cursor-pointer"
                  onClick={() => setActivePhase(isExpanded ? null : phase.id)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-1">
                          {phase.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {phase.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <span className={`inline-flex items-center px-3 py-1 text-sm font-medium rounded-full ${getStatusColor(phase.status)}`}>
                        {getStatusIcon(phase.status)}
                        <span className="ml-1 capitalize">{phase.status.replace('-', ' ')}</span>
                      </span>
                      
                      {phase.component && phase.status === 'complete' && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setActiveDemo(phase.id)
                          }}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium flex items-center"
                        >
                          <Play className="w-4 h-4 mr-1" />
                          Demo
                        </button>
                      )}
                      
                      <ArrowRight 
                        className={`w-5 h-5 text-gray-400 transform transition-transform ${
                          isExpanded ? 'rotate-90' : ''
                        }`} 
                      />
                    </div>
                  </div>
                </div>

                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      className="border-t border-gray-200 dark:border-gray-700"
                    >
                      <div className="p-6">
                        <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                          Key Features:
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {phase.features.map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center">
                              <CheckCircle className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                              <span className="text-sm text-gray-600 dark:text-gray-300">
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </div>

      {/* Technology Stack */}
      <div className="bg-gray-50 dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Technology Stack
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Built with modern, scalable technologies
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
            {[
              'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
              'Framer Motion', 'Zustand', 'JWT', 'REST APIs'
            ].map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center mx-auto mb-3">
                  <Globe className="w-8 h-8 text-blue-600" />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  {tech}
                </span>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Demo Modal */}
      <AnimatePresence>
        {activeDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-7xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeDemo === 'overview' ? 'Platform Overview' : 
                   phases.find(p => p.id === activeDemo)?.title || 'Demo'}
                </h3>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {activeDemo === 'overview' && (
                  <div className="text-center py-16">
                    <Rocket className="w-24 h-24 text-blue-600 mx-auto mb-6" />
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                      Welcome to the Ultimate E-Commerce Platform
                    </h2>
                    <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
                      Our platform represents the culmination of enterprise-grade e-commerce development, 
                      featuring advanced authentication, intelligent discovery, sophisticated shopping experiences, 
                      and professional seller tools.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                      {phases.filter(p => p.component && p.status === 'complete').map((phase) => {
                        const Icon = phase.icon
                        return (
                          <button
                            key={phase.id}
                            onClick={() => setActiveDemo(phase.id)}
                            className="p-6 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors text-left"
                          >
                            <Icon className="w-8 h-8 text-blue-600 mb-3" />
                            <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                              {phase.title}
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-300">
                              {phase.description}
                            </p>
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
                
                {activeDemo !== 'overview' && (() => {
                  const phase = phases.find(p => p.id === activeDemo)
                  if (phase?.component) {
                    const Component = phase.component
                    return <Component {...(phase.componentProps || {})} />
                  }
                  return null
                })()}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </div>
  )
}

export default MarketplacePhasesDemo