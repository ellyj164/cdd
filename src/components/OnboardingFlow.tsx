import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  ChevronRight,
  CheckCircle,
  Circle,
  User,
  Building,
  Shield,
  CreditCard,
  Bell,
  Palette,
  Globe,
  Smartphone,
  Award,
  ArrowRight,
  Star,
  Target,
  Zap,
  BookOpen,
  Settings,
  Save
} from 'lucide-react'

interface OnboardingFlowProps {
  userType: 'individual' | 'business' | 'hybrid'
  onComplete: (onboardingData: any) => void
  onSaveProgress: (step: number, data: any) => void
  initialProgress?: {
    currentStep: number
    completedSteps: string[]
    data: Record<string, any>
  }
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({
  userType,
  onComplete,
  onSaveProgress,
  initialProgress
}) => {
  const [currentStep, setCurrentStep] = useState(initialProgress?.currentStep || 1)
  const [completedSteps, setCompletedSteps] = useState<string[]>(initialProgress?.completedSteps || [])
  const [formData, setFormData] = useState(initialProgress?.data || {})

  // Define steps based on user type
  const getSteps = () => {
    const baseSteps = [
      {
        id: 'welcome',
        title: 'Welcome',
        description: 'Get started with your account',
        icon: Award,
        required: true
      },
      {
        id: 'profile',
        title: 'Profile Setup',
        description: 'Complete your profile information',
        icon: User,
        required: true
      },
      {
        id: 'preferences',
        title: 'Preferences',
        description: 'Customize your experience',
        icon: Settings,
        required: false
      },
      {
        id: 'notifications',
        title: 'Notifications',
        description: 'Choose how you want to be notified',
        icon: Bell,
        required: false
      }
    ]

    if (userType === 'business' || userType === 'hybrid') {
      baseSteps.splice(2, 0, {
        id: 'business',
        title: 'Business Setup',
        description: 'Configure your business profile',
        icon: Building,
        required: true
      })
    }

    if (userType === 'business') {
      baseSteps.push({
        id: 'seller',
        title: 'Seller Tools',
        description: 'Set up your selling preferences',
        icon: Target,
        required: false
      })
    }

    baseSteps.push({
      id: 'security',
      title: 'Security',
      description: 'Secure your account',
      icon: Shield,
      required: true
    })

    baseSteps.push({
      id: 'complete',
      title: 'Complete',
      description: 'You\'re all set!',
      icon: CheckCircle,
      required: true
    })

    return baseSteps
  }

  const steps = getSteps()
  const totalSteps = steps.length

  // Auto-save progress
  useEffect(() => {
    const saveData = {
      ...formData,
      currentStep,
      lastActivity: new Date().toISOString()
    }
    onSaveProgress(currentStep, saveData)
  }, [currentStep, formData, onSaveProgress])

  const handleNext = () => {
    const currentStepId = steps[currentStep - 1].id
    if (!completedSteps.includes(currentStepId)) {
      setCompletedSteps(prev => [...prev, currentStepId])
    }
    setCurrentStep(prev => Math.min(prev + 1, totalSteps))
  }

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSkip = () => {
    const currentStepData = steps[currentStep - 1]
    if (!currentStepData.required) {
      handleNext()
    }
  }

  const updateFormData = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const renderStepContent = () => {
    const stepId = steps[currentStep - 1]?.id

    switch (stepId) {
      case 'welcome':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              <Award className="w-10 h-10 text-blue-600" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Marketify!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                {userType === 'business' 
                  ? 'Let\'s set up your business account to start selling on our global marketplace.'
                  : userType === 'hybrid'
                  ? 'Let\'s configure your hybrid account for both buying and selling.'
                  : 'Let\'s personalize your shopping experience with a few quick questions.'
                }
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <Zap className="w-8 h-8 text-blue-600 mb-3" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Quick Setup
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  Complete setup in just a few minutes
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <Shield className="w-8 h-8 text-green-600 mb-3" />
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  Secure & Safe
                </h3>
                <p className="text-sm text-green-800 dark:text-green-400">
                  Enterprise-grade security for your data
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <Star className="w-8 h-8 text-purple-600 mb-3" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  Premium Features
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  Access to advanced marketplace tools
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 max-w-md mx-auto">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                <strong>Estimated time:</strong> {userType === 'business' ? '8-10 minutes' : '5-7 minutes'}
              </p>
            </div>
          </motion.div>
        )

      case 'profile':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Complete Your Profile
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Help us personalize your experience
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Profile Picture
                </label>
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-gray-200 dark:bg-gray-600 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-gray-400" />
                  </div>
                  <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                    Upload Photo
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Display Name
                </label>
                <input
                  type="text"
                  value={formData.displayName || ''}
                  onChange={(e) => updateFormData('displayName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="How should we call you?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Date of Birth
                </label>
                <input
                  type="date"
                  value={formData.dateOfBirth || ''}
                  onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={formData.gender || ''}
                  onChange={(e) => updateFormData('gender', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                  <option value="prefer_not_to_say">Prefer not to say</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={formData.bio || ''}
                  onChange={(e) => updateFormData('bio', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Tell us a bit about yourself..."
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Interests (Select all that apply)
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {[
                  'Technology', 'Fashion', 'Home & Garden', 'Sports',
                  'Books', 'Automotive', 'Health', 'Beauty',
                  'Food', 'Travel', 'Music', 'Gaming'
                ].map((interest) => (
                  <label key={interest} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={formData.interests?.includes(interest) || false}
                      onChange={(e) => {
                        const interests = formData.interests || []
                        if (e.target.checked) {
                          updateFormData('interests', [...interests, interest])
                        } else {
                          updateFormData('interests', interests.filter((i: string) => i !== interest))
                        }
                      }}
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">{interest}</span>
                  </label>
                ))}
              </div>
            </div>
          </motion.div>
        )

      case 'business':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Business Information
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Set up your business profile for selling
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Name *
                </label>
                <input
                  type="text"
                  value={formData.businessName || ''}
                  onChange={(e) => updateFormData('businessName', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your business name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Type *
                </label>
                <select
                  value={formData.businessType || ''}
                  onChange={(e) => updateFormData('businessType', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select business type</option>
                  <option value="sole_proprietorship">Sole Proprietorship</option>
                  <option value="partnership">Partnership</option>
                  <option value="corporation">Corporation</option>
                  <option value="llc">LLC</option>
                  <option value="non_profit">Non-Profit</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Industry *
                </label>
                <select
                  value={formData.industry || ''}
                  onChange={(e) => updateFormData('industry', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select industry</option>
                  <option value="technology">Technology</option>
                  <option value="retail">Retail</option>
                  <option value="manufacturing">Manufacturing</option>
                  <option value="services">Services</option>
                  <option value="healthcare">Healthcare</option>
                  <option value="education">Education</option>
                  <option value="finance">Finance</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Employee Count
                </label>
                <select
                  value={formData.employeeCount || ''}
                  onChange={(e) => updateFormData('employeeCount', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="">Select employee count</option>
                  <option value="1">Just me</option>
                  <option value="2-10">2-10 employees</option>
                  <option value="11-50">11-50 employees</option>
                  <option value="51-200">51-200 employees</option>
                  <option value="201+">201+ employees</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Business Description
                </label>
                <textarea
                  value={formData.businessDescription || ''}
                  onChange={(e) => updateFormData('businessDescription', e.target.value)}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Describe your business and what you sell..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={formData.website || ''}
                  onChange={(e) => updateFormData('website', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="https://your-website.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Tax ID / VAT Number
                </label>
                <input
                  type="text"
                  value={formData.taxId || ''}
                  onChange={(e) => updateFormData('taxId', e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Your tax identification number"
                />
              </div>
            </div>
          </motion.div>
        )

      case 'preferences':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Customize Your Experience
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Set your preferences for a personalized experience
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Globe className="w-5 h-5 mr-2" />
                  Language & Region
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Language
                    </label>
                    <select
                      value={formData.language || 'en'}
                      onChange={(e) => updateFormData('language', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="en">English</option>
                      <option value="es">Español</option>
                      <option value="fr">Français</option>
                      <option value="de">Deutsch</option>
                      <option value="zh">中文</option>
                      <option value="ja">日本語</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Currency
                    </label>
                    <select
                      value={formData.currency || 'USD'}
                      onChange={(e) => updateFormData('currency', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="USD">USD - US Dollar</option>
                      <option value="EUR">EUR - Euro</option>
                      <option value="GBP">GBP - British Pound</option>
                      <option value="JPY">JPY - Japanese Yen</option>
                      <option value="CAD">CAD - Canadian Dollar</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Palette className="w-5 h-5 mr-2" />
                  Appearance
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { value: 'light', label: 'Light', desc: 'Classic light theme' },
                    { value: 'dark', label: 'Dark', desc: 'Easy on the eyes' },
                    { value: 'auto', label: 'Auto', desc: 'Matches system' }
                  ].map((theme) => (
                    <div
                      key={theme.value}
                      className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                        formData.theme === theme.value
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }`}
                      onClick={() => updateFormData('theme', theme.value)}
                    >
                      <div className="text-center">
                        <div className="font-medium text-gray-900 dark:text-white">{theme.label}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{theme.desc}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Shopping Preferences
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'showPrices', label: 'Show prices in my currency', desc: 'Convert all prices to your preferred currency' },
                    { id: 'showDeals', label: 'Highlight deals and discounts', desc: 'Show special offers prominently' },
                    { id: 'recommendations', label: 'Personalized recommendations', desc: 'Show products based on your interests' },
                    { id: 'autoSave', label: 'Auto-save wishlist', desc: 'Automatically save items you view for later' }
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={pref.id}
                        checked={formData[pref.id] || false}
                        onChange={(e) => updateFormData(pref.id, e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <label htmlFor={pref.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          {pref.label}
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pref.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'notifications':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Notification Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Choose how and when you want to be notified
              </p>
            </div>

            <div className="space-y-6">
              {[
                {
                  category: 'Order Updates',
                  icon: CreditCard,
                  notifications: [
                    { id: 'orderConfirmation', label: 'Order confirmations', default: true },
                    { id: 'shippingUpdates', label: 'Shipping updates', default: true },
                    { id: 'deliveryNotifications', label: 'Delivery notifications', default: true }
                  ]
                },
                {
                  category: 'Deals & Promotions',
                  icon: Star,
                  notifications: [
                    { id: 'dealAlerts', label: 'Deal alerts', default: false },
                    { id: 'priceDrops', label: 'Price drop notifications', default: false },
                    { id: 'newArrivals', label: 'New arrivals in your interests', default: false }
                  ]
                },
                {
                  category: 'Account & Security',
                  icon: Shield,
                  notifications: [
                    { id: 'securityAlerts', label: 'Security alerts', default: true },
                    { id: 'loginNotifications', label: 'New device login notifications', default: true },
                    { id: 'accountUpdates', label: 'Account updates', default: true }
                  ]
                }
              ].map((section) => (
                <div key={section.category} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                    <section.icon className="w-5 h-5 mr-2" />
                    {section.category}
                  </h3>
                  
                  <div className="space-y-4">
                    {section.notifications.map((notif) => (
                      <div key={notif.id} className="flex items-center justify-between">
                        <span className="text-gray-700 dark:text-gray-300">{notif.label}</span>
                        <div className="flex space-x-4">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData[`${notif.id}_email`] !== false}
                              onChange={(e) => updateFormData(`${notif.id}_email`, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Email</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData[`${notif.id}_push`] || false}
                              onChange={(e) => updateFormData(`${notif.id}_push`, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">Push</span>
                          </label>
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={formData[`${notif.id}_sms`] || false}
                              onChange={(e) => updateFormData(`${notif.id}_sms`, e.target.checked)}
                              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="text-sm text-gray-600 dark:text-gray-400">SMS</span>
                          </label>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )

      case 'seller':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Seller Tools Setup
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Configure your selling preferences and policies
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Shipping Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Default Processing Time
                    </label>
                    <select
                      value={formData.processingTime || ''}
                      onChange={(e) => updateFormData('processingTime', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select processing time</option>
                      <option value="1">1 business day</option>
                      <option value="2-3">2-3 business days</option>
                      <option value="4-7">4-7 business days</option>
                      <option value="custom">Custom</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Shipping Policy
                    </label>
                    <select
                      value={formData.shippingPolicy || ''}
                      onChange={(e) => updateFormData('shippingPolicy', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    >
                      <option value="">Select policy</option>
                      <option value="free">Free shipping</option>
                      <option value="flat">Flat rate</option>
                      <option value="calculated">Calculated shipping</option>
                    </select>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Return Policy
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'returns30', label: '30-day returns', desc: 'Accept returns within 30 days' },
                    { id: 'freeReturns', label: 'Free return shipping', desc: 'Pay for return shipping costs' },
                    { id: 'exchanges', label: 'Allow exchanges', desc: 'Accept exchanges for different sizes/colors' }
                  ].map((policy) => (
                    <div key={policy.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={policy.id}
                        checked={formData[policy.id] || false}
                        onChange={(e) => updateFormData(policy.id, e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <label htmlFor={policy.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          {policy.label}
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{policy.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Communication Preferences
                </h3>
                <div className="space-y-3">
                  {[
                    { id: 'autoRespond', label: 'Auto-respond to messages', desc: 'Send automatic responses to customer inquiries' },
                    { id: 'reviewReminders', label: 'Send review reminders', desc: 'Ask customers to leave reviews after purchase' },
                    { id: 'promotionalEmails', label: 'Send promotional emails', desc: 'Email customers about sales and new products' }
                  ].map((pref) => (
                    <div key={pref.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={pref.id}
                        checked={formData[pref.id] || false}
                        onChange={(e) => updateFormData(pref.id, e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <label htmlFor={pref.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          {pref.label}
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{pref.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'security':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Secure Your Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enable additional security features to protect your account
              </p>
            </div>

            <div className="space-y-6">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4 flex items-center">
                  <Shield className="w-5 h-5 mr-2" />
                  Two-Factor Authentication
                </h3>
                
                <div className="space-y-4">
                  {[
                    { id: '2fa_sms', label: 'SMS Authentication', desc: 'Receive codes via text message', icon: Smartphone },
                    { id: '2fa_email', label: 'Email Authentication', desc: 'Receive codes via email', icon: Bell },
                    { id: '2fa_app', label: 'Authenticator App', desc: 'Use Google Authenticator or similar app', icon: Smartphone }
                  ].map((method) => {
                    const Icon = method.icon
                    return (
                      <div key={method.id} className="flex items-start space-x-3">
                        <input
                          type="checkbox"
                          id={method.id}
                          checked={formData[method.id] || false}
                          onChange={(e) => updateFormData(method.id, e.target.checked)}
                          className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        <Icon className="w-5 h-5 text-gray-400 mt-1" />
                        <div>
                          <label htmlFor={method.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                            {method.label}
                          </label>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{method.desc}</p>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                  Privacy Settings
                </h3>
                
                <div className="space-y-3">
                  {[
                    { id: 'profilePublic', label: 'Public profile', desc: 'Allow others to see your profile information' },
                    { id: 'showActivity', label: 'Show activity status', desc: 'Let others see when you\'re online' },
                    { id: 'allowMessages', label: 'Allow messages from other users', desc: 'Enable direct messaging' }
                  ].map((setting) => (
                    <div key={setting.id} className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        id={setting.id}
                        checked={formData[setting.id] !== false}
                        onChange={(e) => updateFormData(setting.id, e.target.checked)}
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <div>
                        <label htmlFor={setting.id} className="font-medium text-gray-900 dark:text-white cursor-pointer">
                          {setting.label}
                        </label>
                        <p className="text-sm text-gray-600 dark:text-gray-400">{setting.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 'complete':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-6"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                Welcome to Marketify!
              </h2>
              <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
                Your account is now set up and ready to go. You have access to all the features of our
                {userType === 'business' ? ' business' : userType === 'hybrid' ? ' hybrid' : ''} marketplace.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6 border border-blue-200 dark:border-blue-800">
                <Target className="w-8 h-8 text-blue-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-blue-900 dark:text-blue-300 mb-2">
                  Start {userType === 'business' ? 'Selling' : 'Shopping'}
                </h3>
                <p className="text-sm text-blue-800 dark:text-blue-400">
                  {userType === 'business' 
                    ? 'List your first product and start reaching customers'
                    : 'Browse millions of products from verified sellers'
                  }
                </p>
              </div>
              
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <BookOpen className="w-8 h-8 text-green-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-green-900 dark:text-green-300 mb-2">
                  Learn More
                </h3>
                <p className="text-sm text-green-800 dark:text-green-400">
                  Check out our help center for tips and best practices
                </p>
              </div>
              
              <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-6 border border-purple-200 dark:border-purple-800">
                <Star className="w-8 h-8 text-purple-600 mb-3 mx-auto" />
                <h3 className="font-semibold text-purple-900 dark:text-purple-300 mb-2">
                  Get Support
                </h3>
                <p className="text-sm text-purple-800 dark:text-purple-400">
                  Our 24/7 support team is here to help you succeed
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                <strong>Your onboarding is complete!</strong>
              </p>
              <div className="text-xs text-gray-500 dark:text-gray-500 space-y-1">
                <p>✓ Account verified and secured</p>
                <p>✓ Preferences configured</p>
                <p>✓ {userType === 'business' ? 'Business profile setup' : 'Profile completed'}</p>
                <p>✓ Ready to start using Marketify</p>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const isStepComplete = (stepIndex: number) => {
    const stepId = steps[stepIndex].id
    return completedSteps.includes(stepId)
  }

  const canProceed = () => {
    const currentStepData = steps[currentStep - 1]
    if (!currentStepData) return false
    
    // Check if required fields are filled for specific steps
    switch (currentStepData.id) {
      case 'business':
        return formData.businessName && formData.businessType && formData.industry
      case 'profile':
        return formData.displayName
      default:
        return true
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg">
      {/* Progress sidebar */}
      <div className="flex">
        <div className="w-1/3 bg-gray-50 dark:bg-gray-900 rounded-l-xl p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
            Account Setup
          </h3>
          
          <div className="space-y-3">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = currentStep === index + 1
              const isComplete = isStepComplete(index)
              
              return (
                <div
                  key={step.id}
                  className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                    isActive
                      ? 'bg-blue-100 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800'
                      : isComplete
                      ? 'bg-green-50 dark:bg-green-900/20 hover:bg-green-100 dark:hover:bg-green-900/30'
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setCurrentStep(index + 1)}
                >
                  <div className={`flex-shrink-0 ${
                    isActive
                      ? 'text-blue-600'
                      : isComplete
                      ? 'text-green-600'
                      : 'text-gray-400'
                  }`}>
                    {isComplete ? (
                      <CheckCircle className="w-5 h-5" />
                    ) : (
                      <Icon className="w-5 h-5" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium ${
                      isActive
                        ? 'text-blue-900 dark:text-blue-300'
                        : isComplete
                        ? 'text-green-900 dark:text-green-300'
                        : 'text-gray-700 dark:text-gray-300'
                    }`}>
                      {step.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400 truncate">
                      {step.description}
                    </p>
                  </div>
                  
                  {step.required && !isComplete && (
                    <div className="flex-shrink-0">
                      <Circle className="w-2 h-2 text-red-500 fill-current" />
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Auto-save indicator */}
          <div className="mt-6 p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
            <div className="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400">
              <Save className="w-4 h-4" />
              <span>Progress auto-saved</span>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          <AnimatePresence mode="wait">
            {renderStepContent()}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            {currentStep > 1 ? (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handlePrevious}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
              >
                Previous
              </motion.button>
            ) : (
              <div />
            )}

            <div className="flex space-x-3">
              {!steps[currentStep - 1]?.required && currentStep < totalSteps && (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSkip}
                  className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  Skip
                </motion.button>
              )}

              {currentStep < totalSteps ? (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleNext}
                  disabled={!canProceed()}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  <span>Next</span>
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => onComplete(formData)}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center space-x-2"
                >
                  <span>Complete Setup</span>
                  <CheckCircle className="w-4 h-4" />
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default OnboardingFlow