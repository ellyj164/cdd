import React, { useState, useEffect } from 'react';
import { 
  Package, 
  Truck, 
  CheckCircle, 
  Clock, 
  MapPin, 
  Calendar,
  ExternalLink,
  Download,
  MessageCircle,
  RefreshCw
} from 'lucide-react';
import { useNotification } from './NotificationSystem.jsx';
import { LoadingSpinner, InlineLoader } from './Loading.jsx';

// Order Status Timeline Component
export const OrderStatusTimeline = ({ order }) => {
  const getStatusSteps = () => [
    {
      id: 'placed',
      name: 'Order Placed',
      description: 'Your order has been received',
      icon: CheckCircle,
      completed: true,
      timestamp: order.createdAt
    },
    {
      id: 'confirmed',
      name: 'Order Confirmed',
      description: 'Your order has been confirmed by the seller',
      icon: Package,
      completed: ['confirmed', 'processing', 'shipped', 'delivered'].includes(order.status),
      timestamp: order.confirmedAt
    },
    {
      id: 'processing',
      name: 'Processing',
      description: 'Your order is being prepared',
      icon: Clock,
      completed: ['processing', 'shipped', 'delivered'].includes(order.status),
      timestamp: order.processingAt
    },
    {
      id: 'shipped',
      name: 'Shipped',
      description: 'Your order is on its way',
      icon: Truck,
      completed: ['shipped', 'delivered'].includes(order.status),
      timestamp: order.shippedAt
    },
    {
      id: 'delivered',
      name: 'Delivered',
      description: 'Your order has been delivered',
      icon: CheckCircle,
      completed: order.status === 'delivered',
      timestamp: order.deliveredAt
    }
  ];

  const steps = getStatusSteps();

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-6">
        Order Status
      </h3>
      
      <div className="flow-root">
        <ul className="-mb-8">
          {steps.map((step, stepIdx) => {
            const Icon = step.icon;
            const isLast = stepIdx === steps.length - 1;
            const isCurrent = !step.completed && stepIdx > 0 && steps[stepIdx - 1].completed;
            
            return (
              <li key={step.id}>
                <div className="relative pb-8">
                  {!isLast && (
                    <span
                      className={`absolute top-4 left-4 -ml-px h-full w-0.5 ${
                        step.completed ? 'bg-primary-600' : 'bg-gray-200 dark:bg-gray-600'
                      }`}
                      aria-hidden="true"
                    />
                  )}
                  
                  <div className="relative flex space-x-3">
                    <div>
                      <span
                        className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white dark:ring-gray-800 ${
                          step.completed
                            ? 'bg-primary-600'
                            : isCurrent
                            ? 'bg-yellow-500'
                            : 'bg-gray-400'
                        }`}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </span>
                    </div>
                    
                    <div className="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                      <div>
                        <p className={`text-sm font-medium ${
                          step.completed || isCurrent 
                            ? 'text-gray-900 dark:text-white' 
                            : 'text-gray-500 dark:text-gray-400'
                        }`}>
                          {step.name}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {step.description}
                        </p>
                      </div>
                      
                      {step.timestamp && (
                        <div className="text-right text-sm whitespace-nowrap text-gray-500 dark:text-gray-400">
                          <time dateTime={step.timestamp}>
                            {new Date(step.timestamp).toLocaleDateString()}
                          </time>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

// Shipping Tracker Component
export const ShippingTracker = ({ trackingNumber, carrier, lastUpdate }) => {
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { showError } = useNotification();

  const trackPackage = async () => {
    setLoading(true);
    try {
      // Simulate tracking API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock tracking data
      setTrackingData({
        status: 'In Transit',
        estimatedDelivery: '2024-02-20',
        location: 'Distribution Center - Los Angeles, CA',
        updates: [
          {
            id: 1,
            timestamp: '2024-02-18T10:30:00Z',
            location: 'Los Angeles, CA',
            status: 'In Transit',
            description: 'Package is on its way to the next facility'
          },
          {
            id: 2,
            timestamp: '2024-02-18T08:15:00Z',
            location: 'Los Angeles, CA',
            status: 'Departed Facility',
            description: 'Package has left the shipping facility'
          },
          {
            id: 3,
            timestamp: '2024-02-17T16:45:00Z',
            location: 'Los Angeles, CA',
            status: 'Arrived at Facility',
            description: 'Package arrived at shipping facility'
          }
        ]
      });
    } catch (error) {
      showError('Tracking Error', 'Unable to fetch tracking information');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (trackingNumber) {
      trackPackage();
    }
  }, [trackingNumber]);

  if (!trackingNumber) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
          Shipping Information
        </h3>
        <p className="text-gray-500 dark:text-gray-400">
          Tracking information will be available once your order ships.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Shipping Information
        </h3>
        <button
          onClick={trackPackage}
          disabled={loading}
          className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 dark:text-primary-400"
        >
          <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh</span>
        </button>
      </div>

      <div className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Tracking Number
            </label>
            <div className="mt-1 flex items-center space-x-2">
              <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                {trackingNumber}
              </code>
              <button
                onClick={() => navigator.clipboard.writeText(trackingNumber)}
                className="text-primary-600 hover:text-primary-700 dark:text-primary-400"
              >
                Copy
              </button>
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Carrier
            </label>
            <p className="mt-1 text-sm text-gray-900 dark:text-white">
              {carrier}
            </p>
          </div>
        </div>

        {loading ? (
          <InlineLoader message="Fetching tracking information..." />
        ) : trackingData ? (
          <div className="space-y-4">
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Current Status: {trackingData.status}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {trackingData.location}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    Estimated Delivery
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 inline mr-1" />
                    {new Date(trackingData.estimatedDelivery).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
                Tracking History
              </h4>
              <div className="space-y-3">
                {trackingData.updates.map(update => (
                  <div key={update.id} className="flex space-x-3">
                    <div className="flex-shrink-0">
                      <div className="h-8 w-8 rounded-full bg-primary-600 flex items-center justify-center">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                          {update.status}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(update.timestamp).toLocaleString()}
                        </p>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {update.location}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {update.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

// Order Details Component
export const OrderDetails = ({ order }) => {
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-gray-900 dark:text-white">
          Order Details
        </h3>
        <div className="flex items-center space-x-2">
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <Download className="h-4 w-4" />
          </button>
          <button className="text-primary-600 hover:text-primary-700 dark:text-primary-400">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {/* Order Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Order Information
            </h4>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Order Number:</dt>
                <dd className="text-gray-900 dark:text-white font-medium">{order.id}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Order Date:</dt>
                <dd className="text-gray-900 dark:text-white">
                  {new Date(order.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500 dark:text-gray-400">Payment Method:</dt>
                <dd className="text-gray-900 dark:text-white">
                  {order.paymentInfo?.method || 'Card'}
                  {order.paymentInfo?.last4 && ` ****${order.paymentInfo.last4}`}
                </dd>
              </div>
            </dl>
          </div>

          <div>
            <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">
              Shipping Address
            </h4>
            <address className="text-sm text-gray-600 dark:text-gray-300 not-italic">
              {order.shippingInfo.firstName} {order.shippingInfo.lastName}<br />
              {order.shippingInfo.address}<br />
              {order.shippingInfo.city}, {order.shippingInfo.state} {order.shippingInfo.zipCode}
            </address>
          </div>
        </div>

        {/* Order Items */}
        <div>
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Items Ordered
          </h4>
          <div className="space-y-4">
            {order.items.map(item => (
              <div key={item.productId} className="flex items-center space-x-4 p-4 border border-gray-200 dark:border-gray-600 rounded-lg">
                <img
                  src={item.product.imageUrl || '/placeholder.jpg'}
                  alt={item.product.name}
                  className="h-16 w-16 object-cover rounded-md"
                />
                <div className="flex-1">
                  <h5 className="text-sm font-medium text-gray-900 dark:text-white">
                    {item.product.name}
                  </h5>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Quantity: {item.quantity}
                  </p>
                  {item.variant && (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Variant: {item.variant.name}
                    </p>
                  )}
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {formatPrice(item.product.price * item.quantity)}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatPrice(item.product.price)} each
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-4">
            Order Summary
          </h4>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Subtotal:</dt>
              <dd className="text-gray-900 dark:text-white">
                {formatPrice(order.totals.subtotal)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Shipping:</dt>
              <dd className="text-gray-900 dark:text-white">
                {order.totals.shipping === 0 ? 'Free' : formatPrice(order.totals.shipping)}
              </dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-500 dark:text-gray-400">Tax:</dt>
              <dd className="text-gray-900 dark:text-white">
                {formatPrice(order.totals.tax)}
              </dd>
            </div>
            <div className="flex justify-between font-medium text-lg border-t border-gray-200 dark:border-gray-600 pt-2">
              <dt className="text-gray-900 dark:text-white">Total:</dt>
              <dd className="text-gray-900 dark:text-white">
                {formatPrice(order.totals.total)}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

// Order Actions Component
export const OrderActions = ({ order, onAction }) => {
  const canCancel = ['placed', 'confirmed'].includes(order.status);
  const canReturn = order.status === 'delivered';
  const canReorder = true;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
        Order Actions
      </h3>
      
      <div className="space-y-3">
        {canCancel && (
          <button
            onClick={() => onAction('cancel')}
            className="w-full bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 font-medium"
          >
            Cancel Order
          </button>
        )}
        
        {canReturn && (
          <button
            onClick={() => onAction('return')}
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 font-medium"
          >
            Return Items
          </button>
        )}
        
        <button
          onClick={() => onAction('contact')}
          className="w-full flex items-center justify-center space-x-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 py-2 px-4 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700"
        >
          <MessageCircle className="h-4 w-4" />
          <span>Contact Seller</span>
        </button>
        
        {canReorder && (
          <button
            onClick={() => onAction('reorder')}
            className="w-full bg-primary-600 text-white py-2 px-4 rounded-md hover:bg-primary-700 font-medium"
          >
            Reorder Items
          </button>
        )}
      </div>
    </div>
  );
};

export default {
  OrderStatusTimeline,
  ShippingTracker,
  OrderDetails,
  OrderActions
};