"use client";

import { useState, useMemo } from "react";
import { Search, ChevronDown } from "lucide-react";
import { getProducts, getCategories, searchProducts } from "@/lib/data";
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

export default function SortimentPage() {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [sort, setSort] = useState<SortOption>("newest");

  const categories = getCategories();
  const allProducts = getProducts();

  const filteredProducts = useMemo(() => {
    let result: Product[];

    if (query.trim()) {
      result = searchProducts(query);
    } else {
      result = allProducts;
    }

    if (activeCategory) {
      result = result.filter((p) => p.category_id === activeCategory);
    }

    return sortProducts(result, sort);
  }, [query, activeCategory, sort, allProducts]);

  const activeCategoryName = activeCategory
    ? categories.find((c) => c.id === activeCategory)?.name
    : null;

  return (
    <main className="min-h-screen bg-off-black">
      {/* Hero */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-forest via-forest to-off-black">
        <div className="relative max-w-7xl mx-auto px-4 text-center">
          <span className="font-body text-gold/40 text-xs tracking-[0.3em] uppercase">Nabídka</span>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mt-2">
            Sortiment
          </h1>
          <p className="mt-4 font-body text-cream/50 text-base max-w-md mx-auto">
            Vyberte si z naší nabídky prémiových produktů
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar - desktop */}
          <aside className="hidden lg:block w-56 flex-shrink-0">
            <h2 className="font-body text-white/30 text-xs tracking-[0.2em] uppercase mb-4">Kategorie</h2>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "text-left px-4 py-2.5 text-sm font-body rounded-lg transition-all duration-200",
                  !activeCategory
                    ? "bg-gold/10 text-gold border-l-2 border-gold"
                    : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                )}
              >
                Vše
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "text-left px-4 py-2.5 text-sm font-body rounded-lg transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-gold/10 text-gold border-l-2 border-gold"
                      : "text-white/50 hover:text-white hover:bg-white/[0.03]"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1">
            {/* Search + sort bar */}
            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              {/* Search */}
              <div className="relative flex-1">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-white/25" />
                <input
                  type="text"
                  placeholder="Hledat produkty..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-xl text-cream font-body text-sm placeholder:text-white/25 focus:border-gold/40 focus:outline-none transition-colors"
                />
              </div>

              {/* Sort */}
              <div className="relative">
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortOption)}
                  className="w-full sm:w-auto px-4 py-2.5 pr-10 bg-white/[0.03] border border-white/[0.08] rounded-xl text-cream font-body text-sm focus:border-gold/40 focus:outline-none cursor-pointer appearance-none"
                >
                  <option value="newest">Nejnovější</option>
                  <option value="price_asc">Cena vzestupně</option>
                  <option value="price_desc">Cena sestupně</option>
                  <option value="name">Podle názvu</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
              </div>
            </div>

            {/* Mobile category filters */}
            <div className="flex lg:hidden gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide -mx-1 px-1">
              <button
                onClick={() => setActiveCategory(null)}
                className={cn(
                  "flex-shrink-0 px-4 py-2 text-xs font-body rounded-full transition-all duration-200",
                  !activeCategory
                    ? "bg-gold text-black"
                    : "bg-white/[0.04] text-white/50 hover:text-white"
                )}
              >
                Vše
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={cn(
                    "flex-shrink-0 px-4 py-2 text-xs font-body rounded-full transition-all duration-200",
                    activeCategory === cat.id
                      ? "bg-gold text-black"
                      : "bg-white/[0.04] text-white/50 hover:text-white"
                  )}
                >
                  {cat.name}
                </button>
              ))}
            </div>

            {/* Active filter indicator */}
            {activeCategoryName && (
              <div className="mb-6 flex items-center gap-2">
                <span className="font-body text-white/30 text-xs">Filtr:</span>
                <button
                  onClick={() => setActiveCategory(null)}
                  className="inline-flex items-center gap-1.5 px-3 py-1 bg-gold/10 text-gold text-xs font-body rounded-full hover:bg-gold/20 transition-colors"
                >
                  {activeCategoryName}
                  <span className="text-gold/50">&times;</span>
                </button>
              </div>
            )}

            {/* Product grid */}
            {filteredProducts.length > 0 ? (
              <>
                <p className="font-body text-white/20 text-xs mb-5">
                  {filteredProducts.length} {filteredProducts.length === 1 ? "produkt" : filteredProducts.length < 5 ? "produkty" : "produktů"}
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-20">
                <p className="font-heading text-white/30 text-lg">
                  Žádné produkty nebyly nalezeny
                </p>
                <p className="font-body text-white/20 text-sm mt-2">
                  Zkuste změnit vyhledávací dotaz nebo kategorii
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
