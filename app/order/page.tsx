"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft } from "lucide-react"

interface OrderItem {
  id: string | number
  quantity: number
  price: number
  size: string | number
  product: {
    id: string
    name: string
    product_images: { image_url: string }[]
  }
}

interface Order {
  id: string
  total: number
  status: string
  created_at: string
  order_items: OrderItem[]
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
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
              id,
              name,
              product_images (
                image_url
              )
            )
          )
        `)

      if (error) {
        console.error("Error fetching orders:", error.message)
      } else {
      setOrders(data.map((order: any) => ({
        id: order.id,
        total: order.total,
        status: order.status,
        created_at: order.created_at,
        order_items: order.order_items.map((item: any) => ({
          id: item.id,
          product_id: item.product_id || item.product?.id,
          quantity: item.quantity,
          price: item.price,
          size: item.size,
          product: {
            id: item.product?.id || item.product_id,
            name: item.product?.name || "Unknown Product",
            product_images: item.product?.product_images || []
          }
        }))
      })) || [])
      }
      setLoading(false)
    }

    fetchOrders()
  }, [])

  if (loading) return <p className="p-6 text-center">Loading orders...</p>
  if (orders.length === 0) return <p className="p-6 text-center">No orders found.</p>

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Back to Home */}
      <div className="mb-6">
        <Link
          href="/"
          className="inline-flex items-center text-accent font-medium hover:underline"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Go to Home
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-8">My Orders</h1>

      <div className="space-y-12">
        {orders.map((order) => (
          <div
            key={order.id}
            className="border rounded-xl p-6 shadow-sm bg-card theme-transition"
          >
            {/* Order Header */}
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-xl font-semibold">
                  Order #{order.id.slice(0, 6).toUpperCase()}
                </h2>
                <p className="text-sm text-muted-foreground">
                  Placed on{" "}
                  {new Date(order.created_at).toLocaleString("en-IN", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Badge
                  className={
                    order.status === "delivered"
                      ? "bg-green-500"
                      : order.status === "processing"
                      ? "bg-yellow-500"
                      : "bg-blue-500"
                  }
                >
                  {order.status}
                </Badge>
                <span className="font-bold text-lg">₹{order.total}</span>
              </div>
            </div>

            {/* Order Items */}
            <div className="space-y-6">
              {order.order_items.map((item) => (
                <Link
                  key={item.id}
                  href={`/product/${item.product.id}`}
                  className="flex gap-6 items-center border-b pb-4 last:border-none hover:bg-muted/40 rounded-lg p-2 transition-colors"
                >
                  {/* Product Image */}
                  <div className="relative w-24 h-24 rounded-md overflow-hidden bg-muted">
                    <Image
                      src={
                        item.product.product_images?.[0]?.image_url ||
                        "/placeholder.svg?height=150&width=150"
                      }
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg">{item.product.name}</h3>
                    <p className="text-muted-foreground text-sm">
                      Size: {item.size} | Quantity: {item.quantity}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="text-right">
                    <p className="text-lg font-bold">₹{item.price}</p>
                    <p className="text-sm text-muted-foreground">
                      Subtotal: ₹{item.price * item.quantity}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
