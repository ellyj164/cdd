import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';

export default function ProductCard({ product, onAddToCart, onProductClick }) {
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

  return (
    <div className="bg-white border rounded-lg p-4 shadow hover:shadow-lg transition-shadow cursor-pointer group">
      <div className="relative" onClick={() => onProductClick(product)}>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-48 object-cover mb-4 rounded group-hover:opacity-90 transition-opacity"
        />
        <div className="absolute top-2 right-2 bg-white rounded-full px-2 py-1 text-xs font-medium text-gray-600">
          {product.vendorName}
        </div>
        {product.stock <= 5 && product.stock > 0 && (
          <div className="absolute top-2 left-2 bg-yellow-500 text-white rounded-full px-2 py-1 text-xs font-medium">
            Low Stock
          </div>
        )}
        {product.stock === 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white rounded-full px-2 py-1 text-xs font-medium">
            Out of Stock
          </div>
        )}
      </div>
      
      <div onClick={() => onProductClick(product)}>
        <h3 className="text-lg font-semibold text-gray-900 mb-1 group-hover:text-indigo-600 transition-colors">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-2 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-1">
            <div className="flex">
              {renderStars(product.rating)}
            </div>
            <span className="text-sm text-gray-600">
              ({product.reviews?.length || 0})
            </span>
          </div>
          <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
        </div>
      </div>
      
      <button
        className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
        onClick={(e) => {
          e.stopPropagation();
          onAddToCart(product);
        }}
        disabled={product.stock === 0}
      >
        <ShoppingCart className="w-4 h-4" />
        <span>{product.stock === 0 ? 'Out of Stock' : 'Add to Cart'}</span>
      </button>
    </div>
  );
}
