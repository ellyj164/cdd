import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      wishlist: [],
      
      addToWishlist: (product) => {
        set((state) => {
          const exists = state.wishlist.find(item => item.id === product.id);
          if (exists) return state;
          
          return {
            wishlist: [...state.wishlist, {
              ...product,
              addedAt: new Date().toISOString()
            }]
          };
        });
      },
      
      removeFromWishlist: (productId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(item => item.id !== productId)
        }));
      },
      
      isInWishlist: (productId) => {
        const { wishlist } = get();
        return wishlist.some(item => item.id === productId);
      },
      
      clearWishlist: () => set({ wishlist: [] }),
      
      getWishlistCount: () => {
        const { wishlist } = get();
        return wishlist.length;
      },

      getWishlistItems: () => {
        const { wishlist } = get();
        return wishlist || [];
      }
    }),
    {
      name: 'wishlist-storage',
    }
  )
);