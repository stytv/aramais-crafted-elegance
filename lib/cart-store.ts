import { create } from "zustand"
import { persist } from "zustand/middleware"
import { supabase } from "@/lib/supabase"

export interface CartItem {
  id: string
  product_id: string
  name: string
  price: number
  size: number
  quantity: number
  image: string
}

interface CartState {
  items: CartItem[]
  total: number
  fetchCart: (userId: string) => Promise<void>
  addItem: (userId: string, item: Omit<CartItem, "id" | "quantity">) => Promise<void>
  removeItem: (userId: string, id: string, size: number) => Promise<void>
  updateQuantity: (userId: string, id: string, size: number, quantity: number) => void
  clearCart: () => void
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      total: 0,

      fetchCart: async (userId: string) => {
        const { data: cartItems, error } = await supabase
          .from("cart_items")
          .select(`id, product_id, size, quantity, products(id, name, price, product_images(image_url))`)
          .eq("user_id", userId)

        if (error) return console.error(error)

        const formattedItems: CartItem[] = (cartItems || []).map((item: any) => ({
          id: item.id,
          product_id: item.product_id,
          name: item.products?.name || "Unnamed product",
          price: Number(item.products?.price || 0),
          size: item.size,
          quantity: item.quantity,
          image: item.products?.product_images?.[0]?.image_url || "/placeholder.svg",
        }))

        set({
          items: formattedItems,
          total: formattedItems.reduce((sum, i) => sum + i.price * i.quantity, 0),
        })
      },

      addItem: async (userId, item) => {
        const { error } = await supabase
          .from("cart_items")
          .upsert(
            { user_id: userId, product_id: item.product_id, size: item.size, quantity: 1 },
            { onConflict: ["user_id", "product_id", "size"] }
          )
        if (error) return console.error(error)
        await get().fetchCart(userId)
      },

      removeItem: async (userId, id, size) => {
        set({ items: get().items.filter((i) => !(i.id === id && i.size === size)) })
        const { error } = await supabase.from("cart_items").delete().eq("id", id).eq("size", size)
        if (error) await get().fetchCart(userId)
      },

      updateQuantity: (userId, id, size, quantity) => {
        if (quantity < 1) return
        set({
          items: get().items.map((i) =>
            i.id === id && i.size === size ? { ...i, quantity } : i
          ),
          total: get().items.reduce((sum, i) => sum + i.price * i.quantity, 0),
        })
        supabase.from("cart_items").update({ quantity }).eq("id", id).eq("size", size)
          .then(({ error }) => { if (error) get().fetchCart(userId) })
      },

      clearCart: () => set({ items: [], total: 0 }),
    }),
    { name: "cart-storage" } // localStorage key
  )
)
