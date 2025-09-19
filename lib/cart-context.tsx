"use client"

import { createContext, useContext, useReducer, type ReactNode } from "react"
import { supabase } from "@/lib/supabase"

interface CartItem {
  id: string        // cart_items row id
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
}

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "CLEAR_CART" }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; size: number; quantity: number } }
  | { type: "REMOVE_ITEM"; payload: { id: string; size: number } }

const CartContext = createContext<{
  state: CartState
  fetchCart: (userId: string) => Promise<void>
  addItem: (userId: string, item: Omit<CartItem, "id">) => Promise<void>
  removeItem: (userId: string, id: string, size: number) => Promise<void>
  updateQuantity: (userId: string, id: string, size: number, quantity: number) => Promise<void>
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "SET_ITEMS":
      return {
        items: action.payload,
        total: action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    case "CLEAR_CART":
      return { items: [], total: 0 }
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
        total: state.items.reduce((sum, item) =>
          sum + item.price * (item.id === action.payload.id && item.size === action.payload.size
            ? action.payload.quantity
            : item.quantity), 0),
      }
    case "REMOVE_ITEM":
      const filtered = state.items.filter(
        (item) => !(item.id === action.payload.id && item.size === action.payload.size)
      )
      return {
        items: filtered,
        total: filtered.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }
    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 })

  const fetchCart = async (userId: string) => {
    const { data, error } = await supabase
      .from("cart_items")
      .select(`id, product_id, size, quantity, products(id, name, price, product_images(image_url))`)
      .eq("user_id", userId)

    if (error) {
      console.error("Error fetching cart:", error)
      return
    }

    const formatted: CartItem[] = (data || []).map((row: any) => ({
      id: row.id,
      product_id: row.product_id,
      name: row.products?.name ?? "Unnamed",
      price: Number(row.products?.price ?? 0),
      size: row.size,
      quantity: row.quantity,
      image: row.products?.product_images?.[0]?.image_url ?? "/placeholder.svg",
    }))
    dispatch({ type: "SET_ITEMS", payload: formatted })
  }

  const addItem = async (userId: string, item: Omit<CartItem, "id">) => {
    const existing = state.items.find(
      (i) => i.product_id === item.product_id && i.size === item.size
    )

    if (existing) {
      const newQty = existing.quantity + item.quantity
      await updateQuantity(userId, existing.id, existing.size, newQty)
      return
    }

    const { data, error } = await supabase
      .from("cart_items")
      .insert({
        user_id: userId,
        product_id: item.product_id,
        size: item.size,
        quantity: item.quantity,
      })
      .select("id")

    if (error) {
      console.error("Error inserting item:", error)
      return
    }

    await fetchCart(userId)
  }

  const removeItem = async (userId: string, id: string, size: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: { id, size } })
    const { error } = await supabase.from("cart_items").delete().eq("id", id).eq("size", size)
    if (error) {
      console.error("Error removing item:", error)
      await fetchCart(userId)
    }
  }

  const updateQuantity = async (userId: string, id: string, size: number, quantity: number) => {
    if (quantity < 1) return
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, size, quantity } })
    const { error } = await supabase.from("cart_items").update({ quantity }).eq("id", id).eq("size", size)
    if (error) {
      console.error("Error updating quantity:", error)
      await fetchCart(userId)
    }
  }

  return (
    <CartContext.Provider value={{ state, fetchCart, addItem, removeItem, updateQuantity }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error("useCart must be used within CartProvider")
  return ctx
}
