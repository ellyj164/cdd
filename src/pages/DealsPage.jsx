import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Tag,
  Star,
  Heart,
  ShoppingCart,
  Clock,
  Flame,
  Zap,
  Gift,
  Percent,
  Filter,
  Search,
  Grid3X3,
  List,
  ArrowLeft,
  Timer,
  TrendingUp,
  Award,
  Target
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore.js';
import { useWishlistStore } from '../stores/useWishlistStore.js';
import { apiService } from '../services/apiService.js';
import { toast } from 'react-hot-toast';

const DealsPage = () => {
  const navigate = useNavigate();
  const { addToCart } = useCartStore();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('discount');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState('all');

  useEffect(() => {
    loadDeals();
  }, []);

  const loadDeals = async () => {
    try {
      setLoading(true);
      // Try to load from API first, fallback to demo data
      try {
        const data = await apiService.products.getDeals();
        setDeals(data);
      } catch (error) {
        // Fallback demo deals
        setDeals([
          {
            id: 'deal1',
            name: 'Premium Wireless Headphones',
            originalPrice: 399.99,
            salePrice: 299.99,
            discount: 25,
            rating: 4.8,
            reviewCount: 2431,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'AudioPro',
            inStock: true,
            stockCount: 15,
            dealType: 'flash',
            dealEnds: '2024-01-20T23:59:59',
            features: ['Noise Cancellation', '30hr Battery', 'Wireless'],
            badge: 'Flash Sale'
          },
          {
            id: 'deal2',
            name: 'Smart Fitness Watch',
            originalPrice: 249.99,
            salePrice: 179.99,
            discount: 28,
            rating: 4.6,
            reviewCount: 1876,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'FitTech',
            inStock: true,
            stockCount: 8,
            dealType: 'daily',
            dealEnds: '2024-01-16T23:59:59',
            features: ['Heart Rate', 'GPS', 'Waterproof'],
            badge: 'Daily Deal'
          },
          {
            id: 'deal3',
            name: 'Professional Coffee Maker',
            originalPrice: 199.99,
            salePrice: 129.99,
            discount: 35,
            rating: 4.7,
            reviewCount: 987,
            image: '/api/placeholder/300/300',
            category: 'Home & Kitchen',
            brand: 'BrewMaster',
            inStock: true,
            stockCount: 22,
            dealType: 'clearance',
            features: ['15-bar Pressure', 'Milk Frother', 'Auto Clean'],
            badge: 'Clearance'
          },
          {
            id: 'deal4',
            name: 'Gaming Mechanical Keyboard',
            originalPrice: 159.99,
            salePrice: 99.99,
            discount: 38,
            rating: 4.9,
            reviewCount: 1543,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'GamePro',
            inStock: true,
            stockCount: 31,
            dealType: 'weekly',
            dealEnds: '2024-01-21T23:59:59',
            features: ['RGB Backlight', 'Mechanical Switches', 'Wireless'],
            badge: 'Weekly Special'
          },
          {
            id: 'deal5',
            name: 'Wireless Phone Charger',
            originalPrice: 49.99,
            salePrice: 24.99,
            discount: 50,
            rating: 4.4,
            reviewCount: 756,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'ChargeFast',
            inStock: true,
            stockCount: 45,
            dealType: 'flash',
            dealEnds: '2024-01-16T18:00:00',
            features: ['Fast Charging', 'LED Indicator', 'Universal'],
            badge: 'Flash Sale'
          },
          {
            id: 'deal6',
            name: 'Bluetooth Speaker Set',
            originalPrice: 89.99,
            salePrice: 59.99,
            discount: 33,
            rating: 4.5,
            reviewCount: 623,
            image: '/api/placeholder/300/300',
            category: 'Electronics',
            brand: 'SoundWave',
            inStock: true,
            stockCount: 18,
            dealType: 'daily',
            dealEnds: '2024-01-16T23:59:59',
            features: ['360° Sound', 'Waterproof', '12hr Battery'],
            badge: 'Daily Deal'
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading deals:', error);
      toast.error('Failed to load deals');
    } finally {
      setLoading(false);
    }
  };

  const categories = [...new Set(deals.map(deal => deal.category))];

  const filteredDeals = deals.filter(deal => {
    const matchesCategory = filterCategory === 'all' || deal.category === filterCategory;
    const matchesSearch = deal.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         deal.brand.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPrice = priceRange === 'all' ||
                        (priceRange === 'under50' && deal.salePrice < 50) ||
                        (priceRange === '50to100' && deal.salePrice >= 50 && deal.salePrice <= 100) ||
                        (priceRange === '100to200' && deal.salePrice > 100 && deal.salePrice <= 200) ||
                        (priceRange === 'over200' && deal.salePrice > 200);
    return matchesCategory && matchesSearch && matchesPrice;
  });

  const sortedDeals = [...filteredDeals].sort((a, b) => {
    switch (sortBy) {
      case 'discount':
        return b.discount - a.discount;
      case 'price-low':
        return a.salePrice - b.salePrice;
      case 'price-high':
        return b.salePrice - a.salePrice;
      case 'rating':
        return b.rating - a.rating;
      case 'ending-soon':
        return new Date(a.dealEnds || '2024-12-31') - new Date(b.dealEnds || '2024-12-31');
      default:
        return 0;
    }
  });

  const handleAddToCart = (deal) => {
    addToCart({
      ...deal,
      price: deal.salePrice,
      originalPrice: deal.originalPrice
    });
    toast.success('Added to cart');
  };

  const handleToggleWishlist = (deal) => {
    if (isInWishlist(deal.id)) {
      removeFromWishlist(deal.id);
      toast.success('Removed from wishlist');
    } else {
      addToWishlist({
        ...deal,
        price: deal.salePrice,
        originalPrice: deal.originalPrice
      });
      toast.success('Added to wishlist');
    }
  };

  const getTimeRemaining = (endDate) => {
    if (!endDate) return null;
    const now = new Date();
    const end = new Date(endDate);
    const diff = end - now;
    
    if (diff <= 0) return null;
    
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    return { hours, minutes };
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

  const DealCard = ({ deal }) => {
    const timeRemaining = getTimeRemaining(deal.dealEnds);
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
      >
        <div className="relative">
          <img
            src={deal.image}
            alt={deal.name}
            className="w-full h-48 object-cover"
          />
          
          {/* Discount Badge */}
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-bold">
            -{deal.discount}%
          </div>

          {/* Deal Type Badge */}
          <div className="absolute top-3 right-3 bg-blue-600 text-white px-2 py-1 rounded text-xs font-medium">
            {deal.badge}
          </div>

          {/* Wishlist Button */}
          <button
            onClick={() => handleToggleWishlist(deal)}
            className="absolute top-12 right-3 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors opacity-0 group-hover:opacity-100"
          >
            <Heart className={`w-4 h-4 ${isInWishlist(deal.id) ? 'text-red-500 fill-current' : 'text-gray-600'}`} />
          </button>

          {/* Timer for flash sales */}
          {timeRemaining && deal.dealType === 'flash' && (
            <div className="absolute bottom-3 left-3 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
              <div className="flex items-center space-x-1">
                <Timer className="w-3 h-3" />
                <span>{timeRemaining.hours}h {timeRemaining.minutes}m</span>
              </div>
            </div>
          )}
        </div>

        <div className="p-4">
          <div className="mb-2">
            <p className="text-xs text-gray-500 mb-1">{deal.brand}</p>
            <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2">
              {deal.name}
            </h3>
          </div>

          <div className="flex items-center space-x-1 mb-2">
            {renderStars(deal.rating)}
            <span className="text-xs text-gray-500">({deal.reviewCount})</span>
          </div>

          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg font-bold text-red-600">${deal.salePrice}</span>
            <span className="text-sm text-gray-500 line-through">${deal.originalPrice}</span>
            <span className="text-xs bg-green-100 text-green-800 px-1 py-0.5 rounded">
              Save ${(deal.originalPrice - deal.salePrice).toFixed(2)}
            </span>
          </div>

          {/* Features */}
          <div className="mb-3">
            <div className="flex flex-wrap gap-1">
              {deal.features.slice(0, 2).map((feature, index) => (
                <span key={index} className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                  {feature}
                </span>
              ))}
              {deal.features.length > 2 && (
                <span className="text-xs text-gray-500">+{deal.features.length - 2}</span>
              )}
            </div>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => handleAddToCart(deal)}
              className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
            >
              <ShoppingCart className="w-4 h-4 mr-1" />
              Add to Cart
            </button>
            <Link
              to={`/product/${deal.id}`}
              className="px-3 py-2 border border-gray-300 rounded-lg hover:border-gray-400 transition-colors flex items-center justify-center"
            >
              <Search className="w-4 h-4 text-gray-600" />
            </Link>
          </div>

          {/* Stock indicator */}
          {deal.stockCount <= 10 && (
            <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded text-center">
              Only {deal.stockCount} left in stock!
            </div>
          )}
        </div>
      </motion.div>
    );
  };

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
      <div className="bg-gradient-to-r from-red-600 to-pink-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-center space-x-2 mb-4"
            >
              <Flame className="w-8 h-8" />
              <h1 className="text-4xl font-bold">Today's Hot Deals</h1>
              <Flame className="w-8 h-8" />
            </motion.div>
            <p className="text-xl opacity-90 mb-8">Save up to 50% on top products. Limited time offers!</p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Zap className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Flash Sales</h3>
                <p className="text-sm opacity-90">Limited time offers</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Gift className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Daily Deals</h3>
                <p className="text-sm opacity-90">New deals every day</p>
              </div>
              <div className="bg-white bg-opacity-20 rounded-lg p-4">
                <Percent className="w-8 h-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Clearance</h3>
                <p className="text-sm opacity-90">Up to 70% off</p>
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
            <span className="text-gray-900">Deals & Offers</span>
          </nav>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search deals..."
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

            {/* Sort */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="discount">Highest Discount</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="ending-soon">Ending Soon</option>
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
            {sortedDeals.length} Deals Found
          </h2>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Flame className="w-4 h-4 text-red-500" />
              <span>Flash Sales</span>
            </div>
            <div className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4 text-blue-500" />
              <span>Daily Deals</span>
            </div>
            <div className="flex items-center space-x-1">
              <Award className="w-4 h-4 text-purple-500" />
              <span>Clearance</span>
            </div>
          </div>
        </div>

        {/* Deals Grid */}
        {sortedDeals.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Tag className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No deals found</h2>
            <p className="text-gray-500">Try adjusting your filters to see more deals</p>
          </div>
        ) : (
          <div className={`grid ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
              : 'grid-cols-1 gap-4'
          }`}>
            {sortedDeals.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        )}

        {/* Newsletter Section */}
        <div className="mt-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl text-white p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Never Miss a Deal!</h2>
          <p className="mb-6 opacity-90">Subscribe to get notified about flash sales and exclusive offers</p>
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

export default DealsPage;
