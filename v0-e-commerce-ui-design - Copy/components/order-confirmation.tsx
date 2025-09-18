import { CheckCircle, Package, Truck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

interface OrderConfirmationProps {
  orderId: string
}

export function OrderConfirmation({ orderId }: OrderConfirmationProps) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-accent/10 rounded-full mb-6">
          <CheckCircle className="h-10 w-10 text-accent" />
        </div>
        <h1 className="heading-serif text-4xl font-bold text-foreground mb-4">Order Reserved for You</h1>
        <p className="text-xl text-muted-foreground">
          Your exclusive order has been confirmed and will be handcrafted with the utmost care.
        </p>
      </div>

      {/* Order Details */}
      <div className="bg-card rounded-2xl p-8 velvet-texture mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center">
            <div className="text-accent text-2xl heading-serif">A</div>
          </div>
        </div>

        <div className="text-center mb-8">
          <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-2">Order #{orderId}</h2>
          <p className="text-muted-foreground">Placed on {new Date().toLocaleDateString()}</p>
        </div>

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
              <span>Our master craftsmen will begin handcrafting your shoes</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>We'll notify you when your order ships with tracking information</span>
            </li>
            <li className="flex items-start">
              <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <span>Your exclusive shoes will arrive with a complimentary care kit</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Action Buttons */}
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
