import React, { useState, useEffect } from 'react';
import { 
  Brain, 
  TrendingUp, 
  Eye, 
  ShoppingCart, 
  Heart, 
  Star, 
  Sparkles, 
  Users, 
  Clock,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

// AI Recommendation Engine Component
export const AIRecommendationEngine = ({ 
  userId, 
  currentProduct, 
  viewHistory = [], 
  purchaseHistory = [], 
  onAddToCart, 
  onAddToWishlist 
}) => {
  const [recommendations, setRecommendations] = useState({
    similarProducts: [],
    frequentlyBoughtTogether: [],
    basedOnViewing: [],
    trending: [],
    personalizedForYou: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('similar');

  // Simulate AI recommendation generation
  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock recommendation data with AI scoring
    const mockRecommendations = {
      similarProducts: [
        {
          id: 101,
          name: 'Neural Processing Unit V2',
          price: 899.99,
          originalPrice: 1199.99,
          rating: 4.8,
          reviews: 1247,
          imageUrl: 'https://placehold.co/300x300/667eea/ffffff?text=AI+Chip',
          aiScore: 95,
          similarity: 'Advanced processor technology',
          tags: ['AI', 'High Performance', 'Neural Computing']
        },
        {
          id: 102,
          name: 'Quantum Memory Module',
          price: 549.99,
          rating: 4.7,
          reviews: 823,
          imageUrl: 'https://placehold.co/300x300/10b981/ffffff?text=Memory',
          aiScore: 88,
          similarity: 'Compatible hardware component',
          tags: ['Memory', 'High Speed', 'Compatible']
        },
        {
          id: 103,
          name: 'Smart Cooling System',
          price: 199.99,
          rating: 4.6,
          reviews: 456,
          imageUrl: 'https://placehold.co/300x300/f59e0b/ffffff?text=Cooling',
          aiScore: 82,
          similarity: 'Essential for high-performance systems',
          tags: ['Cooling', 'Performance', 'Essential']
        }
      ],
      frequentlyBoughtTogether: [
        {
          id: 201,
          name: 'Professional Keyboard',
          price: 129.99,
          rating: 4.5,
          reviews: 234,
          imageUrl: 'https://placehold.co/300x300/8b5cf6/ffffff?text=Keyboard',
          purchaseRate: 73
        },
        {
          id: 202,
          name: 'Ergonomic Mouse',
          price: 79.99,
          rating: 4.4,
          reviews: 189,
          imageUrl: 'https://placehold.co/300x300/06b6d4/ffffff?text=Mouse',
          purchaseRate: 68
        }
      ],
      basedOnViewing: [
        {
          id: 301,
          name: 'Advanced Graphics Card',
          price: 699.99,
          rating: 4.9,
          reviews: 567,
          imageUrl: 'https://placehold.co/300x300/ef4444/ffffff?text=GPU',
          viewSimilarity: 'Similar viewing patterns'
        }
      ],
      trending: [
        {
          id: 401,
          name: 'VR Headset Pro',
          price: 599.99,
          rating: 4.7,
          reviews: 890,
          imageUrl: 'https://placehold.co/300x300/ec4899/ffffff?text=VR',
          trendScore: 94,
          trendReason: 'Trending in AI Technology'
        }
      ],
      personalizedForYou: [
        {
          id: 501,
          name: 'Smart Home Hub',
          price: 149.99,
          rating: 4.6,
          reviews: 345,
          imageUrl: 'https://placehold.co/300x300/84cc16/ffffff?text=Hub',
          personalScore: 91,
          reason: 'Based on your interest in smart technology'
        }
      ]
    };

    setRecommendations(mockRecommendations);
    setIsLoading(false);
  };

  useEffect(() => {
    generateRecommendations();
  }, [currentProduct, userId]);

  // Product Card Component
  const ProductCard = ({ product, showReason = false, reasonLabel = '', onAction }) => (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="relative">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform"
        />
        
        {/* AI Score Badge */}
        {product.aiScore && (
          <div className="absolute top-2 left-2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
            <Brain className="w-3 h-3 mr-1" />
            {product.aiScore}% match
          </div>
        )}

        {/* Discount Badge */}
        {product.originalPrice && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button
            onClick={() => onAddToWishlist?.(product)}
            className="p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <Heart className="w-4 h-4 text-gray-600" />
          </button>
          <button
            onClick={() => onAddToCart?.(product)}
            className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            <ShoppingCart className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
            ({product.reviews})
          </span>
        </div>

        {/* AI Reason */}
        {showReason && (product.similarity || product.reason || product.viewSimilarity || product.trendReason) && (
          <div className="text-xs text-purple-600 dark:text-purple-400 mb-2 flex items-center">
            <Sparkles className="w-3 h-3 mr-1" />
            {product.similarity || product.reason || product.viewSimilarity || product.trendReason}
          </div>
        )}

        {/* Purchase Rate for Frequently Bought Together */}
        {product.purchaseRate && (
          <div className="text-xs text-green-600 dark:text-green-400 mb-2 flex items-center">
            <Users className="w-3 h-3 mr-1" />
            {product.purchaseRate}% of customers also buy this
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            {product.originalPrice && (
              <div className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </div>
            )}
          </div>
          
          {/* Tags */}
          {product.tags && (
            <div className="flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const tabs = [
    { id: 'similar', label: 'Similar Products', icon: Brain, count: recommendations.similarProducts.length },
    { id: 'together', label: 'Bought Together', icon: Users, count: recommendations.frequentlyBoughtTogether.length },
    { id: 'viewing', label: 'Based on Viewing', icon: Eye, count: recommendations.basedOnViewing.length },
    { id: 'trending', label: 'Trending', icon: TrendingUp, count: recommendations.trending.length },
    { id: 'personal', label: 'For You', icon: Sparkles, count: recommendations.personalizedForYou.length }
  ];

  const getCurrentRecommendations = () => {
    switch (activeTab) {
      case 'similar': return recommendations.similarProducts;
      case 'together': return recommendations.frequentlyBoughtTogether;
      case 'viewing': return recommendations.basedOnViewing;
      case 'trending': return recommendations.trending;
      case 'personal': return recommendations.personalizedForYou;
      default: return [];
    }
  };

  if (isLoading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex items-center justify-center">
          <RefreshCw className="w-8 h-8 animate-spin text-purple-600 mr-3" />
          <span className="text-lg text-gray-600 dark:text-gray-400">
            AI is analyzing your preferences...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
            <Brain className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              AI Recommendations
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Powered by neural intelligence and behavioral analysis
            </p>
          </div>
        </div>
        
        <button
          onClick={generateRecommendations}
          className="flex items-center space-x-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Refresh</span>
        </button>
      </div>

      {/* Tabs */}
      <div className="border-b border-gray-200 dark:border-gray-700">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                activeTab === tab.id
                  ? 'border-purple-600 text-purple-600 dark:text-purple-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
              }`}
            >
              <tab.icon className="w-4 h-4" />
              <span>{tab.label}</span>
              {tab.count > 0 && (
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 px-2 py-1 rounded-full text-xs">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      {/* Recommendations Grid */}
      <div className="space-y-4">
        {getCurrentRecommendations().length > 0 ? (
          <>
            {/* Tab-specific header */}
            {activeTab === 'together' && (
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <h3 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  Frequently Bought Together
                </h3>
                <p className="text-sm text-green-700 dark:text-green-300">
                  Customers who purchased similar items also bought these products
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {getCurrentRecommendations().map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  showReason={true}
                  onAction={() => console.log('Product action:', product)}
                  onAddToCart={onAddToCart}
                  onAddToWishlist={onAddToWishlist}
                />
              ))}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-full">
              <Brain className="w-full h-full text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No recommendations available
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Browse more products to get personalized recommendations
            </p>
          </div>
        )}
      </div>

      {/* AI Insights Panel */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-lg p-6">
        <div className="flex items-center space-x-3 mb-4">
          <Sparkles className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-gray-900 dark:text-white">AI Insights</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {Math.round(Math.random() * 30 + 70)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Prediction Accuracy
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {Math.round(Math.random() * 500 + 1000)}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Products Analyzed
            </div>
          </div>
          
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
              {Math.round(Math.random() * 20 + 40)}%
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Match Rate
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIRecommendationEngine;