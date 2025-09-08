import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  ShoppingBag,
  CreditCard,
  MapPin,
  Truck,
  Shield,
  ArrowLeft,
  Check,
  ChevronRight,
  Gift,
  AlertCircle,
  Clock,
  Star,
  Lock
} from 'lucide-react';
import { useCartStore } from '../stores/useCartStore.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { toast } from 'react-hot-toast';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { cart, getCartTotal, getCartCount, clearCart } = useCartStore();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderData, setOrderData] = useState({
    shippingAddress: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    billingAddress: {
      sameAsShipping: true,
      firstName: '',
      lastName: '',
      address: '',
      city: '',
      state: '',
      zipCode: '',
      country: 'United States'
    },
    payment: {
      method: 'card',
      cardNumber: '',
      expiryDate: '',
      cvv: '',
      nameOnCard: ''
    },
    shipping: {
      method: 'standard',
      speed: 'Standard (5-7 business days)',
      cost: 9.99
    }
  });

  const cartTotal = getCartTotal();
  const cartCount = getCartCount();
  const shippingCost = cartTotal > 50 ? 0 : orderData.shipping.cost;
  const tax = cartTotal * 0.08;
  const finalTotal = cartTotal + shippingCost + tax;

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/cart');
    }
  }, [cart, navigate]);

  const updateOrderData = (section, field, value) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const validateStep = (step) => {
    switch (step) {
      case 1:
        const { firstName, lastName, email, address, city, state, zipCode } = orderData.shippingAddress;
        return firstName && lastName && email && address && city && state && zipCode;
      case 2:
        return true; // Shipping method is always valid
      case 3:
        const { cardNumber, expiryDate, cvv, nameOnCard } = orderData.payment;
        return cardNumber && expiryDate && cvv && nameOnCard;
      default:
        return false;
    }
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const processOrder = async () => {
    setIsProcessing(true);
    try {
      // Simulate order processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Clear cart and redirect to success page
      clearCart();
      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error('Failed to process order. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const StepIndicator = () => (
    <div className="flex items-center justify-center mb-8">
      {[
        { number: 1, label: 'Shipping' },
        { number: 2, label: 'Delivery' },
        { number: 3, label: 'Payment' },
        { number: 4, label: 'Review' }
      ].map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
            currentStep >= step.number 
              ? 'bg-blue-600 border-blue-600 text-white' 
              : 'border-gray-300 text-gray-400'
          }`}>
            {currentStep > step.number ? (
              <Check className="w-5 h-5" />
            ) : (
              <span className="text-sm font-medium">{step.number}</span>
            )}
          </div>
          <span className={`ml-2 text-sm font-medium ${
            currentStep >= step.number ? 'text-blue-600' : 'text-gray-500'
          }`}>
            {step.label}
          </span>
          {index < 3 && (
            <ChevronRight className="w-5 h-5 text-gray-300 mx-4" />
          )}
        </div>
      ))}
    </div>
  );

  const ShippingStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Shipping Information</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
          <input
            type="text"
            value={orderData.shippingAddress.firstName}
            onChange={(e) => updateOrderData('shippingAddress', 'firstName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
          <input
            type="text"
            value={orderData.shippingAddress.lastName}
            onChange={(e) => updateOrderData('shippingAddress', 'lastName', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
        <input
          type="email"
          value={orderData.shippingAddress.email}
          onChange={(e) => updateOrderData('shippingAddress', 'email', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
        <input
          type="tel"
          value={orderData.shippingAddress.phone}
          onChange={(e) => updateOrderData('shippingAddress', 'phone', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Street Address *</label>
        <input
          type="text"
          value={orderData.shippingAddress.address}
          onChange={(e) => updateOrderData('shippingAddress', 'address', e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">City *</label>
          <input
            type="text"
            value={orderData.shippingAddress.city}
            onChange={(e) => updateOrderData('shippingAddress', 'city', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">State *</label>
          <select
            value={orderData.shippingAddress.state}
            onChange={(e) => updateOrderData('shippingAddress', 'state', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select State</option>
            <option value="CA">California</option>
            <option value="NY">New York</option>
            <option value="TX">Texas</option>
            <option value="FL">Florida</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">ZIP Code *</label>
          <input
            type="text"
            value={orderData.shippingAddress.zipCode}
            onChange={(e) => updateOrderData('shippingAddress', 'zipCode', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </motion.div>
  );

  const DeliveryStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Delivery Options</h2>
      
      <div className="space-y-4">
        {[
          { 
            id: 'standard', 
            label: 'Standard Shipping', 
            description: '5-7 business days', 
            cost: cartTotal > 50 ? 0 : 9.99,
            icon: Truck 
          },
          { 
            id: 'express', 
            label: 'Express Shipping', 
            description: '2-3 business days', 
            cost: 19.99,
            icon: Clock 
          },
          { 
            id: 'overnight', 
            label: 'Overnight Shipping', 
            description: 'Next business day', 
            cost: 29.99,
            icon: Star 
          }
        ].map((option) => (
          <div
            key={option.id}
            onClick={() => updateOrderData('shipping', 'method', option.id)}
            className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
              orderData.shipping.method === option.id
                ? 'border-blue-500 bg-blue-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-lg ${
                  orderData.shipping.method === option.id ? 'bg-blue-100' : 'bg-gray-100'
                }`}>
                  <option.icon className={`w-5 h-5 ${
                    orderData.shipping.method === option.id ? 'text-blue-600' : 'text-gray-600'
                  }`} />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{option.label}</h3>
                  <p className="text-sm text-gray-500">{option.description}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-medium text-gray-900">
                  {option.cost === 0 ? 'FREE' : `$${option.cost.toFixed(2)}`}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );

  const PaymentStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Payment Information</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
          <div className="relative">
            <input
              type="text"
              value={orderData.payment.cardNumber}
              onChange={(e) => updateOrderData('payment', 'cardNumber', e.target.value)}
              placeholder="1234 5678 9012 3456"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 pr-12 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <CreditCard className="w-5 h-5 text-gray-400 absolute right-3 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date *</label>
            <input
              type="text"
              value={orderData.payment.expiryDate}
              onChange={(e) => updateOrderData('payment', 'expiryDate', e.target.value)}
              placeholder="MM/YY"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">CVV *</label>
            <input
              type="text"
              value={orderData.payment.cvv}
              onChange={(e) => updateOrderData('payment', 'cvv', e.target.value)}
              placeholder="123"
              className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Name on Card *</label>
          <input
            type="text"
            value={orderData.payment.nameOnCard}
            onChange={(e) => updateOrderData('payment', 'nameOnCard', e.target.value)}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Shield className="w-4 h-4" />
            <span>Your payment information is encrypted and secure</span>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const ReviewStep = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      className="space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-900">Review Your Order</h2>
      
      {/* Order Items */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
        <div className="space-y-3">
          {cart.map((item) => (
            <div key={item.productId} className="flex items-center space-x-3">
              <img 
                src={item.imageUrl || '/api/placeholder/60/60'} 
                alt={item.name}
                className="w-15 h-15 object-cover rounded"
              />
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">{item.name}</h4>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
              </div>
              <span className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Shipping Address */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
        <div className="text-sm text-gray-600">
          <p>{orderData.shippingAddress.firstName} {orderData.shippingAddress.lastName}</p>
          <p>{orderData.shippingAddress.address}</p>
          <p>{orderData.shippingAddress.city}, {orderData.shippingAddress.state} {orderData.shippingAddress.zipCode}</p>
          <p>{orderData.shippingAddress.email}</p>
        </div>
      </div>

      {/* Payment Method */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
        <div className="flex items-center space-x-3">
          <CreditCard className="w-5 h-5 text-gray-600" />
          <span className="text-sm text-gray-600">
            **** **** **** {orderData.payment.cardNumber.slice(-4)}
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (cart.length === 0) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/cart')}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Cart
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <StepIndicator />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              {currentStep === 1 && <ShippingStep />}
              {currentStep === 2 && <DeliveryStep />}
              {currentStep === 3 && <PaymentStep />}
              {currentStep === 4 && <ReviewStep />}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={prevStep}
                  disabled={currentStep === 1}
                  className="flex items-center px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </button>

                {currentStep < 4 ? (
                  <button
                    onClick={nextStep}
                    className="flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    onClick={processOrder}
                    disabled={isProcessing}
                    className="flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <Lock className="w-4 h-4 mr-2" />
                        Place Order
                      </>
                    )}
                  </button>
                )}
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
                    {shippingCost === 0 ? (
                      <span className="text-green-600">FREE</span>
                    ) : (
                      `$${shippingCost.toFixed(2)}`
                    )}
                  </span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax</span>
                  <span className="font-medium">${tax.toFixed(2)}</span>
                </div>
                
                <hr className="border-gray-200" />
                
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Security Notice */}
              <div className="bg-blue-50 rounded-lg p-3">
                <div className="flex items-center space-x-2 text-sm text-blue-800">
                  <Shield className="w-4 h-4" />
                  <span>SSL secured checkout</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
