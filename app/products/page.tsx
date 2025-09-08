import { Metadata } from 'next'
import { Suspense } from 'react'
import ProductCatalog from './ProductCatalog'

export const metadata: Metadata = {
  title: 'Products - Marketify',
  description: 'Browse our extensive collection of quality products with advanced filtering and search options.',
  keywords: ['products', 'catalog', 'shopping', 'marketplace', 'ecommerce'],
}

function ProductCatalogWrapper() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white dark:bg-gray-800 rounded-lg shadow-md">
                  <div className="h-48 bg-gray-300 dark:bg-gray-700 rounded-t-lg"></div>
                  <div className="p-4">
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded mb-2"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3 mb-2"></div>
                    <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/3"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    }>
      <ProductCatalog />
    </Suspense>
  )
}

export default function ProductsPage() {
  return <ProductCatalogWrapper />
}