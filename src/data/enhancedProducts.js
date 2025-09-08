// Enhanced product data structure for enterprise marketplace
export const categories = [
  {
    id: 'electronics',
    name: 'Electronics',
    subcategories: [
      { id: 'computers', name: 'Computers & Laptops', parentId: 'electronics' },
      { id: 'phones', name: 'Smartphones & Tablets', parentId: 'electronics' },
      { id: 'audio', name: 'Audio & Headphones', parentId: 'electronics' },
      { id: 'cameras', name: 'Cameras & Photography', parentId: 'electronics' },
      { id: 'gaming', name: 'Gaming & Consoles', parentId: 'electronics' }
    ]
  },
  {
    id: 'apparel',
    name: 'Apparel',
    subcategories: [
      { id: 'mens', name: "Men's Clothing", parentId: 'apparel' },
      { id: 'womens', name: "Women's Clothing", parentId: 'apparel' },
      { id: 'shoes', name: 'Shoes & Footwear', parentId: 'apparel' },
      { id: 'accessories', name: 'Accessories', parentId: 'apparel' }
    ]
  },
  {
    id: 'home',
    name: 'Home & Garden',
    subcategories: [
      { id: 'furniture', name: 'Furniture', parentId: 'home' },
      { id: 'decor', name: 'Home Decor', parentId: 'home' },
      { id: 'kitchen', name: 'Kitchen & Dining', parentId: 'home' },
      { id: 'garden', name: 'Garden & Outdoor', parentId: 'home' }
    ]
  },
  {
    id: 'sports',
    name: 'Sports & Outdoors',
    subcategories: [
      { id: 'fitness', name: 'Fitness & Exercise', parentId: 'sports' },
      { id: 'outdoor', name: 'Outdoor Recreation', parentId: 'sports' },
      { id: 'team-sports', name: 'Team Sports', parentId: 'sports' }
    ]
  }
];

export const vendors = [
  {
    id: 1,
    name: 'TechCorp',
    description: 'Leading technology and electronics retailer',
    rating: 4.8,
    totalProducts: 150,
    totalSales: 25000,
    joinedDate: '2023-01-15',
    location: 'San Francisco, CA',
    verified: true,
    badges: ['Top Seller', 'Fast Shipping', 'Excellent Service'],
    policies: {
      returnPolicy: '30-day return policy',
      shippingPolicy: 'Free shipping on orders over $50',
      warrantyPolicy: '1-year manufacturer warranty'
    }
  },
  {
    id: 2,
    name: 'StyleHub',
    description: 'Fashion-forward clothing and accessories',
    rating: 4.6,
    totalProducts: 200,
    totalSales: 15000,
    joinedDate: '2023-03-20',
    location: 'New York, NY',
    verified: true,
    badges: ['Trending Styles', 'Quality Assured'],
    policies: {
      returnPolicy: '60-day return policy',
      shippingPolicy: 'Free shipping on orders over $75',
      warrantyPolicy: 'Quality guarantee'
    }
  },
  {
    id: 3,
    name: 'EcoFashion',
    description: 'Sustainable and eco-friendly products',
    rating: 4.9,
    totalProducts: 80,
    totalSales: 8000,
    joinedDate: '2023-06-10',
    location: 'Portland, OR',
    verified: true,
    badges: ['Eco-Friendly', 'Sustainable', 'Organic'],
    policies: {
      returnPolicy: '45-day return policy',
      shippingPolicy: 'Carbon-neutral shipping',
      warrantyPolicy: 'Lifetime quality guarantee'
    }
  }
];

