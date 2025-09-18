"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { User, Package, Heart, Settings, Crown } from "lucide-react"
import { supabase } from "@/lib/supabase"

interface Profile {
  id: string
  name: string
  email: string
  phone?: string
  role: string
  created_at: string
}

interface Product {
  id: string
  name: string
  description?: string
  price: number
  stock: number
  images?: { id: number; image_url: string }[]
}

interface OrderItem {
  id: number
  product: Product
  quantity: number
  price: number
}

interface Address {
  full_name: string
  address_line1: string
  address_line2?: string
  city: string
  state: string
  postal_code: string
  country: string
  phone: string
}

interface Order {
  id: string
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  total: number
  created_at: string
  order_items: {
    id: number
    quantity: number
    price: number
    products: Product & { product_images: { id: number; image_url: string }[] }
  }[]
  shipping_address: Address | null
}

export default function AccountPage() {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [editMode, setEditMode] = useState(false)
  const [name, setName] = useState("")
  const [phone, setPhone] = useState("")
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [defaultAddress, setDefaultAddress] = useState<Address | null>(null)

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      setLoading(true)
      const userId = localStorage.getItem("supabase_user_id")
      if (!userId) return setLoading(false)

      // Fetch profile
      const { data: profileData, error: profileError } = await supabase
        .from<Profile>("profiles")
        .select("*")
        .eq("id", userId)
        .single()
      if (profileError) console.error("Failed to fetch profile:", profileError)
      else setProfile(profileData)

      // Fetch default address
      const { data: addressData } = await supabase
        .from<Address>("addresses")
        .select("*")
        .eq("user_id", userId)
        .eq("is_default", true)
        .single()
      setDefaultAddress(addressData || null)

      // Fetch orders with items and product images
      const { data: ordersData, error: ordersError } = await supabase
        .from<Order>("orders")
        .select(`
          *,
          order_items (
            id,
            quantity,
            price,
            products (
              id,
              name,
              price,
              stock,
              product_images (id, image_url)
            )
          )
        `)
        .eq("user_id", userId)
        .order("created_at", { ascending: false })

      if (ordersError) console.error("Failed to fetch orders:", ordersError)
      else {
        const ordersWithAddress = (ordersData || []).map((order) => ({
          ...order,
          shipping_address: addressData || null
        }))
        setOrders(ordersWithAddress)
      }

      setLoading(false)
    }

    fetchProfileAndOrders()
  }, [])

  const handleUpdateProfile = async () => {
    if (!profile) return
    setLoading(true)
    const { error } = await supabase
      .from("profiles")
      .update({ name, phone })
      .eq("id", profile.id)

    if (error) console.error(error)
    else {
      setProfile({ ...profile, name, phone })
      setEditMode(false)
    }
    setLoading(false)
  }

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  if (!profile) return <div className="min-h-screen flex items-center justify-center">Profile not found</div>

  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          {/* Profile Header */}
          <div className="bg-card py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-6">
                <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-accent-foreground heading-serif">
                    {profile.name.split(" ").map(n => n[0]).join("")}
                  </span>
                </div>
                <div>
                  <h1 className="heading-serif text-4xl font-bold text-card-foreground mb-2">
                    Welcome back, {profile.name.split(" ")[0]}
                  </h1>
                  <p className="text-xl text-muted-foreground">
                    Distinguished Member since {new Date(profile.created_at).getFullYear()}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <Tabs defaultValue="profile" className="w-full">
              <TabsList className="grid w-full grid-cols-4 bg-card mb-8">
                <TabsTrigger value="profile" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <User className="mr-2 h-4 w-4" /> Profile
                </TabsTrigger>
                <TabsTrigger value="orders" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <Package className="mr-2 h-4 w-4" /> Orders
                </TabsTrigger>
                <TabsTrigger value="wishlist" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <Heart className="mr-2 h-4 w-4" /> Wishlist
                </TabsTrigger>
                <TabsTrigger value="settings" className="data-[state=active]:bg-accent data-[state=active]:text-accent-foreground">
                  <Settings className="mr-2 h-4 w-4" /> Settings
                </TabsTrigger>
              </TabsList>

              {/* Profile Tab */}
              <TabsContent value="profile">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2 bg-card rounded-2xl p-8 velvet-texture">
                    <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                      Member Profile
                    </h2>
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">Full Name</label>
                          {editMode ? (
                            <input
                              className="p-3 bg-background rounded border border-accent/20 text-foreground w-full"
                              value={name}
                              onChange={(e) => setName(e.target.value)}
                            />
                          ) : (
                            <div className="p-3 bg-background rounded border border-accent/20 text-foreground">{profile.name}</div>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-card-foreground mb-2">Phone Number</label>
                          {editMode ? (
                            <input
                              className="p-3 bg-background rounded border border-accent/20 text-foreground w-full"
                              value={phone}
                              onChange={(e) => setPhone(e.target.value)}
                            />
                          ) : (
                            <div className="p-3 bg-background rounded border border-accent/20 text-foreground">{profile.phone}</div>
                          )}
                        </div>
                      </div>

                      <Button
                        className="bg-accent text-accent-foreground hover:bg-accent/90"
                        onClick={() => (editMode ? handleUpdateProfile() : setEditMode(true))}
                      >
                        {editMode ? "Save Changes" : "Edit Profile"}
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div className="bg-card rounded-2xl p-6 velvet-texture">
                      <div className="flex items-center space-x-3 mb-4">
                        <Crown className="h-6 w-6 text-accent" />
                        <h3 className="heading-serif text-lg font-semibold text-card-foreground">Membership Status</h3>
                      </div>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Level</span>
                          <span className="text-accent font-semibold">Gold Member</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Orders</span>
                          <span className="text-card-foreground">{orders.length}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>

              {/* Orders Tab */}
              <TabsContent value="orders">
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                    Order History
                  </h2>

                  {orders.length === 0 ? (
                    <p className="text-muted-foreground">You have no orders yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {orders.map((order) => (
                        <div
                          key={order.id}
                          className="flex flex-col md:flex-row items-start md:items-center justify-between p-6 bg-background rounded-lg border border-accent/20"
                        >
                          <div className="flex-1 mb-3 md:mb-0">
                            <div className="flex items-center space-x-4 mb-2">
                              <h3 className="font-semibold text-foreground">Order #{order.id}</h3>
                              <span
                                className={`px-3 py-1 rounded-full text-xs font-medium ${order.status === "delivered"
                                  ? "bg-green-100 text-green-800"
                                  : order.status === "cancelled"
                                    ? "bg-red-100 text-red-800"
                                    : "bg-yellow-100 text-yellow-800"
                                  }`}
                              >
                                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                              </span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              Ordered on {new Date(order.created_at).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="text-right flex flex-col items-end">
                            <p className="text-lg font-semibold text-accent">${order.total.toFixed(2)}</p>
                            <Button
                              variant="outline"
                              size="sm"
                              className="mt-2 border-accent/20 text-foreground bg-transparent"
                              onClick={() => setSelectedOrder(order)}
                            >
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Modal for order details */}
            {selectedOrder && (
              <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                <div className="bg-card rounded-2xl p-6 max-w-3xl w-full relative">
                  <button
                    className="absolute top-4 right-4 text-foreground font-bold text-lg"
                    onClick={() => setSelectedOrder(null)}
                  >
                    ×
                  </button>
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4">Order Details #{selectedOrder.id}</h3>

                  <div className="space-y-4">
                    {selectedOrder.order_items?.map((item) => (
                      <div key={item.id} className="flex justify-between items-center border-b border-accent/20 py-2">
                        <div className="flex items-center space-x-4">
                          {item.products?.product_images?.[0]?.image_url && (
                            <img
                              src={item.products.product_images[0].image_url}
                              alt={item.products.name}
                              className="w-16 h-16 object-cover rounded"
                            />
                          )}
                          <div>
                            <p className="font-semibold text-foreground">{item.products?.name || "Product"}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                        </div>
                        <p className="text-accent font-semibold">${item.price.toFixed(2)}</p>
                      </div>
                    ))}
                  </div>

                  {selectedOrder.shipping_address && (
                    <div className="mt-6">
                      <h4 className="font-semibold text-card-foreground mb-2">Shipping Address</h4>
                      <p className="text-muted-foreground">
                        {selectedOrder.shipping_address.full_name}, {selectedOrder.shipping_address.address_line1}{selectedOrder.shipping_address.address_line2 ? ", " + selectedOrder.shipping_address.address_line2 : ""}, {selectedOrder.shipping_address.city}, {selectedOrder.shipping_address.state}, {selectedOrder.shipping_address.postal_code}, {selectedOrder.shipping_address.country}. <br />
                        Phone: {selectedOrder.shipping_address.phone}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            )}

          </div>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
