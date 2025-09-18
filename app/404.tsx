"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, ArrowLeft } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="text-8xl heading-serif font-bold text-accent mb-4">404</div>
          <h1 className="heading-serif text-3xl font-bold text-foreground mb-4">Room Not Found</h1>
          <p className="text-xl text-muted-foreground mb-8">
            This room doesn't exist in the club. Perhaps you'd like to return to the main hall?
          </p>
        </div>

        <div className="space-y-4">
          <Link href="/">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
              <Home className="mr-2 h-5 w-5" />
              Return to Main Hall
            </Button>
          </Link>
          <div>
            <Button
              variant="outline"
              onClick={() => window.history.back()}
              className="border-accent/20 text-foreground hover:border-accent bg-transparent"
            >
              <ArrowLeft className="mr-2 h-5 w-5" />
              Go Back
            </Button>
          </div>
        </div>

        <div className="mt-12 text-sm text-muted-foreground">
          <p>Need assistance? Contact our concierge at concierge@aramisleather.com</p>
        </div>
      </div>
    </div>
  )
}
