"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, MessageCircle, Minus, Plus } from "lucide-react"
import { useCart } from "@/lib/cart-context"

interface Product {
  id: string
  name: string
  category: string
  price: number
  images: string[]
  description: string
  craftsmanship: string
  care: string
  sizes: number[]
  featured?: boolean
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [isWishlisted, setIsWishlisted] = useState(false)
  const { dispatch } = useCart()

  const handleAddToCart = () => {
    if (!selectedSize) return

    dispatch({
      type: "ADD_ITEM",
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: product.images[0],
      },
    })
  }

  const handleWhatsAppOrder = () => {
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering the ${product.name} in size ${selectedSize}. Could you please provide more information?`,
    )
    const phoneNumber = "1234567890" // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-card rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
            <Image
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>

          {/* Thumbnail Images */}
          <div className="flex space-x-4">
            {product.images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                  selectedImage === index ? "border-accent" : "border-transparent"
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            {product.featured && <Badge className="mb-2 bg-accent text-accent-foreground">Featured</Badge>}
            <h1 className="heading-serif text-3xl font-bold text-foreground mb-2">{product.name}</h1>
            <p className="text-4xl font-bold text-accent heading-serif">${product.price}</p>
          </div>

          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Size Selection */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Select Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <Button
                  key={size}
                  variant={selectedSize === size ? "default" : "outline"}
                  onClick={() => setSelectedSize(size)}
                  className={`${
                    selectedSize === size
                      ? "bg-accent text-accent-foreground"
                      : "border-accent/20 text-foreground hover:border-accent"
                  }`}
                >
                  {size}
                </Button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="border-accent/20 text-foreground hover:border-accent"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-semibold text-foreground w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="border-accent/20 text-foreground hover:border-accent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-4">
            <Button
              onClick={handleAddToCart}
              disabled={!selectedSize}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer py-3 text-lg"
            >
              Add to Cart
            </Button>

            <Button
              onClick={handleWhatsAppOrder}
              disabled={!selectedSize}
              className="w-full bg-muted text-muted-foreground hover:bg-muted/80 border border-accent/20"
              variant="outline"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order via WhatsApp
            </Button>

            <div className="flex space-x-4">
              <Button
                variant="outline"
                onClick={() => setIsWishlisted(!isWishlisted)}
                className={`flex-1 border-accent/20 ${
                  isWishlisted ? "text-accent border-accent" : "text-foreground hover:border-accent"
                }`}
              >
                <Heart className={`mr-2 h-5 w-5 ${isWishlisted ? "fill-current" : ""}`} />
                {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
              </Button>
              <Button
                variant="outline"
                className="flex-1 border-accent/20 text-foreground hover:border-accent bg-transparent"
              >
                <Share2 className="mr-2 h-5 w-5" />
                Share
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-card">
            <TabsTrigger
              value="description"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="craftsmanship"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Craftsmanship
            </TabsTrigger>
            <TabsTrigger
              value="care"
              className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground"
            >
              Care Instructions
            </TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8">
            <div className="bg-card rounded-lg p-8 velvet-texture">
              <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Product Description</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
            </div>
          </TabsContent>

          <TabsContent value="craftsmanship" className="mt-8">
            <div className="bg-card rounded-lg p-8 velvet-texture">
              <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Master Craftsmanship</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.craftsmanship}</p>
            </div>
          </TabsContent>

          <TabsContent value="care" className="mt-8">
            <div className="bg-card rounded-lg p-8 velvet-texture">
              <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Care Instructions</h3>
              <p className="text-muted-foreground leading-relaxed text-lg">{product.care}</p>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
