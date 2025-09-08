import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useSubscriptionStore = create(
  persist(
    (set, get) => ({
      subscriptions: [],
      
      // Available subscription frequencies
      frequencies: [
        { id: 'weekly', label: 'Weekly', days: 7 },
        { id: 'biweekly', label: 'Every 2 weeks', days: 14 },
        { id: 'monthly', label: 'Monthly', days: 30 },
        { id: 'bimonthly', label: 'Every 2 months', days: 60 },
        { id: 'quarterly', label: 'Every 3 months', days: 90 }
      ],
      
      // Create a new subscription
      createSubscription: (product, frequency, quantity = 1, discount = 0.1) => {
        set((state) => {
          const subscriptionId = Date.now().toString();
          const frequencyInfo = state.frequencies.find(f => f.id === frequency);
          const nextDelivery = new Date();
          nextDelivery.setDate(nextDelivery.getDate() + frequencyInfo.days);
          
          const subscription = {
            id: subscriptionId,
            productId: product.id,
            product,
            quantity,
            frequency: frequencyInfo,
            discount, // 10% default discount
            status: 'active',
            createdAt: new Date().toISOString(),
            nextDelivery: nextDelivery.toISOString(),
            totalOrders: 0,
            totalSavings: 0,
            lastOrderDate: null,
            autoRenew: true,
            skipNext: false
          };
          
          return {
            subscriptions: [...state.subscriptions, subscription]
          };
        });
      },
      
      // Update subscription
      updateSubscription: (subscriptionId, updates) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(sub =>
            sub.id === subscriptionId ? { ...sub, ...updates } : sub
          )
        }));
      },
      
      // Cancel subscription
      cancelSubscription: (subscriptionId) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(sub =>
            sub.id === subscriptionId 
              ? { ...sub, status: 'cancelled', cancelledAt: new Date().toISOString() }
              : sub
          )
        }));
      },
      
      // Pause subscription
      pauseSubscription: (subscriptionId, pauseDuration = 30) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(sub => {
            if (sub.id === subscriptionId) {
              const resumeDate = new Date();
              resumeDate.setDate(resumeDate.getDate() + pauseDuration);
              
              return {
                ...sub,
                status: 'paused',
                pausedAt: new Date().toISOString(),
                resumeDate: resumeDate.toISOString()
              };
            }
            return sub;
          })
        }));
      },
      
      // Resume subscription
      resumeSubscription: (subscriptionId) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(sub => {
            if (sub.id === subscriptionId) {
              const nextDelivery = new Date();
              nextDelivery.setDate(nextDelivery.getDate() + sub.frequency.days);
              
              return {
                ...sub,
                status: 'active',
                pausedAt: null,
                resumeDate: null,
                nextDelivery: nextDelivery.toISOString()
              };
            }
            return sub;
          })
        }));
      },
      
      // Skip next delivery
      skipNextDelivery: (subscriptionId) => {
        set((state) => ({
          subscriptions: state.subscriptions.map(sub => {
            if (sub.id === subscriptionId) {
              const newNextDelivery = new Date(sub.nextDelivery);
              newNextDelivery.setDate(newNextDelivery.getDate() + sub.frequency.days);
              
              return {
                ...sub,
                nextDelivery: newNextDelivery.toISOString(),
                skipNext: false
              };
            }
            return sub;
          })
        }));
      },
      
      // Process subscription orders (would be called by a background job)
      processSubscriptionOrders: () => {
        const { subscriptions } = get();
        const today = new Date();
        const ordersToProcess = [];
        
        subscriptions.forEach(subscription => {
          if (
            subscription.status === 'active' &&
            new Date(subscription.nextDelivery) <= today &&
            !subscription.skipNext
          ) {
            ordersToProcess.push(subscription);
          }
        });
        
        // Update subscriptions after processing
        if (ordersToProcess.length > 0) {
          set((state) => ({
            subscriptions: state.subscriptions.map(sub => {
              const processed = ordersToProcess.find(order => order.id === sub.id);
              if (processed) {
                const nextDelivery = new Date();
                nextDelivery.setDate(nextDelivery.getDate() + sub.frequency.days);
                
                return {
                  ...sub,
                  totalOrders: sub.totalOrders + 1,
                  totalSavings: sub.totalSavings + (sub.product.price * sub.quantity * sub.discount),
                  lastOrderDate: new Date().toISOString(),
                  nextDelivery: nextDelivery.toISOString()
                };
              }
              return sub;
            })
          }));
        }
        
        return ordersToProcess;
      },
      
      // Get subscription savings
      getTotalSavings: () => {
        const { subscriptions } = get();
        return subscriptions.reduce((total, sub) => total + sub.totalSavings, 0);
      },
      
      // Get active subscriptions
      getActiveSubscriptions: () => {
        const { subscriptions } = get();
        return subscriptions.filter(sub => sub.status === 'active');
      },
      
      // Get upcoming deliveries
      getUpcomingDeliveries: (days = 7) => {
        const { subscriptions } = get();
        const futureDate = new Date();
        futureDate.setDate(futureDate.getDate() + days);
        
        return subscriptions
          .filter(sub => 
            sub.status === 'active' && 
            new Date(sub.nextDelivery) <= futureDate
          )
          .sort((a, b) => new Date(a.nextDelivery) - new Date(b.nextDelivery));
      },
      
      // Check if product has active subscription
      hasActiveSubscription: (productId) => {
        const { subscriptions } = get();
        return subscriptions.some(sub => 
          sub.productId === productId && sub.status === 'active'
        );
      },
      
      // Get subscription by product
      getSubscriptionByProduct: (productId) => {
        const { subscriptions } = get();
        return subscriptions.find(sub => 
          sub.productId === productId && sub.status === 'active'
        );
      }
    }),
    {
      name: 'subscription-storage',
    }
  )
);