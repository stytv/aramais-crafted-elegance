"use client"

import { useState, useEffect } from "react"
import { ShoppingBag, User, Menu, X, Search, LogIn } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { ThemeToggle } from "@/components/theme-toggle"
import Image from "next/image"
import { useRouter } from "next/navigation"

// MUI Dialog
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false)
  const { state } = useCart()
  const router = useRouter()

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

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("supabase_session")
      localStorage.removeItem("supabase_user_id")
      localStorage.removeItem("supabase_user_email")
      localStorage.removeItem("premium_member")
      setIsLoggedIn(false)
      setIsMenuOpen(false)
    }
  }

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const menuButton = document.querySelector('[aria-label="Toggle menu"]')

      if (
        isMenuOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setIsMenuOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [isMenuOpen])

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const navigation = [
    { name: "Collections", href: "/collections", requiresAuth: false },
    { name: "Oxfords", href: "/category/oxfords", requiresAuth: false },
    { name: "Brogues", href: "/category/brogues", requiresAuth: false },
    { name: "Loafers", href: "/category/loafers", requiresAuth: false },
    { name: "Boots", href: "/category/boots", requiresAuth: false },
    { name: "Custom Orders", href: "/custom", requiresAuth: true },
    { name: "About", href: "/about", requiresAuth: false },
  ]

  return (
    <nav className="fixed top-0 w-full z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-16 px-4 md:px-8 bg-background shadow-sm">

          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <div className="w-20 h-full overflow-hidden rounded-lg p-2">
              <Image
                src="/logo.jpg"
                alt="Aramis Logo"
                width={90}
                height={20}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-2xl heading-serif text-accent">Aramis</span>
              <span className="text-sm text-muted-foreground">LEATHER</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map(
              (item) =>
                (!item.requiresAuth || isLoggedIn) && (
                  <button
                    key={item.name}
                    onClick={() => router.push(item.href)}
                    className="text-sm font-medium text-foreground hover:text-accent transition-colors duration-200"
                  >
                    {item.name}
                  </button>
                )
            )}
          </div>

          {/* Right Side Icons */}
          <div className="flex items-center space-x-2">
            {isLoggedIn ? (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:text-accent hidden md:inline-flex"
                >
                  <Search className="h-5 w-5" />
                </Button>

                <ThemeToggle className="hidden md:inline-flex" />

                <Button
                  variant="ghost"
                  size="icon"
                  className="hidden md:inline-flex text-foreground hover:text-accent"
                  onClick={() => router.push("/account")}
                >
                  <User className="h-5 w-5" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="relative text-foreground hover:text-accent"
                  onClick={() => router.push("/cart")}
                >
                  <ShoppingBag className="h-5 w-5" />
                  {state.items.length > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent text-accent-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {state.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </span>
                  )}
                </Button>

                {/* Mobile Menu Button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>

                {/* Desktop Logout */}
                <Button
                  variant="outline"
                  size="sm"
                  className="hidden md:flex"
                  onClick={() => setIsLogoutDialogOpen(true)}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="md:hidden text-foreground"
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>

                <Button
                  className="hidden md:flex items-center gap-2"
                  onClick={() => router.push("/auth")}
                >
                  <LogIn className="h-4 w-4" /> Login
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          id="mobile-sidebar"
          className={`fixed top-0 right-0 z-40 h-screen w-full max-w-xs md:max-w-md lg:max-w-lg bg-background shadow-xl transition-transform duration-300 ease-in-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <span className="text-2xl heading-serif text-accent">Menu</span>
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
            <div className="flex flex-col space-y-4 mb-8">
              {navigation.map(
                (item) =>
                  (!item.requiresAuth || isLoggedIn) && (
                    <button
                      key={item.name}
                      onClick={() => {
                        router.push(item.href)
                        setIsMenuOpen(false)
                      }}
                      className="p-3 text-base font-medium text-foreground hover:text-accent transition-colors duration-200 border border-border rounded-md hover:bg-accent/10"
                    >
                      {item.name}
                    </button>
                  )
              )}
            </div>

            {/* Additional Actions */}
            <div className="mt-auto pt-6 border-t border-border">
              {isLoggedIn ? (
                <div className="flex flex-col space-y-4">
                  <button
                    onClick={() => {
                      router.push("/account")
                      setIsMenuOpen(false)
                    }}
                    className="flex items-center p-3 text-base font-medium text-foreground hover:text-accent transition-colors duration-200 border border-border rounded-md hover:bg-accent/10"
                  >
                    <User className="h-5 w-5 mr-2" />
                    My Account
                  </button>
                  <button
                    onClick={() => setIsLogoutDialogOpen(true)}
                    className="flex items-center p-3 text-base font-medium text-foreground hover:text-accent transition-colors duration-200 border border-border rounded-md hover:bg-accent/10"
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => {
                    router.push("/auth")
                    setIsMenuOpen(false)
                  }}
                  className="flex items-center p-3 text-base font-medium text-foreground hover:text-accent transition-colors duration-200 border border-border rounded-md hover:bg-accent/10"
                >
                  <LogIn className="h-5 w-5 mr-2" />
                  Login / Register
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Overlay */}
        <div
          className={`fixed inset-0 z-30 bg-black bg-opacity-50 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={() => setIsMenuOpen(false)}
        />
      </div>

      {/* MUI Logout Dialog */}
      <Dialog
        open={isLogoutDialogOpen}
        onClose={() => setIsLogoutDialogOpen(false)}
      >
        <DialogTitle>{"Confirm Logout"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to log out? You will need to log in again to
            access your account.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsLogoutDialogOpen(false)}>Cancel</Button>
          <Button
            onClick={() => {
              handleLogout()
              setIsLogoutDialogOpen(false)
            }}
          >
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </nav>
  )
}
