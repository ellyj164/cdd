import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Newspaper,
  Calendar,
  Download,
  ExternalLink,
  Mail,
  Phone,
  Image,
  Video,
  FileText,
  Award,
  TrendingUp,
  Users,
  Globe,
  Building,
  Target,
  Zap,
  Star
} from 'lucide-react';

const PressPage = () => {
  const [selectedYear, setSelectedYear] = useState('2024');

  const pressReleases = [
    {
      id: 1,
      title: 'Global Nexus Reaches 10 Million Active Users Milestone',
      date: '2024-12-01',
      excerpt: 'E-commerce platform celebrates major growth with 10 million active users worldwide, marking 150% year-over-year growth.',
      category: 'Company News',
      featured: true,
      downloadUrl: '/press/global-nexus-10m-users.pdf'
    },
    {
      id: 2,
      title: 'Global Nexus Announces AI-Powered Shopping Assistant',
      date: '2024-11-15',
      excerpt: 'Revolutionary AI technology helps customers find products faster and make better purchasing decisions.',
      category: 'Product Launch',
      featured: true,
      downloadUrl: '/press/ai-shopping-assistant.pdf'
    },
    {
      id: 3,
      title: 'Global Nexus Expands to European Markets',
      date: '2024-10-22',
      excerpt: 'Platform launches in UK, Germany, and France, bringing total market presence to 25 countries.',
      category: 'Expansion',
      featured: false,
      downloadUrl: '/press/european-expansion.pdf'
    },
    {
      id: 4,
      title: 'Global Nexus Wins "Best E-commerce Platform 2024" Award',
      date: '2024-09-18',
      excerpt: 'Recognition from TechCrunch highlights innovation in user experience and seller tools.',
      category: 'Awards',
      featured: false,
      downloadUrl: '/press/best-platform-award.pdf'
    },
    {
      id: 5,
      title: 'Global Nexus Raises $50M in Series C Funding',
      date: '2024-08-05',
      excerpt: 'Funding round led by Sequoia Capital will accelerate international expansion and AI development.',
      category: 'Funding',
      featured: true,
      downloadUrl: '/press/series-c-funding.pdf'
    }
  ];

  const mediaKit = [
    {
      type: 'Logo Package',
      description: 'High-resolution logos in various formats',
      icon: Image,
      files: ['PNG', 'SVG', 'EPS'],
      size: '2.5 MB'
    },
    {
      type: 'Product Screenshots',
      description: 'Platform screenshots and UI mockups',
      icon: Image,
      files: ['Desktop', 'Mobile', 'Tablet'],
      size: '15.8 MB'
    },
    {
      type: 'Executive Headshots',
      description: 'Professional photos of leadership team',
      icon: Users,
      files: ['CEO', 'CTO', 'CMO'],
      size: '8.2 MB'
    },
    {
      type: 'Company Fact Sheet',
      description: 'Key statistics and company information',
      icon: FileText,
      files: ['PDF', 'Word'],
      size: '245 KB'
    },
    {
      type: 'Demo Videos',
      description: 'Product demonstration and feature videos',
      icon: Video,
      files: ['MP4', 'WebM'],
      size: '125 MB'
    }
  ];

  const companyStats = [
    { label: 'Active Users', value: '10M+', icon: Users },
    { label: 'Global Markets', value: '25', icon: Globe },
    { label: 'Partner Merchants', value: '50K+', icon: Building },
    { label: 'Annual GMV', value: '$2.5B', icon: TrendingUp },
    { label: 'Team Members', value: '150+', icon: Target },
    { label: 'Years of Growth', value: '5', icon: Calendar }
  ];

  const awards = [
    {
      year: '2024',
      title: 'Best E-commerce Platform',
      organization: 'TechCrunch',
      description: 'Recognized for innovation in user experience and merchant tools'
    },
    {
      year: '2024',
      title: 'Fastest Growing Startup',
      organization: 'Forbes',
      description: 'Listed in Forbes 30 Under 30 for rapid growth and market expansion'
    },
    {
      year: '2023',
      title: 'Innovation Award',
      organization: 'E-commerce World',
      description: 'Outstanding achievement in AI-powered personalization'
    },
    {
      year: '2023',
      title: 'Best Mobile App',
      organization: 'App Store Awards',
      description: 'Excellence in mobile commerce application design'
    }
  ];

  const leadership = [
    {
      name: 'Sarah Chen',
      title: 'Chief Executive Officer',
      bio: 'Former VP of Product at Amazon, 15+ years in e-commerce',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Michael Rodriguez',
      title: 'Chief Technology Officer',
      bio: 'Ex-Google engineer, expert in scalable systems architecture',
      image: '/api/placeholder/120/120'
    },
    {
      name: 'Emily Johnson',
      title: 'Chief Marketing Officer',
      bio: 'Former Shopify marketing lead, growth and brand expert',
      image: '/api/placeholder/120/120'
    }
  ];

  const filteredReleases = pressReleases.filter(release => 
    release.date.startsWith(selectedYear)
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Newspaper className="h-16 w-16 mx-auto mb-4 text-blue-200" />
              <h1 className="text-4xl font-bold mb-4">Press Center</h1>
              <p className="text-xl text-blue-100">
                Latest news, press releases, and media resources for Global Nexus
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            Company at a Glance
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Press Releases */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                  Press Releases
                </h3>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
              </div>
              
              <div className="space-y-6">
                {filteredReleases.map((release, index) => (
                  <motion.div
                    key={release.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="border border-gray-200 dark:border-gray-700 rounded-lg p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h4 className="text-lg font-bold text-gray-900 dark:text-white">
                            {release.title}
                          </h4>
                          {release.featured && (
                            <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium flex items-center">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </span>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-500 mb-3">
                          <span className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>{new Date(release.date).toLocaleDateString()}</span>
                          </span>
                          <span className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs">
                            {release.category}
                          </span>
                        </div>
                        
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          {release.excerpt}
                        </p>
                      </div>
                      
                      <div className="ml-6 flex flex-col space-y-2">
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-2 text-sm">
                          <Download className="h-4 w-4" />
                          <span>Download</span>
                        </button>
                        <button className="border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 flex items-center space-x-2 text-sm">
                          <ExternalLink className="h-4 w-4" />
                          <span>View</span>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Media Kit */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Media Kit
              </h3>
              
              <div className="space-y-4">
                {mediaKit.map((item, index) => (
                  <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                        <item.icon className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                          {item.type}
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-2">
                          {item.description}
                        </p>
                        <div className="flex items-center justify-between">
                          <div className="flex space-x-1">
                            {item.files.map((file, idx) => (
                              <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded text-xs">
                                {file}
                              </span>
                            ))}
                          </div>
                          <span className="text-xs text-gray-500">{item.size}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <button className="w-full mt-6 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                <Download className="h-4 w-4" />
                <span>Download Complete Media Kit</span>
              </button>
            </div>

            {/* Media Contact */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                Media Contact
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Press Inquiries
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">press@globalnexus.com</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Phone className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-600 dark:text-gray-400">+1 (555) 123-PRESS</span>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    Response Time
                  </h4>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    We typically respond to media inquiries within 4 hours during business hours.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Awards & Recognition */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
              <Award className="h-6 w-6 mr-3 text-yellow-600" />
              Awards & Recognition
            </h3>
            
            <div className="space-y-4">
              {awards.map((award, index) => (
                <div key={index} className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {award.title}
                    </h4>
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                      {award.year}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                    {award.organization}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {award.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Leadership Team */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
              Leadership Team
            </h3>
            
            <div className="space-y-6">
              {leadership.map((leader, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-300 rounded-lg"></div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {leader.name}
                    </h4>
                    <p className="text-sm text-blue-600 mb-2">
                      {leader.title}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {leader.bio}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default PressPage;
