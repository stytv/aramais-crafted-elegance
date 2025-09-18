import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { CheckoutForm } from "@/components/checkout-form"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"

export default function CheckoutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="bg-card py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Checkout</h1>
              <p className="text-xl text-muted-foreground">Complete your order with our secure checkout process</p>
            </div>
          </div>
          <CheckoutForm />
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
