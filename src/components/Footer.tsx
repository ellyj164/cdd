'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowRight,
  Heart,
  Shield,
  Truck,
  CreditCard,
  Globe,
  Brain,
  Zap,
  Eye
} from 'lucide-react'
import { motion } from 'framer-motion'

export function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.trim()) return

    try {
      // TODO: Integrate with backend API for newsletter subscription
      // const response = await fetch('/api/newsletter/subscribe', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ email })
      // })
      
      // Simulate subscription for now
      setSubscribed(true)
      setEmail('')
    } catch (error) {
      console.error('Newsletter subscription failed:', error)
    }
  }

  const enterpriseFeatures = [
    { icon: Brain, title: 'AI-Powered', description: 'Neural recommendation engine' },
    { icon: Shield, title: 'Blockchain Verified', description: 'Quantum-secured transactions' },
    { icon: Eye, title: 'AR/VR Ready', description: 'Immersive shopping experiences' },
    { icon: Globe, title: 'Global Scale', description: '195 countries, 50B+ products' }
  ]

  const footerSections = [
    {
      title: 'Marketplace',
      links: [
        { href: '/marketplace', label: 'Browse All Products' },
        { href: '/ai-recommendations', label: 'AI Recommendations' },
        { href: '/ar-experiences', label: 'AR/VR Experiences' },
        { href: '/blockchain-verified', label: 'Blockchain Verified' },
        { href: '/sustainability', label: 'Sustainable Products' },
        { href: '/enterprise', label: 'Enterprise Solutions' }
      ]
    },
    {
      title: 'For Business',
      links: [
        { href: '/vendor/register', label: 'Become a Vendor' },
        { href: '/b2b', label: 'B2B Marketplace' },
        { href: '/enterprise', label: 'Enterprise Platform' },
        { href: '/api', label: 'Developer API' },
        { href: '/white-label', label: 'White Label Solutions' },
        { href: '/partnerships', label: 'Strategic Partnerships' }
      ]
    },
    {
      title: 'Support',
      links: [
        { href: '/help', label: 'Help Center' },
        { href: '/contact', label: 'Contact Support' },
        { href: '/shipping', label: 'Shipping Information' },
        { href: '/returns', label: 'Returns & Exchanges' },
        { href: '/size-guide', label: 'Size Guide' },
        { href: '/track-order', label: 'Track Your Order' }
      ]
    },
    {
      title: 'Company',
      links: [
        { href: '/about', label: 'About Global Nexus' },
        { href: '/careers', label: 'Careers' },
        { href: '/press', label: 'Press & Media' },
        { href: '/investors', label: 'Investor Relations' },
        { href: '/blog', label: 'Blog' },
        { href: '/sustainability', label: 'Sustainability' }
      ]
    }
  ]

  return (
    <footer className="bg-gray-900 text-white">
      {/* Enterprise Features Banner */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {enterpriseFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-center space-x-4"
              >
                <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-white">{feature.title}</h3>
                  <p className="text-sm text-gray-400">{feature.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-4">
                Stay Connected with Global Nexus
              </h2>
              <p className="text-gray-400 mb-6">
                Get the latest updates on AI-powered products, exclusive deals, and marketplace innovations. 
                Join 10M+ professionals in our ecosystem.
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center">
                  <Shield className="w-4 h-4 mr-2" />
                  Enterprise Security
                </div>
                <div className="flex items-center">
                  <Brain className="w-4 h-4 mr-2" />
                  AI Insights
                </div>
                <div className="flex items-center">
                  <Zap className="w-4 h-4 mr-2" />
                  Real-time Updates
                </div>
              </div>
            </div>
            
            <div>
              {!subscribed ? (
                <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your professional email"
                    className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    type="submit"
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-purple-700 transition-all flex items-center justify-center"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </motion.button>
                </form>
              ) : (
                <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-4 text-center">
                  <div className="text-green-400 font-medium">✓ Successfully subscribed!</div>
                  <div className="text-sm text-gray-400 mt-1">Welcome to the Global Nexus community</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Globe className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="text-xl font-bold text-white">Global Nexus</div>
                <div className="text-xs text-gray-400">Professional Platform</div>
              </div>
            </div>
            
            <p className="text-gray-400 mb-6 text-sm leading-relaxed">
              The world's most advanced enterprise ecommerce platform, powered by AI, secured by blockchain, 
              and designed for the future of commerce.
            </p>
            
            {/* Social Links */}
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#', label: 'Facebook' },
                { icon: Twitter, href: '#', label: 'Twitter' },
                { icon: Instagram, href: '#', label: 'Instagram' },
                { icon: Linkedin, href: '#', label: 'LinkedIn' },
                { icon: Youtube, href: '#', label: 'YouTube' }
              ].map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  className="w-10 h-10 bg-gray-800 hover:bg-gray-700 rounded-lg flex items-center justify-center transition-colors group"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5 text-gray-400 group-hover:text-white" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Sections */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="text-white font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Contact Information */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Global Headquarters</div>
                <div className="text-gray-400 text-sm">San Francisco, CA • London, UK • Tokyo, JP</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">24/7 Enterprise Support</div>
                <div className="text-gray-400 text-sm">+1 (800) 123-NEXUS</div>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-400" />
              <div>
                <div className="text-white font-medium">Enterprise Inquiries</div>
                <div className="text-gray-400 text-sm">enterprise@globalnexus.com</div>
              </div>
            </div>
          </div>
        </div>

        {/* Payment & Security */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <div className="text-sm text-gray-400">Secure Payments:</div>
              <div className="flex items-center space-x-3">
                <CreditCard className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-400">256-bit SSL</span>
                <Shield className="w-6 h-6 text-green-400" />
                <span className="text-sm text-gray-400">Blockchain Verified</span>
              </div>
            </div>
            <div className="flex items-center space-x-6">
              <div className="text-sm text-gray-400">Global Delivery:</div>
              <div className="flex items-center space-x-3">
                <Truck className="w-6 h-6 text-gray-400" />
                <span className="text-sm text-gray-400">195 Countries</span>
                <Globe className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center">
          <div className="text-gray-400 text-sm mb-4 md:mb-0">
            © 2024 Global Nexus Professional Platform. All rights reserved.
          </div>
          <div className="flex items-center space-x-6 text-sm">
            <Link href="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookie-policy" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link href="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>

        {/* Made with Love */}
        <div className="mt-8 text-center">
          <div className="text-gray-500 text-sm flex items-center justify-center">
            Made with <Heart className="w-4 h-4 mx-1 text-red-500" /> for the future of commerce
          </div>
        </div>
      </div>
    </footer>
  )
}