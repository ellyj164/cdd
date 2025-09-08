import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Heart,
  ShoppingCart,
  Star,
  Trash2,
  Eye,
  Share2,
  Filter,
  Search,
  Grid3X3,
  List,
  ArrowLeft,
  Tag,
  TrendingUp,
  Clock
} from 'lucide-react';
import { useWishlistStore } from '../stores/useWishlistStore.js';
import { useCartStore } from '../stores/useCartStore.js';
import { toast } from 'react-hot-toast';

const WishlistPage = () => {
  const navigate = useNavigate();
  const { 
    wishlist, 
    removeFromWishlist, 
    clearWishlist,
    getWishlistCount 
  } = useWishlistStore();
  const { addToCart } = useCartStore();
  
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('recent');
  const [filterCategory, setFilterCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const wishlistCount = getWishlistCount();

  const categories = [...new Set(wishlist.map(item => item.category).filter(Boolean))];

  const filteredWishlist = wishlist.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedWishlist = [...filteredWishlist].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.name.localeCompare(b.name);
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      default:
        return 0;
    }
  });

  const handleAddToCart = (item) => {
    addToCart(item);
    toast.success('Added to cart');
  };

  const handleRemoveFromWishlist = (itemId) => {
    removeFromWishlist(itemId);
    toast.success('Removed from wishlist');
  };

  const handleAddAllToCart = () => {
    wishlist.forEach(item => addToCart(item));
    toast.success(`Added ${wishlist.length} items to cart`);
  };

  const renderStars = (rating) => {
    if (!rating) return null;
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

  const WishlistItemGrid = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
    >
      <div className="relative">
        <img
          src={item.imageUrl || item.image || '/api/placeholder/300/300'}
          alt={item.name}
          className="w-full h-48 object-cover"
        />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-col space-y-2">
            <button
              onClick={() => handleRemoveFromWishlist(item.id)}
              className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 transition-colors"
            >
              <Trash2 className="w-4 h-4 text-red-500" />
            </button>
            <button className="p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors">
              <Share2 className="w-4 h-4 text-gray-600" />
            </button>
          </div>
        </div>

        {/* Discount Badge */}
        {item.originalPrice && item.originalPrice > item.price && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-medium">
            {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
          </div>
        )}

        {/* Quick View */}
        <Link
          to={`/product/${item.id}`}
          className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-10 transition-opacity flex items-center justify-center opacity-0 hover:opacity-100"
        >
          <div className="bg-white rounded-full p-2">
            <Eye className="w-5 h-5 text-gray-600" />
          </div>
        </Link>
      </div>

      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-gray-900 text-sm leading-tight mb-1 line-clamp-2">
            {item.name}
          </h3>
          {item.brand && (
            <p className="text-xs text-gray-500">{item.brand}</p>
          )}
        </div>

        {item.rating && (
          <div className="flex items-center space-x-1 mb-2">
            {renderStars(item.rating)}
            <span className="text-xs text-gray-500">({item.rating})</span>
          </div>
        )}

        <div className="flex items-center space-x-2 mb-3">
          <span className="text-lg font-bold text-gray-900">${item.price}</span>
          {item.originalPrice && item.originalPrice > item.price && (
            <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
          )}
        </div>

        <div className="flex space-x-2">
          <button
            onClick={() => handleAddToCart(item)}
            className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center justify-center"
          >
            <ShoppingCart className="w-4 h-4 mr-1" />
            Add to Cart
          </button>
          <button
            onClick={() => handleRemoveFromWishlist(item.id)}
            className="p-2 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-colors"
          >
            <Heart className="w-4 h-4 text-red-500 fill-current" />
          </button>
        </div>

        {/* Stock Status */}
        {item.inStock === false && (
          <div className="mt-2 text-xs text-red-600 bg-red-50 px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>
    </motion.div>
  );

  const WishlistItemList = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.imageUrl || item.image || '/api/placeholder/96/96'} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <Link
                to={`/product/${item.id}`}
                className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors"
              >
                {item.name}
              </Link>
              {item.brand && (
                <p className="text-sm text-gray-500 mb-2">{item.brand}</p>
              )}
              
              {item.rating && (
                <div className="flex items-center space-x-2 mb-2">
                  {renderStars(item.rating)}
                  <span className="text-sm text-gray-500">({item.rating})</span>
                </div>
              )}
              
              <div className="flex items-center space-x-4 mb-3">
                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <>
                    <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                    <span className="text-sm text-green-600 font-medium">
                      Save ${(item.originalPrice - item.price).toFixed(2)}
                    </span>
                  </>
                )}
              </div>
              
              {item.description && (
                <p className="text-sm text-gray-600 line-clamp-2 mb-3">{item.description}</p>
              )}
            </div>
            
            <div className="flex flex-col items-end space-y-2 ml-4">
              <button
                onClick={() => handleRemoveFromWishlist(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button className="text-gray-400 hover:text-gray-600 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => handleAddToCart(item)}
                disabled={item.inStock === false}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                {item.inStock === false ? 'Out of Stock' : 'Add to Cart'}
              </button>
              
              <Link
                to={`/product/${item.id}`}
                className="text-blue-600 hover:text-blue-800 text-sm font-medium"
              >
                View Details
              </Link>
            </div>
            
            {item.category && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                {item.category}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );

  if (wishlist.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your wishlist is empty</h2>
            <p className="text-gray-500 mb-8">Save items you love for later by clicking the heart icon</p>
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">My Wishlist</h1>
              <p className="text-gray-500 mt-1">{wishlistCount} items saved</p>
            </div>
            
            {wishlist.length > 0 && (
              <div className="flex items-center space-x-3">
                <button
                  onClick={handleAddAllToCart}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 transition-colors flex items-center"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add All to Cart
                </button>
                <button
                  onClick={() => {
                    clearWishlist();
                    toast.success('Wishlist cleared');
                  }}
                  className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search wishlist items..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
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

              {/* Sort */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="recent">Recently Added</option>
                <option value="name">Name A-Z</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>

              {/* View Mode */}
              <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <Grid3X3 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 hover:bg-gray-50'} transition-colors`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Items */}
        {sortedWishlist.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No items match your search criteria</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' 
            ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'
            : 'space-y-4'
          }>
            {sortedWishlist.map((item) => (
              viewMode === 'grid' 
                ? <WishlistItemGrid key={item.id} item={item} />
                : <WishlistItemList key={item.id} item={item} />
            ))}
          </div>
        )}

        {/* Recommended Products */}
        {wishlist.length > 0 && (
          <div className="mt-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">You might also like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { id: 'rec1', name: 'Wireless Mouse', price: 29.99, rating: 4.5, image: '/api/placeholder/200/200' },
                { id: 'rec2', name: 'USB-C Hub', price: 69.99, rating: 4.3, image: '/api/placeholder/200/200' },
                { id: 'rec3', name: 'Desk Lamp', price: 89.99, rating: 4.7, image: '/api/placeholder/200/200' },
                { id: 'rec4', name: 'Phone Stand', price: 24.99, rating: 4.2, image: '/api/placeholder/200/200' }
              ].map((product) => (
                <motion.div
                  key={product.id}
                  whileHover={{ y: -5 }}
                  className="bg-white rounded-lg border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-medium text-gray-900 mb-2">{product.name}</h3>
                    <div className="flex items-center space-x-1 mb-2">
                      {renderStars(product.rating)}
                      <span className="text-sm text-gray-500">({product.rating})</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-lg font-bold text-gray-900">${product.price}</p>
                      <button className="text-gray-400 hover:text-red-500 transition-colors">
                        <Heart className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage;
