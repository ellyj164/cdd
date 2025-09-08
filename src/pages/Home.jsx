import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCartStore } from '../stores/useCartStore';
import { useWishlistStore } from '../stores/useWishlistStore';
import { homepageAPI, bannersAPI } from '../services/apiService.js';
import HeroCarousel from '../components/HeroCarousel.jsx';
import ProductSection from '../components/ProductSection.jsx';
import EnhancedCategoriesSection from '../components/EnhancedCategoriesSection.jsx';
import { HomepageLayoutRenderer } from '../components/homepage/SectionRegistry.jsx';
import { toast } from 'react-hot-toast';
import { Loader2, TrendingUp, Clock, Gift, Star } from 'lucide-react';

const Home = ({ searchTerm }) => {
  const [homepageData, setHomepageData] = useState(null);
  const [heroBanners, setHeroBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [performanceMetrics, setPerformanceMetrics] = useState(null);

  const { addToCart } = useCartStore();
  const { addToWishlist } = useWishlistStore();

  useEffect(() => {
    loadHomepageData();
    loadPerformanceMetrics();
  }, []);

  const loadHomepageData = async () => {
    try {
      setLoading(true);
      setError(null);

      // Load both homepage data and banners in parallel
      const [homepageResponse, bannersResponse] = await Promise.all([
        homepageAPI.getData().catch(() => null),
        bannersAPI.getHero().catch(() => null)
      ]);

      if (homepageResponse && bannersResponse) {
        setHomepageData(homepageResponse);
        setHeroBanners(bannersResponse);
      } else {
        // Fallback to demo data for immediate visual experience with new Amazon-style sections
        setHomepageData({
          id: 'amazon-homepage',
          sections: [
            // Promo tile row
            {
              id: 'promo-tiles',
              type: 'promo-tiles',
              title: 'Featured Collections',
              subtitle: 'Handpicked just for you',
              showFeatures: true,
              tiles: [
                {
                  id: 'refresh-space',
                  title: 'Refresh your space',
                  subtitle: 'Discover home decor',
                  image: 'https://placehold.co/300x200/6366f1/ffffff?text=Home+Decor',
                  linkUrl: '/categories/home-garden',
                  badge: 'New',
                  badgeColor: 'bg-green-500'
                },
                {
                  id: 'electronics-deals',
                  title: 'New home arrivals under $50',
                  subtitle: 'Fresh picks for every room',
                  image: 'https://placehold.co/300x200/059669/ffffff?text=New+Arrivals',
                  linkUrl: '/categories/home-garden?new=true&max_price=50',
                  badge: 'Hot Deal',
                  badgeColor: 'bg-red-500'
                },
                {
                  id: 'fashion-trends',
                  title: 'Fashion trends you like',
                  subtitle: 'Curated for you',
                  image: 'https://placehold.co/300x200/dc2626/ffffff?text=Fashion',
                  linkUrl: '/categories/fashion',
                  badge: 'Trending',
                  badgeColor: 'bg-purple-500'
                },
                {
                  id: 'kitchen-appliances',
                  title: 'Top categories in Kitchen appliances',
                  subtitle: 'Essential tools',
                  image: 'https://placehold.co/300x200/7c3aed/ffffff?text=Kitchen',
                  linkUrl: '/categories/kitchen',
                  badge: 'Popular',
                  badgeColor: 'bg-blue-500'
                }
              ]
            },
            // Discovery modules - First row (from HOM1.jpg)
            {
              id: 'discovery-modules-1',
              type: 'discovery-grid',
              title: '',
              subtitle: '',
              modules: [
                {
                  id: 'refresh-space',
                  title: 'Refresh your space',
                  linkUrl: '/categories/home-garden',
                  sections: [
                    { name: 'Dining', image: 'https://placehold.co/150x120/f3f4f6/6b7280?text=Dining' },
                    { name: 'Home', image: 'https://placehold.co/150x120/e5e7eb/6b7280?text=Home' },
                    { name: 'Kitchen', image: 'https://placehold.co/150x120/d1d5db/6b7280?text=Kitchen' },
                    { name: 'Health and Beauty', image: 'https://placehold.co/150x120/f9fafb/6b7280?text=Beauty' }
                  ],
                  ctaText: 'See more'
                },
                {
                  id: 'new-arrivals',
                  title: 'New home arrivals under $50',
                  linkUrl: '/categories/home-garden?new=true&max_price=50',
                  sections: [
                    { name: 'Kitchen & Dining', image: 'https://placehold.co/150x120/6366f1/ffffff?text=Kitchen' },
                    { name: 'Home Improvement', image: 'https://placehold.co/150x120/059669/ffffff?text=Home+Imp' },
                    { name: 'Décor', image: 'https://placehold.co/150x120/dc2626/ffffff?text=Decor' },
                    { name: 'Bedding & Bath', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Bedding' }
                  ],
                  ctaText: 'Shop the latest from Home'
                },
                {
                  id: 'kitchen-appliances',
                  title: 'Top categories in Kitchen appliances',
                  linkUrl: '/categories/kitchen',
                  mainImage: 'https://placehold.co/300x200/374151/ffffff?text=Kitchen+Appliances',
                  sections: [
                    { name: 'Cooker', image: 'https://placehold.co/100x80/f3f4f6/6b7280?text=Cooker' },
                    { name: 'Coffee', image: 'https://placehold.co/100x80/e5e7eb/6b7280?text=Coffee' },
                    { name: 'Pots and Pans', image: 'https://placehold.co/100x80/d1d5db/6b7280?text=Pots' },
                    { name: 'Kettles', image: 'https://placehold.co/100x80/f9fafb/6b7280?text=Kettles' }
                  ],
                  ctaText: 'Explore all products in Kitchen'
                },
                {
                  id: 'fashion-trends',
                  title: 'Fashion trends you like',
                  linkUrl: '/categories/fashion',
                  sections: [
                    { name: 'Dresses', image: 'https://placehold.co/150x120/10b981/ffffff?text=Dresses' },
                    { name: 'Knits', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Knits' },
                    { name: 'Jackets', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Jackets' },
                    { name: 'Jewelry', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Jewelry' }
                  ],
                  ctaText: 'Explore more'
                }
              ]
            },
            // Top Sellers in Books carousel
            {
              id: 'top-sellers-books',
              type: 'horizontal-carousel',
              title: 'Top Sellers in Books for you',
              subtitle: '',
              categoryType: 'books',
              viewAllLink: '/categories/books',
              category: 'Books'
            },
            // Discovery modules - Second row (from HOM2.jpg)
            {
              id: 'discovery-modules-2',
              type: 'discovery-grid',
              title: '',
              subtitle: '',
              modules: [
                {
                  id: 'elevate-electronics',
                  title: 'Elevate your Electronics',
                  linkUrl: '/categories/electronics',
                  sections: [
                    { name: 'Headphones', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Headphones' },
                    { name: 'Tablets', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Tablets' },
                    { name: 'Gaming', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Gaming' },
                    { name: 'Speakers', image: 'https://placehold.co/150x120/10b981/ffffff?text=Speakers' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'wireless-tech',
                  title: 'Wireless Tech',
                  linkUrl: '/categories/electronics/wireless',
                  sections: [
                    { name: 'Smartphones', image: 'https://placehold.co/150x120/6366f1/ffffff?text=Phones' },
                    { name: 'Watches', image: 'https://placehold.co/150x120/059669/ffffff?text=Watches' },
                    { name: 'Headphones', image: 'https://placehold.co/150x120/dc2626/ffffff?text=Headphones' },
                    { name: 'Tablets', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Tablets' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'gear-up-fitness',
                  title: 'Gear up to get fit',
                  linkUrl: '/categories/sports',
                  sections: [
                    { name: 'Clothing', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Clothing' },
                    { name: 'Trackers', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Trackers' },
                    { name: 'Equipment', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Equipment' },
                    { name: 'Deals', image: 'https://placehold.co/150x120/10b981/ffffff?text=Deals' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'most-loved-watches',
                  title: 'Most-loved watches',
                  linkUrl: '/categories/watches',
                  sections: [
                    { name: 'Women', image: 'https://placehold.co/150x120/f3f4f6/6b7280?text=Women' },
                    { name: 'Men', image: 'https://placehold.co/150x120/e5e7eb/6b7280?text=Men' },
                    { name: 'Girls', image: 'https://placehold.co/150x120/d1d5db/6b7280?text=Girls' },
                    { name: 'Boys', image: 'https://placehold.co/150x120/f9fafb/6b7280?text=Boys' }
                  ],
                  ctaText: 'Discover more'
                }
              ]
            },
            // Best Sellers in Books carousel
            {
              id: 'best-sellers-books',
              type: 'horizontal-carousel',
              title: 'Best Sellers in Books',
              subtitle: '',
              categoryType: 'books',
              viewAllLink: '/categories/books',
              category: 'Books'
            },
            // Discovery modules - Third row (from HOM3.jpg)
            {
              id: 'discovery-modules-3',
              type: 'discovery-grid',
              title: '',
              subtitle: '',
              modules: [
                {
                  id: 'level-up-pc',
                  title: 'Level up your PC here',
                  linkUrl: '/categories/computers',
                  sections: [
                    { name: 'Laptops', image: 'https://placehold.co/150x120/6366f1/ffffff?text=Laptops' },
                    { name: 'PCs', image: 'https://placehold.co/150x120/059669/ffffff?text=PCs' },
                    { name: 'Hard Drives', image: 'https://placehold.co/150x120/dc2626/ffffff?text=Storage' },
                    { name: 'Monitors', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Monitors' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'level-up-beauty',
                  title: 'Level up your beauty routine',
                  linkUrl: '/categories/beauty',
                  sections: [
                    { name: 'Makeup', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Makeup' },
                    { name: 'Brushes', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Brushes' },
                    { name: 'Sponges', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Sponges' },
                    { name: 'Mirrors', image: 'https://placehold.co/150x120/10b981/ffffff?text=Mirrors' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'finds-for-home',
                  title: 'Finds for Home',
                  linkUrl: '/categories/home',
                  sections: [
                    { name: 'Kitchen', image: 'https://placehold.co/150x120/f3f4f6/6b7280?text=Kitchen' },
                    { name: 'Home Decor', image: 'https://placehold.co/150x120/e5e7eb/6b7280?text=Decor' },
                    { name: 'Dining', image: 'https://placehold.co/150x120/d1d5db/6b7280?text=Dining' },
                    { name: 'Smart Home', image: 'https://placehold.co/150x120/f9fafb/6b7280?text=Smart' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'level-up-gaming',
                  title: 'Level up your gaming',
                  linkUrl: '/categories/gaming',
                  sections: [
                    { name: 'PC gaming', image: 'https://placehold.co/150x120/6366f1/ffffff?text=PC' },
                    { name: 'Xbox', image: 'https://placehold.co/150x120/059669/ffffff?text=Xbox' },
                    { name: 'PlayStation', image: 'https://placehold.co/150x120/dc2626/ffffff?text=PS' },
                    { name: 'Nintendo Switch', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Switch' }
                  ],
                  ctaText: 'Discover more'
                }
              ]
            },
            // Discovery modules - Fourth row (from HOM4.jpg)
            {
              id: 'discovery-modules-4',
              type: 'discovery-grid',
              title: '',
              subtitle: '',
              modules: [
                {
                  id: 'deals-top-categories',
                  title: 'Deals on top categories',
                  linkUrl: '/deals',
                  sections: [
                    { name: 'Books', image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Books' },
                    { name: 'Fashion', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Fashion' },
                    { name: 'PC', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=PC' },
                    { name: 'Beauty', image: 'https://placehold.co/150x120/10b981/ffffff?text=Beauty' }
                  ],
                  ctaText: 'Discover more'
                },
                {
                  id: 'gaming-merchandise',
                  title: 'Gaming merchandise',
                  linkUrl: '/categories/gaming/merchandise',
                  sections: [
                    { name: 'Apparel', image: 'https://placehold.co/150x120/6366f1/ffffff?text=Apparel' },
                    { name: 'Hats', image: 'https://placehold.co/150x120/059669/ffffff?text=Hats' },
                    { name: 'Action figures', image: 'https://placehold.co/150x120/dc2626/ffffff?text=Figures' },
                    { name: 'Mugs', image: 'https://placehold.co/150x120/7c3aed/ffffff?text=Mugs' }
                  ],
                  ctaText: 'See more'
                },
                {
                  id: 'toys-all-ages',
                  title: 'Toys for all ages',
                  linkUrl: '/categories/toys',
                  sections: [
                    { name: "Ride on's", image: 'https://placehold.co/150x120/f59e0b/ffffff?text=Ride' },
                    { name: 'Building & construction', image: 'https://placehold.co/150x120/ec4899/ffffff?text=Building' },
                    { name: 'Dolls & Doll Houses', image: 'https://placehold.co/150x120/8b5cf6/ffffff?text=Dolls' },
                    { name: 'Swimming pools', image: 'https://placehold.co/150x120/10b981/ffffff?text=Pools' }
                  ],
                  ctaText: 'See all'
                },
                {
                  id: 'score-top-pcs',
                  title: 'Score the top PCs & Accessories',
                  linkUrl: '/categories/computers',
                  sections: [
                    { name: 'Desktops', image: 'https://placehold.co/150x120/f3f4f6/6b7280?text=Desktop' },
                    { name: 'Laptops', image: 'https://placehold.co/150x120/e5e7eb/6b7280?text=Laptop' },
                    { name: 'Hard Drives', image: 'https://placehold.co/150x120/d1d5db/6b7280?text=Storage' },
                    { name: 'PC Accessories', image: 'https://placehold.co/150x120/f9fafb/6b7280?text=Access' }
                  ],
                  ctaText: 'See more'
                }
              ]
            },
            // Deal strips
            {
              id: 'deal-strips',
              type: 'deal-strips'
            },
            // Horizontal product carousels
            {
              id: 'movies-tv-carousel',
              type: 'horizontal-carousel',
              title: 'Movies & TV for you',
              subtitle: 'Based on your viewing history',
              categoryType: 'movies-tv',
              viewAllLink: '/categories/movies-tv',
              category: 'Movies & TV'
            },
            {
              id: 'books-carousel',
              type: 'horizontal-carousel',
              title: 'Books you might like',
              subtitle: 'Recommended reading',
              categoryType: 'books',
              viewAllLink: '/categories/books',
              category: 'Books'
            },
            {
              id: 'featured',
              title: 'Featured Products',
              subtitle: 'Handpicked items just for you',
              type: 'product-grid',
              products: [
                {
                  id: 'prod-1',
                  name: 'QuantumCore Laptop Pro',
                  description: 'High-performance laptop with the latest QuantumCore processor',
                  price: 1299.99,
                  compareAtPrice: 1599.99,
                  category: 'Electronics',
                  images: ['https://placehold.co/500x500/1f2937/ffffff?text=Laptop'],
                  rating: 4.8,
                  reviewCount: 142,
                  vendor: { businessName: 'TechCorp' },
                  featured: true
                },
                {
                  id: 'prod-2',
                  name: 'Wireless Noise-Cancelling Headphones',
                  description: 'Premium over-ear headphones with active noise cancellation',
                  price: 199.99,
                  compareAtPrice: 299.99,
                  category: 'Electronics',
                  images: ['https://placehold.co/500x500/374151/ffffff?text=Headphones'],
                  rating: 4.7,
                  reviewCount: 89,
                  vendor: { businessName: 'TechCorp' },
                  featured: true
                },
                {
                  id: 'prod-3',
                  name: 'Smart Fitness Watch',
                  description: 'Advanced fitness tracking with heart rate monitor and GPS',
                  price: 349.99,
                  compareAtPrice: 399.99,
                  category: 'Electronics',
                  images: ['https://placehold.co/500x500/4b5563/ffffff?text=Smart+Watch'],
                  rating: 4.6,
                  reviewCount: 156,
                  vendor: { businessName: 'TechCorp' },
                  featured: true
                },
                {
                  id: 'prod-4',
                  name: 'Designer Casual Jacket',
                  description: 'Stylish and comfortable casual jacket perfect for any season',
                  price: 89.99,
                  compareAtPrice: 129.99,
                  category: 'Fashion',
                  images: ['https://placehold.co/500x500/6b7280/ffffff?text=Jacket'],
                  rating: 4.5,
                  reviewCount: 45,
                  vendor: { businessName: 'Fashion Hub' },
                  featured: false
                }
              ],
            },
            {
              id: 'trending',
              title: 'Trending Now',
              subtitle: 'What everyone is buying',
              type: 'product-carousel',
              products: [
                {
                  id: 'prod-5',
                  name: 'Ergonomic Office Chair',
                  description: 'Comfortable ergonomic office chair with lumbar support',
                  price: 299.99,
                  compareAtPrice: 399.99,
                  category: 'Home & Garden',
                  images: ['https://placehold.co/500x500/9ca3af/ffffff?text=Office+Chair'],
                  rating: 4.7,
                  reviewCount: 67,
                  vendor: { businessName: 'Home & Garden Co' },
                  featured: true
                },
                {
                  id: 'prod-6',
                  name: 'Bluetooth Speaker',
                  description: 'Portable Bluetooth speaker with 12-hour battery',
                  price: 79.99,
                  compareAtPrice: 99.99,
                  category: 'Electronics',
                  images: ['https://placehold.co/500x500/d1d5db/ffffff?text=Speaker'],
                  rating: 4.4,
                  reviewCount: 98,
                  vendor: { businessName: 'TechCorp' },
                  featured: false
                }
              ],
            },
            {
              id: 'deals',
              title: 'Today\'s Deals',
              subtitle: 'Limited time offers',
              type: 'product-carousel',
              products: [
                {
                  id: 'prod-7',
                  name: 'Running Shoes',
                  description: 'High-performance running shoes with advanced cushioning',
                  price: 129.99,
                  compareAtPrice: 179.99,
                  category: 'Fashion',
                  images: ['https://placehold.co/500x500/e5e7eb/ffffff?text=Running+Shoes'],
                  rating: 4.8,
                  reviewCount: 123,
                  vendor: { businessName: 'Fashion Hub' },
                  featured: true
                },
                {
                  id: 'prod-8',
                  name: 'Smart Security Camera',
                  description: '4K security camera with night vision and mobile app control',
                  price: 159.99,
                  compareAtPrice: 199.99,
                  category: 'Electronics',
                  images: ['https://placehold.co/500x500/f3f4f6/ffffff?text=Security+Camera'],
                  rating: 4.6,
                  reviewCount: 34,
                  vendor: { businessName: 'TechCorp' },
                  featured: true
                }
              ],
              badge: 'Hot',
            },
          ],
          categories: [
            { category: 'Electronics', count: 15420 },
            { category: 'Fashion', count: 28540 },
            { category: 'Home & Garden', count: 18920 },
            { category: 'Sports & Outdoors', count: 12340 },
            { category: 'Health & Beauty', count: 9870 }
          ],
        });
        
        setHeroBanners([
          {
            id: 'banner-1',
            title: 'Winter Sale - Up to 70% Off',
            description: 'Discover amazing deals on fashion, electronics, and home goods',
            imageUrl: 'https://placehold.co/1200x400/6366f1/ffffff?text=Winter+Sale+70%25+Off',
            linkUrl: '/deals',
            buttonText: 'Shop Now'
          },
          {
            id: 'banner-2',
            title: 'New Electronics Collection',
            description: 'Latest tech gadgets and accessories now available',
            imageUrl: 'https://placehold.co/1200x400/059669/ffffff?text=New+Electronics+Collection',
            linkUrl: '/categories/electronics',
            buttonText: 'Explore'
          },
          {
            id: 'banner-3',
            title: 'Free Shipping Worldwide',
            description: 'Free shipping on all orders over $50',
            imageUrl: 'https://placehold.co/1200x400/dc2626/ffffff?text=Free+Shipping+Worldwide',
            linkUrl: '/shipping',
            buttonText: 'Learn More'
          }
        ]);
      }
    } catch (err) {
      console.error('Error loading homepage data:', err);
      setError('Failed to load homepage data');
    } finally {
      setLoading(false);
    }
  };

  const loadPerformanceMetrics = async () => {
    try {
      const metrics = await homepageAPI.getPerformanceMetrics();
      setPerformanceMetrics(metrics);
    } catch (err) {
      console.error('Error loading performance metrics:', err);
    }
  };

  const handleAddToCart = (product) => {
    try {
      addToCart(product.id, 1);
      toast.success(`${product.name} added to cart!`);
    } catch (error) {
      toast.error('Failed to add product to cart');
    }
  };

  const handleAddToWishlist = (product) => {
    try {
      addToWishlist(product.id);
      toast.success(`${product.name} added to wishlist!`);
    } catch (error) {
      toast.error('Failed to add product to wishlist');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-primary-600 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Loading your personalized experience...
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Fetching the latest products and deals
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Performance Banner (Development only) */}
      {performanceMetrics && process.env.NODE_ENV === 'development' && (
        <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-green-700">
                <strong>Performance:</strong> LCP: {performanceMetrics.kpis.lcp}s | 
                CLS: {performanceMetrics.kpis.cls} | INP: {performanceMetrics.kpis.inp}ms
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
          <div className="flex">
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hero Carousel */}
      <section className="container mx-auto px-4 py-6">
        <HeroCarousel 
          banners={heroBanners}
          autoPlay={true}
          interval={5000}
        />
      </section>

      {/* Quick Stats */}
      <section className="bg-white dark:bg-gray-800 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: TrendingUp, label: 'Trending', value: '1,200+', color: 'text-green-600' },
              { icon: Clock, label: 'Fast Delivery', value: '24h', color: 'text-blue-600' },
              { icon: Gift, label: 'Deals Today', value: '500+', color: 'text-red-600' },
              { icon: Star, label: 'Top Rated', value: '4.8★', color: 'text-yellow-600' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center p-4 rounded-xl bg-gray-50 dark:bg-gray-700 hover:shadow-lg transition-all duration-200"
              >
                <stat.icon className={`h-8 w-8 ${stat.color} mx-auto mb-2`} />
                <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Homepage Layout Renderer with Section Registry */}
      <HomepageLayoutRenderer
        layout={homepageData}
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
        loading={loading}
      />

      {/* Enhanced Categories Section */}
      <EnhancedCategoriesSection 
        categories={homepageData?.categories || []}
        loading={loading}
      />

      {/* Newsletter Signup */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl mx-auto text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated with Our Latest Offers
            </h2>
            <p className="text-xl mb-8 text-primary-100">
              Subscribe to our newsletter and get 10% off your first order plus exclusive deals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-all duration-200 transform hover:scale-105">
                Subscribe
              </button>
            </div>
            <p className="text-sm text-primary-200 mt-4">
              By subscribing, you agree to our Privacy Policy and Terms of Service
            </p>
          </motion.div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white dark:bg-gray-800 py-12">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { value: '2M+', label: 'Happy Customers' },
              { value: '50+', label: 'Countries Served' },
              { value: '99.9%', label: 'Uptime' },
              { value: '24/7', label: 'Support' },
            ].map((item, index) => (
              <div key={index}>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                  {item.value}
                </div>
                <div className="text-gray-600 dark:text-gray-400">{item.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;