import Razorpay from "razorpay"

export async function POST(req: Request) {
  const { amount } = await req.json()

  const instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY!,       // <-- remove NEXT_PUBLIC_
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })
  console.log("Razorpay instance created")

  const order = await instance.orders.create({
    amount,       // in paise
    currency: "INR",
    receipt: "receipt_" + Date.now(),
  })

  return new Response(JSON.stringify(order), { status: 200 })
}
