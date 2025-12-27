import { pgTable, text, serial, integer, boolean, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // In Rupees
  originalPrice: integer("original_price").notNull(),
  category: text("category").notNull(),
  brand: text("brand").notNull(),
  condition: text("condition").notNull(),
  conditionScore: integer("condition_score").notNull(),
  warrantyMonths: integer("warranty_months").notNull(),
  images: text("images").array().notNull(),
  specs: jsonb("specs").notNull(),
  stock: integer("stock").notNull().default(1),
  isFeatured: boolean("is_featured").default(false),
});

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  phone: text("phone").notNull().unique(),
  password: text("password").notNull(),
  name: text("name").notNull(),
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  items: jsonb("items").notNull(), // Array of { productId, quantity, price }
  total: integer("total").notNull(),
  status: text("status").notNull().default("Pending"), // Pending, Shipped, Out for delivery, Delivered
  createdAt: timestamp("created_at").defaultNow(),
  address: text("address").notNull(),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });
export const insertUserSchema = createInsertSchema(users).omit({ id: true });
export const insertOrderSchema = createInsertSchema(orders).omit({ id: true, createdAt: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
export type User = typeof users.$inferSelect;
export type Order = typeof orders.$inferSelect;
