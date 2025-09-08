'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain,
  Target,
  TrendingUp,
  Users,
  Heart,
  Star,
  Gift,
  Zap,
  Eye,
  BarChart3,
  Filter,
  Sparkles,
  Clock,
  ThumbsUp
} from 'lucide-react'

interface RecommendationCategory {
  id: string
  title: string
  description: string
  products: Array<{
    id: string
    name: string
    price: number
    originalPrice?: number
    rating: number
    image: string
    confidence: number
    reason: string
  }>
}

interface PersonalizationInsight {
  category: string
  value: string
  trend: 'up' | 'down' | 'stable'
  confidence: number
}

const AIPersonalization: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<string>('for-you')
  const [personalizedData, setPersonalizedData] = useState<any>(null)
  const [isLearning, setIsLearning] = useState(false)

  const [recommendations] = useState<RecommendationCategory[]>([
    {
      id: 'for-you',
      title: 'Recommended for You',
      description: 'AI-curated products based on your preferences and behavior',
      products: [
        {
          id: '1',
          name: 'Smart Wireless Headphones',
          price: 199.99,
          originalPrice: 249.99,
          rating: 4.8,
          image: 'https://via.placeholder.com/200x200/3B82F6/white?text=Headphones',
          confidence: 92,
          reason: 'Based on your audio equipment browsing history'
        },
        {
          id: '2',
          name: 'Ergonomic Office Chair',
          price: 299.99,
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/10B981/white?text=Chair',
          confidence: 87,
          reason: 'Similar to items in your wishlist'
        },
        {
          id: '3',
          name: 'Premium Coffee Maker',
          price: 159.99,
          originalPrice: 199.99,
          rating: 4.9,
          image: 'https://via.placeholder.com/200x200/F59E0B/white?text=Coffee',
          confidence: 84,
          reason: 'Frequently bought with your recent purchases'
        }
      ]
    },
    {
      id: 'trending',
      title: 'Trending in Your Area',
      description: 'Popular products among users with similar preferences',
      products: [
        {
          id: '4',
          name: 'Portable Power Bank',
          price: 49.99,
          rating: 4.5,
          image: 'https://via.placeholder.com/200x200/8B5CF6/white?text=PowerBank',
          confidence: 79,
          reason: 'Trending among tech enthusiasts in your area'
        },
        {
          id: '5',
          name: 'Yoga Mat Set',
          price: 39.99,
          rating: 4.7,
          image: 'https://via.placeholder.com/200x200/EF4444/white?text=Yoga',
          confidence: 76,
          reason: 'Popular with users who bought fitness equipment'
        }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seasonal Picks',
      description: 'Perfect products for the current season and upcoming events',
      products: [
        {
          id: '6',
          name: 'Winter Jacket',
          price: 129.99,
          originalPrice: 179.99,
          rating: 4.6,
          image: 'https://via.placeholder.com/200x200/6366F1/white?text=Jacket',
          confidence: 88,
          reason: 'Winter season recommendation'
        }
      ]
    }
  ])

  const [insights] = useState<PersonalizationInsight[]>([
    { category: 'Shopping Frequency', value: '2.3x per week', trend: 'up', confidence: 85 },
    { category: 'Preferred Categories', value: 'Electronics, Home', trend: 'stable', confidence: 92 },
    { category: 'Price Sensitivity', value: 'Mid-range preferred', trend: 'stable', confidence: 78 },
    { category: 'Brand Loyalty', value: 'Moderate', trend: 'up', confidence: 81 }
  ])

  useEffect(() => {
    // Simulate AI learning process
    const interval = setInterval(() => {
      setIsLearning(prev => !prev)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500 rotate-90" />
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
          <Brain className="w-4 h-4 mr-2" />
          AI-Powered Personalization Engine
          {isLearning && (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="ml-2"
            >
              <Sparkles className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Personalized Shopping Experience
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Our AI engine learns from your behavior to deliver perfectly tailored product recommendations and shopping experiences.
        </p>
      </div>

      {/* Personalization Insights */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
        <div className="flex items-center mb-6">
          <BarChart3 className="w-5 h-5 text-blue-600 mr-2" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Your Shopping Insights
          </h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {insights.map((insight, index) => (
            <motion.div
              key={insight.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {insight.category}
                </span>
                {getTrendIcon(insight.trend)}
              </div>
              <div className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                {insight.value}
              </div>
              <div className="flex items-center">
                <div className="flex-1 bg-gray-200 dark:bg-gray-600 rounded-full h-2 mr-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                    style={{ width: `${insight.confidence}%` }}
                  />
                </div>
                <span className="text-xs text-gray-500">{insight.confidence}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Recommendation Categories */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Personalized Recommendations
          </h3>
          
          <div className="flex flex-wrap gap-2">
            {recommendations.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                }`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {recommendations.map((category) => 
            activeCategory === category.id && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="p-6"
              >
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {category.description}
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {category.products.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="relative mb-4">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-full px-2 py-1 text-xs font-medium text-blue-600">
                          {product.confidence}% match
                        </div>
                      </div>
                      
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h4>
                      
                      <div className="flex items-center mb-2">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-1">
                          {product.rating}
                        </span>
                      </div>
                      
                      <div className="flex items-center justify-between mb-3">
                        <div>
                          <span className="text-lg font-bold text-gray-900 dark:text-white">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="text-sm text-gray-500 line-through ml-2">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-2 mb-3">
                        <div className="flex items-center">
                          <Target className="w-4 h-4 text-blue-600 mr-2" />
                          <span className="text-xs text-blue-800 dark:text-blue-300">
                            {product.reason}
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                          Add to Cart
                        </button>
                        <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors">
                          <Heart className="w-4 h-4 text-gray-500" />
                        </button>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )
          )}
        </AnimatePresence>
      </div>

      {/* AI Learning Status */}
      <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="p-3 bg-purple-100 dark:bg-purple-900/50 rounded-lg mr-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                AI Learning Progress
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Continuously improving recommendations based on your interactions
              </p>
            </div>
          </div>
          
          <div className="text-right">
            <div className="text-2xl font-bold text-purple-600 mb-1">94%</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">Accuracy Score</div>
          </div>
        </div>
        
        <div className="mt-4 flex items-center">
          <Clock className="w-4 h-4 text-gray-500 mr-2" />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Last updated: 2 minutes ago
          </span>
          {isLearning && (
            <motion.div
              animate={{ opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="ml-2 flex items-center text-green-600"
            >
              <div className="w-2 h-2 bg-green-500 rounded-full mr-1"></div>
              <span className="text-xs">Learning active</span>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AIPersonalization