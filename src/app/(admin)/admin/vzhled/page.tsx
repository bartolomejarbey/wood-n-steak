"use client";

import { useEffect, useState } from "react";
import { Save, RotateCcw } from "lucide-react";
import { toast } from "sonner";

type AppearanceData = {
  heroTitle: string;
  heroSubtitle: string;
  heroCta: string;
  brandOverline: string;
  brandHeading: string;
  brandStatement: string;
  aboutLead: string;
  aboutBody: string;
  footerTagline: string;
};

const DEFAULT: AppearanceData = {
  heroTitle: "Steak jako z restaurace",
  heroSubtitle: "Prémiové maso a domácí omáčky z Wood & Steak — Vinohrady, Praha.",
  heroCta: "Prohlédnout sortiment",
  brandOverline: "Vítejte",
  brandHeading: "Vítejte na e-shopu Wood & Steak",
  brandStatement:
    "Steakhouse ve Vinohradech nedaleko Náměstí Míru. Přinášíme vám vše, co potřebujete pro přípravu dokonalého steaku.",
  aboutLead: "Z restaurace ve Vinohradech",
  aboutBody:
    "Wood & Steak je steakhouse ve Vinohradech nedaleko Náměstí Míru, kde servírujeme pečlivě vybírané maso a domácí omáčky.",
  footerTagline:
    "Prémiové maso, domácí omáčky a vybavení pro přípravu steaku jako z restaurace.",
};

const STORAGE_KEY = "ws-appearance";

export default function VzhledPage() {
  const [data, setData] = useState<AppearanceData>(DEFAULT);
  const [dirty, setDirty] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setData({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {
      // ignore
    }
  }, []);

  function update<K extends keyof AppearanceData>(key: K, value: AppearanceData[K]) {
    setData((prev) => ({ ...prev, [key]: value }));
    setDirty(true);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      toast.success("Texty uloženy");
      setDirty(false);
    } catch {
      toast.error("Uložení se nezdařilo");
    }
  }

  function reset() {
    if (confirm("Obnovit výchozí texty?")) {
      setData(DEFAULT);
      localStorage.removeItem(STORAGE_KEY);
      setDirty(false);
      toast.success("Obnoveno");
    }
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <p className="overline text-gold">Obsah</p>
          <h1 className="font-heading text-3xl text-white mt-2">Vzhled webu</h1>
          <p className="text-sm text-white/50 mt-1">
            Úpravy textů na veřejném webu. Změny se projeví okamžitě.
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={reset}
            className="inline-flex items-center gap-2 px-4 py-2 border border-white/20 text-white/70 text-xs tracking-[0.15em] uppercase rounded-full hover:border-gold/40 hover:text-gold transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Obnovit
          </button>
          <button
            onClick={save}
            disabled={!dirty}
            className="inline-flex items-center gap-2 px-4 py-2 bg-gold text-black text-xs tracking-[0.15em] uppercase rounded-full hover:bg-gold-light disabled:opacity-50"
          >
            <Save className="w-4 h-4" />
            Uložit
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <Group title="Hero sekce">
          <Field label="Hlavní titulek" value={data.heroTitle} onChange={(v) => update("heroTitle", v)} />
          <Field
            label="Podtitul"
            value={data.heroSubtitle}
            onChange={(v) => update("heroSubtitle", v)}
            multiline
          />
          <Field label="Text tlačítka" value={data.heroCta} onChange={(v) => update("heroCta", v)} />
        </Group>

        <Group title="Brand statement">
          <Field label="Overline" value={data.brandOverline} onChange={(v) => update("brandOverline", v)} />
          <Field label="Nadpis" value={data.brandHeading} onChange={(v) => update("brandHeading", v)} />
          <Field
            label="Text"
            value={data.brandStatement}
            onChange={(v) => update("brandStatement", v)}
            multiline
          />
        </Group>

        <Group title="O restauraci">
          <Field label="Lead" value={data.aboutLead} onChange={(v) => update("aboutLead", v)} />
          <Field
            label="Text"
            value={data.aboutBody}
            onChange={(v) => update("aboutBody", v)}
            multiline
          />
        </Group>

        <Group title="Paticka">
          <Field
            label="Tagline"
            value={data.footerTagline}
            onChange={(v) => update("footerTagline", v)}
            multiline
          />
        </Group>
      </div>
    </div>
  );
}

function Group({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="bg-white/5 border border-gold/10 rounded-2xl p-6">
      <h2 className="font-heading text-lg text-white mb-4">{title}</h2>
      <div className="space-y-4">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  multiline,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
}) {
  return (
    <label className="block">
      <span className="text-xs tracking-[0.15em] uppercase text-white/50">{label}</span>
      {multiline ? (
        <textarea
          rows={3}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
        />
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="mt-2 w-full bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-gold outline-none transition-colors"
        />
      )}
    </label>
  );
}
