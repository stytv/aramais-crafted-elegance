"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { Badge } from "./ui/badge"

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
  featured: boolean
}

interface Category {
  slug: string
  name: string
  description: string
}

interface ProductGridProps {
  products?: Product[]
  categories?: Category[]
  currentCategory?: string
}

export function ProductGrid({ products = [], categories = [], currentCategory }: ProductGridProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>(currentCategory || "all")

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Category Filter */}
      <div className="flex flex-wrap gap-2 mb-8 justify-center">
        <Badge
          variant={selectedCategory === "all" ? "default" : "outline"}
          className="cursor-pointer"
          onClick={() => setSelectedCategory("all")}
        >
          All Products
        </Badge>
        {categories.map((category) => (
          <Badge
            key={category.slug}
            variant={selectedCategory === category.slug ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => setSelectedCategory(category.slug)}
          >
            {category.name}
          </Badge>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            images={product.images}
            featured={product.featured}
          />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found in this category.</p>
        </div>
      )}
    </div>
  )
}