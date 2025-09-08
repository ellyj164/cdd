import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useLoyaltyStore = create(
  persist(
    (set, get) => ({
      points: 0,
      tier: 'Bronze',
      totalEarned: 0,
      totalSpent: 0,
      pointsHistory: [],
      
      // Point earning rates by tier
      pointRates: {
        Bronze: 1,   // 1 point per $1 spent
        Silver: 1.5, // 1.5 points per $1 spent
        Gold: 2,     // 2 points per $1 spent
        Platinum: 3  // 3 points per $1 spent
      },
      
      // Tier thresholds (total spent)
      tierThresholds: {
        Bronze: 0,
        Silver: 500,
        Gold: 1500,
        Platinum: 5000
      },
      
      // Add points for purchase
      addPoints: (amount, reason = 'Purchase', orderId = null) => {
        set((state) => {
          const rate = state.pointRates[state.tier];
          const pointsEarned = Math.floor(amount * rate);
          
          const newPointsHistory = [
            {
              id: Date.now(),
              points: pointsEarned,
              reason,
              amount,
              orderId,
              date: new Date().toISOString(),
              type: 'earned'
            },
            ...state.pointsHistory
          ].slice(0, 50); // Keep last 50 transactions
          
          const newTotalEarned = state.totalEarned + pointsEarned;
          const newPoints = state.points + pointsEarned;
          
          return {
            points: newPoints,
            totalEarned: newTotalEarned,
            pointsHistory: newPointsHistory
          };
        });
      },
      
      // Redeem points
      redeemPoints: (pointsToRedeem, reason = 'Redemption', value = 0) => {
        set((state) => {
          if (state.points < pointsToRedeem) {
            throw new Error('Insufficient points');
          }
          
          const newPointsHistory = [
            {
              id: Date.now(),
              points: -pointsToRedeem,
              reason,
              value,
              date: new Date().toISOString(),
              type: 'redeemed'
            },
            ...state.pointsHistory
          ].slice(0, 50);
          
          return {
            points: state.points - pointsToRedeem,
            pointsHistory: newPointsHistory
          };
        });
      },
      
      // Update tier based on total spent
      updateTier: (totalSpent) => {
        set((state) => {
          const newTotalSpent = totalSpent;
          let newTier = 'Bronze';
          
          if (newTotalSpent >= state.tierThresholds.Platinum) {
            newTier = 'Platinum';
          } else if (newTotalSpent >= state.tierThresholds.Gold) {
            newTier = 'Gold';
          } else if (newTotalSpent >= state.tierThresholds.Silver) {
            newTier = 'Silver';
          }
          
          return {
            tier: newTier,
            totalSpent: newTotalSpent
          };
        });
      },
      
      // Get next tier info
      getNextTierInfo: () => {
        const { tier, totalSpent, tierThresholds } = get();
        const tiers = ['Bronze', 'Silver', 'Gold', 'Platinum'];
        const currentIndex = tiers.indexOf(tier);
        
        if (currentIndex >= tiers.length - 1) {
          return null; // Already at highest tier
        }
        
        const nextTier = tiers[currentIndex + 1];
        const requiredSpent = tierThresholds[nextTier];
        const remainingToSpend = requiredSpent - totalSpent;
        
        return {
          nextTier,
          requiredSpent,
          remainingToSpend,
          progress: (totalSpent / requiredSpent) * 100
        };
      },
      
      // Get point value (1 point = $0.01)
      getPointValue: (points) => {
        return points * 0.01;
      },
      
      // Bonus point opportunities
      addBonusPoints: (points, reason) => {
        set((state) => {
          const newPointsHistory = [
            {
              id: Date.now(),
              points,
              reason,
              date: new Date().toISOString(),
              type: 'bonus'
            },
            ...state.pointsHistory
          ].slice(0, 50);
          
          return {
            points: state.points + points,
            totalEarned: state.totalEarned + points,
            pointsHistory: newPointsHistory
          };
        });
      },
      
      // Available rewards
      getAvailableRewards: () => {
        const { points } = get();
        
        const rewards = [
          { id: 1, name: '$5 Off', points: 500, value: 5, type: 'discount' },
          { id: 2, name: '$10 Off', points: 1000, value: 10, type: 'discount' },
          { id: 3, name: '$25 Off', points: 2500, value: 25, type: 'discount' },
          { id: 4, name: 'Free Shipping', points: 250, value: 9.99, type: 'shipping' },
          { id: 5, name: '15% Off Next Order', points: 1500, value: 15, type: 'percentage' },
          { id: 6, name: 'Birthday Bonus', points: 200, value: 10, type: 'bonus' }
        ];
        
        return rewards.map(reward => ({
          ...reward,
          canAfford: points >= reward.points,
          savings: reward.value
        }));
      },
      
      // Clear all data (for testing)
      clearLoyaltyData: () => set({
        points: 0,
        tier: 'Bronze',
        totalEarned: 0,
        totalSpent: 0,
        pointsHistory: []
      })
    }),
    {
      name: 'loyalty-storage',
    }
  )
);