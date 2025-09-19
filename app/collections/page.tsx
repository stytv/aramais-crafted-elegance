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
          <ProductGrid products={productsData.products} categories={productsData.categories} />
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
      </div>
    </CartProvider>
  )
}
