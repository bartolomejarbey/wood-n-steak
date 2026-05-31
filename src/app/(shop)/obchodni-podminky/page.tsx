import type { Metadata } from "next";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Obchodní podmínky",
  description:
    "Obchodní podmínky e-shopu Wood & Steak s.r.o. pro nákup hovězího masa, dry-aged steaků, omáček a vybavení. Platné od května 2026.",
  path: "/obchodni-podminky",
});

const sections = [
  {
    id: "uvod",
    title: "1. Úvodní ustanovení",
    body: [
      "Tyto obchodní podmínky (dále jen „podmínky“) upravují v souladu s ustanovením § 1751 odst. 1 zákona č. 89/2012 Sb., občanský zákoník, ve znění pozdějších předpisů (dále jen „občanský zákoník“), vzájemná práva a povinnosti smluvních stran vzniklé v souvislosti nebo na základě kupní smlouvy uzavírané mezi prodávajícím a kupujícím prostřednictvím internetového obchodu na adrese woodandsteak.cz.",
      "Prodávajícím je společnost Wood & Steak s.r.o., se sídlem Belgická 24, Praha 2 — Vinohrady, 120 00, zapsaná v obchodním rejstříku vedeném u Městského soudu v Praze (dále jen „prodávající“).",
      "Kupujícím se rozumí fyzická osoba — spotřebitel ve smyslu § 419 občanského zákoníku, nebo podnikatel, který při uzavírání smlouvy jedná v rámci své podnikatelské činnosti (dále jen „kupující“).",
      "Tyto podmínky se nevztahují na případy, kdy je kupující právnickou osobou či osobou jednající při objednávce v rámci své podnikatelské činnosti; v takovém případě se na vztah aplikují tyto podmínky přiměřeně, s vyloučením ustanovení o ochraně spotřebitele.",
    ],
  },
  {
    id: "uzavreni",
    title: "2. Uzavření kupní smlouvy",
    body: [
      "Veškerá prezentace zboží umístěná ve webovém rozhraní obchodu je informativního charakteru a prodávající není povinen uzavřít kupní smlouvu ohledně tohoto zboží. Ustanovení § 1732 odst. 2 občanského zákoníku se nepoužije.",
      "Pro objednání zboží vyplní kupující objednávkový formulář ve webovém rozhraní. Před odesláním objednávky je kupujícímu umožněno zkontrolovat a měnit údaje, které do objednávky vložil.",
      "Kupní smlouva je uzavřena okamžikem, kdy kupující obdrží od prodávajícího potvrzení objednávky na e-mail uvedený v objednávce. Prodávající je vždy oprávněn v závislosti na charakteru objednávky (množství zboží, výše kupní ceny) požádat kupujícího o dodatečné potvrzení objednávky.",
      "Kupující bere na vědomí, že prodávající není povinen uzavřít kupní smlouvu, a to zejména s osobami, které dříve podstatným způsobem porušily smlouvu nebo tyto podmínky.",
    ],
  },
  {
    id: "cena",
    title: "3. Cena zboží a platební podmínky",
    body: [
      "Ceny zboží jsou uvedeny včetně daně z přidané hodnoty a všech souvisejících poplatků. Ceny zůstávají v platnosti po dobu, kdy jsou zobrazeny ve webovém rozhraní obchodu.",
      "Minimální hodnota objednávky činí 500 Kč včetně DPH. Cena dopravy se řídí článkem 4.",
      "Cenu zboží a případné náklady spojené s dodáním zboží může kupující uhradit těmito způsoby: a) platbou kartou online prostřednictvím platební brány Comgate; b) bankovním převodem na účet prodávajícího — pokyny a QR kód jsou součástí potvrzení objednávky; c) dobírkou při převzetí.",
      "V případě bezhotovostní platby je kupní cena splatná do 5 pracovních dnů od uzavření smlouvy. V případě platby dobírkou je kupní cena splatná při převzetí zboží.",
      "Daňový doklad — fakturu — vystaví prodávající kupujícímu po uhrazení ceny zboží a zašle jej v elektronické podobě na e-mail kupujícího.",
    ],
  },
  {
    id: "doprava",
    title: "4. Dodací podmínky",
    body: [
      "Prodávající zajišťuje rozvoz objednaného zboží vlastními kurýry v Praze a blízkém okolí. Doprava je zdarma pro objednávky nad 500 Kč.",
      "Vzhledem k charakteru zboží (čerstvé maso, dry-aged steaky, domácí omáčky) je doručení vždy domluveno individuálně. Prodávající kontaktuje kupujícího telefonicky nebo e-mailem do 24 hodin od přijetí objednávky a sjedná přesný termín předání.",
      "Maso je přepravováno v chladicích boxech s monitoringem teploty. Kupující je povinen zajistit převzetí v dohodnutém čase a v případě jeho nedodržení nese odpovědnost za případné znehodnocení zboží.",
      "V případě, že je kupující v prodlení s převzetím delším než 24 hodin od dohodnutého termínu, vyhrazuje si prodávající právo odstoupit od smlouvy a požadovat náhradu nákladů na neúspěšné doručení ve výši 200 Kč.",
    ],
  },
  {
    id: "odstoupeni",
    title: "5. Odstoupení od smlouvy",
    body: [
      "Kupující — spotřebitel má v souladu s § 1829 občanského zákoníku právo od kupní smlouvy odstoupit bez udání důvodu, a to do 14 dnů od převzetí zboží.",
      "Toto právo se však nevztahuje na dodávku zboží, které podléhá rychlé zkáze, jakož i zboží, které bylo po dodání nenávratně smíseno s jiným zbožím (§ 1837 písm. e) občanského zákoníku). Z tohoto důvodu nelze odstoupit od smlouvy u čerstvého masa, dry-aged steaků, čerstvých bylinek, otevřených omáček ani jiných potravin podléhajících rychlé zkáze.",
      "Právo na odstoupení se naopak vztahuje na neporušené uzavřené trvanlivé výrobky (nože, prkénka, koření v originálním balení) a další zboží neporušující výše uvedenou výjimku.",
      "V případě uplatnění práva na odstoupení zašle kupující prodávajícímu oznámení o odstoupení na info@woodandsteak.cz spolu s číslem objednávky. Zboží zašle nebo předá prodávajícímu na adresu Belgická 24, Praha 2 nejpozději do 14 dnů od odstoupení.",
      "Prodávající vrátí kupujícímu peněžní prostředky včetně nákladů na dodání zboží (vyjma dodatečných nákladů vzniklých zvoleným způsobem dodání jiným než nejlevnějším) do 14 dnů od odstoupení, stejným způsobem, jakým je od kupujícího přijal. Prodávající není povinen vrátit přijaté peněžní prostředky kupujícímu dříve, než mu kupující zboží předá nebo prokáže, že zboží podnikateli odeslal.",
    ],
  },
  {
    id: "reklamace",
    title: "6. Práva z vadného plnění",
    body: [
      "Práva a povinnosti smluvních stran ohledně práv z vadného plnění se řídí příslušnými obecně závaznými předpisy, zejména § 1914 až 1925, § 2099 až 2117 a § 2161 až 2174b občanského zákoníku a zákonem č. 634/1992 Sb., o ochraně spotřebitele.",
      "Prodávající odpovídá kupujícímu, že zboží při převzetí nemá vady. U potravin lze vady reklamovat do data minimální trvanlivosti, resp. do data spotřeby. U trvanlivého zboží (nože, prkénka, vybavení) odpovídá prodávající za vady, které se projeví v zákonné záruční době 24 měsíců od převzetí.",
      "Reklamaci je kupující povinen uplatnit u prodávajícího bez zbytečného odkladu po zjištění vady. U čerstvého masa a potravin podléhajících zkáze je třeba reklamaci uplatnit nejpozději do 24 hodin od převzetí, a to fotograficky doloženou zprávou na info@woodandsteak.cz.",
      "Reklamaci prodávající vyřídí bez zbytečného odkladu, nejpozději však do 30 dnů od jejího uplatnění, nedohodnou-li se strany jinak.",
    ],
  },
  {
    id: "kvalita",
    title: "7. Kvalita zboží a uchovávání",
    body: [
      "Veškeré hovězí maso pochází z prověřených českých a evropských farem s důrazem na welfare zvířat. Dry-aged steaky zrají v profesionálních boxech DRY AGER při řízené teplotě, vlhkosti a UV sterilizaci.",
      "Po převzetí zboží je kupující povinen uchovávat čerstvé maso při teplotě 0–4 °C a spotřebovat jej do data uvedeného na štítku produktu. Otevřené omáčky uchovávejte v lednici a spotřebujte do 14 dnů od otevření.",
      "Prodávající neodpovídá za vady vzniklé nesprávným uchováváním nebo manipulací po převzetí zboží kupujícím.",
    ],
  },
  {
    id: "udaje",
    title: "8. Ochrana osobních údajů",
    body: [
      "Zpracování osobních údajů kupujícího probíhá v souladu s Nařízením (EU) 2016/679 (GDPR) a je podrobně popsáno v samostatném dokumentu Ochrana osobních údajů, dostupném na woodandsteak.cz/ochrana-osobnich-udaju.",
      "Odesláním objednávky kupující potvrzuje, že se s těmito zásadami seznámil.",
    ],
  },
  {
    id: "spory",
    title: "9. Mimosoudní řešení sporů",
    body: [
      "K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je příslušná Česká obchodní inspekce, se sídlem Štěpánská 567/15, Praha 2, 120 00, IČ: 000 20 869, internetová adresa: www.coi.cz.",
      "Platformu pro řešení sporů on-line nacházející se na internetové adrese ec.europa.eu/consumers/odr je možné využít při řešení sporů mezi prodávajícím a kupujícím z kupní smlouvy.",
      "Prodávající je oprávněn k prodeji zboží na základě živnostenského oprávnění. Živnostenskou kontrolu provádí v rámci své působnosti příslušný živnostenský úřad. Dozor nad oblastí ochrany osobních údajů vykonává Úřad pro ochranu osobních údajů.",
    ],
  },
  {
    id: "zaverecna",
    title: "10. Závěrečná ustanovení",
    body: [
      "Pokud vztah založený kupní smlouvou obsahuje mezinárodní (zahraniční) prvek, pak strany sjednávají, že vztah se řídí českým právem. Tímto nejsou dotčena práva spotřebitele vyplývající z obecně závazných právních předpisů.",
      "Je-li některé ustanovení obchodních podmínek neplatné nebo neúčinné, nebo se takovým stane, namísto neplatných ustanovení nastoupí ustanovení, jehož smysl se neplatnému ustanovení co nejvíce přibližuje. Neplatností nebo neúčinností jednoho ustanovení není dotčena platnost ostatních ustanovení.",
      "Změny obchodních podmínek mohou být provedeny pouze v písemné formě. Tyto obchodní podmínky nabývají účinnosti dnem jejich zveřejnění a vztahují se na objednávky uskutečněné od tohoto data.",
      "Kontaktní údaje prodávajícího: Wood & Steak s.r.o., Belgická 24, Praha 2 — Vinohrady, 120 00, e-mail: info@woodandsteak.cz, telefon: +420 777 123 456.",
    ],
  },
];

export default function TermsPage() {
  return (
    <main className="bg-cream text-black">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 lg:py-20">
        <Breadcrumbs
          tone="light"
          items={[
            { label: "Úvod", href: "/" },
            { label: "Obchodní podmínky" },
          ]}
        />
        <div className="mt-8">
          <SectionHeading
            tone="light"
            align="left"
            overline="Právní informace"
            title="Obchodní podmínky"
            subtitle="Podmínky nákupu v internetovém obchodě Wood & Steak. Platné od května 2026."
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
