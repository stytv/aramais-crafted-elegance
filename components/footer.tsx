import Link from "next/link"
import { Facebook, Instagram, Twitter } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function Footer() {
  return (
    <footer className="bg-card text-card-foreground">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="text-2xl heading-serif text-accent">Aramis</div>
              <div className="text-sm text-muted-foreground">LEATHER</div>
            </div>
            <p className="text-muted-foreground mb-6 max-w-md">
              "Shoes for the Modern Aristocrat" - Handcrafted leather footwear that embodies timeless elegance and
              exceptional quality.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-accent">
                <Twitter className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="heading-serif text-lg font-semibold mb-4 text-accent">Collections</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/category/oxfords" className="text-muted-foreground hover:text-accent transition-colors">
                  Oxford Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/brogues" className="text-muted-foreground hover:text-accent transition-colors">
                  Brogue Shoes
                </Link>
              </li>
              <li>
                <Link href="/category/loafers" className="text-muted-foreground hover:text-accent transition-colors">
                  Loafers
                </Link>
              </li>
              <li>
                <Link href="/category/boots" className="text-muted-foreground hover:text-accent transition-colors">
                  Boots
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="heading-serif text-lg font-semibold mb-4 text-accent">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/size-guide" className="text-muted-foreground hover:text-accent transition-colors">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link href="/shipping" className="text-muted-foreground hover:text-accent transition-colors">
                  Shipping Info
                </Link>
              </li>
              <li>
                <Link href="/returns" className="text-muted-foreground hover:text-accent transition-colors">
                  Returns
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-muted-foreground hover:text-accent transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-border mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="heading-serif text-lg font-semibold text-accent mb-2">Join the Club</h3>
              <p className="text-muted-foreground">Receive exclusive offers and updates from Aramis Leather.</p>
            </div>
            <div className="flex w-full md:w-auto max-w-sm">
              <Input
                type="email"
                placeholder="Enter your email"
                className="rounded-r-none bg-background border-accent/20 focus:border-accent"
              />
              <Button className="rounded-l-none bg-accent text-accent-foreground hover:bg-accent/90">Subscribe</Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-border mt-8 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
          <p>&copy; 2024 Aramis Leather. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy-policy" className="hover:text-accent transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-accent transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
