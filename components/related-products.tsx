import { ProductCard } from "@/components/product-card"

interface Product {
  id: string
  name: string
  price: number
  images: string[]
  featured?: boolean
}

interface RelatedProductsProps {
  products: Product[]
}

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) return null

  return (
    <section className="py-16 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="heading-serif text-3xl font-bold text-center text-card-foreground mb-12">You May Also Like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
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
      </div>
    </section>
  )
}
