import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useOrderStore = create(
  persist(
    (set, get) => ({
      orders: [],
      currentOrder: null,
      
      createOrder: async (orderData) => {
        const orderId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const newOrder = {
          id: orderId,
          ...orderData,
          orderDate: new Date().toISOString(),
          estimatedDelivery: getEstimatedDelivery(orderData.shippingMethod),
          trackingNumber: generateTrackingNumber(),
          status: 'confirmed'
        };
        
        set((state) => ({
          orders: [newOrder, ...state.orders],
          currentOrder: newOrder
        }));
        
        return newOrder;
      },
      
      updateOrderStatus: (orderId, status) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId 
              ? { ...order, status, lastUpdated: new Date().toISOString() }
              : order
          )
        }));
      },
      
      getOrderById: (orderId) => {
        const { orders } = get();
        return orders.find(order => order.id === orderId);
      },
      
      getOrdersByUserId: (userId) => {
        const { orders } = get();
        return orders.filter(order => order.userId === userId);
      },
      
      getUserOrders: (userId) => {
        const { orders } = get();
        return orders
          .filter(order => order.userId === userId)
          .sort((a, b) => new Date(b.orderDate) - new Date(a.orderDate));
      },
      
      getOrderStats: () => {
        const { orders } = get();
        const total = orders.length;
        const confirmed = orders.filter(o => o.status === 'confirmed').length;
        const processing = orders.filter(o => o.status === 'processing').length;
        const shipped = orders.filter(o => o.status === 'shipped').length;
        const delivered = orders.filter(o => o.status === 'delivered').length;
        const cancelled = orders.filter(o => o.status === 'cancelled').length;
        
        const totalRevenue = orders
          .filter(o => o.status !== 'cancelled')
          .reduce((sum, order) => sum + order.totals.total, 0);
        
        return {
          total,
          confirmed,
          processing,
          shipped,
          delivered,
          cancelled,
          totalRevenue
        };
      },
      
      cancelOrder: (orderId) => {
        set((state) => ({
          orders: state.orders.map(order =>
            order.id === orderId 
              ? { 
                  ...order, 
                  status: 'cancelled', 
                  cancelledAt: new Date().toISOString() 
                }
              : order
          )
        }));
      },
      
      clearOrders: () => set({ orders: [], currentOrder: null })
    }),
    {
      name: 'order-storage',
    }
  )
);

// Helper functions
function getEstimatedDelivery(shippingMethod) {
  const today = new Date();
  const deliveryDays = {
    'standard': 7,
    'express': 3,
    'overnight': 1
  };
  
  const days = deliveryDays[shippingMethod.id] || 7;
  const deliveryDate = new Date(today);
  deliveryDate.setDate(today.getDate() + days);
  
  return deliveryDate.toISOString();
}

function generateTrackingNumber() {
  const prefix = 'TRK';
  const number = Math.random().toString().slice(2, 12);
  return `${prefix}${number}`;
}

// Order status workflow
export const ORDER_STATUSES = {
  confirmed: {
    label: 'Confirmed',
    color: 'blue',
    description: 'Order has been confirmed and is being prepared'
  },
  processing: {
    label: 'Processing',
    color: 'yellow',
    description: 'Order is being processed and prepared for shipping'
  },
  shipped: {
    label: 'Shipped',
    color: 'purple',
    description: 'Order has been shipped and is on its way'
  },
  delivered: {
    label: 'Delivered',
    color: 'green',
    description: 'Order has been delivered successfully'
  },
  cancelled: {
    label: 'Cancelled',
    color: 'red',
    description: 'Order has been cancelled'
  }
};