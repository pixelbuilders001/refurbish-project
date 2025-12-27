import { useQuery } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";

export function useProducts(filters?: {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
}) {
  return useQuery({
    queryKey: [api.products.list.path, filters],
    queryFn: async () => {
      // Build query string manually since filters are optional
      const params = new URLSearchParams();
      if (filters?.search) params.append("search", filters.search);
      if (filters?.category && filters.category !== "All") params.append("category", filters.category);
      if (filters?.minPrice) params.append("minPrice", filters.minPrice.toString());
      if (filters?.maxPrice) params.append("maxPrice", filters.maxPrice.toString());
      if (filters?.condition && filters.condition !== "All") params.append("condition", filters.condition);

      const url = `${api.products.list.path}?${params.toString()}`;
      
      const res = await fetch(url, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch products");
      
      // Parse with Zod schema from routes
      return api.products.list.responses[200].parse(await res.json());
    },
  });
}

export function useProduct(id: number) {
  return useQuery({
    queryKey: [api.products.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.products.get.path, { id });
      const res = await fetch(url, { credentials: "include" });
      
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch product");
      
      return api.products.get.responses[200].parse(await res.json());
    },
    enabled: !!id,
  });
}
