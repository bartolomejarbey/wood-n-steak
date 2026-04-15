"use client";

import { useState } from "react";
import { Settings, Save } from "lucide-react";

export default function AdminSettingsPage() {
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Settings className="w-6 h-6 text-gold" strokeWidth={1.5} />
          <h1 className="font-heading text-2xl text-white">Nastaveni</h1>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center gap-2 px-6 py-2.5 bg-gold text-black font-body text-sm font-semibold tracking-wider uppercase hover:bg-gold-light transition-colors"
        >
          <Save className="w-4 h-4" strokeWidth={1.5} />
          {saved ? "Ulozeno!" : "Ulozit"}
        </button>
      </div>

      <div className="space-y-8">
        {/* Store info */}
        <div className="bg-off-black border border-gold/10 p-6">
          <h2 className="font-heading text-lg text-gold mb-4">Informace o obchodu</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Nazev</label>
              <input defaultValue="Wood & Steak" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">ICO</label>
              <input defaultValue="XXXXXXXX" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Adresa</label>
              <input defaultValue="Vinohrady, Praha 2" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">PSC</label>
              <input defaultValue="120 00" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-off-black border border-gold/10 p-6">
          <h2 className="font-heading text-lg text-gold mb-4">Kontakt</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Email</label>
              <input defaultValue="info@woodandsteak.cz" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Telefon</label>
              <input defaultValue="+420 XXX XXX XXX" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
          </div>
        </div>

        {/* Delivery */}
        <div className="bg-off-black border border-gold/10 p-6">
          <h2 className="font-heading text-lg text-gold mb-4">Doruceni</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Minimalni objednavka (Kc)</label>
              <input type="number" defaultValue={500} className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Cena dopravy (Kc)</label>
              <input type="number" defaultValue={0} className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Oblasti rozvozu (oddelene carkou)</label>
              <input defaultValue="Praha a okoli, Praha-vychod, Mlada Boleslav, Kladno, Melnik, Nymburk" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
          </div>
        </div>

        {/* Social */}
        <div className="bg-off-black border border-gold/10 p-6">
          <h2 className="font-heading text-lg text-gold mb-4">Socialni site</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Instagram</label>
              <input defaultValue="https://instagram.com/woodandsteak" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Facebook</label>
              <input defaultValue="" placeholder="https://facebook.com/..." className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm placeholder:text-white/20 focus:border-gold transition-colors" />
            </div>
            <div>
              <label className="block font-body text-xs text-white/40 uppercase tracking-wider mb-1">Web restaurace</label>
              <input defaultValue="https://www.woodandsteak.cz/" className="w-full px-3 py-2 bg-black border border-gold/20 text-white font-body text-sm focus:border-gold transition-colors" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
