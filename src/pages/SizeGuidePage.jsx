import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Ruler,
  User,
  Shirt,
  Footprints,
  Watch,
  Calculator,
  Info,
  ChevronDown,
  ChevronUp,
  Globe,
  Smartphone,
  Monitor,
  Camera,
  Zap,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Target,
  Scale
} from 'lucide-react';

const SizeGuidePage = () => {
  const [selectedCategory, setSelectedCategory] = useState('clothing');
  const [selectedGender, setSelectedGender] = useState('unisex');
  const [selectedRegion, setSelectedRegion] = useState('US');
  const [expandedSection, setExpandedSection] = useState(null);
  const [measurements, setMeasurements] = useState({
    chest: '',
    waist: '',
    hips: '',
    height: '',
    weight: ''
  });

  const categories = [
    { id: 'clothing', name: 'Clothing', icon: Shirt },
    { id: 'shoes', name: 'Shoes', icon: Footprints },
    { id: 'accessories', name: 'Accessories', icon: Watch },
    { id: 'electronics', name: 'Electronics', icon: Smartphone }
  ];

  const clothingSizes = {
    US: {
      men: {
        XS: { chest: '32-34', waist: '26-28', neck: '13-13.5' },
        S: { chest: '34-36', waist: '28-30', neck: '14-14.5' },
        M: { chest: '38-40', waist: '32-34', neck: '15-15.5' },
        L: { chest: '42-44', waist: '36-38', neck: '16-16.5' },
        XL: { chest: '46-48', waist: '40-42', neck: '17-17.5' },
        XXL: { chest: '50-52', waist: '44-46', neck: '18-18.5' }
      },
      women: {
        XS: { bust: '31-32', waist: '24-25', hips: '34-35' },
        S: { bust: '33-34', waist: '26-27', hips: '36-37' },
        M: { bust: '35-36', waist: '28-29', hips: '38-39' },
        L: { bust: '37-39', waist: '30-32', hips: '40-42' },
        XL: { bust: '40-42', waist: '33-35', hips: '43-45' },
        XXL: { bust: '43-45', waist: '36-38', hips: '46-48' }
      }
    },
    EU: {
      men: {
        XS: { chest: '81-86', waist: '66-71', neck: '33-34' },
        S: { chest: '86-91', waist: '71-76', neck: '36-37' },
        M: { chest: '96-101', waist: '81-86', neck: '38-39' },
        L: { chest: '106-111', waist: '91-96', neck: '41-42' },
        XL: { chest: '116-121', waist: '101-106', neck: '43-44' },
        XXL: { chest: '126-131', waist: '111-116', neck: '46-47' }
      },
      women: {
        XS: { bust: '79-81', waist: '61-63', hips: '86-89' },
        S: { bust: '84-86', waist: '66-68', hips: '91-94' },
        M: { bust: '89-91', waist: '71-73', hips: '96-99' },
        L: { bust: '94-99', waist: '76-81', hips: '101-106' },
        XL: { bust: '101-106', waist: '84-89', hips: '109-114' },
        XXL: { bust: '109-114', waist: '91-96', hips: '116-121' }
      }
    }
  };

  const shoeSizes = {
    US: {
      men: [
        { us: '6', uk: '5.5', eu: '38.5', cm: '24.4' },
        { us: '7', uk: '6', eu: '40', cm: '25.4' },
        { us: '8', uk: '7', eu: '41', cm: '26.0' },
        { us: '9', uk: '8', eu: '42.5', cm: '27.0' },
        { us: '10', uk: '9', eu: '44', cm: '27.9' },
        { us: '11', uk: '10', eu: '45', cm: '28.6' },
        { us: '12', uk: '11', eu: '46', cm: '29.5' }
      ],
      women: [
        { us: '5', uk: '2.5', eu: '35', cm: '22.2' },
        { us: '6', uk: '3.5', eu: '36', cm: '23.0' },
        { us: '7', uk: '4.5', eu: '37.5', cm: '23.8' },
        { us: '8', uk: '5.5', eu: '39', cm: '24.6' },
        { us: '9', uk: '6.5', eu: '40', cm: '25.4' },
        { us: '10', uk: '7.5', eu: '41.5', cm: '26.2' },
        { us: '11', uk: '8.5', eu: '43', cm: '27.0' }
      ]
    }
  };

  const electronicsSpecs = [
    {
      category: 'Smartphones',
      items: [
        { name: 'Compact Phone', screen: '5.4"', dimensions: '131.5 x 64.2 x 7.4 mm', weight: '164g' },
        { name: 'Standard Phone', screen: '6.1"', dimensions: '146.7 x 71.5 x 7.4 mm', weight: '172g' },
        { name: 'Large Phone', screen: '6.7"', dimensions: '160.8 x 78.1 x 7.4 mm', weight: '206g' }
      ]
    },
    {
      category: 'Laptops',
      items: [
        { name: 'Ultrabook 13"', screen: '13.3"', dimensions: '304 x 212 x 16 mm', weight: '1.29kg' },
        { name: 'Laptop 15"', screen: '15.6"', dimensions: '356 x 234 x 18 mm', weight: '1.8kg' },
        { name: 'Gaming 17"', screen: '17.3"', dimensions: '398 x 262 x 23 mm', weight: '2.5kg' }
      ]
    },
    {
      category: 'Tablets',
      items: [
        { name: 'Compact Tablet', screen: '8.3"', dimensions: '195.4 x 134.8 x 6.3 mm', weight: '293g' },
        { name: 'Standard Tablet', screen: '10.9"', dimensions: '247.6 x 178.5 x 6.1 mm', weight: '462g' },
        { name: 'Pro Tablet', screen: '12.9"', dimensions: '280.6 x 214.9 x 6.4 mm', weight: '682g' }
      ]
    }
  ];

  const measurementTips = [
    {
      title: 'How to Measure Chest/Bust',
      icon: Target,
      steps: [
        'Wrap measuring tape around the fullest part of your chest/bust',
        'Keep the tape level and parallel to the floor',
        'Breathe normally and don\'t pull the tape too tight',
        'Record the measurement in inches or centimeters'
      ]
    },
    {
      title: 'How to Measure Waist',
      icon: Target,
      steps: [
        'Find your natural waistline (usually the narrowest part)',
        'Wrap the tape measure around your waist',
        'Keep the tape level and snug but not tight',
        'Make sure you can breathe comfortably'
      ]
    },
    {
      title: 'How to Measure Hips',
      icon: Target,
      steps: [
        'Stand with feet together',
        'Measure around the fullest part of your hips',
        'Keep the tape measure level all around',
        'Don\'t compress your hips with the tape'
      ]
    },
    {
      title: 'How to Measure Foot Length',
      icon: Footprints,
      steps: [
        'Place foot on a piece of paper against a wall',
        'Mark the longest toe and heel on the paper',
        'Measure the distance between the marks',
        'Measure both feet and use the larger measurement'
      ]
    }
  ];

  const sizingTips = [
    {
      icon: CheckCircle,
      title: 'Best Time to Measure',
      description: 'Measure yourself in the afternoon when your body is at its normal size'
    },
    {
      icon: Ruler,
      title: 'Use a Flexible Tape',
      description: 'A soft measuring tape gives more accurate results than a rigid ruler'
    },
    {
      icon: User,
      title: 'Wear Fitted Clothing',
      description: 'Take measurements over fitted undergarments or lightweight clothing'
    },
    {
      icon: Globe,
      title: 'Check Regional Differences',
      description: 'Sizes can vary between US, EU, UK, and Asian sizing standards'
    }
  ];

  const renderClothingSizeChart = () => {
    const genderKey = selectedGender === 'men' ? 'men' : 'women';
    const sizes = clothingSizes[selectedRegion]?.[genderKey] || {};
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                Size
              </th>
              {selectedGender === 'men' ? (
                <>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Chest ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Waist ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Neck ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                </>
              ) : (
                <>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Bust ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Waist ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                  <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                    Hips ({selectedRegion === 'US' ? 'in' : 'cm'})
                  </th>
                </>
              )}
            </tr>
          </thead>
          <tbody>
            {Object.entries(sizes).map(([size, measurements]) => (
              <tr key={size} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-200 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-white">
                  {size}
                </td>
                {Object.values(measurements).map((measurement, index) => (
                  <td key={index} className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                    {measurement}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderShoeSizeChart = () => {
    const genderKey = selectedGender === 'unisex' ? 'men' : selectedGender;
    const sizes = shoeSizes.US[genderKey] || [];
    
    return (
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-50 dark:bg-gray-700">
              <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                US Size
              </th>
              <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                UK Size
              </th>
              <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                EU Size
              </th>
              <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                Length (cm)
              </th>
            </tr>
          </thead>
          <tbody>
            {sizes.map((size, index) => (
              <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                <td className="border border-gray-200 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-white">
                  {size.us}
                </td>
                <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                  {size.uk}
                </td>
                <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                  {size.eu}
                </td>
                <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                  {size.cm}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderElectronicsSpecs = () => {
    return (
      <div className="space-y-6">
        {electronicsSpecs.map((category, index) => (
          <div key={index} className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6">
            <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {category.category}
            </h4>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-white dark:bg-gray-800">
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                      Model
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                      Screen Size
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                      Dimensions
                    </th>
                    <th className="border border-gray-200 dark:border-gray-600 p-3 text-left font-semibold text-gray-900 dark:text-white">
                      Weight
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {category.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-gray-50 dark:hover:bg-gray-600">
                      <td className="border border-gray-200 dark:border-gray-600 p-3 font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                        {item.screen}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                        {item.dimensions}
                      </td>
                      <td className="border border-gray-200 dark:border-gray-600 p-3 text-gray-600 dark:text-gray-400">
                        {item.weight}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6"
            >
              <Ruler className="h-16 w-16 mx-auto mb-4 text-purple-200" />
              <h1 className="text-4xl font-bold mb-4">Size Guide</h1>
              <p className="text-xl text-purple-100">
                Find your perfect fit with our comprehensive size charts and measurement guides.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Category Selection */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Select Category
          </h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600'
                    : 'border-gray-200 dark:border-gray-600 hover:border-purple-300'
                }`}
              >
                <category.icon className="h-8 w-8 mx-auto mb-2" />
                <span className="font-medium">{category.name}</span>
              </button>
            ))}
          </div>

          {(selectedCategory === 'clothing' || selectedCategory === 'shoes') && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Gender
                </label>
                <select
                  value={selectedGender}
                  onChange={(e) => setSelectedGender(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                >
                  <option value="unisex">Unisex</option>
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                </select>
              </div>

              {selectedCategory === 'clothing' && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Sizing Standard
                  </label>
                  <select
                    value={selectedRegion}
                    onChange={(e) => setSelectedRegion(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                  >
                    <option value="US">US Sizes</option>
                    <option value="EU">EU Sizes</option>
                  </select>
                </div>
              )}
            </div>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Size Charts */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
                {selectedCategory === 'clothing' && 'Clothing Size Chart'}
                {selectedCategory === 'shoes' && 'Shoe Size Chart'}
                {selectedCategory === 'accessories' && 'Accessories Size Guide'}
                {selectedCategory === 'electronics' && 'Electronics Specifications'}
              </h3>
              
              {selectedCategory === 'clothing' && renderClothingSizeChart()}
              {selectedCategory === 'shoes' && renderShoeSizeChart()}
              {selectedCategory === 'electronics' && renderElectronicsSpecs()}
              {selectedCategory === 'accessories' && (
                <div className="text-center py-8">
                  <Watch className="h-16 w-16 text-gray-300 dark:text-gray-600 mx-auto mb-4" />
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    Accessories Size Guide
                  </h4>
                  <p className="text-gray-600 dark:text-gray-400">
                    Accessories like watches, jewelry, and bags typically have universal sizing. 
                    Check individual product descriptions for specific measurements.
                  </p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Measurement Tips */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="space-y-6"
          >
            {/* Sizing Tips */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4">
                Sizing Tips
              </h3>
              
              <div className="space-y-4">
                {sizingTips.map((tip, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center flex-shrink-0">
                      <tip.icon className="h-4 w-4 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {tip.title}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {tip.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Size Calculator */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <Calculator className="h-5 w-5 mr-2 text-purple-600" />
                Size Calculator
              </h3>
              
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                Enter your measurements to get size recommendations:
              </p>
              
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Chest/Bust (inches)
                  </label>
                  <input
                    type="number"
                    value={measurements.chest}
                    onChange={(e) => setMeasurements({...measurements, chest: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Waist (inches)
                  </label>
                  <input
                    type="number"
                    value={measurements.waist}
                    onChange={(e) => setMeasurements({...measurements, waist: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm"
                  />
                </div>
                
                <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm">
                  Calculate Size
                </button>
              </div>
            </div>

            {/* Virtual Fitting */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 border border-purple-200 dark:border-purple-800 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-purple-900 dark:text-purple-100 mb-4 flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Virtual Try-On
              </h3>
              
              <p className="text-sm text-purple-700 dark:text-purple-200 mb-4">
                Use AR technology to virtually try on clothing and accessories.
              </p>
              
              <button className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm flex items-center justify-center space-x-2">
                <Zap className="h-4 w-4" />
                <span>Try Virtual Fitting</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Measurement Instructions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            How to Measure
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {measurementTips.map((tip, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              >
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-lg flex items-center justify-center">
                    <tip.icon className="h-5 w-5 text-purple-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {tip.title}
                    </h3>
                    <ol className="space-y-2">
                      {tip.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start space-x-3">
                          <span className="w-5 h-5 bg-purple-100 dark:bg-purple-900 text-purple-600 rounded-full text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <span className="text-sm text-gray-600 dark:text-gray-400">
                            {step}
                          </span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Return Policy Notice */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-2xl p-8 mt-8"
        >
          <div className="flex items-start space-x-4">
            <CheckCircle className="h-8 w-8 text-green-600 flex-shrink-0 mt-1" />
            <div>
              <h3 className="text-xl font-bold text-green-900 dark:text-green-100 mb-2">
                Perfect Fit Guarantee
              </h3>
              <p className="text-green-700 dark:text-green-200 mb-4">
                Still not sure about the size? Don't worry! We offer free exchanges on all items 
                within 30 days. If the size doesn't fit perfectly, we'll help you find the right one.
              </p>
              <div className="flex flex-wrap gap-3">
                <button className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm flex items-center space-x-2">
                  <span>Learn About Returns</span>
                  <ArrowRight className="h-4 w-4" />
                </button>
                <button className="border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 dark:hover:bg-green-900/30 transition-colors duration-200 text-sm">
                  Size Guide PDF
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SizeGuidePage;
