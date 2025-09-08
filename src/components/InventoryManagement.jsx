'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Package,
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  Edit,
  Trash2,
  Eye,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  TrendingDown,
  BarChart3,
  RefreshCw,
  Settings,
  Camera,
  Tag,
  DollarSign,
  Box,
  Truck,
  Archive,
  Globe,
  Star
} from 'lucide-react';

const InventoryManagement = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [stockMovements, setStockMovements] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name-asc');
  const [viewMode, setViewMode] = useState('list');
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showStockMovements, setShowStockMovements] = useState(false);
  const [showBulkActions, setShowBulkActions] = useState(false);
  const [inventoryStats, setInventoryStats] = useState({
    totalProducts: 0,
    lowStockItems: 0,
    outOfStockItems: 0,
    totalValue: 0,
    averageStockLevel: 0
  });

  // Mock data
  useEffect(() => {
    const mockProducts = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        sku: 'WBH-001',
        category: 'Electronics',
        price: 99.99,
        costPrice: 60.00,
        stock: 45,
        lowStockThreshold: 10,
        status: 'active',
        images: ['/api/placeholder/300/300'],
        description: 'High-quality wireless headphones with noise cancellation',
        weight: 0.3,
        dimensions: { length: 20, width: 18, height: 8 },
        variants: [
          { id: 'v1', name: 'Black', sku: 'WBH-001-BLK', price: 99.99, stock: 25, attributes: { color: 'Black' } },
          { id: 'v2', name: 'White', sku: 'WBH-001-WHT', price: 99.99, stock: 20, attributes: { color: 'White' } }
        ],
        suppliers: [{ id: 's1', name: 'Audio Tech Corp', contact: 'orders@audiotech.com', leadTime: 14, minOrderQuantity: 50 }],
        lastRestocked: '2024-01-10',
        totalSold: 125,
        createdAt: '2023-11-15',
        updatedAt: '2024-01-15'
      },
      {
        id: '2',
        name: 'Smart Fitness Watch',
        sku: 'SFW-002',
        category: 'Electronics',
        price: 199.99,
        costPrice: 120.00,
        stock: 8,
        lowStockThreshold: 15,
        status: 'active',
        images: ['/api/placeholder/300/300'],
        description: 'Advanced fitness tracking with heart rate monitor',
        weight: 0.05,
        dimensions: { length: 4, width: 4, height: 1 },
        variants: [],
        suppliers: [{ id: 's2', name: 'Wearable Devices Inc', contact: 'supply@wearabledev.com', leadTime: 21, minOrderQuantity: 25 }],
        lastRestocked: '2023-12-20',
        totalSold: 89,
        createdAt: '2023-10-01',
        updatedAt: '2024-01-10'
      },
      {
        id: '3',
        name: 'Organic Cotton T-Shirt',
        sku: 'OCT-003',
        category: 'Fashion',
        price: 29.99,
        costPrice: 15.00,
        stock: 0,
        lowStockThreshold: 20,
        status: 'out_of_stock',
        images: ['/api/placeholder/300/300'],
        description: '100% organic cotton, sustainable fashion',
        weight: 0.2,
        dimensions: { length: 30, width: 25, height: 2 },
        variants: [
          { id: 'v3', name: 'Small', sku: 'OCT-003-S', price: 29.99, stock: 0, attributes: { size: 'S' } },
          { id: 'v4', name: 'Medium', sku: 'OCT-003-M', price: 29.99, stock: 0, attributes: { size: 'M' } },
          { id: 'v5', name: 'Large', sku: 'OCT-003-L', price: 29.99, stock: 0, attributes: { size: 'L' } }
        ],
        suppliers: [{ id: 's3', name: 'Eco Fashion Co', contact: 'orders@ecofashion.com', leadTime: 7, minOrderQuantity: 100 }],
        lastRestocked: '2023-11-01',
        totalSold: 234,
        createdAt: '2023-09-15',
        updatedAt: '2024-01-05'
      }
    ];

    const mockMovements = [
      {
        id: 'sm1',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        type: 'purchase',
        quantity: 50,
        reason: 'Restock order from supplier',
        date: '2024-01-10',
        reference: 'PO-2024-001'
      },
      {
        id: 'sm2',
        productId: '1',
        productName: 'Wireless Bluetooth Headphones',
        type: 'sale',
        quantity: -5,
        reason: 'Customer orders',
        date: '2024-01-12',
        reference: 'SO-2024-015'
      },
      {
        id: 'sm3',
        productId: '2',
        productName: 'Smart Fitness Watch',
        type: 'adjustment',
        quantity: -2,
        reason: 'Damaged units',
        date: '2024-01-08',
        reference: 'ADJ-2024-001'
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setStockMovements(mockMovements);

    // Calculate stats
    const stats = {
      totalProducts: mockProducts.length,
      lowStockItems: mockProducts.filter(p => p.stock <= p.lowStockThreshold && p.stock > 0).length,
      outOfStockItems: mockProducts.filter(p => p.stock === 0).length,
      totalValue: mockProducts.reduce((sum, p) => sum + (p.stock * p.costPrice), 0),
      averageStockLevel: mockProducts.reduce((sum, p) => sum + p.stock, 0) / mockProducts.length
    };
    setInventoryStats(stats);
  }, []);

  useEffect(() => {
    let filtered = products;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => product.status === statusFilter);
    }

    // Filter by category
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(product => product.category === categoryFilter);
    }

    // Sort products
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'stock-asc':
          return a.stock - b.stock;
        case 'stock-desc':
          return b.stock - a.stock;
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        default:
          return 0;
      }
    });

    setFilteredProducts(filtered);
  }, [products, searchTerm, statusFilter, categoryFilter, sortBy]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100 dark:bg-green-900 dark:text-green-300';
      case 'inactive': return 'text-gray-600 bg-gray-100 dark:bg-gray-700 dark:text-gray-300';
      case 'out_of_stock': return 'text-red-600 bg-red-100 dark:bg-red-900 dark:text-red-300';
      case 'discontinued': return 'text-orange-600 bg-orange-100 dark:bg-orange-900 dark:text-orange-300';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStockStatus = (product) => {
    if (product.stock === 0) return { status: 'Out of Stock', color: 'text-red-600' };
    if (product.stock <= product.lowStockThreshold) return { status: 'Low Stock', color: 'text-yellow-600' };
    return { status: 'In Stock', color: 'text-green-600' };
  };

  const categories = Array.from(new Set(products.map(p => p.category)));

  const handleBulkStatusChange = (newStatus) => {
    setProducts(prev => prev.map(product =>
      selectedProducts.includes(product.id)
        ? { ...product, status: newStatus }
        : product
    ));
    setSelectedProducts([]);
    setShowBulkActions(false);
  };

  const handleDeleteProduct = (productId) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(prev => prev.filter(p => p.id !== productId));
    }
  };

  const handleStockAdjustment = (productId, newStock, reason) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const adjustment = newStock - product.stock;
    
    // Update product stock
    setProducts(prev => prev.map(p =>
      p.id === productId ? { ...p, stock: newStock, updatedAt: new Date().toISOString() } : p
    ));

    // Add stock movement
    const movement = {
      id: `sm_${Date.now()}`,
      productId,
      productName: product.name,
      type: 'adjustment',
      quantity: adjustment,
      reason,
      date: new Date().toISOString(),
      reference: `ADJ-${Date.now()}`
    };
    setStockMovements(prev => [movement, ...prev]);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Inventory Management</h1>
              <p className="text-gray-600 dark:text-gray-400">Manage your products and stock levels</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={() => setShowStockMovements(true)}
                className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
              >
                <BarChart3 className="h-4 w-4" />
                <span>Stock Movements</span>
              </button>
              <button
                onClick={() => setIsAddingProduct(true)}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <Package className="h-8 w-8 text-blue-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventoryStats.totalProducts}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <AlertTriangle className="h-8 w-8 text-yellow-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Low Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventoryStats.lowStockItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <Archive className="h-8 w-8 text-red-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Out of Stock</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{inventoryStats.outOfStockItems}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <DollarSign className="h-8 w-8 text-green-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Inventory Value</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">${inventoryStats.totalValue.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
              <div className="flex items-center">
                <TrendingUp className="h-8 w-8 text-purple-600" />
                <div className="ml-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">Avg Stock Level</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{Math.round(inventoryStats.averageStockLevel)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
            {/* Search */}
            <div className="lg:col-span-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Status Filter */}
            <div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="out_of_stock">Out of Stock</option>
                <option value="discontinued">Discontinued</option>
              </select>
            </div>

            {/* Category Filter */}
            <div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="all">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="name-asc">Name A-Z</option>
                <option value="name-desc">Name Z-A</option>
                <option value="stock-asc">Stock Low-High</option>
                <option value="stock-desc">Stock High-Low</option>
                <option value="price-asc">Price Low-High</option>
                <option value="price-desc">Price High-Low</option>
              </select>
            </div>

            {/* View Mode */}
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Package className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-400 hover:text-gray-600'}`}
              >
                <Box className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedProducts.length > 0 && (
            <div className="mt-4 flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <span className="text-sm text-blue-700 dark:text-blue-300">
                {selectedProducts.length} product{selectedProducts.length > 1 ? 's' : ''} selected
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleBulkStatusChange('active')}
                  className="px-3 py-1 bg-green-600 text-white rounded text-sm hover:bg-green-700"
                >
                  Activate
                </button>
                <button
                  onClick={() => handleBulkStatusChange('inactive')}
                  className="px-3 py-1 bg-gray-600 text-white rounded text-sm hover:bg-gray-700"
                >
                  Deactivate
                </button>
                <button
                  onClick={() => setSelectedProducts([])}
                  className="px-3 py-1 border border-gray-300 dark:border-gray-600 rounded text-sm hover:bg-gray-50 dark:hover:bg-gray-700"
                >
                  Clear
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Products List/Grid */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
          {viewMode === 'list' ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="w-12 px-6 py-3 text-left">
                      <input
                        type="checkbox"
                        checked={selectedProducts.length === filteredProducts.length}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedProducts(filteredProducts.map(p => p.id));
                          } else {
                            setSelectedProducts([]);
                          }
                        }}
                        className="text-blue-600 focus:ring-blue-500"
                      />
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Product
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      SKU
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Category
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Price
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Stock
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {filteredProducts.map((product) => {
                    const stockStatus = getStockStatus(product);
                    return (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedProducts.includes(product.id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedProducts(prev => [...prev, product.id]);
                              } else {
                                setSelectedProducts(prev => prev.filter(id => id !== product.id));
                              }
                            }}
                            className="text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center">
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="h-12 w-12 object-cover rounded-lg mr-4"
                            />
                            <div>
                              <div className="text-sm font-medium text-gray-900 dark:text-white">
                                {product.name}
                              </div>
                              <div className="text-sm text-gray-500 dark:text-gray-400">
                                {product.variants.length} variant{product.variants.length !== 1 ? 's' : ''}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {product.sku}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          {product.category}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <span className={`text-sm font-medium ${stockStatus.color}`}>
                              {product.stock}
                            </span>
                            {product.stock <= product.lowStockThreshold && (
                              <AlertTriangle className="h-4 w-4 text-yellow-500" />
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(product.status)}`}>
                            {product.status.replace('_', ' ').toUpperCase()}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => setEditingProduct(product)}
                              className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => {/* View product details */}}
                              className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDeleteProduct(product.id)}
                              className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
              {filteredProducts.map((product) => {
                const stockStatus = getStockStatus(product);
                return (
                  <div key={product.id} className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="relative">
                      <img
                        src={product.images[0]}
                        alt={product.name}
                        className="w-full h-48 object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        <input
                          type="checkbox"
                          checked={selectedProducts.includes(product.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProducts(prev => [...prev, product.id]);
                            } else {
                              setSelectedProducts(prev => prev.filter(id => id !== product.id));
                            }
                          }}
                          className="text-blue-600 focus:ring-blue-500"
                        />
                      </div>
                      <div className="absolute bottom-2 left-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(product.status)}`}>
                          {product.status.replace('_', ' ').toUpperCase()}
                        </span>
                      </div>
                    </div>
                    <div className="p-4">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">{product.name}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">{product.sku}</p>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price.toFixed(2)}</span>
                        <span className={`text-sm font-medium ${stockStatus.color}`}>
                          {product.stock} in stock
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 dark:text-gray-400">{product.category}</span>
                        <div className="flex space-x-1">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="p-1 text-gray-400 hover:text-blue-600 transition-colors"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => {/* View product details */}}
                            className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                          >
                            <Eye className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No products found</h3>
              <p className="text-gray-500 dark:text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryManagement;