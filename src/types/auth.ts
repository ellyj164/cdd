// Enhanced authentication types for enterprise features
export interface AuthProvider {
  id: string
  name: string
  type: 'email' | 'phone' | 'social' | 'sso' | 'biometric'
  icon?: string
  enabled: boolean
}

export interface OTPConfiguration {
  method: 'email' | 'sms' | 'voice' | 'authenticator'
  expiryMinutes: number
  maxAttempts: number
  backoffStrategy: 'linear' | 'exponential'
  cooldownMinutes: number
}

export interface TwoFactorAuth {
  enabled: boolean
  methods: ('sms' | 'email' | 'authenticator' | 'biometric')[]
  backupCodes: string[]
  lastUsed?: string
}

export interface DeviceFingerprint {
  id: string
  userAgent: string
  screenResolution: string
  timezone: string
  language: string
  platform: string
  trusted: boolean
  lastSeen: string
  location?: {
    country: string
    city: string
    ip: string
  }
}

export interface SecurityAlert {
  id: string
  type: 'login_anomaly' | 'new_device' | 'location_change' | 'failed_attempts' | 'password_change'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  timestamp: string
  resolved: boolean
  device?: DeviceFingerprint
}

export interface AccountMergeRequest {
  id: string
  primaryAccountId: string
  secondaryAccountId: string
  mergeType: 'email' | 'social' | 'phone'
  status: 'pending' | 'approved' | 'rejected' | 'completed'
  requestedAt: string
  conflictResolution?: Record<string, any>
}

export interface KYCVerification {
  status: 'unverified' | 'pending' | 'verified' | 'rejected'
  level: 'basic' | 'intermediate' | 'advanced' | 'enterprise'
  documents: KYCDocument[]
  verifiedAt?: string
  expiresAt?: string
  reason?: string
}

export interface KYCDocument {
  id: string
  type: 'passport' | 'license' | 'tax_id' | 'business_license' | 'bank_statement'
  status: 'pending' | 'verified' | 'rejected'
  uploadedAt: string
  verifiedAt?: string
  reason?: string
}

export interface OnboardingProgress {
  currentStep: number
  totalSteps: number
  completedSteps: string[]
  skippedSteps: string[]
  data: Record<string, any>
  saveAndResumeToken?: string
  lastActivity: string
}

export interface EnhancedAuthUser {
  id: string
  email: string
  phone?: string
  role: 'customer' | 'vendor' | 'admin' | 'enterprise'
  accountType: 'individual' | 'business' | 'hybrid'
  verified: {
    email: boolean
    phone: boolean
    identity: boolean
  }
  twoFactor: TwoFactorAuth
  kyc: KYCVerification
  onboarding: OnboardingProgress
  devices: DeviceFingerprint[]
  securityAlerts: SecurityAlert[]
  socialProviders: string[]
  lastLogin: string
  createdAt: string
  updatedAt: string
}

export interface AuthSession {
  id: string
  userId: string
  token: string
  refreshToken: string
  device: DeviceFingerprint
  expiresAt: string
  lastActivity: string
  ipAddress: string
  location: {
    country: string
    city: string
  }
}

export interface LoginAttempt {
  id: string
  email: string
  success: boolean
  reason?: string
  device: DeviceFingerprint
  timestamp: string
  ipAddress: string
  location: {
    country: string
    city: string
  }
}