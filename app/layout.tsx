import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import { CartProvider } from "@/lib/cart-context"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aramis Leather - Handcrafted Shoes for the Modern Aristocrat",
  description: "Discover exquisite handcrafted leather shoes with Old Money elegance. Premium quality, timeless style.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">
                <Suspense fallback={null}>{children}</Suspense>
              </main>
              <Footer />
              <FloatingWhatsApp />
            </div>
          </CartProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
