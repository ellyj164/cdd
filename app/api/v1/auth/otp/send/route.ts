import { NextRequest, NextResponse } from 'next/server'
import { 
  generateOTP, 
  sendSMS, 
  sendEmail, 
  sendVoiceCall 
} from '../../../utils/auth'

// Send OTP endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { method, identifier } = body

    if (!method || !identifier) {
      return NextResponse.json({
        success: false,
        error: 'Method and identifier are required'
      }, { status: 400 })
    }

    // Generate OTP
    const otp = generateOTP(6)
    const expiryTime = Date.now() + (5 * 60 * 1000) // 5 minutes

    // Store OTP (in production, use Redis or database)
    // For now, we'll just log it
    console.log(`Generated OTP for ${identifier}: ${otp}`)

    let success = false
    let message = ''

    switch (method) {
      case 'email':
        success = await sendEmail(
          identifier,
          'Your Verification Code',
          `Your verification code is: ${otp}. This code expires in 5 minutes.`
        )
        message = 'Verification code sent to your email'
        break

      case 'sms':
        success = await sendSMS(
          identifier,
          `Your Marketify verification code: ${otp}. Expires in 5 minutes.`
        )
        message = 'Verification code sent via SMS'
        break

      case 'voice':
        success = await sendVoiceCall(
          identifier,
          `Your Marketify verification code is ${otp.split('').join(' ')}. This code expires in 5 minutes.`
        )
        message = 'Verification code sent via voice call'
        break

      default:
        return NextResponse.json({
          success: false,
          error: 'Invalid verification method'
        }, { status: 400 })
    }

    if (!success) {
      return NextResponse.json({
        success: false,
        error: 'Failed to send verification code'
      }, { status: 500 })
    }

    return NextResponse.json({
      success: true,
      message,
      expiresIn: 300 // 5 minutes in seconds
    })

  } catch (error) {
    console.error('OTP send error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}