import { Button } from './button';
import heroImage from '../../assets/hero-leather-workshop.jpg';

const HeroSection = () => {
  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-dark-brown/40" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="animate-fade-in">
          <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-bold text-ivory mb-6 tracking-tight">
            Aramis Leather
          </h1>
          <p className="font-inter text-xl sm:text-2xl text-ivory/90 mb-8 max-w-2xl mx-auto leading-relaxed">
            Premium Shoes, Bags, Belts & Custom Leatherwork
          </p>
          <p className="font-inter text-lg text-ivory/80 mb-12 max-w-xl mx-auto">
            Handcrafted with passion, designed for eternity. Discover our collection of luxury leather goods made by master artisans.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gold hover:bg-gold-muted text-dark-brown font-inter font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 hover:shadow-gold"
            >
              Explore Collection
            </Button>
            <Button 
              variant="outline" 
              size="lg"
              className="border-ivory text-ivory hover:bg-ivory hover:text-dark-brown font-inter font-semibold px-8 py-4 text-lg transition-all duration-300"
            >
              Custom Orders
            </Button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-ivory rounded-full flex justify-center">
            <div className="w-1 h-3 bg-ivory rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;