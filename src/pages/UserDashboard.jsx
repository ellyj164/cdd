import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User, 
  ShoppingBag, 
  Heart, 
  Settings,
  Package,
  Truck,
  MapPin,
  CreditCard,
  Bell,
  Star,
  Calendar,
  Download,
  Edit,
  Eye,
  Clock,
  CheckCircle,
  AlertCircle,
  Gift,
  Award,
  Percent
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext.jsx';
import { useOrderStore } from '../stores/useOrderStore.js';
import { useWishlistStore } from '../stores/useWishlistStore.js';
import { apiService } from '../services/apiService.js';

const UserDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { orders } = useOrderStore();
  const { wishlist } = useWishlistStore();
  
  const [activeTab, setActiveTab] = useState('overview');
  const [dashboardData, setDashboardData] = useState({
    stats: {
      totalOrders: 0,
      totalSpent: 0,
      wishlistItems: 0,
      loyaltyPoints: 0
    },
    recentOrders: [],
    addresses: [],
    paymentMethods: [],
    loading: true
  });
  const [showEditProfile, setShowEditProfile] = useState(false);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      setDashboardData(prev => ({ ...prev, loading: true }));
      
      // Try to load from API first, fallback to demo data
      try {
        const data = await apiService.user.getDashboard();
        setDashboardData(prev => ({ ...prev, ...data, loading: false }));
      } catch (error) {
        // Fallback demo data
        setDashboardData({
          stats: {
            totalOrders: 12,
            totalSpent: 2450.75,
            wishlistItems: wishlist?.length || 8,
            loyaltyPoints: 1250
          },
          recentOrders: [
            { 
              id: 'ORD-001', 
              items: ['Premium Wireless Headphones', 'USB-C Cable'], 
              total: 329.98, 
              status: 'delivered', 
              date: '2024-01-10',
              trackingNumber: 'TRK123456789'
            },
            { 
              id: 'ORD-002', 
              items: ['Smart Fitness Watch'], 
              total: 199.99, 
              status: 'shipped', 
              date: '2024-01-12',
              trackingNumber: 'TRK987654321'
            },
            { 
              id: 'ORD-003', 
              items: ['Bluetooth Speaker', 'Phone Case'], 
              total: 129.98, 
              status: 'processing', 
              date: '2024-01-14',
              trackingNumber: null
            },
            { 
              id: 'ORD-004', 
              items: ['Laptop Stand'], 
              total: 49.99, 
              status: 'pending', 
              date: '2024-01-15',
              trackingNumber: null
            }
          ],
          addresses: [
            {
              id: 1,
              type: 'home',
              name: 'Home Address',
              street: '123 Main St',
              city: 'San Francisco',
              state: 'CA',
              zip: '94102',
              isDefault: true
            },
            {
              id: 2,
              type: 'work',
              name: 'Work Address',
              street: '456 Business Ave',
              city: 'San Francisco',
              state: 'CA',
              zip: '94105',
              isDefault: false
            }
          ],
          paymentMethods: [
            {
              id: 1,
              type: 'visa',
              last4: '4242',
              expiryMonth: 12,
              expiryYear: 2025,
              isDefault: true
            },
            {
              id: 2,
              type: 'mastercard',
              last4: '5555',
              expiryMonth: 8,
              expiryYear: 2026,
              isDefault: false
            }
          ],
          loading: false
        });
      }
    } catch (error) {
      console.error('Error loading user data:', error);
      setDashboardData(prev => ({ ...prev, loading: false }));
    }
  };

  const StatCard = ({ title, value, icon: Icon, color = 'blue', action }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 cursor-pointer hover:shadow-md transition-shadow"
      onClick={action}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl bg-${color}-50 text-${color}-600`}>
            <Icon className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'shipped': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-yellow-100 text-yellow-800';
      case 'pending': return 'bg-orange-100 text-orange-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status.toLowerCase()) {
      case 'delivered': return CheckCircle;
      case 'shipped': return Truck;
      case 'processing': return Clock;
      case 'pending': return AlertCircle;
      default: return Package;
    }
  };

  if (dashboardData.loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
                <User className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">My Account</h1>
                <p className="text-sm text-gray-500">Welcome back, {user?.name || 'User'}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => setShowEditProfile(true)}
                className="border border-gray-300 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-50 transition-colors"
              >
                <Edit className="w-4 h-4 inline mr-2" />
                Edit Profile
              </button>
              <div className="flex items-center space-x-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg">
                <Award className="w-4 h-4" />
                <span className="text-sm font-medium">{dashboardData.stats.loyaltyPoints} Points</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            title="Total Orders"
            value={dashboardData.stats.totalOrders.toString()}
            icon={ShoppingBag}
            color="blue"
            action={() => setActiveTab('orders')}
          />
          <StatCard
            title="Total Spent"
            value={`$${dashboardData.stats.totalSpent.toLocaleString()}`}
            icon={CreditCard}
            color="green"
          />
          <StatCard
            title="Wishlist Items"
            value={dashboardData.stats.wishlistItems.toString()}
            icon={Heart}
            color="red"
            action={() => navigate('/wishlist')}
          />
          <StatCard
            title="Loyalty Points"
            value={dashboardData.stats.loyaltyPoints.toLocaleString()}
            icon={Star}
            color="purple"
          />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {[
                { id: 'overview', label: 'Overview', icon: User },
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
                { id: 'addresses', label: 'Addresses', icon: MapPin },
                { id: 'payment', label: 'Payment Methods', icon: CreditCard },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100"
            >
              <div className="p-6 border-b border-gray-200 flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900">Recent Orders</h3>
                <Link 
                  to="/orders" 
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View All
                </Link>
              </div>
              <div className="p-6 space-y-4">
                {dashboardData.recentOrders.slice(0, 3).map((order) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <div key={order.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gray-100 rounded-full">
                          <StatusIcon className="w-5 h-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">{order.items.join(', ')}</p>
                          <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <p className="text-sm text-gray-500">{order.date}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl shadow-sm border border-gray-100 p-6"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: 'Track Order', icon: Truck, color: 'bg-blue-500 hover:bg-blue-600', action: () => navigate('/track-order') },
                  { label: 'Wishlist', icon: Heart, color: 'bg-red-500 hover:bg-red-600', action: () => navigate('/wishlist') },
                  { label: 'Coupons', icon: Percent, color: 'bg-green-500 hover:bg-green-600' },
                  { label: 'Support', icon: Bell, color: 'bg-purple-500 hover:bg-purple-600', action: () => navigate('/help-center') }
                ].map((action, index) => (
                  <button
                    key={index}
                    onClick={action.action}
                    className={`${action.color} text-white p-4 rounded-lg transition-colors flex flex-col items-center space-y-2`}
                  >
                    <action.icon className="w-6 h-6" />
                    <span className="text-sm font-medium">{action.label}</span>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}

        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Order History</h3>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.recentOrders.map((order) => {
                const StatusIcon = getStatusIcon(order.status);
                return (
                  <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center space-x-3">
                        <StatusIcon className="w-5 h-5 text-gray-600" />
                        <div>
                          <p className="font-semibold text-gray-900">{order.id}</p>
                          <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">${order.total}</p>
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                    <div className="border-t border-gray-100 pt-3">
                      <p className="text-sm text-gray-600 mb-2">Items:</p>
                      <p className="text-sm text-gray-900">{order.items.join(', ')}</p>
                      {order.trackingNumber && (
                        <div className="mt-2 flex items-center space-x-2">
                          <Truck className="w-4 h-4 text-gray-400" />
                          <span className="text-sm text-gray-600">Tracking: {order.trackingNumber}</span>
                        </div>
                      )}
                      <div className="mt-3 flex space-x-2">
                        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                          <Eye className="w-4 h-4 inline mr-1" />
                          View Details
                        </button>
                        {order.status === 'delivered' && (
                          <button className="text-green-600 hover:text-green-800 text-sm font-medium">
                            <Download className="w-4 h-4 inline mr-1" />
                            Download Invoice
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}

        {activeTab === 'addresses' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Saved Addresses</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Add Address
              </button>
            </div>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              {dashboardData.addresses.map((address) => (
                <div key={address.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold text-gray-900 flex items-center">
                      <MapPin className="w-4 h-4 mr-2" />
                      {address.name}
                    </h4>
                    {address.isDefault && (
                      <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600">
                    {address.street}<br />
                    {address.city}, {address.state} {address.zip}
                  </p>
                  <div className="mt-3 flex space-x-2">
                    <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                      Edit
                    </button>
                    <button className="text-red-600 hover:text-red-800 text-sm font-medium">
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'payment' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">Payment Methods</h3>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Add Card
              </button>
            </div>
            <div className="p-6 space-y-4">
              {dashboardData.paymentMethods.map((method) => (
                <div key={method.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-8 h-8 text-gray-400" />
                      <div>
                        <p className="font-semibold text-gray-900">
                          **** **** **** {method.last4}
                        </p>
                        <p className="text-sm text-gray-500">
                          {method.type.charAt(0).toUpperCase() + method.type.slice(1)} • Expires {method.expiryMonth}/{method.expiryYear}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <button className="text-gray-400 hover:text-gray-600">
                        <Edit className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100"
          >
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Email Notifications</h4>
                  <p className="text-sm text-gray-500">Receive emails about your orders and promotions</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">SMS Notifications</h4>
                  <p className="text-sm text-gray-500">Receive text messages about your orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">Marketing Communications</h4>
                  <p className="text-sm text-gray-500">Receive promotional offers and updates</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <hr className="border-gray-200" />

              <div className="space-y-4">
                <h4 className="font-medium text-gray-900">Account Actions</h4>
                <div className="space-y-2">
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Download My Data</span>
                      <Download className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Get a copy of your account data</p>
                  </button>
                  <button className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-900">Change Password</span>
                      <Settings className="w-4 h-4 text-gray-400" />
                    </div>
                    <p className="text-sm text-gray-500 mt-1">Update your password</p>
                  </button>
                  <button className="w-full text-left p-3 border border-red-200 rounded-lg hover:bg-red-50 transition-colors text-red-600">
                    <div className="flex items-center justify-between">
                      <span>Delete Account</span>
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <p className="text-sm text-red-500 mt-1">Permanently delete your account</p>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Edit Profile Modal */}
      {showEditProfile && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-xl max-w-md w-full mx-4 p-6"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Edit Profile</h3>
              <button 
                onClick={() => setShowEditProfile(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                <input
                  type="text"
                  defaultValue={user?.name?.split(' ')[0] || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                <input
                  type="text"
                  defaultValue={user?.name?.split(' ')[1] || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  defaultValue={user?.email || ''}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input
                  type="tel"
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="(555) 123-4567"
                />
              </div>
              <div className="flex space-x-3 pt-4">
                <button
                  onClick={() => setShowEditProfile(false)}
                  className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;
