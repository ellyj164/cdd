import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  Smartphone,
  ShirtIcon as Shirt,
  Home,
  Dumbbell,
  Heart,
  BookOpen,
  Gamepad2,
  Car,
  ShoppingBasket,
  Briefcase,
} from 'lucide-react';

const EnhancedCategoriesSection = ({ categories = [], loading = false }) => {
  // Category icons mapping
  const categoryIcons = {
    Electronics: Smartphone,
    Fashion: Shirt,
    'Home & Garden': Home,
    'Sports & Outdoors': Dumbbell,
    'Health & Beauty': Heart,
    'Books & Media': BookOpen,
    'Toys & Games': Gamepad2,
    Automotive: Car,
    'Grocery & Food': ShoppingBasket,
    'Business & Industrial': Briefcase,
  };

  // Enhanced category data with descriptions and colors
  const enhancedCategories = [
    {
      name: 'Electronics',
      description: 'Latest tech and gadgets',
      color: 'from-blue-500 to-blue-600',
      textColor: 'text-blue-600',
      bgColor: 'bg-blue-50',
      count: categories.find(c => c.category === 'Electronics')?.count || 15420,
    },
    {
      name: 'Fashion',
      description: 'Trendy clothing & accessories',
      color: 'from-pink-500 to-pink-600',
      textColor: 'text-pink-600',
      bgColor: 'bg-pink-50',
      count: categories.find(c => c.category === 'Fashion')?.count || 28540,
    },
    {
      name: 'Home & Garden',
      description: 'Everything for your home',
      color: 'from-green-500 to-green-600',
      textColor: 'text-green-600',
      bgColor: 'bg-green-50',
      count: categories.find(c => c.category === 'Home & Garden')?.count || 18920,
    },
    {
      name: 'Sports & Outdoors',
      description: 'Gear for active lifestyle',
      color: 'from-orange-500 to-orange-600',
      textColor: 'text-orange-600',
      bgColor: 'bg-orange-50',
      count: categories.find(c => c.category === 'Sports & Outdoors')?.count || 12340,
    },
    {
      name: 'Health & Beauty',
      description: 'Personal care essentials',
      color: 'from-purple-500 to-purple-600',
      textColor: 'text-purple-600',
      bgColor: 'bg-purple-50',
      count: categories.find(c => c.category === 'Health & Beauty')?.count || 9870,
    },
    {
      name: 'Books & Media',
      description: 'Knowledge & entertainment',
      color: 'from-indigo-500 to-indigo-600',
      textColor: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      count: categories.find(c => c.category === 'Books & Media')?.count || 7450,
    },
    {
      name: 'Toys & Games',
      description: 'Fun for all ages',
      color: 'from-yellow-500 to-yellow-600',
      textColor: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
      count: categories.find(c => c.category === 'Toys & Games')?.count || 6780,
    },
    {
      name: 'Automotive',
      description: 'Car parts & accessories',
      color: 'from-red-500 to-red-600',
      textColor: 'text-red-600',
      bgColor: 'bg-red-50',
      count: categories.find(c => c.category === 'Automotive')?.count || 11230,
    },
    {
      name: 'Grocery & Food',
      description: 'Fresh & pantry essentials',
      color: 'from-teal-500 to-teal-600',
      textColor: 'text-teal-600',
      bgColor: 'bg-teal-50',
      count: categories.find(c => c.category === 'Grocery & Food')?.count || 5670,
    },
    {
      name: 'Business & Industrial',
      description: 'Professional equipment',
      color: 'from-gray-500 to-gray-600',
      textColor: 'text-gray-600',
      bgColor: 'bg-gray-50',
      count: categories.find(c => c.category === 'Business & Industrial')?.count || 8940,
    },
  ];

  if (loading) {
    return (
      <section className="py-16 bg-white dark:bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {Array(10).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-48 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-800">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover thousands of products across our extensive collection of categories
          </p>
        </motion.div>

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {enhancedCategories.map((category, index) => {
            const IconComponent = categoryIcons[category.name] || Briefcase;
            
            return (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  to={`/categories?filter=${encodeURIComponent(category.name)}`}
                  className="block"
                >
                  <div className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-600 group-hover:border-primary-200 dark:group-hover:border-primary-500">
                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
                    
                    {/* Content */}
                    <div className="relative p-6 text-center">
                      {/* Icon */}
                      <div className={`inline-flex items-center justify-center w-16 h-16 ${category.bgColor} dark:bg-gray-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300`}>
                        <IconComponent className={`h-8 w-8 ${category.textColor} dark:text-white`} />
                      </div>

                      {/* Category Name */}
                      <h3 className="font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                        {category.name}
                      </h3>

                      {/* Description */}
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 line-clamp-2">
                        {category.description}
                      </p>

                      {/* Product Count */}
                      <div className="flex items-center justify-center space-x-1">
                        <span className="text-xs font-medium text-gray-500 dark:text-gray-400">
                          {category.count.toLocaleString()} products
                        </span>
                      </div>

                      {/* Trending Badge */}
                      {category.count > 15000 && (
                        <div className="absolute top-3 right-3">
                          <span className="inline-flex items-center px-2 py-1 text-xs font-medium text-white bg-red-500 rounded-full">
                            Trending
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Hover Effect Border */}
                    <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary-200 dark:group-hover:border-primary-500 rounded-2xl transition-colors duration-300" />
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* View All Categories Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12"
        >
          <Link
            to="/categories"
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-8 py-4 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200"
          >
            <span>Explore All Categories</span>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </motion.div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {[
            { label: 'Total Products', value: enhancedCategories.reduce((sum, cat) => sum + cat.count, 0).toLocaleString() },
            { label: 'Categories', value: enhancedCategories.length.toString() },
            { label: 'Happy Customers', value: '50,000+' },
            { label: 'Daily Orders', value: '1,200+' },
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default EnhancedCategoriesSection;