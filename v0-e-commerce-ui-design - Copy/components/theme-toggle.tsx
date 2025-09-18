"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Button variant="ghost" size="icon" className="h-9 w-9">
        <div className="h-4 w-4" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="h-9 w-9 hover:bg-accent/10 transition-all duration-300 hover:scale-105 relative overflow-hidden group"
      title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <Sun
        className={`h-4 w-4 theme-toggle-icon ${
          theme === "dark" ? "rotate-90 scale-0 opacity-0" : "rotate-0 scale-100 opacity-100"
        }`}
      />

      <Moon
        className={`absolute h-4 w-4 theme-toggle-icon ${
          theme === "dark" ? "rotate-0 scale-100 opacity-100" : "-rotate-90 scale-0 opacity-0"
        }`}
      />

      <span className="sr-only text-foreground">Toggle theme</span>
    </Button>
  )
}
