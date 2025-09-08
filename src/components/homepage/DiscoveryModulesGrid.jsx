import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, TrendingUp, Gift, Home, Sparkles, Heart, Coffee, Gamepad2 } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * DiscoveryModulesGrid Component
 * Amazon-style discovery modules with varied layouts
 * Includes content like "New arrivals", "Trending", etc.
 */
const DiscoveryModulesGrid = ({ section, loading }) => {
  // Default discovery modules matching Amazon layout from images
  const defaultModules = [
    {
      id: 'refresh-space',
      title: 'Refresh your space',
      layout: 'medium',
      linkUrl: '/categories/home-garden',
      sections: [
        { name: 'Dining', image: 'https://placehold.co/150x120/f3f4f6/6b7280?text=Dining' },
        { name: 'Home', image: 'https://placehold.co/150x120/e5e7eb/6b7280?text=Home' },
        { name: 'Kitchen', image: 'https://placehold.co/150x120/d1d5db/6b7280?text=Kitchen' },
        { name: 'Health and Beauty', image: 'https://placehold.co/150x120/f9fafb/6b7280?text=Beauty' }
      ],
      ctaText: 'See more'
    },
    {
      id: 'new-arrivals',
      title: 'New home arrivals under $50',
      layout: 'medium',
      linkUrl: '/categories/home-garden?new=true&max_price=50',
      sections: [
        { name: 'Kitchen & Dining', image: 'https://placehold.co/150x120/6366f1/ffffff?text=Kitchen' },
        { name: 'Home Improvement', image: 'https://placehold.co/150x120/059669/ffffff?text=Home+Imp' },
        { name: 'Décor', image: 'https://placehold.co/150x120/dc2626/ffffff?text=Decor' },
        { name: 'Bedding & Bath', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Bedding' }
      ],
      ctaText: 'Shop the latest from Home'
    },
    {
      id: 'kitchen-appliances',
      title: 'Top categories in Kitchen appliances',
      layout: 'medium',
      linkUrl: '/categories/kitchen',
      mainImage: 'https://placehold.co/300x200/374151/ffffff?text=Kitchen+Appliances',
      sections: [
        { name: 'Cooker', image: 'https://placehold.co/100x80/f3f4f6/6b7280?text=Cooker' },
        { name: 'Coffee', image: 'https://placehold.co/100x80/e5e7eb/6b7280?text=Coffee' },
        { name: 'Pots and Pans', image: 'https://placehold.co/100x80/d1d5db/6b7280?text=Pots' },
        { name: 'Kettles', image: 'https://placehold.co/100x80/f9fafb/6b7280?text=Kettles' }
      ],
      ctaText: 'Explore all products in Kitchen'
    },
    {
      id: 'fashion-trends',
      title: 'Fashion trends you like',
      layout: 'medium',
      linkUrl: '/categories/fashion',
      sections: [
        { name: 'Dresses', image: 'https://placehold.co/150x120/10b981/ffffff?text=Dresses' },
        { name: 'Knits', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Knits' },
        { name: 'Jackets', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Jackets' },
        { name: 'Jewelry', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Jewelry' }
      ],
      ctaText: 'Explore more'
    }
  ];

  const modules = section?.modules || defaultModules;
  const title = section?.title || '';
  const subtitle = section?.subtitle || '';

  if (loading) {
    return (
      <div className="bg-gray-50 py-8 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="bg-white rounded-lg p-6 animate-pulse">
                <div className="h-48 bg-gray-200 rounded mb-4"></div>
                <div className="h-5 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const getGridClass = (layout) => {
    // Not used in new layout
    return '';
  };

  return (
    <section className="bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4">
        {/* Section Header - only show if title exists */}
        {title && (
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
        )}

        {/* Discovery Modules Grid - Amazon Style */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {modules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group"
            >
              <div className="bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden border border-gray-100 group-hover:border-gray-200 h-full flex flex-col">
                {/* Header */}
                <div className="p-5 flex-1">
                  <h3 className="font-bold text-gray-900 mb-4 text-lg leading-tight">
                    {module.title}
                  </h3>

                  {/* Main content with sections grid */}
                  {module.sections && (
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {module.sections.map((section, idx) => (
                        <div key={idx} className="text-center">
                          <img 
                            src={section.image} 
                            alt={section.name}
                            className="w-full h-24 object-cover rounded mb-2"
                            loading="lazy"
                          />
                          <p className="text-sm text-gray-700 font-medium">
                            {section.name}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Kitchen appliances special layout */}
                  {module.id === 'kitchen-appliances' && (
                    <div className="space-y-3 mb-4">
                      {/* Main product image */}
                      <div className="text-center">
                        <img 
                          src={module.mainImage} 
                          alt="Kitchen Appliances"
                          className="w-full h-32 object-cover rounded mb-2"
                          loading="lazy"
                        />
                      </div>
                      
                      {/* Product grid */}
                      <div className="grid grid-cols-2 gap-2">
                        {module.sections.map((section, idx) => (
                          <div key={idx} className="text-center">
                            <img 
                              src={section.image} 
                              alt={section.name}
                              className="w-full h-16 object-cover rounded mb-1"
                              loading="lazy"
                            />
                            <p className="text-xs text-gray-700 font-medium">
                              {section.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* CTA Link */}
                  <Link 
                    to={module.linkUrl} 
                    className="text-sm text-blue-600 hover:text-blue-800 hover:underline font-medium"
                  >
                    {module.ctaText || 'See more'}
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DiscoveryModulesGrid;