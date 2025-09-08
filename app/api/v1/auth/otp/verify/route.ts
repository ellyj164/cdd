import { NextRequest, NextResponse } from 'next/server'
import { verifyOTP } from '../../../utils/auth'

// Verify OTP endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { code, identifier } = body

    if (!code || !identifier) {
      return NextResponse.json({
        success: false,
        error: 'Code and identifier are required'
      }, { status: 400 })
    }

    // In production, retrieve OTP from secure storage (Redis/database)
    // For demo purposes, we'll accept any 6-digit code
    if (!/^\d{6}$/.test(code)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid verification code format'
      }, { status: 400 })
    }

    // Mock verification - in production, check against stored OTP
    const isValid = code === '123456' || code.length === 6

    if (!isValid) {
      return NextResponse.json({
        success: false,
        error: 'Invalid verification code'
      }, { status: 400 })
    }

    // Update user verification status
    const user = {
      id: `user-${Date.now()}-verified`,
      email: identifier.includes('@') ? identifier : null,
      phone: !identifier.includes('@') ? identifier : null,
      verified: {
        email: identifier.includes('@'),
        phone: !identifier.includes('@'),
        identity: false
      },
      verifiedAt: new Date().toISOString()
    }

    // Create session
    const session = {
      id: `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      userId: user.id,
      token: `token-${Date.now()}-${Math.random().toString(36).substr(2, 32)}`,
      refreshToken: `refresh-${Date.now()}-${Math.random().toString(36).substr(2, 32)}`,
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
      lastActivity: new Date().toISOString(),
      ipAddress: request.ip || 'unknown',
      location: {
        country: 'Unknown',
        city: 'Unknown'
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Verification successful',
      user,
      session
    })

  } catch (error) {
    console.error('OTP verification error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}