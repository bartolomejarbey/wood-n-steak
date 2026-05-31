import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/data";
import { siteUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteUrl();

  // Stable build-time date so crawlers receive a real change signal
  // (instead of "now" changing on every request).
  const lastModified = new Date("2026-05-31");

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0, lastModified },
    { url: `${base}/sortiment`, changeFrequency: "weekly", priority: 0.9, lastModified },
    { url: `${base}/o-restauraci`, changeFrequency: "monthly", priority: 0.6, lastModified },
    { url: `${base}/jak-nakupovat`, changeFrequency: "monthly", priority: 0.6, lastModified },
    { url: `${base}/kontakt`, changeFrequency: "monthly", priority: 0.6, lastModified },
    { url: `${base}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.3, lastModified },
    { url: `${base}/ochrana-osobnich-udaju`, changeFrequency: "yearly", priority: 0.3, lastModified },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/sortiment/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: `${base}/produkt/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
