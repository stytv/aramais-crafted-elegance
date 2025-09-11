interface CategoryCardProps {
  title: string;
  image: string;
  description: string;
  onClick?: () => void;
}

const CategoryCard = ({ title, image, description, onClick }: CategoryCardProps) => {
  return (
    <div 
      className="group relative h-64 sm:h-80 rounded-lg overflow-hidden cursor-pointer transition-transform duration-300 hover:scale-105 shadow-soft hover:shadow-luxury"
      onClick={onClick}
    >
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-110"
        style={{ backgroundImage: `url(${image})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-dark-brown/80 via-dark-brown/40 to-transparent group-hover:from-dark-brown/90 transition-all duration-300" />
      
      {/* Content */}
      <div className="absolute bottom-0 left-0 right-0 p-6 text-ivory">
        <h3 className="font-playfair text-2xl font-bold mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
          {title}
        </h3>
        <p className="font-inter text-ivory/90 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 delay-75">
          {description}
        </p>
      </div>
      
      {/* Gold accent line */}
      <div className="absolute bottom-0 left-0 h-1 bg-gold w-0 group-hover:w-full transition-all duration-500 ease-out" />
    </div>
  );
};

export default CategoryCard;