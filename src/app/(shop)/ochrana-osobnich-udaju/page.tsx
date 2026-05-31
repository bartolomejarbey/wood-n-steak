import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Ochrana osobních údajů",
  description:
    "Zásady zpracování osobních údajů Wood & Steak s.r.o. v souladu s GDPR. Jaké údaje zpracováváme, za jakým účelem, vaše práva a kontakt.",
  path: "/ochrana-osobnich-udaju",
});

const sections = [
  {
    id: "uvod",
    title: "1. Úvodní ustanovení",
    body: [
      "Tyto zásady zpracování osobních údajů popisují, jak společnost Wood & Steak s.r.o. (dále jen „správce“) shromažďuje, zpracovává a chrání osobní údaje svých zákazníků v souladu s Nařízením Evropského parlamentu a Rady (EU) 2016/679 (GDPR).",
    ],
  },
  {
    id: "sprava",
    title: "2. Správce údajů",
    body: [
      "Wood & Steak s.r.o., Belgická 24, Praha 2 — Vinohrady, 120 00, IČO: doplníme, DIČ: doplníme.",
      "Kontakt pro ochranu osobních údajů: info@woodandsteak.cz",
    ],
  },
  {
    id: "udaje",
    title: "3. Jaké údaje zpracováváme",
    body: [
      "Zpracováváme pouze údaje, které nám poskytnete při registraci účtu nebo při objednávce: jméno a příjmení, e-mail, telefonní číslo, doručovací a fakturační adresu, historii objednávek a případně firemní údaje (IČO, DIČ).",
    ],
  },
  {
    id: "ucel",
    title: "4. Účel zpracování",
    body: [
      "Osobní údaje zpracováváme za účelem vyřízení objednávky, doručení zboží, vystavení daňového dokladu, vedení zákaznického účtu a komunikace související s nákupem.",
      "Se souhlasem rovněž pro zasílání obchodních sdělení (newsletter).",
    ],
  },
  {
    id: "doba",
    title: "5. Doba uchování",
    body: [
      "Údaje související s objednávkou uchováváme po dobu 10 let z důvodu zákonné povinnosti. Údaje z registrace účtu uchováváme po dobu jeho aktivity. Údaje k marketingu zpracováváme do odvolání souhlasu.",
    ],
  },
  {
    id: "prijemci",
    title: "6. Příjemci údajů",
    body: [
      "Údaje předáváme pouze důvěryhodným zpracovatelům — doručovací službě, poskytovateli platební brány (Comgate), účetnímu a IT dodavatelům (Supabase, Resend).",
    ],
  },
  {
    id: "prava",
    title: "7. Vaše práva",
    body: [
      "Máte právo požadovat přístup ke svým údajům, jejich opravu, výmaz, omezení zpracování, přenos údajů či vznést námitku. Žádost můžete zaslat na info@woodandsteak.cz.",
      "Rovněž máte právo podat stížnost u Úřadu pro ochranu osobních údajů (www.uoou.cz).",
    ],
  },
  {
    id: "cookies",
    title: "8. Cookies",
    body: [
      "Web používá technicky nezbytné cookies pro fungování košíku a účtu. Analytické a marketingové cookies používáme pouze s vaším souhlasem.",
    ],
  },
  {
    id: "zaverecna",
    title: "9. Závěrečná ustanovení",
    body: [
      "Tyto zásady nabývají účinnosti dnem jejich zveřejnění. Správce si vyhrazuje právo je kdykoli aktualizovat.",
    ],
  },
];

export default function GdprPage() {
  return (
    <main className="bg-cream text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Úvod", href: "/" },
            { label: "Ochrana osobních údajů" },
          ]}
        />
        <div className="mt-8">
          <SectionHeading
            tone="light"
            align="left"
            overline="Ochrana údajů"
            title="Ochrana osobních údajů"
            subtitle="Vaše soukromí je pro nás důležité. Níže najdete podrobné zásady zpracování osobních údajů."
          />
        </div>

        <div className="mt-14 grid lg:grid-cols-[240px_1fr] gap-10">
          <aside className="hidden lg:block">
            <nav className="sticky top-28 space-y-2 text-sm">
              <p className="overline mb-3">Obsah</p>
              {sections.map((s) => (
                <a
                  key={s.id}
                  href={`#${s.id}`}
                  className="block text-black/60 hover:text-gold-dark transition-colors"
                >
                  {s.title}
                </a>
              ))}
            </nav>
          </aside>

          <article className="prose prose-neutral max-w-none space-y-10">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-28">
                <h2 className="font-heading text-2xl text-black">{s.title}</h2>
                <div className="mt-4 space-y-3">
                  {s.body.map((p, i) => (
                    <p key={i} className="text-black/70 leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
            <p className="text-xs text-black/40 pt-6 border-t border-black/10">
              Poslední aktualizace: {new Date().toLocaleDateString("cs-CZ")}
            </p>
          </article>
        </div>
      </div>
    </main>
  );
}
