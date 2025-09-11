'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface CategoryCardProps {
  title: string
  image: any
  description: string
  onClick?: () => void
}

const CategoryCard = ({ title, image, description, onClick }: CategoryCardProps) => {
  return (
    <motion.div 
      className="group relative h-64 sm:h-80 rounded-lg overflow-hidden cursor-pointer shadow-soft"
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Background Image */}
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-500 group-hover:scale-110"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/40 to-transparent group-hover:from-dark-brown/90 transition-all duration-300" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
        <motion.h3 
          className="font-playfair text-2xl font-bold mb-2"
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {title}
        </motion.h3>
        <motion.p 
          className="font-inter text-ivory/90 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 0 }}
          whileHover={{ opacity: 1 }}
        >
          {description}
        </motion.p>
      </div>
      
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </motion.div>
  )
}

export default CategoryCard