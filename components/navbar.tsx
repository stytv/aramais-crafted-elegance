"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Menu, X, ShoppingCart, User, LogOut } from "lucide-react"
import { supabase } from "@/src/integrations/supabase/client"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [cartCount, setCartCount] = useState(0)
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }
    checkUser()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    localStorage.removeItem("supabase_session")
    localStorage.removeItem("supabase_user_id")
    localStorage.removeItem("supabase_role")
    router.push("/")
  }

  return (
    <nav className="sticky top-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-accent/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <span className="heading-serif text-2xl font-bold text-foreground">
              Aramis Leather
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link 
              href="/" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Home
            </Link>
            <Link 
              href="/shop" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Shop
            </Link>
            <Link 
              href="/about" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              About
            </Link>
            <Link 
              href="/contact" 
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              Contact
            </Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Link href="/cart" className="relative">
              <Button variant="ghost" size="sm">
                <ShoppingCart className="h-4 w-4" />
                {cartCount > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-accent text-accent-foreground">
                    {cartCount}
                  </Badge>
                )}
              </Button>
            </Link>
            
            {user ? (
              <div className="flex items-center space-x-2">
                <Link href="/account">
                  <Button variant="ghost" size="sm">
                    <User className="h-4 w-4 mr-2" />
                    Account
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <Link href="/auth">
                <Button variant="outline" className="border-accent/20 text-foreground bg-transparent hover:bg-accent/10">
                  Sign In
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-accent/20">
            <div className="flex flex-col space-y-4">
              <Link 
                href="/" 
                className="text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link 
                href="/shop" 
                className="text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Shop
              </Link>
              <Link 
                href="/about" 
                className="text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                About
              </Link>
              <Link 
                href="/contact" 
                className="text-muted-foreground hover:text-accent transition-colors"
                onClick={() => setIsOpen(false)}
              >
                Contact
              </Link>
              
              <div className="pt-4 border-t border-accent/20">
                <Link href="/cart" className="flex items-center justify-between">
                  <span className="text-muted-foreground">Cart</span>
                  {cartCount > 0 && (
                    <Badge className="bg-accent text-accent-foreground">
                      {cartCount}
                    </Badge>
                  )}
                </Link>
                
                {user ? (
                  <div className="flex flex-col space-y-2 mt-4">
                    <Link href="/account" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="h-4 w-4 mr-2" />
                        Account
                      </Button>
                    </Link>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-start" 
                      onClick={() => {
                        handleSignOut()
                        setIsOpen(false)
                      }}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                ) : (
                  <Link href="/auth" className="mt-4 block" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="w-full border-accent/20 text-foreground bg-transparent hover:bg-accent/10">
                      Sign In
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}