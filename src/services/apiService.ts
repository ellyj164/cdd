// Global Nexus Professional Ecommerce Platform API Service
// Next.js 14 compatible API client for enterprise features

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

// Enhanced API client with enterprise features
class ApiClient {
  baseURL: string
  headers: Record<string, string>
  token: string | null
  
  constructor() {
    this.baseURL = API_BASE_URL
    this.headers = {
      'Content-Type': 'application/json',
      'X-API-Version': process.env.NEXT_PUBLIC_API_VERSION || 'v1',
      'X-Client-Type': 'nexus-web-client',
    }
    this.token = null
  }

  setAuthToken(token: string | null) {
    this.token = token
    if (token) {
      this.headers['Authorization'] = `Bearer ${token}`
    } else {
      delete this.headers['Authorization']
    }
  }

  async request(method: string, endpoint: string, data: any = null, options: any = {}) {
    const url = `${this.baseURL}${endpoint}`
    const config: any = {
      method,
      headers: {
        ...this.headers,
        ...options.headers,
      },
      ...options,
    }

    if (data && method !== 'GET') {
      config.body = JSON.stringify(data)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Network error' }))
        throw new Error(error.message || `HTTP ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API Request Error:', error)
      throw error
    }
  }

  // Convenience methods
  get(endpoint: string, options: any = {}) {
    return this.request('GET', endpoint, null, options)
  }

  post(endpoint: string, data: any, options: any = {}) {
    return this.request('POST', endpoint, data, options)
  }

  put(endpoint: string, data: any, options: any = {}) {
    return this.request('PUT', endpoint, data, options)
  }

  delete(endpoint: string, options: any = {}) {
    return this.request('DELETE', endpoint, null, options)
  }
}

const apiClient = new ApiClient()

// Simplified API service for Next.js compatibility
export const apiService = {
  
  // Authentication & User Management
  auth: {
    login: async (credentials: any) => {
      const response = await apiClient.post('/auth/login', credentials)
      if (response.token) {
        apiClient.setAuthToken(response.token)
      }
      return response
    },
    
    register: async (userData: any) => {
      return await apiClient.post('/auth/register', userData)
    },
    
    logout: async () => {
      const response = await apiClient.post('/auth/logout', {})
      apiClient.setAuthToken(null)
      return response
    },
    
    getProfile: async () => {
      return await apiClient.get('/auth/profile')
    }
  },

  // Universal Marketplace Products
  marketplace: {
    getProducts: async (params: any = {}) => {
      const queryString = new URLSearchParams(params).toString()
      return await apiClient.get(`/v1/marketplace/products?${queryString}`)
    },
    
    getProductById: async (id: string) => {
      return await apiClient.get(`/v1/marketplace/products/${id}`)
    },
    
    createProduct: async (productData: any) => {
      return await apiClient.post('/v1/marketplace/products', productData)
    }
  },

  // AI-Powered Features
  ai: {
    getRecommendations: async (params: any = {}) => {
      const queryString = new URLSearchParams(params).toString()
      return await apiClient.get(`/v1/ai/recommendations?${queryString}`)
    },
    
    trackBehavior: async (behaviorData: any) => {
      return await apiClient.post('/v1/ai/recommendations', behaviorData)
    }
  },

  // System Health & Status
  health: {
    getStatus: async () => {
      return await apiClient.get('/')
    }
  }
}

export default apiService