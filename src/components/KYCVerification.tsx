import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Upload, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  Camera, 
  Scan,
  Shield,
  Building,
  CreditCard,
  Receipt,
  Award,
  Clock,
  X,
  Eye,
  Download
} from 'lucide-react'

interface KYCVerificationProps {
  userType: 'individual' | 'business'
  onComplete: (kycData: any) => void
  onSkip?: () => void
}

const KYCVerification: React.FC<KYCVerificationProps> = ({
  userType,
  onComplete,
  onSkip
}) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [uploadedDocuments, setUploadedDocuments] = useState<Record<string, File>>({})
  const [documentPreviews, setDocumentPreviews] = useState<Record<string, string>>({})
  const [verificationStatus, setVerificationStatus] = useState<Record<string, 'pending' | 'verified' | 'rejected'>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const fileInputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  const individualDocuments = [
    {
      type: 'passport',
      title: 'Government-Issued ID',
      description: 'Passport, Driver\'s License, or National ID',
      icon: CreditCard,
      required: true,
      examples: ['Passport', 'Driver\'s License', 'National ID Card']
    },
    {
      type: 'proof_of_address',
      title: 'Proof of Address',
      description: 'Utility bill or bank statement (last 3 months)',
      icon: Receipt,
      required: true,
      examples: ['Utility Bill', 'Bank Statement', 'Lease Agreement']
    }
  ]

  const businessDocuments = [
    {
      type: 'business_license',
      title: 'Business License',
      description: 'Valid business registration or license',
      icon: Award,
      required: true,
      examples: ['Business Registration', 'Trade License', 'Operating License']
    },
    {
      type: 'tax_certificate',
      title: 'Tax Certificate',
      description: 'Tax registration or EIN certificate',
      icon: FileText,
      required: true,
      examples: ['Tax Registration', 'EIN Certificate', 'VAT Certificate']
    },
    {
      type: 'bank_statement',
      title: 'Bank Statement',
      description: 'Business bank statement (last 3 months)',
      icon: Receipt,
      required: true,
      examples: ['Business Bank Statement', 'Financial Records']
    },
    {
      type: 'director_id',
      title: 'Director Identification',
      description: 'ID documents for company directors',
      icon: CreditCard,
      required: false,
      examples: ['Director\'s Passport', 'Director\'s ID Card']
    }
  ]

  const documents = userType === 'business' ? businessDocuments : individualDocuments
  const totalSteps = userType === 'business' ? 4 : 3

  const handleFileUpload = (documentType: string, file: File) => {
    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      alert('File size must be less than 10MB')
      return
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      alert('Please upload JPEG, PNG, WebP, or PDF files only')
      return
    }

    setUploadedDocuments(prev => ({ ...prev, [documentType]: file }))
    
    // Create preview for images
    if (file.type.startsWith('image/')) {
      const reader = new FileReader()
      reader.onload = (e) => {
        if (e.target?.result) {
          setDocumentPreviews(prev => ({ ...prev, [documentType]: e.target!.result as string }))
        }
      }
      reader.readAsDataURL(file)
    } else {
      setDocumentPreviews(prev => ({ ...prev, [documentType]: '/pdf-icon.png' }))
    }

    setVerificationStatus(prev => ({ ...prev, [documentType]: 'pending' }))
  }

  const removeDocument = (documentType: string) => {
    setUploadedDocuments(prev => {
      const newDocs = { ...prev }
      delete newDocs[documentType]
      return newDocs
    })
    
    setDocumentPreviews(prev => {
      const newPreviews = { ...prev }
      delete newPreviews[documentType]
      return newPreviews
    })

    setVerificationStatus(prev => {
      const newStatus = { ...prev }
      delete newStatus[documentType]
      return newStatus
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    
    try {
      // Simulate API call for KYC submission
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Mock verification results
      const newStatus: Record<string, 'verified' | 'rejected'> = {}
      Object.keys(uploadedDocuments).forEach(docType => {
        newStatus[docType] = Math.random() > 0.2 ? 'verified' : 'rejected'
      })
      
      setVerificationStatus(newStatus)
      
      // Check if all documents are verified
      const allVerified = Object.values(newStatus).every(status => status === 'verified')
      
      if (allVerified) {
        onComplete({
          status: 'verified',
          level: userType === 'business' ? 'enterprise' : 'advanced',
          documents: Object.entries(uploadedDocuments).map(([type, file]) => ({
            id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
            type,
            name: file.name,
            status: 'verified',
            uploadedAt: new Date().toISOString(),
            verifiedAt: new Date().toISOString()
          })),
          verifiedAt: new Date().toISOString(),
          expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year
        })
      } else {
        setCurrentStep(totalSteps + 1) // Move to results step
      }
    } catch (error) {
      console.error('KYC submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderDocumentUpload = (doc: any) => (
    <div key={doc.type} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <div className="flex items-start space-x-3 mb-3">
        <doc.icon className="w-6 h-6 text-blue-600 mt-1" />
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-gray-900 dark:text-white">
              {doc.title}
            </h3>
            {doc.required && (
              <span className="text-xs bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400 px-2 py-0.5 rounded">
                Required
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {doc.description}
          </p>
          <div className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            Accepted: {doc.examples.join(', ')}
          </div>
        </div>
      </div>

      {!uploadedDocuments[doc.type] ? (
        <div
          className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6
                     hover:border-blue-400 dark:hover:border-blue-500 transition-colors cursor-pointer"
          onClick={() => fileInputRefs.current[doc.type]?.click()}
        >
          <div className="text-center">
            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-500">
              JPEG, PNG, WebP, or PDF (max 10MB)
            </p>
          </div>
          <input
            ref={(el) => {
              fileInputRefs.current[doc.type] = el
            }}
            type="file"
            accept="image/jpeg,image/png,image/webp,application/pdf"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) handleFileUpload(doc.type, file)
            }}
            className="hidden"
          />
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
            <div className="flex items-center space-x-3">
              {documentPreviews[doc.type] && (
                <img
                  src={documentPreviews[doc.type]}
                  alt="Document preview"
                  className="w-12 h-12 object-cover rounded border"
                />
              )}
              <div>
                <p className="font-medium text-gray-900 dark:text-white">
                  {uploadedDocuments[doc.type].name}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {(uploadedDocuments[doc.type].size / 1024 / 1024).toFixed(2)} MB
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {verificationStatus[doc.type] === 'verified' && (
                <CheckCircle className="w-5 h-5 text-green-600" />
              )}
              {verificationStatus[doc.type] === 'rejected' && (
                <AlertCircle className="w-5 h-5 text-red-600" />
              )}
              {verificationStatus[doc.type] === 'pending' && (
                <Clock className="w-5 h-5 text-yellow-600" />
              )}
              
              <button
                onClick={() => removeDocument(doc.type)}
                className="p-1 text-gray-400 hover:text-red-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>
          
          {verificationStatus[doc.type] === 'rejected' && (
            <div className="p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <div className="flex items-center space-x-2 text-red-800 dark:text-red-400">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Document rejected</span>
              </div>
              <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                Please upload a clearer image or a different document type.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  )

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center mx-auto">
              <Shield className="w-8 h-8 text-blue-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Identity Verification Required
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto">
                {userType === 'business' 
                  ? 'To ensure secure business transactions, we need to verify your business identity and credentials.'
                  : 'To ensure secure transactions and comply with regulations, we need to verify your identity.'
                }
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                Why do we need this?
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1 text-left">
                <li>• Prevent fraud and protect your account</li>
                <li>• Comply with international regulations</li>
                <li>• Enable higher transaction limits</li>
                <li>• Access premium marketplace features</li>
                {userType === 'business' && (
                  <li>• Verify business legitimacy for buyers</li>
                )}
              </ul>
            </div>

            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-green-800 dark:text-green-400">
                  Bank-level Security
                </p>
                <p className="text-xs text-green-700 dark:text-green-300">
                  256-bit encryption
                </p>
              </div>
              
              <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg border border-purple-200 dark:border-purple-800">
                <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                <p className="text-sm font-medium text-purple-800 dark:text-purple-400">
                  Quick Process
                </p>
                <p className="text-xs text-purple-700 dark:text-purple-300">
                  Usually within 24 hours
                </p>
              </div>
            </div>
          </motion.div>
        )

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Upload Required Documents
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please upload clear, readable copies of the following documents
              </p>
            </div>

            <div className="space-y-4">
              {documents.map(renderDocumentUpload)}
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 rounded-lg p-4 border border-yellow-200 dark:border-yellow-800">
              <div className="flex items-start space-x-3">
                <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
                <div>
                  <h4 className="font-medium text-yellow-800 dark:text-yellow-400">
                    Document Guidelines
                  </h4>
                  <ul className="text-sm text-yellow-700 dark:text-yellow-300 mt-1 space-y-1">
                    <li>• Ensure documents are clear and all text is readable</li>
                    <li>• Photos should be well-lit without glare or shadows</li>
                    <li>• All four corners of the document should be visible</li>
                    <li>• Documents must be current and not expired</li>
                    <li>• File size should not exceed 10MB</li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>
        )

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Review Your Submission
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Please review the documents you've uploaded before submitting
              </p>
            </div>

            <div className="space-y-4">
              {Object.entries(uploadedDocuments).map(([docType, file]) => {
                const doc = documents.find(d => d.type === docType)
                if (!doc) return null

                return (
                  <div key={docType} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <doc.icon className="w-5 h-5 text-blue-600" />
                        <div>
                          <p className="font-medium text-gray-900 dark:text-white">
                            {doc.title}
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {file.name}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {documentPreviews[docType] && (
                          <button
                            onClick={() => {
                              // Open preview modal
                              window.open(documentPreviews[docType], '_blank')
                            }}
                            className="p-2 text-gray-400 hover:text-blue-600"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                        )}
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
              <h4 className="font-medium text-blue-900 dark:text-blue-300 mb-2">
                What happens next?
              </h4>
              <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                <li>• Your documents will be reviewed by our verification team</li>
                <li>• You'll receive an email update within 24-48 hours</li>
                <li>• Once verified, you'll have access to all platform features</li>
                <li>• Your information is stored securely and never shared</li>
              </ul>
            </div>
          </motion.div>
        )

      case 4:
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="text-center space-y-6"
          >
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Verification Complete!
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Your documents have been successfully submitted and verified.
                You now have full access to all platform features.
              </p>
            </div>

            <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
              <h4 className="font-medium text-green-800 dark:text-green-400 mb-2">
                Account Status
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="text-left">
                  <p className="text-green-700 dark:text-green-300">
                    <strong>Verification Level:</strong> {userType === 'business' ? 'Enterprise' : 'Advanced'}
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    <strong>Transaction Limit:</strong> {userType === 'business' ? '$1,000,000' : '$100,000'}
                  </p>
                </div>
                <div className="text-left">
                  <p className="text-green-700 dark:text-green-300">
                    <strong>Status:</strong> Verified ✓
                  </p>
                  <p className="text-green-700 dark:text-green-300">
                    <strong>Valid Until:</strong> {new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )

      default:
        return null
    }
  }

  const canProceed = () => {
    if (currentStep === 1) return true
    if (currentStep === 2) {
      const requiredDocs = documents.filter(d => d.required)
      return requiredDocs.every(doc => uploadedDocuments[doc.type])
    }
    if (currentStep === 3) {
      return Object.keys(uploadedDocuments).length > 0
    }
    return false
  }

  return (
    <div className="max-w-2xl mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
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

      {/* Content */}
      <AnimatePresence mode="wait">
        {renderStepContent()}
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between items-center mt-8">
        {currentStep > 1 ? (
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setCurrentStep(prev => prev - 1)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
          >
            Back
          </motion.button>
        ) : (
          <div />
        )}

        <div className="flex space-x-3">
          {onSkip && currentStep === 1 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onSkip}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
            >
              Skip for now
            </motion.button>
          )}

          {currentStep < 3 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setCurrentStep(prev => prev + 1)}
              disabled={!canProceed()}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </motion.button>
          )}

          {currentStep === 3 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              disabled={!canProceed() || isSubmitting}
              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
            >
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                  <span>Submitting...</span>
                </>
              ) : (
                <>
                  <span>Submit for Verification</span>
                  <CheckCircle className="w-4 h-4" />
                </>
              )}
            </motion.button>
          )}

          {currentStep === 4 && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onComplete({
                status: 'verified',
                level: userType === 'business' ? 'enterprise' : 'advanced',
                documents: Object.entries(uploadedDocuments).map(([type, file]) => ({
                  id: `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
                  type,
                  name: file.name,
                  status: 'verified',
                  uploadedAt: new Date().toISOString(),
                  verifiedAt: new Date().toISOString()
                })),
                verifiedAt: new Date().toISOString(),
                expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
              })}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Continue to Dashboard
            </motion.button>
          )}
        </div>
      </div>
    </div>
  )
}

export default KYCVerification