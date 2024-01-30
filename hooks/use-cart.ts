import { Products } from '@prisma/client'
import { toast } from 'sonner'

import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

export type CartItem = {
  product: Products
}

type CartState = {
  items: Products[]
  addItem: (product: Products) => void
  removeItem: (productId: string) => void
  clearCart: () => void
}

// export const useCart = create<CartState>()(
//   persist(
//     (set) => ({
//       items: [],
//       addItem: (product) =>
//         set((state) => {
//           return { items: [...state.items, { product }] }
//         }),
//       removeItem: (id) =>
//         set((state) => ({
//           items: state.items.filter((item) => item.product.id !== id),
//         })),
//       clearCart: () => set({ items: [] }),
//     }),
//     {
//       name: 'cart-storage',
//       storage: createJSONStorage(() => localStorage),
//     }
//   )
// )

export const useCart = create(
  persist<CartState>(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        const currentProducts = get().items
        const existingProduct = currentProducts.find(
          (item) => item.id === product.id
        )

        if (existingProduct) {
          return toast.error('Product already in cart')
        }

        set({ items: [...get().items, product] })
        toast.success('Product added to cart.')
      },

      removeItem: (id) => {
        set({ items: [...get().items.filter((item) => item.id !== id)] })
        toast.success('Product removed from cart')
      },
      clearCart: () => set({ items: [] }),
    }),
    {
      name: 'cart-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
)
