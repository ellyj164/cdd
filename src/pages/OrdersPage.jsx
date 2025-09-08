import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Package,
  Truck,
  CheckCircle,
  Clock,
  AlertCircle,
  Eye,
  Download,
  Star,
  MessageCircle,
  ArrowLeft,
  Filter,
  Search,
  Calendar,
  MapPin,
  CreditCard,
  RotateCcw,
  Phone,
  Mail
} from 'lucide-react';
import { useOrderStore } from '../stores/useOrderStore.js';
import { useAuth } from '../contexts/AuthContext.jsx';
import { apiService } from '../services/apiService.js';
import { toast } from 'react-hot-toast';

const OrdersPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { orders } = useOrderStore();
  
  const [ordersData, setOrdersData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showOrderDetails, setShowOrderDetails] = useState(false);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      // Try to load from API first, fallback to demo data
      try {
        const data = await apiService.orders.getAll();
        setOrdersData(data);
      } catch (error) {
        // Fallback demo orders
        setOrdersData([
          {
            id: 'ORD-001-2024',
            orderNumber: '#ORD-001-2024',
            date: '2024-01-15',
            status: 'delivered',
            total: 329.98,
            items: [
              {
                id: 1,
                name: 'Premium Wireless Headphones',
                price: 299.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              },
              {
                id: 2,
                name: 'USB-C Cable',
                price: 29.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              }
            ],
            shipping: {
              method: 'Standard Shipping',
              cost: 0,
              address: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102'
              },
              trackingNumber: 'TRK123456789'
            },
            payment: {
              method: 'Credit Card',
              last4: '4242'
            },
            timeline: [
              { status: 'ordered', date: '2024-01-15', time: '10:30 AM', description: 'Order placed' },
              { status: 'processing', date: '2024-01-15', time: '2:15 PM', description: 'Order confirmed and processing' },
              { status: 'shipped', date: '2024-01-16', time: '9:00 AM', description: 'Order shipped' },
              { status: 'delivered', date: '2024-01-18', time: '3:45 PM', description: 'Order delivered' }
            ]
          },
          {
            id: 'ORD-002-2024',
            orderNumber: '#ORD-002-2024',
            date: '2024-01-12',
            status: 'shipped',
            total: 199.99,
            items: [
              {
                id: 3,
                name: 'Smart Fitness Watch',
                price: 199.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              }
            ],
            shipping: {
              method: 'Express Shipping',
              cost: 19.99,
              address: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102'
              },
              trackingNumber: 'TRK987654321'
            },
            payment: {
              method: 'Credit Card',
              last4: '4242'
            },
            timeline: [
              { status: 'ordered', date: '2024-01-12', time: '2:20 PM', description: 'Order placed' },
              { status: 'processing', date: '2024-01-12', time: '4:30 PM', description: 'Order confirmed and processing' },
              { status: 'shipped', date: '2024-01-13', time: '11:15 AM', description: 'Order shipped' }
            ]
          },
          {
            id: 'ORD-003-2024',
            orderNumber: '#ORD-003-2024',
            date: '2024-01-14',
            status: 'processing',
            total: 129.98,
            items: [
              {
                id: 4,
                name: 'Bluetooth Speaker',
                price: 89.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              },
              {
                id: 5,
                name: 'Phone Case',
                price: 39.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              }
            ],
            shipping: {
              method: 'Standard Shipping',
              cost: 0,
              address: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102'
              }
            },
            payment: {
              method: 'Credit Card',
              last4: '4242'
            },
            timeline: [
              { status: 'ordered', date: '2024-01-14', time: '1:15 PM', description: 'Order placed' },
              { status: 'processing', date: '2024-01-14', time: '3:00 PM', description: 'Order confirmed and processing' }
            ]
          },
          {
            id: 'ORD-004-2024',
            orderNumber: '#ORD-004-2024',
            date: '2024-01-15',
            status: 'pending',
            total: 49.99,
            items: [
              {
                id: 6,
                name: 'Laptop Stand',
                price: 49.99,
                quantity: 1,
                image: '/api/placeholder/80/80'
              }
            ],
            shipping: {
              method: 'Standard Shipping',
              cost: 9.99,
              address: {
                name: 'John Doe',
                street: '123 Main St',
                city: 'San Francisco',
                state: 'CA',
                zip: '94102'
              }
            },
            payment: {
              method: 'Credit Card',
              last4: '4242'
            },
            timeline: [
              { status: 'ordered', date: '2024-01-15', time: '4:30 PM', description: 'Order placed' }
            ]
          }
        ]);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
      toast.error('Failed to load orders');
    } finally {
      setLoading(false);
    }
  };

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

  const filteredOrders = ordersData.filter(order => {
    const matchesStatus = filterStatus === 'all' || order.status === filterStatus;
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setShowOrderDetails(true);
  };

  const OrderDetailsModal = () => {
    if (!selectedOrder) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto"
        >
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-900">Order Details</h2>
              <button 
                onClick={() => setShowOrderDetails(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                ×
              </button>
            </div>
            <p className="text-gray-500 mt-1">{selectedOrder.orderNumber}</p>
          </div>

          <div className="p-6 space-y-6">
            {/* Order Status */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Order Status</h3>
                <div className="flex items-center space-x-2">
                  {React.createElement(getStatusIcon(selectedOrder.status), { className: "w-5 h-5 text-gray-600" })}
                  <span className={`inline-flex px-2 py-1 text-sm font-semibold rounded-full ${getStatusColor(selectedOrder.status)}`}>
                    {selectedOrder.status.charAt(0).toUpperCase() + selectedOrder.status.slice(1)}
                  </span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Order Date</h3>
                <p className="text-gray-600">{selectedOrder.date}</p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">Total Amount</h3>
                <p className="text-2xl font-bold text-gray-900">${selectedOrder.total}</p>
              </div>
            </div>

            {/* Order Timeline */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Order Timeline</h3>
              <div className="space-y-4">
                {selectedOrder.timeline.map((event, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      {React.createElement(getStatusIcon(event.status), { className: "w-4 h-4 text-blue-600" })}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{event.description}</p>
                      <p className="text-sm text-gray-500">{event.date} at {event.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-4">Order Items</h3>
              <div className="space-y-3">
                {selectedOrder.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 border border-gray-200 rounded-lg p-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900">{item.name}</h4>
                      <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-900">${item.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Shipping Address</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="font-medium text-gray-900">{selectedOrder.shipping.address.name}</p>
                  <p className="text-gray-600">{selectedOrder.shipping.address.street}</p>
                  <p className="text-gray-600">
                    {selectedOrder.shipping.address.city}, {selectedOrder.shipping.address.state} {selectedOrder.shipping.address.zip}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Payment Method</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center space-x-2">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                    <span className="text-gray-600">
                      {selectedOrder.payment.method} ending in {selectedOrder.payment.last4}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Tracking Information */}
            {selectedOrder.shipping.trackingNumber && (
              <div>
                <h3 className="font-semibold text-gray-900 mb-4">Tracking Information</h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-blue-900">Tracking Number</p>
                      <p className="text-blue-700">{selectedOrder.shipping.trackingNumber}</p>
                    </div>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Track Package
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex space-x-3 pt-4 border-t border-gray-200">
              <button className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center">
                <Download className="w-4 h-4 mr-2" />
                Download Invoice
              </button>
              {selectedOrder.status === 'delivered' && (
                <button className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center">
                  <Star className="w-4 h-4 mr-2" />
                  Leave Review
                </button>
              )}
              {(selectedOrder.status === 'pending' || selectedOrder.status === 'processing') && (
                <button className="flex-1 border border-red-300 text-red-700 py-3 px-4 rounded-lg hover:bg-red-50 transition-colors flex items-center justify-center">
                  <RotateCcw className="w-4 h-4 mr-2" />
                  Cancel Order
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Your Orders</h1>
          <p className="text-gray-500 mt-1">{filteredOrders.length} orders found</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search orders..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex items-center space-x-4">
              {/* Status Filter */}
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Orders</option>
                <option value="pending">Pending</option>
                <option value="processing">Processing</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <button className="flex items-center space-x-2 border border-gray-300 rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors">
                <Calendar className="w-4 h-4" />
                <span>Date Range</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders List */}
        {filteredOrders.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-gray-100 rounded-full mx-auto mb-6 flex items-center justify-center">
              <Package className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">No orders found</h2>
            <p className="text-gray-500 mb-8">You haven't placed any orders yet</p>
            <Link
              to="/categories"
              className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => {
              const StatusIcon = getStatusIcon(order.status);
              return (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">{order.orderNumber}</h3>
                      <p className="text-sm text-gray-500">Ordered on {order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-gray-900">${order.total}</p>
                      <div className="flex items-center space-x-2 mt-1">
                        <StatusIcon className="w-4 h-4 text-gray-600" />
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(order.status)}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    {/* Items Preview */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Items ({order.items.length})</h4>
                      <div className="flex space-x-2">
                        {order.items.slice(0, 3).map((item) => (
                          <img
                            key={item.id}
                            src={item.image}
                            alt={item.name}
                            className="w-12 h-12 object-cover rounded border border-gray-200"
                          />
                        ))}
                        {order.items.length > 3 && (
                          <div className="w-12 h-12 bg-gray-100 rounded border border-gray-200 flex items-center justify-center">
                            <span className="text-xs text-gray-500">+{order.items.length - 3}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Shipping Info */}
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Shipping</h4>
                      <div className="text-sm text-gray-600">
                        <p>{order.shipping.method}</p>
                        {order.shipping.trackingNumber && (
                          <p className="text-blue-600">Tracking: {order.shipping.trackingNumber}</p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div className="flex space-x-3">
                      <button
                        onClick={() => handleViewOrder(order)}
                        className="flex items-center space-x-2 text-blue-600 hover:text-blue-800 font-medium"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Details</span>
                      </button>
                      
                      {order.status === 'delivered' && (
                        <button className="flex items-center space-x-2 text-green-600 hover:text-green-800 font-medium">
                          <Download className="w-4 h-4" />
                          <span>Download Invoice</span>
                        </button>
                      )}

                      {order.shipping.trackingNumber && (
                        <Link
                          to={`/track-order?tracking=${order.shipping.trackingNumber}`}
                          className="flex items-center space-x-2 text-purple-600 hover:text-purple-800 font-medium"
                        >
                          <Truck className="w-4 h-4" />
                          <span>Track Order</span>
                        </Link>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {order.status === 'delivered' && (
                        <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                          Buy Again
                        </button>
                      )}
                      
                      {(order.status === 'pending' || order.status === 'processing') && (
                        <button className="border border-red-300 text-red-600 px-4 py-2 rounded-lg text-sm hover:bg-red-50 transition-colors">
                          Cancel Order
                        </button>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Help Section */}
        <div className="mt-12 bg-blue-50 rounded-lg p-6">
          <div className="flex items-start space-x-4">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Your Order?</h3>
              <p className="text-gray-600 mb-4">
                Our customer service team is here to help you with any questions about your orders, shipping, or returns.
              </p>
              <div className="flex space-x-4">
                <Link
                  to="/help-center"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Visit Help Center
                </Link>
                <Link
                  to="/contact"
                  className="border border-blue-300 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Contact Support
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showOrderDetails && <OrderDetailsModal />}
    </div>
  );
};

export default OrdersPage;
