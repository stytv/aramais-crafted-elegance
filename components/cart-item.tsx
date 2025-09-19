"use client"

import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Minus, Plus, X } from "lucide-react"
import { useState, useEffect } from "react"

interface CartItemProps {
  item: {
    id: string
    name: string
    price: number
    size: number
    quantity: number
    image: string
  }
  onQuantityChange: (newQty: number) => void
  onRemove: () => void
}

export function CartItem({ item, onQuantityChange, onRemove }: CartItemProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768)
    checkIsMobile()
    window.addEventListener('resize', checkIsMobile)
    return () => window.removeEventListener('resize', checkIsMobile)
  }, [])

  return (
    <div className="bg-card rounded-lg p-4 md:p-6 velvet-texture theme-transition">
      <div className="flex flex-col md:flex-row md:items-center gap-4 md:space-x-6">
        <div className="relative w-full h-40 md:w-24 md:h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
          <Image 
            src={item.image || "/placeholder.svg"} 
            alt={item.name} 
            fill 
            className="object-cover transition-transform duration-300 hover:scale-105"
            sizes="(max-width: 768px) 100vw, 96px"
            priority={false}
          />
        </div>

        <div className="flex-1 min-w-0">
          <h3 className="heading-serif text-lg font-semibold text-card-foreground mb-1 line-clamp-1">{item.name}</h3>
          <p className="text-muted-foreground mb-2">Size: {item.size}</p>
          <p className="text-accent font-semibold text-lg">${item.price}</p>
        </div>

        <div className="flex items-center justify-between md:justify-start md:space-x-3">
          <div className="flex items-center space-x-3">
            <Button variant="outline" size={isMobile ? "sm" : "icon"} onClick={() => onQuantityChange(Math.max(1, item.quantity - 1))}>
              <Minus className="h-4 w-4"/>
            </Button>
            <span className="text-card-foreground font-semibold w-8 text-center">{item.quantity}</span>
            <Button variant="outline" size={isMobile ? "sm" : "icon"} onClick={() => onQuantityChange(item.quantity + 1)}>
              <Plus className="h-4 w-4"/>
            </Button>
          </div>

          <div className="md:hidden text-right ml-4">
            <p className="text-accent font-bold text-lg heading-serif">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        </div>

        <div className="hidden md:block text-right">
          <p className="text-accent font-bold text-lg heading-serif">${(item.price * item.quantity).toFixed(2)}</p>
        </div>

        <Button 
          variant="ghost" 
          size={isMobile ? "sm" : "icon"} 
          onClick={onRemove}
          aria-label="Remove item"
          className="self-end md:self-auto"
        >
          <X className="h-5 w-5"/>
        </Button>
      </div>
    </div>
  )
}