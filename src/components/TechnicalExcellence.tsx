'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search,
  BarChart3,
  HelpCircle,
  Globe,
  Share2,
  TrendingUp,
  Users,
  MessageSquare,
  CheckCircle,
  AlertTriangle,
  Activity,
  Zap,
  Eye,
  Target,
  Settings,
  Code,
  Smartphone,
  Monitor,
  Headphones,
  BookOpen,
  FileText,
  Database,
  Clock,
  Award,
  Shield,
  Link,
  ExternalLink
} from 'lucide-react'

interface SEOMetric {
  id: string
  title: string
  value: string
  score: number
  status: 'excellent' | 'good' | 'needs-improvement'
  description: string
}

interface AnalyticsData {
  category: string
  metrics: Array<{
    name: string
    value: string
    change: string
    trend: 'up' | 'down' | 'stable'
  }>
}

interface SupportTicket {
  id: string
  category: string
  subject: string
  status: 'open' | 'in-progress' | 'resolved'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  created: string
  lastUpdate: string
}

const TechnicalExcellence: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('seo')
  const [selectedMetric, setSelectedMetric] = useState<string | null>(null)

  const seoMetrics: SEOMetric[] = [
    {
      id: 'page-speed',
      title: 'Page Speed Score',
      value: '94/100',
      score: 94,
      status: 'excellent',
      description: 'Fast loading times across all devices'
    },
    {
      id: 'core-vitals',
      title: 'Core Web Vitals',
      value: 'Good',
      score: 89,
      status: 'good',
      description: 'LCP, FID, and CLS metrics meet Google standards'
    },
    {
      id: 'mobile-friendly',
      title: 'Mobile Usability',
      value: '100/100',
      score: 100,
      status: 'excellent',
      description: 'Fully responsive and mobile-optimized'
    },
    {
      id: 'structured-data',
      title: 'Structured Data',
      value: '12 Types',
      score: 95,
      status: 'excellent',
      description: 'Rich snippets for products, reviews, and more'
    },
    {
      id: 'sitemap',
      title: 'XML Sitemap',
      value: 'Optimized',
      score: 98,
      status: 'excellent',
      description: 'Automatically updated with new content'
    },
    {
      id: 'ssl-security',
      title: 'SSL Security',
      value: 'A+ Grade',
      score: 100,
      status: 'excellent',
      description: 'Strong encryption and security headers'
    }
  ]

  const analyticsData: AnalyticsData[] = [
    {
      category: 'User Engagement',
      metrics: [
        { name: 'Page Views', value: '2.4M', change: '+18.5%', trend: 'up' },
        { name: 'Unique Visitors', value: '485K', change: '+12.3%', trend: 'up' },
        { name: 'Bounce Rate', value: '24.5%', change: '-8.2%', trend: 'down' },
        { name: 'Session Duration', value: '8m 42s', change: '+15.7%', trend: 'up' }
      ]
    },
    {
      category: 'E-commerce Performance',
      metrics: [
        { name: 'Conversion Rate', value: '4.8%', change: '+0.9%', trend: 'up' },
        { name: 'Average Order Value', value: '$127.50', change: '+5.2%', trend: 'up' },
        { name: 'Cart Abandonment', value: '68.2%', change: '-3.4%', trend: 'down' },
        { name: 'Revenue', value: '$1.2M', change: '+23.1%', trend: 'up' }
      ]
    },
    {
      category: 'Technical Performance',
      metrics: [
        { name: 'Page Load Time', value: '1.2s', change: '-0.3s', trend: 'down' },
        { name: 'Uptime', value: '99.98%', change: '+0.02%', trend: 'up' },
        { name: 'Error Rate', value: '0.12%', change: '-0.05%', trend: 'down' },
        { name: 'API Response Time', value: '85ms', change: '-12ms', trend: 'down' }
      ]
    }
  ]

  const supportTickets: SupportTicket[] = [
    {
      id: 'T-2024-001',
      category: 'Technical',
      subject: 'Payment gateway integration issue',
      status: 'in-progress',
      priority: 'high',
      created: '2024-01-20',
      lastUpdate: '2024-01-21'
    },
    {
      id: 'T-2024-002',
      category: 'Account',
      subject: 'Unable to reset password',
      status: 'resolved',
      priority: 'medium',
      created: '2024-01-19',
      lastUpdate: '2024-01-20'
    },
    {
      id: 'T-2024-003',
      category: 'Billing',
      subject: 'Subscription cancellation request',
      status: 'open',
      priority: 'low',
      created: '2024-01-18',
      lastUpdate: '2024-01-19'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      case 'good':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'needs-improvement':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
      case 'open':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
      case 'in-progress':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
      case 'resolved':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent':
        return 'bg-red-500'
      case 'high':
        return 'bg-orange-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-500" />
      case 'down':
        return <TrendingUp className="w-4 h-4 text-red-500 rotate-180" />
      default:
        return <TrendingUp className="w-4 h-4 text-gray-500 rotate-90" />
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 rounded-full text-blue-800 dark:text-blue-300 text-sm font-medium mb-4"
        >
          <Award className="w-4 h-4 mr-2" />
          Technical Excellence Center
        </motion.div>
        
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          SEO, Analytics & Support Infrastructure
        </h2>
        <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
          Comprehensive technical optimization, advanced analytics, and world-class support infrastructure for peak performance.
        </p>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        {[
          { 
            label: 'SEO Score', 
            value: '96/100',
            description: 'Search optimization',
            icon: Search,
            color: 'green'
          },
          { 
            label: 'Page Speed', 
            value: '1.2s',
            description: 'Average load time',
            icon: Zap,
            color: 'blue'
          },
          { 
            label: 'Uptime', 
            value: '99.98%',
            description: 'System availability',
            icon: Activity,
            color: 'purple'
          },
          { 
            label: 'Support Score', 
            value: '4.9/5',
            description: 'Customer satisfaction',
            icon: Headphones,
            color: 'orange'
          }
        ].map((stat, index) => {
          const Icon = stat.icon
          return (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                  <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-500">{stat.description}</div>
                </div>
              </div>
              <h3 className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</h3>
            </motion.div>
          )
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[
          { id: 'seo', label: 'SEO & Sharing', icon: Search },
          { id: 'analytics', label: 'Analytics & Reporting', icon: BarChart3 },
          { id: 'support', label: 'Support Infrastructure', icon: HelpCircle },
          { id: 'compliance', label: 'Regulatory Compliance', icon: Shield }
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
        {activeTab === 'seo' && (
          <motion.div
            key="seo"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* SEO Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {seoMetrics.map((metric, index) => (
                <motion.div
                  key={metric.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => setSelectedMetric(metric.id)}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(metric.status)}`}>
                      {metric.status.replace('-', ' ')}
                    </div>
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {metric.value}
                    </div>
                  </div>
                  
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {metric.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                    {metric.description}
                  </p>
                  
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-500 ${
                        metric.status === 'excellent' ? 'bg-green-500' :
                        metric.status === 'good' ? 'bg-blue-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${metric.score}%` }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1 text-right">{metric.score}%</div>
                </motion.div>
              ))}
            </div>

            {/* SEO Tools & Features */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Code className="w-5 h-5 mr-2" />
                SEO Optimization Features
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Technical SEO',
                    description: 'Advanced on-page optimization',
                    features: ['Meta tags automation', 'Schema markup', 'Canonical URLs', 'Robots.txt optimization']
                  },
                  {
                    title: 'Social Media Integration',
                    description: 'Enhanced social sharing',
                    features: ['Open Graph tags', 'Twitter Cards', 'Pinterest Rich Pins', 'WhatsApp sharing']
                  },
                  {
                    title: 'Performance Optimization',
                    description: 'Speed and Core Web Vitals',
                    features: ['Image optimization', 'Code splitting', 'CDN integration', 'Caching strategies']
                  }
                ].map((category, index) => (
                  <div key={category.title} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{category.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{category.description}</p>
                    <ul className="space-y-1">
                      {category.features.map((feature, i) => (
                        <li key={i} className="flex items-center text-xs text-gray-500">
                          <CheckCircle className="w-3 h-3 text-green-500 mr-2" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Link Building & Sharing */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Share2 className="w-5 h-5 mr-2" />
                Link Building & Social Sharing
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Link Building Tools</h4>
                  <div className="space-y-3">
                    {[
                      { tool: 'Backlink Monitoring', status: 'Active', count: '2,847 links' },
                      { tool: 'Broken Link Checker', status: 'Running', count: '0 issues' },
                      { tool: 'Competitor Analysis', status: 'Updated', count: '15 competitors' },
                      { tool: 'Internal Link Optimization', status: 'Optimized', count: '98% coverage' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <Link className="w-4 h-4 text-blue-600 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{item.tool}</div>
                            <div className="text-xs text-gray-500">{item.count}</div>
                          </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium">{item.status}</div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Social Sharing Analytics</h4>
                  <div className="space-y-3">
                    {[
                      { platform: 'Facebook', shares: '12.4K', engagement: '+18%' },
                      { platform: 'Twitter', shares: '8.7K', engagement: '+23%' },
                      { platform: 'Pinterest', shares: '15.2K', engagement: '+12%' },
                      { platform: 'LinkedIn', shares: '4.1K', engagement: '+31%' }
                    ].map((platform, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div className="flex items-center">
                          <Globe className="w-4 h-4 text-blue-600 mr-3" />
                          <div>
                            <div className="text-sm font-medium text-gray-900 dark:text-white">{platform.platform}</div>
                            <div className="text-xs text-gray-500">{platform.shares} shares</div>
                          </div>
                        </div>
                        <div className="text-xs text-green-600 font-medium">{platform.engagement}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Analytics Dashboard */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Real-time Analytics Dashboard
                </h3>
                <div className="flex items-center text-green-600">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></div>
                  <span className="text-sm font-medium">Live Data</span>
                </div>
              </div>
              
              <div className="space-y-8">
                {analyticsData.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-4">{category.category}</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      {category.metrics.map((metric, i) => (
                        <div key={metric.name} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm text-gray-600 dark:text-gray-300">{metric.name}</span>
                            {getTrendIcon(metric.trend)}
                          </div>
                          <div className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                            {metric.value}
                          </div>
                          <div className={`text-xs font-medium ${
                            metric.trend === 'up' ? 'text-green-600' :
                            metric.trend === 'down' ? 'text-red-600' : 'text-gray-500'
                          }`}>
                            {metric.change}
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Custom Reports */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <FileText className="w-5 h-5 mr-2" />
                Custom Reports & Exports
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    title: 'Executive Summary',
                    description: 'High-level KPIs and business metrics',
                    frequency: 'Weekly',
                    format: 'PDF, Excel',
                    recipients: '5 stakeholders'
                  },
                  {
                    title: 'Product Performance',
                    description: 'Detailed product analytics and trends',
                    frequency: 'Daily',
                    format: 'CSV, JSON',
                    recipients: '12 team members'
                  },
                  {
                    title: 'Customer Journey',
                    description: 'User behavior and conversion analysis',
                    frequency: 'Monthly',
                    format: 'PDF, Dashboard',
                    recipients: '8 stakeholders'
                  }
                ].map((report, index) => (
                  <motion.div
                    key={report.title}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{report.title}</h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">{report.description}</p>
                    
                    <div className="space-y-2 text-xs text-gray-500">
                      <div className="flex justify-between">
                        <span>Frequency:</span>
                        <span className="font-medium">{report.frequency}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Format:</span>
                        <span className="font-medium">{report.format}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Recipients:</span>
                        <span className="font-medium">{report.recipients}</span>
                      </div>
                    </div>
                    
                    <div className="mt-4 flex gap-2">
                      <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                        Generate Now
                      </button>
                      <button className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded text-xs hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Settings className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* API Access */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Database className="w-5 h-5 mr-2" />
                Analytics API Access
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Available Endpoints</h4>
                  <div className="space-y-2">
                    {[
                      { endpoint: '/api/analytics/overview', description: 'General metrics and KPIs' },
                      { endpoint: '/api/analytics/products', description: 'Product performance data' },
                      { endpoint: '/api/analytics/users', description: 'User behavior analytics' },
                      { endpoint: '/api/analytics/revenue', description: 'Revenue and conversion data' }
                    ].map((api, i) => (
                      <div key={i} className="flex items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <Code className="w-4 h-4 text-blue-600 mr-3" />
                        <div className="flex-1">
                          <div className="text-sm font-mono text-gray-900 dark:text-white">{api.endpoint}</div>
                          <div className="text-xs text-gray-500">{api.description}</div>
                        </div>
                        <ExternalLink className="w-4 h-4 text-gray-400" />
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">API Usage Statistics</h4>
                  <div className="space-y-4">
                    {[
                      { metric: 'Requests Today', value: '12,847', limit: '50,000' },
                      { metric: 'Response Time', value: '145ms', target: '<200ms' },
                      { metric: 'Success Rate', value: '99.8%', target: '>99%' },
                      { metric: 'Rate Limit', value: '1000/hour', usage: '67%' }
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{stat.metric}</div>
                          <div className="text-xs text-gray-500">{stat.value}</div>
                        </div>
                        {stat.limit && (
                          <div className="text-xs text-gray-500">of {stat.limit}</div>
                        )}
                        {stat.target && (
                          <div className="text-xs text-green-600">Target: {stat.target}</div>
                        )}
                        {stat.usage && (
                          <div className="text-xs text-blue-600">{stat.usage} used</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeTab === 'support' && (
          <motion.div
            key="support"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Support Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Active Tickets', value: '23', icon: HelpCircle, color: 'blue' },
                { label: 'Avg Response Time', value: '12 min', icon: Clock, color: 'green' },
                { label: 'Resolution Rate', value: '94.8%', icon: CheckCircle, color: 'purple' },
                { label: 'Satisfaction Score', value: '4.9/5', icon: Award, color: 'orange' }
              ].map((stat, index) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div className={`p-3 bg-${stat.color}-100 dark:bg-${stat.color}-900/30 rounded-lg`}>
                        <Icon className={`w-6 h-6 text-${stat.color}-600`} />
                      </div>
                      <div className="text-2xl font-bold text-gray-900 dark:text-white">
                        {stat.value}
                      </div>
                    </div>
                    <h3 className="text-sm text-gray-600 dark:text-gray-300">{stat.label}</h3>
                  </motion.div>
                )
              })}
            </div>

            {/* AI-Powered Help Center */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <BookOpen className="w-5 h-5 mr-2" />
                AI-Powered Help Center
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Smart Features</h4>
                  <div className="space-y-3">
                    {[
                      { feature: 'Natural Language Search', description: 'Find answers using conversational queries' },
                      { feature: 'Auto-Suggested Solutions', description: 'AI recommends relevant articles and solutions' },
                      { feature: 'Smart Categorization', description: 'Automatic content organization and tagging' },
                      { feature: 'Multilingual Support', description: 'Content available in 12 languages' },
                      { feature: 'Chat Escalation', description: 'Seamless handoff to human agents' }
                    ].map((item, i) => (
                      <div key={i} className="flex items-start">
                        <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-1" />
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{item.feature}</div>
                          <div className="text-xs text-gray-600 dark:text-gray-300">{item.description}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Usage Analytics</h4>
                  <div className="space-y-4">
                    {[
                      { metric: 'Monthly Searches', value: '45,230', change: '+18%' },
                      { metric: 'Self-Service Rate', value: '78%', change: '+12%' },
                      { metric: 'Article Views', value: '156K', change: '+24%' },
                      { metric: 'Deflection Rate', value: '82%', change: '+8%' }
                    ].map((stat, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{stat.metric}</div>
                          <div className="text-lg font-bold text-gray-900 dark:text-white">{stat.value}</div>
                        </div>
                        <div className="text-sm font-medium text-green-600">{stat.change}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Support Tickets */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <MessageSquare className="w-5 h-5 mr-2" />
                Recent Support Tickets
              </h3>
              
              <div className="space-y-4">
                {supportTickets.map((ticket, index) => (
                  <motion.div
                    key={ticket.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`w-3 h-3 rounded-full mr-3 ${getPriorityColor(ticket.priority)}`}></div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-white">{ticket.id}</div>
                          <div className="text-sm text-gray-600 dark:text-gray-300">{ticket.category}</div>
                        </div>
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                        {ticket.status.replace('-', ' ')}
                      </div>
                    </div>
                    
                    <h4 className="font-medium text-gray-900 dark:text-white mb-2">
                      {ticket.subject}
                    </h4>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>Created: {new Date(ticket.created).toLocaleDateString()}</span>
                      <span>Updated: {new Date(ticket.lastUpdate).toLocaleDateString()}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Support Channels */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Multi-Channel Support Options
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { channel: 'Live Chat', availability: '24/7', response: '< 2 min', satisfaction: '4.8/5' },
                  { channel: 'Email Support', availability: 'Business Hours', response: '< 2 hours', satisfaction: '4.7/5' },
                  { channel: 'Phone Support', availability: '9 AM - 6 PM', response: 'Immediate', satisfaction: '4.9/5' },
                  { channel: 'Video Call', availability: 'By Appointment', response: 'Scheduled', satisfaction: '5.0/5' }
                ].map((channel, index) => (
                  <div key={channel.channel} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-3">{channel.channel}</h4>
                    <div className="space-y-2 text-sm">
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Availability:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{channel.availability}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Response:</span>
                        <div className="font-medium text-gray-900 dark:text-white">{channel.response}</div>
                      </div>
                      <div>
                        <span className="text-gray-600 dark:text-gray-300">Rating:</span>
                        <div className="font-medium text-yellow-600">{channel.satisfaction}</div>
                      </div>
                    </div>
                  </div>
                ))}
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
            {/* Regulatory Compliance Overview */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
                <Shield className="w-5 h-5 mr-2" />
                Regulatory Compliance Status
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  {
                    regulation: 'Age Verification (COPPA)',
                    status: 'Compliant',
                    description: 'Child online privacy protection compliance',
                    lastAudit: '2024-01-15',
                    certificate: 'Valid'
                  },
                  {
                    regulation: 'Product Safety Standards',
                    status: 'Compliant',
                    description: 'Consumer product safety regulations',
                    lastAudit: '2024-01-10',
                    certificate: 'Valid'
                  },
                  {
                    regulation: 'Environmental Standards',
                    status: 'Compliant',
                    description: 'Sustainability and environmental compliance',
                    lastAudit: '2024-01-12',
                    certificate: 'Valid'
                  }
                ].map((item, index) => (
                  <motion.div
                    key={item.regulation}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{item.regulation}</h4>
                      <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded-full text-xs font-medium">
                        {item.status}
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3">{item.description}</p>
                    <div className="text-xs text-gray-500 space-y-1">
                      <div>Last Audit: {new Date(item.lastAudit).toLocaleDateString()}</div>
                      <div>Certificate: {item.certificate}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Audit Trail System */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Audit Trail & Documentation
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Automated Compliance Checks</h4>
                  <div className="space-y-3">
                    {[
                      { check: 'Product Content Review', frequency: 'Real-time', status: 'Active' },
                      { check: 'Age Restriction Validation', frequency: 'On Product Upload', status: 'Active' },
                      { check: 'Hazardous Material Detection', frequency: 'Daily', status: 'Active' },
                      { check: 'Copyright Infringement Scan', frequency: 'Weekly', status: 'Active' },
                      { check: 'Price Monitoring', frequency: 'Hourly', status: 'Active' }
                    ].map((check, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{check.check}</div>
                          <div className="text-xs text-gray-500">{check.frequency}</div>
                        </div>
                        <div className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 px-2 py-1 rounded text-xs font-medium">
                          {check.status}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-medium text-gray-900 dark:text-white mb-4">Compliance Reports</h4>
                  <div className="space-y-3">
                    {[
                      { report: 'Monthly Compliance Summary', generated: '2024-01-01', status: 'Complete' },
                      { report: 'Product Safety Audit', generated: '2024-01-15', status: 'Complete' },
                      { report: 'Age Verification Report', generated: '2024-01-20', status: 'Complete' },
                      { report: 'Environmental Impact Assessment', generated: '2024-01-18', status: 'Complete' }
                    ].map((report, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <div className="text-sm font-medium text-gray-900 dark:text-white">{report.report}</div>
                          <div className="text-xs text-gray-500">Generated: {new Date(report.generated).toLocaleDateString()}</div>
                        </div>
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                          Download
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Takedown & Content Management */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">
                Content Moderation & Takedown Procedures
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="p-4 bg-red-100 dark:bg-red-900/30 rounded-lg inline-flex mb-3">
                    <AlertTriangle className="w-8 h-8 text-red-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Active Violations</h4>
                  <div className="text-2xl font-bold text-red-600 mb-1">3</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">Under Review</div>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-blue-100 dark:bg-blue-900/30 rounded-lg inline-flex mb-3">
                    <Eye className="w-8 h-8 text-blue-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Content Reviewed</h4>
                  <div className="text-2xl font-bold text-blue-600 mb-1">12,847</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">This Month</div>
                </div>
                
                <div className="text-center">
                  <div className="p-4 bg-green-100 dark:bg-green-900/30 rounded-lg inline-flex mb-3">
                    <CheckCircle className="w-8 h-8 text-green-600" />
                  </div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Compliance Rate</h4>
                  <div className="text-2xl font-bold text-green-600 mb-1">98.7%</div>
                  <div className="text-sm text-gray-600 dark:text-gray-300">All Content</div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default TechnicalExcellence