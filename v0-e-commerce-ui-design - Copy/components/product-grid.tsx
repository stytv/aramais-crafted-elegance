"use client"

import { useState } from "react"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Filter } from "lucide-react"
import Link from "next/link"

interface Product {
  id: string
  name: string
  category: string
  price: number
  images: string[]
  featured?: boolean
}

interface Category {
  slug: string
  name: string
  description: string
}

interface ProductGridProps {
  products: Product[]
  categories: Category[]
  currentCategory?: string
}

export function ProductGrid({ products, categories, currentCategory }: ProductGridProps) {
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<string[]>(currentCategory ? [currentCategory] : [])

  // Filter products
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) return true
    return selectedCategories.includes(product.category)
  })

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories((prev) =>
      prev.includes(categorySlug) ? prev.filter((c) => c !== categorySlug) : [...prev, categorySlug],
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div className="lg:w-64 flex-shrink-0">
          <div className="bg-card rounded-lg p-6 velvet-texture">
            <div className="flex items-center justify-between mb-6">
              <h3 className="heading-serif text-lg font-semibold text-card-foreground">Filters</h3>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden text-card-foreground"
              >
                <Filter className="h-5 w-5" />
              </Button>
            </div>

            <div className={`space-y-6 ${showFilters ? "block" : "hidden lg:block"}`}>
              {/* Categories */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-3 border-b border-accent pb-2">Collections</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category.slug} className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.slug)}
                        onChange={() => toggleCategory(category.slug)}
                        className="rounded border-accent text-accent focus:ring-accent"
                      />
                      <span className="text-muted-foreground hover:text-card-foreground transition-colors">
                        {category.name}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-3 border-b border-accent pb-2">Price Range</h4>
                <div className="space-y-2">
                  <div className="text-sm text-muted-foreground">$300 - $600</div>
                  <div className="text-xs text-muted-foreground">All prices shown are in USD</div>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="font-semibold text-card-foreground mb-3 border-b border-accent pb-2">Quick Access</h4>
                <div className="space-y-2">
                  <Link
                    href="/custom"
                    className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    Custom Orders
                  </Link>
                  <Link
                    href="/size-guide"
                    className="block text-sm text-muted-foreground hover:text-accent transition-colors"
                  >
                    Size Guide
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Toolbar */}
          <div className="flex items-center justify-between mb-8 bg-card rounded-lg p-4">
            <div className="text-muted-foreground">
              Showing {sortedProducts.length} {sortedProducts.length === 1 ? "product" : "products"}
            </div>

            <div className="flex items-center space-x-4">
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48 bg-background border-accent/20 focus:border-accent">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent className="bg-card border-accent/20">
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                image={product.images[0]}
                featured={product.featured}
                className="velvet-texture"
              />
            ))}
          </div>

          {sortedProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-muted-foreground text-lg mb-4">No products found matching your criteria.</div>
              <Button
                onClick={() => setSelectedCategories([])}
                className="bg-accent text-accent-foreground hover:bg-accent/90"
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
