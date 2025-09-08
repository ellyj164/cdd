import { create } from 'zustand';

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  price: number;
  quantity: number;
  image?: string;
  vendorId: string;
  vendorName: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  getItemCount: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  total: 0,
  addItem: (item: CartItem) => {
    const items = get().items;
    const existingItem = items.find(i => i.productId === item.productId);
    
    let newItems;
    if (existingItem) {
      newItems = items.map(i => 
        i.productId === item.productId 
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
    } else {
      newItems = [...items, item];
    }
    
    const total = newItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ items: newItems, total });
  },
  removeItem: (productId: string) => {
    const items = get().items.filter(item => item.productId !== productId);
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ items, total });
  },
  updateQuantity: (productId: string, quantity: number) => {
    if (quantity <= 0) {
      get().removeItem(productId);
      return;
    }
    
    const items = get().items.map(item =>
      item.productId === productId ? { ...item, quantity } : item
    );
    const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    set({ items, total });
  },
  clearCart: () => set({ items: [], total: 0 }),
  getItemCount: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
}));