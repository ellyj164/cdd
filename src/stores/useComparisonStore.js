import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useComparisonStore = create(
  persist(
    (set, get) => ({
      comparisonList: [],
      
      addToComparison: (product) => {
        set((state) => {
          // Limit comparison to 4 products
          if (state.comparisonList.length >= 4) {
            return {
              comparisonList: [
                ...state.comparisonList.slice(1),
                { ...product, addedAt: new Date().toISOString() }
              ]
            };
          }
          
          // Check if product already exists
          const exists = state.comparisonList.some(item => item.id === product.id);
          if (exists) return state;
          
          return {
            comparisonList: [
              ...state.comparisonList,
              { ...product, addedAt: new Date().toISOString() }
            ]
          };
        });
      },
      
      removeFromComparison: (productId) => {
        set((state) => ({
          comparisonList: state.comparisonList.filter(item => item.id !== productId)
        }));
      },
      
      clearComparison: () => set({ comparisonList: [] }),
      
      isInComparison: (productId) => {
        return get().comparisonList.some(item => item.id === productId);
      },
      
      getComparisonCount: () => get().comparisonList.length,
    }),
    {
      name: 'comparison-storage',
    }
  )
);