import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import { Suspense } from "react"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

// Add metadata with favicons
export const metadata: Metadata = {
  title: "Aramis Leather - Handcrafted Shoes for the Modern Aristocrat",
  description:
    "Discover exquisite handcrafted leather shoes with Old Money elegance. Premium quality, timeless style.",
  generator: "v0.app",
  icons: {
    icon: "/logo.jpg",                // Standard favicon for browsers
    shortcut: "/logo.jpg",            // Optional shortcut icon
    apple: "logo.jpg",      // Apple touch icon for iOS
    other: [
      { rel: "icon", url: "/logo.jpg", sizes: "32x32" },
      { rel: "icon", url: "/logo.jpg", sizes: "16x16" }
    ],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider attribute="class" defaultTheme="dark" disableTransitionOnChange enableSystem>
          <Suspense fallback={null}>{children}</Suspense>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
