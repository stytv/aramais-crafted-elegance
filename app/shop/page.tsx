'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Navigation from '@/components/ui/navigation'
import ProductCard from '@/components/ui/product-card'
import { Button } from '@/components/ui/button'
import { Filter, Search } from 'lucide-react'

// Import product images
import shoesImage from '@/assets/leather-shoes.jpg'
import bagImage from '@/assets/leather-bag.jpg'
import accessoriesImage from '@/assets/leather-accessories.jpg'

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  
  const products = [
    { id: 1, name: "Oxford Leather Shoes", price: "$299", category: "shoes", image: shoesImage, description: "Handcrafted premium leather oxford shoes" },
    { id: 2, name: "Classic Leather Handbag", price: "$459", category: "bags", image: bagImage, description: "Elegant cognac leather handbag with gold hardware" },
    { id: 3, name: "Premium Belt & Wallet Set", price: "$189", category: "accessories", image: accessoriesImage, description: "Matching leather accessories set" },
    { id: 4, name: "Leather Derby Shoes", price: "$329", category: "shoes", image: shoesImage, description: "Sophisticated derby shoes in dark brown" },
    { id: 5, name: "Executive Briefcase", price: "$649", category: "bags", image: bagImage, description: "Professional leather briefcase for executives" },
    { id: 6, name: "Luxury Leather Wallet", price: "$89", category: "accessories", image: accessoriesImage, description: "Slim profile wallet in premium leather" },
  ]

  const categories = ['all', 'shoes', 'bags', 'accessories']
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1 
            className="font-playfair text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Our Collection
          </motion.h1>
          <motion.p 
            className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Discover our complete range of luxury leather goods, each piece crafted with uncompromising attention to detail.
          </motion.p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 px-4 sm:px-6 lg:px-8 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="capitalize font-inter"
                >
                  {category === 'all' ? 'All Products' : category}
                </Button>
              ))}
            </div>
            
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button variant="outline" size="sm">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
            layout
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                layout
                whileHover={{ y: -5 }}
              >
                <ProductCard {...product} />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  )
}