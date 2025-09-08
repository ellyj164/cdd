import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useEnhancedAuth } from '../contexts/EnhancedAuthContext'
import { 
  Mail, 
  Phone, 
  User, 
  Building, 
  Shield, 
  Eye, 
  EyeOff, 
  CheckCircle, 
  AlertCircle,
  Smartphone,
  MessageSquare,
  PhoneCall,
  ArrowRight,
  ArrowLeft,
  Facebook,
  Twitter,
  Github,
  Chrome,
  Fingerprint,
  QrCode
} from 'lucide-react'

interface EnhancedRegistrationProps {
  onSuccess?: (user: any) => void
  onCancel?: () => void
}

const EnhancedRegistration: React.FC<EnhancedRegistrationProps> = ({
  onSuccess,
  onCancel
}) => {
  const {
    registerMultiChannel,
    sendOTP,
    verifyOTP,
    loginWithSocial,
    loginWithBiometric,
    isLoading
  } = useEnhancedAuth()

  // Multi-step form state
  const [currentStep, setCurrentStep] = useState(1)
  const [totalSteps] = useState(5)
  
  // Form data
  const [formData, setFormData] = useState({
    accountType: 'individual' as 'individual' | 'business' | 'hybrid',
    registrationMethod: 'email' as 'email' | 'phone' | 'social',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    name: '',
    companyName: '',
    agreeToTerms: false,
    enableBiometric: false,
    enable2FA: false
  })

  // UI state
  const [showPassword, setShowPassword] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [verificationCode, setVerificationCode] = useState('')
  const [verificationMethod, setVerificationMethod] = useState<'email' | 'sms' | 'voice'>('email')
  const [otpSent, setOtpSent] = useState(false)
  const [timeLeft, setTimeLeft] = useState(0)

  // Countdown timer for OTP
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {}

    switch (step) {
      case 1: // Account type
        if (!formData.accountType) {
          newErrors.accountType = 'Please select an account type'
        }
        break

      case 2: // Registration method
        if (!formData.registrationMethod) {
          newErrors.registrationMethod = 'Please select a registration method'
        }
        break

      case 3: // Contact details
        if (formData.registrationMethod === 'email') {
          if (!formData.email) {
            newErrors.email = 'Email is required'
          } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Please enter a valid email'
          }
        }
        
        if (formData.registrationMethod === 'phone') {
          if (!formData.phone) {
            newErrors.phone = 'Phone number is required'
          } else if (!/^\+?[\d\s-()]{10,}$/.test(formData.phone)) {
            newErrors.phone = 'Please enter a valid phone number'
          }
        }

        if (!formData.password) {
          newErrors.password = 'Password is required'
        } else if (formData.password.length < 8) {
          newErrors.password = 'Password must be at least 8 characters'
        }

        if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match'
        }

        if (!formData.name) {
          newErrors.name = 'Name is required'
        }

        if (formData.accountType === 'business' && !formData.companyName) {
          newErrors.companyName = 'Company name is required for business accounts'
        }
        break

      case 4: // Terms and preferences
        if (!formData.agreeToTerms) {
          newErrors.agreeToTerms = 'You must agree to the terms and conditions'
        }
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps))
    }
  }

  const handlePrev = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1))
  }

  const handleSocialLogin = async (provider: string) => {
    try {
      const result = await loginWithSocial(provider)
      if (result.success) {
        onSuccess?.(result)
      } else {
        setErrors({ social: result.error || 'Social login failed' })
      }
    } catch (error) {
      setErrors({ social: 'Social login failed' })
    }
  }

  const handleBiometricLogin = async () => {
    try {
      if ('credentials' in navigator) {
        const credential = await navigator.credentials.create({
          publicKey: {
            challenge: new Uint8Array(32),
            rp: { name: 'Marketify' },
            user: {
              id: new Uint8Array(16),
              name: formData.email || formData.phone,
              displayName: formData.name
            },
            pubKeyCredParams: [{ alg: -7, type: 'public-key' }],
            timeout: 60000,
            attestation: 'direct'
          }
        })

        const result = await loginWithBiometric(credential)
        if (result.success) {
          onSuccess?.(result)
        } else {
          setErrors({ biometric: result.error || 'Biometric registration failed' })
        }
      }
    } catch (error) {
      setErrors({ biometric: 'Biometric registration failed' })
    }
  }

  const handleSendOTP = async () => {
    const identifier = formData.registrationMethod === 'email' ? formData.email : formData.phone
    
    try {
      const result = await sendOTP(verificationMethod, identifier)
      if (result.success) {
        setOtpSent(true)
        setTimeLeft(300) // 5 minutes
      } else {
        setErrors({ otp: result.error || 'Failed to send verification code' })
      }
    } catch (error) {
      setErrors({ otp: 'Failed to send verification code' })
    }
  }

  const handleVerifyOTP = async () => {
    const identifier = formData.registrationMethod === 'email' ? formData.email : formData.phone
    
    try {
      const result = await verifyOTP(verificationCode, identifier)
      if (result.success) {
        onSuccess?.(result)
      } else {
        setErrors({ verification: result.error || 'Invalid verification code' })
      }
    } catch (error) {
      setErrors({ verification: 'Verification failed' })
    }
  }

  const handleSubmit = async () => {
    if (!validateStep(4)) return

    try {
      const result = await registerMultiChannel({
        email: formData.registrationMethod === 'email' ? formData.email : undefined,
        phone: formData.registrationMethod === 'phone' ? formData.phone : undefined,
        password: formData.password,
        name: formData.name,
        accountType: formData.accountType
      })

      if (result.success) {
        if (result.requiresVerification) {
          setCurrentStep(5) // Move to verification step
        } else {
          onSuccess?.(result)
        }
      } else {
        setErrors({ submit: result.error || 'Registration failed' })
      }
    } catch (error) {
      setErrors({ submit: 'Registration failed' })
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Choose Your Account Type
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Select the type of account that best suits your needs
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'individual',
                  title: 'Individual Account',
                  description: 'For personal shopping and individual purchases',
                  icon: User
                },
                {
                  value: 'business',
                  title: 'Business Account',
                  description: 'For businesses, sellers, and vendors',
                  icon: Building
                },
                {
                  value: 'hybrid',
                  title: 'Hybrid Account',
                  description: 'Buy and sell with full marketplace access',
                  icon: Shield
                }
              ].map((option) => {
                const Icon = option.icon
                return (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      border-2 rounded-lg p-4 cursor-pointer transition-all
                      ${formData.accountType === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }
                    `}
                    onClick={() => setFormData(prev => ({ ...prev, accountType: option.value as any }))}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${
                        formData.accountType === option.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                      {formData.accountType === option.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {errors.accountType && (
              <div className="text-red-600 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.accountType}
              </div>
            )}
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                How would you like to register?
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Choose your preferred registration method
              </p>
            </div>

            <div className="space-y-4">
              {[
                {
                  value: 'email',
                  title: 'Email Address',
                  description: 'Register with your email address',
                  icon: Mail
                },
                {
                  value: 'phone',
                  title: 'Phone Number',
                  description: 'Register with your phone number',
                  icon: Phone
                },
                {
                  value: 'social',
                  title: 'Social Account',
                  description: 'Register with your social media account',
                  icon: User
                }
              ].map((option) => {
                const Icon = option.icon
                return (
                  <motion.div
                    key={option.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`
                      border-2 rounded-lg p-4 cursor-pointer transition-all
                      ${formData.registrationMethod === option.value
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-200 dark:border-gray-700 hover:border-gray-300'
                      }
                    `}
                    onClick={() => setFormData(prev => ({ ...prev, registrationMethod: option.value as any }))}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-6 h-6 ${
                        formData.registrationMethod === option.value ? 'text-blue-600' : 'text-gray-400'
                      }`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                      {formData.registrationMethod === option.value && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {formData.registrationMethod === 'social' && (
              <div className="space-y-4">
                <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                  Or continue with
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'Google', icon: Chrome, color: 'red' },
                    { name: 'Facebook', icon: Facebook, color: 'blue' },
                    { name: 'Twitter', icon: Twitter, color: 'sky' },
                    { name: 'GitHub', icon: Github, color: 'gray' }
                  ].map((provider) => {
                    const Icon = provider.icon
                    return (
                      <motion.button
                        key={provider.name}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className={`
                          p-3 border rounded-lg flex items-center justify-center space-x-2
                          border-gray-200 dark:border-gray-700 hover:border-${provider.color}-300
                          dark:hover:border-${provider.color}-600 transition-colors
                        `}
                        onClick={() => handleSocialLogin(provider.name.toLowerCase())}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-sm">{provider.name}</span>
                      </motion.button>
                    )
                  })}
                </div>

                {('credentials' in navigator) && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full p-3 border border-green-200 dark:border-green-700 rounded-lg
                             flex items-center justify-center space-x-2 hover:bg-green-50 dark:hover:bg-green-900/20"
                    onClick={handleBiometricLogin}
                  >
                    <Fingerprint className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-green-600">Continue with Biometric</span>
                  </motion.button>
                )}
              </div>
            )}

            {errors.registrationMethod && (
              <div className="text-red-600 text-sm flex items-center">
                <AlertCircle className="w-4 h-4 mr-1" />
                {errors.registrationMethod}
              </div>
            )}
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Enter Your Details
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Please provide your information to create your account
              </p>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Enter your full name"
                />
                {errors.name && (
                  <div className="text-red-600 text-sm mt-1">{errors.name}</div>
                )}
              </div>

              {/* Company name for business accounts */}
              {formData.accountType === 'business' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    value={formData.companyName}
                    onChange={(e) => setFormData(prev => ({ ...prev, companyName: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your company name"
                  />
                  {errors.companyName && (
                    <div className="text-red-600 text-sm mt-1">{errors.companyName}</div>
                  )}
                </div>
              )}

              {/* Email or Phone */}
              {formData.registrationMethod === 'email' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Enter your email address"
                  />
                  {errors.email && (
                    <div className="text-red-600 text-sm mt-1">{errors.email}</div>
                  )}
                </div>
              )}

              {formData.registrationMethod === 'phone' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="+1 (555) 123-4567"
                  />
                  {errors.phone && (
                    <div className="text-red-600 text-sm mt-1">{errors.phone}</div>
                  )}
                </div>
              )}

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Password *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 pr-10 border border-gray-300 dark:border-gray-600 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="Create a strong password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <div className="text-red-600 text-sm mt-1">{errors.password}</div>
                )}
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Confirm Password *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg
                           focus:ring-2 focus:ring-blue-500 focus:border-transparent
                           bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  placeholder="Confirm your password"
                />
                {errors.confirmPassword && (
                  <div className="text-red-600 text-sm mt-1">{errors.confirmPassword}</div>
                )}
              </div>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Security & Preferences
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                Configure your security settings and preferences
              </p>
            </div>

            <div className="space-y-4">
              {/* Terms agreement */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="agreeToTerms"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="agreeToTerms" className="text-sm text-gray-700 dark:text-gray-300">
                  I agree to the{' '}
                  <a href="/terms-of-service" className="text-blue-600 hover:text-blue-800">
                    Terms of Service
                  </a>
                  {' '}and{' '}
                  <a href="/privacy-policy" className="text-blue-600 hover:text-blue-800">
                    Privacy Policy
                  </a>
                </label>
              </div>
              {errors.agreeToTerms && (
                <div className="text-red-600 text-sm">{errors.agreeToTerms}</div>
              )}

              {/* Enable 2FA */}
              <div className="flex items-start space-x-3">
                <input
                  type="checkbox"
                  id="enable2FA"
                  checked={formData.enable2FA}
                  onChange={(e) => setFormData(prev => ({ ...prev, enable2FA: e.target.checked }))}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div>
                  <label htmlFor="enable2FA" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Enable Two-Factor Authentication (Recommended)
                  </label>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Add an extra layer of security to your account
                  </p>
                </div>
              </div>

              {/* Enable biometric */}
              {('credentials' in navigator) && (
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    id="enableBiometric"
                    checked={formData.enableBiometric}
                    onChange={(e) => setFormData(prev => ({ ...prev, enableBiometric: e.target.checked }))}
                    className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <div>
                    <label htmlFor="enableBiometric" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      Enable Biometric Authentication
                    </label>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Use fingerprint or face recognition for faster login
                    </p>
                  </div>
                </div>
              )}

              {/* Security features overview */}
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
                <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                  Your Account Will Include:
                </h4>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                  <li>• Device fingerprinting and security alerts</li>
                  <li>• Real-time fraud detection</li>
                  <li>• Secure session management</li>
                  <li>• Advanced encryption for all data</li>
                  <li>• Recovery options for account access</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )

      case 5:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                Verify Your Account
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                We've sent a verification code to your{' '}
                {formData.registrationMethod === 'email' ? 'email' : 'phone number'}
              </p>
            </div>

            {!otpSent ? (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                    Choose verification method:
                  </div>
                  
                  <div className="grid grid-cols-1 gap-3">
                    {formData.registrationMethod === 'email' && (
                      <motion.button
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setVerificationMethod('email')}
                        className={`p-4 border-2 rounded-lg flex items-center space-x-3 ${
                          verificationMethod === 'email'
                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                            : 'border-gray-200 dark:border-gray-700'
                        }`}
                      >
                        <Mail className="w-6 h-6 text-blue-600" />
                        <div className="text-left">
                          <div className="font-medium">Email Verification</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">
                            Send code to {formData.email}
                          </div>
                        </div>
                      </motion.button>
                    )}

                    {formData.registrationMethod === 'phone' && (
                      <>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setVerificationMethod('sms')}
                          className={`p-4 border-2 rounded-lg flex items-center space-x-3 ${
                            verificationMethod === 'sms'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <MessageSquare className="w-6 h-6 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">SMS Verification</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Send code via SMS to {formData.phone}
                            </div>
                          </div>
                        </motion.button>

                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setVerificationMethod('voice')}
                          className={`p-4 border-2 rounded-lg flex items-center space-x-3 ${
                            verificationMethod === 'voice'
                              ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                              : 'border-gray-200 dark:border-gray-700'
                          }`}
                        >
                          <PhoneCall className="w-6 h-6 text-blue-600" />
                          <div className="text-left">
                            <div className="font-medium">Voice Call Verification</div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              Receive code via voice call to {formData.phone}
                            </div>
                          </div>
                        </motion.button>
                      </>
                    )}
                  </div>
                </div>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleSendOTP}
                  disabled={isLoading}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium
                           hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <span>Send Verification Code</span>
                      <ArrowRight className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {errors.otp && (
                  <div className="text-red-600 text-sm text-center">{errors.otp}</div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-center">
                  <div className="bg-green-100 dark:bg-green-900/20 rounded-lg p-4 mb-4">
                    <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-green-800 dark:text-green-400">
                      Verification code sent successfully!
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Enter verification code:
                  </label>
                  <input
                    type="text"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                    className="w-full px-3 py-3 text-center text-2xl font-mono tracking-widest
                             border border-gray-300 dark:border-gray-600 rounded-lg
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent
                             bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                    placeholder="000000"
                    maxLength={6}
                  />
                </div>

                {timeLeft > 0 && (
                  <div className="text-center text-sm text-gray-600 dark:text-gray-400">
                    Code expires in {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                  </div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVerifyOTP}
                  disabled={isLoading || verificationCode.length !== 6}
                  className="w-full bg-blue-600 text-white px-4 py-3 rounded-lg font-medium
                           hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed
                           flex items-center justify-center space-x-2"
                >
                  {isLoading ? (
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
                  ) : (
                    <>
                      <span>Verify Code</span>
                      <CheckCircle className="w-5 h-5" />
                    </>
                  )}
                </motion.button>

                {timeLeft === 0 && (
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={handleSendOTP}
                    className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300
                             px-4 py-2 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    Resend Code
                  </motion.button>
                )}

                {errors.verification && (
                  <div className="text-red-600 text-sm text-center">{errors.verification}</div>
                )}
              </div>
            )}
          </motion.div>
        )

      default:
        return null
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
      {/* Progress bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
          <span>Step {currentStep} of {totalSteps}</span>
          <span>{Math.round((currentStep / totalSteps) * 100)}%</span>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
          <motion.div
            className="bg-blue-600 h-2 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Form content */}
      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>

      {/* Navigation buttons */}
      <div className="flex justify-between mt-8">
        {currentStep > 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handlePrev}
            className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600
                     text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back</span>
          </motion.button>
        ) : (
          <div />
        )}

        {currentStep < 4 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleNext}
            className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg
                     hover:bg-blue-700 font-medium"
          >
            <span>Next</span>
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        )}

        {currentStep === 4 && currentStep < 5 && (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSubmit}
            disabled={isLoading}
            className="flex items-center space-x-2 px-6 py-2 bg-green-600 text-white rounded-lg
                     hover:bg-green-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
            ) : (
              <>
                <span>Create Account</span>
                <CheckCircle className="w-4 h-4" />
              </>
            )}
          </motion.button>
        )}
      </div>

      {/* Cancel button */}
      {onCancel && (
        <div className="text-center mt-4">
          <button
            onClick={onCancel}
            className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
          >
            Cancel
          </button>
        </div>
      )}

      {/* Error display */}
      {errors.submit && (
        <div className="mt-4 p-3 bg-red-100 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <div className="text-red-800 dark:text-red-400 text-sm flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            {errors.submit}
          </div>
        </div>
      )}
    </div>
  )
}

export default EnhancedRegistration