"use client"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import { supabase } from "@/lib/supabase"
import { notFound } from "next/navigation"
import { useEffect, useState } from "react"

interface ProductPageProps {
  params: {
    id: string
  }
}

interface Product {
  id: string
  name: string
  price: number
  description: string
  category_id: number
  category?: { id: number; name: string }
  images?: { image_url: string }[]
  craftsmanship?: string
  care?: string
  sizes?: number[]
}

export default function ProductPage({ params }: ProductPageProps) {
  const [product, setProduct] = useState<Product | null>(null)
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([])

  useEffect(() => {
    const fetchProduct = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          description,
          category_id,
          sizes,
          categories!inner(id, name),
          product_images(image_url)
        `)
        .eq("id", params.id)
        .single()

      if (error || !data) {
        notFound()
        return
      }

      setProduct(data)

      // Fetch related products
      const { data: related, error: relatedError } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          product_images(image_url)
        `)
        .eq("category_id", data.category_id)
        .neq("id", data.id)
        .limit(3)

      if (!relatedError) {
        setRelatedProducts((related || []).map((product: any) => ({
          id: product.id,
          name: product.name,
          description: product.description || "",
          price: product.price,
          category_id: product.category_id || 1,
          product_images: product.product_images || []
        })))
      }
    }

    fetchProduct()
  }, [params.id])

  if (!product) return null

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <ProductDetail product={{
            ...product,
            category: product.category?.name || '',
            craftsmanship: product.craftsmanship || '',
            care: product.care || '',
            sizes: product.sizes || [],
            product_images: product.images || []
          }} />
          <RelatedProducts products={relatedProducts} />
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
      </div>
    </CartProvider>
  )
}
