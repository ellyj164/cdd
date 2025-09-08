import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Heart,
  ArrowLeft,
  ArrowRight,
  ShoppingBag,
  CreditCard,
  Truck,
  Shield,
  Star,
  Gift,
  Tag,
  Clock,
  Package
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore.js';
import { useWishlistStore } from '../stores/useWishlistStore.js';
import { toast } from 'react-hot-toast';

const CartPage = () => {
  const navigate = useNavigate();
  const { 
    cart, 
    savedForLater, 
    updateQuantity, 
    removeFromCart, 
    clearCart,
    moveToSaved,
    moveToCart,
    getCartTotal,
    getCartCount
  } = useCartStore();
  const { addToWishlist } = useWishlistStore();
  
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const shipping = cartTotal > 50 ? 0 : 9.99;
  const tax = cartTotal * 0.08;
  const discount = appliedCoupon ? cartTotal * 0.1 : 0;
  const finalTotal = cartTotal + shipping + tax - discount;

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'welcome10') {
      setAppliedCoupon({ code: 'WELCOME10', discount: 10 });
      toast.success('Coupon applied! 10% discount');
    } else {
      toast.error('Invalid coupon code');
    }
    setCouponCode('');
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    toast.success('Coupon removed');
  };

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      // Simulate checkout process
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate('/checkout');
    } catch (error) {
      toast.error('Error proceeding to checkout');
    } finally {
      setIsLoading(false);
    }
  };

  const CartItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm"
    >
      <div className="flex items-start space-x-4">
        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.imageUrl || '/api/placeholder/96/96'} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.name}</h3>
              <p className="text-sm text-gray-500 mb-2">SKU: {item.productId}</p>
              
              {item.selectedVariants && Object.keys(item.selectedVariants).length > 0 && (
                <div className="mb-2">
                  {Object.entries(item.selectedVariants).map(([key, value]) => (
                    <span key={key} className="inline-block bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded mr-2">
                      {key}: {value}
                    </span>
                  ))}
                </div>
              )}
              
              <div className="flex items-center space-x-2 mb-3">
                <span className="text-xl font-bold text-gray-900">${item.price}</span>
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-gray-500 line-through">${item.originalPrice}</span>
                )}
                {item.originalPrice && item.originalPrice > item.price && (
                  <span className="text-sm text-green-600 font-medium">
                    Save ${(item.originalPrice - item.price).toFixed(2)}
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2 text-sm text-green-600">
                <Truck className="w-4 h-4" />
                <span>Free shipping</span>
                <Clock className="w-4 h-4 ml-4" />
                <span>Arrives by tomorrow</span>
              </div>
            </div>
            
            <div className="flex flex-col items-end space-y-2">
              <button
                onClick={() => removeFromCart(item.productId)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
              <button
                onClick={() => {
                  addToWishlist(item.product);
                  removeFromCart(item.productId);
                  toast.success('Moved to wishlist');
                }}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <Heart className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center border border-gray-300 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-4 py-2 font-medium">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                  className="p-2 hover:bg-gray-50 transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              
              <button
                onClick={() => {
                  moveToSaved(item.productId);
                  toast.success('Moved to saved for later');
                }}
                className="text-sm text-blue-600 hover:text-blue-800 font-medium"
              >
                Save for later
              </button>
            </div>
            
            <div className="text-right">
              <p className="text-lg font-bold text-gray-900">
                ${(item.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const SavedItem = ({ item }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-lg border border-gray-200 p-4 shadow-sm"
    >
      <div className="flex items-center space-x-3">
        <div className="w-16 h-16 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
          <img 
            src={item.imageUrl || '/api/placeholder/64/64'} 
            alt={item.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{item.name}</h4>
          <p className="text-sm text-gray-500">${item.price}</p>
        </div>
        
        <div className="flex items-center space-x-2">
          <button
            onClick={() => {
              moveToCart(item.productId);
              toast.success('Moved to cart');
            }}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Move to cart
          </button>
          <button
            onClick={() => removeFromCart(item.productId)}
            className="text-gray-400 hover:text-red-500"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );

  if (cart.length === 0 && savedForLater.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <ShoppingCart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-8">Looks like you haven't added anything to your cart yet</p>
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Start Shopping
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-500 mt-1">{cartCount} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Cart Items ({cartCount})</h2>
                  <button
                    onClick={() => {
                      clearCart();
                      toast.success('Cart cleared');
                    }}
                    className="text-sm text-red-600 hover:text-red-800"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="space-y-4">
                  {cart.map((item) => (
                    <CartItem key={item.productId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Saved for Later */}
            {savedForLater.length > 0 && (
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">
                  Saved for Later ({savedForLater.length})
                </h2>
                <div className="space-y-3">
                  {savedForLater.map((item) => (
                    <SavedItem key={item.productId} item={item} />
                  ))}
                </div>
              </div>
            )}

            {/* Recommended Products */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">You might also like</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { id: 1, name: 'Wireless Mouse', price: 29.99, image: '/api/placeholder/150/150' },
                  { id: 2, name: 'USB-C Cable', price: 19.99, image: '/api/placeholder/150/150' },
                  { id: 3, name: 'Phone Stand', price: 24.99, image: '/api/placeholder/150/150' },
                  { id: 4, name: 'Desk Pad', price: 34.99, image: '/api/placeholder/150/150' }
                ].map((product) => (
                  <div key={product.id} className="border border-gray-200 rounded-lg p-3">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-24 object-cover rounded mb-2"
                    />
                    <h4 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h4>
                    <p className="text-sm font-bold text-gray-900">${product.price}</p>
                    <button className="w-full mt-2 text-xs bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition-colors">
                      Add to Cart
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm sticky top-4">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal ({cartCount} items)</span>
                  <span className="font-medium">${cartTotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                {appliedCoupon && (
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Discount ({appliedCoupon.code})</span>
                    <span className="font-medium text-green-600">-${discount.toFixed(2)}</span>
                  </div>
                )}
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Coupon Code */}
              <div className="mb-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Enter coupon code"
                    className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    onClick={applyCoupon}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm hover:bg-gray-200 transition-colors"
                  >
                    Apply
                  </button>
                </div>
                
                {appliedCoupon && (
                  <div className="mt-2 flex items-center justify-between bg-green-50 text-green-800 p-2 rounded">
                    <span className="text-sm">Coupon applied: {appliedCoupon.code}</span>
                    <button onClick={removeCoupon} className="text-green-600 hover:text-green-800">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleCheckout}
                disabled={cart.length === 0 || isLoading}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Proceed to Checkout
                  </>
                )}
              </button>

              {/* Security Badge */}
              <div className="mt-4 flex items-center justify-center text-sm text-gray-500">
                <Shield className="w-4 h-4 mr-2" />
                <span>Secure checkout guaranteed</span>
              </div>

              {/* Payment Methods */}
              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500 mb-2">We accept</p>
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center">VISA</div>
                  <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center">MC</div>
                  <div className="w-8 h-5 bg-blue-500 rounded text-white text-xs flex items-center justify-center">AMEX</div>
                  <div className="w-8 h-5 bg-yellow-400 rounded text-white text-xs flex items-center justify-center">PP</div>
                </div>
              </div>

              {/* Gift Options */}
              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Gift className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">Gift Options</span>
                </div>
                <label className="flex items-center space-x-2">
                  <input type="checkbox" className="rounded border-gray-300" />
                  <span className="text-sm text-gray-600">This is a gift</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
