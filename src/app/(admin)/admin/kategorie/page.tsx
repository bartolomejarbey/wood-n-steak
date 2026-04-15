import { cn } from "@/lib/utils";
import { getCategories, getProducts } from "@/lib/data";
import { GripVertical, Plus, Edit, Trash2 } from "lucide-react";

const allCategories = getCategories();
const allProducts = getProducts();

function getProductCount(categoryId: string): number {
  return allProducts.filter((p) => p.category_id === categoryId).length;
}

export default function KategoriePage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white">Kategorie</h1>
          <p className="mt-1 text-sm text-white/50 font-body">
            Sprava kategorii produktu
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-body font-medium text-black transition-colors hover:bg-gold-light">
          <Plus size={16} />
          Pridat kategorii
        </button>
      </div>

      <div className="overflow-x-auto rounded-xl border border-gold/10 bg-off-black">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gold/10 text-left">
              <th className="w-10 px-4 py-3" />
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Nazev
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Slug
              </th>
              <th className="px-6 py-3 text-xs font-body font-medium uppercase tracking-wider text-white/40">
                Produktu
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
            {allCategories.map((category) => (
              <tr
                key={category.id}
                className="transition-colors hover:bg-white/[0.02]"
              >
                <td className="px-4 py-4">
                  <GripVertical
                    size={16}
                    className="cursor-grab text-white/20"
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white">
                  {category.name}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/40">
                  /{category.slug}
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-sm font-body text-white/60">
                  {getProductCount(category.id)}
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={cn(
                      "inline-flex rounded-full px-2 py-0.5 text-xs font-body",
                      category.is_active
                        ? "bg-green-400/10 text-green-400"
                        : "bg-red-400/10 text-red-400"
                    )}
                  >
                    {category.is_active ? "Aktivni" : "Neaktivni"}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-gold/10 hover:text-gold">
                      <Edit size={16} />
                    </button>
                    <button className="rounded-lg p-1.5 text-white/40 transition-colors hover:bg-red-500/10 hover:text-red-400">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
