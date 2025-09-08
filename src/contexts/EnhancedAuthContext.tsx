import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { EnhancedAuthUser, AuthSession, TwoFactorAuth, DeviceFingerprint, SecurityAlert } from '../types/auth'
import { enhancedAuthService } from '../services/enhancedAuthService'

interface EnhancedAuthContextType {
  user: EnhancedAuthUser | null
  session: AuthSession | null
  isLoading: boolean
  isAuthenticated: boolean
  
  // Enhanced login methods
  loginWithEmail: (email: string, password: string, rememberDevice?: boolean) => Promise<{ success: boolean; requiresTwoFactor?: boolean; error?: string }>
  loginWithPhone: (phone: string, password: string) => Promise<{ success: boolean; error?: string }>
  loginWithSocial: (provider: string) => Promise<{ success: boolean; error?: string }>
  loginWithSSO: (token: string) => Promise<{ success: boolean; error?: string }>
  loginWithBiometric: (biometricData: any) => Promise<{ success: boolean; error?: string }>
  
  // Enhanced registration
  registerMultiChannel: (data: {
    email?: string
    phone?: string
    password: string
    name: string
    accountType: 'individual' | 'business' | 'hybrid'
    provider?: string
  }) => Promise<{ success: boolean; requiresVerification?: boolean; error?: string }>
  
  // OTP and verification
  sendOTP: (method: 'email' | 'sms' | 'voice', identifier: string) => Promise<{ success: boolean; error?: string }>
  verifyOTP: (code: string, identifier: string) => Promise<{ success: boolean; error?: string }>
  
  // Two-factor authentication
  enable2FA: (method: 'sms' | 'email' | 'authenticator') => Promise<{ success: boolean; secret?: string; backupCodes?: string[]; error?: string }>
  verify2FA: (code: string, method: string) => Promise<{ success: boolean; error?: string }>
  disable2FA: (password: string) => Promise<{ success: boolean; error?: string }>
  
  // Device management
  trustDevice: (deviceId: string) => Promise<{ success: boolean; error?: string }>
  removeDevice: (deviceId: string) => Promise<{ success: boolean; error?: string }>
  getDevices: () => Promise<DeviceFingerprint[]>
  
  // Security
  getSecurityAlerts: () => Promise<SecurityAlert[]>
  markAlertResolved: (alertId: string) => Promise<{ success: boolean; error?: string }>
  
  // Account management
  mergeAccounts: (secondaryAccountId: string) => Promise<{ success: boolean; error?: string }>
  switchRole: (newRole: string) => Promise<{ success: boolean; error?: string }>
  
  // Session management
  refreshSession: () => Promise<{ success: boolean; error?: string }>
  logout: (allDevices?: boolean) => Promise<void>
  
  // Utility methods
  checkAuth: () => void
  getCurrentDevice: () => DeviceFingerprint | null
}

const EnhancedAuthContext = createContext<EnhancedAuthContextType | undefined>(undefined)

export const useEnhancedAuth = () => {
  const context = useContext(EnhancedAuthContext)
  if (!context) {
    throw new Error('useEnhancedAuth must be used within an EnhancedAuthProvider')
  }
  return context
}

interface EnhancedAuthProviderProps {
  children: ReactNode
}

