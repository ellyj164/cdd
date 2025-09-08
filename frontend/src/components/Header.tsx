'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  ShoppingCartIcon, 
  UserIcon, 
  MagnifyingGlassIcon,
  Bars3Icon,
  XMarkIcon,
  ChevronDownIcon,
  BellIcon,
  HeartIcon
} from '@heroicons/react/24/outline';
import { useAuthStore } from '@/store/auth';
import { useCartStore } from '@/store/cart';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [searchCategoryOpen, setSearchCategoryOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const { getItemCount } = useCartStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const cartItemCount = getItemCount();

  const categories = [
    'Electronics',
    'Motors', 
    'Fashion',
    'Collectibles and Art',
    'Sports',
    'Health & Beauty',
    'Industrial equipment',
    'Home & Garden',
    'Deals'
  ];

  const searchCategories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Motors',
    'Collectibles',
    'Sports',
    'Health & Beauty'
  ];

  return (
    <header className="bg-white">
      {/* Top Navigation Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-8 text-xs">
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Hi! 
                {isAuthenticated ? (
                  <span className="ml-1">{user?.name}</span>
                ) : (
                  <>
                    <Link href="/login" className="text-blue-600 hover:underline ml-1">Sign in</Link>
                    <span className="mx-1">or</span>
                    <Link href="/register" className="text-blue-600 hover:underline">register</Link>
                  </>
                )}
              </span>
              <Link href="/daily-deals" className="text-gray-700 hover:text-blue-600">Daily Deals</Link>
              <Link href="/brand-outlet" className="text-gray-700 hover:text-blue-600">Brand Outlet</Link>
              <Link href="/gift-cards" className="text-gray-700 hover:text-blue-600">Gift Cards</Link>
              <Link href="/help" className="text-gray-700 hover:text-blue-600">Help & Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Ship to</span>
              <Link href="/sell" className="text-gray-700 hover:text-blue-600">Sell</Link>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <span>Watchlist</span>
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                </button>
              </div>
              <div className="relative group">
                <button className="flex items-center text-gray-700 hover:text-blue-600">
                  <span>My eBay</span>
                  <ChevronDownIcon className="h-3 w-3 ml-1" />
                </button>
                {isAuthenticated && (
                  <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link href="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Summary
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Recently Viewed
                      </Link>
                      <Link href="/bids" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Bids/Offers
                      </Link>
                      <Link href="/watchlist" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Watchlist
                      </Link>
                      <Link href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Purchase History
                      </Link>
                      <Link href="/selling" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                        Selling
                      </Link>
                      {user?.role === 'vendor' && (
                        <Link href="/vendor/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Vendor Dashboard
                        </Link>
                      )}
                      {user?.role === 'admin' && (
                        <Link href="/admin" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Admin Panel
                        </Link>
                      )}
                      <div className="border-t border-gray-100">
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          Sign out
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              <BellIcon className="h-4 w-4 text-gray-700" />
              <Link href="/cart" className="relative text-gray-700 hover:text-blue-600">
                <ShoppingCartIcon className="h-4 w-4" />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-3 w-3 flex items-center justify-center text-[10px]">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <div className="text-3xl font-bold">
                <span className="text-blue-600">e</span>
                <span className="text-red-500">B</span>
                <span className="text-yellow-500">a</span>
                <span className="text-green-500">y</span>
              </div>
            </Link>

            {/* Shop by Category */}
            <div className="relative hidden lg:block">
              <button 
                className="flex items-center px-4 py-2 border border-gray-300 rounded-l-md bg-white hover:bg-gray-50"
                onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              >
                <span className="text-sm">Shop by category</span>
                <ChevronDownIcon className="h-4 w-4 ml-2" />
              </button>
              
              {categoryDropdownOpen && (
                <div className="absolute left-0 mt-1 w-64 bg-white rounded-md shadow-lg z-50">
                  <div className="py-2">
                    {categories.map((category, index) => (
                      <Link 
                        key={index}
                        href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        onClick={() => setCategoryDropdownOpen(false)}
                      >
                        {category}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-2xl mx-4">
              <div className="flex">
                <div className="relative">
                  <button
                    className="flex items-center px-3 py-2 border border-gray-300 bg-gray-50 text-sm min-w-[120px] justify-between"
                    onClick={() => setSearchCategoryOpen(!searchCategoryOpen)}
                  >
                    <span>All Categories</span>
                    <ChevronDownIcon className="h-4 w-4 ml-1" />
                  </button>
                  
                  {searchCategoryOpen && (
                    <div className="absolute left-0 top-full mt-1 w-full bg-white rounded-md shadow-lg z-50">
                      <div className="py-2">
                        {searchCategories.map((category, index) => (
                          <button 
                            key={index}
                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setSearchCategoryOpen(false)}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
                
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="flex-1 px-4 py-2 border-t border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                
                <button className="px-6 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700 font-medium">
                  Search
                </button>
              </div>
            </div>

            {/* Advanced Link */}
            <div className="hidden lg:block">
              <Link href="/advanced-search" className="text-sm text-blue-600 hover:underline">
                Advanced
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="hidden lg:block border-b border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-8 h-12 text-sm">
            <Link href="/ebay-live" className="text-gray-700 hover:text-blue-600">eBay Live</Link>
            <Link href="/saved" className="text-gray-700 hover:text-blue-600">Saved</Link>
            <Link href="/electronics" className="text-gray-700 hover:text-blue-600">Electronics</Link>
            <Link href="/motors" className="text-gray-700 hover:text-blue-600">Motors</Link>
            <Link href="/fashion" className="text-gray-700 hover:text-blue-600">Fashion</Link>
            <Link href="/collectibles" className="text-gray-700 hover:text-blue-600">Collectibles and Art</Link>
            <Link href="/sports" className="text-gray-700 hover:text-blue-600">Sports</Link>
            <Link href="/health-beauty" className="text-gray-700 hover:text-blue-600">Health & Beauty</Link>
            <Link href="/industrial" className="text-gray-700 hover:text-blue-600">Industrial equipment</Link>
            <Link href="/home-garden" className="text-gray-700 hover:text-blue-600">Home & Garden</Link>
            <Link href="/deals" className="text-gray-700 hover:text-blue-600">Deals</Link>
            <Link href="/sell" className="text-gray-700 hover:text-blue-600">Sell</Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 py-4 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-4">
              <div className="flex">
                <input
                  type="text"
                  placeholder="Search for anything"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button className="px-4 py-2 bg-blue-600 text-white rounded-r-md hover:bg-blue-700">
                  Search
                </button>
              </div>
              
              <div className="space-y-2">
                {categories.map((category, index) => (
                  <Link 
                    key={index}
                    href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
                    className="block text-gray-700 hover:text-blue-600 py-2"
                  >
                    {category}
                  </Link>
                ))}
              </div>
              
              {isAuthenticated ? (
                <div className="space-y-2 border-t pt-4">
                  <p className="font-medium text-gray-900">{user?.name}</p>
                  <Link href="/dashboard" className="block text-gray-700 hover:text-blue-600">
                    My Summary
                  </Link>
                  <Link href="/orders" className="block text-gray-700 hover:text-blue-600">
                    Purchase History
                  </Link>
                  <Link href="/watchlist" className="block text-gray-700 hover:text-blue-600">
                    Watchlist
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block text-left text-gray-700 hover:text-blue-600"
                  >
                    Sign out
                  </button>
                </div>
              ) : (
                <div className="space-y-2 border-t pt-4">
                  <Link href="/login" className="block text-gray-700 hover:text-blue-600">
                    Sign in
                  </Link>
                  <Link href="/register" className="block text-gray-700 hover:text-blue-600">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}