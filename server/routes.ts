import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  app.get(api.products.list.path, async (req, res) => {
    try {
      const query = api.products.list.input?.parse(req.query) || {};
      const products = await storage.getProducts(query);
      res.json(products);
    } catch (err) {
      res.status(400).json({ message: "Invalid query parameters" });
    }
  });

  app.get(api.products.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const product = await storage.getProduct(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.json(product);
  });

  return httpServer;
}
