import { Link } from "wouter";
import { Facebook, Twitter, Instagram, Mail, MapPin, Phone } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-secondary/30 border-t border-border mt-20 pt-16 pb-8">
      <div className="container-width">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          
          <div className="space-y-4">
            <Link href="/" className="text-2xl font-display font-bold">
              ReNew<span className="text-primary">Tech</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              India's most trusted marketplace for certified refurbished electronics. 
              Quality tested, warranty backed, and eco-friendly.
            </p>
            <div className="flex gap-4 pt-2">
              {[Facebook, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="p-2 rounded-full bg-white shadow-sm hover:text-primary hover:shadow-md transition-all">
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold mb-6">Shop Categories</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/products?category=Phones" className="hover:text-primary transition-colors">Refurbished Phones</Link></li>
              <li><Link href="/products?category=Laptops" className="hover:text-primary transition-colors">Used Laptops</Link></li>
              <li><Link href="/products?category=Accessories" className="hover:text-primary transition-colors">Accessories</Link></li>
              <li><Link href="/products" className="hover:text-primary transition-colors">New Arrivals</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Support</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="#" className="hover:text-primary transition-colors">Warranty Policy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Quality Guide</a></li>
              <li><a href="#" className="hover:text-primary transition-colors">Track Order</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>123 Tech Park, Cyber City,<br />Gurugram, Haryana 122002</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <span>+91 1800-123-4567</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <span>support@renewtech.in</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-muted-foreground">
          <p>© 2024 ReNewTech India. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-foreground">Privacy Policy</a>
            <a href="#" className="hover:text-foreground">Terms of Service</a>
            <a href="#" className="hover:text-foreground">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
