import { Metadata } from 'next'
import ProductDetail from './ProductDetail'

interface Props {
  params: { id: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // In a real app, you'd fetch the product data here
  return {
    title: `Product ${params.id} - Marketify`,
    description: `View details for product ${params.id}`,
  }
}

export default function ProductDetailPage({ params }: Props) {
  return <ProductDetail productId={params.id} />
}