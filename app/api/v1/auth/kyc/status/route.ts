import { NextRequest, NextResponse } from 'next/server'

// Get KYC status endpoint
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({
        success: false,
        error: 'User ID is required'
      }, { status: 400 })
    }

    // Mock KYC status data
    const kycStatus = {
      status: 'pending', // 'unverified' | 'pending' | 'verified' | 'rejected'
      level: 'basic', // 'basic' | 'intermediate' | 'advanced' | 'enterprise'
      documents: [
        {
          id: 'doc-1234567890',
          type: 'passport',
          status: 'verified',
          uploadedAt: '2024-01-15T10:30:00Z',
          verifiedAt: '2024-01-15T14:22:00Z'
        },
        {
          id: 'doc-0987654321',
          type: 'proof_of_address',
          status: 'pending',
          uploadedAt: '2024-01-15T11:15:00Z',
          verifiedAt: null
        }
      ],
      verifiedAt: null,
      expiresAt: null,
      reason: null,
      nextSteps: [
        'Complete address verification',
        'Await document review (24-48 hours)',
        'Account will be upgraded to intermediate level'
      ]
    }

    return NextResponse.json({
      success: true,
      kyc: kycStatus
    })

  } catch (error) {
    console.error('Get KYC status error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Update KYC status endpoint (for admin use)
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, status, reason, documentId } = body

    if (!userId || !status) {
      return NextResponse.json({
        success: false,
        error: 'User ID and status are required'
      }, { status: 400 })
    }

    // Mock KYC status update
    const updatedKyc = {
      status,
      level: status === 'verified' ? 'advanced' : 'basic',
      verifiedAt: status === 'verified' ? new Date().toISOString() : null,
      expiresAt: status === 'verified' ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() : null,
      reason: status === 'rejected' ? reason : null,
      updatedAt: new Date().toISOString()
    }

    return NextResponse.json({
      success: true,
      kyc: updatedKyc,
      message: `KYC status updated to ${status}`
    })

  } catch (error) {
    console.error('Update KYC status error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}