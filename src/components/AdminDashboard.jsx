import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Users,
  Shield,
  Package,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  Edit,
  Trash2,
  Search,
  Filter,
  Download,
  Settings,
  UserCheck,
  UserX,
  FileText,
  BarChart3,
  DollarSign,
  ShoppingCart,
  Star,
  MessageSquare,
  Flag,
  Ban,
  RefreshCw,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Building,
  Award,
  Zap,
  Layout,
  Grid3X3
} from 'lucide-react';
import HomepageLayoutManager from './admin/HomepageLayoutManager.jsx';
import CategoryManager from './admin/CategoryManager.jsx';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [userFilter, setUserFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalVendors: 0,
    totalProducts: 0,
    pendingReviews: 0,
    totalRevenue: 0,
    monthlyGrowth: 0,
    activeOrders: 0,
    reportedItems: 0
  });

  useEffect(() => {
    // Mock data
    const mockUsers = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john.doe@example.com',
        phone: '+1 (555) 123-4567',
        role: 'customer',
        status: 'active',
        verified: true,
        registrationDate: '2023-01-15',
        lastLogin: '2024-01-15',
        totalOrders: 24,
        totalSpent: 1250.00,
        kycStatus: 'verified',
        profileImage: '/api/placeholder/40/40'
      },
      {
        id: '2',
        name: 'TechStore Pro',
        email: 'contact@techstore.com',
        phone: '+1 (555) 987-6543',
        role: 'vendor',
        status: 'active',
        verified: true,
        registrationDate: '2023-03-20',
        lastLogin: '2024-01-14',
        totalOrders: 156,
        totalSpent: 0,
        averageRating: 4.8,
        kycStatus: 'verified',
        vendorInfo: {
          businessName: 'TechStore Pro',
          businessType: 'Electronics Retailer',
          totalProducts: 45,
          totalRevenue: 25600.00,
          rating: 4.8,
          approvalStatus: 'approved'
        }
      },
      {
        id: '3',
        name: 'Fashion Boutique',
        email: 'info@fashionboutique.com',
        role: 'vendor',
        status: 'pending',
        verified: false,
        registrationDate: '2024-01-10',
        lastLogin: '2024-01-12',
        totalOrders: 0,
        totalSpent: 0,
        kycStatus: 'pending',
        vendorInfo: {
          businessName: 'Fashion Boutique',
          businessType: 'Fashion Retailer',
          totalProducts: 0,
          totalRevenue: 0,
          rating: 0,
          approvalStatus: 'pending'
        }
      }
    ];

    const mockProducts = [
      {
        id: '1',
        name: 'Wireless Bluetooth Headphones',
        vendor: 'TechStore Pro',
        vendorId: '2',
        category: 'Electronics',
        price: 99.99,
        status: 'active',
        moderationStatus: 'approved',
        createdAt: '2023-11-15',
        lastModified: '2024-01-10',
        totalSales: 125,
        rating: 4.7,
        reviewCount: 89,
        reportCount: 0,
        images: ['/api/placeholder/300/300']
      },
      {
        id: '2',
        name: 'Suspicious Product',
        vendor: 'Unknown Seller',
        vendorId: '4',
        category: 'Misc',
        price: 999.99,
        status: 'inactive',
        moderationStatus: 'flagged',
        createdAt: '2024-01-12',
        lastModified: '2024-01-12',
        totalSales: 0,
        rating: 0,
        reviewCount: 0,
        reportCount: 5,
        images: ['/api/placeholder/300/300']
      }
    ];

    const mockStats = {
      totalUsers: 2456,
      totalVendors: 234,
      totalProducts: 1234,
      pendingReviews: 23,
      totalRevenue: 125600.00,
      monthlyGrowth: 12.5,
      activeOrders: 156,
      reportedItems: 8
    };

    setUsers(mockUsers);
    setProducts(mockProducts);
    setStats(mockStats);
  }, []);

  const handleUserStatusChange = (userId, newStatus) => {
    setUsers(prev => prev.map(user =>
      user.id === userId ? { ...user, status: newStatus } : user
    ));
  };

  const handleProductModerationAction = (productId, action) => {
    setProducts(prev => prev.map(product =>
      product.id === productId 
        ? { 
            ...product, 
            moderationStatus: action === 'approve' ? 'approved' : action === 'reject' ? 'rejected' : 'flagged',
            status: action === 'approve' ? 'active' : action === 'reject' ? 'inactive' : product.status
          } 
        : product
    ));
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = userFilter === 'all' || user.role === userFilter || user.status === userFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.vendor.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = productFilter === 'all' || product.moderationStatus === productFilter;
    return matchesSearch && matchesFilter;
  });

  const renderOverview = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <Users className="h-8 w-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Users</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalUsers.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <Building className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Active Vendors</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalVendors.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <Package className="h-8 w-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Products</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.totalProducts.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <div className="flex items-center">
            <DollarSign className="h-8 w-8 text-green-600" />
            <div className="ml-4">
              <p className="text-sm text-gray-600 dark:text-gray-400">Total Revenue</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">${stats.totalRevenue.toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Items */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Pending Actions</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-5 w-5 text-yellow-600" />
                <span className="text-yellow-800 dark:text-yellow-200">Pending Product Reviews</span>
              </div>
              <span className="bg-yellow-200 dark:bg-yellow-800 text-yellow-800 dark:text-yellow-200 px-2 py-1 rounded-full text-sm font-medium">
                {stats.pendingReviews}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Flag className="h-5 w-5 text-red-600" />
                <span className="text-red-800 dark:text-red-200">Reported Items</span>
              </div>
              <span className="bg-red-200 dark:bg-red-800 text-red-800 dark:text-red-200 px-2 py-1 rounded-full text-sm font-medium">
                {stats.reportedItems}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <span className="text-blue-800 dark:text-blue-200">Vendor Applications</span>
              </div>
              <span className="bg-blue-200 dark:bg-blue-800 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-sm font-medium">
                3
              </span>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
          <div className="space-y-3">
            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Product approved</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Wireless Headphones by TechStore Pro</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">New vendor registered</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Fashion Boutique - pending review</p>
              </div>
            </div>

            <div className="flex items-center space-x-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
              <Flag className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-sm font-medium text-gray-900 dark:text-white">Product reported</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Suspicious Product - 5 reports</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderUsers = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>
          
          <div className="flex space-x-3">
            <select
              value={userFilter}
              onChange={(e) => setUserFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Users</option>
              <option value="customer">Customers</option>
              <option value="vendor">Vendors</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="w-12 px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    className="text-blue-600 focus:ring-blue-500"
                  />
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Joined
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Orders/Revenue
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4">
                    <input type="checkbox" className="text-blue-600 focus:ring-blue-500" />
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <img
                        src={user.profileImage || '/api/placeholder/40/40'}
                        alt={user.name}
                        className="h-10 w-10 rounded-full mr-4"
                      />
                      <div>
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.role === 'admin' ? 'bg-purple-100 text-purple-800' :
                      user.role === 'vendor' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(user.registrationDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {user.role === 'vendor' && user.vendorInfo ? (
                      <div>
                        <div>{user.vendorInfo.totalProducts} products</div>
                        <div className="text-gray-500">${user.vendorInfo.totalRevenue.toLocaleString()}</div>
                      </div>
                    ) : (
                      <div>
                        <div>{user.totalOrders} orders</div>
                        <div className="text-gray-500">${user.totalSpent.toLocaleString()}</div>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      <button className="p-1 text-gray-400 hover:text-green-600 transition-colors">
                        <Edit className="h-4 w-4" />
                      </button>
                      {user.status === 'active' ? (
                        <button 
                          onClick={() => handleUserStatusChange(user.id, 'suspended')}
                          className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                        >
                          <Ban className="h-4 w-4" />
                        </button>
                      ) : (
                        <button 
                          onClick={() => handleUserStatusChange(user.id, 'active')}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderModeration = () => (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
          <div className="flex-1 max-w-md">
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
          
          <div className="flex space-x-3">
            <select
              value={productFilter}
              onChange={(e) => setProductFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            >
              <option value="all">All Products</option>
              <option value="pending">Pending Review</option>
              <option value="flagged">Flagged</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Reports
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
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
                          {product.category} • ${product.price}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {product.vendor}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      product.moderationStatus === 'approved' ? 'bg-green-100 text-green-800' :
                      product.moderationStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                      product.moderationStatus === 'flagged' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {product.moderationStatus.charAt(0).toUpperCase() + product.moderationStatus.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {product.reportCount > 0 ? (
                      <span className="flex items-center text-red-600">
                        <Flag className="h-4 w-4 mr-1" />
                        {product.reportCount}
                      </span>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                    {new Date(product.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center space-x-2">
                      <button className="p-1 text-gray-400 hover:text-blue-600 transition-colors">
                        <Eye className="h-4 w-4" />
                      </button>
                      {product.moderationStatus !== 'approved' && (
                        <button 
                          onClick={() => handleProductModerationAction(product.id, 'approve')}
                          className="p-1 text-gray-400 hover:text-green-600 transition-colors"
                        >
                          <CheckCircle className="h-4 w-4" />
                        </button>
                      )}
                      <button 
                        onClick={() => handleProductModerationAction(product.id, 'flag')}
                        className="p-1 text-gray-400 hover:text-yellow-600 transition-colors"
                      >
                        <Flag className="h-4 w-4" />
                      </button>
                      <button 
                        onClick={() => handleProductModerationAction(product.id, 'reject')}
                        className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <XCircle className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Admin Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">Manage users, products, and platform operations</p>
        </div>

        {/* Navigation Tabs */}
        <div className="mb-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {[
              { id: 'overview', name: 'Overview', icon: BarChart3 },
              { id: 'homepage', name: 'Homepage', icon: Layout },
              { id: 'categories', name: 'Categories', icon: Grid3X3 },
              { id: 'users', name: 'Users', icon: Users },
              { id: 'vendors', name: 'Vendors', icon: Building },
              { id: 'products', name: 'Products', icon: Package },
              { id: 'moderation', name: 'Moderation', icon: Shield },
              { id: 'analytics', name: 'Analytics', icon: TrendingUp }
            ].map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-3 py-2 font-medium text-sm rounded-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                      : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{tab.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'homepage' && <HomepageLayoutManager />}
          {activeTab === 'categories' && <CategoryManager />}
          {activeTab === 'users' && renderUsers()}
          {activeTab === 'vendors' && renderUsers()}
          {activeTab === 'products' && renderModeration()}
          {activeTab === 'moderation' && renderModeration()}
          {activeTab === 'analytics' && (
            <div className="bg-white dark:bg-gray-800 rounded-lg p-12 text-center">
              <BarChart3 className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">Analytics Dashboard</h3>
              <p className="text-gray-500 dark:text-gray-400">Detailed analytics and reporting features coming soon</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;