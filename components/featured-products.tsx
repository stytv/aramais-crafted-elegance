"use client"

import { useEffect, useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { supabase } from "@/lib/supabase"

interface Product {
  id: string
  name: string
  price: number
  isFeatured: boolean
  product_images: { image_url: string }[]
}

export function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeatured = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          isFeatured,
          product_images(image_url)
        `)
        .eq("isFeatured", true)

      if (error) {
        console.error("Error fetching featured products:", error)
      } else {
        setFeaturedProducts(data as Product[])
      }
      setLoading(false)
    }

    fetchFeatured()
  }, [])

  if (loading) return <p className="text-center py-10">Loading featured products...</p>

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Exclusive Collections</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most coveted pieces, each representing the pinnacle of leather craftsmanship and timeless design.
          </p>
        </div>

        {/* Horizontal scroll on mobile / Grid on desktop */}
        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible">
          {featuredProducts.slice(0, 6).map((product) => (
            <div className="flex-shrink-0 w-72 md:w-auto" key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                images={
                  product.product_images?.length
                    ? product.product_images.map((img) => img.image_url)
                    : ["/placeholder.svg"]
                }
                featured={product.isFeatured}
                className="velvet-texture"
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/collections">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
