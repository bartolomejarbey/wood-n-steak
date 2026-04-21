import type { Product } from "@/lib/types";

// Real product photos aren't shot yet — always fall through to the logo
// placeholder unless a product has an explicit image_url uploaded via admin.
export function getProductImage(product: Product): string | null {
  return product.image_url || null;
}
