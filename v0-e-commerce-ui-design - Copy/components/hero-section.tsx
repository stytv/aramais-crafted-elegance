"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      <div className="absolute inset-0 bg-gradient-to-r from-background via-background/95 to-background/80" />

      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image src="/luxury-leather-shoes-workshop-with-warm-lighting.jpg" alt="Aramis Leather Workshop" fill className="object-cover" priority />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="heading-serif text-5xl lg:text-7xl font-bold text-foreground leading-tight">
                Shoes for the
                <span className="block text-accent">Modern Aristocrat</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg leading-relaxed">
                Handcrafted leather footwear that embodies timeless elegance, exceptional quality, and the refined
                sophistication of a gentleman's club.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/collections">
                <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
                  Explore Collections
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/custom">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                >
                  Custom Orders
                </Button>
              </Link>
            </div>

            <div className="flex items-center space-x-8 pt-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-accent heading-serif">50+</div>
                <div className="text-sm text-muted-foreground">Years of Craftsmanship</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent heading-serif">100%</div>
                <div className="text-sm text-muted-foreground">Handcrafted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-accent heading-serif">24/7</div>
                <div className="text-sm text-muted-foreground">Customer Service</div>
              </div>
            </div>
          </div>

          {/* Right side - Featured Product Spotlight */}
          <div className="relative">
            <div className="relative bg-card/80 backdrop-blur-sm rounded-2xl p-8 gold-shimmer">
              <div className="absolute inset-0 bg-gradient-radial from-accent/10 via-transparent to-transparent rounded-2xl" />
              <div className="relative z-10">
                <div className="aspect-square relative mb-6">
                  <Image
                    src="/luxury-oxford-leather-shoe-mahogany-color-studio-l.jpg"
                    alt="Heritage Oxford"
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <div className="text-center space-y-4">
                  <h3 className="heading-serif text-2xl font-semibold text-card-foreground">Heritage Oxford</h3>
                  <p className="text-muted-foreground">
                    Our signature piece, handcrafted from the finest Italian leather
                  </p>
                  <div className="text-3xl font-bold text-accent">$450</div>
                  <Link href="/product/oxford-mahogany">
                    <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">View Details</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
