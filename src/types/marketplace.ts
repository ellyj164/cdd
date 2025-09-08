export interface ProductReview {
  id: string
  userId: string
  productId: string
  rating: number
  title: string
  content: string
  verified: boolean
  helpful: number
  createdAt: string
  updatedAt: string
}

export interface Discount {
  type: 'percentage' | 'fixed' | 'bogo'
  value: number
  startDate: string
  endDate: string
  conditions?: Record<string, any>
}

export interface Refund {
  id: string
  amount: number
  reason: string
  status: 'pending' | 'approved' | 'rejected' | 'processed'
  createdAt: string
}

export interface CompetitorAnalysis {
  competitor: string
  price: number
  availability: boolean
  rating: number
}

// Core marketplace types for Global Nexus Platform
export interface User {
  id: string
  email: string
  role: 'customer' | 'vendor' | 'admin' | 'enterprise'
  profile: UserProfile
  preferences: UserPreferences
  biometricData?: BiometricProfile
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  firstName: string
  lastName: string
  avatar?: string
  phone?: string
  addresses: Address[]
  companyInfo?: CompanyInfo
  verificationStatus: VerificationStatus
}

export interface CompanyInfo {
  name: string
  taxId: string
  businessType: 'b2b' | 'b2c' | 'c2c' | 'g2b'
  industry: string
  employeeCount: number
  annualRevenue?: number
}

export interface Address {
  id: string
  type: 'billing' | 'shipping' | 'business'
  street: string
  city: string
  state: string
  country: string
  postalCode: string
  isDefault: boolean
  coordinates?: { lat: number; lng: number }
}

export interface Product {
  id: string
  vendorId: string
  sku: string
  name: string
  description: string
  shortDescription: string
  category: Category
  subcategories: Category[]
  price: Price
  variants: ProductVariant[]
  inventory: InventoryInfo
  media: ProductMedia[]
  specifications: Record<string, any>
  certifications: string[]
  blockchainVerification?: BlockchainVerification
  aiInsights: AIInsights
  sustainabilityInfo: SustainabilityInfo
  reviews: ProductReview[]
  createdAt: string
  updatedAt: string
}

export interface Price {
  base: number
  currency: string
  discount?: Discount
  tieredPricing?: TieredPrice[]
  dynamicPricing?: DynamicPricing
}

export interface TieredPrice {
  minQuantity: number
  price: number
  label: string
}

export interface DynamicPricing {
  algorithm: 'demand' | 'competitor' | 'inventory' | 'ai'
  factors: Record<string, number>
  lastUpdated: string
}

export interface ProductVariant {
  id: string
  name: string
  attributes: Record<string, string>
  price: Price
  inventory: number
  sku: string
  media?: ProductMedia[]
}

export interface ProductMedia {
  id: string
  type: 'image' | 'video' | '3d_model' | 'ar_asset' | 'vr_scene'
  url: string
  alt: string
  metadata?: Record<string, any>
  order: number
}

export interface InventoryInfo {
  quantity: number
  reserved: number
  available: number
  reorderPoint: number
  maxStock: number
  locations: WarehouseLocation[]
  predictiveData: PredictiveInventory
}

export interface WarehouseLocation {
  id: string
  name: string
  address: Address
  quantity: number
  type: 'fulfillment' | 'store' | 'dropship'
}

export interface PredictiveInventory {
  demandForecast: number[]
  restockDate: string
  seasonalTrends: Record<string, number>
  aiPredictions: Record<string, any>
}

export interface Category {
  id: string
  name: string
  slug: string
  description?: string
  parent?: string
  children?: Category[]
  attributes: CategoryAttribute[]
  metadata: Record<string, any>
}

export interface CategoryAttribute {
  name: string
  type: 'text' | 'number' | 'boolean' | 'select' | 'multiselect'
  required: boolean
  options?: string[]
  unit?: string
}

export interface FulfillmentInfo {
  status: FulfillmentStatus
  trackingNumber?: string
  carrier?: string
  estimatedDelivery?: string
  actualDelivery?: string
  warehouse: WarehouseLocation
  method: 'standard' | 'express' | 'overnight' | 'drone' | 'autonomous'
}

export interface OrderTimeline {
  event: string
  status: string
  timestamp: string
  description?: string
  location?: string
}

export interface Order {
  id: string
  orderNumber: string
  customerId: string
  vendorId?: string
  status: OrderStatus
  items: OrderItem[]
  totals: OrderTotals
  shipping: ShippingInfo
  payment: PaymentInfo
  fulfillment: FulfillmentInfo
  timeline: OrderTimeline[]
  metadata: Record<string, any>
  createdAt: string
  updatedAt: string
}

export interface OrderItem {
  id: string
  productId: string
  variantId?: string
  quantity: number
  price: number
  discount?: number
  vendor: VendorInfo
  fulfillmentStatus: FulfillmentStatus
}

export interface OrderTotals {
  subtotal: number
  tax: number
  shipping: number
  discount: number
  total: number
  currency: string
}

export interface ShippingInfo {
  method: string
  provider: string
  trackingNumber?: string
  estimatedDelivery: string
  actualDelivery?: string
  address: Address
  instructions?: string
}

