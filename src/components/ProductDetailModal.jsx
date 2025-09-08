import React, { useState } from 'react';
import { Star, X, ShoppingCart, Heart } from 'lucide-react';

export default function ProductDetailModal({ product, onClose, onAddToCart }) {
  const [selectedVariants, setSelectedVariants] = useState({});
  const [showReviews, setShowReviews] = useState(false);

  if (!product) return null;

  const calculatePrice = () => {
    let totalModifier = 0;
    Object.values(selectedVariants).forEach(variant => {
      totalModifier += variant.priceModifier || 0;
    });
    return product.price + totalModifier;
  };

  const handleVariantSelect = (type, variant) => {
    setSelectedVariants(prev => ({
      ...prev,
      [type]: variant
    }));
  };

  const renderStars = (rating) => {
    return [...Array(5)].map((_, i) => (
      <Star
        key={i}
        className={`w-4 h-4 ${
          i < Math.floor(rating) 
            ? 'fill-yellow-400 text-yellow-400' 
            : 'text-gray-300'
        }`}
      />
    ));
  };

  const variantTypes = [...new Set(product.variants?.map(v => v.type) || [])];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
      <div className="bg-white w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg relative">
        <button
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800 z-10 bg-white rounded-full p-2 shadow-md"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
          {/* Product Image */}
          <div className="space-y-4">
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-96 object-cover rounded-lg"
            />
          </div>

          {/* Product Details */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-indigo-600 font-medium">{product.vendorName}</span>
                <button className="text-gray-400 hover:text-red-500">
                  <Heart className="w-5 h-5" />
                </button>
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mt-1">{product.name}</h2>
            </div>

            <div className="flex items-center space-x-2">
              <div className="flex">
                {renderStars(product.rating)}
              </div>
              <span className="text-sm text-gray-600">
                {product.rating} ({product.reviews?.length || 0} reviews)
              </span>
            </div>

            <div className="flex items-center space-x-4">
              <span className="text-3xl font-bold text-gray-900">
                ${calculatePrice().toFixed(2)}
              </span>
              {calculatePrice() !== product.price && (
                <span className="text-xl text-gray-500 line-through">
                  ${product.price.toFixed(2)}
                </span>
              )}
            </div>

            <p className="text-gray-700 leading-relaxed">{product.description}</p>

            {/* Variants */}
            {variantTypes.map(type => (
              <div key={type} className="space-y-2">
                <label className="block text-sm font-medium text-gray-700 capitalize">
                  {type}
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.variants
                    .filter(v => v.type === type)
                    .map(variant => (
                      <button
                        key={variant.id}
                        onClick={() => handleVariantSelect(type, variant)}
                        className={`px-3 py-2 text-sm border rounded-md transition-colors ${
                          selectedVariants[type]?.id === variant.id
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-600'
                            : 'border-gray-300 text-gray-700 hover:border-gray-400'
                        }`}
                      >
                        {variant.name}
                        {variant.priceModifier > 0 && (
                          <span className="ml-1 text-xs">+${variant.priceModifier}</span>
                        )}
                      </button>
                    ))}
                </div>
              </div>
            ))}

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-2 h-2 rounded-full ${
                product.stock > 10 ? 'bg-green-400' : 
                product.stock > 0 ? 'bg-yellow-400' : 'bg-red-400'
              }`} />
              <span className="text-sm text-gray-600">
                {product.stock > 10 ? 'In Stock' :
                 product.stock > 0 ? `Only ${product.stock} left` : 'Out of Stock'}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4">
              <button
                className="w-full bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300"
                onClick={() => onAddToCart({...product, selectedVariants, finalPrice: calculatePrice()})}
                disabled={product.stock === 0}
              >
                <ShoppingCart className="w-5 h-5" />
                <span>Add to Cart</span>
              </button>
              
              <button className="w-full border border-indigo-600 text-indigo-600 px-6 py-3 rounded-lg hover:bg-indigo-50 transition-colors">
                Buy Now
              </button>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="border-t border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">
              Customer Reviews ({product.reviews?.length || 0})
            </h3>
            <button
              onClick={() => setShowReviews(!showReviews)}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
            >
              {showReviews ? 'Hide Reviews' : 'Show All Reviews'}
            </button>
          </div>

          {showReviews && (
            <div className="space-y-4">
              {product.reviews?.map(review => (
                <div key={review.id} className="border-b border-gray-100 pb-4 last:border-b-0">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="font-medium text-gray-900">{review.userName}</span>
                      <div className="flex">
                        {renderStars(review.rating)}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">{review.date}</span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
              
              {(!product.reviews || product.reviews.length === 0) && (
                <p className="text-gray-500 text-center py-4">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
