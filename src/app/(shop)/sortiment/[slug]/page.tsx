"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Search } from "lucide-react";
import {
  getCategories,
  getCategoryBySlug,
  getProductsByCategory,
} from "@/lib/data";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import ProductCard from "@/components/shop/ProductCard";

type SortOption = "newest" | "price_asc" | "price_desc" | "name";

function sortProducts(products: Product[], sort: SortOption): Product[] {
  const sorted = [...products];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => a.price - b.price);
    case "price_desc":
      return sorted.sort((a, b) => b.price - a.price);
    case "name":
      return sorted.sort((a, b) => a.name.localeCompare(b.name, "cs"));
    case "newest":
    default:
      return sorted.sort((a, b) => b.sort_order - a.sort_order);
  }
}

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [query, setQuery] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = getCategories();
  const category = getCategoryBySlug(slug);

  const filteredProducts = useMemo(() => {
    if (!category) return [];

    let result = getProductsByCategory(category.id);

    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description?.toLowerCase().includes(q) ||
          p.short_description?.toLowerCase().includes(q)
      );
    }

    return sortProducts(result, sort);
  }, [query, sort, category]);

  if (!category) {
    return (
      <main className="min-h-screen bg-off-black flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-heading text-cream text-2xl mb-4">
            Kategorie nenalezena
          </h1>
          <Link
            href="/sortiment"
            className="font-body text-gold border border-gold px-6 py-2 hover:bg-gold hover:text-black transition-all duration-200 text-sm"
          >
            Zpet na sortiment
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-off-black">
      {/* Hero */}
      <section className="relative py-20 bg-forest">
        <div className="max-w-7xl mx-auto px-4 text-center">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <ol className="flex items-center justify-center gap-2 font-heading text-sm italic text-cream/50">
              <li>
                <Link
                  href="/sortiment"
                  className="hover:text-gold transition-colors"
                >
                  Sortiment
                </Link>
              </li>
              <li className="text-gold/40">/</li>
              <li className="text-gold">{category.name}</li>
            </ol>
          </nav>

          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream">
            {category.name}
          </h1>
          {category.description && (
            <p className="mt-4 font-body text-cream/60 text-lg max-w-xl mx-auto">
              {category.description}
            </p>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <h2 className="font-heading text-cream text-lg mb-4">Kategorie</h2>
            <div className="flex flex-col gap-2">
              <Link
                href="/sortiment"
                className="text-left px-4 py-2 text-sm font-body border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-200"
              >
                Vse
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/sortiment/${cat.slug}`}
                  className={cn(
                    "text-left px-4 py-2 text-sm font-body border transition-all duration-200",
                    cat.slug === slug
                      ? "bg-gold text-black border-gold"
                      : "border-gold text-gold hover:bg-gold hover:text-black"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search + sort bar */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gold/50" />
                <input
                  type="text"
                  placeholder="Hledat v kategorii..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-transparent border border-gold/30 text-cream font-body text-sm placeholder:text-cream/30 focus:border-gold focus:outline-none transition-colors"
                />
              </div>

              {/* Sort */}
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortOption)}
                className="px-4 py-2.5 bg-off-black border border-gold/30 text-cream font-body text-sm focus:border-gold focus:outline-none cursor-pointer appearance-none"
              >
                <option value="newest">Nejnovejsi</option>
                <option value="price_asc">Cena vzestupne</option>
                <option value="price_desc">Cena sestupne</option>
                <option value="name">Podle nazvu</option>
              </select>
            </div>

            {/* Mobile category filters */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              <Link
                href="/sortiment"
                className="flex-shrink-0 px-4 py-2 text-xs font-body border border-gold text-gold hover:bg-gold hover:text-black transition-all duration-200"
              >
                Vse
              </Link>
              {categories.map((cat) => (
                <Link
                  key={cat.id}
                  href={`/sortiment/${cat.slug}`}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 text-xs font-body border transition-all duration-200",
                    cat.slug === slug
                      ? "bg-gold text-black border-gold"
                      : "border-gold text-gold hover:bg-gold hover:text-black"
                  )}
                >
                  {cat.name}
                </Link>
              ))}
            </div>

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20">
                <p className="font-heading text-cream/40 text-lg">
                  Zadne produkty nebyly nalezeny
                </p>
                <p className="font-body text-cream/25 text-sm mt-2">
                  Zkuste zmenit vyhledavaci dotaz
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
