'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { 
  HeartIcon, 
  ShareIcon,
  TruckIcon,
  ShieldCheckIcon,
  CreditCardIcon
} from '@heroicons/react/24/outline';
import { StarIcon as StarIconSolid } from '@heroicons/react/24/solid';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCartStore } from '@/store/cart';
import api from '@/lib/api';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  availability: string;
  condition: string;
  brand: string;
  model: string;
  specifications: Record<string, string>;
  vendor: {
    id: string;
    name: string;
    rating: number;
    reviewCount: number;
    location: string;
  };
  category: {
    id: string;
    name: string;
  };
  shipping: {
    free: boolean;
    estimatedDays: string;
    cost?: number;
  };
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { addItem } = useCartStore();

  useEffect(() => {
    if (params.id) {
      fetchProduct(params.id as string);
    }
  }, [params.id]);

  const fetchProduct = async (id: string) => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${id}`);
      setProduct(response.data.data);
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = () => {
    if (!product) return;
    
    addItem({
      id: product.id,
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity: quantity,
      image: product.images[0],
      vendorId: product.vendor.id,
      vendorName: product.vendor.name,
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    // Redirect to checkout
    window.location.href = '/checkout';
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Product Not Found</h1>
            <p className="text-gray-600 mb-4">The product you&apos;re looking for doesn&apos;t exist.</p>
            <Link href="/" className="text-blue-600 hover:underline">
              Return to Homepage
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <main className="flex-1">
        {/* Breadcrumb */}
        <div className="bg-white border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
            <nav className="flex text-sm">
              <Link href="/" className="text-blue-600 hover:underline">Home</Link>
              <span className="mx-2 text-gray-500">&gt;</span>
              <Link href={`/category/${product.category.name.toLowerCase()}`} className="text-blue-600 hover:underline">
                {product.category.name}
              </Link>
              <span className="mx-2 text-gray-500">&gt;</span>
              <span className="text-gray-900 truncate">{product.name}</span>
            </nav>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-square bg-white rounded-lg overflow-hidden border">
                <Image
                  src={product.images[selectedImageIndex] || '/placeholder-product.jpg'}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              
              {/* Thumbnail Images */}
              {product.images.length > 1 && (
                <div className="grid grid-cols-6 gap-2">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImageIndex(index)}
                      className={`relative aspect-square bg-white rounded border overflow-hidden ${
                        selectedImageIndex === index ? 'ring-2 ring-blue-500' : ''
                      }`}
                    >
                      <Image
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Details */}
            <div className="space-y-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {product.name}
                </h1>
                
                {/* Rating and Reviews */}
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <StarIconSolid
                        key={i}
                        className={`h-5 w-5 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm text-gray-600">
                      {product.rating} ({product.reviewCount} reviews)
                    </span>
                  </div>
                  <span className="text-sm text-gray-500">|</span>
                  <span className="text-sm text-green-600">In Stock</span>
                </div>

                {/* Brand */}
                <p className="text-gray-600 mb-4">
                  Brand: <span className="font-medium">{product.brand}</span>
                </p>
              </div>

              {/* Price */}
              <div className="border-t border-b py-6">
                <div className="flex items-center space-x-4">
                  <span className="text-3xl font-bold text-red-600">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && product.originalPrice > product.price && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                      <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-sm font-medium">
                        {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4">
                <div className="flex items-center space-x-4">
                  <label className="text-sm font-medium text-gray-700">Qty:</label>
                  <select
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value))}
                    className="border border-gray-300 rounded px-3 py-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    {[...Array(10)].map((_, i) => (
                      <option key={i + 1} value={i + 1}>
                        {i + 1}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 bg-yellow-400 text-black px-6 py-3 rounded-lg font-medium hover:bg-yellow-500 transition-colors"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="flex-1 bg-orange-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-orange-600 transition-colors"
                  >
                    Buy It Now
                  </button>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`flex items-center px-4 py-2 border rounded-lg ${
                      isWishlisted 
                        ? 'border-red-300 text-red-600 bg-red-50' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <HeartIcon className="h-5 w-5 mr-2" />
                    {isWishlisted ? 'Added to Watchlist' : 'Add to Watchlist'}
                  </button>
                  <button className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50">
                    <ShareIcon className="h-5 w-5 mr-2" />
                    Share
                  </button>
                </div>
              </div>

              {/* Shipping Information */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div className="flex items-center">
                  <TruckIcon className="h-5 w-5 text-green-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">
                      {product.shipping.free ? 'FREE Standard Shipping' : `Shipping $${product.shipping.cost}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      Estimated delivery: {product.shipping.estimatedDays}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <ShieldCheckIcon className="h-5 w-5 text-blue-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">eBay Money Back Guarantee</p>
                    <p className="text-sm text-gray-600">Get the item you ordered or get your money back</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <CreditCardIcon className="h-5 w-5 text-purple-600 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">Secure Payment</p>
                    <p className="text-sm text-gray-600">PayPal, Credit/Debit cards accepted</p>
                  </div>
                </div>
              </div>

              {/* Seller Information */}
              <div className="border rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">Seller Information</h3>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Seller:</span>
                    <Link href={`/seller/${product.vendor.id}`} className="text-blue-600 hover:underline font-medium">
                      {product.vendor.name}
                    </Link>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Feedback:</span>
                    <div className="flex items-center">
                      <span className="text-green-600 font-medium">
                        {product.vendor.rating}% positive
                      </span>
                      <span className="text-gray-600 ml-2">
                        ({product.vendor.reviewCount} reviews)
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Location:</span>
                    <span className="text-gray-900">{product.vendor.location}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Product Description */}
          <div className="mt-12 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-white rounded-lg border p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Description</h2>
                <div className="prose max-w-none">
                  <p className="text-gray-700 leading-relaxed">{product.description}</p>
                </div>

                {/* Specifications */}
                {Object.keys(product.specifications).length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Specifications</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                          <span className="text-gray-600">{key}:</span>
                          <span className="text-gray-900 font-medium">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Related Products */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg border p-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">You may also like</h3>
                <div className="space-y-4">
                  {/* Placeholder for related products */}
                  <p className="text-gray-500 text-sm">Related products will appear here</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}