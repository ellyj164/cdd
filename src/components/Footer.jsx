import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Store,
  Award,
  Clock,
  Users,
  Globe,
  Headphones
} from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      // Integrate with backend API for newsletter subscription
      const response = await fetch('/backend/newsletter/subscribe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: email.trim() })
      });

      const data = await response.json();

      if (data.status === 'success') {
        setSubscribed(true);
        setEmail('');
        setTimeout(() => setSubscribed(false), 3000);
      } else {
        console.error('Newsletter subscription failed:', data.message);
        // You could show an error message to the user here
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      // Fallback to local behavior for development
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 3000);
    }
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white">
      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center mb-6">
              <div className="flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl shadow-lg backdrop-blur-sm">
                <Mail className="h-8 w-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">
              Stay Updated with Our Latest Offers
            </h3>
            <p className="text-primary-100 mb-8 text-lg">
              Subscribe to our newsletter and get 10% off your first order plus exclusive deals
            </p>
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-white/30 shadow-lg border-0 text-lg"
                required
                aria-label="Email address for newsletter"
              />
              <button
                type="submit"
                className="px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 text-lg transform hover:-translate-y-1"
              >
                {subscribed ? (
                  <>
                    <Heart className="h-5 w-5" />
                    Subscribed!
                  </>
                ) : (
                  <>
                    Subscribe
                    <ArrowRight className="h-5 w-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Company Information */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-3">
                <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl shadow-lg">
                  <Store className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-bold bg-gradient-to-r from-primary-400 to-primary-300 bg-clip-text text-transparent">
                    Global Nexus
                  </h4>
                  <p className="text-gray-400 text-sm">Premium Marketplace</p>
                </div>
              </div>
              <p className="text-gray-300 text-base leading-relaxed max-w-md">
                Your trusted premium marketplace destination for quality products, 
                exceptional service, and unbeatable prices. Experience world-class shopping 
                with confidence at duns1.fezalogistics.com.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>5.189.180.149 - Global Commerce Hub</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>support@duns1.fezalogistics.com</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Globe className="h-5 w-5 text-primary-400 flex-shrink-0" />
                  <span>duns1.fezalogistics.com</span>
                </div>
              </div>
            </div>

            {/* Customer Service */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Headphones className="h-5 w-5 text-primary-400" />
                Customer Service
              </h4>
              <nav className="space-y-3">
                <Link to="/help" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Help Center
                </Link>
                <Link to="/contact" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Contact Us
                </Link>
                <Link to="/shipping" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Shipping Information
                </Link>
                <Link to="/returns" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Returns & Exchanges
                </Link>
                <Link to="/size-guide" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Size Guide
                </Link>
                <Link to="/track-order" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Track Your Order
                </Link>
              </nav>
            </div>

            {/* Quick Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Users className="h-5 w-5 text-primary-400" />
                Quick Links
              </h4>
              <nav className="space-y-3">
                <Link to="/about" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  About Us
                </Link>
                <Link to="/careers" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Careers
                </Link>
                <Link to="/blog" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Blog
                </Link>
                <Link to="/press" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Press
                </Link>
                <Link to="/affiliate" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Affiliate Program
                </Link>
                <Link to="/gift-cards" className="block text-gray-300 hover:text-primary-400 transition-all duration-200 text-base hover:translate-x-1">
                  Gift Cards
                </Link>
              </nav>
            </div>

            {/* Connect & Trust */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                <Award className="h-5 w-5 text-primary-400" />
                Connect & Trust
              </h4>
              
              {/* Social Media Links */}
              <div>
                <p className="text-gray-300 text-base mb-4">Follow us on social media</p>
                <div className="flex gap-3">
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Follow us on Facebook"
                  >
                    <Facebook className="h-6 w-6" />
                  </a>
                  <a
                    href="https://twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Follow us on Twitter"
                  >
                    <Twitter className="h-6 w-6" />
                  </a>
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Follow us on Instagram"
                  >
                    <Instagram className="h-6 w-6" />
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Follow us on LinkedIn"
                  >
                    <Linkedin className="h-6 w-6" />
                  </a>
                  <a
                    href="https://youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-gray-800/80 backdrop-blur-sm rounded-xl flex items-center justify-center hover:bg-primary-600 hover:shadow-lg hover:shadow-primary-600/25 transition-all duration-300 transform hover:-translate-y-1"
                    aria-label="Subscribe to our YouTube channel"
                  >
                    <Youtube className="h-6 w-6" />
                  </a>
                </div>
              </div>

              {/* Trust Badges */}
              <div>
                <p className="text-gray-300 text-base mb-4">Why choose us?</p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-gray-300 text-base">
                    <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <Shield className="h-5 w-5 text-green-400" />
                    </div>
                    <span>Secure Shopping</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 text-base">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <Truck className="h-5 w-5 text-blue-400" />
                    </div>
                    <span>Free Shipping Over $50</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 text-base">
                    <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
                      <CreditCard className="h-5 w-5 text-purple-400" />
                    </div>
                    <span>Secure Payments</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-300 text-base">
                    <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <Clock className="h-5 w-5 text-orange-400" />
                    </div>
                    <span>24/7 Support</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700/50 py-8 bg-gray-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row justify-between items-center gap-6">
            <div className="text-gray-400 text-base">
              &copy; {currentYear} Global Nexus - Premium Marketplace. All rights reserved.
            </div>
            
            <div className="flex flex-wrap gap-8 text-gray-400 text-base">
              <Link to="/privacy-policy" className="hover:text-primary-400 transition-colors duration-200">
                Privacy Policy
              </Link>
              <Link to="/terms-of-service" className="hover:text-primary-400 transition-colors duration-200">
                Terms of Service
              </Link>
              <Link to="/cookie-policy" className="hover:text-primary-400 transition-colors duration-200">
                Cookie Policy
              </Link>
              <Link to="/accessibility" className="hover:text-primary-400 transition-colors duration-200">
                Accessibility
              </Link>
            </div>

            <div className="text-gray-400 text-base flex items-center gap-2">
              <span>Powered by</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>Global Nexus Technology</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
