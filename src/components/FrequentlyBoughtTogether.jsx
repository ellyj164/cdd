import React from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, ShoppingCart } from 'lucide-react';
import { enhancedProducts } from '../data/enhancedProducts';
import { useCartStore } from '../stores/useCartStore';

const FrequentlyBoughtTogether = ({ currentProduct }) => {
  const { t } = useTranslation();
  const { addToCart } = useCartStore();

  // Get products that are frequently bought together
  const getFrequentlyBoughtTogether = (product) => {
    if (!product.crossSell || product.crossSell.length === 0) return [];
    
    return product.crossSell
      .map(id => enhancedProducts.find(p => p.id === id))
      .filter(Boolean)
      .slice(0, 3); // Limit to 3 recommendations
  };

  const recommendations = getFrequentlyBoughtTogether(currentProduct);

  if (recommendations.length === 0) return null;

  const currentPrice = currentProduct.price;
  const totalPrice = currentPrice + recommendations.reduce((sum, product) => sum + product.price, 0);
  const bundleDiscount = 0.1; // 10% bundle discount
  const bundlePrice = totalPrice * (1 - bundleDiscount);
  const savings = totalPrice - bundlePrice;

  const handleAddBundle = () => {
    addToCart(currentProduct);
    recommendations.forEach(product => addToCart(product));
  };

  const handleAddIndividual = (product) => {
    addToCart(product);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mt-8">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Frequently Bought Together
      </h3>
      
      <div className="flex items-center space-x-4 mb-6 overflow-x-auto">
        {/* Current Product */}
        <div className="flex-shrink-0 text-center">
          <img
            src={currentProduct.imageUrl}
            alt={currentProduct.name}
            className="w-20 h-20 object-cover rounded-md mx-auto mb-2"
          />
          <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2">
            {currentProduct.name}
          </p>
          <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
            ${currentProduct.price}
          </p>
        </div>

        {/* Plus Icons and Recommended Products */}
        {recommendations.map((product, index) => (
          <React.Fragment key={product.id}>
            <Plus className="h-6 w-6 text-gray-400 flex-shrink-0" />
            <div className="flex-shrink-0 text-center">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-20 h-20 object-cover rounded-md mx-auto mb-2"
              />
              <p className="text-sm font-medium text-gray-900 dark:text-white line-clamp-2 w-20">
                {product.name}
              </p>
              <p className="text-sm font-bold text-primary-600 dark:text-primary-400">
                ${product.price}
              </p>
              <button
                onClick={() => handleAddIndividual(product)}
                className="text-xs text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 mt-1"
              >
                Add this item
              </button>
            </div>
          </React.Fragment>
        ))}
      </div>

      {/* Bundle Pricing */}
      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600 dark:text-gray-300">
            Total price for all items:
          </span>
          <span className="text-sm line-through text-gray-500 dark:text-gray-400">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between mb-2">
          <span className="text-lg font-semibold text-gray-900 dark:text-white">
            Bundle price:
          </span>
          <span className="text-lg font-bold text-green-600 dark:text-green-400">
            ${bundlePrice.toFixed(2)}
          </span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-sm text-green-600 dark:text-green-400">
            You save:
          </span>
          <span className="text-sm font-semibold text-green-600 dark:text-green-400">
            ${savings.toFixed(2)} ({Math.round(bundleDiscount * 100)}% off)
          </span>
        </div>
      </div>

      {/* Add Bundle Button */}
      <button
        onClick={handleAddBundle}
        className="w-full bg-primary-600 text-white px-6 py-3 rounded-md hover:bg-primary-700 flex items-center justify-center gap-2 font-medium"
      >
        <ShoppingCart className="h-5 w-5" />
        Add All to Cart - ${bundlePrice.toFixed(2)}
      </button>
    </div>
  );
};

export default FrequentlyBoughtTogether;