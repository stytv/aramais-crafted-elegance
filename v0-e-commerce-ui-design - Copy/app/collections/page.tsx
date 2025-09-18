import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductGrid } from "@/components/product-grid"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import productsData from "@/lib/products.json"

export default function CollectionsPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="bg-card py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Our Collections</h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Discover the complete range of handcrafted leather shoes, each piece representing decades of
                craftsmanship and timeless elegance.
              </p>
            </div>
          </div>
          <ProductGrid products={productsData.products} categories={productsData.categories} />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
