import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users,
  Award,
  Shield,
  Globe,
  Heart,
  Zap,
  Target,
  TrendingUp,
  CheckCircle,
  Star,
  ArrowRight,
  Mail,
  MapPin,
  Phone
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { label: 'Happy Customers', value: '500K+', icon: Users },
    { label: 'Products Sold', value: '2M+', icon: Award },
    { label: 'Countries Served', value: '50+', icon: Globe },
    { label: 'Years of Excellence', value: '10+', icon: Star }
  ];

  const values = [
    {
      icon: Shield,
      title: 'Trust & Security',
      description: 'Your security is our priority. We use industry-leading encryption and security measures to protect your data and transactions.'
    },
    {
      icon: Heart,
      title: 'Customer First',
      description: 'Every decision we make puts our customers first. Your satisfaction and experience are at the heart of everything we do.'
    },
    {
      icon: Zap,
      title: 'Innovation',
      description: 'We continuously innovate to bring you the latest technology and features that enhance your shopping experience.'
    },
    {
      icon: Target,
      title: 'Quality Focus',
      description: 'We partner with trusted brands and vendors to ensure every product meets our high standards for quality and reliability.'
    }
  ];

  const timeline = [
    {
      year: '2014',
      title: 'Company Founded',
      description: 'Started as a small online marketplace with a vision to connect buyers and sellers worldwide.'
    },
    {
      year: '2016',
      title: 'Global Expansion',
      description: 'Expanded operations to 15 countries, establishing our international presence.'
    },
    {
      year: '2018',
      title: 'AI Integration',
      description: 'Introduced AI-powered recommendations and personalized shopping experiences.'
    },
    {
      year: '2020',
      title: 'Pandemic Support',
      description: 'Pivoted to support essential services and helped businesses transition online during COVID-19.'
    },
    {
      year: '2022',
      title: 'Sustainability Initiative',
      description: 'Launched our green shipping program and carbon-neutral delivery options.'
    },
    {
      year: '2024',
      title: 'Future Ready',
      description: 'Continuing to innovate with AR/VR shopping, blockchain verification, and quantum security.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Chief Executive Officer',
      image: '/api/placeholder/150/150',
      bio: 'Former VP at Amazon with 15 years of e-commerce experience.'
    },
    {
      name: 'Michael Chen',
      role: 'Chief Technology Officer',
      image: '/api/placeholder/150/150',
      bio: 'Ex-Google engineer specializing in scalable marketplace platforms.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Chief Marketing Officer',
      image: '/api/placeholder/150/150',
      bio: 'Digital marketing expert with a track record of building global brands.'
    },
    {
      name: 'David Kim',
      role: 'Chief Operations Officer',
      image: '/api/placeholder/150/150',
      bio: 'Supply chain optimization specialist with international logistics expertise.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl font-bold mb-6">About Global Nexus</h1>
            <p className="text-xl opacity-90 mb-8 max-w-3xl mx-auto">
              We're building the future of e-commerce, connecting millions of customers with quality products 
              and trusted sellers worldwide through innovative technology and exceptional service.
            </p>
            <div className="flex justify-center">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
                <p className="text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                To democratize commerce by providing a trusted, innovative, and accessible platform that 
                empowers businesses of all sizes to reach global markets while delivering exceptional 
                shopping experiences to customers worldwide.
              </p>
              <div className="space-y-4">
                {[
                  'Connecting businesses with global opportunities',
                  'Ensuring secure and reliable transactions',
                  'Promoting sustainable and ethical commerce',
                  'Delivering exceptional customer experiences'
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="relative"
            >
              <img
                src="/api/placeholder/600/400"
                alt="Our Mission"
                className="rounded-lg shadow-lg"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-lg"></div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              These core values guide every decision we make and shape the culture of our organization.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gray-50 rounded-lg p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                      <value.icon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{value.title}</h3>
                    <p className="text-gray-600 leading-relaxed">{value.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Journey</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              From a startup vision to a global marketplace, here's how we've grown over the years.
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 transform -translate-x-0.5 w-1 h-full bg-blue-200"></div>
            
            <div className="space-y-8">
              {timeline.map((event, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'justify-start' : 'justify-end'
                  }`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-blue-600 rounded-full border-4 border-white z-10"></div>
                  
                  {/* Content */}
                  <div className={`w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-white rounded-lg p-6 shadow-md">
                      <div className="text-2xl font-bold text-blue-600 mb-2">{event.year}</div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                      <p className="text-gray-600">{event.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Leadership Team</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Meet the experienced leaders driving our vision and innovation forward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-3xl font-bold mb-4">Ready to Join Our Journey?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Whether you're a customer, seller, or looking to join our team, we'd love to connect with you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors flex items-center justify-center">
                Start Shopping
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors">
                Become a Seller
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Contact Information */}
      <div className="py-12 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <MapPin className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2">Global Headquarters</h3>
              <p className="text-gray-300">San Francisco, CA, USA</p>
            </div>
            <div className="flex flex-col items-center">
              <Phone className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-gray-300">+1 (555) 123-4567</p>
            </div>
            <div className="flex flex-col items-center">
              <Mail className="w-8 h-8 mb-3 text-blue-400" />
              <h3 className="font-semibold mb-2">Email Us</h3>
              <p className="text-gray-300">info@globalnexus.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
