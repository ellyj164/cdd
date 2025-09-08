'use client'

import React from 'react'
import { Sparkles, Calendar, Star, ShoppingCart, Filter, Grid3X3, List } from 'lucide-react'

const newArrivalsData = [
  {
    id: 1,
    name: 'Ultra-Fast Gaming Mouse',
    category: 'Electronics',
    price: 79.99,
    originalPrice: 99.99,
    rating: 4.9,
    reviews: 127,
    isNew: true,
    isTrending: true,
    arrivalDate: '2025-01-05',
    vendor: 'TechPro Gaming',
    badge: 'NEW'
  },
  {
    id: 2,
    name: 'Wireless Charging Stand',
    category: 'Electronics',
    price: 39.99,
    rating: 4.7,
    reviews: 89,
    isNew: true,
    arrivalDate: '2025-01-04',
    vendor: 'PowerTech',
    badge: 'NEW'
  },
  {
    id: 3,
    name: 'Premium Coffee Grinder',
    category: 'Home & Kitchen',
    price: 149.99,
    rating: 4.8,
    reviews: 203,
    isNew: true,
    isTrending: true,
    arrivalDate: '2025-01-03',
    vendor: 'BrewMaster',
    badge: 'HOT'
  },
  {
    id: 4,
    name: 'Smart Fitness Tracker Pro',
    category: 'Wearables',
    price: 199.99,
    rating: 4.6,
    reviews: 156,
    isNew: true,
    arrivalDate: '2025-01-02',
    vendor: 'HealthTech',
    badge: 'NEW'
  },
  {
    id: 5,
    name: 'Organic Cotton T-Shirt',
    category: 'Fashion',
    price: 29.99,
    rating: 4.5,
    reviews: 78,
    isNew: true,
    arrivalDate: '2025-01-01',
    vendor: 'EcoFashion',
    badge: 'SALE'
  },
  {
    id: 6,
    name: 'Bluetooth Speaker Mini',
    category: 'Electronics',
    price: 49.99,
    rating: 4.4,
    reviews: 92,
    isNew: true,
    arrivalDate: '2024-12-30',
    vendor: 'SoundWave',
    badge: 'NEW'
  }
]

const categories = ['All', 'Electronics', 'Fashion', 'Home & Kitchen', 'Wearables']

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = React.useState('All')
  const [viewMode, setViewMode] = React.useState('grid')
  const [sortBy, setSortBy] = React.useState('newest')

  const filteredProducts = selectedCategory === 'All' 
    ? newArrivalsData 
    : newArrivalsData.filter(product => product.category === selectedCategory)

  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'NEW': return 'bg-blue-500'
      case 'HOT': return 'bg-red-500'
      case 'SALE': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Sparkles className="w-8 h-8 text-blue-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              New Arrivals
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Discover the latest products from top brands. Be the first to get your hands on the newest arrivals!
          </p>
        </div>

        {/* Filters and Controls */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-500" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Category:</span>
              <div className="flex space-x-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* View Mode and Sort */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Sort:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="newest">Newest First</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'grid'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded-lg ${
                    viewMode === 'list'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 dark:text-gray-400">
            Showing {filteredProducts.length} new arrivals
          </p>
        </div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer overflow-hidden ${
                viewMode === 'list' ? 'flex' : ''
              }`}
            >
              {/* Product Image */}
              <div className={`relative ${
                viewMode === 'list' ? 'w-48 h-48' : 'aspect-square'
              } bg-gray-100 dark:bg-gray-700 flex items-center justify-center`}>
                <span className="text-gray-500 dark:text-gray-400 text-sm">
                  Product Image
                </span>
                
                {/* Badges */}
                <div className="absolute top-2 left-2 flex flex-col space-y-1">
                  <span className={`${getBadgeColor(product.badge)} text-white text-xs font-bold px-2 py-1 rounded`}>
                    {product.badge}
                  </span>
                  {product.isTrending && (
                    <span className="bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded flex items-center">
                      🔥 Trending
                    </span>
                  )}
                </div>

                {/* Arrival Date */}
                <div className="absolute top-2 right-2 bg-white dark:bg-gray-800 rounded-lg px-2 py-1">
                  <div className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                    <Calendar className="w-3 h-3 mr-1" />
                    {new Date(product.arrivalDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Product Details */}
              <div className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {product.name}
                    </h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {product.vendor}
                    </p>
                  </div>
                </div>

                <div className="flex items-center mb-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({product.reviews} reviews)
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price}
                    </span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                        ${product.originalPrice}
                      </span>
                    )}
                  </div>
                  
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center text-sm font-medium transition-colors">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-12">
          <button className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
            Load More Products
          </button>
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl p-8 text-white text-center">
          <Sparkles className="w-12 h-12 mx-auto mb-4" />
          <h2 className="text-2xl font-bold mb-4">Stay Ahead of the Trend!</h2>
          <p className="text-purple-100 mb-6">
            Be the first to know when new products arrive. Subscribe to our newsletter for exclusive early access.
          </p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 px-6 py-3 rounded-r-lg font-semibold transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}