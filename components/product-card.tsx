"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface ProductCardProps {
  id: string
  name: string
  price: number
  images: string[]
  featured?: boolean
  className?: string
}

export function ProductCard({
  id,
  name,
  price,
  images,
  featured = false,
  className = "",
}: ProductCardProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  // ⏳ Only slide while hovered
  useEffect(() => {
    if (!images || images.length <= 1 || !isHovered) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, 1500) // faster slide when hovered

    return () => clearInterval(interval)
  }, [images, isHovered])

  return (
    <div
      className={`group relative bg-card rounded-lg overflow-hidden gold-shimmer theme-transition ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setCurrentIndex(0) // reset back to first image when hover ends
      }}
    >
      {featured && (
        <Badge className="absolute top-4 left-4 z-10 bg-accent text-accent-foreground">
          Featured
        </Badge>
      )}

      <Link href={`/product/${id}`}>
        <div className="aspect-square relative overflow-hidden bg-muted">
          <Image
            src={
              images && images.length > 0
                ? images[currentIndex]
                : "/placeholder.svg?height=400&width=400&query=luxury leather dress shoe handcrafted"
            }
            alt={name || "Product Image"}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-radial from-accent/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="absolute inset-0 bg-gradient-to-t from-mahogany/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className="p-6">
          <h3 className="heading-serif text-lg font-semibold text-card-foreground mb-2 group-hover:text-accent transition-colors">
            {name}
          </h3>
          <p className="text-2xl font-bold text-accent">₹{price}</p>
        </div>
      </Link>

      <div className="px-6 pb-6">
        <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer theme-transition">
          View Details
        </Button>
      </div>
    </div>
  )
}
