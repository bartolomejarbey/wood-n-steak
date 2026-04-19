"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { getCategories } from "@/lib/data";
import { ArrowLeft, Upload, Save, X } from "lucide-react";

const allCategories = getCategories();

export default function ProductEditPage() {
  const [name, setName] = useState("Rib Eye Black Angus dry-aged");
  const [slug, setSlug] = useState("rib-eye-black-angus-dry-aged");
  const [description, setDescription] = useState(
    "Skvěle mramorovaný Rib Eye z Black Angus, zrající 28 dní v našem zracím boxu."
  );
  const [shortDescription, setShortDescription] = useState(
    "Dry-aged 28 dní, intenzivní chuť"
  );
  const [categoryId, setCategoryId] = useState(
    "a1000000-0000-0000-0000-000000000001"
  );
  const [price, setPrice] = useState("1890");
  const [unit, setUnit] = useState("kg");
  const [weightInfo, setWeightInfo] = useState("1 kg");
  const [stockStatus, setStockStatus] = useState("in_stock");
  const [isActive, setIsActive] = useState(true);
  const [isFeatured, setIsFeatured] = useState(true);
  const [badge, setBadge] = useState("Bestseller");

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link
          href="/admin/produkty"
          className="rounded-lg p-2 text-white/40 transition-colors hover:bg-gold/10 hover:text-gold"
        >
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="font-heading text-2xl text-white">Upravit produkt</h1>
          <p className="mt-1 text-sm text-white/50 font-body">
            Editace produktu a jeho vlastnosti
          </p>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main form */}
        <div className="space-y-6 lg:col-span-2">
          {/* Basic info */}
          <div className="rounded-xl border border-gold/10 bg-off-black p-6">
            <h2 className="mb-4 font-heading text-lg text-white">
              Základní údaje
            </h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Název produktu
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Slug (URL)
                </label>
                <input
                  type="text"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Krátký popis
                </label>
                <input
                  type="text"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white placeholder:text-white/30"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Popis
                </label>
                <textarea
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white placeholder:text-white/30 resize-none"
                />
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="rounded-xl border border-gold/10 bg-off-black p-6">
            <h2 className="mb-4 font-heading text-lg text-white">
              Cena a jednotky
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Cena (Kč)
                </label>
                <input
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Jednotka
                </label>
                <select
                  value={unit}
                  onChange={(e) => setUnit(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                >
                  <option value="kg">kg</option>
                  <option value="ks">ks</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Hmotnost / objem
                </label>
                <input
                  type="text"
                  value={weightInfo}
                  onChange={(e) => setWeightInfo(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                />
              </div>
            </div>
          </div>

          {/* Image upload */}
          <div className="rounded-xl border border-gold/10 bg-off-black p-6">
            <h2 className="mb-4 font-heading text-lg text-white">Obrázky</h2>
            <div className="flex items-center justify-center rounded-lg border-2 border-dashed border-gold/20 bg-black/50 px-6 py-12">
              <div className="text-center">
                <Upload size={32} className="mx-auto text-gold/40" />
                <p className="mt-2 text-sm text-white/50 font-body">
                  Přetáhněte obrázky sem nebo klikněte pro výběr
                </p>
                <p className="mt-1 text-xs text-white/30 font-body">
                  PNG, JPG, WebP do 5 MB
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Status */}
          <div className="rounded-xl border border-gold/10 bg-off-black p-6">
            <h2 className="mb-4 font-heading text-lg text-white">Stav</h2>
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Kategorie
                </label>
                <select
                  value={categoryId}
                  onChange={(e) => setCategoryId(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                >
                  {allCategories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Skladem
                </label>
                <select
                  value={stockStatus}
                  onChange={(e) => setStockStatus(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                >
                  <option value="in_stock">Skladem</option>
                  <option value="on_order">Na objednávku</option>
                  <option value="out_of_stock">Vyprodáno</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Štítek (badge)
                </label>
                <input
                  type="text"
                  value={badge}
                  onChange={(e) => setBadge(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                />
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-white/60">
                  Aktivní
                </span>
                <button
                  onClick={() => setIsActive(!isActive)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    isActive ? "bg-gold" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      isActive && "translate-x-5"
                    )}
                  />
                </button>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-body text-white/60">
                  Doporučený
                </span>
                <button
                  onClick={() => setIsFeatured(!isFeatured)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors",
                    isFeatured ? "bg-gold" : "bg-white/10"
                  )}
                >
                  <span
                    className={cn(
                      "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white transition-transform",
                      isFeatured && "translate-x-5"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="space-y-3">
            <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-4 py-2.5 text-sm font-body font-medium text-black transition-colors hover:bg-gold-light">
              <Save size={16} />
              Uložit produkt
            </button>
            <Link
              href="/admin/produkty"
              className="flex w-full items-center justify-center gap-2 rounded-lg border border-gold/10 px-4 py-2.5 text-sm font-body text-white/60 transition-colors hover:border-gold/30 hover:text-white"
            >
              <X size={16} />
              Zrušit
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
