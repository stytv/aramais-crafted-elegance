"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/testimonial-card";
import { supabase } from "@/lib/supabase";

export function Testimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    async function fetchRandomReviews() {
      // Join reviews → products → product_images → profiles
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          comment,
          rating,
          created_at,
          profiles:user_id (
            name
          ),
          products:product_id (
            name,
            product_images (
              image_url
            )
          )
        `)
        .limit(10);
        console.log("Fetched reviews:", data);

      if (error) {
        console.error("Error fetching reviews:", error);
        return;
      }

      // Format testimonials
      const formatted = data.map((item: any) => ({
        quote: item.comment,
        author: item.profiles?.name,
        title: "Customer", // placeholder
        image: item.products?.product_images?.[0]?.image_url,
      }));

      // Shuffle for randomness
      setTestimonials(shuffleArray(formatted));
    }

    // Shuffle helper
    function shuffleArray(array: any[]) {
      return array.sort(() => Math.random() - 0.5);
    }

    fetchRandomReviews();
  }, []);

  // Auto-slide carousel
  useEffect(() => {
    if (!testimonials.length) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [testimonials]);

  const goToPrevious = () =>
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  const goToNext = () => setCurrentIndex((prev) => (prev + 1) % testimonials.length);

  if (!testimonials.length)
    return <p className="text-center py-20 text-muted-foreground">No reviews yet.</p>;

  return (
    <section className="py-20 bg-muted">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="heading-serif text-4xl font-bold text-foreground mb-4">
            What Our Customers says
          </h2>
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
  );
}
