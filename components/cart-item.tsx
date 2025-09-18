"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    size: number
    quantity: number
    image: string
  }
}

export function CartItem({ item }: CartItemProps) {
  const { dispatch } = useCart()

  const updateQuantity = (newQuantity: number) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: {
        id: item.id,
        size: item.size,
        quantity: newQuantity,
      },
    })
  }

  const removeItem = () => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: {
        id: item.id,
        size: item.size,
      },
    })
  }

  return (
    <div className="bg-card rounded-lg p-6 velvet-texture theme-transition">
      <div className="flex items-center space-x-6">
        {/* Product Image */}
        <div className="relative w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image
            src={
              item.image || "/placeholder.svg?height=96&width=96&query=luxury leather dress shoe product cart thumbnail"
            }
            alt={item.name}
            fill
            className="object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="flex-1 min-w-0">
          <h3 className="heading-serif text-lg font-semibold text-card-foreground mb-1">{item.name}</h3>
          <p className="text-muted-foreground mb-2">Size: {item.size}</p>
          <p className="text-accent font-semibold text-lg">${item.price}</p>
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(Math.max(1, item.quantity - 1))}
            className="h-8 w-8 border-accent/20 text-card-foreground hover:border-accent theme-transition"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="text-card-foreground font-semibold w-8 text-center">{item.quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => updateQuantity(item.quantity + 1)}
            className="h-8 w-8 border-accent/20 text-card-foreground hover:border-accent theme-transition"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Total Price */}
        <div className="text-right">
          <p className="text-accent font-bold text-lg heading-serif">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        {/* Remove Button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={removeItem}
          className="text-muted-foreground hover:text-destructive theme-transition"
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
    </div>
  )
}
