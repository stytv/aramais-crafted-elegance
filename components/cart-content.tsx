"use client"

import { useEffect, useState, useCallback } from "react"
import { useCart } from "@/lib/cart-context"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartContent() {
  const { state, fetchCart, updateQuantity, removeItem } = useCart()
  const [userId, setUserId] = useState<string | null>(null)

  // Get Supabase userId
  useEffect(() => {
    const uid = localStorage.getItem("supabase_user_id")
    if (uid) setUserId(uid)
  }, [])

  // Stable fetchCart function
  const fetchUserCart = useCallback(async () => {
    if (!userId) return
    await fetchCart(userId)
  }, [userId, fetchCart])

  // Fetch cart when userId changes
  useEffect(() => {
    fetchUserCart()
  }, [fetchUserCart])

  const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {state.items.length === 0 ? (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center bg-card rounded-2xl p-16 velvet-texture">
            <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
            <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Your cart is empty</h2>
            <p className="text-muted-foreground mb-8">Discover our exquisite collection of handcrafted leather shoes.</p>
            <Link href="/collections">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
                Browse Collections
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {state.items.map((item) => (
              <CartItem
                key={`${item.id}-${item.size}`}
                item={item}
                onQuantityChange={(newQty) => userId && updateQuantity(userId, item.id, item.size, newQty)}
                onRemove={() => userId && removeItem(userId, item.id, item.size)}
              />
            ))}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-card rounded-2xl p-8 velvet-texture sticky top-24">
              <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 text-center border-b border-accent pb-4">
                Order Summary
              </h3>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-muted-foreground">
                  <span>Subtotal ({state.items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Tax</span>
                  <span>${(subtotal * 0.08).toFixed(2)}</span>
                </div>
                <div className="border-t border-accent pt-4">
                  <div className="flex justify-between text-card-foreground font-semibold text-lg">
                    <span className="heading-serif">Total</span>
                    <span className="text-accent heading-serif">${(subtotal * 1.08).toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Link href="/checkout" className="block">
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer py-3 text-lg">
                    Proceed to Checkout
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>

                <Link href="/collections" className="block">
                  <Button
                    variant="outline"
                    className="w-full border-accent/20 text-card-foreground hover:border-accent bg-transparent"
                  >
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
