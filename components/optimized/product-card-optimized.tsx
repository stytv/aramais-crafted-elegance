"use client"

import React, { memo, useState, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Eye } from "lucide-react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  images: string[]
  featured?: boolean
  className?: string
  onAddToCart?: (id: string) => void
  onAddToWishlist?: (id: string) => void
}

export const ProductCardOptimized = memo(function ProductCard({
  id,
  name,
  price,
  images,
  featured = false,
  className = "",
  onAddToCart,
  onAddToWishlist
}: ProductCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true)
  }, [])

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false)
    setCurrentImageIndex(0)
  }, [])

  const handleAddToCart = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToCart?.(id)
  }, [id, onAddToCart])

  const handleAddToWishlist = useCallback((e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    onAddToWishlist?.(id)
  }, [id, onAddToWishlist])

  const mainImage = images && images.length > 0 ? images[currentImageIndex] : "/placeholder.svg"

  return (
    <motion.div
      className={cn(
        "group relative bg-card rounded-xl overflow-hidden border border-border/50",
        "hover:border-border hover:shadow-lg transition-all duration-300",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -2 }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Featured Badge */}
      <AnimatePresence>
        {featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-3 left-3 z-10"
          >
            <Badge className="bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-lg">
              Featured
            </Badge>
          </motion.div>
        )}
      </AnimatePresence>

      <Link href={`/product/${id}`} className="block">
        {/* Image Container */}
        <div className="aspect-square relative overflow-hidden bg-muted">
          {!imageLoaded && (
            <div className="absolute inset-0 loading-skeleton" />
          )}
          
          <Image
            src={mainImage}
            alt={name}
            fill
            className={cn(
              "object-cover transition-all duration-500",
              "group-hover:scale-105",
              imageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={featured}
          />

          {/* Overlay Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-[1px]"
              >
                <div className="absolute top-3 right-3 flex flex-col gap-2">
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.1 }}
                    onClick={handleAddToWishlist}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <Heart className="w-4 h-4 text-gray-700 hover:text-red-500 transition-colors" />
                  </motion.button>
                  
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.2 }}
                    onClick={handleAddToCart}
                    className="p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white transition-colors"
                  >
                    <ShoppingCart className="w-4 h-4 text-gray-700 hover:text-primary transition-colors" />
                  </motion.button>
                </div>

                {/* Quick View */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 20 }}
                  transition={{ delay: 0.1 }}
                  className="absolute bottom-3 left-3 right-3"
                >
                  <Button
                    size="sm"
                    className="w-full bg-white/90 backdrop-blur-sm text-gray-900 hover:bg-white shadow-lg"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Quick View
                  </Button>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Image Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {images.map((_, index) => (
                <motion.button
                  key={index}
                  className={cn(
                    "w-1.5 h-1.5 rounded-full transition-all duration-200",
                    index === currentImageIndex ? "bg-white shadow-lg" : "bg-white/40"
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    setCurrentImageIndex(index)
                  }}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.8 }}
                />
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="p-4 space-y-2">
          <motion.h3
            className="font-semibold text-lg leading-tight line-clamp-2 group-hover:text-primary transition-colors"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            {name}
          </motion.h3>
          
          <motion.div
            className="flex items-center justify-between"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <span className="text-2xl font-bold text-primary">
              ${price.toLocaleString()}
            </span>
            
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="shadow-sm hover:shadow-md transition-all duration-200"
              >
                Add to Cart
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </Link>
    </motion.div>
  )
})

// Helper function for class names
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}