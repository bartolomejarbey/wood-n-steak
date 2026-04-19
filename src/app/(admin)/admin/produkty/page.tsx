"use client";

import { useState } from "react";
import Link from "next/link";
import { cn, formatPrice } from "@/lib/utils";
import { getProducts, getCategories } from "@/lib/data";
import { Search, Plus, Edit, Trash2 } from "lucide-react";

const allProducts = getProducts();
const allCategories = getCategories();

function getCategoryName(categoryId: string): string {
  const cat = allCategories.find((c) => c.id === categoryId);
  return cat?.name ?? "—";
}

const stockLabels: Record<string, { label: string; color: string }> = {
  in_stock: { label: "Skladem", color: "text-green-400" },
  on_order: { label: "Na objednávku", color: "text-yellow-400" },
  out_of_stock: { label: "Vyprodáno", color: "text-red-400" },
};

export default function ProduktyPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  const filtered = allProducts.filter((p) => {
    const matchSearch =
      !search || p.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = !categoryFilter || p.category_id === categoryFilter;
    return matchSearch && matchCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white">Produkty</h1>
          <p className="mt-1 text-sm text-white/50 font-body">
            Správa produktů v nabídce
          </p>
        </div>
        <Link
          href="/admin/produkty/new"
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-body font-medium text-black transition-colors hover:bg-gold-light"
        >
          <Plus size={16} />
          Přidat produkt
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search
            size={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30"
          />
          <input
            type="text"
            placeholder="Hledat produkt..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-gold/10 bg-off-black py-2.5 pl-10 pr-4 text-sm font-body text-white placeholder:text-white/30 focus:border-gold focus:ring-1 focus:ring-gold"
          />
        </div>
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="rounded-lg border border-gold/10 bg-off-black px-4 py-2.5 text-sm font-body text-white focus:border-gold focus:ring-1 focus:ring-gold"
        >
          <option value="">Všechny kategorie</option>
          {allCategories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gold/10 bg-off-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10 text-left">
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Obrázek
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Název
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Kategorie
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Cena
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Sklad
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Stav
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Akce
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gold/5">
            {filtered.map((product) => {
              const stock = stockLabels[product.stock_status];
              return (
                <tr
                  key={product.id}
                  className="transition-colors hover:bg-white/[0.02]"
                >
                  <td className="px-6 py-4">
                    <div className="h-10 w-10 rounded-lg bg-gold/10 flex items-center justify-center">
                      <span className="text-xs text-gold/40">IMG</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="text-sm font-body text-white">
                      {product.name}
                    </div>
                    <div className="text-xs text-white/40 font-body">
                      {product.weight_info}
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/60">
                    {getCategoryName(product.category_id)}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                    {formatPrice(product.price)}/{product.unit}
                  </td>
                  <td
                    className={cn(
                      "whitespace-nowrap px-6 py-4 text-sm font-body",
                      stock?.color
                    )}
                  >
                    {stock?.label}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <span
                      className={cn(
                        "inline-flex rounded-full px-2 py-0.5 text-xs font-body",
                        product.is_active
                          ? "bg-green-400/10 text-green-400"
                          : "bg-red-400/10 text-red-400"
                      )}
                    >
                      {product.is_active ? "Aktivní" : "Neaktivní"}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Link
                        href={`/admin/produkty/${product.id}`}
                        className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-gold/10 hover:text-gold"
                      >
                        <Edit size={16} />
                      </Link>
                      <button className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filtered.length === 0 && (
          <div className="px-6 py-12 text-center text-sm text-white/40 font-body">
            Žádné produkty neodpovídají vyhledávání.
          </div>
        )}
      </div>
    </div>
  );
}
