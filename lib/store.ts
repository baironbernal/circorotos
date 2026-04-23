import { create } from "zustand"

export interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartStore {
  items: CartItem[]
  isCartOpen: boolean
  addItem: (item: Omit<CartItem, "quantity">) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  setIsCartOpen: (open: boolean) => void
  totalItems: () => number
  totalPrice: () => number
}

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  isCartOpen: false,

  addItem: (newItem) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === newItem.id)
      if (existing) {
        return {
          items: state.items.map((i) =>
            i.id === newItem.id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        }
      }
      return { items: [...state.items, { ...newItem, quantity: 1 }] }
    })
  },

  removeItem: (id) => {
    set((state) => ({ items: state.items.filter((i) => i.id !== id) }))
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id)
      return
    }
    set((state) => ({
      items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
    }))
  },

  clearCart: () => set({ items: [] }),

  setIsCartOpen: (open) => set({ isCartOpen: open }),

  totalItems: () => get().items.reduce((sum, i) => sum + i.quantity, 0),

  totalPrice: () =>
    get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
}))
