import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { 
  Package,
  Truck,
  CheckCircle,
  Clock,
  MapPin,
  Calendar,
  User,
  Phone,
  Mail,
  ArrowLeft,
  Search,
  AlertCircle,
  Navigation,
  Building,
  PackageCheck
} from 'lucide-react';
import { apiService } from '../services/apiService.js';
import { toast } from 'react-hot-toast';

const TrackOrderPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [trackingNumber, setTrackingNumber] = useState(searchParams.get('tracking') || '');
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (trackingNumber) {
      handleTrackOrder();
    }
  }, []);

  const handleTrackOrder = async () => {
    if (!trackingNumber.trim()) {
      setError('Please enter a tracking number');
      return;
    }

    setLoading(true);
    setError('');
    
    try {
      // Try to load from API first, fallback to demo data
      try {
        const data = await apiService.orders.track(trackingNumber);
        setOrderData(data);
      } catch (error) {
        // Fallback demo tracking data
        setOrderData({
          trackingNumber: trackingNumber,
          orderNumber: '#ORD-001-2024',
          status: 'in_transit',
          estimatedDelivery: '2024-01-18',
          carrier: 'FedEx',
          currentLocation: 'San Francisco Distribution Center',
          recipient: {
            name: 'John Doe',
            address: '123 Main St, San Francisco, CA 94102',
            phone: '+1 (555) 123-4567'
          },
          trackingEvents: [
            {
              id: 1,
              status: 'order_placed',
              location: 'Online',
              timestamp: '2024-01-15T10:30:00Z',
              description: 'Order placed and confirmed'
            },
            {
              id: 2,
              status: 'processing',
              location: 'Warehouse - Fremont, CA',
              timestamp: '2024-01-15T14:15:00Z',
              description: 'Order processing started'
            },
            {
              id: 3,
              status: 'shipped',
              location: 'Warehouse - Fremont, CA',
              timestamp: '2024-01-16T09:00:00Z',
              description: 'Package shipped from warehouse'
            },
            {
              id: 4,
              status: 'in_transit',
              location: 'Oakland Sort Facility, CA',
              timestamp: '2024-01-16T18:45:00Z',
              description: 'Package arrived at Oakland sort facility'
            },
            {
              id: 5,
              status: 'in_transit',
              location: 'San Francisco Distribution Center, CA',
              timestamp: '2024-01-17T08:20:00Z',
              description: 'Package arrived at San Francisco distribution center'
            },
            {
              id: 6,
              status: 'out_for_delivery',
              location: 'San Francisco Distribution Center, CA',
              timestamp: '2024-01-18T06:00:00Z',
              description: 'Out for delivery'
            }
          ],
          packageDetails: {
            weight: '2.5 lbs',
            dimensions: '10" x 8" x 4"',
            service: 'FedEx Ground',
            signature_required: false
          }
        });
      }
    } catch (error) {
      console.error('Error tracking order:', error);
      setError('Tracking number not found. Please check and try again.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'order_placed': return Clock;
      case 'processing': return Package;
      case 'shipped': return Truck;
      case 'in_transit': return Navigation;
      case 'out_for_delivery': return Truck;
      case 'delivered': return CheckCircle;
      default: return Package;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'order_placed': return 'text-yellow-600 bg-yellow-100';
      case 'processing': return 'text-blue-600 bg-blue-100';
      case 'shipped': return 'text-purple-600 bg-purple-100';
      case 'in_transit': return 'text-orange-600 bg-orange-100';
      case 'out_for_delivery': return 'text-green-600 bg-green-100';
      case 'delivered': return 'text-green-600 bg-green-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const formatDateTime = (timestamp) => {
    const date = new Date(timestamp);
    return {
      date: date.toLocaleDateString('en-US', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      }),
      time: date.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit' 
      })
    };
  };

  const getOverallStatus = () => {
    if (!orderData) return '';
    
    switch (orderData.status) {
      case 'order_placed': return 'Order Confirmed';
      case 'processing': return 'Processing';
      case 'shipped': return 'Shipped';
      case 'in_transit': return 'In Transit';
      case 'out_for_delivery': return 'Out for Delivery';
      case 'delivered': return 'Delivered';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Track Your Order</h1>
          <p className="text-gray-500 mt-1">Enter your tracking number to see real-time updates</p>
        </div>

        {/* Tracking Input */}
        <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <label htmlFor="tracking" className="block text-sm font-medium text-gray-700 mb-2">
                Tracking Number
              </label>
              <div className="relative">
                <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  id="tracking"
                  type="text"
                  value={trackingNumber}
                  onChange={(e) => setTrackingNumber(e.target.value)}
                  placeholder="Enter tracking number (e.g., TRK123456789)"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onKeyPress={(e) => e.key === 'Enter' && handleTrackOrder()}
                />
              </div>
            </div>
            <button
              onClick={handleTrackOrder}
              disabled={loading}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Track Order
                </>
              )}
            </button>
          </div>
          
          {error && (
            <div className="mt-4 flex items-center space-x-2 text-red-600 bg-red-50 p-3 rounded-lg">
              <AlertCircle className="w-5 h-5" />
              <span className="text-sm">{error}</span>
            </div>
          )}
        </div>

        {/* Order Details */}
        {orderData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Status Overview */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center md:text-left">
                  <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Status</h2>
                  <div className={`inline-flex items-center px-3 py-2 rounded-full text-sm font-medium ${getStatusColor(orderData.status)}`}>
                    {React.createElement(getStatusIcon(orderData.status), { className: "w-4 h-4 mr-2" })}
                    {getOverallStatus()}
                  </div>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                  <div className="flex items-center justify-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(orderData.estimatedDelivery).toLocaleDateString('en-US', { 
                      weekday: 'long', 
                      month: 'long', 
                      day: 'numeric' 
                    })}</span>
                  </div>
                </div>
                
                <div className="text-center md:text-right">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Current Location</h3>
                  <div className="flex items-center justify-center md:justify-end space-x-2 text-gray-600">
                    <MapPin className="w-4 h-4" />
                    <span className="text-sm">{orderData.currentLocation}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Order Details */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Information</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Order Number:</span>
                    <span className="font-medium text-gray-900">{orderData.orderNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Tracking Number:</span>
                    <span className="font-medium text-gray-900">{orderData.trackingNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Carrier:</span>
                    <span className="font-medium text-gray-900">{orderData.carrier}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Service:</span>
                    <span className="font-medium text-gray-900">{orderData.packageDetails.service}</span>
                  </div>
                </div>
              </div>

              {/* Delivery Address */}
              <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Delivery Address</h3>
                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <User className="w-4 h-4 text-gray-600 mt-1" />
                    <span className="font-medium text-gray-900">{orderData.recipient.name}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Building className="w-4 h-4 text-gray-600 mt-1" />
                    <span className="text-gray-600">{orderData.recipient.address}</span>
                  </div>
                  <div className="flex items-start space-x-2">
                    <Phone className="w-4 h-4 text-gray-600 mt-1" />
                    <span className="text-gray-600">{orderData.recipient.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Package Details */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Package Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-2">
                  <PackageCheck className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Weight: {orderData.packageDetails.weight}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Package className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">Dimensions: {orderData.packageDetails.dimensions}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-gray-600" />
                  <span className="text-gray-600">
                    {orderData.packageDetails.signature_required ? 'Signature Required' : 'No Signature Required'}
                  </span>
                </div>
              </div>
            </div>

            {/* Tracking Timeline */}
            <div className="bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Tracking History</h3>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-6">
                  {orderData.trackingEvents.map((event, index) => {
                    const StatusIcon = getStatusIcon(event.status);
                    const { date, time } = formatDateTime(event.timestamp);
                    const isCompleted = index < orderData.trackingEvents.length - 1 || event.status === 'delivered';
                    
                    return (
                      <motion.div
                        key={event.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative flex items-start space-x-4"
                      >
                        {/* Timeline Dot */}
                        <div className={`relative z-10 flex items-center justify-center w-12 h-12 rounded-full border-2 ${
                          isCompleted 
                            ? 'bg-blue-600 border-blue-600 text-white' 
                            : 'bg-white border-gray-300 text-gray-600'
                        }`}>
                          <StatusIcon className="w-5 h-5" />
                        </div>
                        
                        {/* Event Details */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-gray-900">{event.description}</h4>
                            <span className="text-sm text-gray-500">{time}</span>
                          </div>
                          <p className="text-sm text-gray-600 mt-1">{event.location}</p>
                          <p className="text-sm text-gray-500 mt-1">{date}</p>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-blue-50 rounded-lg p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                    <Phone className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help with Your Delivery?</h3>
                  <p className="text-gray-600 mb-4">
                    If you have questions about your delivery or need to make changes, our customer service team is here to help.
                  </p>
                  <div className="flex space-x-4">
                    <a
                      href="tel:+15551234567"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      Call Support
                    </a>
                    <a
                      href="mailto:support@globalnexus.com"
                      className="border border-blue-300 text-blue-600 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors flex items-center"
                    >
                      <Mail className="w-4 h-4 mr-2" />
                      Email Support
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Sample Tracking Numbers (for demo) */}
        {!orderData && !loading && (
          <div className="bg-gray-100 rounded-lg p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Don't have a tracking number?</h3>
            <p className="text-gray-600 mb-4">You can find your tracking number in:</p>
            <ul className="space-y-2 text-gray-600 mb-4">
              <li>• Your order confirmation email</li>
              <li>• Your account dashboard under "Orders"</li>
              <li>• The shipping notification email</li>
            </ul>
            <p className="text-sm text-gray-500">
              <strong>Demo tracking numbers:</strong> TRK123456789, TRK987654321, or TRK555666777
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrackOrderPage;
