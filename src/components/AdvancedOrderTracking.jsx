import React, { useState, useEffect } from 'react';
import { 
  Truck, 
  Package, 
  MapPin, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Phone, 
  Mail, 
  Star,
  Navigation,
  Plane,
  Ship,
  Home,
  Building,
  Calendar,
  User,
  Camera,
  MessageSquare,
  RefreshCw,
  ArrowRight,
  ExternalLink,
  Download,
  Share2,
  Bell,
  Shield,
  Zap,
  Globe,
  TrendingUp
} from 'lucide-react';

// Advanced Order Tracking and Logistics System
export const AdvancedOrderTracking = ({ 
  orderId, 
  onTrackingUpdate,
  showFullDetails = true 
}) => {
  const [trackingData, setTrackingData] = useState(null);
  const [deliveryOptions, setDeliveryOptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('tracking');
  const [estimatedDelivery, setEstimatedDelivery] = useState(null);

  // Load tracking data
  useEffect(() => {
    const loadTrackingData = async () => {
      setLoading(true);
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockTrackingData = {
        orderInfo: {
          id: orderId || 'ORD-2024-001234',
          status: 'in-transit',
          placedAt: new Date('2024-01-20T10:30:00'),
          items: [
            {
              id: 1,
              name: 'iPhone 15 Pro Max',
              image: '/api/placeholder/80/80',
              quantity: 1,
              price: 1199.99,
              seller: 'Apple Store Official'
            },
            {
              id: 2,
              name: 'MagSafe Charger',
              image: '/api/placeholder/80/80',
              quantity: 1,
              price: 39.99,
              seller: 'Apple Store Official'
            }
          ],
          total: 1239.98,
          shippingMethod: 'Express Delivery',
          trackingNumber: 'TRK123456789',
          carrier: 'FedEx Express'
        },
        deliveryInfo: {
          address: {
            name: 'John Smith',
            street: '123 Main Street, Apt 4B',
            city: 'New York',
            state: 'NY',
            zip: '10001',
            country: 'United States'
          },
          phone: '+1 (555) 123-4567',
          email: 'john@example.com',
          instructions: 'Leave at door if no answer. Ring doorbell twice.',
          estimatedDelivery: new Date('2024-01-22T16:00:00'),
          deliveryWindow: '2:00 PM - 6:00 PM'
        },
        timeline: [
          {
            id: 1,
            status: 'order-placed',
            title: 'Order Placed',
            description: 'Your order has been confirmed and is being prepared',
            timestamp: new Date('2024-01-20T10:30:00'),
            location: 'Global Nexus Warehouse',
            completed: true
          },
          {
            id: 2,
            status: 'processing',
            title: 'Order Processing',
            description: 'Items are being picked and packed',
            timestamp: new Date('2024-01-20T14:15:00'),
            location: 'Global Nexus Warehouse',
            completed: true
          },
          {
            id: 3,
            status: 'shipped',
            title: 'Order Shipped',
            description: 'Package has left our facility',
            timestamp: new Date('2024-01-20T18:45:00'),
            location: 'New York Distribution Center',
            completed: true,
            trackingNumber: 'TRK123456789'
          },
          {
            id: 4,
            status: 'in-transit',
            title: 'In Transit',
            description: 'Package is on its way to you',
            timestamp: new Date('2024-01-21T08:30:00'),
            location: 'FedEx Facility - Newark, NJ',
            completed: true,
            currentLocation: true
          },
          {
            id: 5,
            status: 'out-for-delivery',
            title: 'Out for Delivery',
            description: 'Package is on the delivery truck',
            estimatedTime: new Date('2024-01-22T14:00:00'),
            location: 'Local Delivery Hub',
            completed: false
          },
          {
            id: 6,
            status: 'delivered',
            title: 'Delivered',
            description: 'Package has been delivered',
            estimatedTime: new Date('2024-01-22T16:00:00'),
            location: 'Your Address',
            completed: false
          }
        ],
        liveTracking: {
          currentLocation: {
            lat: 40.7128,
            lng: -74.0060,
            address: 'FedEx Facility - Newark, NJ',
            lastUpdate: new Date('2024-01-21T08:30:00')
          },
          driverInfo: {
            name: 'Mike Johnson',
            phone: '+1 (555) 987-6543',
            vehicle: 'FedEx Truck #456',
            photo: '/api/placeholder/50/50'
          },
          estimatedArrival: new Date('2024-01-22T15:30:00'),
          deliveryAttempts: 0,
          signature: false
        }
      };

      setTrackingData(mockTrackingData);
      setEstimatedDelivery(mockTrackingData.deliveryInfo.estimatedDelivery);
      
      // Mock delivery options
      setDeliveryOptions([
        {
          id: 'standard',
          name: 'Standard Delivery',
          price: 0,
          duration: '3-5 business days',
          description: 'Free standard shipping'
        },
        {
          id: 'express',
          name: 'Express Delivery',
          price: 9.99,
          duration: '1-2 business days',
          description: 'Fast delivery with tracking',
          selected: true
        },
        {
          id: 'overnight',
          name: 'Overnight Delivery',
          price: 24.99,
          duration: 'Next business day',
          description: 'Guaranteed next day delivery'
        },
        {
          id: 'same-day',
          name: 'Same Day Delivery',
          price: 19.99,
          duration: '2-4 hours',
          description: 'Available in select areas'
        }
      ]);
      
      setLoading(false);
    };

    loadTrackingData();
  }, [orderId]);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'order-placed': return <Package className="h-5 w-5" />;
      case 'processing': return <Clock className="h-5 w-5" />;
      case 'shipped': return <Truck className="h-5 w-5" />;
      case 'in-transit': return <Navigation className="h-5 w-5" />;
      case 'out-for-delivery': return <Truck className="h-5 w-5" />;
      case 'delivered': return <CheckCircle className="h-5 w-5" />;
      default: return <Clock className="h-5 w-5" />;
    }
  };

  const getStatusColor = (status, completed) => {
    if (completed) {
      return 'text-green-600 bg-green-100';
    }
    switch (status) {
      case 'in-transit':
      case 'out-for-delivery':
        return 'text-blue-600 bg-blue-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatTimeRemaining = (targetDate) => {
    const now = new Date();
    const diff = targetDate - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (hours > 24) {
      const days = Math.floor(hours / 24);
      return `${days} day${days > 1 ? 's' : ''} ${hours % 24}h`;
    }
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading tracking information...</p>
        </div>
      </div>
    );
  }

  if (!trackingData) {
    return (
      <div className="text-center py-12">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
          Tracking information not found
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Please check your order ID and try again
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Order Tracking
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Order #{trackingData.orderInfo.id} • {trackingData.orderInfo.carrier}
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center space-x-2">
              <Share2 className="h-4 w-4" />
              <span>Share</span>
            </button>
            <button className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center space-x-2">
              <Download className="h-4 w-4" />
              <span>Download</span>
            </button>
          </div>
        </div>

        {/* Status Overview */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-xl p-6 text-white">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Truck className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Current Status</p>
                <p className="text-xl font-bold capitalize">
                  {trackingData.orderInfo.status.replace('-', ' ')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-full">
                <Clock className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Estimated Delivery</p>
                <p className="text-xl font-bold">
                  {formatTimeRemaining(estimatedDelivery)}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-white/20 rounded-full">
                <MapPin className="h-6 w-6" />
              </div>
              <div>
                <p className="text-sm opacity-90">Current Location</p>
                <p className="text-lg font-medium">
                  {trackingData.liveTracking.currentLocation.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {showFullDetails && (
        <>
          {/* Navigation Tabs */}
          <div className="flex space-x-1 mb-8 bg-gray-100 dark:bg-gray-800 rounded-lg p-1">
            {[
              { id: 'tracking', label: 'Live Tracking', icon: Navigation },
              { id: 'timeline', label: 'Timeline', icon: Clock },
              { id: 'details', label: 'Order Details', icon: Package },
              { id: 'delivery', label: 'Delivery Info', icon: Home },
              { id: 'support', label: 'Support', icon: MessageSquare }
            ].map(tab => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg transition-colors ${
                    isActive 
                      ? 'bg-white dark:bg-gray-700 text-primary-600 shadow-sm' 
                      : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="font-medium hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Tab Content */}
          <div className="min-h-96">
            {activeTab === 'tracking' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Live Map Placeholder */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Globe className="h-6 w-6 mr-2 text-blue-500" />
                    Live Tracking Map
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-lg h-64 flex items-center justify-center mb-4">
                    <div className="text-center">
                      <MapPin className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                      <p className="text-gray-600 dark:text-gray-400">Interactive map would be here</p>
                      <p className="text-sm text-gray-500">Showing real-time package location</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-medium">Live Tracking Active</span>
                    </div>
                    <button className="text-primary-600 hover:text-primary-700 text-sm font-medium flex items-center">
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Refresh
                    </button>
                  </div>
                </div>

                {/* Driver Information */}
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-4">Delivery Agent</h3>
                    <div className="flex items-center space-x-4 mb-4">
                      <img 
                        src={trackingData.liveTracking.driverInfo.photo}
                        alt="Driver"
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h4 className="font-bold text-lg">{trackingData.liveTracking.driverInfo.name}</h4>
                        <p className="text-gray-600 dark:text-gray-400">{trackingData.liveTracking.driverInfo.vehicle}</p>
                        <div className="flex items-center space-x-1 mt-1">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">4.9</span>
                          <span className="text-sm text-gray-500">(245 deliveries)</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex space-x-3">
                      <button className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center space-x-2">
                        <Phone className="h-4 w-4" />
                        <span>Call</span>
                      </button>
                      <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 flex items-center justify-center space-x-2">
                        <MessageSquare className="h-4 w-4" />
                        <span>Message</span>
                      </button>
                    </div>
                  </div>

                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-bold mb-4">Delivery Preferences</h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">Contactless Delivery</p>
                          <p className="text-sm text-gray-500">Leave at door</p>
                        </div>
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <CheckCircle className="h-3 w-3 text-white" />
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">Signature Required</p>
                          <p className="text-sm text-gray-500">No signature needed</p>
                        </div>
                        <div className="w-5 h-5 bg-gray-300 rounded-full"></div>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <div>
                          <p className="font-medium">Photo Confirmation</p>
                          <p className="text-sm text-gray-500">Photo at delivery</p>
                        </div>
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                          <Camera className="h-3 w-3 text-white" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'timeline' && (
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-bold mb-6">Delivery Timeline</h3>
                <div className="space-y-6">
                  {trackingData.timeline.map((event, index) => (
                    <div key={event.id} className="relative flex items-start space-x-4">
                      {/* Timeline Line */}
                      {index < trackingData.timeline.length - 1 && (
                        <div className="absolute left-6 top-12 bottom-0 w-0.5 bg-gray-200 dark:bg-gray-600"></div>
                      )}
                      
                      {/* Event Icon */}
                      <div className={`relative z-10 p-3 rounded-full ${
                        event.completed 
                          ? 'bg-green-100 dark:bg-green-900/20' 
                          : event.currentLocation
                            ? 'bg-blue-100 dark:bg-blue-900/20'
                            : 'bg-gray-100 dark:bg-gray-700'
                      }`}>
                        <div className={
                          event.completed 
                            ? 'text-green-600' 
                            : event.currentLocation
                              ? 'text-blue-600'
                              : 'text-gray-400'
                        }>
                          {getStatusIcon(event.status)}
                        </div>
                      </div>
                      
                      {/* Event Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-lg font-medium text-gray-900 dark:text-white">
                            {event.title}
                          </h4>
                          <div className="flex items-center space-x-2">
                            {event.currentLocation && (
                              <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                                Current
                              </span>
                            )}
                            <span className="text-sm text-gray-500">
                              {event.timestamp ? 
                                event.timestamp.toLocaleString() : 
                                `Est. ${event.estimatedTime?.toLocaleString()}`
                              }
                            </span>
                          </div>
                        </div>
                        <p className="text-gray-600 dark:text-gray-400 mb-2">{event.description}</p>
                        <div className="flex items-center text-sm text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{event.location}</span>
                          {event.trackingNumber && (
                            <>
                              <span className="mx-2">•</span>
                              <span>Tracking: {event.trackingNumber}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'details' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Order Items */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Order Items</h3>
                  <div className="space-y-4">
                    {trackingData.orderInfo.items.map(item => (
                      <div key={item.id} className="flex items-center space-x-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                        <img 
                          src={item.image} 
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                          <p className="text-sm text-gray-500">Sold by {item.seller}</p>
                          <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-gray-900 dark:text-white">${item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-600 mt-4 pt-4">
                    <div className="flex justify-between">
                      <span className="font-bold text-lg">Total:</span>
                      <span className="font-bold text-lg">${trackingData.orderInfo.total}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Options */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Shipping Options</h3>
                  <div className="space-y-3">
                    {deliveryOptions.map(option => (
                      <div key={option.id} className={`p-4 border rounded-lg ${
                        option.selected 
                          ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/20' 
                          : 'border-gray-200 dark:border-gray-600'
                      }`}>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{option.name}</h4>
                          <div className="flex items-center space-x-2">
                            {option.price === 0 ? (
                              <span className="text-green-600 font-bold">FREE</span>
                            ) : (
                              <span className="font-bold">${option.price}</span>
                            )}
                            {option.selected && (
                              <CheckCircle className="h-5 w-5 text-primary-600" />
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">{option.description}</p>
                        <p className="text-sm font-medium text-primary-600">{option.duration}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'delivery' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Delivery Address */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4 flex items-center">
                    <Home className="h-6 w-6 mr-2 text-green-500" />
                    Delivery Address
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-lg">{trackingData.deliveryInfo.address.name}</p>
                      <p className="text-gray-600 dark:text-gray-400">{trackingData.deliveryInfo.address.street}</p>
                      <p className="text-gray-600 dark:text-gray-400">
                        {trackingData.deliveryInfo.address.city}, {trackingData.deliveryInfo.address.state} {trackingData.deliveryInfo.address.zip}
                      </p>
                      <p className="text-gray-600 dark:text-gray-400">{trackingData.deliveryInfo.address.country}</p>
                    </div>
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 pt-3">
                      <div className="flex items-center space-x-2 mb-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{trackingData.deliveryInfo.phone}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">{trackingData.deliveryInfo.email}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Delivery Instructions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Delivery Instructions</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">Special Instructions</h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        {trackingData.deliveryInfo.instructions}
                      </p>
                    </div>
                    
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">Delivery Window</h4>
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 dark:text-green-300 text-sm">
                          {trackingData.deliveryInfo.estimatedDelivery.toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2 mt-1">
                        <Clock className="h-4 w-4 text-green-600" />
                        <span className="text-green-700 dark:text-green-300 text-sm">
                          {trackingData.deliveryInfo.deliveryWindow}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-3">
                      <button className="flex-1 py-2 px-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700">
                        Update Instructions
                      </button>
                      <button className="flex-1 py-2 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Support Options */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <div className="space-y-4">
                    <button className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
                      <div className="flex items-center space-x-3">
                        <MessageSquare className="h-6 w-6 text-blue-500" />
                        <div>
                          <h4 className="font-medium">Live Chat Support</h4>
                          <p className="text-sm text-gray-500">Available 24/7</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
                      <div className="flex items-center space-x-3">
                        <Phone className="h-6 w-6 text-green-500" />
                        <div>
                          <h4 className="font-medium">Call Customer Service</h4>
                          <p className="text-sm text-gray-500">1-800-SUPPORT</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                    </button>
                    
                    <button className="w-full p-4 border border-gray-200 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 text-left">
                      <div className="flex items-center space-x-3">
                        <ExternalLink className="h-6 w-6 text-purple-500" />
                        <div>
                          <h4 className="font-medium">Help Center</h4>
                          <p className="text-sm text-gray-500">FAQs and guides</p>
                        </div>
                        <ArrowRight className="h-5 w-5 text-gray-400 ml-auto" />
                      </div>
                    </button>
                  </div>
                </div>

                {/* Order Actions */}
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700">
                  <h3 className="text-xl font-bold mb-4">Order Actions</h3>
                  <div className="space-y-3">
                    <button className="w-full py-3 px-4 bg-red-600 text-white rounded-lg hover:bg-red-700">
                      Cancel Order
                    </button>
                    <button className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      Request Return
                    </button>
                    <button className="w-full py-3 px-4 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      Report Problem
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default AdvancedOrderTracking;