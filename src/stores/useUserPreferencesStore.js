import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useUserPreferencesStore = create(
  persist(
    (set, get) => ({
      recentlyViewed: [],
      preferences: {
        currency: 'USD',
        language: 'en',
        notifications: {
          email: true,
          push: true,
          sms: false,
        },
        privacy: {
          showOnlineStatus: true,
          allowDataCollection: true,
        }
      },
      
      addToRecentlyViewed: (product) => {
        set((state) => {
          const filtered = state.recentlyViewed.filter(item => item.id !== product.id);
          return {
            recentlyViewed: [
              { ...product, viewedAt: new Date().toISOString() },
              ...filtered
            ].slice(0, 20) // Keep only last 20 items
          };
        });
      },
      
      updatePreferences: (newPreferences) => {
        set((state) => ({
          preferences: { ...state.preferences, ...newPreferences }
        }));
      },
      
      // Enhanced personalization features
      getRecommendationsForUser: () => {
        const { recentlyViewed } = get();
        if (recentlyViewed.length === 0) return [];
        
        // Get categories from recently viewed products
        const viewedCategories = [...new Set(recentlyViewed.map(item => item.category))];
        
        // Simple recommendation algorithm based on viewed categories
        return {
          categories: viewedCategories.slice(0, 3),
          lastViewedCategory: recentlyViewed[0]?.category,
          recommendedProducts: recentlyViewed.slice(0, 5)
        };
      },
      
      addToFavoriteCategories: (category) => {
        set((state) => {
          const favorites = state.preferences.favoriteCategories || [];
          if (!favorites.includes(category)) {
            return {
              preferences: {
                ...state.preferences,
                favoriteCategories: [...favorites, category].slice(0, 5) // Keep max 5
              }
            };
          }
          return state;
        });
      },
      
      getBrowsingInsights: () => {
        const { recentlyViewed } = get();
        if (recentlyViewed.length === 0) return null;
        
        const categories = {};
        const priceRanges = { low: 0, medium: 0, high: 0 };
        
        recentlyViewed.forEach(item => {
          // Count categories
          categories[item.category] = (categories[item.category] || 0) + 1;
          
          // Categorize price ranges
          if (item.price < 50) priceRanges.low++;
          else if (item.price < 200) priceRanges.medium++;
          else priceRanges.high++;
        });
        
        const topCategory = Object.keys(categories).reduce((a, b) => 
          categories[a] > categories[b] ? a : b
        );
        
        const preferredPriceRange = Object.keys(priceRanges).reduce((a, b) => 
          priceRanges[a] > priceRanges[b] ? a : b
        );
        
        return {
          topCategory,
          preferredPriceRange,
          categoryDistribution: categories,
          totalViewed: recentlyViewed.length
        };
      },
      
      clearRecentlyViewed: () => set({ recentlyViewed: [] }),
    }),
    {
      name: 'user-preferences-storage',
    }
  )
);