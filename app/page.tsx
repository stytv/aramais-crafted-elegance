'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/ui/navigation'
import HeroSection from '@/components/ui/hero-section'
import ProductCard from '@/components/ui/product-card'
import CategoryCard from '@/components/ui/category-card'
import TestimonialCard from '@/components/ui/testimonial-card'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Instagram, Facebook, Linkedin } from 'lucide-react'

// Import product images
import shoesImage from '@/assets/leather-shoes.jpg'
import bagImage from '@/assets/leather-bag.jpg'
import accessoriesImage from '@/assets/leather-accessories.jpg'

export default function HomePage() {
  const featuredProducts = [
    {
      id: 1,
      name: "Oxford Leather Shoes",
      price: "$299",
      image: shoesImage,
      description: "Handcrafted premium leather oxford shoes with traditional construction."
    },
    {
      id: 2,
      name: "Classic Leather Handbag", 
      price: "$459",
      image: bagImage,
      description: "Elegant cognac leather handbag with gold hardware and silk lining."
    },
    {
      id: 3,
      name: "Premium Belt & Wallet Set",
      price: "$189",
      image: accessoriesImage,
      description: "Matching leather belt and wallet crafted from finest Italian leather."
    },
  ]

  const categories = [
    {
      title: "Luxury Shoes",
      image: shoesImage,
      description: "Handcrafted footwear for the discerning gentleman"
    },
    {
      title: "Premium Bags",
      image: bagImage, 
      description: "Elegant leather bags and briefcases for every occasion"
    },
    {
      title: "Fine Accessories",
      image: accessoriesImage,
      description: "Belts, wallets, and accessories crafted to perfection"
    }
  ]

  const testimonials = [
    {
      quote: "The craftsmanship is exceptional. My leather briefcase has aged beautifully over the years.",
      author: "James Richardson",
      position: "Business Executive"
    },
    {
      quote: "Aramis Leather creates pieces that tell a story. The attention to detail is remarkable.", 
      author: "Sarah Mitchell",
      position: "Fashion Designer"
    },
    {
      quote: "I've never owned leather goods of such quality. Worth every penny.",
      author: "Michael Chen",
      position: "Architect"
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <HeroSection />

      {/* Featured Products Section */}
      <motion.section 
        id="shop" 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-warm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Featured Collection
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover our most coveted pieces, each handcrafted with precision and passion by our master artisans.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {featuredProducts.map((product, index) => (
              <motion.div 
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </div>

          <motion.div 
            className="text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <Button 
              size="lg"
              className="bg-cognac hover:bg-dark-brown text-ivory font-inter font-semibold px-8 py-4 transition-all duration-300 hover:scale-105"
            >
              View All Products
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* Shop by Category Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Shop by Category
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of luxury leather goods, each category representing decades of expertise.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <motion.div 
                key={category.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <CategoryCard {...category} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* About Section */}
      <motion.section 
        id="about" 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-warm"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
                Crafted with Passion
              </h2>
              <p className="font-inter text-lg text-muted-foreground mb-6 leading-relaxed">
                For over three decades, Aramis Leather has been synonymous with excellence in leather craftsmanship. 
                Our artisans combine traditional techniques with modern precision to create pieces that stand the test of time.
              </p>
              <p className="font-inter text-lg text-muted-foreground mb-8 leading-relaxed">
                Each piece tells a story of dedication, from the selection of the finest hides to the final polishing touches. 
                We believe in creating not just products, but heirlooms that improve with age.
              </p>
              <Button 
                variant="outline" 
                size="lg"
                className="font-inter font-semibold border-cognac text-cognac hover:bg-cognac hover:text-ivory transition-all duration-300"
              >
                Our Story
              </Button>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-square rounded-lg overflow-hidden shadow-luxury">
                <img 
                  src={shoesImage.src} 
                  alt="Artisan crafting leather"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-gold rounded-lg opacity-20" />
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Testimonials Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
              What Our Clients Say
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our valued customers have to say about their experience.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <TestimonialCard {...testimonial} />
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Newsletter Section */}
      <motion.section 
        className="py-20 px-4 sm:px-6 lg:px-8 bg-beige"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
              Stay Connected
            </h2>
            <p className="font-inter text-lg text-muted-foreground mb-8">
              Be the first to know about new collections, exclusive offers, and behind-the-scenes insights from our workshop.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac"
              />
              <Button 
                size="lg"
                className="bg-cognac hover:bg-dark-brown text-ivory font-inter font-semibold px-8 py-3 transition-all duration-300"
              >
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Contact & Footer */}
      <footer id="contact" className="py-16 px-4 sm:px-6 lg:px-8 bg-dark-brown text-ivory">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <h3 className="font-playfair text-3xl font-bold mb-4">Aramis Leather</h3>
              <p className="font-inter text-ivory/80 mb-6 leading-relaxed">
                Crafting luxury leather goods with passion and precision. Each piece tells a story of traditional craftsmanship 
                meets modern elegance.
              </p>
              <div className="flex space-x-4">
                <Instagram className="h-6 w-6 text-gold hover:text-gold-muted cursor-pointer transition-colors" />
                <Facebook className="h-6 w-6 text-gold hover:text-gold-muted cursor-pointer transition-colors" />
                <Linkedin className="h-6 w-6 text-gold hover:text-gold-muted cursor-pointer transition-colors" />
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-playfair text-xl font-semibold mb-4">Quick Links</h4>
              <ul className="font-inter space-y-3 text-ivory/80">
                <li><a href="#home" className="hover:text-gold transition-colors">Home</a></li>
                <li><a href="#shop" className="hover:text-gold transition-colors">Shop</a></li>
                <li><a href="#about" className="hover:text-gold transition-colors">About</a></li>
                <li><a href="#contact" className="hover:text-gold transition-colors">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="font-playfair text-xl font-semibold mb-4">Contact Us</h4>
              <ul className="font-inter space-y-3 text-ivory/80">
                <li className="flex items-center">
                  <Phone className="h-4 w-4 mr-3 text-gold" />
                  +1 (555) 123-4567
                </li>
                <li className="flex items-center">
                  <Mail className="h-4 w-4 mr-3 text-gold" />
                  hello@aramis-leather.com
                </li>
                <li className="flex items-center">
                  <MapPin className="h-4 w-4 mr-3 text-gold" />
                  123 Craft Street, NY 10001
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-cognac/30 pt-8 text-center">
            <p className="font-inter text-ivory/60">
              © 2024 Aramis Leather. All rights reserved. Handcrafted with ❤️
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}