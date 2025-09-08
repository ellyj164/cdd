import React, { useState } from 'react';
import { MapPin, ChevronDown, Search, ShoppingCart, Menu, X, User, LogOut, Heart, Moon, Sun, GitCompare, Coins, Store, Phone, Mail } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useComparisonStore } from '../stores/useComparisonStore';
import { useLoyaltyStore } from '../stores/useLoyaltyStore';
import { useThemeStore } from '../stores/useThemeStore';
import ProductComparison from './ProductComparison.jsx';
import LanguageSelector from './LanguageSelector.jsx';
import AnnouncementBar from './AnnouncementBar.jsx';

const EnhancedHeader = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [userLocation, setUserLocation] = useState('New York 10001');

  const { t } = useTranslation();
  const { user, logout, isAuthenticated, isVendor, isAdmin } = useAuth();
  const { getCartCount } = useCartStore();
  const { getWishlistCount } = useWishlistStore();
  const { getComparisonCount } = useComparisonStore();
  const { points } = useLoyaltyStore();
  const { isDarkMode, toggleDarkMode } = useThemeStore();
  const navigate = useNavigate();

  const cartCount = getCartCount();
  const wishlistCount = getWishlistCount();
  const comparisonCount = getComparisonCount();

  const categories = [
    'All',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports & Outdoors',
    'Health & Beauty',
    'Books & Media',
    'Toys & Games',
    'Automotive',
    'Grocery & Food'
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}&category=${selectedCategory}`);
    }
  };

  return (
    <>
      <AnnouncementBar />
      
      {/* Main Header */}
      <header className="bg-gray-900 text-white sticky top-0 z-40 shadow-lg">
        <nav className="container mx-auto px-4">
          {/* Top Row */}
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg shadow-lg group-hover:shadow-xl transition-all duration-300">
                <Store className="h-6 w-6 text-white" />
              </div>
              <div className="hidden sm:block">
                <span className="text-xl font-bold text-white">
                  Global Nexus
                </span>
              </div>
            </Link>

            {/* Deliver To */}
            <div className="hidden lg:block">
              <button
                onClick={() => setIsLocationOpen(!isLocationOpen)}
                className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 relative"
              >
                <MapPin className="h-4 w-4 text-gray-300" />
                <div className="text-left">
                  <div className="text-xs text-gray-300">Deliver to</div>
                  <div className="text-sm font-medium">{userLocation}</div>
                </div>
                <ChevronDown className="h-4 w-4 text-gray-300" />
              </button>

              {/* Location Dropdown */}
              {isLocationOpen && (
                <div className="absolute top-16 left-0 w-80 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 p-4 z-50">
                  <h3 className="font-semibold mb-3">Choose your location</h3>
                  <div className="space-y-2">
                    <input
                      type="text"
                      placeholder="Enter ZIP code or city"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <button className="w-full bg-primary-600 text-white py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200">
                      Update Location
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="flex-1 max-w-2xl mx-4">
              <div className="flex">
                {/* Category Dropdown */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-12 pl-3 pr-8 bg-gray-100 text-gray-900 border-r border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-600 pointer-events-none" />
                </div>

                {/* Search Input */}
                <input
                  type="text"
                  placeholder="Search Global Nexus"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 h-12 px-4 text-gray-900 focus:outline-none"
                />

                {/* Search Button */}
                <button
                  type="submit"
                  className="h-12 px-6 bg-yellow-500 hover:bg-yellow-600 text-gray-900 rounded-r-lg transition-colors duration-200 flex items-center justify-center"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* Language & Currency */}
              <div className="hidden lg:block">
                <LanguageSelector />
              </div>

              {/* Account & Lists */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
                  >
                    <div className="text-left">
                      <div className="text-xs text-gray-300">Hello, {user.name}</div>
                      <div className="text-sm font-medium">Account & Lists</div>
                    </div>
                    <ChevronDown className="h-4 w-4 text-gray-300" />
                  </button>

                  {isUserMenuOpen && (
                    <div className="absolute top-16 right-0 w-72 bg-white text-gray-900 rounded-lg shadow-xl border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 bg-primary-600 rounded-full flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-primary-600 capitalize">{user.role}</div>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <Link to="/dashboard" className="block px-4 py-3 hover:bg-gray-50 rounded-lg">Your Account</Link>
                        <Link to="/orders" className="block px-4 py-3 hover:bg-gray-50 rounded-lg">Your Orders</Link>
                        <Link to="/wishlist" className="block px-4 py-3 hover:bg-gray-50 rounded-lg">Your Lists</Link>
                        <Link to="/loyalty" className="block px-4 py-3 hover:bg-gray-50 rounded-lg">Loyalty Points</Link>
                        {isVendor && (
                          <Link to="/vendor/dashboard" className="block px-4 py-3 hover:bg-gray-50 rounded-lg text-green-600">Vendor Dashboard</Link>
                        )}
                        {isAdmin && (
                          <Link to="/admin/dashboard" className="block px-4 py-3 hover:bg-gray-50 rounded-lg text-purple-600">Admin Dashboard</Link>
                        )}
                        <hr className="my-2" />
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-3 hover:bg-gray-50 rounded-lg text-red-600">
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-sm hover:underline">Sign In</Link>
                  <Link to="/register" className="bg-primary-600 hover:bg-primary-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200">
                    Sign Up
                  </Link>
                </div>
              )}

              {/* Returns & Orders */}
              <Link to="/orders" className="hidden lg:block">
                <div className="text-center px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200">
                  <div className="text-xs text-gray-300">Returns</div>
                  <div className="text-sm font-medium">& Orders</div>
                </div>
              </Link>

              {/* Cart */}
              <Link to="/cart" className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-gray-800 transition-colors duration-200 relative">
                <ShoppingCart className="h-6 w-6" />
                <span className="hidden sm:inline text-sm font-medium">Cart</span>
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-yellow-500 text-gray-900 text-xs font-bold rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-800 transition-colors duration-200"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>

          {/* Navigation Menu */}
          <div className="hidden lg:flex items-center h-10 space-x-6 border-t border-gray-700">
            <button className="flex items-center space-x-1 text-sm font-medium hover:text-yellow-400 transition-colors duration-200">
              <Menu className="h-4 w-4" />
              <span>All</span>
            </button>
            <Link to="/deals" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">Today's Deals</Link>
            <Link to="/customer-service" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">Customer Service</Link>
            <Link to="/registry" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">Registry</Link>
            <Link to="/gift-cards" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">Gift Cards</Link>
            <Link to="/sell" className="text-sm font-medium hover:text-yellow-400 transition-colors duration-200">Sell</Link>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-gray-800 border-t border-gray-700">
            <div className="px-4 py-3 space-y-3">
              <Link to="/deals" className="block text-sm font-medium hover:text-yellow-400">Today's Deals</Link>
              <Link to="/customer-service" className="block text-sm font-medium hover:text-yellow-400">Customer Service</Link>
              <Link to="/registry" className="block text-sm font-medium hover:text-yellow-400">Registry</Link>
              <Link to="/gift-cards" className="block text-sm font-medium hover:text-yellow-400">Gift Cards</Link>
              <Link to="/sell" className="block text-sm font-medium hover:text-yellow-400">Sell</Link>
              {!isAuthenticated && (
                <>
                  <hr className="border-gray-700" />
                  <Link to="/login" className="block text-sm font-medium hover:text-yellow-400">Sign In</Link>
                  <Link to="/register" className="block text-sm font-medium hover:text-yellow-400">Sign Up</Link>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Product Comparison Modal */}
      <ProductComparison
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </>
  );
};

export default EnhancedHeader;