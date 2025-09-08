import React from 'react';
import { Clock, X } from 'lucide-react';
import { useUserPreferencesStore } from '../stores/useUserPreferencesStore';
import EnhancedProductCard from './EnhancedProductCard';

const RecentlyViewed = () => {
  const { recentlyViewed, clearRecentlyViewed } = useUserPreferencesStore();

  if (recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Clock className="h-6 w-6 text-gray-600 dark:text-gray-400 mr-2" />
            <h2 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Recently Viewed
            </h2>
          </div>
          <button
            onClick={clearRecentlyViewed}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 flex items-center"
          >
            <X className="h-4 w-4 mr-1" />
            Clear All
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 xl:gap-x-8">
          {recentlyViewed.slice(0, 6).map((product) => (
            <div key={`recent-${product.id}`} className="relative">
              <EnhancedProductCard 
                product={product} 
              />
              <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white text-xs px-2 py-1 rounded">
                Recently Viewed
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecentlyViewed;