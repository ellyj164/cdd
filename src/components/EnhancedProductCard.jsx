import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingCart, Eye, Star, GitCompare } from 'lucide-react';
import { useWishlistStore } from '../stores/useWishlistStore';
import { useCartStore } from '../stores/useCartStore';
import { useUserPreferencesStore } from '../stores/useUserPreferencesStore';
import { useComparisonStore } from '../stores/useComparisonStore';

const EnhancedProductCard = ({ product }) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlistStore();
  const { addToCart } = useCartStore();
  const { addToRecentlyViewed } = useUserPreferencesStore();
  const { addToComparison, removeFromComparison, isInComparison } = useComparisonStore();
  
  const inWishlist = isInWishlist(product.id);
  const inComparison = isInComparison(product.id);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
  };

  const handleComparisonClick = (e) => {
    e.stopPropagation();
    if (inComparison) {
      removeFromComparison(product.id);
    } else {
      addToComparison(product);
    }
  };

  const handleProductClick = () => {
    addToRecentlyViewed(product);
  };

  const discountPercentage = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link 
      to={`/product/${product.id}`}
      onClick={handleProductClick}
      className="group relative bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden block"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {discountPercentage > 0 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              -{discountPercentage}%
            </span>
          )}
          {product.badges?.map((badge, index) => (
            <span
              key={index}
              className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-2 right-2 p-2 rounded-full transition-all duration-200 ${
            inWishlist 
              ? 'bg-red-500 text-white' 
              : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900'
          }`}
        >
          <Heart className={`h-4 w-4 ${inWishlist ? 'fill-current' : ''}`} />
        </button>

        {/* Quick Actions */}
        <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex gap-2">
          <button
            onClick={handleComparisonClick}
            className={`p-2 rounded-full transition-all duration-200 ${
              inComparison 
                ? 'bg-blue-500 text-white' 
                : 'bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-blue-50 dark:hover:bg-blue-900'
            }`}
            title={inComparison ? 'Remove from comparison' : 'Add to comparison'}
          >
            <GitCompare className="h-4 w-4" />
          </button>
          <button
            onClick={handleAddToCart}
            className="bg-primary-500 text-white p-2 rounded-full hover:bg-primary-600"
            title="Add to cart"
          >
            <ShoppingCart className="h-4 w-4" />
          </button>
        </div>

        {/* Stock Status */}
        <div className="absolute bottom-2 left-2">
          {product.availability === 'low-stock' && product.stock <= 5 && (
            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-medium animate-pulse">
              Only {product.stock} left!
            </span>
          )}
          {product.availability === 'low-stock' && product.stock > 5 && product.stock <= 10 && (
            <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              {product.stock} left in stock
            </span>
          )}
          {product.availability === 'out-of-stock' && (
            <span className="bg-gray-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              Out of Stock
            </span>
          )}
          {product.availability === 'in-stock' && product.trending && (
            <span className="bg-green-500 text-white text-xs px-2 py-1 rounded-full font-medium">
              🔥 Trending
            </span>
          )}
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
            {product.category}
          </p>
          <h3 
            className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 cursor-pointer line-clamp-2"
            onClick={handleProductClick}
          >
            {product.name}
          </h3>
        </div>

        {/* Rating */}
        <div className="flex items-center mb-2">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-4 w-4 ${
                  i < Math.floor(product.rating)
                    ? 'text-yellow-400 fill-current'
                    : 'text-gray-300 dark:text-gray-600'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
            {product.rating} ({product.reviewCount || 0})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 dark:text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
          
          {product.shipping?.freeShipping && (
            <span className="text-xs text-green-600 dark:text-green-400 font-medium">
              Free Shipping
            </span>
          )}
        </div>

        {/* Vendor */}
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          by {product.vendorName}
        </div>
      </div>
    </Link>
  );
};

export default EnhancedProductCard;