export const enhancedProducts = [
  { 
    id: 1, 
    name: 'QuantumCore Laptop Pro', 
    category: 'electronics',
    subcategory: 'computers',
    price: 1299.99, 
    originalPrice: 1499.99, // For showing discounts
    rating: 4.8,
    reviewCount: 234,
    imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Laptop',
    images: [
      'https://placehold.co/600x400/1a202c/ffffff?text=Laptop-1',
      'https://placehold.co/600x400/2a303c/ffffff?text=Laptop-2',
      'https://placehold.co/600x400/3a404c/ffffff?text=Laptop-3'
    ],
    description: 'A high-performance laptop for professionals and creatives. Features the latest QuantumCore processor for lightning-fast speeds.',
    specifications: {
      processor: 'Intel Core i7-13700H',
      memory: '16GB DDR5 RAM',
      storage: '512GB NVMe SSD',
      display: '15.6" 4K OLED Display',
      graphics: 'NVIDIA RTX 4060',
      battery: 'Up to 12 hours',
      weight: '4.2 lbs',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3, USB-C, HDMI',
      warranty: '2 years manufacturer warranty'
    },
    features: [
      'Lightning-fast QuantumCore processor',
      'Stunning 4K OLED display',
      'Advanced cooling system',
      'Premium aluminum build',
      'Backlit keyboard',
      'Fingerprint security'
    ],
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [
      { 
        id: 1, 
        userId: 1, 
        userName: 'John Doe', 
        rating: 5, 
        comment: 'Excellent laptop, very fast! Perfect for development work.', 
        date: '2024-01-15',
        verified: true,
        helpful: 23
      },
      { 
        id: 2, 
        userId: 2, 
        userName: 'Jane Smith', 
        rating: 4, 
        comment: 'Great build quality, good value. Battery life could be better.', 
        date: '2024-01-20',
        verified: true,
        helpful: 15
      }
    ],
    stock: 15,
    lowStockAlert: 10,
    variants: [
      { id: 1, type: 'storage', name: '512GB SSD', priceModifier: 0, stock: 15 },
      { id: 2, type: 'storage', name: '1TB SSD', priceModifier: 200, stock: 8 },
      { id: 3, type: 'color', name: 'Space Gray', priceModifier: 0, stock: 12 },
      { id: 4, type: 'color', name: 'Silver', priceModifier: 0, stock: 10 }
    ],
    tags: ['laptop', 'professional', 'gaming', 'high-performance', 'portable'],
    badges: ['Best Seller', 'Editor\'s Choice', 'Free Shipping'],
    shipping: {
      freeShipping: true,
      estimatedDays: '2-3 business days',
      methods: ['Standard', 'Express', 'Overnight']
    },
    returnPolicy: '30-day return policy',
    availability: 'in-stock',
    trending: true,
    lastUpdated: '2024-01-25T10:30:00Z',
    seoUrl: 'quantumcore-laptop-pro',
    crossSell: [2, 5], // Related product IDs
    upSell: [12] // Higher-tier product IDs
  },
  { 
    id: 2, 
    name: 'Aether Headphones Pro', 
    category: 'electronics',
    subcategory: 'audio',
    price: 199.99, 
    originalPrice: 249.99,
    rating: 4.6,
    reviewCount: 189,
    imageUrl: 'https://placehold.co/600x400/2d3748/ffffff?text=Headphones',
    images: [
      'https://placehold.co/600x400/2d3748/ffffff?text=Headphones-1',
      'https://placehold.co/600x400/3d4758/ffffff?text=Headphones-2',
      'https://placehold.co/600x400/4d5768/ffffff?text=Headphones-3'
    ],
    description: 'Immerse yourself in pure sound with these noise-cancelling over-ear headphones. Crystal clear audio and all-day comfort.',
    specifications: {
      driverSize: '40mm dynamic drivers',
      frequency: '20Hz - 20kHz',
      impedance: '32 ohms',
      sensitivity: '100dB/mW',
      battery: 'Up to 30 hours with ANC',
      charging: 'USB-C fast charging',
      weight: '250g',
      connectivity: 'Bluetooth 5.2, 3.5mm jack'
    },
    features: [
      'Active noise cancellation',
      'Hi-Res audio certified',
      '30-hour battery life',
      'Quick charge technology',
      'Foldable design',
      'Voice assistant support'
    ],
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [
      { 
        id: 3, 
        userId: 3, 
        userName: 'Mike Johnson', 
        rating: 5, 
        comment: 'Amazing sound quality! The noise cancellation is incredible.', 
        date: '2024-01-10',
        verified: true,
        helpful: 18
      }
    ],
    stock: 8,
    lowStockAlert: 5,
    variants: [
      { id: 5, type: 'color', name: 'Black', priceModifier: 0, stock: 5 },
      { id: 6, type: 'color', name: 'White', priceModifier: 25, stock: 3 }
    ],
    tags: ['headphones', 'audio', 'noise-cancelling', 'wireless', 'premium'],
    badges: ['Limited Stock', 'Premium Audio'],
    shipping: {
      freeShipping: true,
      estimatedDays: '1-2 business days',
      methods: ['Standard', 'Express']
    },
    returnPolicy: '30-day return policy',
    availability: 'low-stock',
    lastUpdated: '2024-01-24T15:45:00Z',
    seoUrl: 'aether-headphones-pro',
    crossSell: [1, 3],
    upSell: []
  },
  {
    id: 3,
    name: 'UltraFit Wireless Earbuds',
    category: 'electronics',
    subcategory: 'audio',
    price: 89.99,
    originalPrice: 129.99,
    rating: 4.5,
    reviewCount: 156,
    imageUrl: 'https://placehold.co/600x400/4f46e5/ffffff?text=Earbuds',
    images: [
      'https://placehold.co/600x400/4f46e5/ffffff?text=Earbuds-1',
      'https://placehold.co/600x400/5f56f5/ffffff?text=Earbuds-2'
    ],
    description: 'True wireless earbuds with premium sound quality and all-day battery life.',
    specifications: {
      battery: 'Up to 24 hours with case',
      connectivity: 'Bluetooth 5.0',
      waterproof: 'IPX7 rated',
      charging: 'Wireless charging case'
    },
    features: [
      'Active noise cancellation',
      'Touch controls',
      'Sweat resistant',
      'Quick pairing'
    ],
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [],
    stock: 45,
    lowStockAlert: 10,
    variants: [
      { id: 7, type: 'color', name: 'Black', priceModifier: 0, stock: 25 },
      { id: 8, type: 'color', name: 'White', priceModifier: 0, stock: 20 }
    ],
    tags: ['earbuds', 'wireless', 'audio', 'sports', 'compact'],
    badges: ['New Arrival', 'Trending'],
    shipping: {
      freeShipping: true,
      estimatedDays: '1-2 business days',
      methods: ['Standard', 'Express']
    },
    returnPolicy: '30-day return policy',
    availability: 'in-stock',
    trending: true,
    lastUpdated: '2024-01-26T12:00:00Z',
    seoUrl: 'ultrafit-wireless-earbuds',
    crossSell: [1, 2],
    upSell: [2]
  },
  {
    id: 4,
    name: 'SmartHome Security Camera',
    category: 'electronics',
    subcategory: 'smart-home',
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.7,
    reviewCount: 89,
    imageUrl: 'https://placehold.co/600x400/059669/ffffff?text=Camera',
    images: [
      'https://placehold.co/600x400/059669/ffffff?text=Camera-1'
    ],
    description: 'Advanced security camera with AI detection and cloud storage.',
    specifications: {
      resolution: '4K Ultra HD',
      vision: 'Night vision up to 30ft',
      detection: 'AI-powered motion detection',
      storage: 'Cloud storage included'
    },
    features: [
      '4K video recording',
      'Two-way audio',
      'Mobile app control',
      'Weather resistant'
    ],
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [],
    stock: 12,
    lowStockAlert: 15,
    variants: [
      { id: 9, type: 'model', name: 'Indoor', priceModifier: 0, stock: 8 },
      { id: 10, type: 'model', name: 'Outdoor', priceModifier: 50, stock: 4 }
    ],
    tags: ['security', 'smart-home', 'camera', 'ai', 'surveillance'],
    badges: ['Smart Home', 'AI Powered'],
    shipping: {
      freeShipping: true,
      estimatedDays: '2-3 business days',
      methods: ['Standard', 'Express']
    },
    returnPolicy: '30-day return policy',
    availability: 'low-stock',
    trending: false,
    lastUpdated: '2024-01-25T14:20:00Z',
    seoUrl: 'smarthome-security-camera',
    crossSell: [5],
    upSell: []
  }
  // More products will be added following this enhanced structure...
];