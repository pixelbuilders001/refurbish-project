import { useParams } from "wouter";
import { useProduct } from "@/hooks/use-products";
import { useCart } from "@/context/CartContext";
import { useState } from "react";
import { motion } from "framer-motion";
import { Star, ShieldCheck, Battery, Cpu, Check, ShoppingCart, Truck } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const { data: product, isLoading } = useProduct(Number(id));
  const { addToCart } = useCart();
  const [activeImage, setActiveImage] = useState(0);

  if (isLoading || !product) {
    return <div className="min-h-screen flex items-center justify-center"><div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" /></div>;
  }

  // Ensure images array has content
  const images = product.images.length > 0 ? product.images : [
    "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
    "https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=800&q=80"
  ];

  const specs = product.specs as Record<string, string>;

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="container-width py-8">
        {/* Breadcrumb - simple text */}
        <div className="text-sm text-muted-foreground mb-8">
          Home / {product.category} / <span className="text-foreground font-medium">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Gallery */}
          <div className="space-y-4">
            <div className="aspect-[4/3] bg-secondary/30 rounded-3xl overflow-hidden flex items-center justify-center p-8 border border-border">
              <motion.img 
                key={activeImage}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                src={images[activeImage]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply"
              />
            </div>
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`aspect-square rounded-xl border-2 overflow-hidden bg-secondary/10 ${activeImage === idx ? "border-primary" : "border-transparent hover:border-border"}`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-bold uppercase tracking-wide">
                {product.condition} Condition
              </span>
              <div className="flex items-center text-amber-400 text-sm font-medium">
                <Star className="w-4 h-4 fill-current mr-1" />
                4.8 (120 Verified)
              </div>
            </div>

            <h1 className="text-4xl font-display font-bold mb-4">{product.name}</h1>
            
            <div className="flex items-baseline gap-4 mb-8">
              <span className="text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              <span className="text-lg text-muted-foreground line-through">₹{product.originalPrice.toLocaleString()}</span>
              <span className="text-sm font-medium text-destructive">Save {Math.round((1 - product.price/product.originalPrice)*100)}%</span>
            </div>

            <div className="p-6 rounded-2xl bg-secondary/30 border border-border mb-8">
              <h3 className="font-bold mb-4 flex items-center gap-2">
                <Battery className="w-5 h-5" /> Condition Report (Score: {product.conditionScore}/100)
              </h3>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                <div 
                  className="bg-gradient-to-r from-primary to-emerald-400 h-2.5 rounded-full" 
                  style={{ width: `${product.conditionScore}%` }}
                ></div>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This device has passed our rigorous 32-point quality check. 
                Screen is scratch-free. Battery health is above 85%. 
                Fully functional and sanitized.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {Object.entries(specs).map(([key, val]) => (
                <div key={key} className="flex flex-col p-4 rounded-xl border border-border bg-white">
                  <span className="text-xs text-muted-foreground uppercase">{key}</span>
                  <span className="font-semibold">{val}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={() => addToCart(product)}
                className="flex-1 btn-primary h-14 text-lg gap-2"
              >
                <ShoppingCart className="w-5 h-5" /> Add to Cart
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-primary" />
                <span>{product.warrantyMonths} Months Warranty</span>
              </div>
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-primary" />
                <span>Free Express Shipping</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="w-5 h-5 text-primary" />
                <span>7 Day Replacement</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
