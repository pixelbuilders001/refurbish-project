import { pgTable, text, serial, integer, boolean, jsonb, decimal } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(), // In Rupees
  originalPrice: integer("original_price").notNull(),
  category: text("category").notNull(), // 'Phones', 'Laptops', 'Accessories'
  brand: text("brand").notNull(),
  condition: text("condition").notNull(), // 'Excellent', 'Good', 'Fair'
  conditionScore: integer("condition_score").notNull(), // 0-100
  warrantyMonths: integer("warranty_months").notNull(),
  images: text("images").array().notNull(),
  specs: jsonb("specs").notNull(), // { ram: "8GB", storage: "256GB", processor: "M1" }
  stock: integer("stock").notNull().default(1),
  isFeatured: boolean("is_featured").default(false),
});

export const insertProductSchema = createInsertSchema(products).omit({ id: true });

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;
