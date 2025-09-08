'use client'

import CatalogManagement from '@/components/CatalogManagement'

export default function CatalogPage() {
  return (
    <div className="min-h-screen">
      <CatalogManagement userRole="admin" />
    </div>
  )
}