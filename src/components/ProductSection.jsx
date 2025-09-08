import React from 'react';
import { ChevronRight, Star, ShoppingCart, Heart, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductSection = ({ 
  section, 
  onAddToCart = () => {}, 
  onAddToWishlist = () => {},
  loading = false 
}) => {
  const { id, title, subtitle, type, products = [], badge } = section;

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price);
  };

  const calculateDiscount = (price, comparePrice) => {
    if (!comparePrice || comparePrice <= price) return 0;
    return Math.round(((comparePrice - price) / comparePrice) * 100);
  };

  const renderStars = (rating) => {
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`h-4 w-4 ${
              star <= rating
                ? 'text-yellow-400 fill-current'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating})</span>
      </div>
    );
  };

  const ProductCard = ({ product, index }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-primary-200"
    >
      <div className="relative">
        {/* Product Image */}
        <Link to={`/products/${product.id}`} className="block">
          <div className="aspect-square overflow-hidden bg-gray-100">
            <img
              src={product.images?.[0] || product.imageUrl || 'https://placehold.co/300x300/f3f4f6/9ca3af?text=Product'}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              loading="lazy"
            />
          </div>
        </Link>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col space-y-2">
          {calculateDiscount(product.price, product.compareAtPrice) > 0 && (
            <span className="px-2 py-1 text-xs font-bold text-white bg-red-500 rounded-full">
              -{calculateDiscount(product.price, product.compareAtPrice)}%
            </span>
          )}
          {product.featured && (
            <span className="px-2 py-1 text-xs font-bold text-white bg-yellow-500 rounded-full">
              Featured
            </span>
          )}
        </div>

        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col space-y-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.preventDefault();
              onAddToWishlist(product);
            }}
            className="p-2 bg-white rounded-full shadow-md hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
            title="Add to wishlist"
          >
            <Heart className="h-4 w-4" />
          </button>
          <Link
            to={`/products/${product.id}`}
            className="p-2 bg-white rounded-full shadow-md hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200"
            title="Quick view"
          >
            <Eye className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <Link to={`/products/${product.id}`} className="block">
          <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-200 line-clamp-2">
            {product.name}
          </h3>
        </Link>

        {/* Vendor */}
        {product.vendor && (
          <p className="text-sm text-gray-500 mt-1">
            by {product.vendor.businessName || 'Global Nexus'}
          </p>
        )}

        {/* Rating */}
        {product.rating > 0 && (
          <div className="mt-2">
            {renderStars(product.rating)}
          </div>
        )}

        {/* Price */}
        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-lg font-bold text-gray-900">
              {formatPrice(product.price)}
            </span>
            {product.compareAtPrice && product.compareAtPrice > product.price && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.compareAtPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Add to Cart Button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            onAddToCart(product);
          }}
          className="w-full mt-4 flex items-center justify-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white py-2 px-4 rounded-lg transition-colors duration-200 group-hover:shadow-lg"
        >
          <ShoppingCart className="h-4 w-4" />
          <span>Add to Cart</span>
        </button>
      </div>
    </motion.div>
  );

  if (loading) {
    return (
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="h-8 bg-gray-200 rounded w-64 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className={`grid ${
            type === 'product-carousel' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6' 
              : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
          } gap-6`}>
            {Array(8).fill(0).map((_, i) => (
              <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900" id={id}>
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center space-x-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white flex items-center space-x-2">
                <span>{title}</span>
                {badge && (
                  <span className="text-sm font-medium px-3 py-1 bg-red-500 text-white rounded-full">
                    {badge}
                  </span>
                )}
              </h2>
              {subtitle && (
                <p className="text-gray-600 dark:text-gray-400 mt-1">{subtitle}</p>
              )}
            </div>
          </div>
          
          <Link
            to={`/${id}`}
            className="flex items-center space-x-1 text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
          >
            <span>View All</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </motion.div>

        {/* Products Grid */}
        <div className={`grid gap-6 ${
          type === 'product-carousel' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6' 
            : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
        }`}>
          {products.slice(0, type === 'product-carousel' ? 6 : 8).map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View More Button for Mobile */}
        <div className="mt-8 text-center lg:hidden">
          <Link
            to={`/${id}`}
            className="inline-flex items-center space-x-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-3 rounded-lg transition-colors duration-200"
          >
            <span>View All {title}</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;