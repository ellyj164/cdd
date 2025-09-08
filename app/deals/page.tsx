import React from 'react'
import { Flame, Clock, Percent, Star, ArrowRight } from 'lucide-react'

const dealsData = [
  {
    id: 1,
    title: 'Flash Sale - Electronics',
    discount: '50%',
    timeLeft: '23:45:12',
    products: [
      { name: 'Wireless Headphones', originalPrice: 299.99, salePrice: 149.99, rating: 4.8 },
      { name: 'Smartphone', originalPrice: 899.99, salePrice: 449.99, rating: 4.6 },
      { name: 'Tablet', originalPrice: 499.99, salePrice: 249.99, rating: 4.7 }
    ]
  },
  {
    id: 2,
    title: 'Fashion Week Special',
    discount: '30%',
    timeLeft: '5 days',
    products: [
      { name: 'Designer Jacket', originalPrice: 199.99, salePrice: 139.99, rating: 4.9 },
      { name: 'Premium Jeans', originalPrice: 89.99, salePrice: 62.99, rating: 4.5 },
      { name: 'Running Shoes', originalPrice: 149.99, salePrice: 104.99, rating: 4.8 }
    ]
  },
  {
    id: 3,
    title: 'Home & Garden Sale',
    discount: '40%',
    timeLeft: '2 days',
    products: [
      { name: 'Coffee Maker', originalPrice: 129.99, salePrice: 77.99, rating: 4.7 },
      { name: 'Garden Tools Set', originalPrice: 79.99, salePrice: 47.99, rating: 4.6 },
      { name: 'Smart Thermostat', originalPrice: 249.99, salePrice: 149.99, rating: 4.8 }
    ]
  }
]

export default function DealsPage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Flame className="w-8 h-8 text-red-500 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
              Hot Deals
            </h1>
          </div>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Limited time offers with incredible savings. Don't miss out on these amazing deals!
          </p>
        </div>

        {/* Deal Categories */}
        <div className="grid gap-8">
          {dealsData.map((deal) => (
            <div
              key={deal.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
            >
              {/* Deal Header */}
              <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">{deal.title}</h2>
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Percent className="w-5 h-5 mr-2" />
                        <span className="text-3xl font-bold">UP TO {deal.discount} OFF</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center mb-2">
                      <Clock className="w-5 h-5 mr-2" />
                      <span className="text-sm">Time Remaining</span>
                    </div>
                    <div className="text-2xl font-bold">{deal.timeLeft}</div>
                  </div>
                </div>
              </div>

              {/* Products Grid */}
              <div className="p-6">
                <div className="grid md:grid-cols-3 gap-6">
                  {deal.products.map((product, index) => (
                    <div
                      key={index}
                      className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="aspect-square bg-gray-100 dark:bg-gray-700 rounded-lg mb-4 flex items-center justify-center">
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                          Product Image
                        </span>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                        {product.name}
                      </h3>
                      
                      <div className="flex items-center mb-2">
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
                        <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                          ({product.rating})
                        </span>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-bold text-red-600">
                            ${product.salePrice}
                          </span>
                          <span className="text-sm text-gray-500 dark:text-gray-400 line-through ml-2">
                            ${product.originalPrice}
                          </span>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6 text-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold flex items-center mx-auto transition-colors">
                    View All {deal.title} Deals
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter Signup */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="text-blue-100 mb-6">
            Subscribe to our newsletter and be the first to know about flash sales and exclusive offers.
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