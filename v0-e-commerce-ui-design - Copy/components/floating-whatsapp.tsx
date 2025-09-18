"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function FloatingWhatsApp() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Hello! I'm interested in Aramis Leather shoes.")
    const phoneNumber = "1234567890" // Replace with actual WhatsApp number
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-accent text-accent-foreground hover:bg-accent/90 shadow-lg gold-shimmer"
      size="icon"
    >
      <MessageCircle className="h-6 w-6" />
    </Button>
  )
}