export const EnhancedAuthProvider = ({ children }: EnhancedAuthProviderProps) => {
  const [user, setUser] = useState<EnhancedAuthUser | null>(null)
  const [session, setSession] = useState<AuthSession | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  // Generate device fingerprint
  const generateDeviceFingerprint = (): DeviceFingerprint => {
    const navigator = window.navigator
    const screen = window.screen
    
    return {
      id: `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userAgent: navigator.userAgent,
      screenResolution: `${screen.width}x${screen.height}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      platform: navigator.platform,
      trusted: false,
      lastSeen: new Date().toISOString()
    }
  }

  const getCurrentDevice = () => {
    const savedDevice = localStorage.getItem('deviceFingerprint')
    if (savedDevice) {
      return JSON.parse(savedDevice)
    }
    
    const device = generateDeviceFingerprint()
    localStorage.setItem('deviceFingerprint', JSON.stringify(device))
    return device
  }

  const loginWithEmail = async (email: string, password: string, rememberDevice = false) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.loginWithEmail({ 
        email, 
        password, 
        device, 
        rememberDevice 
      })
      
      if (response.success) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
        
        if (rememberDevice) {
          device.trusted = true
          localStorage.setItem('deviceFingerprint', JSON.stringify(device))
        }
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithPhone = async (phone: string, password: string) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.loginWithPhone({ phone, password, device })
      
      if (response.success) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithSocial = async (provider: string) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.loginWithSocial({ provider, device })
      
      if (response.success) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithSSO = async (token: string) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.loginWithSSO({ token, device })
      
      if (response.success) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const loginWithBiometric = async (biometricData: any) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.loginWithBiometric({ biometricData, device })
      
      if (response.success) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const registerMultiChannel = async (data: {
    email?: string
    phone?: string
    password: string
    name: string
    accountType: 'individual' | 'business' | 'hybrid'
    provider?: string
  }) => {
    setIsLoading(true)
    try {
      const device = getCurrentDevice()
      const response = await enhancedAuthService.registerMultiChannel({ ...data, device })
      
      if (response.success && !response.requiresVerification) {
        setUser(response.user!)
        setSession(response.session!)
        localStorage.setItem('authToken', response.session!.token)
        localStorage.setItem('refreshToken', response.session!.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    } finally {
      setIsLoading(false)
    }
  }

  const sendOTP = async (method: 'email' | 'sms' | 'voice', identifier: string) => {
    try {
      return await enhancedAuthService.sendOTP({ method, identifier })
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const verifyOTP = async (code: string, identifier: string) => {
    try {
      const response = await enhancedAuthService.verifyOTP({ code, identifier })
      
      if (response.success && response.user) {
        setUser(response.user)
        if (response.session) {
          setSession(response.session)
          localStorage.setItem('authToken', response.session.token)
          localStorage.setItem('refreshToken', response.session.refreshToken)
        }
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const enable2FA = async (method: 'sms' | 'email' | 'authenticator') => {
    try {
      const response = await enhancedAuthService.enable2FA({ method })
      
      if (response.success && response.user) {
        setUser(response.user)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const verify2FA = async (code: string, method: string) => {
    try {
      return await enhancedAuthService.verify2FA({ code, method })
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const disable2FA = async (password: string) => {
    try {
      const response = await enhancedAuthService.disable2FA({ password })
      
      if (response.success && response.user) {
        setUser(response.user)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const trustDevice = async (deviceId: string) => {
    try {
      return await enhancedAuthService.trustDevice({ deviceId })
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const removeDevice = async (deviceId: string) => {
    try {
      return await enhancedAuthService.removeDevice({ deviceId })
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const getDevices = async () => {
    try {
      const response = await enhancedAuthService.getDevices()
      return response.devices || []
    } catch (error) {
      return []
    }
  }

  const getSecurityAlerts = async () => {
    try {
      const response = await enhancedAuthService.getSecurityAlerts()
      return response.alerts || []
    } catch (error) {
      return []
    }
  }

  const markAlertResolved = async (alertId: string) => {
    try {
      return await enhancedAuthService.markAlertResolved({ alertId })
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const mergeAccounts = async (secondaryAccountId: string) => {
    try {
      const response = await enhancedAuthService.mergeAccounts({ secondaryAccountId })
      
      if (response.success && response.user) {
        setUser(response.user)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const switchRole = async (newRole: string) => {
    try {
      const response = await enhancedAuthService.switchRole({ newRole })
      
      if (response.success && response.user) {
        setUser(response.user)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const refreshSession = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken')
      if (!refreshToken) {
        throw new Error('No refresh token available')
      }
      
      const response = await enhancedAuthService.refreshSession({ refreshToken })
      
      if (response.success && response.session) {
        setSession(response.session)
        localStorage.setItem('authToken', response.session.token)
        localStorage.setItem('refreshToken', response.session.refreshToken)
      }
      
      return response
    } catch (error: any) {
      return { success: false, error: error.message }
    }
  }

  const logout = async (allDevices = false) => {
    try {
      await enhancedAuthService.logout({ allDevices })
    } catch (error) {
      // Continue with local logout even if API call fails
    } finally {
      setUser(null)
      setSession(null)
      localStorage.removeItem('authToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('user')
      
      if (allDevices) {
        localStorage.removeItem('deviceFingerprint')
      }
    }
  }

  const checkAuth = () => {
    const savedUser = localStorage.getItem('user')
    const token = localStorage.getItem('authToken')
    
    if (savedUser && token) {
      try {
        const userData = JSON.parse(savedUser)
        setUser(userData)
        // Optionally verify token validity
      } catch (error) {
        // Clear invalid data
        localStorage.removeItem('user')
        localStorage.removeItem('authToken')
        localStorage.removeItem('refreshToken')
      }
    }
  }

  // Initialize auth state on mount
  useEffect(() => {
    checkAuth()
  }, [])

  // Auto-refresh session before expiry
  useEffect(() => {
    if (session) {
      const expiryTime = new Date(session.expiresAt).getTime()
      const currentTime = Date.now()
      const timeUntilExpiry = expiryTime - currentTime
      const refreshThreshold = 5 * 60 * 1000 // 5 minutes before expiry
      
      if (timeUntilExpiry > refreshThreshold) {
        const timeoutId = setTimeout(() => {
          refreshSession()
        }, timeUntilExpiry - refreshThreshold)
        
        return () => clearTimeout(timeoutId)
      }
    }
  }, [session])

  const value: EnhancedAuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user,
    loginWithEmail,
    loginWithPhone,
    loginWithSocial,
    loginWithSSO,
    loginWithBiometric,
    registerMultiChannel,
    sendOTP,
    verifyOTP,
    enable2FA,
    verify2FA,
    disable2FA,
    trustDevice,
    removeDevice,
    getDevices,
    getSecurityAlerts,
    markAlertResolved,
    mergeAccounts,
    switchRole,
    refreshSession,
    logout,
    checkAuth,
    getCurrentDevice
  }

  return (
    <EnhancedAuthContext.Provider value={value}>
      {children}
    </EnhancedAuthContext.Provider>
  )
}