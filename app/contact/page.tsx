'use client'

import { motion } from 'framer-motion'
import Navigation from '@/components/ui/navigation'
import { Button } from '@/components/ui/button'
import { Mail, Phone, MapPin, Clock, Instagram, Facebook, Linkedin } from 'lucide-react'

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="pt-24 pb-12 px-4 sm:px-6 lg:px-8 bg-gradient-warm">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            className="font-playfair text-5xl font-bold text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Contact Us
          </motion.h1>
          <motion.p 
            className="font-inter text-lg text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We'd love to hear from you. Reach out for custom orders, questions about our products, or just to say hello.
          </motion.p>
        </div>
      </section>

      {/* Contact Form & Info */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Send us a Message
              </h2>
              
              <form className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      First Name
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac"
                      placeholder="John"
                    />
                  </div>
                  <div>
                    <label className="block font-inter text-sm font-medium text-foreground mb-2">
                      Last Name
                    </label>
                    <input 
                      type="text"
                      className="w-full px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac"
                      placeholder="Doe"
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block font-inter text-sm font-medium text-foreground mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label className="block font-inter text-sm font-medium text-foreground mb-2">
                    Subject
                  </label>
                  <input 
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac"
                    placeholder="How can we help you?"
                  />
                </div>
                
                <div>
                  <label className="block font-inter text-sm font-medium text-foreground mb-2">
                    Message
                  </label>
                  <textarea 
                    rows={6}
                    className="w-full px-4 py-3 rounded-lg border border-border bg-background font-inter focus:outline-none focus:ring-2 focus:ring-cognac resize-none"
                    placeholder="Tell us about your project or question..."
                  />
                </div>
                
                <Button 
                  size="lg"
                  className="w-full bg-cognac hover:bg-dark-brown text-ivory font-inter font-semibold py-4 transition-all duration-300"
                >
                  Send Message
                </Button>
              </form>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="font-playfair text-3xl font-bold text-foreground mb-8">
                Get in Touch
              </h2>
              
              <div className="space-y-8">
                {/* Contact Details */}
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cognac rounded-lg flex items-center justify-center">
                      <Phone className="h-6 w-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                        Phone
                      </h3>
                      <p className="font-inter text-muted-foreground">+1 (555) 123-4567</p>
                      <p className="font-inter text-sm text-muted-foreground">Mon-Fri 9AM-6PM EST</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cognac rounded-lg flex items-center justify-center">
                      <Mail className="h-6 w-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                        Email
                      </h3>
                      <p className="font-inter text-muted-foreground">hello@aramis-leather.com</p>
                      <p className="font-inter text-sm text-muted-foreground">We'll respond within 24 hours</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cognac rounded-lg flex items-center justify-center">
                      <MapPin className="h-6 w-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                        Workshop & Showroom
                      </h3>
                      <p className="font-inter text-muted-foreground">123 Craft Street</p>
                      <p className="font-inter text-muted-foreground">New York, NY 10001</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-cognac rounded-lg flex items-center justify-center">
                      <Clock className="h-6 w-6 text-ivory" />
                    </div>
                    <div>
                      <h3 className="font-playfair text-lg font-semibold text-foreground mb-1">
                        Workshop Hours
                      </h3>
                      <p className="font-inter text-muted-foreground">Monday - Friday: 9:00 AM - 6:00 PM</p>
                      <p className="font-inter text-muted-foreground">Saturday: 10:00 AM - 4:00 PM</p>
                      <p className="font-inter text-muted-foreground">Sunday: By appointment only</p>
                    </div>
                  </div>
                </div>

                {/* Social Media */}
                <div className="pt-6 border-t border-border">
                  <h3 className="font-playfair text-lg font-semibold text-foreground mb-4">
                    Follow Our Journey
                  </h3>
                  <div className="flex space-x-4">
                    <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold-muted transition-colors">
                      <Instagram className="h-5 w-5 text-dark-brown" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold-muted transition-colors">
                      <Facebook className="h-5 w-5 text-dark-brown" />
                    </a>
                    <a href="#" className="w-10 h-10 bg-gold rounded-lg flex items-center justify-center hover:bg-gold-muted transition-colors">
                      <Linkedin className="h-5 w-5 text-dark-brown" />
                    </a>
                  </div>
                </div>

                {/* Custom Orders CTA */}
                <div className="bg-beige p-6 rounded-lg">
                  <h3 className="font-playfair text-xl font-semibold text-foreground mb-3">
                    Custom Orders
                  </h3>
                  <p className="font-inter text-muted-foreground mb-4">
                    Looking for something unique? We specialize in custom leather goods tailored to your exact specifications.
                  </p>
                  <Button 
                    variant="outline"
                    className="border-cognac text-cognac hover:bg-cognac hover:text-ivory"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  )
}