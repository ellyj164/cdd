import { NextRequest, NextResponse } from 'next/server'

// Save onboarding progress endpoint
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { step, data, userId } = body

    if (!step || !data) {
      return NextResponse.json({
        success: false,
        error: 'Step and data are required'
      }, { status: 400 })
    }

    // Generate save token for resume functionality
    const saveToken = `onboarding-${Date.now()}-${Math.random().toString(36).substr(2, 16)}`

    // Mock onboarding progress data
    const progress = {
      currentStep: step,
      totalSteps: data.userType === 'business' ? 8 : 6,
      completedSteps: data.completedSteps || [],
      skippedSteps: data.skippedSteps || [],
      data: {
        ...data,
        lastActivity: new Date().toISOString()
      },
      saveAndResumeToken: saveToken,
      lastActivity: new Date().toISOString(),
      userId: userId || 'anonymous'
    }

    // In production, save to database
    console.log('Saving onboarding progress:', progress)

    return NextResponse.json({
      success: true,
      progress,
      message: 'Onboarding progress saved successfully'
    })

  } catch (error) {
    console.error('Save onboarding progress error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Get onboarding progress endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const saveToken = searchParams.get('saveToken')

    if (!userId && !saveToken) {
      return NextResponse.json({
        success: false,
        error: 'User ID or save token is required'
      }, { status: 400 })
    }

    // Mock onboarding progress retrieval
    const progress = {
      currentStep: 3,
      totalSteps: 6,
      completedSteps: ['welcome', 'profile'],
      skippedSteps: [],
      data: {
        userType: 'individual',
        displayName: 'John Doe',
        interests: ['Technology', 'Books'],
        language: 'en',
        currency: 'USD',
        theme: 'auto',
        lastActivity: '2024-01-15T12:30:00Z'
      },
      saveAndResumeToken: saveToken || 'onboarding-resume-token',
      lastActivity: '2024-01-15T12:30:00Z'
    }

    return NextResponse.json({
      success: true,
      progress
    })

  } catch (error) {
    console.error('Get onboarding progress error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Complete onboarding endpoint
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, finalData } = body

    if (!userId || !finalData) {
      return NextResponse.json({
        success: false,
        error: 'User ID and final data are required'
      }, { status: 400 })
    }

    // Mock onboarding completion
    const completedOnboarding = {
      status: 'completed',
      completedAt: new Date().toISOString(),
      data: finalData,
      level: finalData.userType === 'business' ? 'business' : 'standard',
      features: {
        advancedSearch: true,
        personalizedRecommendations: true,
        priceAlerts: true,
        wishlistSharing: finalData.userType !== 'business',
        sellerTools: finalData.userType === 'business' || finalData.userType === 'hybrid',
        businessAnalytics: finalData.userType === 'business',
        multiplePaymentMethods: true,
        prioritySupport: finalData.userType === 'business'
      }
    }

    return NextResponse.json({
      success: true,
      onboarding: completedOnboarding,
      message: 'Onboarding completed successfully!'
    })

  } catch (error) {
    console.error('Complete onboarding error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}