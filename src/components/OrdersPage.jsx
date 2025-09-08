'use client';

import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  XCircle, 
  Clock, 
  Eye, 
  Download,
  Search,
  Filter,
  Calendar,
  MapPin,
  Star
} from 'lucide-react';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  useEffect(() => {
    // Mock data - replace with actual API calls
    const mockOrders = [
      {
        id: 'ORD-2024-001',
        date: '2024-01-15',
        status: 'delivered',
        total: 89.99,
        items: [
          { name: 'Wireless Headphones', quantity: 1, price: 89.99, image: '/api/placeholder/80/80' }
        ],
        shippingAddress: '123 Main St, New York, NY 10001',
        estimatedDelivery: '2024-01-17',
        trackingNumber: 'TRK123456789',
        vendor: 'TechStore Pro'
      },
      {
        id: 'ORD-2024-002',
        date: '2024-01-10',
        status: 'shipped',
        total: 156.50,
        items: [
          { name: 'Smart Watch', quantity: 1, price: 129.99, image: '/api/placeholder/80/80' },
          { name: 'Phone Case', quantity: 1, price: 26.51, image: '/api/placeholder/80/80' }
        ],
        shippingAddress: '456 Oak Ave, Los Angeles, CA 90210',
        estimatedDelivery: '2024-01-18',
        trackingNumber: 'TRK987654321',
        vendor: 'GadgetWorld'
      },
      {
        id: 'ORD-2024-003',
        date: '2024-01-05',
        status: 'processing',
        total: 45.00,
        items: [
          { name: 'USB Cable', quantity: 2, price: 22.50, image: '/api/placeholder/80/80' }
        ],
        shippingAddress: '789 Pine St, Chicago, IL 60601',
        estimatedDelivery: '2024-01-20',
        trackingNumber: null,
        vendor: 'AccessoryHub'
      },
      {
        id: 'ORD-2024-004',
        date: '2024-01-03',
        status: 'cancelled',
        total: 299.99,
        items: [
          { name: 'Gaming Keyboard', quantity: 1, price: 299.99, image: '/api/placeholder/80/80' }
        ],
        shippingAddress: '321 Elm St, Miami, FL 33101',
        estimatedDelivery: null,
        trackingNumber: null,
        vendor: 'GameGear Store'
      },
      {
        id: 'ORD-2024-005',
        date: '2023-12-28',
        status: 'delivered',
        total: 75.25,
        items: [
          { name: 'Bluetooth Speaker', quantity: 1, price: 75.25, image: '/api/placeholder/80/80' }
        ],
        shippingAddress: '654 Maple Dr, Seattle, WA 98101',
        estimatedDelivery: '2023-12-30',
        trackingNumber: 'TRK555666777',
        vendor: 'AudioPlus'
      }
    ];

    setTimeout(() => {
      setOrders(mockOrders);
      setFilteredOrders(mockOrders);
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    let filtered = orders;

    // Filter by status
    if (selectedStatus !== 'all') {
      filtered = filtered.filter(order => order.status === selectedStatus);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(order => 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        order.vendor.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Sort orders
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'date-desc':
          return new Date(b.date) - new Date(a.date);
        case 'date-asc':
          return new Date(a.date) - new Date(b.date);
        case 'total-desc':
          return b.total - a.total;
        case 'total-asc':
          return a.total - b.total;
        default:
          return 0;
      }
    });

    setFilteredOrders(filtered);
  }, [orders, selectedStatus, searchTerm, sortBy]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered':
        return <CheckCircle className="h-5 w-5 text-green-600" />;
      case 'shipped':
        return <Truck className="h-5 w-5 text-blue-600" />;
      case 'processing':
        return <Clock className="h-5 w-5 text-yellow-600" />;
      case 'cancelled':
        return <XCircle className="h-5 w-5 text-red-600" />;
      default:
        return <Package className="h-5 w-5 text-gray-600" />;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'text-green-600 bg-green-100';
      case 'shipped': return 'text-blue-600 bg-blue-100';
      case 'processing': return 'text-yellow-600 bg-yellow-100';
      case 'cancelled': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const statusCounts = orders.reduce((acc, order) => {
    acc[order.status] = (acc[order.status] || 0) + 1;
    return acc;
  }, {});

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-300 dark:bg-gray-700 rounded w-1/4 mb-8"></div>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="h-24 bg-gray-300 dark:bg-gray-700 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Track and manage your orders
          </p>
        </div>

        {/* Status Overview */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
          <div 
            className={`p-4 rounded-lg cursor-pointer transition-colors ${
              selectedStatus === 'all' 
                ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' 
                : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
            }`}
            onClick={() => setSelectedStatus('all')}
          >
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 text-gray-600 dark:text-gray-400" />
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{orders.length}</p>
              <p className="text-sm text-gray-600 dark:text-gray-400">All Orders</p>
            </div>
          </div>

          {['processing', 'shipped', 'delivered', 'cancelled'].map((status) => (
            <div 
              key={status}
              className={`p-4 rounded-lg cursor-pointer transition-colors ${
                selectedStatus === status 
                  ? 'bg-blue-100 dark:bg-blue-900 border-2 border-blue-500' 
                  : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700'
              }`}
              onClick={() => setSelectedStatus(status)}
            >
              <div className="text-center">
                {getStatusIcon(status)}
                <p className="text-2xl font-bold text-gray-900 dark:text-white mt-2">
                  {statusCounts[status] || 0}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">{status}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Filters and Search */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search orders, products, or vendors..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex space-x-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              >
                <option value="date-desc">Newest First</option>
                <option value="date-asc">Oldest First</option>
                <option value="total-desc">Highest Amount</option>
                <option value="total-asc">Lowest Amount</option>
              </select>
            </div>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-6">
          {filteredOrders.length === 0 ? (
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-12 text-center">
              <Package className="h-16 w-16 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No Orders Found</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {selectedStatus !== 'all' || searchTerm 
                  ? 'Try adjusting your filters or search terms.'
                  : 'You haven\'t placed any orders yet.'
                }
              </p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div key={order.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
                {/* Order Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{order.id}</h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Ordered on {new Date(order.date).toLocaleDateString()}
                        </p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </span>
                    </div>
                    <div className="mt-4 md:mt-0 flex items-center space-x-4">
                      <span className="text-lg font-bold text-gray-900 dark:text-white">
                        ${order.total.toFixed(2)}
                      </span>
                      <div className="flex space-x-2">
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Eye className="h-5 w-5" />
                        </button>
                        <button className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                          <Download className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="p-6">
                  <div className="space-y-4">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex items-center space-x-4">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="h-16 w-16 object-cover rounded-lg bg-gray-100 dark:bg-gray-700"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Quantity: {item.quantity} × ${item.price}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-gray-900 dark:text-white">
                            ${(item.quantity * item.price).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Details */}
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Shipping Address</h5>
                      <div className="flex items-start space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                        <p className="text-sm text-gray-600 dark:text-gray-400">{order.shippingAddress}</p>
                      </div>
                    </div>
                    
                    <div>
                      <h5 className="font-medium text-gray-900 dark:text-white mb-2">Order Details</h5>
                      <div className="space-y-1">
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Vendor: {order.vendor}
                        </p>
                        {order.trackingNumber && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Tracking: {order.trackingNumber}
                          </p>
                        )}
                        {order.estimatedDelivery && (
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            Est. Delivery: {new Date(order.estimatedDelivery).toLocaleDateString()}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-6 flex flex-wrap gap-3">
                    {order.status === 'delivered' && (
                      <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                        <Star className="h-4 w-4" />
                        <span>Write Review</span>
                      </button>
                    )}
                    
                    {order.trackingNumber && order.status !== 'delivered' && (
                      <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <Truck className="h-4 w-4" />
                        <span>Track Package</span>
                      </button>
                    )}
                    
                    {order.status === 'processing' && (
                      <button className="flex items-center space-x-2 px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors">
                        <XCircle className="h-4 w-4" />
                        <span>Cancel Order</span>
                      </button>
                    )}
                    
                    <button className="flex items-center space-x-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                      <Package className="h-4 w-4" />
                      <span>Reorder</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;