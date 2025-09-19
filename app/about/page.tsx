import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FloatingWhatsApp } from "@/components/floating-whatsapp"
import { CartProvider } from "@/lib/cart-context"
import Image from "next/image"
import { Award, Users, Globe, Clock } from "lucide-react"

export default function AboutPage() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="pt-16">
          {/* Hero Section */}
          <div className="bg-card py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="heading-serif text-5xl font-bold text-card-foreground mb-6">Our Heritage</h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                For over five decades, Aramis Leather has been crafting exceptional footwear that embodies the timeless
                elegance and refined sophistication of the modern aristocrat.
              </p>
            </div>
          </div>

          {/* Timeline Section */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="heading-serif text-4xl font-bold text-center text-foreground mb-16">Our Journey</h2>

              <div className="space-y-16">
                {/* Timeline Item 1 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="bg-card rounded-2xl p-8 velvet-texture">
                    <div className="text-accent text-6xl heading-serif font-bold mb-4">1970</div>
                    <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">The Beginning</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Founded by master craftsman Giovanni Aramis in a small workshop in Florence, Italy. With a vision
                      to create shoes worthy of nobility, he began with just three apprentices and a commitment to
                      perfection.
                    </p>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src="/vintage-leather-workshop-1970s-craftsman-tools.jpg"
                      alt="Aramis Workshop 1970"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>

                {/* Timeline Item 2 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="relative aspect-video rounded-2xl overflow-hidden lg:order-1">
                    <Image
                      src="/luxury-leather-crafting-process-hands-working.jpg"
                      alt="Master Craftsmanship"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="bg-card rounded-2xl p-8 velvet-texture lg:order-2">
                    <div className="text-accent text-6xl heading-serif font-bold mb-4">1985</div>
                    <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">
                      International Recognition
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Aramis Leather gained international acclaim when our Oxford shoes were chosen for the wardrobes of
                      European diplomats. This recognition established our reputation for creating footwear fit for the
                      world's elite.
                    </p>
                  </div>
                </div>

                {/* Timeline Item 3 */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="bg-card rounded-2xl p-8 velvet-texture">
                    <div className="text-accent text-6xl heading-serif font-bold mb-4">2024</div>
                    <h3 className="heading-serif text-2xl font-semibold text-card-foreground mb-4">Modern Legacy</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      Today, we continue Giovanni's legacy with the same dedication to craftsmanship, now serving
                      discerning gentlemen worldwide who appreciate the finest in handcrafted leather footwear.
                    </p>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden">
                    <Image
                      src="/modern-luxury-shoe-display-elegant-lighting.jpg"
                      alt="Modern Aramis Collection"
                      fill
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Founder Portrait */}
          <section className="py-20 bg-card">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="relative w-48 h-48 mx-auto mb-8 rounded-full overflow-hidden border-4 border-accent">
                <Image
                  src="/distinguished-italian-craftsman-portrait-vintage.jpg"
                  alt="Giovanni Aramis, Founder"
                  fill
                  className="object-cover sepia"
                />
              </div>
              <h2 className="heading-serif text-3xl font-bold text-card-foreground mb-4">Giovanni Aramis</h2>
              <p className="text-xl text-accent mb-6">Founder & Master Craftsman (1932-2018)</p>
              <blockquote className="text-lg text-muted-foreground italic leading-relaxed max-w-2xl mx-auto">
                "A gentleman's shoes are the foundation of his character. They must be crafted not just to last a
                lifetime, but to tell the story of a life well-lived."
              </blockquote>
            </div>
          </section>

          {/* Values Section */}
          <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="heading-serif text-4xl font-bold text-center text-foreground mb-16">Our Values</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center bg-card rounded-2xl p-8 velvet-texture">
                  <Award className="h-12 w-12 text-accent mx-auto mb-6" />
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4">Excellence</h3>
                  <p className="text-muted-foreground">
                    Every pair meets the highest standards of quality and craftsmanship.
                  </p>
                </div>

                <div className="text-center bg-card rounded-2xl p-8 velvet-texture">
                  <Clock className="h-12 w-12 text-accent mx-auto mb-6" />
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4">Tradition</h3>
                  <p className="text-muted-foreground">
                    Time-honored techniques passed down through generations of master craftsmen.
                  </p>
                </div>

                <div className="text-center bg-card rounded-2xl p-8 velvet-texture">
                  <Users className="h-12 w-12 text-accent mx-auto mb-6" />
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4">Service</h3>
                  <p className="text-muted-foreground">
                    Personalized attention and care for every distinguished customer.
                  </p>
                </div>

                <div className="text-center bg-card rounded-2xl p-8 velvet-texture">
                  <Globe className="h-12 w-12 text-accent mx-auto mb-6" />
                  <h3 className="heading-serif text-xl font-semibold text-card-foreground mb-4">Legacy</h3>
                  <p className="text-muted-foreground">
                    Creating shoes that become treasured heirlooms for future generations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </CartProvider>
  )
}
