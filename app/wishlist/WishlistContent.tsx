'use client'

import React from 'react'
import { useWishlistStore } from '../../src/stores/useWishlistStore'
import { useCartStore } from '../../src/stores/useCartStore'
import { useTranslation } from 'react-i18next'
import { Heart, ShoppingCart, Trash2, Star } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

export default function WishlistContent() {
  const { t } = useTranslation()
  const { getWishlistItems, removeFromWishlist, clearWishlist } = useWishlistStore()
  const { addToCart } = useCartStore()

  const wishlistItems = getWishlistItems()

  const handleAddToCart = (product: any) => {
    addToCart(product)
  }

  const handleRemoveFromWishlist = (productId: string) => {
    removeFromWishlist(productId)
  }

  if (wishlistItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <Heart className="mx-auto h-24 w-24 text-gray-400 mb-8" />
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-md mx-auto">
              Save products you love by clicking the heart icon. They&apos;ll appear here for easy access.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              My Wishlist
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
            </p>
          </div>
          {wishlistItems.length > 0 && (
            <button
              onClick={clearWishlist}
              className="text-red-600 hover:text-red-700 font-medium text-sm"
            >
              Clear All
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product: any) => (
            <div key={product.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden group">
              <div className="relative overflow-hidden">
                <Link href={`/products/${product.id}`}>
                  <Image
                    src={product.imageUrl || '/placeholder-product.jpg'}
                    alt={product.name}
                    width={300}
                    height={300}
                    className="h-48 w-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </Link>
                
                {/* Remove from Wishlist Button */}
                <button
                  onClick={() => handleRemoveFromWishlist(product.id)}
                  className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                  aria-label="Remove from wishlist"
                >
                  <Trash2 className="h-4 w-4" />
                </button>

                {/* Badges */}
                {product.badges && product.badges.length > 0 && (
                  <div className="absolute top-2 left-2 flex flex-col gap-1">
                    {product.badges.map((badge: string, index: number) => (
                      <span key={index} className="bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium">
                        {badge}
                      </span>
                    ))}
                  </div>
                )}

                {/* Quick Add to Cart */}
                <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="w-full py-2 px-4 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Add to Cart</span>
                  </button>
                </div>
              </div>

              <div className="p-4">
                <Link href={`/products/${product.id}`}>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-2 hover:text-primary-600 transition-colors">
                    {product.name}
                  </h3>
                </Link>
                
                {/* Rating */}
                {product.rating && (
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < Math.floor(product.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    {product.reviews && (
                      <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                        ({product.reviews})
                      </span>
                    )}
                  </div>
                )}

                {/* Price */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ${product.price?.toFixed(2) || '0.00'}
                    </span>
                    {product.originalPrice && product.originalPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    )}
                  </div>
                  
                  {/* Stock Status */}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.inStock !== false
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                  }`}>
                    {product.inStock !== false ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Additional Actions */}
                <div className="mt-4 flex space-x-2">
                  <button
                    onClick={() => handleAddToCart(product)}
                    disabled={product.inStock === false}
                    className="flex-1 py-2 px-3 bg-primary-600 hover:bg-primary-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white text-sm font-medium rounded-lg transition-colors"
                  >
                    Add to Cart
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}