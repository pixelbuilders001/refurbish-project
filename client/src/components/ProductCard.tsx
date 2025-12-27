import { Link } from "wouter";
import { Product } from "@shared/schema";
import { motion } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { ShoppingCart, Star } from "lucide-react";

const ConditionBadge = ({ condition }: { condition: string }) => {
  const colors: Record<string, string> = {
    Excellent: "bg-emerald-100 text-emerald-700 border-emerald-200",
    Good: "bg-blue-100 text-blue-700 border-blue-200",
    Fair: "bg-amber-100 text-amber-700 border-amber-200",
  };

  return (
    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border uppercase tracking-wider ${colors[condition] || colors.Good}`}>
      {condition}
    </span>
  );
};

export function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white rounded-2xl border border-border shadow-sm hover:shadow-xl hover:border-primary/30 transition-all duration-300 flex flex-col h-full overflow-hidden"
    >
      {/* Image Container */}
      <Link href={`/product/${product.id}`} className="block relative aspect-[4/3] bg-secondary/30 overflow-hidden">
        {discount > 0 && (
          <div className="absolute top-3 right-3 z-10 bg-destructive text-destructive-foreground text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            -{discount}% OFF
          </div>
        )}
        <div className="absolute top-3 left-3 z-10">
          <ConditionBadge condition={product.condition} />
        </div>
        
        {/* Placeholder logic handles lack of real images gracefully */}
        <div className="w-full h-full flex items-center justify-center p-8 group-hover:scale-105 transition-transform duration-500 ease-out">
            <img 
                src={product.images[0] || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80"} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
            />
        </div>
      </Link>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <Link href={`/product/${product.id}`} className="block mb-2">
          <h3 className="font-display font-semibold text-lg leading-tight text-foreground group-hover:text-primary transition-colors line-clamp-2">
            {product.name}
          </h3>
        </Link>
        
        <div className="flex items-center gap-1 mb-4 text-sm text-muted-foreground">
            <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
            <span className="font-medium text-foreground">4.8</span>
            <span>(120 reviews)</span>
        </div>

        <div className="mt-auto flex items-end justify-between gap-4">
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-xl font-bold text-foreground">₹{product.price.toLocaleString()}</span>
          </div>
          
          <button
            onClick={() => addToCart(product)}
            className="p-2.5 rounded-xl bg-secondary text-foreground hover:bg-primary hover:text-primary-foreground active:scale-95 transition-all duration-200"
            aria-label="Add to cart"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
