"use client"

import type React from "react"

import { useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    // Handle form submission
    setTimeout(() => setIsSubmitted(false), 3000)
  }

  const handleWhatsAppContact = () => {
    const message = encodeURIComponent("Hello! I'd like to inquire about Aramis Leather shoes.")
    const phoneNumber = "1234567890"
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank")
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-card py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-5xl font-bold text-card-foreground mb-6">Contact Us</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                We welcome inquiries from distinguished gentlemen seeking exceptional footwear. Our concierge service is
                at your disposal.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Contact Form */}
              <div className="bg-card rounded-2xl p-8 velvet-texture">
                <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                  Send us a Message
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name" className="text-card-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      required
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-card-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject" className="text-card-foreground">
                      Subject
                    </Label>
                    <Input
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => handleInputChange("subject", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="message" className="text-card-foreground">
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitted}
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer"
                  >
                    {isSubmitted ? "Message Sent!" : "Send Message"}
                  </Button>
                </form>

                {/* WhatsApp Contact */}
                <div className="mt-8 pt-6 border-t border-accent/20">
                  <Button
                    onClick={handleWhatsAppContact}
                    className="w-full bg-muted text-muted-foreground hover:bg-muted/80 border border-accent/20"
                    variant="outline"
                  >
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Contact via WhatsApp
                  </Button>
                </div>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                {/* Store Directory */}
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                    Our Locations
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">Florence Atelier</h4>
                        <p className="text-muted-foreground">
                          Via dei Calzaiuoli, 123
                          <br />
                          50122 Florence, Italy
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">London Showroom</h4>
                        <p className="text-muted-foreground">
                          15 Savile Row
                          <br />
                          London W1S 3PJ, UK
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <MapPin className="h-6 w-6 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-card-foreground mb-1">New York Boutique</h4>
                        <p className="text-muted-foreground">
                          Madison Avenue, 789
                          <br />
                          New York, NY 10065, USA
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Details */}
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                    Get in Touch
                  </h3>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-card-foreground">Phone</p>
                        <p className="text-muted-foreground">+1 (555) 123-4567</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-card-foreground">Email</p>
                        <p className="text-muted-foreground">concierge@aramisleather.com</p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-4">
                      <Clock className="h-5 w-5 text-accent" />
                      <div>
                        <p className="font-medium text-card-foreground">Business Hours</p>
                        <p className="text-muted-foreground">
                          Monday - Saturday: 9:00 AM - 7:00 PM
                          <br />
                          Sunday: 11:00 AM - 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Appointment Booking */}
                <div className="bg-muted/50 rounded-2xl p-6 border border-accent/20">
                  <h4 className="font-semibold text-foreground mb-2">Private Consultation</h4>
                  <p className="text-muted-foreground text-sm mb-4">
                    Schedule a personal fitting session with our master craftsmen for bespoke services.
                  </p>
                  <Button className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
                    Book Appointment
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
      </div>
    </CartProvider>
  )
}
