import { NextRequest, NextResponse } from 'next/server'
import { generateOTP, sendSMS, sendEmail } from '../../../utils/auth'

// Enhanced multi-channel registration endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, phone, password, name, accountType, provider, device } = body

    // Validate required fields
    if (!password || !name || !accountType) {
      return NextResponse.json({
        success: false,
        error: 'Missing required fields'
      }, { status: 400 })
    }

    if (!email && !phone && !provider) {
      return NextResponse.json({
        success: false,
        error: 'At least one contact method (email, phone, or social provider) is required'
      }, { status: 400 })
    }

    // Generate user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // Create device fingerprint record
    const deviceRecord = {
      ...device,
      userId,
      registeredAt: new Date().toISOString()
    }

    // Determine verification requirements
    const requiresVerification = email || phone

    // Create user object
    const user = {
      id: userId,
      email: email || null,
      phone: phone || null,
      role: accountType === 'business' ? 'vendor' : 'customer',
      accountType,
      verified: {
        email: !email, // Auto-verified if no email provided
        phone: !phone, // Auto-verified if no phone provided
        identity: false
      },
      twoFactor: {
        enabled: false,
        methods: [],
        backupCodes: []
      },
      kyc: {
        status: 'unverified',
        level: 'basic',
        documents: []
      },
      onboarding: {
        currentStep: 1,
        totalSteps: accountType === 'business' ? 8 : 5,
        completedSteps: ['registration'],
        skippedSteps: [],
        data: {
          name,
          accountType,
          registrationMethod: provider || (email ? 'email' : 'phone')
        },
        lastActivity: new Date().toISOString()
      },
      devices: [deviceRecord],
      securityAlerts: [],
      socialProviders: provider ? [provider] : [],
      lastLogin: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    if (requiresVerification) {
      // Send verification codes
      if (email) {
        const emailOTP = generateOTP()
        await sendEmail(email, 'Email Verification', `Your verification code: ${emailOTP}`)
        
        // Store OTP (in production, use secure storage)
        // Redis or database storage would be used here
      }

      if (phone) {
        const phoneOTP = generateOTP()
        await sendSMS(phone, `Your Marketify verification code: ${phoneOTP}`)
        
        // Store OTP (in production, use secure storage)
      }

      return NextResponse.json({
        success: true,
        requiresVerification: true,
        message: 'Registration successful. Please verify your contact information.',
        userId,
        verificationMethods: {
          email: !!email,
          phone: !!phone
        }
      })
    }

    // Create session for immediate login
    const session = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId,
      token: `token-${Date.now()}-${Math.random().toString(36).substr(2, 32)}`,
      refreshToken: `refresh-${Date.now()}-${Math.random().toString(36).substr(2, 32)}`,
      device: deviceRecord,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(), // 24 hours
      lastActivity: new Date().toISOString(),
      ipAddress: request.ip || 'unknown',
      location: {
        country: 'Unknown',
        city: 'Unknown'
      }
    }

    return NextResponse.json({
      success: true,
      user,
      session,
      message: 'Registration successful'
    })

  } catch (error) {
    console.error('Multi-channel registration error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}