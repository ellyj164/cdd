import React, { useState, useEffect } from 'react';
import { 
  ShoppingCart, 
  Clock, 
  MapPin, 
  Truck, 
  Calendar, 
  Package, 
  Percent, 
  Star,
  Plus,
  Minus,
  Search,
  Filter,
  CheckCircle,
  AlertCircle
} from 'lucide-react';

// Grocery & Essentials System Component (Walmart-style)
export const GrocerySystem = ({ 
  userLocation, 
  onAddToCart, 
  onScheduleDelivery, 
  onSubscribe 
}) => {
  const [selectedStore, setSelectedStore] = useState(null);
  const [deliverySlots, setDeliverySlots] = useState([]);
  const [groceryCategories, setGroceryCategories] = useState([]);
  const [cart, setCart] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);
  const [bulkDeals, setBulkDeals] = useState([]);

  // Mock grocery categories and products
  const categories = [
    {
      id: 'fresh',
      name: 'Fresh Produce',
      icon: '🥬',
      products: [
        {
          id: 'g001',
          name: 'Organic Bananas',
          price: 1.99,
          unit: 'per lb',
          image: 'https://placehold.co/300x300/22c55e/ffffff?text=Bananas',
          organic: true,
          inStock: 150,
          nutrition: { calories: 89, protein: 1.1, carbs: 23 }
        },
        {
          id: 'g002',
          name: 'Fresh Strawberries',
          price: 4.99,
          unit: 'per package',
          image: 'https://placehold.co/300x300/ef4444/ffffff?text=Strawberries',
          organic: false,
          inStock: 45,
          nutrition: { calories: 32, protein: 0.7, carbs: 7.7 }
        }
      ]
    },
    {
      id: 'dairy',
      name: 'Dairy & Eggs',
      icon: '🥛',
      products: [
        {
          id: 'g003',
          name: 'Organic Whole Milk',
          price: 3.99,
          unit: 'per gallon',
          image: 'https://placehold.co/300x300/3b82f6/ffffff?text=Milk',
          organic: true,
          inStock: 25,
          expiry: '2024-02-15'
        }
      ]
    },
    {
      id: 'pantry',
      name: 'Pantry Staples',
      icon: '🍞',
      products: [
        {
          id: 'g004',
          name: 'Whole Grain Bread',
          price: 2.49,
          unit: 'per loaf',
          image: 'https://placehold.co/300x300/d97706/ffffff?text=Bread',
          bulkDeal: { quantity: 3, discountPercent: 15 },
          inStock: 78
        }
      ]
    },
    {
      id: 'frozen',
      name: 'Frozen Foods',
      icon: '🧊',
      products: []
    },
    {
      id: 'household',
      name: 'Household Essentials',
      icon: '🧽',
      products: [
        {
          id: 'g005',
          name: 'Eco-Friendly Detergent',
          price: 12.99,
          unit: 'per bottle',
          image: 'https://placehold.co/300x300/10b981/ffffff?text=Detergent',
          subscription: { available: true, discount: 20, frequency: 'monthly' },
          inStock: 32
        }
      ]
    }
  ];

  // Nearby stores
  const nearbyStores = [
    {
      id: 'store1',
      name: 'FreshMart Downtown',
      address: '123 Main St, Downtown',
      distance: 0.8,
      rating: 4.6,
      deliveryFee: 2.99,
      freeDeliveryMinimum: 35,
      pickupAvailable: true,
      deliverySlots: ['9:00 AM - 11:00 AM', '2:00 PM - 4:00 PM', '6:00 PM - 8:00 PM']
    },
    {
      id: 'store2',
      name: 'GreenGrocer North',
      address: '456 Oak Ave, North Side',
      distance: 2.1,
      rating: 4.8,
      deliveryFee: 3.99,
      freeDeliveryMinimum: 50,
      pickupAvailable: true,
      deliverySlots: ['8:00 AM - 10:00 AM', '1:00 PM - 3:00 PM', '7:00 PM - 9:00 PM']
    }
  ];

  // Delivery time slots for the next 7 days
  useEffect(() => {
    const slots = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      
      const timeSlots = [
        '8:00 AM - 10:00 AM',
        '10:00 AM - 12:00 PM',
        '1:00 PM - 3:00 PM',
        '4:00 PM - 6:00 PM',
        '7:00 PM - 9:00 PM'
      ];
      
      timeSlots.forEach(time => {
        slots.push({
          date: date.toISOString().split('T')[0],
          time,
          available: Math.random() > 0.3, // Random availability
          premium: i === 0 // Same day delivery is premium
        });
      });
    }
    
    setDeliverySlots(slots);
  }, []);

  const addToCart = (product, quantity = 1) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id 
          ? { ...item, quantity: item.quantity + quantity }
          : item
      ));
    } else {
      setCart([...cart, { ...product, quantity }]);
    }
    onAddToCart?.(product, quantity);
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCart(cart.filter(item => item.id !== productId));
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, quantity: newQuantity } : item
      ));
    }
  };

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const calculateSavings = () => {
    return cart.reduce((savings, item) => {
      if (item.bulkDeal && item.quantity >= item.bulkDeal.quantity) {
        const discount = (item.price * item.quantity * item.bulkDeal.discountPercent) / 100;
        return savings + discount;
      }
      return savings;
    }, 0);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                Grocery & Essentials
              </h1>
              <p className="text-gray-600 dark:text-gray-400">
                Fresh groceries delivered to your doorstep
              </p>
            </div>
            
            {/* Cart Summary */}
            <div className="flex items-center space-x-4">
              <div className="relative">
                <ShoppingCart className="w-8 h-8 text-gray-600 dark:text-gray-400" />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-green-600 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
                    {cart.reduce((sum, item) => sum + item.quantity, 0)}
                  </span>
                )}
              </div>
              <div className="text-right">
                <div className="font-bold text-gray-900 dark:text-white">
                  ${calculateTotal().toFixed(2)}
                </div>
                {calculateSavings() > 0 && (
                  <div className="text-sm text-green-600">
                    You save ${calculateSavings().toFixed(2)}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Store Selection & Delivery Options */}
          <div className="lg:col-span-1 space-y-6">
            {/* Store Selector */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Choose Your Store
              </h3>
              
              <div className="space-y-3">
                {nearbyStores.map((store) => (
                  <button
                    key={store.id}
                    onClick={() => setSelectedStore(store)}
                    className={`w-full p-4 border-2 rounded-lg text-left transition-all ${
                      selectedStore?.id === store.id
                        ? 'border-green-500 bg-green-50 dark:bg-green-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-green-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {store.name}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {store.address}
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center space-x-2 text-sm">
                        <MapPin className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {store.distance} mi
                        </span>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {store.rating}
                        </span>
                      </div>
                      {selectedStore?.id === store.id && (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Delivery Options */}
            {selectedStore && (
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                  Delivery Options
                </h3>
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Truck className="w-5 h-5 text-green-600" />
                      <div>
                        <div className="font-medium text-gray-900 dark:text-white">
                          Delivery
                        </div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">
                          ${selectedStore.deliveryFee} fee
                        </div>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      Free over ${selectedStore.freeDeliveryMinimum}
                    </div>
                  </div>
                  
                  {selectedStore.pickupAvailable && (
                    <div className="flex items-center justify-between p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Package className="w-5 h-5 text-blue-600" />
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">
                            Pickup
                          </div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Free pickup
                          </div>
                        </div>
                      </div>
                      <div className="text-sm text-green-600">
                        Ready in 2 hours
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Quick Reorder */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Quick Reorder
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Last week's order
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    12 items • $67.34
                  </div>
                </button>
                <button className="w-full text-left p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded">
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    Monthly essentials
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    8 items • $45.99
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Product Categories & Grid */}
          <div className="lg:col-span-3 space-y-6">
            {/* Category Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Shop by Category
              </h3>
              
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {categories.map((category) => (
                  <button
                    key={category.id}
                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center"
                  >
                    <div className="text-3xl mb-2">{category.icon}</div>
                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                      {category.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Fresh Produce
                </h3>
                <div className="flex items-center space-x-2">
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Search className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                  <button className="p-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Filter className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.flatMap(cat => cat.products).map((product) => (
                  <GroceryProductCard
                    key={product.id}
                    product={product}
                    cartItem={cart.find(item => item.id === product.id)}
                    onAddToCart={addToCart}
                    onUpdateQuantity={updateQuantity}
                  />
                ))}
              </div>
            </div>

            {/* Bulk Deals */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-lg shadow p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Percent className="w-6 h-6 text-green-600" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Bulk Savings Available
                </h3>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Buy 3+ Bread Loaves
                  </div>
                  <div className="text-sm text-green-600">Save 15%</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                  <div className="font-medium text-gray-900 dark:text-white">
                    Household Bundle
                  </div>
                  <div className="text-sm text-green-600">Save $12 on 5+ items</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Delivery Scheduling Modal */}
        {cart.length > 0 && (
          <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 p-6 shadow-lg">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div>
                <div className="font-semibold text-gray-900 dark:text-white">
                  {cart.reduce((sum, item) => sum + item.quantity, 0)} items in cart
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  Total: ${calculateTotal().toFixed(2)}
                  {calculateSavings() > 0 && (
                    <span className="text-green-600 ml-2">
                      (Save ${calculateSavings().toFixed(2)})
                    </span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center space-x-4">
                <button className="px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                  View Cart
                </button>
                <button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium">
                  Schedule Delivery
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

// Grocery Product Card Component
const GroceryProductCard = ({ product, cartItem, onAddToCart, onUpdateQuantity }) => {
  const quantity = cartItem?.quantity || 0;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        
        {product.organic && (
          <div className="absolute top-2 left-2 bg-green-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Organic
          </div>
        )}
        
        {product.bulkDeal && (
          <div className="absolute top-2 right-2 bg-orange-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            Bulk Deal
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {product.name}
        </h3>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <div className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {product.unit}
            </div>
          </div>
          
          {product.inStock < 10 && (
            <div className="flex items-center text-orange-600">
              <AlertCircle className="w-4 h-4 mr-1" />
              <span className="text-xs">Low stock</span>
            </div>
          )}
        </div>

        {/* Bulk Deal Info */}
        {product.bulkDeal && (
          <div className="mb-3 p-2 bg-orange-50 dark:bg-orange-900/20 rounded text-xs text-orange-800 dark:text-orange-200">
            Buy {product.bulkDeal.quantity}+ and save {product.bulkDeal.discountPercent}%
          </div>
        )}

        {/* Subscription Option */}
        {product.subscription?.available && (
          <div className="mb-3 p-2 bg-blue-50 dark:bg-blue-900/20 rounded text-xs text-blue-800 dark:text-blue-200">
            Subscribe & save {product.subscription.discount}%
          </div>
        )}

        {/* Add to Cart Controls */}
        {quantity === 0 ? (
          <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg font-medium transition-colors"
          >
            Add to Cart
          </button>
        ) : (
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => onUpdateQuantity(product.id, quantity - 1)}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <Minus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <span className="font-medium text-gray-900 dark:text-white">
                {quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
                className="w-8 h-8 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center hover:bg-gray-300 dark:hover:bg-gray-500"
              >
                <Plus className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            
            <div className="text-sm font-medium text-green-600">
              ${(product.price * quantity).toFixed(2)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GrocerySystem;