import { products, users, orders, type Product, type InsertProduct, type User, type Order, type InsertOrder } from "@shared/schema";

export interface IStorage {
  getProducts(params?: {
    search?: string;
    category?: string;
    minPrice?: number;
    maxPrice?: number;
    condition?: string;
  }): Promise<Product[]>;
  getProduct(id: number): Promise<Product | undefined>;
  getUserByPhone(phone: string): Promise<User | undefined>;
  getOrders(userId: number): Promise<Order[]>;
  createOrder(order: InsertOrder): Promise<Order>;
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
    // Initial products
    const mockProducts: any[] = [
      {
        name: "iPhone 13 Pro (Refurbished)",
        description: "128GB, Sierra Blue. Fully tested and certified.",
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
      }
    ];

    mockProducts.forEach(p => {
      const id = this.currentProductId++;
      this.products.set(id, { ...p, id });
    });

    // Initial dummy user
    const dummyUser: User = {
      id: 1,
      phone: "77575758",
      password: "yesimgreat"
    };
    this.users.set(dummyUser.id, dummyUser);
    this.currentUserId = 2;

    // Initial dummy order
    const dummyOrder: Order = {
      id: 1,
      userId: 1,
      total: 45999,
      status: "Shipped",
      items: [{ productId: 1, name: "iPhone 13 Pro", quantity: 1, price: 45999 }],
      address: "123 Tech Park, Bangalore, KA",
      createdAt: new Date()
    };
    this.orders.set(dummyOrder.id, dummyOrder);
    this.currentOrderId = 2;
  }

  async getProducts(params?: any): Promise<Product[]> {
    let results = Array.from(this.products.values());
    if (params) {
      if (params.search) {
        const query = params.search.toLowerCase();
        results = results.filter(p => p.name.toLowerCase().includes(query));
      }
      if (params.category && params.category !== "All") {
        results = results.filter(p => p.category === params.category);
      }
    }
    return results;
  }

  async getProduct(id: number): Promise<Product | undefined> {
    return this.products.get(id);
  }

  async getUserByPhone(phone: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(u => u.phone === phone);
  }

  async getOrders(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(o => o.userId === userId);
  }

  async createOrder(insertOrder: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = { ...insertOrder, id, createdAt: new Date() };
    this.orders.set(id, order);
    return order;
  }
}

export const storage = new MemStorage();
