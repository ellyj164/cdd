import { Metadata } from 'next'
import dynamic from 'next/dynamic'

export const metadata: Metadata = {
  title: 'Orders - Marketify',
  description: 'View and manage your orders',
}

const OrdersPage = dynamic(() => import('../../src/components/OrdersPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="animate-pulse">
          <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
})

export default function Orders() {
  return <OrdersPage />
}