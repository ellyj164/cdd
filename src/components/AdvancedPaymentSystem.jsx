import React, { useState, useEffect } from 'react';
import { 
  CreditCard, 
  Smartphone, 
  DollarSign, 
  Bitcoin, 
  Shield, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Lock,
  Zap,
  Globe,
  Wallet
} from 'lucide-react';

// Advanced Payment System Component
export const AdvancedPaymentSystem = ({ 
  total, 
  currency = 'USD', 
  onPaymentComplete, 
  onPaymentError 
}) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [paymentData, setPaymentData] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [installmentPlan, setInstallmentPlan] = useState(null);
  const [cryptoRates, setCryptoRates] = useState({});
  const [selectedInstallment, setSelectedInstallment] = useState(null);

  // Payment methods configuration
  const paymentMethods = [
    {
      id: 'card',
      name: 'Credit/Debit Card',
      icon: CreditCard,
      description: 'Visa, Mastercard, American Express',
      fee: 0,
      instant: true
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: Wallet,
      description: 'Pay with your PayPal account',
      fee: 0,
      instant: true
    },
    {
      id: 'apple-pay',
      name: 'Apple Pay',
      icon: Smartphone,
      description: 'Touch ID or Face ID',
      fee: 0,
      instant: true,
      available: /iPad|iPhone|iPod/.test(navigator.userAgent)
    },
    {
      id: 'google-pay',
      name: 'Google Pay',
      icon: Smartphone,
      description: 'One-tap checkout',
      fee: 0,
      instant: true,
      available: true
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      icon: Bitcoin,
      description: 'BTC payments',
      fee: 0.001,
      instant: false,
      confirmation: '10-60 minutes'
    },
    {
      id: 'ethereum',
      name: 'Ethereum',
      icon: Bitcoin,
      description: 'ETH payments',
      fee: 0.002,
      instant: false,
      confirmation: '2-15 minutes'
    },
    {
      id: 'klarna',
      name: 'Klarna',
      icon: Clock,
      description: 'Buy now, pay later',
      fee: 0,
      instant: true,
      bnpl: true
    },
    {
      id: 'afterpay',
      name: 'Afterpay',
      icon: Clock,
      description: '4 interest-free payments',
      fee: 0,
      instant: true,
      bnpl: true
    }
  ].filter(method => method.available !== false);

  // Installment options
  const installmentOptions = [
    { months: 3, fee: 0, apr: 0 },
    { months: 6, fee: 2.99, apr: 5.99 },
    { months: 12, fee: 4.99, apr: 9.99 },
    { months: 24, fee: 7.99, apr: 15.99 }
  ];

  // Mock crypto rates (in a real app, fetch from API)
  useEffect(() => {
    setCryptoRates({
      BTC: 43250.00,
      ETH: 2890.50,
      USDC: 1.00
    });
  }, []);

  // Calculate installment amounts
  const calculateInstallment = (months, fee) => {
    const monthlyAmount = (total + fee) / months;
    return monthlyAmount;
  };

  // Handle payment processing
  const processPayment = async () => {
    setIsProcessing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const paymentResult = {
        success: true,
        transactionId: `txn_${Math.random().toString(36).substr(2, 9)}`,
        method: selectedMethod,
        amount: total,
        currency,
        timestamp: new Date().toISOString()
      };

      onPaymentComplete?.(paymentResult);
    } catch (error) {
      onPaymentError?.(error);
    } finally {
      setIsProcessing(false);
    }
  };

  const getCurrentMethod = () => paymentMethods.find(m => m.id === selectedMethod);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Payment Options
        </h2>
        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900 dark:text-white">
            ${total.toFixed(2)}
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400">{currency}</div>
        </div>
      </div>

      {/* Security Badge */}
      <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4 mb-6">
        <div className="flex items-center space-x-2">
          <Shield className="w-5 h-5 text-green-600" />
          <span className="text-sm font-medium text-green-800 dark:text-green-200">
            256-bit SSL Encryption • PCI DSS Compliant • Secure Payment Processing
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Payment Methods */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Choose Payment Method
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {paymentMethods.map((method) => (
              <button
                key={method.id}
                onClick={() => setSelectedMethod(method.id)}
                className={`p-4 border-2 rounded-lg text-left transition-all hover:border-blue-300 ${
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <method.icon className={`w-6 h-6 ${
                    selectedMethod === method.id ? 'text-blue-600' : 'text-gray-400'
                  }`} />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-white">
                      {method.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      {method.description}
                    </div>
                    {method.fee > 0 && (
                      <div className="text-xs text-orange-600 dark:text-orange-400">
                        Fee: {method.fee}%
                      </div>
                    )}
                    {method.confirmation && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        Confirmation: {method.confirmation}
                      </div>
                    )}
                  </div>
                  {selectedMethod === method.id && (
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          {/* Payment Form based on selected method */}
          <div className="mt-6">
            {selectedMethod === 'card' && <CardPaymentForm />}
            {selectedMethod === 'paypal' && <PayPalForm />}
            {(selectedMethod === 'apple-pay' || selectedMethod === 'google-pay') && <WalletPaymentForm method={selectedMethod} />}
            {(selectedMethod === 'bitcoin' || selectedMethod === 'ethereum') && <CryptoPaymentForm method={selectedMethod} rates={cryptoRates} total={total} />}
            {(selectedMethod === 'klarna' || selectedMethod === 'afterpay') && <BNPLForm method={selectedMethod} total={total} />}
          </div>

          {/* Installment Options for Card Payments */}
          {selectedMethod === 'card' && (
            <div className="mt-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
              <h4 className="font-medium text-gray-900 dark:text-white mb-3">
                Payment Plans Available
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {installmentOptions.map((option) => (
                  <button
                    key={option.months}
                    onClick={() => setSelectedInstallment(option)}
                    className={`p-3 border rounded-lg text-left transition-all ${
                      selectedInstallment?.months === option.months
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <div className="font-medium text-gray-900 dark:text-white">
                      {option.months} months
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      ${calculateInstallment(option.months, option.fee).toFixed(2)}/month
                    </div>
                    {option.apr > 0 && (
                      <div className="text-xs text-gray-500 dark:text-gray-400">
                        APR: {option.apr}%
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h3>
            
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                <span className="text-gray-900 dark:text-white">${(total * 0.9).toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Tax</span>
                <span className="text-gray-900 dark:text-white">${(total * 0.1).toFixed(2)}</span>
              </div>
              
              {getCurrentMethod()?.fee > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Payment Fee</span>
                  <span className="text-gray-900 dark:text-white">
                    ${(total * getCurrentMethod().fee).toFixed(2)}
                  </span>
                </div>
              )}
              
              <div className="border-t border-gray-200 dark:border-gray-600 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-900 dark:text-white">Total</span>
                  <span className="text-gray-900 dark:text-white">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Selected Installment Summary */}
            {selectedInstallment && (
              <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm font-medium text-blue-800 dark:text-blue-200">
                  {selectedInstallment.months} Monthly Payments
                </div>
                <div className="text-lg font-bold text-blue-900 dark:text-blue-100">
                  ${calculateInstallment(selectedInstallment.months, selectedInstallment.fee).toFixed(2)}/month
                </div>
              </div>
            )}
          </div>

          {/* Payment Button */}
          <button
            onClick={processPayment}
            disabled={isProcessing}
            className={`w-full py-4 px-6 rounded-lg font-semibold text-white transition-all ${
              isProcessing
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-700 active:scale-95'
            }`}
          >
            {isProcessing ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Processing...</span>
              </div>
            ) : (
              <div className="flex items-center justify-center space-x-2">
                <Lock className="w-5 h-5" />
                <span>Complete Payment</span>
              </div>
            )}
          </button>

          {/* Security Features */}
          <div className="text-xs text-gray-500 dark:text-gray-400 space-y-1">
            <div className="flex items-center space-x-1">
              <Shield className="w-3 h-3" />
              <span>Encrypted & Secure</span>
            </div>
            <div className="flex items-center space-x-1">
              <Globe className="w-3 h-3" />
              <span>Multi-currency Support</span>
            </div>
            <div className="flex items-center space-x-1">
              <Zap className="w-3 h-3" />
              <span>Instant Processing</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Individual payment form components
const CardPaymentForm = () => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        Card Number
      </label>
      <input
        type="text"
        placeholder="1234 5678 9012 3456"
        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
      />
    </div>
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Expiry Date
        </label>
        <input
          type="text"
          placeholder="MM/YY"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          CVV
        </label>
        <input
          type="text"
          placeholder="123"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  </div>
);

const PayPalForm = () => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
      <Wallet className="w-8 h-8 text-blue-600" />
    </div>
    <p className="text-gray-600 dark:text-gray-400">
      You'll be redirected to PayPal to complete your payment securely
    </p>
  </div>
);

const WalletPaymentForm = ({ method }) => (
  <div className="text-center py-8">
    <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
      <Smartphone className="w-8 h-8 text-gray-600" />
    </div>
    <p className="text-gray-600 dark:text-gray-400">
      Use your {method === 'apple-pay' ? 'Touch ID, Face ID, or device passcode' : 'fingerprint or PIN'} to pay
    </p>
  </div>
);

const CryptoPaymentForm = ({ method, rates, total }) => {
  const cryptoAmount = method === 'bitcoin' ? total / rates.BTC : total / rates.ETH;
  const cryptoSymbol = method === 'bitcoin' ? 'BTC' : 'ETH';
  
  return (
    <div className="space-y-4">
      <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
        <div className="flex items-center space-x-2 mb-2">
          <Bitcoin className="w-5 h-5 text-orange-600" />
          <span className="font-medium text-orange-800 dark:text-orange-200">
            Cryptocurrency Payment
          </span>
        </div>
        <div className="text-sm text-orange-700 dark:text-orange-300">
          Amount: {cryptoAmount.toFixed(6)} {cryptoSymbol}
        </div>
        <div className="text-xs text-orange-600 dark:text-orange-400">
          Rate: 1 {cryptoSymbol} = ${rates[cryptoSymbol.replace('BTC', 'BTC').replace('ETH', 'ETH')].toLocaleString()}
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Your {cryptoSymbol} Wallet Address
        </label>
        <input
          type="text"
          placeholder="Enter your wallet address"
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />
      </div>
    </div>
  );
};

const BNPLForm = ({ method, total }) => (
  <div className="space-y-4">
    <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
      <div className="flex items-center space-x-2 mb-2">
        <Clock className="w-5 h-5 text-green-600" />
        <span className="font-medium text-green-800 dark:text-green-200">
          {method === 'klarna' ? 'Pay in 4 interest-free installments' : '4 payments, no interest'}
        </span>
      </div>
      <div className="text-sm text-green-700 dark:text-green-300">
        4 payments of ${(total / 4).toFixed(2)} every 2 weeks
      </div>
    </div>
    
    <p className="text-sm text-gray-600 dark:text-gray-400">
      You'll be redirected to {method === 'klarna' ? 'Klarna' : 'Afterpay'} to set up your payment plan
    </p>
  </div>
);

export default AdvancedPaymentSystem;