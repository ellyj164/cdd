import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Heart, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

/**
 * HorizontalProductCarousel Component
 * Amazon-style horizontal scrolling product carousel
 * Used for sections like "Movies & TV", "Books", etc.
 */
const HorizontalProductCarousel = ({ section, onAddToCart, onAddToWishlist, loading }) => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef(null);

  // Default products for different categories
  const defaultProducts = {
    'movies-tv': [
      {
        id: 'movie-1',
        name: 'The Latest Blockbuster',
        price: 19.99,
        compareAtPrice: 24.99,
        image: 'https://placehold.co/200x300/6366f1/ffffff?text=Movie+1',
        rating: 4.5,
        reviewCount: 1245,
        category: 'Movies & TV',
        type: 'Digital HD'
      },
      {
        id: 'movie-2',
        name: 'Classic Drama Collection',
        price: 29.99,
        compareAtPrice: 39.99,
        image: 'https://placehold.co/200x300/059669/ffffff?text=Movie+2',
        rating: 4.8,
        reviewCount: 892,
        category: 'Movies & TV',
        type: 'Blu-ray'
      }
    ],
    'books': [
      {
        id: 'book-1',
        name: 'Bestselling Novel',
        price: 14.99,
        compareAtPrice: 19.99,
        image: 'https://placehold.co/200x300/dc2626/ffffff?text=Book+1',
        rating: 4.6,
        reviewCount: 2341,
        category: 'Books',
        author: 'Famous Author'
      },
      {
        id: 'book-2',
        name: 'Self-Help Guide',
        price: 12.99,
        compareAtPrice: 16.99,
        image: 'https://placehold.co/200x300/7c3aed/ffffff?text=Book+2',
        rating: 4.4,
        reviewCount: 1567,
        category: 'Books',
        author: 'Expert Writer'
      }
    ]
  };

  // Generate default products based on section type
  const generateDefaultProducts = (categoryType) => {
    const baseProducts = defaultProducts[categoryType] || defaultProducts['books'];
    const products = [];
    
    for (let i = 0; i < 12; i++) {
      const baseProduct = baseProducts[i % baseProducts.length];
      products.push({
        ...baseProduct,
        id: `${baseProduct.id}-${i}`,
        name: `${baseProduct.name} ${i + 1}`,
      });
    }
    
    return products;
  };

  const products = section?.products || generateDefaultProducts(section?.categoryType || 'books');
  const title = section?.title || 'Recommended for you';
  const subtitle = section?.subtitle || 'Based on your browsing history';

  const scroll = (direction) => {
    if (!scrollContainerRef.current) return;
    
    const container = scrollContainerRef.current;
    const cardWidth = 240; // Approximate card width + gap
    const scrollAmount = cardWidth * 3; // Scroll 3 cards at a time
    
    const newPosition = direction === 'left' 
      ? Math.max(0, scrollPosition - scrollAmount)
      : Math.min(container.scrollWidth - container.clientWidth, scrollPosition + scrollAmount);
    
    container.scrollTo({ left: newPosition, behavior: 'smooth' });
    setScrollPosition(newPosition);
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  if (loading) {
    return (
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-6">
            <div className="h-8 bg-gray-200 rounded w-64 mb-2 animate-pulse"></div>
            <div className="h-4 bg-gray-200 rounded w-32 animate-pulse"></div>
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[...Array(6)].map((_, index) => (
              <div key={index} className="flex-none w-48">
                <div className="bg-gray-100 rounded-lg animate-pulse">
                  <div className="h-64 bg-gray-200 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="bg-white py-8">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-2xl font-bold text-gray-900 mb-1"
            >
              {title}
            </motion.h2>
            {subtitle && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-gray-600"
              >
                {subtitle}
              </motion.p>
            )}
          </div>
          
          {/* Navigation Arrows */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => scroll('left')}
              disabled={scrollPosition <= 0}
              className="p-2 rounded-full border border-gray-300 hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              disabled={scrollContainerRef.current && scrollPosition >= scrollContainerRef.current.scrollWidth - scrollContainerRef.current.clientWidth}
              className="p-2 rounded-full border border-gray-300 hover:border-primary-500 hover:text-primary-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div className="relative">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex space-x-4 overflow-x-auto scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                className="flex-none w-48 group"
              >
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:border-primary-200">
                  {/* Product Image */}
                  <div className="relative">
                    <Link to={`/product/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                        loading="lazy"
                      />
                    </Link>
                    
                    {/* Wishlist Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToWishlist?.(product);
                      }}
                      className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors duration-200 opacity-0 group-hover:opacity-100"
                    >
                      <Heart className="h-4 w-4 text-gray-600 hover:text-red-500" />
                    </button>

                    {/* Discount Badge */}
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                        {Math.round((1 - product.price / product.compareAtPrice) * 100)}% OFF
                      </div>
                    )}
                  </div>

                  {/* Product Info */}
                  <div className="p-4">
                    <Link to={`/product/${product.id}`}>
                      <h3 className="font-medium text-gray-900 mb-2 line-clamp-2 hover:text-primary-600 transition-colors duration-200">
                        {product.name}
                      </h3>
                    </Link>

                    {/* Author/Type */}
                    {(product.author || product.type) && (
                      <p className="text-sm text-gray-600 mb-2">
                        {product.author || product.type}
                      </p>
                    )}

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < Math.floor(product.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-600 ml-1">
                        ({product.reviewCount})
                      </span>
                    </div>

                    {/* Pricing */}
                    <div className="flex items-center space-x-2 mb-3">
                      <span className="text-lg font-bold text-gray-900">
                        ${product.price}
                      </span>
                      {product.compareAtPrice && product.compareAtPrice > product.price && (
                        <span className="text-sm text-gray-500 line-through">
                          ${product.compareAtPrice}
                        </span>
                      )}
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        onAddToCart?.(product);
                      }}
                      className="w-full bg-primary-600 hover:bg-primary-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200 flex items-center justify-center space-x-2 opacity-0 group-hover:opacity-100"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      <span>Add to Cart</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* View All Link */}
          {section?.viewAllLink && (
            <div className="mt-6 text-center">
              <Link
                to={section.viewAllLink}
                className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
              >
                <span>View all in {section.category || 'this category'}</span>
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hide scrollbar CSS */}
      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default HorizontalProductCarousel;