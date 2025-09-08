import axios from 'axios'
import { EnhancedAuthUser, AuthSession, DeviceFingerprint, SecurityAlert } from '../types/auth'

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api'

// Create axios instance for enhanced auth
const authApi = axios.create({
  baseURL: `${API_BASE_URL}/v1/auth`,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor to add auth token
authApi.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// Response interceptor for error handling
authApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Handle token refresh or logout
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
        localStorage.removeItem('user')
      }
    }
    return Promise.reject(error)
  }
)

export const enhancedAuthService = {
  // Enhanced login methods
  loginWithEmail: async (data: {
    email: string
    password: string
    device: DeviceFingerprint
    rememberDevice?: boolean
  }) => {
    try {
      const response = await authApi.post('/login/email', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession,
        requiresTwoFactor: response.data.requiresTwoFactor
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Login failed'
      }
    }
  },

  loginWithPhone: async (data: {
    phone: string
    password: string
    device: DeviceFingerprint
  }) => {
    try {
      const response = await authApi.post('/login/phone', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Phone login failed'
      }
    }
  },

  loginWithSocial: async (data: {
    provider: string
    device: DeviceFingerprint
  }) => {
    try {
      const response = await authApi.post('/login/social', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Social login failed'
      }
    }
  },

  loginWithSSO: async (data: {
    token: string
    device: DeviceFingerprint
  }) => {
    try {
      const response = await authApi.post('/login/sso', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'SSO login failed'
      }
    }
  },

  loginWithBiometric: async (data: {
    biometricData: any
    device: DeviceFingerprint
  }) => {
    try {
      const response = await authApi.post('/login/biometric', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Biometric login failed'
      }
    }
  },

  // Enhanced registration
  registerMultiChannel: async (data: {
    email?: string
    phone?: string
    password: string
    name: string
    accountType: 'individual' | 'business' | 'hybrid'
    provider?: string
    device: DeviceFingerprint
  }) => {
    try {
      const response = await authApi.post('/register/multi-channel', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession,
        requiresVerification: response.data.requiresVerification
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Registration failed'
      }
    }
  },

  // OTP and verification
  sendOTP: async (data: {
    method: 'email' | 'sms' | 'voice'
    identifier: string
  }) => {
    try {
      const response = await authApi.post('/otp/send', data)
      return {
        success: true,
        message: response.data.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to send OTP'
      }
    }
  },

  verifyOTP: async (data: {
    code: string
    identifier: string
  }) => {
    try {
      const response = await authApi.post('/otp/verify', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'OTP verification failed'
      }
    }
  },

  // Two-factor authentication
  enable2FA: async (data: {
    method: 'sms' | 'email' | 'authenticator'
  }) => {
    try {
      const response = await authApi.post('/2fa/enable', data)
      return {
        success: true,
        secret: response.data.secret,
        backupCodes: response.data.backupCodes,
        user: response.data.user as EnhancedAuthUser
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to enable 2FA'
      }
    }
  },

  verify2FA: async (data: {
    code: string
    method: string
  }) => {
    try {
      const response = await authApi.post('/2fa/verify', data)
      return {
        success: true,
        message: response.data.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || '2FA verification failed'
      }
    }
  },

  disable2FA: async (data: {
    password: string
  }) => {
    try {
      const response = await authApi.post('/2fa/disable', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to disable 2FA'
      }
    }
  },

  // Device management
  trustDevice: async (data: {
    deviceId: string
  }) => {
    try {
      const response = await authApi.post('/devices/trust', data)
      return {
        success: true,
        message: response.data.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to trust device'
      }
    }
  },

  removeDevice: async (data: {
    deviceId: string
  }) => {
    try {
      const response = await authApi.delete(`/devices/${data.deviceId}`)
      return {
        success: true,
        message: response.data.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to remove device'
      }
    }
  },

  getDevices: async () => {
    try {
      const response = await authApi.get('/devices')
      return {
        success: true,
        devices: response.data.devices as DeviceFingerprint[]
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get devices'
      }
    }
  },

  // Security
  getSecurityAlerts: async () => {
    try {
      const response = await authApi.get('/security/alerts')
      return {
        success: true,
        alerts: response.data.alerts as SecurityAlert[]
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get security alerts'
      }
    }
  },

  markAlertResolved: async (data: {
    alertId: string
  }) => {
    try {
      const response = await authApi.patch(`/security/alerts/${data.alertId}/resolve`)
      return {
        success: true,
        message: response.data.message
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to resolve alert'
      }
    }
  },

  // Account management
  mergeAccounts: async (data: {
    secondaryAccountId: string
  }) => {
    try {
      const response = await authApi.post('/accounts/merge', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to merge accounts'
      }
    }
  },

  switchRole: async (data: {
    newRole: string
  }) => {
    try {
      const response = await authApi.post('/accounts/switch-role', data)
      return {
        success: true,
        user: response.data.user as EnhancedAuthUser
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to switch role'
      }
    }
  },

  // Session management
  refreshSession: async (data: {
    refreshToken: string
  }) => {
    try {
      const response = await authApi.post('/session/refresh', data)
      return {
        success: true,
        session: response.data.session as AuthSession
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to refresh session'
      }
    }
  },

  logout: async (data: {
    allDevices?: boolean
  }) => {
    try {
      await authApi.post('/logout', data)
      return {
        success: true
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Logout failed'
      }
    }
  },

  // KYC verification
  submitKYCDocument: async (data: {
    type: string
    file: File
    metadata?: Record<string, any>
  }) => {
    try {
      const formData = new FormData()
      formData.append('type', data.type)
      formData.append('file', data.file)
      if (data.metadata) {
        formData.append('metadata', JSON.stringify(data.metadata))
      }

      const response = await authApi.post('/kyc/documents', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      
      return {
        success: true,
        document: response.data.document
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'KYC document submission failed'
      }
    }
  },

  getKYCStatus: async () => {
    try {
      const response = await authApi.get('/kyc/status')
      return {
        success: true,
        kyc: response.data.kyc
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get KYC status'
      }
    }
  },

  // Onboarding
  saveOnboardingProgress: async (data: {
    step: number
    data: Record<string, any>
  }) => {
    try {
      const response = await authApi.post('/onboarding/progress', data)
      return {
        success: true,
        progress: response.data.progress
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to save onboarding progress'
      }
    }
  },

  getOnboardingProgress: async () => {
    try {
      const response = await authApi.get('/onboarding/progress')
      return {
        success: true,
        progress: response.data.progress
      }
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Failed to get onboarding progress'
      }
    }
  }
}