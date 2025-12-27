import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useProducts } from "@/hooks/use-products";
import { ProductCard } from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider"; // This assumes Shadcn UI exists or we stub it
import { Filter, X, ChevronDown } from "lucide-react";

// Stubbing generic UI components if they don't exist yet, to ensure it compiles
function FilterSection({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-6">
      <h3 className="font-bold text-sm mb-4 uppercase tracking-wider text-muted-foreground">{title}</h3>
      {children}
    </div>
  );
}

export default function ProductList() {
  const [location] = useLocation();
  const params = new URLSearchParams(window.location.search);
  
  const [filters, setFilters] = useState({
    search: params.get("search") || "",
    category: params.get("category") || "All",
    condition: "All",
    minPrice: 0,
    maxPrice: 100000,
  });

  const { data: products, isLoading } = useProducts(filters);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Sync filters if URL changes
  useEffect(() => {
    const p = new URLSearchParams(window.location.search);
    setFilters(prev => ({
      ...prev,
      search: p.get("search") || "",
      category: p.get("category") || "All"
    }));
  }, [location]);

  return (
    <div className="bg-secondary/20 min-h-screen pb-20">
      
      {/* Header */}
      <div className="bg-white border-b border-border py-8">
        <div className="container-width">
          <h1 className="text-3xl font-display font-bold mb-2">
            {filters.category === "All" ? "All Products" : filters.category}
          </h1>
          <p className="text-muted-foreground">
            {products?.length || 0} items found
          </p>
        </div>
      </div>

      <div className="container-width mt-8">
        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className={`
            fixed inset-0 z-40 bg-white lg:bg-transparent lg:static lg:w-64 lg:block overflow-y-auto lg:overflow-visible transition-transform duration-300
            ${isMobileFiltersOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
          `}>
            <div className="p-6 lg:p-0">
              <div className="flex items-center justify-between lg:hidden mb-6">
                <h2 className="text-xl font-bold">Filters</h2>
                <button onClick={() => setIsMobileFiltersOpen(false)}><X /></button>
              </div>

              <FilterSection title="Category">
                <div className="space-y-2">
                  {["All", "Phones", "Laptops", "Accessories"].map(cat => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer group">
                      <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${filters.category === cat ? "border-primary" : "border-muted-foreground"}`}>
                        {filters.category === cat && <div className="w-2 h-2 rounded-full bg-primary" />}
                      </div>
                      <input 
                        type="radio" 
                        name="category" 
                        className="hidden"
                        checked={filters.category === cat}
                        onChange={() => setFilters({ ...filters, category: cat })}
                      />
                      <span className={`${filters.category === cat ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Condition">
                <div className="space-y-2">
                  {["All", "Excellent", "Good", "Fair"].map(cond => (
                    <label key={cond} className="flex items-center gap-2 cursor-pointer group">
                       <div className={`w-4 h-4 rounded border flex items-center justify-center ${filters.condition === cond ? "border-primary bg-primary text-white" : "border-muted-foreground"}`}>
                        {filters.condition === cond && <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><polyline points="20 6 9 17 4 12" /></svg>}
                      </div>
                      <input 
                        type="radio" 
                        name="condition" 
                        className="hidden"
                        checked={filters.condition === cond}
                        onChange={() => setFilters({ ...filters, condition: cond })}
                      />
                      <span className={`${filters.condition === cond ? "text-foreground font-medium" : "text-muted-foreground group-hover:text-foreground"}`}>
                        {cond}
                      </span>
                    </label>
                  ))}
                </div>
              </FilterSection>

              <FilterSection title="Price Range">
                 <div className="space-y-4">
                   <div className="flex justify-between text-sm">
                     <span>₹{filters.minPrice}</span>
                     <span>₹{filters.maxPrice}</span>
                   </div>
                   <input 
                     type="range" 
                     min="0" max="100000" step="1000" 
                     value={filters.maxPrice}
                     className="w-full accent-primary h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                     onChange={(e) => setFilters({...filters, maxPrice: parseInt(e.target.value)})}
                   />
                 </div>
              </FilterSection>

              <button 
                onClick={() => setFilters({ search: "", category: "All", condition: "All", minPrice: 0, maxPrice: 100000 })}
                className="w-full mt-6 py-2 text-sm text-destructive hover:bg-destructive/10 rounded-lg transition-colors"
              >
                Clear all filters
              </button>
            </div>
          </aside>

          {/* Product Grid */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6 lg:hidden">
              <button 
                onClick={() => setIsMobileFiltersOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-white rounded-lg border border-border text-sm font-medium"
              >
                <Filter className="w-4 h-4" /> Filters
              </button>
            </div>

            {isLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-96 bg-white rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center mb-4">
                  <Filter className="w-8 h-8 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold mb-2">No products found</h3>
                <p className="text-muted-foreground">Try adjusting your filters or search criteria.</p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
