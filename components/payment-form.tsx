"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { supabase } from "@/lib/supabase"
import { useOrderStore } from "@/lib/order-store"

declare global {
  interface Window {
    Razorpay: any
  }
}

type PaymentFormProps = {
  user: any
  address: any
  onPaymentSuccess: () => void
}

export default function PaymentForm({ user, address, onPaymentSuccess }: PaymentFormProps) {
  const [rzLoaded, setRzLoaded] = useState(false)
  const [loading, setLoading] = useState(false)
  const [cart, setCart] = useState<any[]>([])
  const [totalAmount, setTotalAmount] = useState(0) // in paise

  const setOrderId = useOrderStore((state) => state.setOrderId)

  // Load Razorpay script
  useEffect(() => {
    if (!document.getElementById("razorpay-script")) {
      const script = document.createElement("script")
      script.src = "https://checkout.razorpay.com/v1/checkout.js"
      script.async = true
      script.id = "razorpay-script"
      script.onload = () => setRzLoaded(true)
      document.body.appendChild(script)
    } else {
      setRzLoaded(true)
    }
  }, [])

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await supabase
        .from("cart_items")
        .select(`id, product_id, size, quantity, products(id, name, price, product_images(image_url))`)
        .eq("user_id", user.id)

      if (error) {
        console.error("Error fetching cart:", error)
        return
      }

      const formatted = (data || []).map((row: any) => ({
        id: row.id,
        product_id: row.product_id,
        name: row.products?.name ?? "Unnamed",
        price: Number(row.products?.price ?? 0),
        size: row.size,
        quantity: row.quantity,
        image: row.products?.product_images?.[0]?.image_url ?? "/placeholder.svg",
      }))

      setCart(formatted)
      const total = formatted.reduce((sum, item) => sum + item.price * item.quantity, 0)
      setTotalAmount(total * 100)
    }

    fetchCart()
  }, [user.id])

  const handlePayment = async () => {
    if (!rzLoaded) return alert("Razorpay not loaded yet")
    if (cart.length === 0) return alert("Cart is empty!")

    setLoading(true)
    try {
      // Create Razorpay order
      const res = await fetch("/api/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount: totalAmount, user_id: user.id }),
      })

      if (!res.ok) throw new Error(await res.text())
      const order = await res.json()

      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY,
        amount: order.amount,
        currency: "INR",
        name: "My E-Commerce",
        description: "Secure Payment",
        order_id: order.id,
        handler: async (response: any) => {
          try {
            const saveRes = await fetch("/api/save-order", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                user_id: user.id,
                address_id: address.id,
                payment_id: response.razorpay_payment_id,
                amount: totalAmount / 100,
                cart: cart.map(item => ({
                  product_id: item.product_id,
                  quantity: item.quantity,
                  price: item.price,
                  size: item.size,
                })),
              }),
            })

            if (!saveRes.ok) throw new Error(await saveRes.text())
            const savedOrder = await saveRes.json()

            // ✅ Save orderId in Zustand
            setOrderId(savedOrder.order_id)

            alert("✅ Payment Successful!")
            onPaymentSuccess()
          } catch (err: any) {
            console.error("Error saving order:", err)
            alert("Payment done, but failed to save order. Check console.")
          }
        },
        prefill: {
          name: address.full_name,
          email: user.email,
          contact: address.phone,
        },
        theme: { color: "#2563eb" },
      }

      const rzp = new window.Razorpay(options)
      rzp.on("payment.failed", (response: any) => {
        console.error("Payment failed:", response.error)
        alert("❌ Payment failed. Check console.")
      })
      rzp.open()
    } catch (err: any) {
      console.error("Payment error:", err)
      alert("❌ Error during payment. Check console.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className="max-w-lg mx-auto p-6 shadow-xl bg-muted border rounded-2xl">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Confirm Your Payment</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-left">
          <p className="font-semibold">Amount: ₹{totalAmount / 100}</p>
          <p>{address.full_name}, {address.city}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Button onClick={handlePayment} className="w-full" disabled={loading}>
          {loading ? "Processing..." : "Pay Securely with Razorpay"}
        </Button>
      </CardContent>
    </Card>
  )
}
