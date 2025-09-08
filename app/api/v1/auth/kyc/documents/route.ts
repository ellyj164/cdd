import { NextRequest, NextResponse } from 'next/server'

// Submit KYC document endpoint
export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    const type = formData.get('type') as string
    const file = formData.get('file') as File
    const metadata = formData.get('metadata') as string

    if (!type || !file) {
      return NextResponse.json({
        success: false,
        error: 'Document type and file are required'
      }, { status: 400 })
    }

    // Validate file type and size
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf']
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({
        success: false,
        error: 'Invalid file type. Please upload JPEG, PNG, WebP, or PDF files.'
      }, { status: 400 })
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      return NextResponse.json({
        success: false,
        error: 'File size must be less than 10MB'
      }, { status: 400 })
    }

    // Generate document ID
    const documentId = `doc-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    
    // In production, upload to cloud storage (AWS S3, Google Cloud, etc.)
    // For now, we'll simulate the upload
    const documentUrl = `/uploads/kyc/${documentId}-${file.name}`
    
    // Mock document verification process
    const document = {
      id: documentId,
      type,
      name: file.name,
      size: file.size,
      url: documentUrl,
      status: 'pending',
      uploadedAt: new Date().toISOString(),
      metadata: metadata ? JSON.parse(metadata) : null
    }

    // Simulate AI-powered document verification
    setTimeout(async () => {
      // In production, this would trigger actual document verification
      console.log(`Processing KYC document ${documentId} for verification`)
    }, 1000)

    return NextResponse.json({
      success: true,
      document,
      message: 'Document uploaded successfully and queued for verification'
    })

  } catch (error) {
    console.error('KYC document upload error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}

// Get KYC documents endpoint
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

    // Mock KYC documents data
    const documents = [
      {
        id: 'doc-1234567890',
        type: 'passport',
        name: 'passport-scan.jpg',
        status: 'verified',
        uploadedAt: '2024-01-15T10:30:00Z',
        verifiedAt: '2024-01-15T14:22:00Z',
        reason: null
      },
      {
        id: 'doc-0987654321',
        type: 'proof_of_address',
        name: 'utility-bill.pdf',
        status: 'pending',
        uploadedAt: '2024-01-15T11:15:00Z',
        verifiedAt: null,
        reason: null
      }
    ]

    return NextResponse.json({
      success: true,
      documents
    })

  } catch (error) {
    console.error('Get KYC documents error:', error)
    return NextResponse.json({
      success: false,
      error: 'Internal server error'
    }, { status: 500 })
  }
}