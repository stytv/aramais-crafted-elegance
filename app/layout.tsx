import type { Metadata } from 'next'
import { Playfair_Display, Inter } from 'next/font/google'
import './globals.css'
import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Aramis Leather - Premium Leather Goods & Custom Craftsmanship',
  description: 'Discover luxury leather shoes, bags, belts, wallets and custom leather goods. Handcrafted with premium materials and timeless design.',
  keywords: 'luxury leather, handcrafted shoes, leather bags, custom leather goods, premium accessories',
  authors: [{ name: 'Aramis Leather' }],
  openGraph: {
    title: 'Aramis Leather - Premium Leather Goods & Custom Craftsmanship',
    description: 'Discover luxury leather shoes, bags, belts, wallets and custom leather goods. Handcrafted with premium materials and timeless design.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Aramis Leather - Premium Leather Goods & Custom Craftsmanship',
    description: 'Discover luxury leather shoes, bags, belts, wallets and custom leather goods. Handcrafted with premium materials and timeless design.',
  },
  viewport: 'width=device-width, initial-scale=1',
  robots: 'index, follow',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="font-inter">
        <TooltipProvider>
          <main>{children}</main>
          <Toaster />
          <Sonner />
        </TooltipProvider>
      </body>
    </html>
  )
}