"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { supabase } from "@/lib/supabase"
import { CartProvider } from "@/lib/cart-context"
import PaymentForm from "@/components/payment-form"
import AddressForm from "@/components/address-form"
import { OrderConfirmation } from "@/components/order-confirmation"

export default function CheckoutPage() {
  const [user, setUser] = useState<any>(null)
  const [address, setAddress] = useState<any>(null)
  const [step, setStep] = useState(1) // 1: Address, 2: Payment, 3: Confirmation
  const router = useRouter()

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser()
      if (!data?.user) {
        router.push("/login")
      } else {
        setUser(data.user)
      }
    }
    getUser()
  }, [router])

  if (!user) return null

  const steps = ["Address", "Payment", "Confirmation"]

  const handleNextStep = (selectedAddress: any) => {
    setAddress(selectedAddress)
    setStep(2)
  }

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          <div className="bg-card py-16">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Checkout</h1>
              <p className="text-xl text-muted-foreground">
                Complete your order with our secure checkout process
              </p>
            </div>
          </div>

          {/* Step Indicator */}
          <div className="max-w-3xl mx-auto mt-8 mb-6 flex items-center justify-between">
            {steps.map((title, index) => {
              const current = index + 1
              const active = step === current
              const completed = step > current
              return (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                      completed ? "bg-green-600" : active ? "bg-blue-600" : "bg-gray-300"
                    }`}
                  >
                    {current}
                  </div>
                  <span className={`mt-2 text-sm ${active ? "font-semibold" : "text-gray-500"}`}>
                    {title}
                  </span>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mt-2 ${completed ? "bg-green-600" : "bg-gray-300"}`}
                    ></div>
                  )}
                </div>
              )
            })}
          </div>

          {/* Step Content */}
          <div className="max-w-3xl mx-auto">
            {step === 1 && (
              <AddressForm
                user={user}
                onSaved={(addr) => setAddress(addr)}
                onNextStep={handleNextStep}
              />
            )}

            {step === 2 && address && (
              <PaymentForm
                user={user}
                address={address}
                onPaymentSuccess={() => setStep(3)}
              />
            )}

            {step === 3 && (
              <div className="text-center py-16">
                <OrderConfirmation />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </div>
    </CartProvider>
  )
}
