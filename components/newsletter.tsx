"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Check } from "lucide-react"

export function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    setIsSubscribed(true)
    setEmail("")
    setTimeout(() => setIsSubscribed(false), 3000)
  }

  return (
    <section className="py-20 bg-card">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-background rounded-2xl p-12 text-center velvet-texture relative overflow-hidden">
          {/* Gold embossed effect */}
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5 rounded-2xl" />

          <div className="relative z-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6">
              <Mail className="h-8 w-8 text-accent" />
            </div>

            <h2 className="heading-serif text-3xl font-bold text-foreground mb-4">Join the Exclusive Club</h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Receive invitations to private events, early access to new collections, and exclusive offers reserved for
              our most distinguished members.
            </p>

            <form onSubmit={handleSubmit} className="max-w-md mx-auto">
              <div className="flex gap-4">
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="flex-1 bg-card border-accent/20 focus:border-accent"
                />
                <Button
                  type="submit"
                  className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer px-8"
                  disabled={isSubscribed}
                >
                  {isSubscribed ? <Check className="h-5 w-5" /> : "Join"}
                </Button>
              </div>
            </form>

            {isSubscribed && (
              <p className="text-accent mt-4 font-medium">Welcome to the club! Check your email for confirmation.</p>
            )}

            <p className="text-sm text-muted-foreground mt-6">
              By subscribing, you agree to receive marketing communications from Aramis Leather.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
