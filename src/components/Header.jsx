import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X, User, LogOut, Heart, Moon, Sun, GitCompare, Coins, Store, Phone, Mail } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useComparisonStore } from '../stores/useComparisonStore';
import { useLoyaltyStore } from '../stores/useLoyaltyStore';
import { useThemeStore } from '../stores/useThemeStore';
import ProductComparison from './ProductComparison.jsx';
import LanguageSelector from './LanguageSelector.jsx';

const Header = ({ searchTerm, setSearchTerm }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <>
      {/* Top Header Bar */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 text-white py-2 px-4 text-sm">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4" />
              <span>Support: +1 (555) 123-4567</span>
            </div>
            <div className="hidden md:flex items-center space-x-2">
              <Mail className="h-4 w-4" />
              <span>support@duns1.fezalogistics.com</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="hidden md:inline">Free shipping on orders over $50</span>
            <LanguageSelector />
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-40 transition-colors duration-200 border-b-2 border-primary-100 dark:border-primary-800">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-8">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg group-hover:shadow-xl transition-all duration-300">
                  <Store className="h-7 w-7 text-white" />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent">
                    Global Nexus
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    Premium Marketplace
                  </span>
                </div>
              </Link>
              
              {/* Main Navigation */}
              <div className="hidden lg:block">
                <div className="flex items-center space-x-1">
                  <Link to="/" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">{t('header.home')}</Link>
                  <Link to="/deals" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20 relative">
                    {t('header.deals')}
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full font-medium">
                      Hot
                    </span>
                  </Link>
                  <Link to="/new-arrivals" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">{t('header.newArrivals')}</Link>
                  <Link to="/categories" className="text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">{t('header.categories')}</Link>
                  {isVendor && (
                    <Link to="/vendor/dashboard" className="text-green-600 dark:text-green-400 font-medium px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                      {t('header.vendorDashboard')}
                    </Link>
                  )}
                  {isAdmin && (
                    <Link to="/admin/dashboard" className="text-purple-600 dark:text-purple-400 font-medium px-4 py-2 rounded-xl text-sm transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/20">
                      {t('header.adminDashboard')}
                    </Link>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <input 
                  type="text" 
                  placeholder={t('header.search')} 
                  className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200 shadow-sm"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200">
                  <Search className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            {/* Action Icons */}
            <div className="flex items-center space-x-3">
              {/* Loyalty Points */}
              {isAuthenticated && (
                <Link
                  to="/loyalty"
                  className="hidden lg:flex items-center space-x-2 px-3 py-2 rounded-xl text-sm font-medium text-yellow-600 dark:text-yellow-400 bg-yellow-50 dark:bg-yellow-900/20 hover:bg-yellow-100 dark:hover:bg-yellow-900/30 transition-all duration-200"
                >
                  <Coins className="h-4 w-4" />
                  <span>{points.toLocaleString()}</span>
                </Link>
              )}
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                title="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Comparison */}
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative"
                disabled={comparisonCount === 0}
                title="Product comparison"
              >
                <GitCompare className={`h-5 w-5 ${comparisonCount === 0 ? 'opacity-50' : ''}`} />
                {comparisonCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-blue-500">{comparisonCount}</span>
                )}
              </button>

              {/* Wishlist */}
              <Link
                to="/wishlist"
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative"
                title="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-red-500">{wishlistCount}</span>
                )}
              </Link>

              {/* Cart */}
              <Link
                to="/cart"
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative"
                title="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-primary-600">{cartCount}</span>
                )}
              </Link>
              
              {/* User Menu or Auth Buttons */}
              {isAuthenticated ? (
                <div className="relative">
                  <button 
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className="flex items-center space-x-2 p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  >
                    <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center shadow-md">
                      <User className="h-5 w-5 text-white" />
                    </div>
                    <div className="hidden lg:block text-left">
                      <div className="text-sm font-medium text-gray-900 dark:text-white">{user.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-400 capitalize">{user.role}</div>
                    </div>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl shadow-xl py-2 z-50 border-2 border-gray-100 dark:border-gray-700">
                      <div className="px-4 py-3 border-b border-gray-100 dark:border-gray-700">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                            <div className="text-xs text-primary-600 dark:text-primary-400 capitalize font-medium">{user.role} Account</div>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <User className="h-4 w-4" />
                          <span>My Profile</span>
                        </Link>
                        <Link to="/orders" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <ShoppingCart className="h-4 w-4" />
                          <span>My Orders</span>
                        </Link>
                        <Link to="/wishlist" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                          <Heart className="h-4 w-4" />
                          <span>{t('header.wishlist')} ({wishlistCount})</span>
                        </Link>
                        {isAuthenticated && (
                          <Link to="/loyalty" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200">
                            <Coins className="h-4 w-4" />
                            <span>Loyalty Points ({points.toLocaleString()})</span>
                          </Link>
                        )}
                      </div>
                      <div className="border-t border-gray-100 dark:border-gray-700 py-2">
                        <button 
                          onClick={handleLogout}
                          className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 text-red-600 dark:text-red-400 w-full"
                        >
                          <LogOut className="h-4 w-4" />
                          <span>{t('header.signOut')}</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <Link to="/login" className="text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">{t('header.signIn')}</Link>
                  <Link to="/register" className="inline-flex items-center justify-center rounded-xl border-2 border-transparent bg-gradient-to-r from-primary-600 to-primary-700 px-6 py-2.5 text-sm font-medium text-white shadow-lg hover:shadow-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200 transform hover:-translate-y-0.5">{t('header.signUp')}</Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)} 
                className="lg:hidden action-btn"
                title="Menu"
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </nav>

        {/* Mobile Search */}
        <div className="md:hidden px-4 pb-4">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('header.search')} 
              className="w-full pl-4 pr-12 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 transition-all duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white p-2 rounded-lg transition-colors duration-200">
              <Search className="h-4 w-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-gray-800 border-b-2 border-gray-100 dark:border-gray-700 shadow-lg">
          <div className="px-4 pt-2 pb-3 space-y-1">
            <Link to="/" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200">{t('header.home')}</Link>
            <Link to="/deals" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200">
              {t('header.deals')}
              <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">Hot</span>
            </Link>
            <Link to="/new-arrivals" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200">{t('header.newArrivals')}</Link>
            <Link to="/categories" className="flex items-center text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base font-medium transition-all duration-200">{t('header.categories')}</Link>
            {isVendor && (
              <Link to="/vendor/dashboard" className="flex items-center text-green-600 dark:text-green-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base transition-all duration-200">
                {t('header.vendorDashboard')}
              </Link>
            )}
            {isAdmin && (
              <Link to="/admin/dashboard" className="flex items-center text-purple-600 dark:text-purple-400 font-medium hover:bg-primary-50 dark:hover:bg-primary-900/20 block px-3 py-3 rounded-xl text-base transition-all duration-200">
                {t('header.adminDashboard')}
              </Link>
            )}
          </div>
          
          <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-center space-x-4 px-4 mb-4">
              <button
                onClick={toggleDarkMode}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200"
                title="Toggle dark mode"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative"
                disabled={comparisonCount === 0}
                title="Product comparison"
              >
                <GitCompare className={`h-5 w-5 ${comparisonCount === 0 ? 'opacity-50' : ''}`} />
                {comparisonCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-blue-500">{comparisonCount}</span>}
              </button>
              <Link to="/wishlist" className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative" title="Wishlist">
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-red-500">{wishlistCount}</span>}
              </Link>
              <Link to="/cart" className="p-2.5 rounded-xl text-gray-600 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-900/20 focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all duration-200 relative" title="Shopping cart">
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full text-xs font-medium text-white bg-primary-600">{cartCount}</span>}
              </Link>
            </div>
            
            {isAuthenticated ? (
              <div className="px-4 space-y-3">
                <div className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl">
                  <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center">
                    <User className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{user.email}</div>
                    <div className="text-xs text-primary-600 dark:text-primary-400 capitalize font-medium">{user.role} Account</div>
                  </div>
                </div>
                <div className="space-y-1">
                  <Link to="/dashboard" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200">
                    <User className="h-4 w-4" />
                    <span>My Profile</span>
                  </Link>
                  <Link to="/orders" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200">
                    <ShoppingCart className="h-4 w-4" />
                    <span>My Orders</span>
                  </Link>
                  {isAuthenticated && (
                    <Link to="/loyalty" className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200">
                      <Coins className="h-4 w-4" />
                      <span>Loyalty Points ({points.toLocaleString()})</span>
                    </Link>
                  )}
                  <button 
                    onClick={handleLogout}
                    className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 rounded-xl transition-colors duration-200 text-red-600 dark:text-red-400 w-full"
                  >
                    <LogOut className="h-4 w-4" />
                    <span>{t('header.signOut')}</span>
                  </button>
                </div>
              </div>
            ) : (
              <div className="px-4 space-y-3">
                <Link to="/login" className="block w-full text-center px-4 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 rounded-xl hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">{t('header.signIn')}</Link>
                <Link to="/register" className="block w-full text-center px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-600 to-primary-700 rounded-xl hover:from-primary-700 hover:to-primary-800 transition-all duration-200">{t('header.signUp')}</Link>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Product Comparison Modal */}
      <ProductComparison 
        isOpen={isComparisonOpen}
        onClose={() => setIsComparisonOpen(false)}
      />
    </>
  );
};
export default Header;
