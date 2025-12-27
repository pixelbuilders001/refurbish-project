import { useForm } from "react-hook-form";
import { useCart } from "@/context/CartContext";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

// Schema for form validation
const checkoutSchema = z.object({
  fullName: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().min(10, "Valid phone number required"),
  address: z.string().min(10, "Full address required"),
  city: z.string().min(2, "City required"),
  pincode: z.string().length(6, "Invalid pincode"),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

export default function Checkout() {
  const { cartTotal, clearCart } = useCart();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema)
  });

  const onSubmit = async (data: CheckoutForm) => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Order placed:", data);
    clearCart();
    toast({
      title: "Order Placed Successfully! 🎉",
      description: "You will receive an email confirmation shortly.",
    });
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-secondary/20 py-12">
      <div className="container-width max-w-4xl">
        <h1 className="text-3xl font-display font-bold mb-8 text-center">Secure Checkout</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Form */}
          <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
            <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">1</span>
              Shipping Details
            </h2>
            
            <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-1 block">Full Name</label>
                <input 
                  {...register("fullName")}
                  className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                  placeholder="John Doe"
                />
                {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email</label>
                  <input 
                    {...register("email")}
                    className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                  />
                  {errors.email && <p className="text-xs text-destructive mt-1">{errors.email.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Phone</label>
                  <input 
                    {...register("phone")}
                    className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="9876543210"
                  />
                  {errors.phone && <p className="text-xs text-destructive mt-1">{errors.phone.message}</p>}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium mb-1 block">Address</label>
                <textarea 
                  {...register("address")}
                  className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all min-h-[100px]"
                  placeholder="Street, House No, Landmark"
                />
                {errors.address && <p className="text-xs text-destructive mt-1">{errors.address.message}</p>}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-1 block">City</label>
                  <input 
                    {...register("city")}
                    className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="Mumbai"
                  />
                  {errors.city && <p className="text-xs text-destructive mt-1">{errors.city.message}</p>}
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">Pincode</label>
                  <input 
                    {...register("pincode")}
                    className="w-full px-4 py-2.5 rounded-lg border border-input focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all"
                    placeholder="400001"
                  />
                  {errors.pincode && <p className="text-xs text-destructive mt-1">{errors.pincode.message}</p>}
                </div>
              </div>
            </form>
          </div>

          {/* Payment & Summary */}
          <div className="space-y-6">
            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm">2</span>
                Payment Method
              </h2>
              
              <div className="p-4 border border-primary bg-primary/5 rounded-xl flex items-center gap-4 cursor-pointer">
                <div className="w-5 h-5 rounded-full border-[6px] border-primary bg-white"></div>
                <div>
                  <p className="font-bold">Cash on Delivery</p>
                  <p className="text-xs text-muted-foreground">Pay when you receive the product</p>
                </div>
              </div>
              
              <div className="mt-4 p-4 border border-border rounded-xl flex items-center gap-4 opacity-50 cursor-not-allowed">
                <div className="w-5 h-5 rounded-full border border-border"></div>
                <div>
                  <p className="font-bold">UPI / Card</p>
                  <p className="text-xs text-muted-foreground">Temporarily unavailable</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-border shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Total</h2>
              <div className="flex justify-between items-center text-3xl font-bold text-primary mb-6">
                ₹{cartTotal.toLocaleString()}
              </div>
              
              <button 
                type="submit" 
                form="checkout-form"
                disabled={isSubmitting}
                className="btn-primary w-full h-14 text-lg flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>Processing...</>
                ) : (
                  <>Place Order <CheckCircle2 className="w-5 h-5" /></>
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
