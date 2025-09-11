'use client'

import { motion } from 'framer-motion'

interface TestimonialCardProps {
  quote: string
  author: string
  position?: string
  rating?: number
}

const TestimonialCard = ({ quote, author, position, rating = 5 }: TestimonialCardProps) => {
  return (
    <motion.div 
      className="bg-card p-8 rounded-lg shadow-soft border border-border/50 max-w-md mx-auto h-full flex flex-col"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
    >
      {/* Rating Stars */}
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-gold' : 'text-muted'}`}
            fill="currentColor"
            viewBox="0 0 20 20"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </motion.svg>
        ))}
      </div>
      
      {/* Quote */}
      <blockquote className="font-inter text-foreground/90 text-lg leading-relaxed mb-6 italic flex-grow">
        "{quote}"
      </blockquote>
      
      {/* Author */}
      <div className="border-t border-border pt-4">
        <div className="font-playfair font-semibold text-foreground">
          {author}
        </div>
        {position && (
          <div className="font-inter text-sm text-muted-foreground mt-1">
            {position}
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default TestimonialCard