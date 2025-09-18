import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ProductDetail } from "@/components/product-detail"
import { RelatedProducts } from "@/components/related-products"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import productsData from "@/lib/products.json"
import { notFound } from "next/navigation"

interface ProductPageProps {
  params: {
    id: string
  }
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productsData.products.find((p) => p.id === params.id)
  if (!product) {
    notFound()
  }

  const relatedProducts = productsData.products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3)

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <ProductDetail product={product} />
          <RelatedProducts products={relatedProducts} />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
