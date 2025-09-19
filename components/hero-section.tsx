"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import { ArrowRight, ShieldCheck, Truck, RefreshCcw } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-background min-h-[90vh] flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="/homeimg.jpg"
          alt="Luxury Shoes"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8 text-center lg:text-left"
          >
            <h1 className="heading-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Step Into <span className="text-gold-500">Elegance</span>
            </h1>
            <p className="text-gray-300 text-lg sm:text-xl max-w-xl mx-auto lg:mx-0">
              Handcrafted leather shoes designed for modern gentlemen.
              Experience unmatched comfort and timeless sophistication.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center  lg:justify-start">
              <Link href="/collections">
                <Button
                  size="lg"
                  className="bg-muted text-white hover:bg-background transition-all"
                >
                  Shop Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/custom">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-black transition-all"
                >
                  Custom Orders
                </Button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-6 text-gray-300">
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-gold-500" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center gap-2">
                <RefreshCcw className="h-5 w-5 text-gold-500" />
                <span className="text-sm">Easy Returns</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-gold-500" />
                <span className="text-sm">Premium Quality</span>
              </div>
            </div>
          </motion.div>

          {/* Right Product Highlight */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative w-full max-w-md mx-auto"
          >
            <div className="relative bg-black/60 backdrop-blur-lg rounded-3xl p-6 shadow-xl hover:shadow-2xl transition-all">
              <div className="aspect-square relative mb-4">
                <Image
                  src="/luxury-oxford-leather-shoe-mahogany-color-studio-l.jpg"
                  alt="Heritage Oxford"
                  fill
                  className="object-cover rounded-2xl"
                />
              </div>
              <div className="text-center space-y-2">
                <h3 className="heading-serif text-xl sm:text-2xl font-semibold text-white">
                  Heritage Oxford
                </h3>
                <p className="text-gray-300 text-sm sm:text-base">
                  Finest Italian leather, handcrafted for timeless style
                </p>
                <div className="text-2xl sm:text-3xl font-bold text-gold-500">
                  ₹450
                </div>
                <Link href="/product/oxford-mahogany">
                  <Button className="w-full mt-3 bg-gold-500 text-black hover:bg-gold-400 transition-all">
                    View Product
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
