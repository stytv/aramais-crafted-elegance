import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import productsData from "@/lib/products.json"

export function FeaturedProducts() {
  const featuredProducts = productsData.products.filter((product) => product.featured)

  return (
    <section className="py-20 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-card-foreground mb-4">Exclusive Collections</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover our most coveted pieces, each representing the pinnacle of leather craftsmanship and timeless
            design.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              name={product.name}
              price={product.price}
              image={product.images[0]}
              featured={product.featured}
              className="velvet-texture"
            />
          ))}
        </div>

        <div className="text-center">
          <Link href="/collections">
            <Button size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90 gold-shimmer">
              View All Collections
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
