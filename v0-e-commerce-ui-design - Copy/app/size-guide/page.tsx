import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import { Ruler, Bolt as Foot, Info } from "lucide-react"

const sizeChart = [
  { us: "7", uk: "6", eu: "40", cm: "25.0" },
  { us: "7.5", uk: "6.5", eu: "40.5", cm: "25.4" },
  { us: "8", uk: "7", eu: "41", cm: "25.7" },
  { us: "8.5", uk: "7.5", eu: "42", cm: "26.0" },
  { us: "9", uk: "8", eu: "42.5", cm: "26.4" },
  { us: "9.5", uk: "8.5", eu: "43", cm: "26.7" },
  { us: "10", uk: "9", eu: "44", cm: "27.0" },
  { us: "10.5", uk: "9.5", eu: "44.5", cm: "27.4" },
  { us: "11", uk: "10", eu: "45", cm: "27.7" },
  { us: "11.5", uk: "10.5", eu: "45.5", cm: "28.0" },
  { us: "12", uk: "11", eu: "46", cm: "28.4" },
]

export default function SizeGuidePage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-card py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-5xl font-bold text-card-foreground mb-6">Size Guide</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                Ensure the perfect fit for your handcrafted shoes with our comprehensive sizing guide and measurement
                instructions.
              </p>
            </div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            {/* Size Chart */}
            <div className="bg-card rounded-2xl p-8 velvet-texture mb-12">
              <h2 className="heading-serif text-2xl font-semibold text-card-foreground mb-6 text-center border-b border-accent pb-4">
                International Size Chart
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-accent/20">
                      <th className="text-left py-3 px-4 font-semibold text-card-foreground">US Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-card-foreground">UK Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-card-foreground">EU Size</th>
                      <th className="text-left py-3 px-4 font-semibold text-card-foreground">Length (cm)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sizeChart.map((size, index) => (
                      <tr key={index} className="border-b border-accent/10 hover:bg-accent/5 transition-colors">
                        <td className="py-3 px-4 text-card-foreground font-medium">{size.us}</td>
                        <td className="py-3 px-4 text-muted-foreground">{size.uk}</td>
                        <td className="py-3 px-4 text-muted-foreground">{size.eu}</td>
                        <td className="py-3 px-4 text-muted-foreground">{size.cm}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Measurement Instructions */}
              <div className="bg-card rounded-2xl p-8 velvet-texture">
                <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4 flex items-center">
                  <Ruler className="mr-2 h-5 w-5" />
                  How to Measure Your Feet
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
                      1
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Prepare Your Materials</h4>
                      <p className="text-muted-foreground">
                        You'll need a ruler or measuring tape, a piece of paper, and a pen or pencil.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
                      2
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Trace Your Foot</h4>
                      <p className="text-muted-foreground">
                        Place the paper on a hard floor. Stand on it with your full weight and trace around your foot.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
                      3
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Measure Length</h4>
                      <p className="text-muted-foreground">
                        Measure from the heel to the longest toe. This is your foot length in centimeters.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
                      4
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Measure Width</h4>
                      <p className="text-muted-foreground">
                        Measure the widest part of your foot across the ball area for width fitting.
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center text-accent-foreground font-semibold text-sm flex-shrink-0">
                      5
                    </div>
                    <div>
                      <h4 className="font-semibold text-card-foreground mb-2">Repeat for Both Feet</h4>
                      <p className="text-muted-foreground">
                        Measure both feet as they may differ slightly. Use the larger measurement for sizing.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Fitting Tips */}
              <div className="space-y-8">
                <div className="bg-card rounded-2xl p-8 velvet-texture">
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-6 border-b border-accent pb-4 flex items-center">
                    <Foot className="mr-2 h-5 w-5" />
                    Perfect Fit Guidelines
                  </h3>

                  <ul className="space-y-4 text-muted-foreground">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Measure your feet in the evening when they are at their largest</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Wear the type of socks you plan to wear with the shoes</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Allow 0.5-1cm of space between your longest toe and the shoe front</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>Consider that leather shoes will stretch slightly with wear</span>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-accent rounded-full mt-2 mr-3 flex-shrink-0"></div>
                      <span>If between sizes, choose the larger size for comfort</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-muted/50 rounded-2xl p-6 border border-accent/20">
                  <div className="flex items-start space-x-3">
                    <Info className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Need Personal Assistance?</h4>
                      <p className="text-muted-foreground text-sm mb-4">
                        Our master fitters are available for personal consultations to ensure the perfect fit for your
                        handcrafted shoes.
                      </p>
                      <div className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          <strong>Phone:</strong> +1 (555) 123-4567
                        </p>
                        <p className="text-sm text-muted-foreground">
                          <strong>Email:</strong> fitting@aramisleather.com
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Width Guide */}
                <div className="bg-card rounded-2xl p-6 velvet-texture">
                  <h4 className="font-semibold text-card-foreground mb-4">Width Fitting Guide</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Narrow (B)</span>
                      <span className="text-card-foreground">8.5-9.0 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Medium (D)</span>
                      <span className="text-card-foreground">9.0-9.5 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Wide (E)</span>
                      <span className="text-card-foreground">9.5-10.0 cm</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Extra Wide (EE)</span>
                      <span className="text-card-foreground">10.0+ cm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
