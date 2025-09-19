// app/api/save-order/route.ts
import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// Create Supabase client using SERVICE ROLE key (server-only)
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,      // Your Supabase URL
  process.env.SUPABASE_SERVICE_ROLE_KEY!      // Secret key, never expose on frontend
)

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { user_id, address_id, payment_id, amount, cart } = body

    if (!cart || cart.length === 0) {
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 })
    }

    // 1️⃣ Insert order
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          user_id,
          total: amount,
          status: "processing",
          address_id,
          payment_id,
        },
      ])
      .select()
      .single()

    if (orderError || !order) {
      throw new Error(orderError?.message || "Failed to create order")
    }

    // 2️⃣ Insert order_items including size
    const orderItems = cart.map((item: any) => ({
      order_id: order.id,
      product_id: item.product_id,
      quantity: item.quantity,
      price: item.price,
      size: item.size || null, // store size, null if not provided
    }))

    const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

    if (itemsError) {
      throw new Error(itemsError.message)
    }

    // ✅ Return success
    return NextResponse.json({ success: true, order_id: order.id })
  } catch (err: any) {
    console.error("Save order failed:", err)
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
