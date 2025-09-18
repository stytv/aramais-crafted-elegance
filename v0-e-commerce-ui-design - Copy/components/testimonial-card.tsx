import Image from "next/image"

interface TestimonialCardProps {
  quote: string
  author: string
  title: string
  image: string
}

export function TestimonialCard({ quote, author, title, image }: TestimonialCardProps) {
  return (
    <div className="bg-card p-8 rounded-lg velvet-texture theme-transition">
      <div className="flex items-start space-x-4">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-accent">
          <Image
            src={
              image ||
              "/placeholder.svg?height=64&width=64&query=distinguished gentleman portrait vintage sepia leather craftsmanship"
            }
            alt={author}
            fill
            className="object-cover sepia transition-all duration-300"
          />
        </div>
        <div className="flex-1">
          <blockquote className="text-card-foreground italic mb-4 heading-serif text-lg">"{quote}"</blockquote>
          <div>
            <p className="font-semibold text-accent">{author}</p>
            <p className="text-sm text-muted-foreground">{title}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
