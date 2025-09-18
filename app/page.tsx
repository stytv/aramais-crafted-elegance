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
      const sessionString = localStorage.getItem("supabase_session")
      const userIdStored = localStorage.getItem("supabase_user_id")

      if (!sessionString || !userIdStored) {
        // No session or user ID → redirect to login page
        router.push("/auth")
        return
      }

      try {
        const session = JSON.parse(sessionString)
        const { data: { user } } = await supabase.auth.getUser(session.access_token)

        if (!user || user.id !== userIdStored) {
          // Session invalid or user mismatch → redirect to login
          router.push("/auth")
          return
        }

        setUserId(user.id)
        setLoading(false)
      } catch (err) {
        console.error("❌ User verification failed:", err)
        router.push("/auth")
      }
    }

    checkUser()
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
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
