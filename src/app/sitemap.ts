import type { MetadataRoute } from "next";
import { getProducts, getCategories } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  const base =
    process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ||
    "http://localhost:3000";

  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${base}/`, changeFrequency: "weekly", priority: 1.0, lastModified: now },
    { url: `${base}/sortiment`, changeFrequency: "daily", priority: 0.9, lastModified: now },
    { url: `${base}/o-restauraci`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${base}/jak-nakupovat`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${base}/kontakt`, changeFrequency: "monthly", priority: 0.6, lastModified: now },
    { url: `${base}/obchodni-podminky`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${base}/ochrana-osobnich-udaju`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
    { url: `${base}/prihlaseni`, changeFrequency: "yearly", priority: 0.3, lastModified: now },
  ];

  const categoryRoutes: MetadataRoute.Sitemap = getCategories().map((c) => ({
    url: `${base}/sortiment/${c.slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
    lastModified: now,
  }));

  const productRoutes: MetadataRoute.Sitemap = getProducts().map((p) => ({
    url: `${base}/produkt/${p.slug}`,
    changeFrequency: "weekly",
    priority: 0.7,
    lastModified: now,
  }));

  return [...staticRoutes, ...categoryRoutes, ...productRoutes];
}
