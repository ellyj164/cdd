// Authentication utility functions

export function generateOTP(length = 6): string {
  const digits = '0123456789'
  let otp = ''
  for (let i = 0; i < length; i++) {
    otp += digits.charAt(Math.floor(Math.random() * digits.length))
  }
  return otp
}

export function generateSecretKey(): string {
  return Math.random().toString(36).substr(2, 32).toUpperCase()
}

export function generateBackupCodes(count = 10): string[] {
  const codes = []
  for (let i = 0; i < count; i++) {
    codes.push(generateOTP(8))
  }
  return codes
}

export async function sendSMS(phone: string, message: string): Promise<boolean> {
  try {
    // In production, integrate with SMS provider like Twilio
    console.log(`Sending SMS to ${phone}: ${message}`)
    
    // Mock successful send
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  } catch (error) {
    console.error('SMS send error:', error)
    return false
  }
}

export async function sendEmail(email: string, subject: string, content: string): Promise<boolean> {
  try {
    // In production, integrate with email provider like SendGrid
    console.log(`Sending email to ${email}: ${subject} - ${content}`)
    
    // Mock successful send
    await new Promise(resolve => setTimeout(resolve, 1000))
    return true
  } catch (error) {
    console.error('Email send error:', error)
    return false
  }
}

export async function sendVoiceCall(phone: string, message: string): Promise<boolean> {
  try {
    // In production, integrate with voice provider
    console.log(`Sending voice call to ${phone}: ${message}`)
    
    // Mock successful send
    await new Promise(resolve => setTimeout(resolve, 2000))
    return true
  } catch (error) {
    console.error('Voice call error:', error)
    return false
  }
}

export function verifyOTP(provided: string, stored: string, expiryTime: number): boolean {
  if (Date.now() > expiryTime) {
    return false
  }
  return provided === stored
}

export function hashPassword(password: string): string {
  // In production, use bcrypt or similar
  return `hashed_${password}`
}

export function verifyPassword(password: string, hash: string): boolean {
  // In production, use bcrypt.compare
  return hash === `hashed_${password}`
}

export function generateJWT(payload: any, expiresIn = '24h'): string {
  // In production, use jsonwebtoken library
  const token = Buffer.from(JSON.stringify({
    ...payload,
    exp: Date.now() + (24 * 60 * 60 * 1000) // 24 hours
  })).toString('base64')
  
  return `jwt.${token}.signature`
}

export function verifyJWT(token: string): any {
  try {
    // In production, use jsonwebtoken library
    const [, payload] = token.split('.')
    const decoded = JSON.parse(Buffer.from(payload, 'base64').toString())
    
    if (Date.now() > decoded.exp) {
      throw new Error('Token expired')
    }
    
    return decoded
  } catch (error) {
    throw new Error('Invalid token')
  }
}

export function detectLoginAnomaly(
  currentLogin: any,
  previousLogins: any[]
): boolean {
  if (previousLogins.length === 0) return false
  
  const recentLogins = previousLogins.slice(-10)
  
  // Check for unusual location
  const usualCountries = new Set(recentLogins.map(l => l.location?.country))
  if (!usualCountries.has(currentLogin.location?.country)) {
    return true
  }
  
  // Check for unusual time
  const currentHour = new Date().getHours()
  const usualHours = recentLogins.map(l => new Date(l.timestamp).getHours())
  const averageHour = usualHours.reduce((a, b) => a + b, 0) / usualHours.length
  
  if (Math.abs(currentHour - averageHour) > 6) {
    return true
  }
  
  return false
}

export function calculateRiskScore(factors: {
  newDevice: boolean
  newLocation: boolean
  unusualTime: boolean
  failedAttempts: number
  vpnDetected: boolean
}): number {
  let score = 0
  
  if (factors.newDevice) score += 20
  if (factors.newLocation) score += 30
  if (factors.unusualTime) score += 10
  if (factors.failedAttempts > 3) score += 25
  if (factors.vpnDetected) score += 15
  
  return Math.min(score, 100)
}

export function shouldRequire2FA(riskScore: number, user: any): boolean {
  if (user.twoFactor?.enabled) return true
  if (riskScore > 50) return true
  if (user.role === 'admin') return true
  return false
}

export function generateDeviceId(): string {
  return `device-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

export function parseUserAgent(userAgent: string): {
  browser: string
  os: string
  device: string
} {
  // Simplified user agent parsing
  // In production, use a library like ua-parser-js
  return {
    browser: userAgent.includes('Chrome') ? 'Chrome' : 'Other',
    os: userAgent.includes('Windows') ? 'Windows' : 
        userAgent.includes('Mac') ? 'macOS' : 
        userAgent.includes('Linux') ? 'Linux' : 'Other',
    device: userAgent.includes('Mobile') ? 'Mobile' : 'Desktop'
  }
}

export function createSecurityAlert(
  type: string,
  severity: 'low' | 'medium' | 'high' | 'critical',
  message: string,
  device?: any
) {
  return {
    id: `alert-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    type,
    severity,
    message,
    timestamp: new Date().toISOString(),
    resolved: false,
    device
  }
}