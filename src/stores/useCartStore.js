import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cart: [],
      savedForLater: [],
      
      addToCart: (product, variant = null) => {
        set((state) => {
          const productId = variant ? `${product.id}-${variant.id}` : product.id;
          const existingItem = (state.cart || []).find(item => item.productId === productId);
          
          if (existingItem) {
            return {
              cart: (state.cart || []).map(item =>
                item.productId === productId
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          
          const cartItem = {
            id: productId, // Add id for component compatibility
            productId,
            name: product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            imageUrl: product.imageUrl || product.image,
            product,
            variant,
            quantity: 1,
            selectedVariants: variant ? { [variant.type]: variant.name } : {},
            addedAt: new Date().toISOString()
          };
          
          return {
            cart: [...(state.cart || []), cartItem]
          };
        });
      },
      
      updateQuantity: (productId, quantity) => {
        if (quantity <= 0) {
          get().removeFromCart(productId);
          return;
        }
        set((state) => ({
          cart: (state.cart || []).map(item =>
            item.productId === productId || item.id === productId ? { ...item, quantity } : item
          )
        }));
      },
      
      removeFromCart: (productId) => {
        set((state) => ({
          cart: (state.cart || []).filter(item => item.productId !== productId && item.id !== productId)
        }));
      },
      
      saveForLater: (productId) => {
        set((state) => {
          const item = (state.cart || []).find(item => item.productId === productId || item.id === productId);
          if (!item) return state;
          
          return {
            cart: (state.cart || []).filter(item => item.productId !== productId && item.id !== productId),
            savedForLater: [...(state.savedForLater || []), item]
          };
        });
      },
      
      moveToCart: (productId) => {
        set((state) => {
          const item = (state.savedForLater || []).find(item => item.productId === productId || item.id === productId);
          if (!item) return state;
          
          return {
            savedForLater: (state.savedForLater || []).filter(item => item.productId !== productId && item.id !== productId),
            cart: [...(state.cart || []), item]
          };
        });
      },
      
      clearCart: () => set({ cart: [] }),

      // Bulk Actions
      removeSelectedItems: (productIds) => {
        set((state) => ({
          cart: (state.cart || []).filter(item => !productIds.includes(item.productId) && !productIds.includes(item.id))
        }));
      },

      saveSelectedForLater: (productIds) => {
        set((state) => {
          const itemsToSave = (state.cart || []).filter(item => productIds.includes(item.productId) || productIds.includes(item.id));
          const remainingCart = (state.cart || []).filter(item => !productIds.includes(item.productId) && !productIds.includes(item.id));
          
          return {
            cart: remainingCart,
            savedForLater: [...(state.savedForLater || []), ...itemsToSave]
          };
        });
      },

      updateSelectedQuantities: (updates) => {
        set((state) => ({
          cart: (state.cart || []).map(item => {
            const update = updates.find(u => u.productId === item.productId || u.productId === item.id);
            return update ? { ...item, quantity: update.quantity } : item;
          })
        }));
      },

      // Cart abandonment recovery
      getAbandonedCartData: () => {
        const { cart } = get();
        const cartItems = cart || [];
        if (cartItems.length === 0) return null;
        
        return {
          items: cartItems,
          total: get().getCartTotal(),
          abandonedAt: new Date().toISOString(),
          itemCount: cartItems.length
        };
      },
      
      clearSavedForLater: () => set({ savedForLater: [] }),
      
      getCartTotal: () => {
        const { cart } = get();
        const cartItems = cart || [];
        return cartItems.reduce((total, item) => {
          const price = item.variant 
            ? (item.product?.price || item.price || 0) + (item.variant.priceModifier || 0)
            : (item.product?.price || item.price || 0);
          return total + (price * item.quantity);
        }, 0);
      },
      
      getCartCount: () => {
        const { cart } = get();
        const cartItems = cart || [];
        return cartItems.reduce((count, item) => count + item.quantity, 0);
      },

      // Add items getter for component compatibility
      getItems: () => {
        const { cart } = get();
        return cart || [];
      }
    }),
    {
      name: 'cart-storage',
      partialize: (state) => ({ cart: state.cart, savedForLater: state.savedForLater })
    }
  )
);