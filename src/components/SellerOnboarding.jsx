'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  Building,
  FileText,
  CreditCard,
  CheckCircle,
  ChevronRight,
  ChevronLeft,
  Upload,
  MapPin,
  Phone,
  Mail,
  Globe,
  Shield,
  AlertCircle,
  Camera,
  BookOpen,
  Target,
  DollarSign
} from 'lucide-react';

const SellerOnboarding = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [businessInfo, setBusinessInfo] = useState({
    businessName: '',
    businessDescription: '',
    businessType: 'individual',
    registrationNumber: '',
    taxId: '',
    foundedYear: '',
    employeeCount: '1-10',
    website: ''
  });
  const [contactInfo, setContactInfo] = useState({
    email: '',
    phone: '',
    address: {
      street: '',
      city: '',
      state: '',
      country: '',
      zipCode: ''
    },
    socialMedia: {
      facebook: '',
      instagram: '',
      twitter: '',
      linkedin: ''
    }
  });
  const [bankingInfo, setBankingInfo] = useState({
    accountName: '',
    accountNumber: '',
    routingNumber: '',
    bankName: '',
    swiftCode: '',
    taxDocuments: [],
    businessLicense: [],
    bankStatements: []
  });
  const [productInfo, setProductInfo] = useState({
    categories: [],
    productTypes: [],
    shippingMethods: [],
    returnPolicy: {
      acceptsReturns: true,
      returnWindow: 30,
      conditions: []
    },
    inventory: {
      hasInventorySystem: false,
      trackingMethod: 'manual'
    }
  });

  const onboardingSteps = [
    {
      id: 'business-info',
      title: 'Business Information',
      description: 'Tell us about your business',
      icon: <Building className="h-6 w-6" />,
      required: true
    },
    {
      id: 'contact-info',
      title: 'Contact Details',
      description: 'How customers can reach you',
      icon: <Phone className="h-6 w-6" />,
      required: true
    },
    {
      id: 'product-info',
      title: 'Product Categories',
      description: 'What will you be selling?',
      icon: <Target className="h-6 w-6" />,
      required: true
    },
    {
      id: 'banking-info',
      title: 'Payment Setup',
      description: 'Banking and tax information',
      icon: <CreditCard className="h-6 w-6" />,
      required: true
    },
    {
      id: 'documents',
      title: 'Documentation',
      description: 'Upload required documents',
      icon: <FileText className="h-6 w-6" />,
      required: true
    },
    {
      id: 'review',
      title: 'Review & Submit',
      description: 'Review your information',
      icon: <CheckCircle className="h-6 w-6" />,
      required: true
    }
  ];

  const availableCategories = [
    'Electronics', 'Fashion', 'Home & Garden', 'Sports', 'Books', 
    'Health & Beauty', 'Toys & Games', 'Automotive', 'Food & Beverages',
    'Art & Crafts', 'Industrial', 'Office Supplies'
  ];

  const shippingOptions = [
    'Standard Shipping', 'Express Shipping', 'Next Day Delivery',
    'International Shipping', 'Local Pickup', 'Free Shipping'
  ];

  const employeeCountOptions = [
    '1-10', '11-50', '51-200', '201-500', '500+'
  ];

  const businessTypeOptions = [
    { value: 'individual', label: 'Individual/Sole Proprietorship' },
    { value: 'llc', label: 'Limited Liability Company (LLC)' },
    { value: 'corporation', label: 'Corporation' },
    { value: 'partnership', label: 'Partnership' }
  ];

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleFileUpload = (files, type) => {
    if (files) {
      setBankingInfo(prev => ({
        ...prev,
        [type]: Array.from(files)
      }));
    }
  };

  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0: // Business Info
        return businessInfo.businessName && businessInfo.businessDescription;
      case 1: // Contact Info
        return contactInfo.email && contactInfo.phone && contactInfo.address.street;
      case 2: // Product Info
        return productInfo.categories.length > 0;
      case 3: // Banking Info
        return bankingInfo.accountName && bankingInfo.accountNumber && bankingInfo.bankName;
      case 4: // Documents
        return bankingInfo.businessLicense.length > 0;
      default:
        return true;
    }
  };

  const renderBusinessInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Building className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Business Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Tell us about your business to get started</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Name *
          </label>
          <input
            type="text"
            value={businessInfo.businessName}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Enter your business name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Type
          </label>
          <select
            value={businessInfo.businessType}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessType: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {businessTypeOptions.map(option => (
              <option key={option.value} value={option.value}>{option.label}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Description *
          </label>
          <textarea
            value={businessInfo.businessDescription}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, businessDescription: e.target.value }))}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Describe what your business does..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Business Registration Number
          </label>
          <input
            type="text"
            value={businessInfo.registrationNumber}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, registrationNumber: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Optional"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Tax ID (EIN)
          </label>
          <input
            type="text"
            value={businessInfo.taxId}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, taxId: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="XX-XXXXXXX"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Year Founded
          </label>
          <input
            type="number"
            value={businessInfo.foundedYear}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, foundedYear: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="2024"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Number of Employees
          </label>
          <select
            value={businessInfo.employeeCount}
            onChange={(e) => setBusinessInfo(prev => ({ ...prev, employeeCount: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            {employeeCountOptions.map(option => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Website URL
          </label>
          <div className="relative">
            <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="url"
              value={businessInfo.website}
              onChange={(e) => setBusinessInfo(prev => ({ ...prev, website: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://www.yourbusiness.com"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderContactInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Phone className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Contact Information</h2>
        <p className="text-gray-600 dark:text-gray-400">How customers and partners can reach you</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Email Address *
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="email"
              value={contactInfo.email}
              onChange={(e) => setContactInfo(prev => ({ ...prev, email: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="business@example.com"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Phone Number *
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo(prev => ({ ...prev, phone: e.target.value }))}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div className="md:col-span-2">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">Business Address</h3>
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Street Address *
          </label>
          <input
            type="text"
            value={contactInfo.address.street}
            onChange={(e) => setContactInfo(prev => ({ 
              ...prev, 
              address: { ...prev.address, street: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="123 Business Street"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            City *
          </label>
          <input
            type="text"
            value={contactInfo.address.city}
            onChange={(e) => setContactInfo(prev => ({ 
              ...prev, 
              address: { ...prev.address, city: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="New York"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            State/Province
          </label>
          <input
            type="text"
            value={contactInfo.address.state}
            onChange={(e) => setContactInfo(prev => ({ 
              ...prev, 
              address: { ...prev.address, state: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="NY"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            ZIP/Postal Code
          </label>
          <input
            type="text"
            value={contactInfo.address.zipCode}
            onChange={(e) => setContactInfo(prev => ({ 
              ...prev, 
              address: { ...prev.address, zipCode: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="10001"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Country
          </label>
          <input
            type="text"
            value={contactInfo.address.country}
            onChange={(e) => setContactInfo(prev => ({ 
              ...prev, 
              address: { ...prev.address, country: e.target.value }
            }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="United States"
          />
        </div>
      </div>
    </div>
  );

  const renderProductInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <Target className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Product Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Tell us what you'll be selling</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Product Categories *
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {availableCategories.map(category => (
            <label key={category} className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.categories.includes(category)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProductInfo(prev => ({
                      ...prev,
                      categories: [...prev.categories, category]
                    }));
                  } else {
                    setProductInfo(prev => ({
                      ...prev,
                      categories: prev.categories.filter(c => c !== category)
                    }));
                  }
                }}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
          Shipping Methods
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {shippingOptions.map(option => (
            <label key={option} className="flex items-center space-x-2 p-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer">
              <input
                type="checkbox"
                checked={productInfo.shippingMethods.includes(option)}
                onChange={(e) => {
                  if (e.target.checked) {
                    setProductInfo(prev => ({
                      ...prev,
                      shippingMethods: [...prev.shippingMethods, option]
                    }));
                  } else {
                    setProductInfo(prev => ({
                      ...prev,
                      shippingMethods: prev.shippingMethods.filter(s => s !== option)
                    }));
                  }
                }}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">{option}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Return Policy
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={productInfo.returnPolicy.acceptsReturns}
                onChange={(e) => setProductInfo(prev => ({
                  ...prev,
                  returnPolicy: { ...prev.returnPolicy, acceptsReturns: e.target.checked }
                }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Accept Returns</span>
            </label>
            
            {productInfo.returnPolicy.acceptsReturns && (
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Return Window (days)
                </label>
                <input
                  type="number"
                  value={productInfo.returnPolicy.returnWindow}
                  onChange={(e) => setProductInfo(prev => ({
                    ...prev,
                    returnPolicy: { ...prev.returnPolicy, returnWindow: parseInt(e.target.value) }
                  }))}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                  min="1"
                  max="365"
                />
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Inventory Management
          </label>
          <div className="space-y-3">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={productInfo.inventory.hasInventorySystem}
                onChange={(e) => setProductInfo(prev => ({
                  ...prev,
                  inventory: { ...prev.inventory, hasInventorySystem: e.target.checked }
                }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Use Inventory Tracking</span>
            </label>
            
            <select
              value={productInfo.inventory.trackingMethod}
              onChange={(e) => setProductInfo(prev => ({
                ...prev,
                inventory: { ...prev.inventory, trackingMethod: e.target.value }
              }))}
              className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="manual">Manual Tracking</option>
              <option value="automated">Automated System</option>
              <option value="third-party">Third-party Integration</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );

  const renderBankingInfoStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CreditCard className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Payment Setup</h2>
        <p className="text-gray-600 dark:text-gray-400">Configure how you'll receive payments</p>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 mb-6">
        <div className="flex items-start space-x-3">
          <Shield className="h-5 w-5 text-yellow-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Secure Information</h4>
            <p className="text-sm text-yellow-700 dark:text-yellow-300">Your banking information is encrypted and securely stored. We never store sensitive payment details.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Account Holder Name *
          </label>
          <input
            type="text"
            value={bankingInfo.accountName}
            onChange={(e) => setBankingInfo(prev => ({ ...prev, accountName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Business Name or Owner Name"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Bank Name *
          </label>
          <input
            type="text"
            value={bankingInfo.bankName}
            onChange={(e) => setBankingInfo(prev => ({ ...prev, bankName: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Bank of America"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Account Number *
          </label>
          <input
            type="text"
            value={bankingInfo.accountNumber}
            onChange={(e) => setBankingInfo(prev => ({ ...prev, accountNumber: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Account number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Routing Number *
          </label>
          <input
            type="text"
            value={bankingInfo.routingNumber}
            onChange={(e) => setBankingInfo(prev => ({ ...prev, routingNumber: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="9-digit routing number"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            SWIFT Code (International)
          </label>
          <input
            type="text"
            value={bankingInfo.swiftCode}
            onChange={(e) => setBankingInfo(prev => ({ ...prev, swiftCode: e.target.value }))}
            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            placeholder="Optional for international transfers"
          />
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <DollarSign className="h-5 w-5 text-blue-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200">Payment Schedule</h4>
            <p className="text-sm text-blue-700 dark:text-blue-300">Payments are processed weekly on Fridays. Funds typically arrive within 2-3 business days.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDocumentsStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <FileText className="h-16 w-16 text-blue-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Required Documents</h2>
        <p className="text-gray-600 dark:text-gray-400">Upload necessary documentation for verification</p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Business License * <span className="text-red-500">(Required)</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <label htmlFor="business-license" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Click to upload business license
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">PNG, JPG, PDF up to 10MB</span>
                </label>
                <input
                  id="business-license"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'businessLicense')}
                  className="hidden"
                />
              </div>
            </div>
            {bankingInfo.businessLicense.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Files:</h4>
                <ul className="space-y-1">
                  {bankingInfo.businessLicense.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{file.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Tax Documents
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <label htmlFor="tax-documents" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Upload tax documents (EIN letter, Tax Returns)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">PDF, PNG, JPG up to 10MB each</span>
                </label>
                <input
                  id="tax-documents"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'taxDocuments')}
                  className="hidden"
                />
              </div>
            </div>
            {bankingInfo.taxDocuments.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Files:</h4>
                <ul className="space-y-1">
                  {bankingInfo.taxDocuments.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{file.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
            Bank Statements
          </label>
          <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 hover:border-blue-500 transition-colors">
            <div className="text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <div className="space-y-2">
                <label htmlFor="bank-statements" className="cursor-pointer">
                  <span className="mt-2 block text-sm font-medium text-gray-900 dark:text-white">
                    Upload recent bank statements (last 3 months)
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">PDF format preferred</span>
                </label>
                <input
                  id="bank-statements"
                  type="file"
                  multiple
                  accept=".pdf,.jpg,.jpeg,.png"
                  onChange={(e) => handleFileUpload(e.target.files, 'bankStatements')}
                  className="hidden"
                />
              </div>
            </div>
            {bankingInfo.bankStatements.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Uploaded Files:</h4>
                <ul className="space-y-1">
                  {bankingInfo.bankStatements.map((file, index) => (
                    <li key={index} className="text-sm text-gray-600 dark:text-gray-400 flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span>{file.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg p-4">
        <div className="flex items-start space-x-3">
          <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
          <div>
            <h4 className="text-sm font-medium text-amber-800 dark:text-amber-200">Document Verification</h4>
            <p className="text-sm text-amber-700 dark:text-amber-300">All documents will be reviewed within 2-3 business days. You'll receive an email notification once verification is complete.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderReviewStep = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Review Your Information</h2>
        <p className="text-gray-600 dark:text-gray-400">Please review all information before submitting</p>
      </div>

      <div className="space-y-6">
        {/* Business Info Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Building className="h-5 w-5 mr-2" />
            Business Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Business Name:</span>
              <p className="font-medium text-gray-900 dark:text-white">{businessInfo.businessName}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Business Type:</span>
              <p className="font-medium text-gray-900 dark:text-white capitalize">{businessInfo.businessType}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600 dark:text-gray-400">Description:</span>
              <p className="font-medium text-gray-900 dark:text-white">{businessInfo.businessDescription}</p>
            </div>
          </div>
        </div>

        {/* Contact Info Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Phone className="h-5 w-5 mr-2" />
            Contact Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Email:</span>
              <p className="font-medium text-gray-900 dark:text-white">{contactInfo.email}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Phone:</span>
              <p className="font-medium text-gray-900 dark:text-white">{contactInfo.phone}</p>
            </div>
            <div className="col-span-2">
              <span className="text-gray-600 dark:text-gray-400">Address:</span>
              <p className="font-medium text-gray-900 dark:text-white">
                {contactInfo.address.street}, {contactInfo.address.city}, {contactInfo.address.state} {contactInfo.address.zipCode}
              </p>
            </div>
          </div>
        </div>

        {/* Product Categories Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <Target className="h-5 w-5 mr-2" />
            Product Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {productInfo.categories.map(category => (
              <span key={category} className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm">
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Banking Info Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <CreditCard className="h-5 w-5 mr-2" />
            Payment Information
          </h3>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-600 dark:text-gray-400">Account Holder:</span>
              <p className="font-medium text-gray-900 dark:text-white">{bankingInfo.accountName}</p>
            </div>
            <div>
              <span className="text-gray-600 dark:text-gray-400">Bank:</span>
              <p className="font-medium text-gray-900 dark:text-white">{bankingInfo.bankName}</p>
            </div>
          </div>
        </div>

        {/* Documents Summary */}
        <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
            <FileText className="h-5 w-5 mr-2" />
            Documents Uploaded
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-900 dark:text-white">Business License: {bankingInfo.businessLicense.length} file(s)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-900 dark:text-white">Tax Documents: {bankingInfo.taxDocuments.length} file(s)</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-gray-900 dark:text-white">Bank Statements: {bankingInfo.bankStatements.length} file(s)</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h4 className="text-lg font-semibold text-blue-900 dark:text-blue-100 mb-2">What happens next?</h4>
        <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
          <li>• Your application will be reviewed within 2-3 business days</li>
          <li>• You'll receive email updates on your verification status</li>
          <li>• Once approved, you can start listing products immediately</li>
          <li>• Our seller support team will help you get started</li>
        </ul>
      </div>
    </div>
  );

  const renderStepContent = () => {
    switch (currentStep) {
      case 0: return renderBusinessInfoStep();
      case 1: return renderContactInfoStep();
      case 2: return renderProductInfoStep();
      case 3: return renderBankingInfoStep();
      case 4: return renderDocumentsStep();
      case 5: return renderReviewStep();
      default: return null;
    }
  };

  const handleSubmit = async () => {
    try {
      // Here you would submit to your API
      console.log('Submitting seller application:', {
        businessInfo,
        contactInfo,
        productInfo,
        bankingInfo
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or show success message
      alert('Application submitted successfully! You will receive a confirmation email shortly.');
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('There was an error submitting your application. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Become a Seller</h1>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              Step {currentStep + 1} of {onboardingSteps.length}
            </span>
          </div>
          
          <div className="flex items-center space-x-4 mb-6">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`
                  flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors
                  ${index <= currentStep 
                    ? 'bg-blue-600 border-blue-600 text-white' 
                    : 'border-gray-300 dark:border-gray-600 text-gray-400 dark:text-gray-500'
                  }
                `}>
                  {index < currentStep ? (
                    <CheckCircle className="h-6 w-6" />
                  ) : (
                    <span className="text-sm font-medium">{index + 1}</span>
                  )}
                </div>
                {index < onboardingSteps.length - 1 && (
                  <div className={`
                    w-16 h-0.5 ml-4 transition-colors
                    ${index < currentStep ? 'bg-blue-600' : 'bg-gray-300 dark:bg-gray-600'}
                  `} />
                )}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-6 gap-2 text-xs">
            {onboardingSteps.map((step, index) => (
              <div key={step.id} className="text-center">
                <p className={`font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-400 dark:text-gray-500'}`}>
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-8 mb-8"
        >
          {renderStepContent()}
        </motion.div>

        {/* Navigation */}
        <div className="flex items-center justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors
              ${currentStep === 0 
                ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed' 
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
              }
            `}
          >
            <ChevronLeft className="h-5 w-5" />
            <span>Previous</span>
          </button>

          {currentStep === onboardingSteps.length - 1 ? (
            <button
              onClick={handleSubmit}
              className="flex items-center space-x-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
              <span>Submit Application</span>
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={!isStepValid(currentStep)}
              className={`
                flex items-center space-x-2 px-6 py-3 rounded-lg transition-colors
                ${!isStepValid(currentStep)
                  ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                  : 'bg-blue-600 hover:bg-blue-700 text-white'
                }
              `}
            >
              <span>Next</span>
              <ChevronRight className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerOnboarding;