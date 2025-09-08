import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen,
  Calendar,
  User,
  Clock,
  Tag,
  Search,
  Filter,
  ArrowRight,
  ThumbsUp,
  MessageCircle,
  Share2,
  Eye,
  TrendingUp,
  Star,
  Bookmark,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

const BlogPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const categories = [
    { id: 'all', name: 'All Posts', count: 156 },
    { id: 'ecommerce', name: 'E-commerce Tips', count: 45 },
    { id: 'technology', name: 'Technology', count: 32 },
    { id: 'business', name: 'Business Growth', count: 28 },
    { id: 'marketing', name: 'Marketing', count: 25 },
    { id: 'trends', name: 'Industry Trends', count: 26 }
  ];

  const featuredPost = {
    id: 1,
    title: 'The Future of E-commerce: AI and Personalization in 2025',
    excerpt: 'Discover how artificial intelligence is revolutionizing online shopping experiences and what it means for businesses and consumers.',
    author: {
      name: 'Sarah Chen',
      avatar: '/api/placeholder/40/40',
      role: 'Tech Writer'
    },
    publishedAt: '2024-12-10',
    readTime: 8,
    category: 'Technology',
    tags: ['AI', 'E-commerce', 'Future Tech'],
    image: '/api/placeholder/800/400',
    views: 15420,
    likes: 284,
    comments: 43
  };

  const blogPosts = [
    {
      id: 2,
      title: '10 Ways to Boost Your Online Store Conversion Rate',
      excerpt: 'Learn proven strategies to turn more visitors into customers with these actionable conversion optimization tips.',
      author: {
        name: 'Michael Rodriguez',
        avatar: '/api/placeholder/40/40',
        role: 'Marketing Expert'
      },
      publishedAt: '2024-12-08',
      readTime: 6,
      category: 'Marketing',
      tags: ['Conversion', 'Sales', 'CRO'],
      image: '/api/placeholder/400/250',
      views: 8932,
      likes: 156,
      comments: 23,
      featured: false
    },
    {
      id: 3,
      title: 'Building Trust in E-commerce: Security Best Practices',
      excerpt: 'Essential security measures every online business should implement to protect customers and build credibility.',
      author: {
        name: 'Alex Thompson',
        avatar: '/api/placeholder/40/40',
        role: 'Security Specialist'
      },
      publishedAt: '2024-12-05',
      readTime: 10,
      category: 'Business',
      tags: ['Security', 'Trust', 'Best Practices'],
      image: '/api/placeholder/400/250',
      views: 12456,
      likes: 231,
      comments: 34,
      featured: true
    },
    {
      id: 4,
      title: 'Mobile Commerce Trends: What to Expect in 2025',
      excerpt: 'Mobile shopping continues to grow. Here are the trends shaping the future of mobile commerce.',
      author: {
        name: 'Emma Wilson',
        avatar: '/api/placeholder/40/40',
        role: 'Trend Analyst'
      },
      publishedAt: '2024-12-03',
      readTime: 7,
      category: 'Trends',
      tags: ['Mobile', 'Trends', 'Commerce'],
      image: '/api/placeholder/400/250',
      views: 9876,
      likes: 198,
      comments: 28,
      featured: false
    },
    {
      id: 5,
      title: 'Sustainable E-commerce: Going Green Online',
      excerpt: 'How online businesses can reduce their environmental impact while maintaining profitability.',
      author: {
        name: 'David Kim',
        avatar: '/api/placeholder/40/40',
        role: 'Sustainability Expert'
      },
      publishedAt: '2024-12-01',
      readTime: 9,
      category: 'Business',
      tags: ['Sustainability', 'Environment', 'Green Business'],
      image: '/api/placeholder/400/250',
      views: 7543,
      likes: 142,
      comments: 19,
      featured: false
    },
    {
      id: 6,
      title: 'Customer Service Excellence in the Digital Age',
      excerpt: 'Modern approaches to customer service that drive loyalty and satisfaction in online businesses.',
      author: {
        name: 'Lisa Chang',
        avatar: '/api/placeholder/40/40',
        role: 'Customer Success Manager'
      },
      publishedAt: '2024-11-28',
      readTime: 5,
      category: 'Business',
      tags: ['Customer Service', 'Support', 'Experience'],
      image: '/api/placeholder/400/250',
      views: 6789,
      likes: 124,
      comments: 16,
      featured: false
    }
  ];

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const filteredPosts = blogPosts.filter(post => {
    const matchesCategory = selectedCategory === 'all' || post.category.toLowerCase() === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <BookOpen className="h-16 w-16 mx-auto mb-4 text-purple-200" />
              <h1 className="text-4xl font-bold mb-4">Global Nexus Blog</h1>
              <p className="text-xl text-purple-100">
                Insights, tips, and trends for modern e-commerce success
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-purple-600 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                  }`}
                >
                  {category.name} ({category.count})
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden mb-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            <div className="h-64 lg:h-auto bg-gradient-to-br from-purple-500 to-blue-600"></div>
            <div className="p-8">
              <div className="flex items-center space-x-2 mb-4">
                <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-medium">
                  Featured
                </span>
                <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                  {featuredPost.category}
                </span>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {featuredPost.title}
              </h2>
              
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                {featuredPost.excerpt}
              </p>
              
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {featuredPost.author.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-500 text-xs">
                      {featuredPost.author.role}
                    </div>
                  </div>
                </div>
                
                <div className="text-sm text-gray-500 dark:text-gray-500">
                  <div className="flex items-center space-x-4">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{formatDate(featuredPost.publishedAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{featuredPost.readTime} min read</span>
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500">
                  <span className="flex items-center space-x-1">
                    <Eye className="h-4 w-4" />
                    <span>{featuredPost.views.toLocaleString()}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{featuredPost.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{featuredPost.comments}</span>
                  </span>
                </div>
                
                <button className="bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition-colors duration-200 flex items-center space-x-2">
                  <span>Read More</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8"
        >
          {filteredPosts.map((post, index) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1"
            >
              <div className="h-48 bg-gradient-to-br from-purple-400 to-blue-500"></div>
              
              <div className="p-6">
                <div className="flex items-center space-x-2 mb-3">
                  <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                    {post.category}
                  </span>
                  {post.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <Star className="h-3 w-3 mr-1" />
                      Featured
                    </span>
                  )}
                </div>
                
                <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                  {post.title}
                </h3>
                
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
                  {post.excerpt}
                </p>
                
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white text-sm">
                      {post.author.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-500 text-xs">
                      {post.author.role}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-500 mb-4">
                  <div className="flex items-center space-x-3">
                    <span className="flex items-center space-x-1">
                      <Calendar className="h-3 w-3" />
                      <span>{formatDate(post.publishedAt)}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-3 w-3" />
                      <span>{post.readTime} min</span>
                    </span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3 text-xs text-gray-500 dark:text-gray-500">
                    <span className="flex items-center space-x-1">
                      <Eye className="h-3 w-3" />
                      <span>{post.views.toLocaleString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <ThumbsUp className="h-3 w-3" />
                      <span>{post.likes}</span>
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                      <Bookmark className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-gray-400 hover:text-purple-600 transition-colors duration-200">
                      <Share2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Pagination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex items-center justify-center space-x-4"
        >
          <button
            disabled={currentPage === 1}
            className="p-2 text-gray-400 hover:text-purple-600 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center space-x-2">
            {[1, 2, 3, 4, 5].map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium transition-colors duration-200 ${
                  currentPage === page
                    ? 'bg-purple-600 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-purple-50 dark:hover:bg-gray-700'
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          
          <button
            disabled={currentPage === 5}
            className="p-2 text-gray-400 hover:text-purple-600 disabled:cursor-not-allowed disabled:hover:text-gray-400"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
