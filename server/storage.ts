import { products, type Product, type InsertProduct } from "@shared/schema";

export interface IStorage {
  getProducts(params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private currentId: number;

  constructor() {
    this.products = new Map();
    this.currentId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    const mockProducts: InsertProduct[] = [
      {
        name: "iPhone 13 Pro (Refurbished)",
        description: "128GB, Sierra Blue. Fully tested and certified. Minimal signs of wear.",
        price: 45999,
        originalPrice: 119900,
        category: "Phones",
        brand: "Apple",
        condition: "Excellent",
        conditionScore: 95,
        warrantyMonths: 12,
        images: ["https://images.unsplash.com/photo-1632661674596-df8be070a5c5?auto=format&fit=crop&q=80&w=800"],
        specs: { ram: "6GB", storage: "128GB", processor: "A15 Bionic" },
        stock: 5,
        isFeatured: true
      },
      {
        name: "Samsung Galaxy S22 Ultra",
        description: "Phantom Black, 256GB. Excellent camera performance. S-Pen included.",
        price: 52999,
        originalPrice: 109999,
        category: "Phones",
        brand: "Samsung",
        condition: "Good",
        conditionScore: 88,
        warrantyMonths: 6,
        images: ["https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?auto=format&fit=crop&q=80&w=800"],
        specs: { ram: "12GB", storage: "256GB", processor: "Snapdragon 8 Gen 1" },
        stock: 3,
        isFeatured: true
      },
      {
        name: "MacBook Air M1",
        description: "Space Grey, 8GB RAM, 256GB SSD. Best value laptop. Battery cycle count: 45.",
        price: 55000,
        originalPrice: 99900,
        category: "Laptops",
        brand: "Apple",
        condition: "Excellent",
        conditionScore: 98,
        warrantyMonths: 12,
        images: ["https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?auto=format&fit=crop&q=80&w=800"],
        specs: { ram: "8GB", storage: "256GB", processor: "M1" },
        stock: 8,
        isFeatured: true
      },
      {
        name: "Dell XPS 13",
        description: "InfinityEdge display, lightweight and powerful. Ideal for professionals.",
        price: 48000,
        originalPrice: 110000,
        category: "Laptops",
        brand: "Dell",
        condition: "Fair",
        conditionScore: 75,
        warrantyMonths: 3,
        images: ["https://images.unsplash.com/photo-1593642632823-8f78536788c6?auto=format&fit=crop&q=80&w=800"],
        specs: { ram: "16GB", storage: "512GB", processor: "Intel i7" },
        stock: 2,
        isFeatured: false
      },
      {
        name: "OnePlus 9 Pro",
        description: "Hasselblad Camera for Mobile. Fast charging. 120Hz Fluid Display.",
        price: 28999,
        originalPrice: 64999,
        category: "Phones",
        brand: "OnePlus",
        condition: "Good",
        conditionScore: 85,
        warrantyMonths: 6,
        images: ["https://images.unsplash.com/photo-1619948834614-4b53ef9173d1?auto=format&fit=crop&q=80&w=800"],
        specs: { ram: "8GB", storage: "128GB", processor: "Snapdragon 888" },
        stock: 4,
        isFeatured: false
      },
      {
        name: "Sony WH-1000XM4",
        description: "Industry-leading noise canceling. 30 hours battery life.",
        price: 14999,
        originalPrice: 29990,
        category: "Accessories",
        brand: "Sony",
        condition: "Excellent",
        conditionScore: 92,
        warrantyMonths: 6,
        images: ["https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&q=80&w=800"],
        specs: { type: "Over-ear", battery: "30h", connectivity: "Bluetooth" },
        stock: 10,
        isFeatured: true
      }
    ];

    mockProducts.forEach(p => {
      const id = this.currentId++;
      this.products.set(id, { ...p, id });
    });
  }

  async getProducts(params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }): Promise<Product[]> {
    let results = Array.from(this.products.values());

    if (params) {
      if (params.search) {
        const query = params.search.toLowerCase();
        results = results.filter(p => 
          p.name.toLowerCase().includes(query) || 
          p.brand.toLowerCase().includes(query)
        );
      }
      if (params.category && params.category !== "All") {
        results = results.filter(p => p.category === params.category);
      }
      if (params.minPrice) {
        results = results.filter(p => p.price >= params.minPrice!);
      }
      if (params.maxPrice) {
        results = results.filter(p => p.price <= params.maxPrice!);
      }
      if (params.condition) {
        results = results.filter(p => p.condition === params.condition);
      }
    }

    return results;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }
}

export const storage = new MemStorage();
