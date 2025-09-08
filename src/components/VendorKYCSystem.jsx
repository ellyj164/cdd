import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Upload, 
  FileText, 
  User, 
  Building, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  Camera, 
  Calendar,
  Star,
  TrendingUp,
  DollarSign,
  Package,
  Users,
  Settings,
  Globe,
  Award,
  Zap,
  Lock,
  Eye,
  Download,
  RefreshCw,
  X,
  Check,
  AlertCircle,
  Info
} from 'lucide-react';

// Enhanced Vendor Management and KYC System
export const VendorKYCSystem = ({ 
  vendorId, 
  onStatusUpdate, 
  onDocumentUpload,
  adminView = false 
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [kycData, setKycData] = useState({});
  const [verificationStatus, setVerificationStatus] = useState('pending');
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);

  // KYC verification levels and requirements
  const verificationLevels = [
    {
      level: 1,
      name: 'Basic Verification',
      status: 'completed',
      requirements: [
        'Email verification',
        'Phone number verification',
        'Basic business information'
      ],
      benefits: [
        'List up to 10 products',
        'Basic seller dashboard',
        'Standard payment processing'
      ]
    },
    {
      level: 2,
      name: 'Identity Verification',
      status: 'completed',
      requirements: [
        'Government-issued ID',
        'Proof of address',
        'Business registration documents'
      ],
      benefits: [
        'List up to 100 products',
        'Advanced analytics',
        'Priority customer support'
      ]
    },
    {
      level: 3,
      name: 'Business Verification',
      status: 'in-progress',
      requirements: [
        'Tax identification documents',
        'Bank account verification',
        'Business license verification'
      ],
      benefits: [
        'Unlimited product listings',
        'Premium seller badge',
        'Access to bulk tools'
      ]
    },
    {
      level: 4,
      name: 'Premium Verification',
      status: 'pending',
      requirements: [
        'Financial statements',
        'Insurance documentation',
        'Quality certifications'
      ],
      benefits: [
        'Featured placement',
        'VIP support channel',
        'Custom branding options'
      ]
    }
  ];

  const documentTypes = [
    {
      id: 'government-id',
      name: 'Government ID',
      description: 'Passport, Driver\'s License, or National ID',
      required: true,
      level: 2,
      formats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB'
    },
    {
      id: 'proof-of-address',
      name: 'Proof of Address',
      description: 'Utility bill, Bank statement (last 3 months)',
      required: true,
      level: 2,
      formats: ['PDF', 'JPG', 'PNG'],
      maxSize: '5MB'
    },
    {
      id: 'business-registration',
      name: 'Business Registration',
      description: 'Certificate of incorporation or business license',
      required: true,
      level: 2,
      formats: ['PDF'],
      maxSize: '10MB'
    },
    {
      id: 'tax-documents',
      name: 'Tax Documents',
      description: 'Tax ID, VAT registration, EIN documentation',
      required: true,
      level: 3,
      formats: ['PDF'],
      maxSize: '10MB'
    },
    {
      id: 'bank-verification',
      name: 'Bank Account Verification',
      description: 'Bank statement or account verification letter',
      required: true,
      level: 3,
      formats: ['PDF'],
      maxSize: '10MB'
    },
    {
      id: 'financial-statements',
      name: 'Financial Statements',
      description: 'Audited financial statements (last 2 years)',
      required: false,
      level: 4,
      formats: ['PDF'],
      maxSize: '25MB'
    },
    {
      id: 'insurance-docs',
      name: 'Insurance Documentation',
      description: 'Business liability insurance certificate',
      required: false,
      level: 4,
      formats: ['PDF'],
      maxSize: '10MB'
    }
  ];

  // Load vendor data
  useEffect(() => {
    const loadVendorData = async () => {
      setLoading(true);
      
      // Mock vendor KYC data
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setKycData({
        personalInfo: {
          firstName: 'John',
          lastName: 'Smith',
          email: 'john@example.com',
          phone: '+1-555-0123',
          dateOfBirth: '1985-06-15',
          nationality: 'United States'
        },
        businessInfo: {
          companyName: 'Smith Electronics Ltd.',
          businessType: 'Corporation',
          registrationNumber: 'REG123456789',
          taxId: 'TAX987654321',
          establishedDate: '2020-03-15',
          employees: '10-50',
          industry: 'Electronics',
          website: 'https://smithelectronics.com'
        },
        addressInfo: {
          street: '123 Business Ave',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'United States'
        },
        financialInfo: {
          monthlyRevenue: '$50,000 - $100,000',
          bankName: 'First National Bank',
          accountType: 'Business Checking'
        }
      });

      setDocuments([
        {
          id: 1,
          type: 'government-id',
          name: 'passport_john_smith.pdf',
          status: 'approved',
          uploadedAt: new Date('2024-01-15'),
          reviewedAt: new Date('2024-01-16'),
          reviewedBy: 'Admin Team',
          notes: 'Document verified successfully'
        },
        {
          id: 2,
          type: 'proof-of-address',
          name: 'utility_bill_jan2024.pdf',
          status: 'approved',
          uploadedAt: new Date('2024-01-15'),
          reviewedAt: new Date('2024-01-16'),
          reviewedBy: 'Admin Team',
          notes: 'Address confirmed'
        },
        {
          id: 3,
          type: 'business-registration',
          name: 'business_license.pdf',
          status: 'under-review',
          uploadedAt: new Date('2024-01-20'),
          reviewedAt: null,
          reviewedBy: null,
          notes: null
        }
      ]);

      setVerificationStatus('level-2');
      setLoading(false);
    };

    loadVendorData();
  }, [vendorId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100';
      case 'in-progress': return 'text-yellow-600 bg-yellow-100';
      case 'pending': return 'text-gray-600 bg-gray-100';
      case 'rejected': return 'text-red-600 bg-red-100';
      case 'approved': return 'text-green-600 bg-green-100';
      case 'under-review': return 'text-blue-600 bg-blue-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
      case 'approved':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'in-progress':
      case 'under-review':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'pending':
        return <AlertTriangle className="h-5 w-5 text-yellow-600" />;
      case 'rejected':
        return <X className="h-5 w-5 text-red-600" />;
      default:
        return <Info className="h-5 w-5 text-gray-600" />;
    }
  };

  const currentLevel = verificationLevels.find(level => 
    verificationStatus === `level-${level.level}`
  ) || verificationLevels[0];

  const completedLevels = verificationLevels.filter(level => level.status === 'completed').length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading verification data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Vendor Verification Center
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Manage your business verification and compliance documents
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className={`px-4 py-2 rounded-full ${getStatusColor(currentLevel.status)} font-medium`}>
              Level {currentLevel.level} - {currentLevel.name}
            </div>
            {adminView && (
              <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Settings className="h-4 w-4 mr-2 inline" />
                Admin Actions
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Verification Progress */}
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 shadow-sm border border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold">Verification Progress</h2>
          <span className="text-sm text-gray-500">
            {completedLevels} of {verificationLevels.length} levels completed
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {verificationLevels.map((level, index) => {
            const isCompleted = level.status === 'completed';
            const isInProgress = level.status === 'in-progress';
            const isCurrent = currentLevel.level === level.level;
            
            return (
              <div key={level.level} className={`relative p-4 rounded-lg border-2 transition-all ${
                isCompleted 
                  ? 'border-green-200 bg-green-50 dark:bg-green-900/20 dark:border-green-800' 
                  : isInProgress || isCurrent
                    ? 'border-blue-200 bg-blue-50 dark:bg-blue-900/20 dark:border-blue-800'
                    : 'border-gray-200 bg-gray-50 dark:bg-gray-700 dark:border-gray-600'
              }`}>
                <div className="flex items-center space-x-3 mb-3">
                  <div className={`p-2 rounded-full ${
                    isCompleted 
                      ? 'bg-green-100 dark:bg-green-800' 
                      : isInProgress || isCurrent
                        ? 'bg-blue-100 dark:bg-blue-800'
                        : 'bg-gray-100 dark:bg-gray-600'
                  }`}>
                    {getStatusIcon(level.status)}
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">
                      Level {level.level}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {level.name}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  {level.requirements.slice(0, 2).map((req, reqIndex) => (
                    <div key={reqIndex} className="flex items-center space-x-2">
                      <div className={`h-2 w-2 rounded-full ${
                        isCompleted ? 'bg-green-500' : 'bg-gray-300'
                      }`} />
                      <span className="text-xs text-gray-600 dark:text-gray-400">{req}</span>
                    </div>
                  ))}
                  {level.requirements.length > 2 && (
                    <p className="text-xs text-gray-500">
                      +{level.requirements.length - 2} more requirements
                    </p>
                  )}
                </div>

                {index < verificationLevels.length - 1 && (
                  <div className="absolute -right-2 top-1/2 transform -translate-y-1/2 hidden lg:block">
                    <div className={`h-0.5 w-4 ${isCompleted ? 'bg-green-500' : 'bg-gray-300'}`} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
        {[
          { id: 'overview', label: 'Overview', icon: Eye },
          { id: 'documents', label: 'Documents', icon: FileText },
          { id: 'personal', label: 'Personal Info', icon: User },
          { id: 'business', label: 'Business Info', icon: Building },
          { id: 'financial', label: 'Financial Info', icon: CreditCard },
          ...(adminView ? [{ id: 'admin', label: 'Admin Review', icon: Shield }] : [])
        ].map(tab => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                isActive 
                  ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm' 
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="font-medium hidden sm:inline">{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div className="min-h-96">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Verification Status */}
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Current Status</h3>
                <div className="space-y-4">
                  {verificationLevels.map(level => (
                    <div key={level.level} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                      <div className="flex items-center space-x-3">
                        {getStatusIcon(level.status)}
                        <div>
                          <h4 className="font-medium">Level {level.level}: {level.name}</h4>
                          <p className="text-sm text-gray-500">{level.requirements.length} requirements</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(level.status)}`}>
                        {level.status.replace('-', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-4">Next Steps</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3 p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Upload className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-blue-900 dark:text-blue-100">Upload Business License</h4>
                      <p className="text-sm text-blue-700 dark:text-blue-300">
                        Complete your Level 3 verification by uploading your business license
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                    <Calendar className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-yellow-900 dark:text-yellow-100">Schedule Verification Call</h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300">
                        Book a 15-minute call with our verification team for Level 4
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Sidebar */}
            <div className="space-y-6">
              <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl p-6 text-white">
                <div className="flex items-center space-x-3 mb-4">
                  <Award className="h-8 w-8" />
                  <h3 className="text-xl font-bold">Current Benefits</h3>
                </div>
                <ul className="space-y-2">
                  {currentLevel.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-center space-x-2">
                      <Check className="h-4 w-4" />
                      <span className="text-sm">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-bold mb-4">Verification Tips</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-3">
                    <Camera className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">High Quality Images</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Ensure documents are clear and readable
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Secure Upload</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        All documents are encrypted and secure
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-3">
                    <Clock className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium">Quick Review</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        Most documents reviewed within 24-48 hours
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'documents' && (
          <div className="space-y-6">
            {/* Document Upload Section */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Required Documents</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {documentTypes.map(docType => {
                  const uploadedDoc = documents.find(doc => doc.type === docType.id);
                  
                  return (
                    <div key={docType.id} className="border border-gray-200 dark:border-gray-600 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium flex items-center">
                            {docType.name}
                            {docType.required && <span className="text-red-500 ml-1">*</span>}
                          </h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            {docType.description}
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            Formats: {docType.formats.join(', ')} • Max size: {docType.maxSize}
                          </p>
                        </div>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          docType.required ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
                        }`}>
                          Level {docType.level}
                        </span>
                      </div>

                      {uploadedDoc ? (
                        <div className="space-y-3">
                          <div className={`p-3 rounded-lg border ${
                            uploadedDoc.status === 'approved' 
                              ? 'border-green-200 bg-green-50' 
                              : uploadedDoc.status === 'under-review'
                                ? 'border-blue-200 bg-blue-50'
                                : 'border-red-200 bg-red-50'
                          }`}>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                {getStatusIcon(uploadedDoc.status)}
                                <span className="font-medium">{uploadedDoc.name}</span>
                              </div>
                              <div className="flex items-center space-x-2">
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <Eye className="h-4 w-4" />
                                </button>
                                <button className="p-1 hover:bg-gray-200 rounded">
                                  <Download className="h-4 w-4" />
                                </button>
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mt-1">
                              Uploaded: {uploadedDoc.uploadedAt.toLocaleDateString()}
                            </p>
                            {uploadedDoc.notes && (
                              <p className="text-sm text-gray-600 mt-1">
                                Notes: {uploadedDoc.notes}
                              </p>
                            )}
                          </div>
                          <button className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
                            Replace Document
                          </button>
                        </div>
                      ) : (
                        <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 text-center">
                          <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
                            Drag and drop or click to upload
                          </p>
                          <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm">
                            Choose File
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Document History */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-4">Document History</h3>
              <div className="space-y-4">
                {documents.map(doc => (
                  <div key={doc.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="flex items-center space-x-3">
                      {getStatusIcon(doc.status)}
                      <div>
                        <h4 className="font-medium">{doc.name}</h4>
                        <p className="text-sm text-gray-500">
                          {documentTypes.find(type => type.id === doc.type)?.name}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getStatusColor(doc.status)}`}>
                        {doc.status.replace('-', ' ')}
                      </span>
                      <p className="text-sm text-gray-500 mt-1">
                        {doc.uploadedAt.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'personal' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(kycData.personalInfo || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={key.includes('email') ? 'email' : key.includes('Date') ? 'date' : 'text'}
                    value={value}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'business' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">Business Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(kycData.businessInfo || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type={key.includes('Date') ? 'date' : key.includes('website') ? 'url' : 'text'}
                    value={value}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'financial' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-xl font-bold mb-6">Financial Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {Object.entries(kycData.financialInfo || {}).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}
                  </label>
                  <input
                    type="text"
                    value={value}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-700"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'admin' && adminView && (
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-bold mb-6">Admin Review Panel</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold mb-4">Pending Reviews</h4>
                  <div className="space-y-3">
                    {documents.filter(doc => doc.status === 'under-review').map(doc => (
                      <div key={doc.id} className="p-4 border border-blue-200 bg-blue-50 rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h5 className="font-medium">{doc.name}</h5>
                          <span className="text-sm text-blue-600">Pending Review</span>
                        </div>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                            Approve
                          </button>
                          <button className="px-3 py-1 bg-red-600 text-white rounded text-sm hover:bg-red-700">
                            Reject
                          </button>
                          <button className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700">
                            Request Info
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div>
                  <h4 className="font-bold mb-4">Verification Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full p-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center space-x-2">
                      <CheckCircle className="h-5 w-5" />
                      <span>Approve Level 3</span>
                    </button>
                    <button className="w-full p-3 bg-yellow-600 text-white rounded-lg hover:bg-yellow-700 flex items-center justify-center space-x-2">
                      <Clock className="h-5 w-5" />
                      <span>Request Additional Info</span>
                    </button>
                    <button className="w-full p-3 bg-red-600 text-white rounded-lg hover:bg-red-700 flex items-center justify-center space-x-2">
                      <X className="h-5 w-5" />
                      <span>Suspend Account</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VendorKYCSystem;