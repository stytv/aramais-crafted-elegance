import { Award, Shield, Clock, Users } from "lucide-react"

const features = [
  {
    icon: Award,
    title: "Master Craftsmanship",
    description:
      "Each pair is meticulously handcrafted by skilled artisans using traditional techniques passed down through generations.",
  },
  {
    icon: Shield,
    title: "Premium Materials",
    description:
      "We source only the finest Italian leather and materials, ensuring exceptional quality and durability.",
  },
  {
    icon: Clock,
    title: "Timeless Design",
    description: "Our designs transcend fleeting trends, offering classic elegance that remains stylish for decades.",
  },
  {
    icon: Users,
    title: "Exclusive Service",
    description:
      "Experience personalized service worthy of a gentleman's club, with custom fitting and bespoke options.",
  },
]

export function WhyAramis() {
  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-foreground mb-4">The Aramis Difference</h2>
          <div className="w-24 h-1 bg-accent mx-auto mb-6"></div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            What sets us apart in the world of luxury footwear
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-full mb-6 group-hover:bg-accent/20 transition-colors duration-300">
                <feature.icon className="h-8 w-8 text-accent" />
              </div>
              <h3 className="heading-serif text-xl font-semibold text-foreground mb-4">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Club Rules Section */}
        <div className="mt-20 bg-card rounded-2xl p-12 velvet-texture">
          <h3 className="heading-serif text-3xl font-bold text-center text-accent mb-12">The Gentleman's Code</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-1 bg-accent mx-auto mb-4"></div>
              <h4 className="heading-serif text-lg font-semibold text-card-foreground mb-2">Quality Above All</h4>
              <p className="text-muted-foreground">Never compromise on materials or craftsmanship</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-1 bg-accent mx-auto mb-4"></div>
              <h4 className="heading-serif text-lg font-semibold text-card-foreground mb-2">Timeless Elegance</h4>
              <p className="text-muted-foreground">Style that transcends trends and seasons</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-1 bg-accent mx-auto mb-4"></div>
              <h4 className="heading-serif text-lg font-semibold text-card-foreground mb-2">Exclusive Service</h4>
              <p className="text-muted-foreground">Personalized attention for every gentleman</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
