'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ShoppingCart, 
  Plus, 
  Minus, 
  Trash2, 
  Gift, 
  Tag, 
  CreditCard,
  ShoppingBag,
  Heart,
  Clock,
  ArrowRight,
  Package,
  Truck,
  MapPin,
  Shield,
  AlertTriangle,
  CheckCircle,
  X
} from 'lucide-react'

interface CartItem {
  id: string
  name: string
  price: number
  originalPrice?: number
  quantity: number
  image: string
  variant?: string
  sellerId: string
  sellerName: string
  shippingTime: string
  inStock: boolean
  maxQuantity: number
  category: string
}

interface Coupon {
  code: string
  discount: number
  type: 'percentage' | 'fixed'
  description: string
  minOrder?: number
  expiresAt: string
}

interface ShippingOption {
  id: string
  name: string
  price: number
  estimatedDays: string
  description: string
}

const AdvancedShoppingCart: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: '1',
      name: 'Wireless Bluetooth Headphones',
      price: 199.99,
      originalPrice: 249.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100',
      variant: 'Black',
      sellerId: 'seller1',
      sellerName: 'TechStore',
      shippingTime: '2-3 days',
      inStock: true,
      maxQuantity: 5,
      category: 'Electronics'
    },
    {
      id: '2',
      name: 'Smart Fitness Watch',
      price: 299.99,
      quantity: 1,
      image: 'https://via.placeholder.com/100x100',
      variant: '42mm',
      sellerId: 'seller2',
      sellerName: 'FitGear',
      shippingTime: '1-2 days',
      inStock: true,
      maxQuantity: 3,
      category: 'Wearables'
    }
  ])

  const [savedItems, setSavedItems] = useState<CartItem[]>([])
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null)
  const [couponCode, setCouponCode] = useState('')
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null)
  const [showSavedItems, setShowSavedItems] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)

  const availableCoupons: Coupon[] = [
    {
      code: 'SAVE20',
      discount: 20,
      type: 'percentage',
      description: '20% off orders over $100',
      minOrder: 100,
      expiresAt: '2024-12-31'
    },
    {
      code: 'FREESHIP',
      discount: 15,
      type: 'fixed',
      description: '$15 off shipping',
      expiresAt: '2024-12-31'
    }
  ]

  const shippingOptions: ShippingOption[] = [
    {
      id: 'standard',
      name: 'Standard Shipping',
      price: 5.99,
      estimatedDays: '5-7 business days',
      description: 'Regular delivery'
    },
    {
      id: 'express',
      name: 'Express Shipping',
      price: 15.99,
      estimatedDays: '2-3 business days',
      description: 'Faster delivery'
    },
    {
      id: 'overnight',
      name: 'Overnight Shipping',
      price: 29.99,
      estimatedDays: '1 business day',
      description: 'Next day delivery'
    }
  ]

  // Set default shipping
  useEffect(() => {
    if (!selectedShipping && shippingOptions.length > 0) {
      setSelectedShipping(shippingOptions[0])
    }
  }, [selectedShipping])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(id)
      return
    }

    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          quantity: Math.min(newQuantity, item.maxQuantity)
        }
      }
      return item
    }))
  }

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id))
  }

  const saveForLater = (id: string) => {
    const item = cartItems.find(item => item.id === id)
    if (item) {
      setSavedItems(prev => [...prev, item])
      removeItem(id)
    }
  }

  const moveToCart = (id: string) => {
    const item = savedItems.find(item => item.id === id)
    if (item) {
      setCartItems(prev => [...prev, item])
      setSavedItems(prev => prev.filter(i => i.id !== id))
    }
  }

  const applyCoupon = () => {
    const coupon = availableCoupons.find(c => c.code.toLowerCase() === couponCode.toLowerCase())
    if (coupon) {
      const subtotal = getSubtotal()
      if (coupon.minOrder && subtotal < coupon.minOrder) {
        alert(`Minimum order of $${coupon.minOrder} required`)
        return
      }
      setAppliedCoupon(coupon)
      setCouponCode('')
    } else {
      alert('Invalid coupon code')
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
  }

  const getSubtotal = () => {
    return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  }

  const getDiscount = () => {
    if (!appliedCoupon) return 0
    const subtotal = getSubtotal()
    return appliedCoupon.type === 'percentage' 
      ? (subtotal * appliedCoupon.discount / 100)
      : appliedCoupon.discount
  }

  const getShippingCost = () => {
    return selectedShipping?.price || 0
  }

  const getTaxes = () => {
    const subtotal = getSubtotal() - getDiscount()
    return subtotal * 0.08 // 8% tax
  }

  const getTotal = () => {
    return getSubtotal() - getDiscount() + getShippingCost() + getTaxes()
  }

  const groupedItems = cartItems.reduce((groups, item) => {
    if (!groups[item.sellerId]) {
      groups[item.sellerId] = {
        seller: item.sellerName,
        items: []
      }
    }
    groups[item.sellerId].items.push(item)
    return groups
  }, {} as Record<string, { seller: string, items: CartItem[] }>)

  const handleCheckout = () => {
    setIsProcessing(true)
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false)
      alert('Redirecting to checkout...')
    }, 2000)
  }

  if (cartItems.length === 0 && savedItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="text-center py-16">
          <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            Add some products to get started
          </p>
          <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center mx-auto">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Continue Shopping
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Shopping Cart
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          {cartItems.length} item{cartItems.length !== 1 ? 's' : ''} in your cart
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {/* Multi-seller grouping */}
          {Object.entries(groupedItems).map(([sellerId, group]) => (
            <motion.div
              key={sellerId}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 overflow-hidden"
            >
              {/* Seller Header */}
              <div className="bg-gray-50 dark:bg-gray-700 px-6 py-3 border-b border-gray-200 dark:border-gray-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Package className="w-5 h-5 text-gray-500 mr-2" />
                    <span className="font-medium text-gray-900 dark:text-white">
                      Sold by {group.seller}
                    </span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                    <Truck className="w-4 h-4 mr-1" />
                    {group.items[0]?.shippingTime}
                  </div>
                </div>
              </div>

              {/* Items */}
              <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {group.items.map((item) => (
                  <motion.div
                    key={item.id}
                    layout
                    className="p-6"
                  >
                    <div className="flex items-start space-x-4">
                      {/* Product Image */}
                      <div className="w-20 h-20 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                          {item.name}
                        </h3>
                        {item.variant && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Variant: {item.variant}
                          </p>
                        )}
                        
                        <div className="flex items-center space-x-4 mb-3">
                          <div className="flex items-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">
                              ${item.price.toFixed(2)}
                            </span>
                            {item.originalPrice && (
                              <span className="text-sm text-gray-500 line-through ml-2">
                                ${item.originalPrice.toFixed(2)}
                              </span>
                            )}
                          </div>
                          
                          {item.originalPrice && (
                            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded-full">
                              Save ${(item.originalPrice - item.price).toFixed(2)}
                            </span>
                          )}
                        </div>

                        {/* Stock Status */}
                        <div className="flex items-center mb-3">
                          {item.inStock ? (
                            <div className="flex items-center text-green-600 text-sm">
                              <CheckCircle className="w-4 h-4 mr-1" />
                              In Stock
                            </div>
                          ) : (
                            <div className="flex items-center text-red-600 text-sm">
                              <AlertTriangle className="w-4 h-4 mr-1" />
                              Out of Stock
                            </div>
                          )}
                        </div>

                        {/* Actions */}
                        <div className="flex items-center justify-between">
                          {/* Quantity Controls */}
                          <div className="flex items-center space-x-3">
                            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-l-lg"
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="px-4 py-2 min-w-[3rem] text-center text-gray-900 dark:text-white">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="p-2 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-r-lg"
                                disabled={item.quantity >= item.maxQuantity}
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            
                            {item.quantity >= item.maxQuantity && (
                              <span className="text-xs text-orange-600">
                                Max quantity: {item.maxQuantity}
                              </span>
                            )}
                          </div>

                          {/* Item Actions */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => saveForLater(item.id)}
                              className="p-2 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg"
                              title="Save for later"
                            >
                              <Clock className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg"
                              title="Remove"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}

          {/* Saved for Later */}
          {savedItems.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setShowSavedItems(!showSavedItems)}
                  className="flex items-center justify-between w-full text-left"
                >
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                    Saved for Later ({savedItems.length})
                  </h3>
                  <ArrowRight 
                    className={`w-5 h-5 transform transition-transform ${
                      showSavedItems ? 'rotate-90' : ''
                    }`} 
                  />
                </button>
              </div>

              <AnimatePresence>
                {showSavedItems && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    {savedItems.map((item) => (
                      <div key={item.id} className="p-6">
                        <div className="flex items-center space-x-4">
                          <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-lg overflow-hidden">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-gray-900 dark:text-white">
                              {item.name}
                            </h4>
                            <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => moveToCart(item.id)}
                              className="px-3 py-1 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                            >
                              Move to Cart
                            </button>
                            <button
                              onClick={() => setSavedItems(prev => prev.filter(i => i.id !== item.id))}
                              className="p-1 text-gray-500 hover:text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 sticky top-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Order Summary
            </h2>

            {/* Promo Code */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Promo Code
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                  placeholder="Enter code"
                  className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
                />
                <button
                  onClick={applyCoupon}
                  disabled={!couponCode.trim()}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
              
              {appliedCoupon && (
                <div className="mt-2 p-3 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <Tag className="w-4 h-4 text-green-600 mr-2" />
                      <span className="text-sm text-green-800 dark:text-green-400">
                        {appliedCoupon.code} applied
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-green-600 hover:text-green-800"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                    {appliedCoupon.description}
                  </p>
                </div>
              )}
            </div>

            {/* Shipping Options */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Shipping Options
              </label>
              <div className="space-y-2">
                {shippingOptions.map((option) => (
                  <label
                    key={option.id}
                    className={`flex items-center p-3 border rounded-lg cursor-pointer ${
                      selectedShipping?.id === option.id
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/30'
                        : 'border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700'
                    }`}
                  >
                    <input
                      type="radio"
                      name="shipping"
                      checked={selectedShipping?.id === option.id}
                      onChange={() => setSelectedShipping(option)}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <div className="ml-3 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {option.name}
                          </p>
                          <p className="text-sm text-gray-500">
                            {option.estimatedDays}
                          </p>
                        </div>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${option.price.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${getSubtotal().toFixed(2)}</span>
              </div>
              
              {appliedCoupon && getDiscount() > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount ({appliedCoupon.code})</span>
                  <span>-${getDiscount().toFixed(2)}</span>
                </div>
              )}
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                <span className="text-gray-900 dark:text-white">${getShippingCost().toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-300">Tax</span>
                <span className="text-gray-900 dark:text-white">${getTaxes().toFixed(2)}</span>
              </div>
              
              <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                <div className="flex justify-between text-lg font-bold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${getTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Security Badge */}
            <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
              <div className="flex items-center">
                <Shield className="w-5 h-5 text-green-600 mr-2" />
                <span className="text-sm text-gray-700 dark:text-gray-300">
                  Secure checkout with 256-bit SSL encryption
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing || cartItems.length === 0}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 font-medium flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? (
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
              ) : (
                <CreditCard className="w-5 h-5 mr-2" />
              )}
              {isProcessing ? 'Processing...' : 'Proceed to Checkout'}
            </button>

            {/* Continue Shopping */}
            <button className="w-full mt-3 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 font-medium">
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AdvancedShoppingCart