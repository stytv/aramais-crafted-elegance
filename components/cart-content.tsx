"use client"

import { useCart } from "@/lib/cart-context"
import { CartItem } from "@/components/cart-item"
import { Button } from "@/components/ui/button"
import { ShoppingBag, ArrowRight } from "lucide-react"
import Link from "next/link"

export function CartContent() {
  const { items, totalItems, totalPrice } = useCart()

  if (items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-card rounded-2xl p-16 velvet-texture">
          <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-6" />
          <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Discover our exquisite collection of handcrafted leather shoes.</p>
          <Link href="/shop">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90">
              Browse Collections
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.map((item) => (
            <CartItem key={item.id} item={item} />
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
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t border-accent pt-4">
                <div className="flex justify-between text-card-foreground font-semibold text-lg">
                  <span className="heading-serif">Total</span>
                  <span className="text-accent heading-serif">${(totalPrice * 1.08).toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <Link href="/checkout" className="block">
                <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 py-3 text-lg">
                  Proceed to Checkout
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>

              <Link href="/shop" className="block">
                <Button
                  variant="outline" 
                  className="w-full border-accent/20 text-card-foreground hover:border-accent bg-transparent"
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>

            {/* Exclusive Benefits */}
            <div className="mt-8 pt-6 border-t border-accent/20">
              <h4 className="font-semibold text-card-foreground mb-4">Member Benefits</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Free worldwide shipping
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  30-day return policy
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Lifetime craftsmanship warranty
                </li>
                <li className="flex items-center">
                  <div className="w-2 h-2 bg-accent rounded-full mr-3"></div>
                  Complimentary shoe care kit
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
