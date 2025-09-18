import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import productsData from "@/lib/products.json"
import { notFound } from "next/navigation"

interface CategoryPageProps {
  params: {
    slug: string
  }
}

export default function CategoryPage({ params }: CategoryPageProps) {
  const category = productsData.categories.find((cat) => cat.slug === params.slug)
  if (!category) {
    notFound()
  }

  const categoryProducts = productsData.products.filter((product) => product.category === params.slug)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="bg-card py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-4xl font-bold text-card-foreground mb-4">{category.name}</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">{category.description}</p>
            </div>
          </div>
          <ProductGrid products={categoryProducts} categories={productsData.categories} currentCategory={params.slug} />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
