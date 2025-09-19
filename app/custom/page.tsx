"use client"

import { useEffect, useState } from "react"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Palette, Ruler, Star, Clock } from "lucide-react"
import { supabase } from "@/lib/supabase"

const leatherOptions = [
  { name: "Italian Calfskin", color: "#8B4513", description: "Premium smooth leather with natural grain" },
  { name: "French Patent", color: "#000000", description: "High-gloss finish for formal occasions" },
  { name: "English Suede", color: "#D2B48C", description: "Soft, velvety texture for casual elegance" },
  { name: "Cordovan Shell", color: "#722F37", description: "Rare horsehide leather, exceptionally durable" },
  { name: "Crocodile Embossed", color: "#2F4F2F", description: "Exotic texture with sophisticated appeal" },
  { name: "Vintage Distressed", color: "#A0522D", description: "Aged appearance with character marks" },
]

export default function CustomOrdersPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    shoeStyle: "",
    leatherType: "",
    size: "",
    width: "",
    specialRequests: "",
    budget: "",
  })
  const [selectedLeather, setSelectedLeather] = useState<string>("")
  const [shoeStyles, setShoeStyles] = useState<{ id: number; name: string }[]>([])

  useEffect(() => {
    const fetchShoeStyles = async () => {
      const { data, error } = await supabase.from("categories").select("id, name")
      if (error) console.error("Error fetching shoe styles:", error)
      else setShoeStyles(data || [])
    }

    fetchShoeStyles()
  }, [])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `
        *👞 Bespoke Shoe Request – Aramis Leather*

        *🧑 Name:* ${formData.name}
        *📧 Email:* ${formData.email}
        *📱 Phone:* ${formData.phone}

        *👟 Shoe Style:* ${formData.shoeStyle}
        *🪡 Leather Type:* ${formData.leatherType}
        *📏 Size:* ${formData.size} | *Width:* ${formData.width}
        *💰 Budget:* ${formData.budget}

        *✍️ Special Requests:*
        ${formData.specialRequests || "None"}

        _Thank you for choosing Aramis Leather – where craftsmanship meets elegance._,Our costumer care will get in touch with you shortly.
        `;

    const whatsappNumber = "916304898428"; // Your WhatsApp number
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank");
  };
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-card py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-5xl font-bold text-card-foreground mb-6">Bespoke Orders</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Create your perfect pair of shoes with our master craftsmen. Every detail tailored to your exact
                specifications and personal style.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Bespoke Process */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                    The Bespoke Process
                  </h2>

                  <div className="space-y-6">
                    {[
                      { step: 1, title: "Consultation", desc: "Personal meeting to discuss your style preferences, lifestyle, and specific requirements." },
                      { step: 2, title: "Measurement & Last Creation", desc: "Precise foot measurements and creation of your personal wooden last for perfect fit." },
                      { step: 3, title: "Design & Material Selection", desc: "Choose from premium leathers, colors, and design details to create your unique shoe." },
                      { step: 4, title: "Handcrafting", desc: "Master craftsmen create your shoes using traditional techniques, taking 6-8 weeks." },
                      { step: 5, title: "Final Fitting & Delivery", desc: "Final adjustments and presentation of your bespoke shoes with care instructions." }
                    ].map(item => (
                      <div key={item.step} className="flex items-start space-x-4">
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm">
                          {item.step}
                        </div>
                        <div>
                          <h3 className="font-semibold text-card-foreground mb-2">{item.title}</h3>
                          <p className="text-muted-foreground">{item.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leather Swatches */}
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                    Premium Leather Selection
                  </h3>

                  <div className="grid grid-cols-2 gap-4">
                    {leatherOptions.map((leather, index) => (
                      <div
                        key={index}
                        onClick={() => setSelectedLeather(leather.name)}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-colors ${selectedLeather === leather.name ? "border-accent bg-accent/10" : "border-accent/20"
                          }`}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <div
                            className="w-6 h-6 rounded-full border border-accent/20"
                            style={{ backgroundColor: leather.color }}
                          ></div>
                          <h4 className="font-medium text-card-foreground text-sm">{leather.name}</h4>
                        </div>
                        <p className="text-xs text-muted-foreground">{leather.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Order Form */}
              <div className="bg-card rounded-2xl p-8 velvet-texture">
                <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4">
                  Bespoke Request Form
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name" className="text-card-foreground">Full Name</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        className="bg-background border-accent/20 focus:border-accent text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-card-foreground">Email</Label>
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

                  <div>
                    <Label htmlFor="phone" className="text-card-foreground">Phone Number</Label>
                    <Input
                      id="phone"
                      required
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="shoeStyle" className="text-card-foreground">Preferred Shoe Style</Label>
                    <Select value={formData.shoeStyle} onValueChange={(value) => handleInputChange("shoeStyle", value)}>
                      <SelectTrigger className="bg-background border-accent/20 focus:border-accent text-foreground">
                        <SelectValue placeholder="Select a style" />
                      </SelectTrigger>
                      <SelectContent className="bg-card border-accent/20">
                        {shoeStyles.map((style) => (
                          <SelectItem key={style.id} value={style.name}>{style.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="size" className="text-card-foreground">Shoe Size (US)</Label>
                      <Input
                        id="size"
                        required
                        value={formData.size}
                        onChange={(e) => handleInputChange("size", e.target.value)}
                        className="bg-background border-accent/20 focus:border-accent text-foreground"
                      />
                    </div>
                    <div>
                      <Label htmlFor="width" className="text-card-foreground">Width</Label>
                      <Select value={formData.width} onValueChange={(value) => handleInputChange("width", value)}>
                        <SelectTrigger className="bg-background border-accent/20 focus:border-accent text-foreground">
                          <SelectValue placeholder="Select width" />
                        </SelectTrigger>
                        <SelectContent className="bg-card border-accent/20">
                          <SelectItem value="narrow">Narrow (B)</SelectItem>
                          <SelectItem value="medium">Medium (D)</SelectItem>
                          <SelectItem value="wide">Wide (E)</SelectItem>
                          <SelectItem value="extra-wide">Extra Wide (EE)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="budget" className="text-card-foreground">
                      Budget Range (USD)
                    </Label>
                    <Input
                      id="budget"
                      placeholder="e.g., 1500-3000"
                      value={formData.budget}
                      onChange={(e) => setFormData((prev) => ({ ...prev, budget: e.target.value }))}
                      className="bg-background border-accent/20 focus:border-accent text-foreground"
                    />
                  </div>

                  <div>
                    <Label htmlFor="specialRequests" className="text-card-foreground">Special Requests & Design Details</Label>
                    <Textarea
                      id="specialRequests"
                      rows={4}
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Describe any specific design elements, colors, or special requirements..."
                      className="bg-background border-accent/20 focus:border-accent text-foreground resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer py-3"
                  >
                    Submit Bespoke Request
                  </Button>
                </form>
              </div>
            </div>

            {/* Features */}
            <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="text-center">
                <Palette className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Unlimited Customization</h3>
                <p className="text-sm text-muted-foreground">Every detail crafted to your specifications</p>
              </div>
              <div className="text-center">
                <Ruler className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Perfect Fit Guarantee</h3>
                <p className="text-sm text-muted-foreground">Personal last created for your feet</p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">Master Craftsmanship</h3>
                <p className="text-sm text-muted-foreground">Handmade by skilled artisans</p>
              </div>
              <div className="text-center">
                <Clock className="h-12 w-12 text-accent mx-auto mb-4" />
                <h3 className="font-semibold text-foreground mb-2">6-8 Week Delivery</h3>
                <p className="text-sm text-muted-foreground">Meticulous attention to every detail</p>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        {/* <FloatingWhatsApp /> */}
      </div>
    </CartProvider>
  )
}
