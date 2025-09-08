import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Search,
  Filter,
  Grid3X3,
  List,
  ChevronRight,
  Star,
  TrendingUp,
  Zap,
  Package,
  Smartphone,
  Shirt,
  Home,
  Dumbbell,
  Heart,
  BookOpen,
  Gamepad2,
  Car,
  ShoppingBasket,
  Building2,
  Laptop,
  Camera,
  Headphones,
  Watch,
  Cpu,
  Monitor,
  HardDrive,
  Keyboard
} from 'lucide-react';

const CategoriesPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // grid or list
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  // Comprehensive category data with subcategories
  const categories = [
    {
      id: 'electronics',
      name: 'Electronics',
      icon: Smartphone,
      description: 'Latest gadgets and electronic devices',
      productCount: 15420,
      trending: true,
      featured: true,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Smartphones', icon: Smartphone, count: 2340 },
        { name: 'Laptops', icon: Laptop, count: 1850 },
        { name: 'Cameras', icon: Camera, count: 980 },
        { name: 'Headphones', icon: Headphones, count: 1420 },
        { name: 'Smart Watches', icon: Watch, count: 760 },
        { name: 'Computer Parts', icon: Cpu, count: 2180 },
        { name: 'Monitors', icon: Monitor, count: 540 },
        { name: 'Storage', icon: HardDrive, count: 890 },
        { name: 'Keyboards & Mice', icon: Keyboard, count: 650 }
      ]
    },
    {
      id: 'fashion',
      name: 'Fashion',
      icon: Shirt,
      description: 'Trendy clothing, shoes, and accessories',
      productCount: 28540,
      trending: true,
      featured: true,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Men\'s Clothing', icon: Shirt, count: 8940 },
        { name: 'Women\'s Clothing', icon: Shirt, count: 12300 },
        { name: 'Shoes', icon: Package, count: 4560 },
        { name: 'Accessories', icon: Watch, count: 2740 }
      ]
    },
    {
      id: 'home-garden',
      name: 'Home & Garden',
      icon: Home,
      description: 'Home decor, furniture, and garden supplies',
      productCount: 18920,
      trending: false,
      featured: true,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Furniture', icon: Home, count: 5640 },
        { name: 'Home Decor', icon: Home, count: 7830 },
        { name: 'Garden Tools', icon: Package, count: 2140 },
        { name: 'Kitchen', icon: Package, count: 3310 }
      ]
    },
    {
      id: 'sports-outdoors',
      name: 'Sports & Outdoors',
      icon: Dumbbell,
      description: 'Sports equipment and outdoor gear',
      productCount: 12340,
      trending: true,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Fitness Equipment', icon: Dumbbell, count: 4520 },
        { name: 'Outdoor Gear', icon: Package, count: 3680 },
        { name: 'Sports Apparel', icon: Shirt, count: 2890 },
        { name: 'Team Sports', icon: Package, count: 1250 }
      ]
    },
    {
      id: 'health-beauty',
      name: 'Health & Beauty',
      icon: Heart,
      description: 'Personal care and beauty products',
      productCount: 9870,
      trending: true,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Skincare', icon: Heart, count: 3240 },
        { name: 'Makeup', icon: Heart, count: 2890 },
        { name: 'Health Supplements', icon: Package, count: 1940 },
        { name: 'Personal Care', icon: Heart, count: 1800 }
      ]
    },
    {
      id: 'books-media',
      name: 'Books & Media',
      icon: BookOpen,
      description: 'Books, movies, music, and games',
      productCount: 7450,
      trending: false,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Books', icon: BookOpen, count: 4320 },
        { name: 'Movies & TV', icon: Package, count: 1840 },
        { name: 'Music', icon: Package, count: 890 },
        { name: 'Video Games', icon: Gamepad2, count: 400 }
      ]
    },
    {
      id: 'toys-games',
      name: 'Toys & Games',
      icon: Gamepad2,
      description: 'Toys, games, and children products',
      productCount: 6780,
      trending: false,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Action Figures', icon: Package, count: 1890 },
        { name: 'Board Games', icon: Gamepad2, count: 1450 },
        { name: 'Educational Toys', icon: Package, count: 2240 },
        { name: 'Video Games', icon: Gamepad2, count: 1200 }
      ]
    },
    {
      id: 'automotive',
      name: 'Automotive',
      icon: Car,
      description: 'Car parts and automotive accessories',
      productCount: 11230,
      trending: false,
      featured: true,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Car Parts', icon: Car, count: 5640 },
        { name: 'Tools & Equipment', icon: Package, count: 2890 },
        { name: 'Accessories', icon: Package, count: 1920 },
        { name: 'Maintenance', icon: Package, count: 780 }
      ]
    },
    {
      id: 'grocery-food',
      name: 'Grocery & Food',
      icon: ShoppingBasket,
      description: 'Food, beverages, and grocery items',
      productCount: 5670,
      trending: true,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Fresh Produce', icon: ShoppingBasket, count: 1890 },
        { name: 'Beverages', icon: Package, count: 1450 },
        { name: 'Snacks', icon: Package, count: 1330 },
        { name: 'Pantry Items', icon: ShoppingBasket, count: 1000 }
      ]
    },
    {
      id: 'business-industrial',
      name: 'Business & Industrial',
      icon: Building2,
      description: 'Professional and industrial equipment',
      productCount: 8940,
      trending: false,
      featured: false,
      image: '/api/placeholder/300/200',
      subcategories: [
        { name: 'Office Supplies', icon: Building2, count: 3240 },
        { name: 'Industrial Tools', icon: Package, count: 2890 },
        { name: 'Safety Equipment', icon: Package, count: 1810 },
        { name: 'Professional Services', icon: Building2, count: 1000 }
      ]
    }
  ];

  // Filter and sort categories
  const filteredCategories = categories
    .filter(category => {
      const matchesSearch = category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           category.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = selectedFilter === 'all' ||
                           (selectedFilter === 'trending' && category.trending) ||
                           (selectedFilter === 'featured' && category.featured);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'products':
          return b.productCount - a.productCount;
        case 'trending':
          return b.trending - a.trending;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <motion.h1 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl font-bold mb-4"
            >
              Explore Categories
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-primary-100 mb-8"
            >
              Discover thousands of products across {categories.length} major categories
            </motion.p>
            
            {/* Search Bar */}
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="relative max-w-md mx-auto"
            >
              <input
                type="text"
                placeholder="Search categories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-12 py-3 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30"
              />
              <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Filters and Controls */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-4">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Filter Buttons */}
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-500" />
              <div className="flex space-x-2">
                {[
                  { key: 'all', label: 'All Categories' },
                  { key: 'trending', label: 'Trending' },
                  { key: 'featured', label: 'Featured' }
                ].map(filter => (
                  <button
                    key={filter.key}
                    onClick={() => setSelectedFilter(filter.key)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      selectedFilter === filter.key
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center space-x-4">
              {/* Sort Dropdown */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
              >
                <option value="name">Sort by Name</option>
                <option value="products">Sort by Product Count</option>
                <option value="trending">Sort by Trending</option>
              </select>

              {/* View Mode Toggle */}
              <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-primary-600 text-white' : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300'}`}
                >
                  <List className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {filteredCategories.length} Categories Found
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Browse through our extensive collection of product categories
          </p>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="h-48 bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <category.icon className="h-16 w-16 text-white" />
                  </div>
                  {category.trending && (
                    <div className="absolute top-3 right-3 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <TrendingUp className="h-3 w-3 mr-1" />
                      Trending
                    </div>
                  )}
                  {category.featured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </div>
                  )}
                </div>
                
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                    {category.description}
                  </p>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-2xl font-bold text-primary-600">
                      {category.productCount.toLocaleString()}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400">products</span>
                  </div>
                  
                  {/* Subcategories Preview */}
                  <div className="space-y-2 mb-4">
                    {category.subcategories.slice(0, 3).map((sub, idx) => (
                      <div key={idx} className="flex items-center justify-between text-sm">
                        <span className="text-gray-600 dark:text-gray-400 flex items-center">
                          <sub.icon className="h-3 w-3 mr-2" />
                          {sub.name}
                        </span>
                        <span className="text-gray-500">{sub.count}</span>
                      </div>
                    ))}
                    {category.subcategories.length > 3 && (
                      <span className="text-xs text-primary-600">+{category.subcategories.length - 3} more</span>
                    )}
                  </div>
                  
                  <Link
                    to={`/category/${category.id}`}
                    className="w-full bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white py-2 px-4 rounded-xl hover:bg-primary-600 hover:text-white transition-colors duration-200 flex items-center justify-center group-hover:bg-primary-600 group-hover:text-white"
                  >
                    Explore Category
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
              >
                <div className="flex items-center space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                      <category.icon className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>
                      {category.trending && (
                        <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <TrendingUp className="h-3 w-3 mr-1" />
                          Trending
                        </span>
                      )}
                      {category.featured && (
                        <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          Featured
                        </span>
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mb-2">
                      {category.description}
                    </p>
                    <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                      <span>{category.productCount.toLocaleString()} products</span>
                      <span>•</span>
                      <span>{category.subcategories.length} subcategories</span>
                    </div>
                  </div>
                  
                  <div className="flex-shrink-0">
                    <Link
                      to={`/category/${category.id}`}
                      className="bg-primary-600 text-white px-6 py-2 rounded-xl hover:bg-primary-700 transition-colors duration-200 flex items-center"
                    >
                      Explore
                      <ChevronRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
