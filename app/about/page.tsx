'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/ui/navigation'
import { Award, Users, Clock, Heart } from 'lucide-react'
import heroImage from '@/assets/hero-leather-workshop.jpg'

export default function AboutPage() {
  const values = [
    {
      icon: <Award className="h-8 w-8" />,
      title: "Quality Craftsmanship",
      description: "Every piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Customer Dedication", 
      description: "We build lasting relationships with our clients, ensuring each piece meets their exact needs and expectations."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Timeless Design",
      description: "Our designs transcend trends, creating pieces that remain elegant and relevant for decades to come."
    },
    {
      icon: <Heart className="h-8 w-8" />,
      title: "Passionate Creation",
      description: "Every stitch, every cut, every finish is done with genuine passion for the art of leather crafting."
    }
  ]

  const timeline = [
    { year: "1990", event: "Founded by master craftsman Antonio Aramis in Florence, Italy" },
    { year: "1995", event: "Opened first workshop in New York, bringing Italian craftsmanship to America" },
    { year: "2000", event: "Expanded into luxury handbags and accessories" },
    { year: "2010", event: "Launched custom leather goods service" },
    { year: "2020", event: "30th anniversary, now serving discerning clients worldwide" }
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage.src})` }}
        >
          <div className="absolute inset-0 bg-dark-brown/60" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <motion.h1 
            className="font-playfair text-5xl sm:text-6xl font-bold text-ivory mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Our Story
          </motion.h1>
          <motion.p 
            className="font-inter text-xl text-ivory/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Three decades of passion, precision, and uncompromising dedication to the art of leather craftsmanship.
          </motion.p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
                Where Tradition Meets Innovation
              </h2>
              <p className="font-inter text-lg text-muted-foreground mb-6 leading-relaxed">
                Founded in 1990 by master craftsman Antonio Aramis, our company began as a small workshop in Florence, 
                where Antonio learned the ancient art of leather working from Italian masters who had perfected their 
                craft over centuries.
              </p>
              <p className="font-inter text-lg text-muted-foreground mb-6 leading-relaxed">
                What started as a passion for creating beautiful, functional leather goods has evolved into a legacy 
                brand known worldwide for its uncompromising quality and timeless designs. Today, we continue Antonio's 
                vision while embracing modern techniques that enhance, never compromise, our traditional methods.
              </p>
              <p className="font-inter text-lg text-muted-foreground leading-relaxed">
                Every piece that leaves our workshop carries with it the soul of true craftsmanship - a commitment 
                to excellence that you can feel, see, and experience in every detail.
              </p>
            </motion.div>
            
            <motion.div 
              className="relative"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="aspect-4/3 rounded-lg overflow-hidden shadow-luxury">
                <img 
                  src={heroImage.src} 
                  alt="Master craftsman at work"
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Our Values
            </h2>
            <p className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide every decision we make and every piece we create.
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <motion.div 
                key={value.title}
                className="text-center p-6 bg-card rounded-lg shadow-soft"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
              >
                <div className="flex justify-center mb-4 text-cognac">
                  {value.icon}
                </div>
                <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                  {value.title}
                </h3>
                <p className="font-inter text-muted-foreground">
                  {value.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-playfair text-4xl font-bold text-foreground mb-6">
              Our Journey
            </h2>
            <p className="font-inter text-lg text-muted-foreground">
              Key milestones in our three-decade journey of craftsmanship excellence.
            </p>
          </motion.div>
          
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <motion.div 
                key={item.year}
                className="flex flex-col md:flex-row gap-6 items-center md:items-start"
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="flex-shrink-0">
                  <div className="w-20 h-20 bg-cognac rounded-full flex items-center justify-center">
                    <span className="font-playfair text-lg font-bold text-ivory">
                      {item.year}
                    </span>
                  </div>
                </div>
                <div className="flex-1 text-center md:text-left">
                  <p className="font-inter text-lg text-foreground leading-relaxed">
                    {item.event}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}