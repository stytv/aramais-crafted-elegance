import Link from "next/link"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card/50 border-t border-accent/20 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="heading-serif text-2xl font-bold text-card-foreground">
              Aramis Leather
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              Crafting premium leather goods with traditional techniques and modern elegance. 
              Every piece tells a story of quality and craftsmanship.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-muted-foreground hover:text-accent transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/shop" className="text-muted-foreground hover:text-accent transition-colors">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-muted-foreground hover:text-accent transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Categories</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/category/shoes" className="text-muted-foreground hover:text-accent transition-colors">
                  Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/bags" className="text-muted-foreground hover:text-accent transition-colors">
                  Bags
                </Link>
              </li>
              <li>
                <Link href="/category/belts" className="text-muted-foreground hover:text-accent transition-colors">
                  Belts
                </Link>
              </li>
              <li>
                <Link href="/category/wallets" className="text-muted-foreground hover:text-accent transition-colors">
                  Wallets
                </Link>
              </li>
              <li>
                <Link href="/custom" className="text-muted-foreground hover:text-accent transition-colors">
                  Custom Orders
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold text-card-foreground mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
                <span className="text-muted-foreground text-sm">
                  123 Leather Street, Craft District, City 12345
                </span>
              </li>
              <li className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-accent flex-shrink-0" />
                <Link href="tel:+1234567890" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  +1 (234) 567-8900
                </Link>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-accent flex-shrink-0" />
                <Link href="mailto:info@aramisleather.com" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                  info@aramisleather.com
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-accent/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-muted-foreground text-sm">
              © 2024 Aramis Leather. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Terms of Service
              </Link>
              <Link href="/size-guide" className="text-muted-foreground hover:text-accent transition-colors text-sm">
                Size Guide
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}