import { Link } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { motion } from "framer-motion";
import { ShieldCheck, Truck, RefreshCw, Zap } from "lucide-react";

export default function Home() {
  const { data: featuredProducts, isLoading } = useProducts();

  return (
    <div className="space-y-24 pb-20">
      
      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-24 lg:pt-20 bg-secondary/30">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-50" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 rounded-full blur-3xl opacity-50" />

        <div className="container-width relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
            <div className="flex-1 text-center lg:text-left">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <span className="inline-block px-4 py-1.5 rounded-full bg-white border border-border shadow-sm text-sm font-semibold text-primary mb-6">
                  ✨ India's #1 Refurbished Marketplace
                </span>
                <h1 className="text-4xl lg:text-6xl font-display font-bold leading-tight mb-6">
                  Premium Tech. <br/>
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">Pocket Prices.</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto lg:mx-0 leading-relaxed">
                  Get certified refurbished phones and laptops with up to 6 months warranty. 
                  32-point quality checks ensure you get the best, for less.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                  <Link href="/products" className="btn-primary w-full sm:w-auto h-12 text-base shadow-lg shadow-primary/25">
                    Shop Now
                  </Link>
                  <Link href="/products?category=Laptops" className="btn-outline w-full sm:w-auto h-12 text-base bg-white">
                    Explore Laptops
                  </Link>
                </div>
              </motion.div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex-1 relative w-full max-w-[500px]"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-accent/20 rounded-full blur-3xl transform rotate-6" />
              {/* Unsplash tech collage concept */}
              <img 
                src="https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=800&q=80" 
                alt="Latest Tech" 
                className="relative z-10 w-full rounded-3xl shadow-2xl border-4 border-white transform hover:-rotate-2 transition-transform duration-500"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container-width">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
          {[
            { icon: ShieldCheck, title: "6 Month Warranty", desc: "Full coverage for peace of mind" },
            { icon: RefreshCw, title: "7 Day Replacement", desc: "No questions asked returns" },
            { icon: Zap, title: "32-Point Check", desc: "Tested by certified experts" },
            { icon: Truck, title: "Free Shipping", desc: "Across 20,000+ pincodes" },
          ].map((feature, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-border shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-4">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-bold mb-1">{feature.title}</h3>
              <p className="text-sm text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="container-width">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold">Shop By Category</h2>
          <Link href="/products" className="text-primary font-semibold hover:underline">View All</Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Smartphones", img: "https://images.unsplash.com/photo-1598327105666-5b89351aff23?w=800&q=80", link: "/products?category=Phones" },
            { name: "Laptops", img: "https://images.unsplash.com/photo-1531297461136-82af022f5b79?w=800&q=80", link: "/products?category=Laptops" },
            { name: "Accessories", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&q=80", link: "/products?category=Accessories" },
          ].map((cat, i) => (
            <Link key={i} href={cat.link} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors z-10" />
              <img src={cat.img} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-white">
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <span className="px-4 py-2 rounded-full border border-white/50 text-sm font-medium backdrop-blur-sm group-hover:bg-white group-hover:text-black transition-all">
                  Browse Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container-width">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-display font-bold">Featured Deals</h2>
          <div className="flex gap-2">
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">←</button>
            <button className="w-10 h-10 rounded-full border border-border flex items-center justify-center hover:bg-secondary transition-colors">→</button>
          </div>
        </div>
        
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-80 bg-secondary/50 rounded-2xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts?.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* CTA Section */}
      <section className="container-width">
        <div className="rounded-3xl bg-foreground text-white p-12 lg:p-20 relative overflow-hidden text-center">
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl opacity-30" />
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl lg:text-5xl font-display font-bold mb-6">Sell Your Old Device</h2>
            <p className="text-gray-400 mb-8 text-lg">
              Got an old phone lying around? Get the best resale value instantly. 
              We offer doorstep pickup and instant payment.
            </p>
            <button className="btn-primary bg-white text-foreground hover:bg-gray-100">
              Check Price
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
