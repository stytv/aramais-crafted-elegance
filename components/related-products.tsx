"use client"

import { useEffect, useRef } from "react"
import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  featured?: boolean
  product_images?: { image_url: string }[]
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const container = scrollRef.current
    if (!container || !audioRef.current) return

    let lastScrollLeft = container.scrollLeft

    const handleScroll = () => {
      const currentScroll = container.scrollLeft
      if (currentScroll !== lastScrollLeft) {
        audioRef.current!.play().catch(() => {}) // Play subtle sound
        lastScrollLeft = currentScroll
      }
    }

    container.addEventListener("scroll", handleScroll)

    return () => container.removeEventListener("scroll", handleScroll)
  }, [])

  if (products.length === 0) return null

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-3xl font-bold text-center text-card-foreground mb-12">
          You May Also Like
        </h2>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 scroll-smooth"
        >
          {products.map((product) => (
            <div className="flex-shrink-0 w-72 sm:w-auto" key={product.id}>
              <ProductCard
                id={product.id}
                name={product.name}
                price={product.price}
                images={product.product_images?.map((img) => img.image_url) || ["/placeholder.jpg"]}
                className="velvet-texture"
              />
            </div>
          ))}
        </div>

        {/* Subtle scroll sound */}
        <audio ref={audioRef} src="/scroll-sound.mp3" preload="auto" />
      </div>
    </section>
  )
}
