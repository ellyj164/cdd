export const products = [
  { 
    id: 1, 
    name: 'QuantumCore Laptop', 
    category: 'Electronics', 
    price: 1299.99, 
    rating: 4.8, 
    imageUrl: 'https://placehold.co/600x400/1a202c/ffffff?text=Laptop', 
    description: 'A high-performance laptop for professionals and creatives. Features the latest QuantumCore processor for lightning-fast speeds.',
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [
      { id: 1, userId: 1, userName: 'John Doe', rating: 5, comment: 'Excellent laptop, very fast!', date: '2024-01-15' },
      { id: 2, userId: 2, userName: 'Jane Smith', rating: 4, comment: 'Great build quality, good value.', date: '2024-01-20' }
    ],
    stock: 15,
    variants: [
      { id: 1, type: 'storage', name: '512GB SSD', priceModifier: 0 },
      { id: 2, type: 'storage', name: '1TB SSD', priceModifier: 200 },
      { id: 3, type: 'color', name: 'Space Gray', priceModifier: 0 },
      { id: 4, type: 'color', name: 'Silver', priceModifier: 0 }
    ]
  },
  { 
    id: 2, 
    name: 'Aether Headphones', 
    category: 'Electronics', 
    price: 199.99, 
    rating: 4.6, 
    imageUrl: 'https://placehold.co/600x400/2d3748/ffffff?text=Headphones', 
    description: 'Immerse yourself in pure sound with these noise-cancelling over-ear headphones. Crystal clear audio and all-day comfort.',
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [
      { id: 3, userId: 3, userName: 'Mike Johnson', rating: 5, comment: 'Amazing sound quality!', date: '2024-01-10' }
    ],
    stock: 8,
    variants: [
      { id: 5, type: 'color', name: 'Black', priceModifier: 0 },
      { id: 6, type: 'color', name: 'White', priceModifier: 25 }
    ]
  },
  { 
    id: 3, 
    name: 'StellarSmart Watch', 
    category: 'Wearables', 
    price: 349.99, 
    rating: 4.7, 
    imageUrl: 'https://placehold.co/600x400/4a5568/ffffff?text=Watch', 
    description: 'Stay connected and track your fitness goals with this stylish and powerful smartwatch. Packed with features to enhance your daily life.',
    vendorId: 2,
    vendorName: 'WearableTech',
    reviews: [
      { id: 4, userId: 4, userName: 'Sarah Wilson', rating: 4, comment: 'Great features, battery could be better.', date: '2024-01-12' }
    ],
    stock: 12,
    variants: [
      { id: 7, type: 'size', name: '42mm', priceModifier: 0 },
      { id: 8, type: 'size', name: '46mm', priceModifier: 50 }
    ]
  },
  { 
    id: 4, 
    name: 'Eco-Chic T-Shirt', 
    category: 'Apparel', 
    price: 39.99, 
    rating: 4.9, 
    imageUrl: 'https://placehold.co/600x400/718096/ffffff?text=T-Shirt', 
    description: 'Made from 100% organic cotton, this t-shirt combines style with sustainability. Soft, comfortable, and eco-friendly.',
    vendorId: 3,
    vendorName: 'EcoFashion',
    reviews: [
      { id: 5, userId: 5, userName: 'Alex Brown', rating: 5, comment: 'Super comfortable and eco-friendly!', date: '2024-01-18' }
    ],
    stock: 25,
    variants: [
      { id: 9, type: 'size', name: 'Small', priceModifier: 0 },
      { id: 10, type: 'size', name: 'Medium', priceModifier: 0 },
      { id: 11, type: 'size', name: 'Large', priceModifier: 0 },
      { id: 12, type: 'size', name: 'X-Large', priceModifier: 5 },
      { id: 13, type: 'color', name: 'White', priceModifier: 0 },
      { id: 14, type: 'color', name: 'Black', priceModifier: 0 },
      { id: 15, type: 'color', name: 'Navy', priceModifier: 2 }
    ]
  },
  { 
    id: 5, 
    name: 'Urban Explorer Backpack', 
    category: 'Accessories', 
    price: 89.99, 
    rating: 4.5, 
    imageUrl: 'https://placehold.co/600x400/a0aec0/1a202c?text=Backpack', 
    description: 'The perfect backpack for your daily commute or weekend adventures. Durable, spacious, and designed for the modern explorer.',
    vendorId: 4,
    vendorName: 'OutdoorGear',
    reviews: [
      { id: 6, userId: 6, userName: 'Chris Lee', rating: 4, comment: 'Good quality, lots of pockets.', date: '2024-01-14' }
    ],
    stock: 18,
    variants: [
      { id: 16, type: 'color', name: 'Black', priceModifier: 0 },
      { id: 17, type: 'color', name: 'Gray', priceModifier: 0 },
      { id: 18, type: 'color', name: 'Olive', priceModifier: 10 }
    ]
  },
  { 
    id: 6, 
    name: 'Gourmet Coffee Blend', 
    category: 'Home Goods', 
    price: 24.99, 
    rating: 4.8, 
    imageUrl: 'https://placehold.co/600x400/edf2f7/1a202c?text=Coffee', 
    description: 'Start your day right with our signature blend of gourmet coffee beans. Ethically sourced and roasted to perfection.',
    vendorId: 5,
    vendorName: 'CoffeeCraft',
    reviews: [
      { id: 7, userId: 7, userName: 'Emma Davis', rating: 5, comment: 'Best coffee I\'ve ever tasted!', date: '2024-01-16' }
    ],
    stock: 50,
    variants: [
      { id: 19, type: 'roast', name: 'Light Roast', priceModifier: 0 },
      { id: 20, type: 'roast', name: 'Medium Roast', priceModifier: 0 },
      { id: 21, type: 'roast', name: 'Dark Roast', priceModifier: 2 }
    ]
  },
  { 
    id: 7, 
    name: 'Nova Desk Lamp', 
    category: 'Home Goods', 
    price: 79.99, 
    rating: 4.4, 
    imageUrl: 'https://placehold.co/600x400/e2e8f0/1a202c?text=Lamp', 
    description: 'Illuminate your workspace with this sleek and modern LED desk lamp. Adjustable brightness and color temperature for optimal lighting.',
    vendorId: 6,
    vendorName: 'LightingPro',
    reviews: [
      { id: 8, userId: 8, userName: 'Tom Wilson', rating: 4, comment: 'Great design, good lighting.', date: '2024-01-11' }
    ],
    stock: 10,
    variants: [
      { id: 22, type: 'color', name: 'White', priceModifier: 0 },
      { id: 23, type: 'color', name: 'Black', priceModifier: 0 }
    ]
  },
  { 
    id: 8, 
    name: 'FlexFit Yoga Mat', 
    category: 'Sports', 
    price: 49.99, 
    rating: 4.7, 
    imageUrl: 'https://placehold.co/600x400/cbd5e0/1a202c?text=Yoga+Mat', 
    description: 'Find your flow with this non-slip, eco-friendly yoga mat. Provides excellent cushioning and support for all your poses.',
    vendorId: 7,
    vendorName: 'FitnessZen',
    reviews: [
      { id: 9, userId: 9, userName: 'Lisa Garcia', rating: 5, comment: 'Perfect grip, very comfortable.', date: '2024-01-13' }
    ],
    stock: 20,
    variants: [
      { id: 24, type: 'color', name: 'Purple', priceModifier: 0 },
      { id: 25, type: 'color', name: 'Blue', priceModifier: 0 },
      { id: 26, type: 'color', name: 'Pink', priceModifier: 5 }
    ]
  },
  { 
    id: 9, 
    name: 'Zenith Fountain Pen', 
    category: 'Accessories', 
    price: 129.99, 
    rating: 4.9, 
    imageUrl: 'https://placehold.co/600x400/bfdbfe/1e3a8a?text=Pen', 
    description: 'Experience the art of writing with this exquisite fountain pen. A timeless instrument for those who appreciate fine craftsmanship.',
    vendorId: 8,
    vendorName: 'LuxuryPens',
    reviews: [
      { id: 10, userId: 10, userName: 'David Chen', rating: 5, comment: 'Excellent writing experience!', date: '2024-01-17' }
    ],
    stock: 5,
    variants: [
      { id: 27, type: 'nib', name: 'Fine', priceModifier: 0 },
      { id: 28, type: 'nib', name: 'Medium', priceModifier: 0 },
      { id: 29, type: 'nib', name: 'Broad', priceModifier: 15 }
    ]
  },
  { 
    id: 10, 
    name: 'CyberStream Gaming Mouse', 
    category: 'Electronics', 
    price: 75.50, 
    rating: 4.6, 
    imageUrl: 'https://placehold.co/600x400/93c5fd/1e3a8a?text=Mouse', 
    description: 'Gain a competitive edge with this ultra-responsive gaming mouse. Customizable buttons and RGB lighting for a personalized setup.',
    vendorId: 1,
    vendorName: 'TechCorp',
    reviews: [
      { id: 11, userId: 11, userName: 'Kyle Martinez', rating: 4, comment: 'Great for gaming, responsive.', date: '2024-01-19' }
    ],
    stock: 22,
    variants: [
      { id: 30, type: 'dpi', name: '6400 DPI', priceModifier: 0 },
      { id: 31, type: 'dpi', name: '12800 DPI', priceModifier: 25 }
    ]
  },
  { 
    id: 11, 
    name: 'Organic Cotton Throw', 
    category: 'Home Goods', 
    price: 110.00, 
    rating: 4.8, 
    imageUrl: 'https://placehold.co/600x400/60a5fa/1e3a8a?text=Throw', 
    description: 'Cozy up with this luxuriously soft throw blanket, made from 100% organic cotton. Perfect for any season.',
    vendorId: 3,
    vendorName: 'EcoFashion',
    reviews: [
      { id: 12, userId: 12, userName: 'Amy Taylor', rating: 5, comment: 'So soft and cozy!', date: '2024-01-21' }
    ],
    stock: 14,
    variants: [
      { id: 32, type: 'color', name: 'Cream', priceModifier: 0 },
      { id: 33, type: 'color', name: 'Gray', priceModifier: 0 },
      { id: 34, type: 'color', name: 'Navy', priceModifier: 10 }
    ]
  },
  { 
    id: 12, 
    name: 'TrailBlazer Hiking Boots', 
    category: 'Apparel', 
    price: 220.00, 
    rating: 4.7, 
    imageUrl: 'https://placehold.co/600x400/3b82f6/ffffff?text=Boots', 
    description: 'Conquer any trail with these durable and waterproof hiking boots. Designed for maximum comfort and support on rugged terrain.',
    vendorId: 4,
    vendorName: 'OutdoorGear',
    reviews: [
      { id: 13, userId: 13, userName: 'Rob Anderson', rating: 4, comment: 'Sturdy boots, great for hiking.', date: '2024-01-22' }
    ],
    stock: 7,
    variants: [
      { id: 35, type: 'size', name: '8', priceModifier: 0 },
      { id: 36, type: 'size', name: '9', priceModifier: 0 },
      { id: 37, type: 'size', name: '10', priceModifier: 0 },
      { id: 38, type: 'size', name: '11', priceModifier: 0 },
      { id: 39, type: 'color', name: 'Brown', priceModifier: 0 },
      { id: 40, type: 'color', name: 'Black', priceModifier: 0 }
    ]
  }
];
