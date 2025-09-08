import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Star, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * PromoTileRow Component
 * Amazon-style promotional tile row with 3-4 panels
 * Responsive design with configurable content
 */
const PromoTileRow = ({ section, loading }) => {
  // Default promo tiles if none provided
  const defaultTiles = [
    {
      id: 'refresh-space',
      title: 'Refresh your space',
      subtitle: 'Discover home decor',
      image: 'https://placehold.co/300x200/6366f1/ffffff?text=Home+Decor',
      linkUrl: '/categories/home-garden',
      badge: 'New',
      badgeColor: 'bg-green-500'
    },
    {
      id: 'electronics-deals',
      title: 'Electronics under $50',
      subtitle: 'Gadgets & accessories',
      image: 'https://placehold.co/300x200/059669/ffffff?text=Electronics',
      linkUrl: '/categories/electronics?max_price=50',
      badge: 'Hot Deal',
      badgeColor: 'bg-red-500'
    },
    {
      id: 'fashion-trends',
      title: 'Fashion trends you like',
      subtitle: 'Curated for you',
      image: 'https://placehold.co/300x200/dc2626/ffffff?text=Fashion',
      linkUrl: '/categories/fashion',
      badge: 'Trending',
      badgeColor: 'bg-purple-500'
    },
    {
      id: 'kitchen-appliances',
      title: 'Top Kitchen appliances',
      subtitle: 'Essential tools',
      image: 'https://placehold.co/300x200/7c3aed/ffffff?text=Kitchen',
      linkUrl: '/categories/kitchen',
      badge: 'Popular',
      badgeColor: 'bg-blue-500'
    }
  ];

  const tiles = section?.tiles || defaultTiles;
  const title = section?.title || 'Featured Collections';
  const subtitle = section?.subtitle || 'Handpicked just for you';

  if (loading) {
    return (
      <div className="bg-white py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-gray-100 rounded-lg animate-pulse">
                <div className="h-48 bg-gray-200 rounded-t-lg"></div>
                <div className="p-4">
                  <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="mb-6 sm:mb-8">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2"
          >
            {title}
          </motion.h2>
          {subtitle && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-gray-600"
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {/* Promo Tiles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {tiles.map((tile, index) => (
            <motion.div
              key={tile.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <Link to={tile.linkUrl} className="block">
                <div className="bg-white rounded-lg shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-primary-200">
                  {/* Image Container */}
                  <div className="relative overflow-hidden">
                    <img
                      src={tile.image}
                      alt={tile.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                      loading="lazy"
                    />
                    
                    {/* Badge */}
                    {tile.badge && (
                      <div className={`absolute top-3 left-3 px-2 py-1 text-xs font-semibold text-white rounded ${tile.badgeColor || 'bg-primary-500'}`}>
                        {tile.badge}
                      </div>
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                      <ArrowRight className="h-6 w-6 text-white opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300" />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-primary-600 transition-colors duration-200">
                      {tile.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">
                      {tile.subtitle}
                    </p>
                    
                    {/* CTA */}
                    <div className="flex items-center text-primary-600 text-sm font-medium">
                      <span>Shop now</span>
                      <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Additional Features Row (Optional) */}
        {section?.showFeatures && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-8 pt-8 border-t border-gray-100"
          >
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div className="flex items-center justify-center space-x-3">
                <Zap className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-600">Fast delivery</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Star className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-600">Top rated products</span>
              </div>
              <div className="flex items-center justify-center space-x-3">
                <Clock className="h-5 w-5 text-primary-600" />
                <span className="text-sm text-gray-600">Limited time offers</span>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default PromoTileRow;