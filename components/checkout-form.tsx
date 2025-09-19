"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, Lock, ArrowLeft } from "lucide-react"
import Link from "next/link"

export function CheckoutForm() {
  const { state, dispatch } = useCart()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "US",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // Generate order ID and redirect to confirmation
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase()
    dispatch({ type: "CLEAR_CART" })
    router.push(`/order/${orderId}`)
  }

  if (state.items.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center bg-card rounded-2xl p-16 velvet-texture">
          <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Your cart is empty</h2>
          <p className="text-muted-foreground mb-8">Add some items to your cart before proceeding to checkout.</p>
          <Link href="/collections">
            <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
              Browse Collections
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Checkout Form */}
        <div className="space-y-8">
          <Link href="/cart" className="inline-flex items-center text-accent hover:text-accent/80 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Cart
          </Link>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Contact Information */}
            <div className="bg-card rounded-lg p-6 velvet-texture">
              <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4 border-b border-accent pb-2">
                Contact Information
              </h3>
              <div className="space-y-4">
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
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-card rounded-lg p-6 velvet-texture">
              <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4 border-b border-accent pb-2">
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName" className="text-card-foreground">
                    First Name
                  </Label>
                  <Input
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange("firstName", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName" className="text-card-foreground">
                    Last Name
                  </Label>
                  <Input
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange("lastName", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="address" className="text-card-foreground">
                    Address
                  </Label>
                  <Input
                    id="address"
                    required
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="city" className="text-card-foreground">
                    City
                  </Label>
                  <Input
                    id="city"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="state" className="text-card-foreground">
                    State
                  </Label>
                  <Input
                    id="state"
                    required
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="zipCode" className="text-card-foreground">
                    ZIP Code
                  </Label>
                  <Input
                    id="zipCode"
                    required
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="country" className="text-card-foreground">
                    Country
                  </Label>
                  <Select value={formData.country} onValueChange={(value) => handleInputChange("country", value)}>
                    <SelectTrigger className="bg-background border-accent/20 focus:border-accent text-foreground">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-card border-accent/20">
                      <SelectItem value="US">United States</SelectItem>
                      <SelectItem value="CA">Canada</SelectItem>
                      <SelectItem value="UK">United Kingdom</SelectItem>
                      <SelectItem value="AU">Australia</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="bg-card rounded-lg p-6 velvet-texture">
              <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4 border-b border-accent pb-2 flex items-center">
                <CreditCard className="mr-2 h-5 w-5" />
                Payment Information
              </h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="nameOnCard" className="text-card-foreground">
                    Name on Card
                  </Label>
                  <Input
                    id="nameOnCard"
                    required
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber" className="text-card-foreground">
                    Card Number
                  </Label>
                  <Input
                    id="cardNumber"
                    required
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    className="bg-background border-accent/20 focus:border-accent text-foreground"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate" className="text-card-foreground">
                      Expiry Date
                    </Label>
                    <Input
                      id="expiryDate"
                      required
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv" className="text-card-foreground">
                      CVV
                    </Label>
                    <Input
                      id="cvv"
                      required
                      placeholder="123"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>
                </div>
              </div>
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer py-3 text-lg"
            >
              {isProcessing ? (
                "Processing..."
              ) : (
                <>
                  <Lock className="mr-2 h-5 w-5" />
                  Complete Order - ${(state.total * 1.08).toFixed(2)}
                </>
              )}
            </Button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="space-y-6">
          <div className="bg-card rounded-lg p-6 velvet-texture">
            <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4 border-b border-accent pb-2">
              Order Summary
            </h3>

            <div className="space-y-4 mb-6">
              {state.items.map((item) => (
                <div key={`${item.id}-${item.size}`} className="flex items-center space-x-4">
                  <div className="relative w-16 h-16 bg-muted rounded overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-card-foreground">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      Size {item.size} × {item.quantity}
                    </p>
                  </div>
                  <div className="text-accent font-semibold">${(item.price * item.quantity).toFixed(2)}</div>
                </div>
              ))}
            </div>

            <Separator className="my-4 bg-accent/20" />

            <div className="space-y-2">
              <div className="flex justify-between text-muted-foreground">
                <span>Subtotal</span>
                <span>${state.total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Shipping</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Tax</span>
                <span>${(state.total * 0.08).toFixed(2)}</span>
              </div>
              <Separator className="my-2 bg-accent/20" />
              <div className="flex justify-between text-card-foreground font-semibold text-lg">
                <span className="heading-serif">Total</span>
                <span className="text-accent heading-serif">${(state.total * 1.08).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="bg-muted/50 rounded-lg p-4 border border-accent/20">
            <div className="flex items-center text-muted-foreground text-sm">
              <Lock className="mr-2 h-4 w-4" />
              Your payment information is encrypted and secure
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
