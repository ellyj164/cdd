import axios from 'axios';

// API base configuration - point to PHP backend
const API_BASE_URL = import.meta.env.VITE_API_URL || '/backend_php/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle common errors
    if (error.response?.status === 401) {
      // Remove invalid token and redirect to login
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

// API service functions
export const apiService = {
  // Auth endpoints
  auth: {
    login: async (credentials) => {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    },
    
    register: async (userData) => {
      const response = await api.post('/auth/register', userData);
      return response.data;
    },
    
    getProfile: async () => {
      const response = await api.get('/auth/me');
      return response.data;
    },
    
    forgotPassword: async (email) => {
      const response = await api.post('/auth/forgot-password', { email });
      return response.data;
    },
    
    resetPassword: async (token, password) => {
      const response = await api.post('/auth/reset-password', { token, password });
      return response.data;
    },
    
    verifyEmail: async (token) => {
      const response = await api.post('/auth/verify-email', { token });
      return response.data;
    },
    
    logout: async () => {
      const response = await api.post('/auth/logout');
      return response.data;
    }
  },

  // Products endpoints
  products: {
    getAll: async (params = {}) => {
      const response = await api.get('/products', { params });
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/products/${id}`);
      return response.data;
    },

    getFeatured: async (limit = 8) => {
      const response = await api.get('/products/featured', { params: { limit } });
      return response.data;
    },

    getTrending: async (limit = 8) => {
      const response = await api.get('/products/trending', { params: { limit } });
      return response.data;
    },

    getDeals: async (limit = 8) => {
      const response = await api.get('/products/deals', { params: { limit } });
      return response.data;
    },

    getRecommendations: async (userId = null, limit = 8) => {
      const url = userId ? `/products/recommendations/${userId}` : '/products/recommendations';
      const response = await api.get(url, { params: { limit } });
      return response.data;
    },

    getCategoryStats: async () => {
      const response = await api.get('/products/categories/stats');
      return response.data;
    },
    
    search: async (query, params = {}) => {
      const response = await api.get(`/products/search/${encodeURIComponent(query)}`, { params });
      return response.data;
    },
    
    create: async (productData) => {
      const response = await api.post('/products', productData);
      return response.data;
    },
    
    update: async (id, productData) => {
      const response = await api.put(`/products/${id}`, productData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/products/${id}`);
      return response.data;
    }
  },

  // Homepage endpoints
  homepage: {
    getData: async () => {
      const response = await api.get('/homepage');
      return response.data;
    },

    getPerformanceMetrics: async () => {
      const response = await api.get('/homepage/performance');
      return response.data;
    }
  },

  // Banners endpoints
  banners: {
    getAll: async (type = null, limit = null) => {
      const params = {};
      if (type) params.type = type;
      if (limit) params.limit = limit;
      const response = await api.get('/banners', { params });
      return response.data;
    },

    getHero: async () => {
      const response = await api.get('/banners/hero');
      return response.data;
    }
  },

  // Categories endpoints
  categories: {
    getAll: async () => {
      const response = await api.get('/categories');
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/categories/${id}`);
      return response.data;
    }
  },

  // Cart endpoints
  cart: {
    get: async () => {
      const response = await api.get('/cart');
      return response.data;
    },
    
    add: async (productId, quantity = 1, variantId = null) => {
      const response = await api.post('/cart/add', {
        productId,
        quantity,
        variantId
      });
      return response.data;
    },
    
    update: async (itemId, quantity) => {
      const response = await api.put('/cart/update', {
        itemId,
        quantity
      });
      return response.data;
    },
    
    remove: async (itemId) => {
      const response = await api.delete(`/cart/remove/${itemId}`);
      return response.data;
    },
    
    clear: async () => {
      const response = await api.delete('/cart/clear');
      return response.data;
    }
  },

  // Orders endpoints
  orders: {
    getAll: async (params = {}) => {
      const response = await api.get('/orders', { params });
      return response.data;
    },
    
    getById: async (id) => {
      const response = await api.get(`/orders/${id}`);
      return response.data;
    },
    
    create: async (orderData) => {
      const response = await api.post('/orders', orderData);
      return response.data;
    }
  },

  // Reviews endpoints
  reviews: {
    getByProduct: async (productId, params = {}) => {
      const response = await api.get(`/reviews?productId=${productId}`, { params });
      return response.data;
    },
    
    create: async (reviewData) => {
      const response = await api.post('/reviews', reviewData);
      return response.data;
    },
    
    update: async (id, reviewData) => {
      const response = await api.put(`/reviews/${id}`, reviewData);
      return response.data;
    },
    
    delete: async (id) => {
      const response = await api.delete(`/reviews/${id}`);
      return response.data;
    }
  },

  // Admin endpoints
  admin: {
    getDashboard: async () => {
      const response = await api.get('/admin/dashboard');
      return response.data;
    },
    
    getUsers: async (params = {}) => {
      const response = await api.get('/admin/users', { params });
      return response.data;
    },
    
    getAnalytics: async (params = {}) => {
      const response = await api.get('/admin/analytics', { params });
      return response.data;
    }
  },

  // Health check
  health: async () => {
    const response = await api.get('/health');
    return response.data;
  }
};

// Export individual services for easier imports
export const authAPI = apiService.auth;
export const productsAPI = apiService.products;
export const categoriesAPI = apiService.categories;
export const cartAPI = apiService.cart;
export const ordersAPI = apiService.orders;
export const reviewsAPI = apiService.reviews;
export const adminAPI = apiService.admin;
export const homepageAPI = apiService.homepage;
export const bannersAPI = apiService.banners;

export default apiService;