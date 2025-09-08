import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './i18n'; // Initialize i18n
import { AuthProvider } from './contexts/AuthContext.jsx';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { registerSW, showInstallPromotion, setupOfflineDetection } from './utils/pwa.js';

// Import Components
import EnhancedHeader from './components/EnhancedHeader.jsx';
import Footer from './components/Footer.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import { NotificationProvider } from './components/NotificationSystem.jsx';

// Import Pages
import Home from './pages/Home.jsx';
import Login from './pages/Login.jsx';
import Register from './pages/Register.jsx';
import VendorDashboard from './pages/VendorDashboard.jsx';
import AdminDashboard from './pages/AdminDashboard.jsx';
import WishlistPage from './pages/WishlistPage.jsx';
import CartPage from './pages/CartPage.jsx';
import CheckoutPage from './pages/CheckoutPage.jsx';
import OrdersPage from './pages/OrdersPage.jsx';
import ProductDetailPage from './pages/ProductDetailPage.jsx';
import UserDashboard from './pages/UserDashboard.jsx';
import DealsPage from './pages/DealsPage.jsx';
import NewArrivalsPage from './pages/NewArrivalsPage.jsx';
import CategoriesPage from './pages/CategoriesPage.jsx';
import HelpCenterPage from './pages/HelpCenterPage.jsx';
import ContactPage from './pages/ContactPage.jsx';
import AboutPage from './pages/AboutPage.jsx';
import ShippingPage from './pages/ShippingPage.jsx';
import ReturnsPage from './pages/ReturnsPage.jsx';
import SizeGuidePage from './pages/SizeGuidePage.jsx';
import TrackOrderPage from './pages/TrackOrderPage.jsx';
import CareersPage from './pages/CareersPage.jsx';
import BlogPage from './pages/BlogPage.jsx';
import PressPage from './pages/PressPage.jsx';
import AffiliatePage from './pages/AffiliatePage.jsx';
import GiftCardsPage from './pages/GiftCardsPage.jsx';
import PrivacyPolicyPage from './pages/PrivacyPolicyPage.jsx';
import TermsOfServicePage from './pages/TermsOfServicePage.jsx';
import CookiePolicyPage from './pages/CookiePolicyPage.jsx';
import AccessibilityPage from './pages/AccessibilityPage.jsx';
import VerifyEmailPage from './pages/VerifyEmailPage.jsx';
import UnauthorizedPage from './pages/UnauthorizedPage.jsx';
import LoyaltyDashboard from './components/LoyaltyDashboard.jsx';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isOffline, setIsOffline] = useState(!navigator.onLine);

  useEffect(() => {
    // Initialize PWA features
    registerSW();
    showInstallPromotion();
    
    // Setup offline detection
    const cleanup = setupOfflineDetection(
      () => setIsOffline(false),
      () => setIsOffline(true)
    );
    
    return cleanup;
  }, []);

  return (
    <ErrorBoundary>
      <NotificationProvider>
        <ThemeProvider>
          <AuthProvider>
            <CartProvider>
              <Router>
                <div className="bg-gray-50 dark:bg-gray-900 font-sans min-h-screen flex flex-col transition-colors duration-200">
                  {/* Offline Banner */}
                  {isOffline && (
                    <div className="bg-yellow-500 text-white text-center py-2 px-4 text-sm font-medium">
                      ⚠️ You're currently offline. Some features may be limited.
                    </div>
                  )}
              
              <EnhancedHeader 
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
              />
              
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home searchTerm={searchTerm} />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/deals" element={<DealsPage />} />
                  <Route path="/new-arrivals" element={<NewArrivalsPage />} />
                  <Route path="/categories" element={<CategoriesPage />} />
                  <Route path="/help" element={<HelpCenterPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/shipping" element={<ShippingPage />} />
                  <Route path="/returns" element={<ReturnsPage />} />
                  <Route path="/size-guide" element={<SizeGuidePage />} />
                  <Route path="/track-order" element={<TrackOrderPage />} />
                  <Route path="/careers" element={<CareersPage />} />
                  <Route path="/blog" element={<BlogPage />} />
                  <Route path="/press" element={<PressPage />} />
                  <Route path="/affiliate" element={<AffiliatePage />} />
                  <Route path="/gift-cards" element={<GiftCardsPage />} />
                  <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
                  <Route path="/terms-of-service" element={<TermsOfServicePage />} />
                  <Route path="/cookie-policy" element={<CookiePolicyPage />} />
                  <Route path="/accessibility" element={<AccessibilityPage />} />
                  <Route path="/verify-email" element={<VerifyEmailPage />} />
                  <Route path="/unauthorized" element={<UnauthorizedPage />} />
                  
                  {/* Protected Routes - Vendor Only */}
                  <Route path="/vendor/dashboard" element={
                    <ProtectedRoute requiredRole="vendor">
                      <VendorDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected Routes - Admin Only */}
                  <Route path="/admin/dashboard" element={
                    <ProtectedRoute requiredRole="admin">
                      <AdminDashboard />
                    </ProtectedRoute>
                  } />
                  
                  {/* Protected Routes - Authenticated Users */}
                  <Route path="/wishlist" element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/cart" element={<CartPage />} />
                  <Route path="/checkout" element={
                    <ProtectedRoute>
                      <CheckoutPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/orders" element={
                    <ProtectedRoute>
                      <OrdersPage />
                    </ProtectedRoute>
                  } />
                  <Route path="/product/:productId" element={<ProductDetailPage />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <UserDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/loyalty" element={
                    <ProtectedRoute>
                      <LoyaltyDashboard />
                    </ProtectedRoute>
                  } />
                </Routes>
              </main>
              
              <Footer />
            </div>
          </Router>
        </CartProvider>
      </AuthProvider>
    </ThemeProvider>
      </NotificationProvider>
    </ErrorBoundary>
  );
}
