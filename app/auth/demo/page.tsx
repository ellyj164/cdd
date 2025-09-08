'use client'

import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Users, 
  Smartphone, 
  CheckCircle, 
  Eye,
  EyeOff,
  ArrowRight,
  Star,
  Lock,
  Globe,
  Zap
} from 'lucide-react'
import EnhancedRegistration from '../../../src/components/EnhancedRegistration'
import KYCVerification from '../../../src/components/KYCVerification'
import OnboardingFlow from '../../../src/components/OnboardingFlow'
import { EnhancedAuthProvider } from '../../../src/contexts/EnhancedAuthContext'

const AuthDemoPage = () => {
  const [activeDemo, setActiveDemo] = useState<'registration' | 'kyc' | 'onboarding' | null>(null)
  const [showFeatures, setShowFeatures] = useState(false)

  const features = [
    {
      icon: Shield,
      title: 'Multi-Channel Registration',
      description: 'Email, phone, social login, SSO, and biometric authentication',
      highlights: ['Progressive verification', 'Device fingerprinting', 'Risk assessment']
    },
    {
      icon: Smartphone,
      title: 'OTP & 2FA Systems',
      description: 'Advanced verification with SMS, email, voice, and authenticator apps',
      highlights: ['Progressive backoff', 'Multiple delivery methods', 'Backup codes']
    },
    {
      icon: CheckCircle,
      title: 'KYC Verification',
      description: 'Enterprise-grade identity verification for individuals and businesses',
      highlights: ['Document upload', 'AI verification', 'Compliance tracking']
    },
    {
      icon: Users,
      title: 'Smart Onboarding',
      description: 'Personalized onboarding flows with save & resume functionality',
      highlights: ['Progress tracking', 'Role-based flows', 'Auto-save progress']
    },
    {
      icon: Lock,
      title: 'Security Alerts',
      description: 'Real-time security monitoring and anomaly detection',
      highlights: ['Login monitoring', 'Device tracking', 'Risk scoring']
    },
    {
      icon: Globe,
      title: 'Account Management',
      description: 'Advanced account features for enterprise use',
      highlights: ['Account merging', 'Role switching', 'Session management']
    }
  ]

  const handleDemoComplete = (type: string, data: any) => {
    console.log(`${type} completed:`, data)
    setActiveDemo(null)
  }

  return (
    <EnhancedAuthProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Hero Section */}
        <div className="relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-6">
                  <Zap className="w-4 h-4 mr-2" />
                  Phase 1 Complete: Enhanced Authentication
                </div>
                
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                  Enterprise-Grade
                  <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Authentication System
                  </span>
                </h1>
                
                <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
                  Experience our advanced authentication features including multi-channel registration, 
                  OTP verification, KYC compliance, and intelligent onboarding flows.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setShowFeatures(!showFeatures)}
                    className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center"
                  >
                    {showFeatures ? <EyeOff className="w-5 h-5 mr-2" /> : <Eye className="w-5 h-5 mr-2" />}
                    {showFeatures ? 'Hide Features' : 'View Features'}
                  </motion.button>
                  
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveDemo('registration')}
                    className="px-8 py-3 border-2 border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 flex items-center justify-center"
                  >
                    Try Demo
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-32 w-80 h-80 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
            <div className="absolute -bottom-40 -left-32 w-80 h-80 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
          </div>
        </div>

        {/* Features Section */}
        {showFeatures && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <motion.div
                    key={feature.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-shadow"
                  >
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-blue-600" />
                    </div>
                    
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    
                    <p className="text-gray-600 dark:text-gray-300 mb-4">
                      {feature.description}
                    </p>
                    
                    <ul className="space-y-2">
                      {feature.highlights.map((highlight, i) => (
                        <li key={i} className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                )
              })}
            </div>
          </motion.div>
        )}

        {/* Demo Buttons */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Interactive Demos
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Experience our authentication features firsthand
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                id: 'registration',
                title: 'Enhanced Registration',
                description: 'Multi-step registration with OTP verification',
                icon: Users,
                color: 'blue'
              },
              {
                id: 'kyc',
                title: 'KYC Verification',
                description: 'Document upload and identity verification',
                icon: Shield,
                color: 'green'
              },
              {
                id: 'onboarding',
                title: 'Smart Onboarding',
                description: 'Personalized account setup flow',
                icon: Star,
                color: 'purple'
              }
            ].map((demo) => {
              const Icon = demo.icon
              return (
                <motion.button
                  key={demo.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setActiveDemo(demo.id as any)}
                  className="p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 transition-all text-left"
                >
                  <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-blue-600" />
                  </div>
                  
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {demo.title}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {demo.description}
                  </p>
                  
                  <div className="flex items-center text-blue-600 dark:text-blue-400">
                    <span className="text-sm font-medium">Try Demo</span>
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>

        {/* Demo Modal */}
        {activeDemo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-4 flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {activeDemo === 'registration' && 'Enhanced Registration Demo'}
                  {activeDemo === 'kyc' && 'KYC Verification Demo'}
                  {activeDemo === 'onboarding' && 'Smart Onboarding Demo'}
                </h3>
                <button
                  onClick={() => setActiveDemo(null)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-6">
                {activeDemo === 'registration' && (
                  <EnhancedRegistration
                    onSuccess={(data) => handleDemoComplete('registration', data)}
                    onCancel={() => setActiveDemo(null)}
                  />
                )}
                
                {activeDemo === 'kyc' && (
                  <KYCVerification
                    userType="individual"
                    onComplete={(data) => handleDemoComplete('kyc', data)}
                    onSkip={() => setActiveDemo(null)}
                  />
                )}
                
                {activeDemo === 'onboarding' && (
                  <OnboardingFlow
                    userType="individual"
                    onComplete={(data) => handleDemoComplete('onboarding', data)}
                    onSaveProgress={(step, data) => console.log('Progress saved:', step, data)}
                  />
                )}
              </div>
            </motion.div>
          </div>
        )}

        {/* Stats Section */}
        <div className="bg-gray-50 dark:bg-gray-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {[
                { label: 'Authentication Methods', value: '6+' },
                { label: 'Security Features', value: '20+' },
                { label: 'Verification Steps', value: '5' },
                { label: 'Compliance Standards', value: '99.9%' }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
                    {stat.value}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
      `}</style>
    </EnhancedAuthProvider>
  )
}

export default AuthDemoPage