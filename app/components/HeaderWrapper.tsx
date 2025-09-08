'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Search, ShoppingCart, Menu, X, User, LogOut, Heart, Moon, Sun, GitCompare, Coins } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useAuth } from '../../src/contexts/AuthContext.jsx'
import { useCartStore } from '../../src/stores/useCartStore'
import { useWishlistStore } from '../../src/stores/useWishlistStore'
import { useComparisonStore } from '../../src/stores/useComparisonStore'
import { useLoyaltyStore } from '../../src/stores/useLoyaltyStore'
import { useThemeStore } from '../../src/stores/useThemeStore'
import ProductComparison from '../../src/components/ProductComparison.jsx'
import LanguageSelector from '../../src/components/LanguageSelector.jsx'

export function HeaderWrapper() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [isClient, setIsClient] = useState(false)
  const { t } = useTranslation()
  const { user, logout, isAuthenticated, isVendor, isAdmin } = useAuth()
  const { getCartCount } = useCartStore()
  const { getWishlistCount } = useWishlistStore()
  const { getComparisonCount } = useComparisonStore()
  const { points } = useLoyaltyStore()
  const { isDarkMode, toggleDarkMode } = useThemeStore()
  const router = useRouter()

  useEffect(() => {
    setIsClient(true)
  }, [])

  const cartCount = getCartCount()
  const wishlistCount = getWishlistCount()
  const comparisonCount = getComparisonCount()

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchTerm.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`)
    }
  }

  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-md sticky top-0 z-40 transition-colors duration-200">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <Link href="/" className="flex-shrink-0 text-2xl font-bold text-primary-600 dark:text-primary-400">
                Marketify
              </Link>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline space-x-4">
                  <Link href="/" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.home') : 'Home'}</Link>
                  <Link href="/deals" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.deals') : 'Deals'}</Link>
                  <Link href="/new-arrivals" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.newArrivals') : 'New Arrivals'}</Link>
                  <Link href="/catalog" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.categories') : 'Categories'}</Link>
                  {isAuthenticated && isVendor && (
                    <Link href="/vendor/dashboard" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.vendorDashboard') : 'Vendor Dashboard'}</Link>
                  )}
                  {isAuthenticated && isAdmin && (
                    <Link href="/admin/dashboard" className="text-gray-500 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white px-3 py-2 rounded-md text-sm font-medium transition-colors">{isClient ? t('header.adminDashboard') : 'Admin Dashboard'}</Link>
                  )}
                </div>
              </div>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder={isClient ? t('header.search') : 'Search for products, brands, and more...'}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors shadow-sm"
                />
                <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                <button
                  type="submit"
                  className="absolute right-2 top-2 bg-primary-600 hover:bg-primary-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Search
                </button>
              </form>
            </div>

            <div className="flex items-center space-x-4">
              {/* Language Selector */}
              <LanguageSelector />

              {/* Theme Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Toggle theme"
              >
                {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              </button>

              {/* Comparison */}
              <button
                onClick={() => setIsComparisonOpen(true)}
                className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Product comparison"
              >
                <GitCompare className="h-5 w-5" />
                {comparisonCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {comparisonCount}
                  </span>
                )}
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="h-5 w-5" />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                aria-label="Shopping cart"
              >
                <ShoppingCart className="h-5 w-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Link>

              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center space-x-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  <User className="h-5 w-5" />
                  {isAuthenticated && (
                    <>
                      <span className="hidden md:block text-sm">{user?.name || user?.email}</span>
                      {points > 0 && (
                        <div className="flex items-center space-x-1 bg-yellow-100 dark:bg-yellow-900 px-2 py-1 rounded-full">
                          <Coins className="h-3 w-3 text-yellow-600 dark:text-yellow-400" />
                          <span className="text-xs font-medium text-yellow-600 dark:text-yellow-400">{points}</span>
                        </div>
                      )}
                    </>
                  )}
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
                    <div className="py-1">
                      {isAuthenticated ? (
                        <>
                          <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {isClient ? t('header.profile') : 'Profile'}
                          </Link>
                          <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Orders
                          </Link>
                          <Link href="/loyalty" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            Loyalty Points
                          </Link>
                          <Link href="/settings" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {isClient ? t('header.settings') : 'Settings'}
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center"
                          >
                            <LogOut className="h-4 w-4 mr-2" />
                            {isClient ? t('header.signOut') : 'Sign out'}
                          </button>
                        </>
                      ) : (
                        <>
                          <Link href="/auth/login" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {isClient ? t('header.signIn') : 'Sign in'}
                          </Link>
                          <Link href="/auth/register" className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                            {isClient ? t('header.signUp') : 'Sign up'}
                          </Link>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                aria-label="Open menu"
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-gray-200 dark:border-gray-700">
                {/* Mobile search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder={isClient ? t('header.search') : 'Search products...'}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    />
                    <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </form>

                <Link href="/" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  {isClient ? t('header.home') : 'Home'}
                </Link>
                <Link href="/deals" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  {isClient ? t('header.deals') : 'Deals'}
                </Link>
                <Link href="/new-arrivals" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  {isClient ? t('header.newArrivals') : 'New Arrivals'}
                </Link>
                <Link href="/catalog" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                  {isClient ? t('header.categories') : 'Categories'}
                </Link>
                {isAuthenticated && isVendor && (
                  <Link href="/vendor/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                    {isClient ? t('header.vendorDashboard') : 'Vendor Dashboard'}
                  </Link>
                )}
                {isAuthenticated && isAdmin && (
                  <Link href="/admin/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-700 rounded-md">
                    {isClient ? t('header.adminDashboard') : 'Admin Dashboard'}
                  </Link>
                )}
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Product Comparison Modal */}
      {isComparisonOpen && (
        <ProductComparison
          isOpen={isComparisonOpen}
          onClose={() => setIsComparisonOpen(false)}
        />
      )}
    </>
  )
}