import { Link, useLocation } from "wouter";
import { useCart } from "@/context/CartContext";
import { ShoppingBag, Search, Menu, X, Smartphone, Laptop, Headphones } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
  const [location, setLocation] = useLocation();
  const { itemCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setLocation(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsMobileMenuOpen(false);
    }
  };

  const categories = [
    { name: "Phones", icon: Smartphone, href: "/products?category=Phones" },
    { name: "Laptops", icon: Laptop, href: "/products?category=Laptops" },
    { name: "Accessories", icon: Headphones, href: "/products?category=Accessories" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/90 backdrop-blur-xl border-b border-border shadow-sm">
      <div className="container-width">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group cursor-pointer">
            <div className="bg-primary p-2 rounded-lg group-hover:bg-primary/90 transition-colors">
              <ShoppingBag className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl md:text-2xl font-display font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
              ReNew<span className="text-primary">Tech</span>
            </span>
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full group">
              <input
                type="text"
                placeholder="Search for iPhone 13, MacBook Pro..."
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-secondary/50 border border-transparent focus:bg-background focus:border-primary/50 focus:ring-4 focus:ring-primary/10 outline-none transition-all duration-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
            </form>
          </div>

          {/* Desktop Nav Actions */}
          <div className="hidden md:flex items-center gap-6">
            <div className="flex items-center gap-1">
              {categories.map((cat) => (
                <Link key={cat.name} href={cat.href} className="px-3 py-2 rounded-lg text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors">
                  {cat.name}
                </Link>
              ))}
            </div>
            
            <div className="h-6 w-px bg-border mx-2"></div>
            
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-secondary transition-colors group">
              <ShoppingBag className="w-6 h-6 text-foreground group-hover:text-primary transition-colors" />
              {itemCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-primary text-primary-foreground text-[10px] font-bold h-5 w-5 flex items-center justify-center rounded-full shadow-sm ring-2 ring-white">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden p-2 text-foreground"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden border-t border-border bg-background overflow-hidden"
          >
            <div className="p-4 space-y-4">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-secondary border-none"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              </form>
              
              <div className="grid grid-cols-2 gap-2">
                {categories.map((cat) => (
                  <Link 
                    key={cat.name} 
                    href={cat.href}
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-secondary/30 hover:bg-secondary border border-transparent hover:border-border transition-all"
                  >
                    <cat.icon className="w-6 h-6 mb-2 text-primary" />
                    <span className="text-sm font-medium">{cat.name}</span>
                  </Link>
                ))}
              </div>

              <Link href="/cart" onClick={() => setIsMobileMenuOpen(false)}>
                <div className="flex items-center justify-between p-4 rounded-xl bg-primary/10 text-primary font-medium">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5" />
                    <span>View Cart</span>
                  </div>
                  <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">{itemCount} items</span>
                </div>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
