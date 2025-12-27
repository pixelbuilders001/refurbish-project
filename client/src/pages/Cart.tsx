import { Link } from "wouter";
import { useCart } from "@/context/CartContext";
import { Minus, Plus, Trash2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Cart() {
  const { items, removeFromCart, updateQuantity, cartTotal, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
        <div className="w-24 h-24 bg-secondary/50 rounded-full flex items-center justify-center mb-6">
          <Trash2 className="w-10 h-10 text-muted-foreground" />
        </div>
        <h1 className="text-2xl font-bold mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven't added anything yet.</p>
        <Link href="/products" className="btn-primary">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="bg-secondary/20 min-h-screen py-12">
      <div className="container-width">
        <h1 className="text-3xl font-display font-bold mb-8">Shopping Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          
          {/* Cart Items */}
          <div className="flex-1 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div 
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, height: 0 }}
                  className="bg-white rounded-2xl p-4 sm:p-6 flex gap-6 items-center border border-border shadow-sm"
                >
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-secondary/30 rounded-xl overflow-hidden flex-shrink-0">
                    <img 
                      src={item.images[0]} 
                      alt={item.name} 
                      className="w-full h-full object-contain mix-blend-multiply p-2" 
                    />
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="font-bold text-lg mb-1">{item.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4 capitalize">{item.condition} Condition</p>
                    
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3 bg-secondary/50 rounded-lg p-1">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-primary disabled:opacity-50"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="text-sm font-semibold w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-white rounded-md shadow-sm hover:text-primary"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      
                      <button 
                        onClick={() => removeFromCart(item.id)}
                        className="text-sm text-destructive hover:underline ml-auto sm:ml-4"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  <div className="text-right">
                    <p className="font-bold text-lg">₹{(item.price * item.quantity).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">₹{item.price.toLocaleString()} each</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:w-96">
            <div className="bg-white rounded-2xl p-6 border border-border shadow-sm sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-6 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({items.length} items)</span>
                  <span className="font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-emerald-600 font-medium">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tax (18% GST)</span>
                  <span className="font-medium">Included</span>
                </div>
                <div className="border-t border-dashed border-border pt-4 flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span className="text-primary">₹{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <Link href="/checkout" className="btn-primary w-full h-12 text-base flex items-center justify-center gap-2">
                Proceed to Checkout <ArrowRight className="w-4 h-4" />
              </Link>
              
              <p className="text-xs text-center text-muted-foreground mt-4">
                Secure checkout powered by Stripe (Dummy)
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
