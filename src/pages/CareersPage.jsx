import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Briefcase,
  MapPin,
  Calendar,
  DollarSign,
  Users,
  Building,
  Heart,
  Coffee,
  Zap,
  Target,
  Award,
  Globe,
  ArrowRight,
  Filter,
  Search,
  Star,
  Clock,
  CheckCircle
} from 'lucide-react';

const CareersPage = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const departments = [
    { id: 'all', name: 'All Departments', count: 24 },
    { id: 'engineering', name: 'Engineering', count: 8 },
    { id: 'design', name: 'Design', count: 4 },
    { id: 'marketing', name: 'Marketing', count: 5 },
    { id: 'sales', name: 'Sales', count: 4 },
    { id: 'operations', name: 'Operations', count: 3 }
  ];

  const locations = [
    { id: 'all', name: 'All Locations' },
    { id: 'remote', name: 'Remote' },
    { id: 'san-francisco', name: 'San Francisco, CA' },
    { id: 'new-york', name: 'New York, NY' },
    { id: 'austin', name: 'Austin, TX' },
    { id: 'london', name: 'London, UK' }
  ];

  const jobOpenings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      department: 'Engineering',
      location: 'San Francisco, CA',
      type: 'Full-time',
      salary: '$120,000 - $160,000',
      postedAt: '2024-12-10',
      description: 'Join our engineering team to build cutting-edge e-commerce experiences using React, TypeScript, and modern web technologies.',
      requirements: ['5+ years React experience', 'TypeScript proficiency', 'E-commerce background preferred'],
      remote: true
    },
    {
      id: 2,
      title: 'UX/UI Designer',
      department: 'Design',
      location: 'Remote',
      type: 'Full-time',
      salary: '$90,000 - $120,000',
      postedAt: '2024-12-08',
      description: 'Create beautiful and intuitive user experiences for our global e-commerce platform.',
      requirements: ['3+ years UX/UI design', 'Figma expertise', 'E-commerce design experience'],
      remote: true
    },
    {
      id: 3,
      title: 'Digital Marketing Manager',
      department: 'Marketing',
      location: 'New York, NY',
      type: 'Full-time',
      salary: '$80,000 - $110,000',
      postedAt: '2024-12-05',
      description: 'Drive growth through innovative digital marketing strategies and campaigns.',
      requirements: ['Digital marketing experience', 'Analytics proficiency', 'Campaign management'],
      remote: false
    },
    {
      id: 4,
      title: 'DevOps Engineer',
      department: 'Engineering',
      location: 'Austin, TX',
      type: 'Full-time',
      salary: '$110,000 - $140,000',
      postedAt: '2024-12-03',
      description: 'Scale our infrastructure and improve deployment processes for high-traffic e-commerce operations.',
      requirements: ['AWS/Cloud experience', 'Docker/Kubernetes', 'CI/CD pipelines'],
      remote: true
    }
  ];

  const benefits = [
    {
      icon: Heart,
      title: 'Health & Wellness',
      description: 'Comprehensive health insurance, dental, vision, and wellness programs'
    },
    {
      icon: Coffee,
      title: 'Flexible Work',
      description: 'Remote-first culture with flexible hours and unlimited PTO'
    },
    {
      icon: Zap,
      title: 'Growth & Learning',
      description: '$2,000 annual learning budget and conference attendance'
    },
    {
      icon: Target,
      title: 'Equity & Bonuses',
      description: 'Stock options and performance-based bonuses for all employees'
    },
    {
      icon: Award,
      title: 'Recognition',
      description: 'Regular recognition programs and career advancement opportunities'
    },
    {
      icon: Globe,
      title: 'Global Impact',
      description: 'Work on products used by millions of customers worldwide'
    }
  ];

  const companyValues = [
    {
      title: 'Customer First',
      description: 'Everything we do is in service of creating amazing experiences for our customers.'
    },
    {
      title: 'Innovation',
      description: 'We constantly push boundaries and embrace new technologies to stay ahead.'
    },
    {
      title: 'Diversity & Inclusion',
      description: 'We believe diverse teams build better products and create stronger communities.'
    },
    {
      title: 'Transparency',
      description: 'Open communication and honest feedback drive our success and growth.'
    }
  ];

  const filteredJobs = jobOpenings.filter(job => {
    const matchesDepartment = selectedDepartment === 'all' || job.department.toLowerCase() === selectedDepartment;
    const matchesLocation = selectedLocation === 'all' || 
                          job.location.toLowerCase().includes(selectedLocation.replace('-', ' ')) ||
                          (selectedLocation === 'remote' && job.remote);
    const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDepartment && matchesLocation && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-green-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Briefcase className="h-16 w-16 mx-auto mb-4 text-green-200" />
              <h1 className="text-4xl font-bold mb-4">Join Our Team</h1>
              <p className="text-xl text-green-100">
                Build the future of e-commerce with passionate, talented people from around the world.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-3 gap-8 max-w-md mx-auto"
            >
              <div className="text-center">
                <div className="text-2xl font-bold">150+</div>
                <div className="text-sm text-green-200">Team Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-green-200">Open Positions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">95%</div>
                <div className="text-sm text-green-200">Employee Satisfaction</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Job Search */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Find Your Next Opportunity
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="relative">
              <input
                type="text"
                placeholder="Search positions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            
            <select
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {departments.map(dept => (
                <option key={dept.id} value={dept.id}>
                  {dept.name} ({dept.count})
                </option>
              ))}
            </select>
            
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {locations.map(location => (
                <option key={location.id} value={location.id}>
                  {location.name}
                </option>
              ))}
            </select>
          </div>
        </motion.div>

        {/* Job Listings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6 mb-12"
        >
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {filteredJobs.length} Open Positions
          </h3>
          
          {filteredJobs.map((job, index) => (
            <motion.div
              key={job.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                      {job.title}
                    </h4>
                    {job.remote && (
                      <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full text-xs font-medium">
                        Remote OK
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
                    <span className="flex items-center space-x-1">
                      <Building className="h-4 w-4" />
                      <span>{job.department}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>{job.location}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <DollarSign className="h-4 w-4" />
                      <span>{job.salary}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{job.type}</span>
                    </span>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-400 mb-4">
                    {job.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    {job.requirements.map((req, idx) => (
                      <span key={idx} className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm">
                        {req}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="ml-6 text-right">
                  <div className="text-sm text-gray-500 dark:text-gray-500 mb-4">
                    Posted {new Date(job.postedAt).toLocaleDateString()}
                  </div>
                  <button className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2">
                    <span>Apply Now</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Why Work With Us?
            </h3>
            
            <div className="grid grid-cols-1 gap-6">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                    <benefit.icon className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-1">
                      {benefit.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      {benefit.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Company Values */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8"
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Our Values
            </h3>
            
            <div className="space-y-6">
              {companyValues.map((value, index) => (
                <div key={index} className="border-l-4 border-green-500 pl-4">
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-2">
                    {value.title}
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 mt-8 text-center"
        >
          <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
          <h3 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
            Don't See the Perfect Role?
          </h3>
          <p className="text-green-700 dark:text-green-200 mb-6 max-w-2xl mx-auto">
            We're always looking for talented people to join our team. Send us your resume 
            and tell us how you'd like to contribute to Global Nexus.
          </p>
          <button className="bg-green-600 text-white px-8 py-3 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center space-x-2 mx-auto">
            <span>Send Us Your Resume</span>
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default CareersPage;
