"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Save } from "lucide-react";

export default function NastaveniPage() {
  const [saved, setSaved] = useState(false);
  const [storeName, setStoreName] = useState("Wood & Steak");
  const [storeDescription, setStoreDescription] = useState(
    "Premiovy cesky steakhouse - e-shop s masem, omackami a vybavenim"
  );
  const [email, setEmail] = useState("info@woodandsteak.cz");
  const [phone, setPhone] = useState("+420 222 333 444");
  const [street, setStreet] = useState("Dlouha 12");
  const [city, setCity] = useState("Praha 1");
  const [zip, setZip] = useState("110 00");

  const [deliveryAreas, setDeliveryAreas] = useState(
    "Praha 1-10, Brno, Plzen, Ostrava"
  );
  const [minOrder, setMinOrder] = useState("500");
  const [freeShippingFrom, setFreeShippingFrom] = useState("2000");
  const [shippingCost, setShippingCost] = useState("149");

  const [instagram, setInstagram] = useState(
    "https://instagram.com/woodandsteak"
  );
  const [facebook, setFacebook] = useState(
    "https://facebook.com/woodandsteak"
  );
  const [tiktok, setTiktok] = useState("");

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-heading text-2xl text-white">Nastaveni</h1>
          <p className="mt-1 text-sm text-white/50 font-body">
            Konfigurace obchodu a kontaktnich udaju
          </p>
        </div>
        <button
          onClick={handleSave}
          className="inline-flex items-center gap-2 rounded-lg bg-gold px-6 py-2.5 text-sm font-body font-medium text-black transition-colors hover:bg-gold-light"
        >
          <Save size={16} />
          {saved ? "Ulozeno!" : "Ulozit nastaveni"}
        </button>
      </div>

      <div className="space-y-6">
        {/* Store info */}
        <div className="rounded-xl border border-gold/10 bg-off-black p-6">
          <h2 className="mb-4 font-heading text-lg text-white">
            Informace o obchodu
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Nazev obchodu
              </label>
              <input
                type="text"
                value={storeName}
                onChange={(e) => setStoreName(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Popis obchodu
              </label>
              <textarea
                rows={3}
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white resize-none"
              />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="rounded-xl border border-gold/10 bg-off-black p-6">
          <h2 className="mb-4 font-heading text-lg text-white">
            Kontaktni udaje
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                E-mail
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Telefon
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Ulice
              </label>
              <input
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  Mesto
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-body text-white/60">
                  PSC
                </label>
                <input
                  type="text"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="rounded-xl border border-gold/10 bg-off-black p-6">
          <h2 className="mb-4 font-heading text-lg text-white">
            Doruceni a objednavky
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Oblasti doruceni
              </label>
              <input
                type="text"
                value={deliveryAreas}
                onChange={(e) => setDeliveryAreas(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Minimalni objednavka (Kc)
              </label>
              <input
                type="number"
                value={minOrder}
                onChange={(e) => setMinOrder(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Doprava zdarma od (Kc)
              </label>
              <input
                type="number"
                value={freeShippingFrom}
                onChange={(e) => setFreeShippingFrom(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Cena dopravy (Kc)
              </label>
              <input
                type="number"
                value={shippingCost}
                onChange={(e) => setShippingCost(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
          </div>
        </div>

        {/* Social links */}
        <div className="rounded-xl border border-gold/10 bg-off-black p-6">
          <h2 className="mb-4 font-heading text-lg text-white">
            Socialni site
          </h2>
          <div className="space-y-4">
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Instagram
              </label>
              <input
                type="url"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                Facebook
              </label>
              <input
                type="url"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-body text-white/60">
                TikTok
              </label>
              <input
                type="url"
                value={tiktok}
                onChange={(e) => setTiktok(e.target.value)}
                placeholder="https://tiktok.com/@woodandsteak"
                className="w-full rounded-lg border border-gold/10 bg-black px-4 py-2.5 text-sm font-body text-white placeholder:text-white/30"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
