'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle,
  Globe,
  Accessibility,
  FileText,
  Scale,
  TrendingUp,
  Users,
  Activity,
  Bell,
  Settings,
  Zap,
  Monitor,
  Smartphone,
  Volume2,
  MousePointer,
  Keyboard,
  Search,
  Book,
  HelpCircle,
  Calculator,
  Clock
} from 'lucide-react'

interface ComplianceModule {
  id: string
  title: string
  description: string
  status: 'compliant' | 'warning' | 'action-required'
  lastChecked: string
  score: number
  icon: any
  details: string[]
}

interface AccessibilityFeature {
  id: string
  name: string
  description: string
  enabled: boolean
  wcagLevel: 'A' | 'AA' | 'AAA'
  category: string
}

const OperationsCompliance: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('security')
  const [complianceScore] = useState(96.5)

  const complianceModules: ComplianceModule[] = [
    {
      id: 'gdpr',
      title: 'GDPR Compliance',
      description: 'European data protection regulation compliance',
      status: 'compliant',
      lastChecked: '2024-01-20',
      score: 98,
      icon: Shield,
      details: [
        'Data subject rights implemented',
        'Privacy by design architecture',
        'DPO appointed and active',
        'Regular compliance audits',
        'Cookie consent management'
      ]
    },
    {
      id: 'ccpa',
      title: 'CCPA Compliance',
      description: 'California Consumer Privacy Act compliance',
      status: 'compliant',
      lastChecked: '2024-01-19',
      score: 95,
      icon: Scale,
      details: [
        'Consumer rights portal active',
        'Do Not Sell implementation',
        'Data inventory complete',
        'Third-party assessments done'
      ]
    },
    {
      id: 'pci',
      title: 'PCI DSS',
      description: 'Payment card industry data security standards',
      status: 'compliant',
      lastChecked: '2024-01-18',
      score: 97,
      icon: Lock,
      details: [
        'Level 1 merchant certification',
        'Quarterly vulnerability scans',
        'Annual penetration testing',
        'Secure network architecture'
      ]
    },
    {
      id: 'sox',
      title: 'SOX Compliance',
      description: 'Sarbanes-Oxley financial reporting compliance',
      status: 'warning',
      lastChecked: '2024-01-15',
      score: 89,
      icon: FileText,
      details: [
        'Internal controls testing',
        'Financial reporting audits',
        'Management attestation',
        'External auditor validation'
      ]
    },
    {
      id: 'accessibility',
      title: 'WCAG 2.2 AA',
      description: 'Web Content Accessibility Guidelines compliance',
      status: 'compliant',
      lastChecked: '2024-01-21',
      score: 94,
      icon: Accessibility,
      details: [
        'Screen reader compatibility',
        'Keyboard navigation support',
        'Color contrast compliance',
        'Alternative text for images',
        'Form label associations'
      ]
    }
  ]

  const accessibilityFeatures: AccessibilityFeature[] = [
    {
      id: 'screen-reader',
      name: 'Screen Reader Support',
      description: 'Full compatibility with screen reading software',
      enabled: true,
      wcagLevel: 'AA',
      category: 'Visual'
    },
    {
      id: 'keyboard-nav',
      name: 'Keyboard Navigation',
      description: 'Complete keyboard-only navigation support',
      enabled: true,
      wcagLevel: 'AA',
      category: 'Motor'
    },
    {
      id: 'high-contrast',
      name: 'High Contrast Mode',
      description: 'Enhanced color contrast for better visibility',
      enabled: true,
      wcagLevel: 'AAA',
      category: 'Visual'
    },
    {
      id: 'text-scaling',
      name: 'Text Scaling',
      description: 'Support for 200% text scaling without scroll',
      enabled: true,
      wcagLevel: 'AA',
      category: 'Visual'
    },
    {
      id: 'voice-control',
      name: 'Voice Control',
      description: 'Voice command recognition and control',
      enabled: true,
      wcagLevel: 'AAA',
      category: 'Motor'
    },
    {
      id: 'reduced-motion',
      name: 'Reduced Motion',
      description: 'Respect for prefers-reduced-motion setting',
      enabled: true,
      wcagLevel: 'AA',
      category: 'Vestibular'
    }
  ]

  const securityMetrics = [
    { label: 'Security Score', value: '98.5%', trend: 'up', icon: Shield },
    { label: 'Vulnerabilities', value: '0 Critical', trend: 'stable', icon: AlertTriangle },
    { label: 'Uptime', value: '99.9%', trend: 'up', icon: Activity },
    { label: 'Response Time', value: '<100ms', trend: 'up', icon: Zap }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'compliant':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'warning':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'action-required':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'compliant':
        return <CheckCircle className="w-4 h-4" />
      case 'warning':
        return <AlertTriangle className="w-4 h-4" />
      case 'action-required':
        return <AlertTriangle className="w-4 h-4" />
      default:
        return <Eye className="w-4 h-4" />
    }
  }

  const getWCAGLevelColor = (level: string) => {
    switch (level) {
      case 'AAA':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'AA':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'A':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-green-100 dark:from-blue-900/30 dark:to-green-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-4"
        >
          <Shield className="w-4 h-4 mr-2" />
          Operations & Compliance Center
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Security, Privacy & Accessibility
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Comprehensive compliance management with enterprise-grade security, privacy controls, and accessibility standards.
        </p>
      </div>

      {/* Compliance Score Overview */}
      <div className="bg-gradient-to-r from-green-500 to-blue-600 rounded-2xl text-white p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="mb-6 md:mb-0">
            <h3 className="text-3xl font-bold mb-2">
              {complianceScore}% Compliant
            </h3>
            <p className="text-green-100 mb-4">
              Industry-leading compliance across all major standards
            </p>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                <span className="text-sm">GDPR Certified</span>
              </div>
              <div className="flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                <span className="text-sm">SOC 2 Type II</span>
              </div>
              <div className="flex items-center">
                <Accessibility className="w-5 h-5 mr-2" />
                <span className="text-sm">WCAG 2.2 AA</span>
              </div>
            </div>
          </div>

          <div className="text-center">
            <div className="relative w-32 h-32">
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="3"
                />
                <path
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  fill="none"
                  stroke="white"
                  strokeWidth="3"
                  strokeDasharray={`${complianceScore}, 100`}
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{complianceScore}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'security', label: 'Security & Privacy', icon: Shield },
          { id: 'compliance', label: 'Regulatory Compliance', icon: Scale },
          { id: 'accessibility', label: 'Accessibility', icon: Accessibility },
          { id: 'monitoring', label: 'System Monitoring', icon: Activity }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
            }`}
          >
            {React.createElement(tab.icon, { className: 'w-4 h-4 mr-2' })}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">
        {activeTab === 'security' && (
          <motion.div
            key="security"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Security Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {securityMetrics.map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <TrendingUp className={`w-4 h-4 ${
                        metric.trend === 'up' ? 'text-green-500' : 'text-gray-400'
                      }`} />
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {metric.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Privacy Controls */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Eye className="w-5 h-5 mr-2" />
                Privacy Controls
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Data Portability',
                    description: 'Export your data in machine-readable format',
                    enabled: true,
                    icon: FileText
                  },
                  {
                    title: 'Right to be Forgotten',
                    description: 'Complete data deletion on request',
                    enabled: true,
                    icon: AlertTriangle
                  },
                  {
                    title: 'Consent Management',
                    description: 'Granular privacy preference controls',
                    enabled: true,
                    icon: Settings
                  },
                  {
                    title: 'Data Minimization',
                    description: 'Collect only necessary information',
                    enabled: true,
                    icon: Shield
                  },
                  {
                    title: 'Encryption at Rest',
                    description: 'AES-256 encryption for stored data',
                    enabled: true,
                    icon: Lock
                  },
                  {
                    title: 'Zero-Trust Architecture',
                    description: 'Verify everything, trust nothing approach',
                    enabled: true,
                    icon: Zap
                  }
                ].map((control, index) => {
                  const Icon = control.icon
                  return (
                    <div key={control.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <div className={`w-2 h-2 rounded-full ${
                          control.enabled ? 'bg-green-500' : 'bg-red-500'
                        }`}></div>
                      </div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                        {control.title}
                      </h4>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {control.description}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'compliance' && (
          <motion.div
            key="compliance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {complianceModules.map((module, index) => {
              const Icon = module.icon
              return (
                <motion.div
                  key={module.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg mr-4">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          {module.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-300">
                          {module.description}
                        </p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                        {module.score}%
                      </div>
                      <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                        {getStatusIcon(module.status)}
                        <span className="ml-1 capitalize">{module.status.replace('-', ' ')}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white mb-3">Implementation Details</h4>
                      <ul className="space-y-2">
                        {module.details.map((detail, i) => (
                          <li key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-24 h-24 mb-3">
                          <svg className="w-24 h-24 transform -rotate-90" viewBox="0 0 36 36">
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              className="text-gray-200 dark:text-gray-700"
                            />
                            <path
                              d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="3"
                              strokeDasharray={`${module.score}, 100`}
                              className={`${
                                module.status === 'compliant' ? 'text-green-500' :
                                module.status === 'warning' ? 'text-yellow-500' : 'text-red-500'
                              }`}
                            />
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-gray-900 dark:text-white">{module.score}%</span>
                          </div>
                        </div>
                        <div className="text-xs text-gray-500">
                          Last checked: {new Date(module.lastChecked).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </motion.div>
        )}

        {activeTab === 'accessibility' && (
          <motion.div
            key="accessibility"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Accessibility Score */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    WCAG 2.2 AA Compliance
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Web Content Accessibility Guidelines compliance score
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-green-600 mb-1">94%</div>
                  <div className="text-sm text-gray-500">Accessibility Score</div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {[
                  { category: 'Perceivable', score: 96, icon: Eye },
                  { category: 'Operable', score: 94, icon: MousePointer },
                  { category: 'Understandable', score: 92, icon: Book },
                  { category: 'Robust', score: 95, icon: Settings }
                ].map((principle) => {
                  const Icon = principle.icon
                  return (
                    <div key={principle.category} className="text-center">
                      <div className="p-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg inline-flex mb-3">
                        <Icon className="w-6 h-6 text-blue-600" />
                      </div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                        {principle.score}%
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-300">
                        {principle.category}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Accessibility Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Accessibility Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {accessibilityFeatures.map((feature, index) => (
                  <motion.div
                    key={feature.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className={`px-2 py-1 rounded text-xs font-medium ${getWCAGLevelColor(feature.wcagLevel)}`}>
                        WCAG {feature.wcagLevel}
                      </div>
                      <div className={`w-3 h-3 rounded-full ${
                        feature.enabled ? 'bg-green-500' : 'bg-red-500'
                      }`}></div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {feature.name}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">
                      {feature.description}
                    </p>
                    
                    <div className="text-xs text-blue-600 font-medium">
                      {feature.category} Accessibility
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Accessibility Tools */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Built-in Accessibility Tools
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    title: 'Screen Reader Support',
                    description: 'NVDA, JAWS, VoiceOver compatible',
                    icon: Volume2,
                    tools: ['Semantic HTML', 'ARIA labels', 'Live regions', 'Focus management']
                  },
                  {
                    title: 'Keyboard Navigation',
                    description: 'Complete keyboard-only operation',
                    icon: Keyboard,
                    tools: ['Tab order', 'Focus indicators', 'Skip links', 'Keyboard shortcuts']
                  },
                  {
                    title: 'Visual Adaptations',
                    description: 'Customizable display options',
                    icon: Monitor,
                    tools: ['High contrast', 'Large text', 'Reduced motion', 'Color themes']
                  },
                  {
                    title: 'Cognitive Support',
                    description: 'Clear navigation and instructions',
                    icon: HelpCircle,
                    tools: ['Simple language', 'Error prevention', 'Help text', 'Progress indicators']
                  }
                ].map((tool) => {
                  const Icon = tool.icon
                  return (
                    <div key={tool.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg mr-3">
                          <Icon className="w-5 h-5 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 dark:text-white">{tool.title}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-300">{tool.description}</p>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        {tool.tools.map((item, i) => (
                          <div key={i} className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                            <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'monitoring' && (
          <motion.div
            key="monitoring"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* System Health */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { label: 'System Uptime', value: '99.99%', status: 'excellent', icon: Activity },
                { label: 'Response Time', value: '85ms', status: 'good', icon: Zap },
                { label: 'Error Rate', value: '0.01%', status: 'excellent', icon: AlertTriangle }
              ].map((metric, index) => {
                const Icon = metric.icon
                return (
                  <motion.div
                    key={metric.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-lg">
                        <Icon className="w-6 h-6 text-green-600" />
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                        metric.status === 'excellent' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                        'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                      }`}>
                        {metric.status}
                      </div>
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                      {metric.value}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">
                      {metric.label}
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Monitoring Dashboard */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Activity className="w-5 h-5 mr-2" />
                Real-time System Monitoring
              </h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Active Alerts</h4>
                  <div className="space-y-3">
                    {[
                      { type: 'info', message: 'Scheduled maintenance in 2 hours', time: '2m ago' },
                      { type: 'success', message: 'Security scan completed successfully', time: '15m ago' },
                      { type: 'warning', message: 'High CPU usage on server-03', time: '1h ago' }
                    ].map((alert, i) => (
                      <div key={i} className={`p-3 rounded-lg border-l-4 ${
                        alert.type === 'success' ? 'bg-green-50 dark:bg-green-900/20 border-green-500' :
                        alert.type === 'warning' ? 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-500' :
                        'bg-blue-50 dark:bg-blue-900/20 border-blue-500'
                      }`}>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-900 dark:text-white">{alert.message}</span>
                          <span className="text-xs text-gray-500">{alert.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Performance Metrics</h4>
                  <div className="space-y-4">
                    {[
                      { label: 'CPU Usage', value: 45, max: 100, unit: '%' },
                      { label: 'Memory Usage', value: 68, max: 100, unit: '%' },
                      { label: 'Disk I/O', value: 32, max: 100, unit: '%' },
                      { label: 'Network Traffic', value: 78, max: 100, unit: '%' }
                    ].map((metric) => (
                      <div key={metric.label}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">{metric.label}</span>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{metric.value}{metric.unit}</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-500 ${
                              metric.value > 80 ? 'bg-red-500' :
                              metric.value > 60 ? 'bg-yellow-500' : 'bg-green-500'
                            }`}
                            style={{ width: `${(metric.value / metric.max) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default OperationsCompliance