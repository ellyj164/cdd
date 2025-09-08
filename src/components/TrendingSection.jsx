import React from 'react';
import { TrendingUp, Clock, Star } from 'lucide-react';
import EnhancedProductCard from './EnhancedProductCard';
import { enhancedProducts } from '../data/enhancedProducts';

const TrendingSection = () => {
  const trendingProducts = enhancedProducts.filter(product => product.trending);
  const recentProducts = enhancedProducts
    .sort((a, b) => new Date(b.lastUpdated) - new Date(a.lastUpdated))
    .slice(0, 4);

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trending Now Section */}
        <div className="mb-12">
          <div className="flex items-center mb-6">
            <TrendingUp className="h-6 w-6 text-red-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Trending Now
            </h2>
            <span className="ml-2 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 text-xs font-medium px-2.5 py-0.5 rounded-full animate-pulse">
              🔥 Hot
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {trendingProducts.map(product => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {trendingProducts.length === 0 && (
            <div className="text-center py-8">
              <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">
                No trending products at the moment
              </p>
            </div>
          )}
        </div>

        {/* Recently Added Section */}
        <div>
          <div className="flex items-center mb-6">
            <Clock className="h-6 w-6 text-green-500 mr-2" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
              Recently Added
            </h2>
            <span className="ml-2 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs font-medium px-2.5 py-0.5 rounded-full">
              New
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {recentProducts.map(product => (
              <EnhancedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

        {/* Popular Categories Quick Links */}
        <div className="mt-12">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-6">
            Popular Categories
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: 'Electronics', icon: '📱', color: 'bg-blue-100 dark:bg-blue-900' },
              { name: 'Fashion', icon: '👗', color: 'bg-pink-100 dark:bg-pink-900' },
              { name: 'Home & Garden', icon: '🏠', color: 'bg-green-100 dark:bg-green-900' },
              { name: 'Sports', icon: '⚽', color: 'bg-orange-100 dark:bg-orange-900' }
            ].map((category) => (
              <div 
                key={category.name}
                className={`${category.color} p-6 rounded-lg text-center hover:shadow-md transition-shadow cursor-pointer`}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <h4 className="font-medium text-gray-900 dark:text-white">
                  {category.name}
                </h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrendingSection;