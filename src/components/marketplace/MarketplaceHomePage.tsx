'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Search,
  ShoppingCart,
  Star,
  ArrowRight,
  Truck,
  Shield,
  Heart,
  Grid3X3,
  Smartphone,
  Laptop,
  Watch,
  HeadphonesIcon,
  Camera,
  GamepadIcon,
  Shirt
} from 'lucide-react'

const categories = [
  { id: 'electronics', name: 'Electronics', icon: Smartphone, color: 'bg-blue-500', count: '2.5k+' },
  { id: 'computers', name: 'Computers', icon: Laptop, color: 'bg-purple-500', count: '1.8k+' },
  { id: 'wearables', name: 'Wearables', icon: Watch, color: 'bg-green-500', count: '950+' },
  { id: 'audio', name: 'Audio', icon: HeadphonesIcon, color: 'bg-red-500', count: '1.2k+' },
  { id: 'cameras', name: 'Cameras', icon: Camera, color: 'bg-yellow-500', count: '680+' },
  { id: 'gaming', name: 'Gaming', icon: GamepadIcon, color: 'bg-indigo-500', count: '890+' },
  { id: 'fashion', name: 'Fashion', icon: Shirt, color: 'bg-pink-500', count: '3.1k+' },
  { id: 'more', name: 'More', icon: Grid3X3, color: 'bg-gray-500', count: '5k+' }
]

const featuredDeals = [
  { discount: '50%', title: 'Electronics Sale', subtitle: 'Up to 50% off selected items', color: 'from-blue-600 to-blue-700' },
  { discount: '30%', title: 'Fashion Week', subtitle: 'Latest trends at great prices', color: 'from-pink-600 to-pink-700' },
  { discount: '40%', title: 'Home & Garden', subtitle: 'Transform your space', color: 'from-green-600 to-green-700' }
]

const sampleProducts = [
  {
    id: 1,
    name: 'Premium Wireless Headphones',
    price: 199.99,
    rating: 4.8,
    image: 'https://placehold.co/300x300/2d3748/ffffff?text=Headphones',
    vendor: 'AudioTech'
  },
  {
    id: 2,
    name: 'Smart Fitness Watch',
    price: 299.99,
    rating: 4.7,
    image: 'https://placehold.co/300x300/4a5568/ffffff?text=Watch',
    vendor: 'TechWear'
  },
  {
    id: 3,
    name: 'Professional Camera',
    price: 899.99,
    rating: 4.9,
    image: 'https://placehold.co/300x300/1a202c/ffffff?text=Camera',
    vendor: 'PhotoPro'
  },
  {
    id: 4,
    name: 'Gaming Laptop',
    price: 1299.99,
    rating: 4.6,
    image: 'https://placehold.co/300x300/2a4365/ffffff?text=Laptop',
    vendor: 'GameTech'
  }
]

export function MarketplaceHomePage() {

  const handleCategoryClick = (categoryId: string) => {
    // Navigate to catalog with category filter
    window.location.href = `/catalog?category=${categoryId}`
  }

  const handleProductClick = (productId: number) => {
    // Navigate to product detail page
    window.location.href = `/products/${productId}`
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Discover Amazing Products
                <span className="block text-3xl md:text-4xl mt-2 text-blue-200">
                  From Trusted Sellers Worldwide
                </span>
              </h1>
              
              <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Shop millions of products from verified sellers. Fast shipping, secure payments, and unbeatable prices.
              </p>



              {/* Hero Stats */}
              <div className="grid grid-cols-3 gap-8 max-w-md mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold">50M+</div>
                  <div className="text-blue-200 text-sm">Products</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">10M+</div>
                  <div className="text-blue-200 text-sm">Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">200K+</div>
                  <div className="text-blue-200 text-sm">Sellers</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Explore our wide range of product categories
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-6">
          {categories.map((category, index) => {
            const Icon = category.icon
            return (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleCategoryClick(category.id)}
                className="group cursor-pointer"
              >
                <div className="text-center">
                  <div className={`${category.color} w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-1">
                    {category.name}
                  </h3>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {category.count}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* Featured Deals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Featured Deals
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Limited time offers you don't want to miss
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {featuredDeals.map((deal, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`bg-gradient-to-r ${deal.color} rounded-xl p-6 text-white cursor-pointer hover:scale-105 transition-transform`}
            >
              <div className="text-4xl font-bold mb-2">{deal.discount}</div>
              <div className="text-xl font-semibold mb-2">{deal.title}</div>
              <div className="text-blue-100 mb-4">{deal.subtitle}</div>
              <div className="flex items-center text-sm font-medium">
                Shop Now <ArrowRight className="w-4 h-4 ml-2" />
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Featured Products
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Hand-picked products with the highest customer ratings
            </p>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold flex items-center">
            View All <ArrowRight className="w-4 h-4 ml-2" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {sampleProducts.map((product) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: product.id * 0.1 }}
              onClick={() => handleProductClick(product.id)}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow cursor-pointer group"
            >
              <div className="relative">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-lg group-hover:opacity-90 transition-opacity"
                />
                <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600">
                  {product.vendor}
                </div>
              </div>
              
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 transition-colors">
                  {product.name}
                </h3>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
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
                    <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                      ({product.rating})
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    ${product.price}
                  </span>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      console.log('Add to cart:', product.id)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Fast & Free Shipping
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Free shipping on orders over $50. Express delivery available.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Secure Shopping
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              Your data is protected with industry-leading security measures.
            </p>
          </div>
          
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Heart className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Customer Satisfaction
            </h3>
            <p className="text-gray-600 dark:text-gray-300">
              30-day return policy and 24/7 customer support guarantee.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}