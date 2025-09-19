"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Heart, Share2, MessageCircle, Minus, Plus, Star } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { supabase } from "@/lib/supabase"
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  category: string
  price: number
  product_images?: { image_url: string }[]
  description: string
  craftsmanship: string
  care: string
  sizes: number[]
  featured?: boolean
}

interface Review {
  id: number
  user_id: string
  rating: number
  comment: string
  created_at: string
  user_name?: string
}

interface ProductDetailProps {
  product: Product
  userId?: string
  userName?: string
}

export function ProductDetail({ product, userName }: ProductDetailProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const images = product.product_images?.map((img) => img.image_url) || ["/placeholder.svg"]
  const [selectedSize, setSelectedSize] = useState<number | null>(null)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState<Review[]>([])
  const [newRating, setNewRating] = useState(5)
  const [newComment, setNewComment] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const userId = localStorage.getItem("supabase_user_id") || null
  const { state: { items }, addItem, updateQuantity } = useCart()

  // Snackbar state
  const [snackbarOpen, setSnackbarOpen] = useState(false)
  const [snackbarMessage, setSnackbarMessage] = useState("")
  const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error" | "info" | "warning">("info")

  const showSnackbar = (message: string, severity: "success" | "error" | "info" | "warning" = "info") => {
    setSnackbarMessage(message)
    setSnackbarSeverity(severity)
    setSnackbarOpen(true)
  }

  const handleSnackbarClose = () => setSnackbarOpen(false)

  // Fetch previous reviews
  useEffect(() => {
    const fetchReviews = async () => {
      const { data, error } = await supabase
        .from("reviews")
        .select("*, profiles(name)")
        .eq("product_id", product.id)
        .order("created_at", { ascending: false })

      if (!error) {
        const formatted = data.map((r: any) => ({
          id: r.id,
          user_id: r.user_id,
          rating: r.rating,
          comment: r.comment,
          created_at: r.created_at,
          user_name: r.profiles?.name || "Anonymous",
        }))
        setReviews(formatted)
      }
    }
    fetchReviews()
  }, [product.id])

  const handleAddToCart = async () => {
    if (!selectedSize) return showSnackbar("Please select a size.", "warning")
    if (!userId) return showSnackbar("Please log in first.", "error")

    try {
      await addItem(userId, {
        product_id: product.id,
        name: product.name,
        price: product.price,
        size: selectedSize,
        image: images[0],
        quantity,
      })
      showSnackbar("Item added to cart!", "success")
    } catch (err) {
      console.error(err)
      showSnackbar("Failed to add to cart.", "error")
    }
  }



  const handleWhatsAppOrder = () => {
    if (!selectedSize) return showSnackbar("Please select a size.", "warning")
    const message = encodeURIComponent(
      `Hello! I'm interested in ordering the ${product.name} in size ${selectedSize}. Could you please provide more information?`
    )
    const phoneNumber = "1234567890"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!userId) return showSnackbar("Please log in to submit a review.", "error")

    setIsSubmitting(true)

    const { error } = await supabase.from("reviews").insert({
      product_id: product.id,
      user_id: userId,
      rating: newRating,
      comment: newComment,
    })

    if (!error) {
      setReviews([{ id: Date.now(), user_id: userId, user_name: userName, rating: newRating, comment: newComment, created_at: new Date().toISOString() }, ...reviews])
      setNewRating(5)
      setNewComment("")
      showSnackbar("Review submitted successfully!", "success")
    } else {
      console.error("Error submitting review:", error)
      showSnackbar("Failed to submit review.", "error")
    }
    setIsSubmitting(false)
  }

  const isInCart = selectedSize && items.find(i => i.product_id === product.id && i.size === selectedSize)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative bg-card rounded-lg overflow-hidden">
            <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent" />
            <Image src={images[selectedImage]} alt={product.name} fill className="object-cover" />
          </div>

          <div className="flex space-x-4">
            {images.map((image, index) => (
              <motion.button
                key={index}
                onClick={() => setSelectedImage(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${selectedImage === index ? "border-accent" : "border-transparent"}`}
              >
                <Image src={image || "/placeholder.svg"} alt={`${product.name} ${index + 1}`} fill className="object-cover" />
              </motion.button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          {product.featured && <Badge className="mb-2 bg-accent text-accent-foreground">Featured</Badge>}
          <h1 className="heading-serif text-3xl font-bold text-foreground">{product.name}</h1>
          <p className="text-4xl font-bold text-accent heading-serif">₹{product.price}</p>
          <p className="text-lg text-muted-foreground leading-relaxed">{product.description}</p>

          {/* Size & Quantity */}
          <div>
            <h3 className="font-semibold text-foreground mb-3">Select Size</h3>
            <div className="grid grid-cols-6 gap-2">
              {product.sizes.map((size) => (
                <motion.button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  whileTap={{ scale: 0.95 }}
                  className={`py-2 rounded-lg border ${selectedSize === size ? "bg-accent text-accent-foreground border-accent" : "border-accent/20 text-foreground hover:border-accent"}`}
                >
                  {size}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-foreground mb-3">Quantity</h3>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="icon" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus className="h-4 w-4" /></Button>
              <span className="text-lg font-semibold text-foreground w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}><Plus className="h-4 w-4" /></Button>
            </div>
          </div>

          <div className="space-y-4 hidden lg:block">
            {selectedSize ? (
              isInCart ? (
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(
                        userId!,
                        isInCart.id,
                        isInCart.size,
                        Math.max(1, isInCart.quantity - 1)
                      )
                    }
                  >
                    <Minus className="h-4 w-4" />
                  </Button>

                  <span className="text-lg font-semibold text-foreground w-8 text-center">
                    {isInCart.quantity}
                  </span>

                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() =>
                      updateQuantity(userId!, isInCart.id, isInCart.size, isInCart.quantity + 1)
                    }
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              ) : (
                <Button
                  onClick={handleAddToCart}
                  disabled={!selectedSize}
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer py-3 text-lg"
                >
                  Add to Cart
                </Button>
              )
            ) : (
              <Button
                disabled
                className="w-full bg-accent/50 text-accent-foreground/70 py-3 text-lg"
              >
                Select Size
              </Button>
            )}

            {/* WhatsApp Order Button */}
            <Button
              onClick={handleWhatsAppOrder}
              disabled={!selectedSize}
              className="w-full bg-muted text-muted-foreground hover:bg-muted/80 border border-accent/20"
              variant="outline"
            >
              <MessageCircle className="mr-2 h-5 w-5" />
              Order via WhatsApp
            </Button>
          </div>

        </div>
      </div>

      {/* Tabs */}
      <div className="mt-16">
        <Tabs defaultValue="description" className="w-full">
          <TabsList className="grid w-full grid-cols-2 bg-card">
            <TabsTrigger value="description" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Description</TabsTrigger>
            <TabsTrigger value="reviews" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">Reviews</TabsTrigger>
          </TabsList>

          <TabsContent value="description" className="mt-8 bg-card rounded-lg p-8 velvet-texture">
            <p className="text-muted-foreground leading-relaxed text-lg">{product.description}</p>
          </TabsContent>

          {/* Reviews Tab */}
          <TabsContent value="reviews" className="mt-8 space-y-6">
            {reviews.length === 0 && <p className="text-muted-foreground">No reviews yet.</p>}
            {reviews.map((rev) => (
              <div key={rev.id} className="bg-card p-4 rounded-lg velvet-texture">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-foreground">{rev.user_name}</span>
                  <span className="flex space-x-1">
                    {Array.from({ length: rev.rating }).map((_, i) => <Star key={i} className="h-4 w-4 text-yellow-500" />)}
                  </span>
                </div>
                <p className="text-muted-foreground">{rev.comment}</p>
                <span className="text-xs text-muted-foreground">{new Date(rev.created_at).toLocaleDateString()}</span>
              </div>
            ))}

            {userId && (
              <form onSubmit={handleSubmitReview} className="space-y-4 mt-4">
                <h4 className="font-semibold text-foreground">Write a Review</h4>
                <div className="flex space-x-2">
                  <span>Rating:</span>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewRating(i + 1)}
                      className={`h-6 w-6 ${i < newRating ? "text-yellow-500" : "text-muted-foreground"}`}
                    >
                      <Star />
                    </button>
                  ))}
                </div>
                <textarea
                  className="w-full border p-2 rounded-lg text-foreground"
                  placeholder="Write your review..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  required
                />
                <Button type="submit" disabled={isSubmitting}>Submit Review</Button>
              </form>
            )}
            {!userId && <p className="text-muted-foreground">Please log in to write a review.</p>}
          </TabsContent>
        </Tabs>
      </div>

      {/* ===== Mobile Sticky Bottom Bar ===== */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed bottom-0 inset-x-0 lg:hidden bg-card border-t border-border shadow-lg flex items-center justify-between px-4 py-3"
      >
        <div className="flex flex-col">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-lg font-semibold text-foreground">${product.price}</span>
        </div>

        {selectedSize ? (
          isInCart ? (
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(
                    userId!,
                    isInCart.id,
                    isInCart.size,
                    Math.max(1, isInCart.quantity - 1)
                  )
                }
              >
                <Minus className="h-4 w-4" />
              </Button>

              <span className="text-lg font-semibold text-foreground w-6 text-center">
                {isInCart.quantity}
              </span>

              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  updateQuantity(userId!, isInCart.id, isInCart.size, isInCart.quantity + 1)
                }
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToCart}
              className="bg-accent text-accent-foreground px-6 py-2 rounded-lg font-semibold"
            >
              Add to Cart
            </motion.button>
          )
        ) : (
          <Button
            disabled
            className="bg-accent/50 text-accent-foreground/70 px-6 py-2 rounded-lg font-semibold"
          >
            Select Size
          </Button>
        )}


      </motion.div>
    </div>
  )
}
