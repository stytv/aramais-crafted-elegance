"use client"

import { useState, useEffect } from "react"
import { supabase } from "@/lib/supabase"
import { ProductCard } from "./product-card"
import { Button } from "./ui/button"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  isFeatured: boolean
  product_images: { image_url: string }[]
}

export function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchFeaturedProducts()
  }, [])

  const fetchFeaturedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          isFeatured,
          product_images (image_url)
        `)
        .eq("isFeatured", true)
        .limit(6)

      if (error) {
        console.error("Error fetching featured products:", error)
        return
      }

      setProducts(data || [])
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-20 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="heading-serif text-4xl font-bold text-center text-card-foreground mb-12">Exclusive Collections</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-muted h-64 rounded-lg mb-4"></div>
                <div className="bg-muted h-4 rounded mb-2"></div>
                <div className="bg-muted h-4 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Exclusive Collections</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most coveted pieces, each representing the pinnacle of leather craftsmanship and timeless design.
          </p>
        </div>

        <div className="flex gap-6 overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 md:overflow-x-visible">
          {products.map((product) => (
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