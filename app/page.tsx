"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase"

import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { WhyAramis } from "@/components/why-aramis"
import { Testimonials } from "@/components/testimonials"
import { Newsletter } from "@/components/newsletter"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import "./globals.css"

export default function HomePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(true)
  const [userId, setUserId] = useState<string | null>(null)

  useEffect(() => {
    const checkUser = async () => {
      try {
        // ✅ Get current session directly from supabase
        const { data: { session }, error } = await supabase.auth.getSession()
        if (error) throw error

        if (session?.user) {
          setUserId(session.user.id)
          console.log("✅ User ID:", session.user.id)
        } else {
          setUserId(null)
        }
      } catch (err) {
        console.error("❌ User verification failed:", err)

        setUserId(null)
      } finally {
        setLoading(false) // ✅ Always end loading
      }
    }

    checkUser()

    // ✅ Listen for login/logout state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUserId(session.user.id)
        console.log("🔄 Auth state changed - User ID:", session.user.id)
      } else {
        setUserId(null)
      }
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [router])

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main>
          <HeroSection />
          <FeaturedProducts />
          <WhyAramis />
          <Testimonials />
          <Newsletter />
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
      </div>
    </CartProvider>
  )
}