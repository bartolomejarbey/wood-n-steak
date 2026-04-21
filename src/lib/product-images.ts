import type { Product } from "@/lib/types";

// Per-slug photo assignments. Products without a match return null so UI can
// render a premium monogram placeholder instead of a reused stock food photo.
const SLUG_FALLBACK: Record<string, string> = {
  // Steaky
  "rib-eye-black-angus-dry-aged": "/images/photos/hero-dryagers.jpg",
  "sirloin-steak-premium": "/images/photos/chef-flame.jpg",
  "t-bone-steak": "/images/photos/tbone-grill.jpg",
  "tomahawk-steak": "/images/photos/butcher-ribcage.jpg",
  "picanha": "/images/photos/food-skewers-beef.jpg",
  "flank-steak": "/images/photos/butcher-dog.jpg",
  // Hovězí
  "svickova-hovezi": "/images/photos/food-tartare.jpg",
  "roast-beef": "/images/photos/dog-dryager.jpg",
  "hovezi-mlete-premium": "/images/photos/food-burger.jpg",
};

export function getProductImage(product: Product): string | null {
  return product.image_url || SLUG_FALLBACK[product.slug] || null;
}
