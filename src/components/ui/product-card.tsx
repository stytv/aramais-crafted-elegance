import { Button } from './button';

interface ProductCardProps {
  image: string;
  name: string;
  price: string;
  description?: string;
  onViewDetails?: () => void;
}

const ProductCard = ({ image, name, price, description, onViewDetails }: ProductCardProps) => {
  return (
    <div className="group bg-card rounded-lg shadow-soft overflow-hidden transition-all duration-300 hover:shadow-luxury hover:-translate-y-2">
      {/* Image */}
      <div className="aspect-square overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      
      {/* Content */}
      <div className="p-6">
        <h3 className="font-playfair text-xl font-semibold text-foreground mb-2 group-hover:text-cognac transition-colors duration-200">
          {name}
        </h3>
        
        {description && (
          <p className="font-inter text-sm text-muted-foreground mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <span className="font-inter text-lg font-bold text-cognac">
            {price}
          </span>
          
          <Button 
            variant="outline" 
            size="sm"
            onClick={onViewDetails}
            className="font-inter font-medium hover:bg-cognac hover:text-ivory transition-all duration-200"
          >
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;