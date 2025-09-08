import React, { useState } from 'react';
import { CreditCard, Lock, CheckCircle, AlertCircle } from 'lucide-react';
import { useNotification } from './NotificationSystem.jsx';
import { LoadingButton } from './Loading.jsx';
import { ValidatedInput, ValidatedSelect } from './FormComponents.jsx';

// Payment Method Selection Component
export const PaymentMethodSelector = ({ selectedMethod, onMethodChange }) => {
  const paymentMethods = [
    { id: 'card', name: 'Credit/Debit Card', icon: CreditCard },
    { id: 'paypal', name: 'PayPal', icon: () => <span className="text-blue-600 font-bold">PP</span> },
    { id: 'apple_pay', name: 'Apple Pay', icon: () => <span className="text-gray-800">🍎</span> },
    { id: 'google_pay', name: 'Google Pay', icon: () => <span className="text-blue-600">G</span> }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Payment Method</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {paymentMethods.map(method => {
          const Icon = method.icon;
          return (
            <button
              key={method.id}
              onClick={() => onMethodChange(method.id)}
              className={`p-4 border rounded-lg flex items-center space-x-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors ${
                selectedMethod === method.id
                  ? 'border-primary-500 ring-2 ring-primary-200 bg-primary-50 dark:bg-primary-900/20'
                  : 'border-gray-200 dark:border-gray-600'
              }`}
            >
              <div className="flex-shrink-0">
                <Icon className="h-6 w-6" />
              </div>
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {method.name}
              </span>
              {selectedMethod === method.id && (
                <CheckCircle className="h-5 w-5 text-primary-600 ml-auto" />
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// Credit Card Form Component
export const CreditCardForm = ({ onSubmit, loading = false }) => {
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    zipCode: ''
  });
  const [errors, setErrors] = useState({});
  const { showError } = useNotification();

  // Card number formatting
  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    const matches = v.match(/\d{4,16}/g);
    const match = matches && matches[0] || '';
    const parts = [];
    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }
    if (parts.length) {
      return parts.join(' ');
    } else {
      return v;
    }
  };

  // Expiry date formatting
  const formatExpiry = (value) => {
    const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    if (v.length >= 2) {
      return v.substring(0, 2) + '/' + v.substring(2, 4);
    }
    return v;
  };

  // Card validation
  const validateCard = () => {
    const newErrors = {};
    
    if (!cardData.number.replace(/\s/g, '')) {
      newErrors.number = 'Card number is required';
    } else if (cardData.number.replace(/\s/g, '').length < 13) {
      newErrors.number = 'Card number is invalid';
    }

    if (!cardData.expiry) {
      newErrors.expiry = 'Expiry date is required';
    } else if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardData.expiry)) {
      newErrors.expiry = 'Invalid expiry date format (MM/YY)';
    }

    if (!cardData.cvc) {
      newErrors.cvc = 'CVC is required';
    } else if (cardData.cvc.length < 3) {
      newErrors.cvc = 'CVC must be at least 3 digits';
    }

    if (!cardData.name.trim()) {
      newErrors.name = 'Cardholder name is required';
    }

    if (!cardData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateCard()) {
      onSubmit(cardData);
    } else {
      showError('Validation Error', 'Please check your card information');
    }
  };

  const handleInputChange = (field, value) => {
    let formattedValue = value;
    
    if (field === 'number') {
      formattedValue = formatCardNumber(value);
    } else if (field === 'expiry') {
      formattedValue = formatExpiry(value);
    } else if (field === 'cvc') {
      formattedValue = value.replace(/[^0-9]/g, '').substring(0, 4);
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex items-center space-x-2 mb-4">
        <Lock className="h-4 w-4 text-green-600" />
        <span className="text-sm text-gray-600 dark:text-gray-400">
          Your payment information is secure and encrypted
        </span>
      </div>

      <ValidatedInput
        label="Card Number"
        type="text"
        value={cardData.number}
        onChange={(e) => handleInputChange('number', e.target.value)}
        placeholder="1234 5678 9012 3456"
        error={errors.number}
        maxLength={19}
        required
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ValidatedInput
          label="Expiry Date"
          type="text"
          value={cardData.expiry}
          onChange={(e) => handleInputChange('expiry', e.target.value)}
          placeholder="MM/YY"
          error={errors.expiry}
          maxLength={5}
          required
        />

        <ValidatedInput
          label="CVC"
          type="text"
          value={cardData.cvc}
          onChange={(e) => handleInputChange('cvc', e.target.value)}
          placeholder="123"
          error={errors.cvc}
          maxLength={4}
          required
        />
      </div>

      <ValidatedInput
        label="Cardholder Name"
        type="text"
        value={cardData.name}
        onChange={(e) => handleInputChange('name', e.target.value)}
        placeholder="John Doe"
        error={errors.name}
        required
      />

      <ValidatedInput
        label="ZIP Code"
        type="text"
        value={cardData.zipCode}
        onChange={(e) => handleInputChange('zipCode', e.target.value)}
        placeholder="12345"
        error={errors.zipCode}
        required
      />

      <LoadingButton
        type="submit"
        loading={loading}
        className="w-full bg-primary-600 text-white py-3 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
      >
        Complete Payment
      </LoadingButton>
    </form>
  );
};

// Payment Summary Component
export const PaymentSummary = ({ 
  subtotal, 
  tax, 
  shipping, 
  discount = 0, 
  total,
  currency = 'USD' 
}) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  return (
    <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 space-y-3">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white">Order Summary</h3>
      
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
          <span className="text-gray-900 dark:text-white">{formatPrice(subtotal)}</span>
        </div>
        
        {shipping > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Shipping</span>
            <span className="text-gray-900 dark:text-white">{formatPrice(shipping)}</span>
          </div>
        )}
        
        {tax > 0 && (
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Tax</span>
            <span className="text-gray-900 dark:text-white">{formatPrice(tax)}</span>
          </div>
        )}
        
        {discount > 0 && (
          <div className="flex justify-between text-green-600 dark:text-green-400">
            <span>Discount</span>
            <span>-{formatPrice(discount)}</span>
          </div>
        )}
        
        <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-3">
          <div className="flex justify-between text-lg font-semibold">
            <span className="text-gray-900 dark:text-white">Total</span>
            <span className="text-gray-900 dark:text-white">{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

// Secure Payment Badge
export const SecurePaymentBadge = () => (
  <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400 mt-4">
    <Lock className="h-4 w-4 text-green-600" />
    <span>Secured by 256-bit SSL encryption</span>
  </div>
);

// Payment Success Component
export const PaymentSuccess = ({ orderNumber, amount, onContinue }) => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
        <CheckCircle className="h-6 w-6 text-green-600" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        Payment Successful!
      </h3>
      
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        Your order #{orderNumber} has been confirmed.
      </p>
      
      <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
        {new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD'
        }).format(amount)}
      </p>
      
      <div className="mt-6 space-y-3">
        <button
          onClick={onContinue}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Continue Shopping
        </button>
        
        <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">
          View Order Details
        </button>
      </div>
    </div>
  );
};

// Payment Error Component
export const PaymentError = ({ error, onRetry, onCancel }) => {
  return (
    <div className="text-center py-8">
      <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 dark:bg-red-900">
        <AlertCircle className="h-6 w-6 text-red-600" />
      </div>
      
      <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white">
        Payment Failed
      </h3>
      
      <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {error || 'There was an issue processing your payment. Please try again.'}
      </p>
      
      <div className="mt-6 space-y-3">
        <button
          onClick={onRetry}
          className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          Try Again
        </button>
        
        <button
          onClick={onCancel}
          className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          Cancel Order
        </button>
      </div>
    </div>
  );
};

export default {
  PaymentMethodSelector,
  CreditCardForm,
  PaymentSummary,
  SecurePaymentBadge,
  PaymentSuccess,
  PaymentError
};