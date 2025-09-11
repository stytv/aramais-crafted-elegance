'use client'

import { motion } from 'framer-motion'
import { Button } from './button'
import heroImage from '@/assets/hero-leather-workshop.jpg'

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage.src})` }}
      >
        <div className="absolute inset-0 bg-dark-brown/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.h1 
            className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-ivory mb-6 tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Aramis Leather
          </motion.h1>
          
          <motion.p 
            className="font-inter text-xl sm:text-2xl text-ivory/90 mb-8 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            Premium Shoes, Bags, Belts & Custom Leatherwork
          </motion.p>
          
          <motion.p 
            className="font-inter text-lg text-ivory/80 mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            Handcrafted with passion, designed for eternity. Discover our collection of luxury leather goods made by master artisans.
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-gold hover:bg-gold-muted text-dark-brown font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 shadow-gold"
              >
                Explore Collection
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg"
                className="border-ivory text-ivory hover:bg-ivory hover:text-dark-brown font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
              >
                Custom Orders
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
        >
          <motion.div 
            className="w-6 h-10 border-2 border-ivory rounded-full flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ repeat: Infinity, duration: 2 }}
          >
            <div className="w-1 h-3 bg-ivory rounded-full mt-2 animate-pulse" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection