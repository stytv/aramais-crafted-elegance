"use client"

import { useEffect, useState } from "react"
import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { supabase } from "@/lib/supabase"
import { useOrderStore } from "@/lib/order-store"

interface OrderItem {
  id: string
  product_id: string
  quantity: number
  price: number
  size?: string | null
  product: {
    name: string
    product_images?: { image_url: string }[]
  }
}

interface Order {
  id: string
  total: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

export function OrderConfirmation() {
  const orderId = useOrderStore((state) => state.orderId)
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!orderId) return
    const fetchOrder = async () => {
      setLoading(true)
      const { data, error } = await supabase
        .from("orders")
        .select(`
          id,
          total,
          status,
          created_at,
          order_items (
            id,
            quantity,
            price,
            size,
            product:product_id (
              name,
              product_images (
                image_url
              )
            )
          )
        `)
        .eq("id", orderId)
        .single()
      console.log("Fetched Order:", data, error)

      if (error) {
        console.error("Failed to fetch order:", error)
      } else {
        setOrder(data)
      }
      setLoading(false)
    }

    fetchOrder()
  }, [orderId])

  if (!orderId) return <p className="text-center py-16 text-red-500">No order found.</p>
  if (loading) return <p className="text-center py-16">Loading order details...</p>
  if (!order) return <p className="text-center py-16 text-red-500">Order not found.</p>

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-accent" />
        </div>
        <h1 className="heading-serif text-4xl font-bold text-foreground mb-4">Order Reserved for You</h1>
        <p className="text-xl text-muted-foreground">
          Your order has been confirmed and will be handcrafted with care.
        </p>
      </div>

      {/* Order Summary */}
      <div className="bg-card rounded-2xl p-8 velvet-texture mb-8">
        <div className="text-center mb-6">
          <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-2">Order #{order.id}</h2>
          <p className="text-muted-foreground">Placed on {new Date(order.created_at).toLocaleDateString()}</p>
          <p className="text-muted-foreground">Total: ₹{order.total}</p>
        </div>

        {/* Order Items */}
        <div className="space-y-4 mb-8">
          {order.order_items.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-muted/10 p-4 rounded-lg">
              {item.product?.product_images?.[0]?.image_url && (
                <img
                  src={item.product.product_images[0].image_url}
                  alt={item.product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div className="flex-1">
                <h3 className="font-semibold text-card-foreground">{item.product?.name}</h3>
                <p className="text-sm text-muted-foreground">
                  Size: {item.size || "N/A"} | Qty: {item.quantity} | ₹{item.price}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Shipping Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <Package className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Handcrafting</h3>
            <p className="text-sm text-muted-foreground">2-3 weeks</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <Truck className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Shipping</h3>
            <p className="text-sm text-muted-foreground">3-5 business days</p>
          </div>
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full mb-3">
              <CreditCard className="h-6 w-6 text-accent" />
            </div>
            <h3 className="font-semibold text-card-foreground mb-1">Payment</h3>
            <p className="text-sm text-muted-foreground">Confirmed</p>
          </div>
        </div>

        <div className="border-t border-accent/20 pt-6">
          <h3 className="heading-serif text-lg font-semibold text-card-foreground mb-4">What happens next?</h3>
          <ul className="space-y-3 text-muted-foreground">
            <li className="flex items-start">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>You'll receive an email confirmation with your order details</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Our team will begin processing your order</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>You'll get a shipment tracking notification</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/account">
          <Button className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">Track Your Order</Button>
        </Link>
        <Link href="/collections">
          <Button variant="outline" className="border-accent/20 text-foreground hover:border-accent bg-transparent">
            Continue Shopping
          </Button>
        </Link>
      </div>
    </div>
  )
}
