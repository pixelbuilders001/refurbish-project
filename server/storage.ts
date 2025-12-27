import { products, type Product, type InsertProduct, type User, type Order } from "@shared/schema";

export interface IStorage {
  getProducts(params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  
  // Auth
  getUserByPhone(phone: string): Promise<User | undefined>;
  createUser(user: Omit<User, "id">): Promise<User>;
  
  // Orders
  getOrders(userId: number): Promise<Order[]>;
  createOrder(userId: number, order: Omit<Order, "id" | "userId" | "createdAt" | "status">): Promise<Order>;
}

export class MemStorage implements IStorage {
  private products: Map<number, Product>;
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  private currentProductId: number;
  private currentUserId: number;
  private currentOrderId: number;

  constructor() {
    this.products = new Map();
    this.users = new Map();
    this.orders = new Map();
    this.currentProductId = 1;
    this.currentUserId = 1;
    this.currentOrderId = 1;
    this.initializeMockData();
  }

  private initializeMockData() {
    // Products
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
      }
    ];

    mockProducts.forEach(p => {
      const id = this.currentProductId++;
      this.products.set(id, { ...p, id });
    });

    // Dummy User
    const dummyUser: User = {
      id: this.currentUserId++,
      phone: "77575758",
      password: "yesimgreat",
      name: "John Doe"
    };
    this.users.set(dummyUser.id, dummyUser);

    // Dummy Order for Tracking
    const dummyOrder: Order = {
      id: this.currentOrderId++,
      userId: dummyUser.id,
      items: [
        { productId: 1, name: "iPhone 13 Pro (Refurbished)", quantity: 1, price: 45999 }
      ],
      total: 45999,
      status: "Shipped",
      createdAt: new Date(),
      address: "123, Tech Street, Silicon Valley"
    };
    this.orders.set(dummyOrder.id, dummyOrder);
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
        results = results.filter(p => p.name.toLowerCase().includes(query) || p.brand.toLowerCase().includes(query));
      }
      if (params.category && params.category !== "All") {
        results = results.filter(p => p.category === params.category);
      }
      if (params.minPrice) results = results.filter(p => p.price >= params.minPrice!);
      if (params.maxPrice) results = results.filter(p => p.price <= params.maxPrice!);
      if (params.condition) results = results.filter(p => p.condition === params.condition);
    }
    return results;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.phone === phone);
  }

  async createUser(user: Omit<User, "id">): Promise<User> {
    const id = this.currentUserId++;
    const newUser = { ...user, id };
    this.users.set(id, newUser);
    return newUser;
  }

  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  async createOrder(userId: number, order: Omit<Order, "id" | "userId" | "createdAt" | "status">): Promise<Order> {
    const id = this.currentOrderId++;
    const newOrder: Order = {
      ...order,
      id,
      userId,
      status: "Pending",
      createdAt: new Date()
    };
    this.orders.set(id, newOrder);
    return newOrder;
  }
}

export const storage = new MemStorage();
