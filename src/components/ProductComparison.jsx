import React from 'react';
import { X, Star, Check, ShoppingCart } from 'lucide-react';
import { useComparisonStore } from '../stores/useComparisonStore';
import { useCartStore } from '../stores/useCartStore';

const ProductComparison = ({ isOpen, onClose }) => {
  const { comparisonList, removeFromComparison, clearComparison } = useComparisonStore();
  const { addToCart } = useCartStore();

  if (!isOpen || comparisonList.length === 0) return null;

  const features = [
    { key: 'price', label: 'Price', type: 'price' },
    { key: 'rating', label: 'Rating', type: 'rating' },
    { key: 'reviewCount', label: 'Reviews', type: 'number' },
    { key: 'category', label: 'Category', type: 'text' },
    { key: 'availability', label: 'Availability', type: 'availability' },
    { key: 'shipping.freeShipping', label: 'Free Shipping', type: 'boolean' },
    { key: 'returnPolicy', label: 'Return Policy', type: 'text' },
    { key: 'vendorName', label: 'Vendor', type: 'text' },
  ];

  const getNestedValue = (obj, path) => {
    return path.split('.').reduce((current, key) => current?.[key], obj);
  };

  const renderFeatureValue = (product, feature) => {
    const value = getNestedValue(product, feature.key);
    
    switch (feature.type) {
      case 'price':
        return (
          <div className="flex flex-col">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${value}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        );
      case 'rating':
        return (
          <div className="flex items-center">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(value)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="ml-1 text-sm text-gray-600 dark:text-gray-400">
              {value}
            </span>
          </div>
        );
      case 'boolean':
        return value ? (
          <Check className="h-5 w-5 text-green-500" />
        ) : (
          <X className="h-5 w-5 text-red-500" />
        );
      case 'availability':
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            value === 'in-stock' ? 'bg-green-100 text-green-800' :
            value === 'low-stock' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {value.replace('-', ' ').toUpperCase()}
          </span>
        );
      default:
        return <span className="text-gray-700 dark:text-gray-300">{value || 'N/A'}</span>;
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-6xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            Product Comparison ({comparisonList.length})
          </h2>
          <div className="flex items-center gap-4">
            <button
              onClick={clearComparison}
              className="text-red-600 hover:text-red-700 text-sm font-medium"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Comparison Content */}
        <div className="overflow-auto max-h-[calc(90vh-140px)]">
          <div className="p-6">
            {/* Product Images and Names */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {comparisonList.map((product) => (
                <div key={product.id} className="relative">
                  <button
                    onClick={() => removeFromComparison(product.id)}
                    className="absolute top-2 right-2 bg-white dark:bg-gray-700 text-gray-500 hover:text-red-500 rounded-full p-1 shadow-md z-10"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                    <h3 className="font-semibold text-gray-900 dark:text-white text-sm mb-2">
                      {product.name}
                    </h3>
                    <button
                      onClick={() => addToCart(product)}
                      className="w-full bg-primary-600 text-white px-3 py-2 rounded-md hover:bg-primary-700 flex items-center justify-center gap-2 text-sm"
                    >
                      <ShoppingCart className="h-4 w-4" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Feature Comparison */}
            <div className="space-y-4">
              {features.map((feature) => (
                <div key={feature.key} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                    {feature.label}
                  </h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {comparisonList.map((product) => (
                      <div key={product.id} className="flex items-center justify-center">
                        {renderFeatureValue(product, feature)}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComparison;