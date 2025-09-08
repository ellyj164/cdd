import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Sparkles,
  Star,
  Heart,
  ShoppingCart,
  Eye,
  Clock,
  Award,
  TrendingUp,
  Filter,
  Search,
  Grid3X3,
  List,
  ArrowLeft,
  Calendar,
  Package,
  Zap,
  Gift
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore.js';
import { useWishlistStore } from '../stores/useWishlistStore.js';
import { apiService } from '../services/apiService.js';
import { toast } from 'react-hot-toast';

const NewArrivalsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('newest');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');
  const [dateFilter, setDateFilter] = useState('all');

  useEffect(() => {
    loadNewArrivals();
  }, []);

  const loadNewArrivals = async () => {
    try {
      setLoading(true);
      // Try to load from API first, fallback to demo data
      try {
        const data = await apiService.products.getNewArrivals();
        setProducts(data);
      } catch (error) {
        // Fallback demo new arrivals
        setProducts([
          {
            id: 'new1',
            name: 'Ultra-Slim Wireless Charging Pad',
            price: 79.99,
            originalPrice: 99.99,
            rating: 4.8,
            reviewCount: 234,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'TechPro',
            inStock: true,
            stockCount: 25,
            dateAdded: '2024-01-15',
            features: ['15W Fast Charging', 'LED Indicator', 'Universal Compatibility'],
            badges: ['New', 'Trending'],
            isNew: true,
            description: 'Revolutionary wireless charging technology with premium materials'
          },
          {
            id: 'new2',
            name: 'Smart Home Security Camera',
            price: 149.99,
            rating: 4.7,
            reviewCount: 156,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'SecureHome',
            inStock: true,
            stockCount: 18,
            dateAdded: '2024-01-14',
            features: ['4K Recording', 'Night Vision', 'AI Detection'],
            badges: ['New', 'Hot'],
            isNew: true,
            description: 'Advanced AI-powered security with crystal clear 4K video'
          },
          {
            id: 'new3',
            name: 'Ergonomic Gaming Chair Pro',
            price: 299.99,
            originalPrice: 399.99,
            rating: 4.9,
            reviewCount: 89,
            image: '/api/placeholder/300/300',
            category: 'Furniture',
            brand: 'ComfortGamer',
            inStock: true,
            stockCount: 12,
            dateAdded: '2024-01-13',
            features: ['Lumbar Support', 'RGB Lighting', 'Premium Leather'],
            badges: ['New', 'Premium'],
            isNew: true,
            description: 'Ultimate gaming comfort with professional-grade ergonomics'
          },
          {
            id: 'new4',
            name: 'Minimalist Desk Organizer Set',
            price: 59.99,
            rating: 4.6,
            reviewCount: 342,
            image: '/api/placeholder/300/300',
            category: 'Office',
            brand: 'MinimalCo',
            inStock: true,
            stockCount: 33,
            dateAdded: '2024-01-12',
            features: ['Bamboo Material', 'Modular Design', 'Eco-Friendly'],
            badges: ['New', 'Eco'],
            isNew: true,
            description: 'Sustainable organization solution for modern workspaces'
          },
          {
            id: 'new5',
            name: 'Professional Coffee Scale',
            price: 89.99,
            rating: 4.8,
            reviewCount: 278,
            image: '/api/placeholder/300/300',
            category: 'Kitchen',
            brand: 'BrewMaster',
            inStock: true,
            stockCount: 21,
            dateAdded: '2024-01-11',
            features: ['0.1g Precision', 'Timer Function', 'Waterproof'],
            badges: ['New', 'Professional'],
            isNew: true,
            description: 'Precision brewing for the perfect cup every time'
          },
          {
            id: 'new6',
            name: 'Smart Air Purifier',
            price: 199.99,
            originalPrice: 249.99,
            rating: 4.7,
            reviewCount: 167,
            image: '/api/placeholder/300/300',
            category: 'Home & Garden',
            brand: 'PureAir',
            inStock: true,
            stockCount: 15,
            dateAdded: '2024-01-10',
            features: ['HEPA Filter', 'App Control', 'Air Quality Monitor'],
            badges: ['New', 'Smart'],
            isNew: true,
            description: 'Intelligent air purification with real-time monitoring'
          },
          {
            id: 'new7',
            name: 'Waterproof Bluetooth Speaker',
            price: 69.99,
            rating: 4.5,
            reviewCount: 423,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'SoundWave',
            inStock: true,
            stockCount: 28,
            dateAdded: '2024-01-09',
            features: ['IP67 Rating', '20hr Battery', '360° Sound'],
            badges: ['New', 'Waterproof'],
            isNew: true,
            description: 'Adventure-ready audio with exceptional sound quality'
          },
          {
            id: 'new8',
            name: 'LED Desk Lamp with Wireless Charging',
            price: 119.99,
            rating: 4.6,
            reviewCount: 198,
            image: '/api/placeholder/300/300',
            category: 'Office',
            brand: 'LuminaTech',
            inStock: true,
            stockCount: 19,
            dateAdded: '2024-01-08',
            features: ['Touch Control', '10W Charging', 'Eye Care'],
            badges: ['New', 'Innovative'],
            isNew: true,
            description: 'Multi-functional workspace lighting with charging capability'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading new arrivals:', error);
      toast.error('Failed to load new arrivals');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(products.map(product => product.category))];

  const filteredProducts = products.filter(product => {
    const matchesCategory = filterCategory === 'all' || product.category === filterCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'under50' && product.price < 50) ||
                        (priceRange === '50to100' && product.price >= 50 && product.price <= 100) ||
                        (priceRange === '100to200' && product.price > 100 && product.price <= 200) ||
                        (priceRange === 'over200' && product.price > 200);
    
    const today = new Date();
    const productDate = new Date(product.dateAdded);
    const daysDiff = Math.floor((today - productDate) / (1000 * 60 * 60 * 24));
    
    const matchesDate = dateFilter === 'all' ||
                       (dateFilter === '7days' && daysDiff <= 7) ||
                       (dateFilter === '30days' && daysDiff <= 30) ||
                       (dateFilter === '90days' && daysDiff <= 90);
    
    return matchesCategory && matchesSearch && matchesPrice && matchesDate;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.dateAdded) - new Date(a.dateAdded);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return b.rating - a.rating;
      case 'popular':
        return b.reviewCount - a.reviewCount;
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    toast.success('Added to cart');
  };

  const handleToggleWishlist = (product) => {
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist(product);
      toast.success('Added to wishlist');
    }
  };

  const getDaysAgo = (dateAdded) => {
    const today = new Date();
    const productDate = new Date(dateAdded);
    const daysDiff = Math.floor((today - productDate) / (1000 * 60 * 60 * 24));
    
    if (daysDiff === 0) return 'Today';
    if (daysDiff === 1) return '1 day ago';
    if (daysDiff <= 7) return `${daysDiff} days ago`;
    if (daysDiff <= 30) return `${Math.floor(daysDiff / 7)} weeks ago`;
    return `${Math.floor(daysDiff / 30)} months ago`;
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.floor(rating) 
            ? 'text-yellow-400 fill-current' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const ProductCard = ({ product }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-1">
          {product.badges.map((badge, index) => (
            <span
              key={index}
              className={`text-xs font-medium px-2 py-1 rounded ${
                badge === 'New' ? 'bg-green-500 text-white' :
                badge === 'Trending' ? 'bg-blue-500 text-white' :
                badge === 'Hot' ? 'bg-red-500 text-white' :
                badge === 'Premium' ? 'bg-purple-500 text-white' :
                badge === 'Eco' ? 'bg-emerald-500 text-white' :
                'bg-gray-500 text-white'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Sale Badge */}
        {product.originalPrice && product.originalPrice > product.price && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            SALE
          </div>
        )}

        {/* Quick Actions */}
        <div className="absolute top-12 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleToggleWishlist(product)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Heart className={`w-4 h-4 ${isInWishlist(product.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
            >
              <Eye className="w-4 h-4 text-gray-600" />
            </Link>
          </div>
        </div>

        {/* New Indicator */}
        <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
          <div className="flex items-center space-x-1">
            <Sparkles className="w-3 h-3" />
            <span>{getDaysAgo(product.dateAdded)}</span>
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <p className="text-xs text-gray-500 mb-1">{product.brand}</p>
          <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
            {product.name}
          </h3>
        </div>

        <div className="flex items-center space-x-1 mb-2">
          {renderStars(product.rating)}
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${product.price}</span>
          {product.originalPrice && product.originalPrice > product.price && (
            <>
              <span className="text-sm text-gray-500 line-through">${product.originalPrice}</span>
              <span className="text-xs bg-red-100 text-red-800 px-1 py-0.5 rounded">
                -{Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
              </span>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mb-3">
          <div className="flex flex-wrap gap-1">
            {product.features.slice(0, 2).map((feature, index) => (
              <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                {feature}
              </span>
            ))}
            {product.features.length > 2 && (
              <span className="text-xs text-gray-500">+{product.features.length - 2}</span>
            )}
          </div>
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleAddToCart(product)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
          <Link
            to={`/product/${product.id}`}
            className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
          >
            <Eye className="w-4 h-4 text-gray-600" />
          </Link>
        </div>

        {/* Stock indicator */}
        {product.stockCount <= 10 && (
          <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded text-center">
            Only {product.stockCount} left in stock!
          </div>
        )}
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 mb-4"
            >
              <Sparkles className="w-8 h-8" />
              <h1 className="text-4xl font-bold">New Arrivals</h1>
              <Sparkles className="w-8 h-8" />
            </motion.div>
            <p className="text-xl opacity-90 mb-8">Discover the latest products and innovations</p>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Package className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Fresh Stock</h3>
                <p className="text-sm opacity-90">Latest inventory</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Trending</h3>
                <p className="text-sm opacity-90">Popular picks</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Award className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Premium</h3>
                <p className="text-sm opacity-90">High-quality items</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Innovation</h3>
                <p className="text-sm opacity-90">Latest technology</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <nav className="text-sm text-gray-500">
            <span>Home</span>
            <span className="mx-2">›</span>
            <span className="text-gray-900">New Arrivals</span>
          </nav>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Category Filter */}
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            {/* Price Range */}
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Prices</option>
              <option value="under50">Under $50</option>
              <option value="50to100">$50 - $100</option>
              <option value="100to200">$100 - $200</option>
              <option value="over200">Over $200</option>
            </select>

            {/* Date Filter */}
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Time</option>
              <option value="7days">Last 7 days</option>
              <option value="30days">Last 30 days</option>
              <option value="90days">Last 90 days</option>
            </select>

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="newest">Newest First</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="popular">Most Popular</option>
            </select>

            {/* View Mode */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <Grid3X3 className="w-4 h-4 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
              >
                <List className="w-4 h-4 mx-auto" />
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {sortedProducts.length} New Products
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>Updated daily</span>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No new arrivals found</h2>
            <p className="text-gray-500">Try adjusting your filters to see more products</p>
          </div>
        ) : (
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'grid-cols-1 gap-4'
          }`}>
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl text-white p-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Gift className="w-8 h-8" />
            <h2 className="text-2xl font-bold">Be First to Know!</h2>
          </div>
          <p className="mb-6 opacity-90">Get notified when new products arrive and receive exclusive early access</p>
          <div className="flex max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none"
            />
            <button className="bg-yellow-500 text-gray-900 px-6 py-2 rounded-r-lg font-medium hover:bg-yellow-400 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewArrivalsPage;
