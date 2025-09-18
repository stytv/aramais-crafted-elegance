"use client"

import { TestimonialCard } from "@/components/testimonial-card"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const testimonials = [
  {
    quote:
      "The finest shoes I've ever owned. The craftsmanship is absolutely exceptional, and they've only gotten better with age.",
    author: "James Wellington",
    title: "Investment Banker",
    image: "/professional-gentleman-portrait.jpg",
  },
  {
    quote:
      "Aramis Leather understands what it means to dress like a gentleman. These shoes are an investment in style and quality.",
    author: "Charles Pemberton",
    title: "Art Collector",
    image: "/distinguished-older-gentleman-portrait.jpg",
  },
  {
    quote: "From the moment I put them on, I knew these were special. The attention to detail is remarkable.",
    author: "Alexander Rhodes",
    title: "Barrister",
    image: "/professional-man-suit-portrait.png",
  },
]

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonials.length) % testimonials.length)
  }

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-foreground mb-4">What Our Members Say</h2>
          <p className="text-xl text-muted-foreground">
            Testimonials from distinguished gentlemen who appreciate fine craftsmanship
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={index} className="w-full flex-shrink-0 px-4">
                  <TestimonialCard {...testimonial} />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="icon"
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-card/80 backdrop-blur-sm hover:bg-card text-accent"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-card/80 backdrop-blur-sm hover:bg-card text-accent"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 ${
                  index === currentIndex ? "bg-accent" : "bg-accent/30"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
