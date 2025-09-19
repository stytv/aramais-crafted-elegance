"use client"

import React, { useState, useEffect, useCallback, memo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ShoppingBag, User, Menu, X, Search, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { useRouter } from "next/navigation"

const navigation = [
  { name: "Collections", href: "/collections", requiresAuth: false },
  { name: "Oxfords", href: "/category/oxfords", requiresAuth: false },
  { name: "Brogues", href: "/category/brogues", requiresAuth: false },
  { name: "Loafers", href: "/category/loafers", requiresAuth: false },
  { name: "Boots", href: "/category/boots", requiresAuth: false },
  { name: "Custom Orders", href: "/custom", requiresAuth: true },
  { name: "About", href: "/about", requiresAuth: false },
]

const NavbarOptimized = memo(function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { state } = useCart()
  const router = useRouter()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Check auth status
  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== "undefined") {
        const sessionString = localStorage.getItem("supabase_session")
        const userIdStored = localStorage.getItem("supabase_user_id")
        setIsLoggedIn(!!sessionString && !!userIdStored)
      }
    }

    checkAuthStatus()
    window.addEventListener("storage", checkAuthStatus)
    return () => window.removeEventListener("storage", checkAuthStatus)
  }, [])

  const handleLogout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("supabase_session")
      localStorage.removeItem("supabase_user_id")
      localStorage.removeItem("supabase_user_email")
      localStorage.removeItem("premium_member")
      setIsLoggedIn(false)
      setIsMenuOpen(false)
    }
  }, [])

  const toggleMenu = useCallback(() => {
    setIsMenuOpen(prev => !prev)
  }, [])

  const navigateAndCloseMenu = useCallback((href: string) => {
    router.push(href)
    setIsMenuOpen(false)
  }, [router])

  const cartItemCount = state.items.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <>
      <motion.nav
        className={cn(
          "fixed top-0 w-full z-50 transition-all duration-300",
          scrolled 
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm" 
            : "bg-background/80 backdrop-blur-sm"
        )}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => navigateAndCloseMenu("/")}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="relative w-12 h-12 overflow-hidden rounded-lg">
                <Image
                  src="/logo.jpg"
                  alt="Aramis Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-foreground">Aramis</h1>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Leather</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) =>
                (!item.requiresAuth || isLoggedIn) && (
                  <motion.button
                    key={item.name}
                    onClick={() => navigateAndCloseMenu(item.href)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-200 relative"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {item.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary"
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.2 }}
                    />
                  </motion.button>
                )
              )}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-2">
              {isLoggedIn ? (
                <>
                  {/* Search Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
                    >
                      <Search className="h-5 w-5" />
                    </Button>
                  </motion.div>

                  {/* Theme Toggle */}
                  <div className="hidden md:block">
                    <ThemeToggle />
                  </div>

                  {/* Account Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="hidden md:inline-flex text-muted-foreground hover:text-foreground"
                      onClick={() => navigateAndCloseMenu("/account")}
                    >
                      <User className="h-5 w-5" />
                    </Button>
                  </motion.div>

                  {/* Cart Button */}
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="relative text-muted-foreground hover:text-foreground"
                      onClick={() => navigateAndCloseMenu("/cart")}
                    >
                      <ShoppingBag className="h-5 w-5" />
                      <AnimatePresence>
                        {cartItemCount > 0 && (
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0 }}
                            className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium"
                          >
                            {cartItemCount}
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </Button>
                  </motion.div>

                  {/* Logout Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    className="hidden md:flex"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <Button
                  className="hidden md:flex items-center gap-2"
                  onClick={() => navigateAndCloseMenu("/auth")}
                >
                  <LogIn className="h-4 w-4" />
                  Login
                </Button>
              )}

              {/* Mobile Menu Button */}
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-muted-foreground"
                  onClick={toggleMenu}
                  aria-label="Toggle menu"
                >
                  <AnimatePresence mode="wait">
                    {isMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: -90 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: 90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <X className="h-5 w-5" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: 90 }}
                        animate={{ rotate: 0 }}
                        exit={{ rotate: -90 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Menu className="h-5 w-5" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm md:hidden"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 z-50 h-screen w-80 bg-background shadow-2xl md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-border">
                  <h2 className="text-lg font-semibold">Menu</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Navigation Links */}
                <div className="flex-1 overflow-y-auto py-6">
                  <nav className="space-y-2 px-6">
                    {navigation.map((item, index) =>
                      (!item.requiresAuth || isLoggedIn) && (
                        <motion.button
                          key={item.name}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                          onClick={() => navigateAndCloseMenu(item.href)}
                          className="w-full text-left p-3 text-base font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-all duration-200"
                        >
                          {item.name}
                        </motion.button>
                      )
                    )}
                  </nav>
                </div>

                {/* Footer Actions */}
                <div className="border-t border-border p-6 space-y-4">
                  {isLoggedIn ? (
                    <>
                      <Button
                        variant="outline"
                        className="w-full justify-start"
                        onClick={() => navigateAndCloseMenu("/account")}
                      >
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </Button>
                      <Button
                        variant="outline"
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </>
                  ) : (
                    <Button
                      className="w-full justify-start"
                      onClick={() => navigateAndCloseMenu("/auth")}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login / Register
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
})

export { NavbarOptimized }

// Helper function
function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}