export interface PaymentInfo {
  method: PaymentMethod
  status: PaymentStatus
  transactions: Transaction[]
  refunds?: Refund[]
}

export interface Transaction {
  id: string
  amount: number
  currency: string
  status: 'pending' | 'completed' | 'failed' | 'cancelled'
  gateway: string
  reference: string
  createdAt: string
}

export interface AIInsights {
  recommendationScore: number
  personalizedFeatures: string[]
  similarProducts: string[]
  priceOptimization: PriceOptimization
  demandPrediction: DemandPrediction
  sentimentAnalysis: SentimentAnalysis
}

export interface PriceOptimization {
  suggestedPrice: number
  confidence: number
  factors: Record<string, number>
  competitorAnalysis: CompetitorAnalysis[]
}

export interface DemandPrediction {
  score: number
  trend: 'rising' | 'stable' | 'declining'
  seasonality: Record<string, number>
  factors: string[]
}

export interface SentimentAnalysis {
  overall: number
  aspects: Record<string, number>
  keywords: string[]
  trends: number[]
}

export interface BlockchainVerification {
  hash: string
  network: string
  verified: boolean
  certifications: string[]
  provenance: ProvenanceRecord[]
  smartContractAddress?: string
}

export interface ProvenanceRecord {
  action: string
  actor: string
  timestamp: string
  location?: string
  verified: boolean
}

export interface SustainabilityInfo {
  carbonFootprint: number
  sustainabilityScore: number
  certifications: string[]
  materials: MaterialInfo[]
  packaging: PackagingInfo
  circularEconomy: CircularEconomyInfo
}

export interface MaterialInfo {
  name: string
  percentage: number
  sustainable: boolean
  recycled: boolean
  certifications: string[]
}

export interface PackagingInfo {
  materials: string[]
  recyclable: boolean
  biodegradable: boolean
  weight: number
  volume: number
}

export interface CircularEconomyInfo {
  repairable: boolean
  upgradeable: boolean
  recyclable: boolean
  tradeInValue?: number
  refurbishmentOptions: string[]
}

// Enums and Union Types
export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded'
export type FulfillmentStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'returned'
export type PaymentStatus = 'pending' | 'authorized' | 'captured' | 'failed' | 'refunded'
export type PaymentMethod = 'card' | 'paypal' | 'crypto' | 'cbdc' | 'bank_transfer' | 'biometric'
export type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'enterprise_verified'

export interface UserPreferences {
  currency: string
  language: string
  timezone: string
  notifications: NotificationPreferences
  privacy: PrivacyPreferences
  accessibility: AccessibilityPreferences
  ai: AIPreferences
}

export interface NotificationPreferences {
  email: boolean
  push: boolean
  sms: boolean
  channels: string[]
  frequency: 'immediate' | 'daily' | 'weekly'
}

export interface PrivacyPreferences {
  dataCollection: boolean
  personalization: boolean
  marketing: boolean
  analytics: boolean
  thirdParty: boolean
}

export interface AccessibilityPreferences {
  highContrast: boolean
  largeText: boolean
  screenReader: boolean
  keyboardNavigation: boolean
  reducedMotion: boolean
}

export interface AIPreferences {
  personalizedRecommendations: boolean
  priceOptimization: boolean
  chatbotAssistance: boolean
  voiceCommands: boolean
  behaviorAnalysis: boolean
}

export interface BiometricProfile {
  faceId: boolean
  fingerprint: boolean
  voice: boolean
  iris: boolean
  enabled: boolean
  devices: string[]
}

// Additional types for enterprise features
export interface VendorInfo {
  id: string
  name: string
  businessType: string
  rating: number
  certifications: string[]
  performance: VendorPerformance
}

export interface VendorPerformance {
  onTimeDelivery: number
  qualityScore: number
  customerSatisfaction: number
  returnRate: number
  responsiveness: number
}

export interface Marketplace {
  id: string
  name: string
  type: 'b2c' | 'b2b' | 'c2c' | 'g2b'
  region: string
  currency: string
  languages: string[]
  features: MarketplaceFeature[]
  configuration: MarketplaceConfig
}

export interface MarketplaceFeature {
  name: string
  enabled: boolean
  configuration: Record<string, any>
}

export interface MarketplaceConfig {
  commissionRate: number
  paymentMethods: PaymentMethod[]
  shippingMethods: string[]
  taxes: TaxConfig[]
  regulations: RegulationInfo[]
}

export interface TaxConfig {
  region: string
  rate: number
  type: 'vat' | 'sales' | 'gst'
  applicableCategories: string[]
}

export interface RegulationInfo {
  type: string
  region: string
  requirements: string[]
  compliance: boolean
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data: T
  message?: string
  errors?: string[]
  meta?: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface SearchResult<T> {
  items: T[]
  total: number
  facets: SearchFacet[]
  suggestions: string[]
  query: SearchQuery
}

export interface SearchQuery {
  term: string
  filters: Record<string, any>
  sort: string
  page: number
  limit: number
}

export interface SearchFacet {
  name: string
  values: SearchFacetValue[]
}

export interface SearchFacetValue {
  value: string
  count: number
  selected: boolean
}