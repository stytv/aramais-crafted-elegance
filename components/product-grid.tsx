"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  X,
  Home,
  ShoppingCart,
  Heart,
  Package,
  User,
  Shirt,
  Gem,
  Watch,
  RotateCcw,
} from "lucide-react"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useCart } from "@/lib/cart-context"
import { useCartStore } from "@/lib/cart-store"
import { motion } from "framer-motion"

interface Product {
  id: string
  name: string
  price: number
  stock: number
  category_id?: number
  created_at?: string
  product_images?: { image_url: string }[]
}

interface Category {
  id: number
  name: string
  icon?: JSX.Element
}

export function ProductGrid({ currentCategory }: { currentCategory?: string }) {
  const items = useCartStore((state) => state.items)
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [sortBy, setSortBy] = useState("name")
  const [showFilters, setShowFilters] = useState(false)
  const [selectedCategories, setSelectedCategories] = useState<number[]>(
    currentCategory ? [parseInt(currentCategory)] : []
  )
  const [tab, setTab] = useState("all")


  const [currentPage, setCurrentPage] = useState(1)
  const PRODUCTS_PER_PAGE = 10
  const router = useRouter()

  useEffect(() => {
    const fetchProducts = async () => {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id,
          name,
          price,
          stock,
          category_id,
          created_at,
          product_images(image_url)
        `)
      if (!error) setProducts(data || [])
    }

    const fetchCategories = async () => {
      const { data, error } = await supabase.from("categories").select("*")
      if (!error) {
        const categoryIcons: Record<string, JSX.Element> = {
          Shoes: <Shirt className="h-5 w-5" />,
          Jewelry: <Gem className="h-5 w-5" />,
          Watches: <Watch className="h-5 w-5" />,
          Clothing: <Shirt className="h-5 w-5" />,
        }

        const categoriesWithIcons = (data || []).map((cat: any) => ({
          ...cat,
          icon: categoryIcons[cat.name] || <Package className="h-5 w-5" />,
        }))

        setCategories(categoriesWithIcons)
      }
    }

    fetchProducts()
    fetchCategories()
  }, [])

  useEffect(() => {
    if (!currentCategory || categories.length === 0) return
    const category = categories.find(
      (cat) => cat.name.toLowerCase() === currentCategory.toLowerCase()
    )
    if (category) setSelectedCategories([category.id])
  }, [currentCategory, categories])

  // Filtering
  const filteredProducts = products.filter((product) => {
    if (selectedCategories.length === 0) return true
    return product.category_id && selectedCategories.includes(product.category_id)
  })

  // Sorting
  let sortedProducts = [...filteredProducts]

  if (tab === "newest") {
    sortedProducts.sort(
      (a, b) =>
        new Date(b.created_at || "").getTime() -
        new Date(a.created_at || "").getTime()
    )
  } else if (tab === "popular") {
    sortedProducts.sort((a, b) => b.stock - a.stock) // popularity proxy
  } else {
    sortedProducts.sort((a, b) => {
      switch (sortBy) {
        case "price-low":
          return a.price - b.price
        case "price-high":
          return b.price - a.price
        case "name":
        default:
          return a.name.localeCompare(b.name)
      }
    })
  }

  const totalPages = Math.ceil(sortedProducts.length / PRODUCTS_PER_PAGE)
  const paginatedProducts = sortedProducts.slice(
    (currentPage - 1) * PRODUCTS_PER_PAGE,
    currentPage * PRODUCTS_PER_PAGE
  )

  const handleCategoryClick = (categoryId: number, categoryName: string) => {
    setSelectedCategories([categoryId])
    setCurrentPage(1)
    router.push(`/category/${categoryName.toLowerCase()}`)
  }

  const handleClearFilters = () => {
    setSelectedCategories([])
    setCurrentPage(1)
    router.push("/collections")
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-12">
      {/* ===== Category Scroll Bar ===== */}
      <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar mb-6 items-center relative">
        {/* Sticky Clear All Button (left side) */}
        <div className="sticky left-0 z-10 bg-background pr-2">
          <button
            onClick={handleClearFilters}
            className="flex flex-col items-center justify-center px-4 py-2 rounded-lg border bg-destructive text-destructive-foreground border-destructive"
          >
            <RotateCcw className="h-5 w-5" />
            <span className="text-xs mt-1">Clear All</span>
          </button>
        </div>

        {/* Scrollable Categories */}
        {categories.map((category) => (
          <motion.button
            key={category.id}
            onClick={() => handleCategoryClick(category.id, category.name)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`flex flex-col items-center justify-center px-4 py-2 rounded-lg border ${selectedCategories.includes(category.id)
                ? "bg-accent text-accent-foreground border-accent"
                : "bg-card text-muted-foreground border-border"
              }`}
          >
            {category.icon}
            <span className="text-xs mt-1">{category.name}</span>
          </motion.button>
        ))}

      </div>

      {/* ===== Tabs ===== */}
      <Tabs value={tab} onValueChange={setTab} className="mb-6 bg-muted">
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="newest">Newest</TabsTrigger>
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* ===== Main Content ===== */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar Filters */}
        <div
          className={`lg:w-64 flex-shrink-0 ${showFilters ? "block" : "hidden lg:block"
            }`}
        >
          <div className="bg-card rounded-lg p-6 relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowFilters(false)}
              className="absolute top-2 right-2 lg:hidden"
            >
              <X className="h-4 w-4" />
            </Button>

            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold mb-2">Collections</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() =>
                          handleCategoryClick(category.id, category.name)
                        }
                        className="rounded border-accent text-accent focus:ring-accent"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Grid + Toolbar */}
        <div className="flex-1">
          {tab === "all" && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 bg-card rounded-lg p-4">
              <div className="text-sm sm:text-base">
                Showing {paginatedProducts.length} of {sortedProducts.length}{" "}
                {sortedProducts.length === 1 ? "product" : "products"}
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="name">Name (A-Z)</SelectItem>
                  <SelectItem value="price-low">Price (Low to High)</SelectItem>
                  <SelectItem value="price-high">Price (High to Low)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                images={
                  product.product_images?.map((img) => img.image_url) || [
                    "/placeholder.jpg",
                  ]
                }
              />
            ))}
          </div>
        </div>
      </div>

      {/* ===== Sticky Bottom Footer (Mobile Only) ===== */}
      <div className="fixed bottom-6 inset-x-4 bg-muted rounded-2xl shadow-lg flex justify-between px-6 py-3 lg:hidden">
        <Link href="/" className="flex flex-col items-center text-sm relative">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex flex-col items-center"
          >
            <Home className="h-5 w-5" />
            <span>Home</span>
          </motion.div>
        </Link>

        <Link href="/cart" className="flex flex-col items-center text-sm relative">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex flex-col items-center relative"
          >
            <ShoppingCart className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-2 bg-destructive text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {items.reduce((acc, i) => acc + i.quantity, 0)}
              </span>
            )}
            <span>Cart</span>
          </motion.div>
        </Link>

        <Link href="/wishlist" className="flex flex-col items-center text-sm relative">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex flex-col items-center"
          >
            <Heart className="h-5 w-5" />
            <span>Wishlist</span>
          </motion.div>
        </Link>

        <Link href="/orders" className="flex flex-col items-center text-sm">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex flex-col items-center"
          >
            <Package className="h-5 w-5" />
            <span>Orders</span>
          </motion.div>
        </Link>

        <Link href="/profile" className="flex flex-col items-center text-sm">
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
            className="flex flex-col items-center"
          >
            <User className="h-5 w-5" />
            <span>Profile</span>
          </motion.div>
        </Link>
      </div>
    </div>
  )
}
