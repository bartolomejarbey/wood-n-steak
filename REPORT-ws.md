# Wood & Steak — Setup Report
Dokonceno: 2026-04-15

## Prehled
- Projekt vytvoren v: ~/Downloads/wood-and-steak/
- Tech stack: Next.js 16 (App Router), TypeScript, Tailwind CSS v4, Supabase
- Design: dark luxury (zlata #A48742 + tmave zelena #00221E + cerna), Playfair Display + DM Sans
- Build: USPESNY (22 rout, 0 TypeScript chyb)

## Hotove stranky

### Shop (frontend)
- [x] Homepage (8 sekci: hero, brand statement, kategorie, featured produkty, o restauraci, jak nakupovat, doruceni, newsletter)
- [x] /sortiment — katalog s vyhledavanim, filtry, razenim
- [x] /sortiment/[slug] — kategorie s breadcrumb
- [x] /produkt/[slug] — detail produktu s galerii, pridat do kosiku, doporucene produkty
- [x] /kosik — kosik s min. objednavkou 500 Kc, quantity selector
- [x] /pokladna — checkout formular (kontakt, adresa, firma toggle, platba, GDPR)
- [x] /pokladna/dekujeme — podekovani s cislem objednavky
- [x] /ucet — prihlaseni/registrace + dashboard (simulovany auth)
- [x] /jak-nakupovat — 4 kroky s ikonami
- [x] /obchodni-podminky — placeholder
- [x] /kontakt — kontaktni info + formular
- [x] /o-restauraci — info o steakhouse + odkaz na web

### Admin panel
- [x] /admin — dashboard se statistikami
- [x] /admin/produkty — seznam + edit formular
- [x] /admin/kategorie — seznam kategorii
- [x] /admin/objednavky — prehled objednavek
- [x] /admin/zakaznici — seznam zakazniku
- [x] /admin/newsletter — odberatele + export
- [x] /admin/nastaveni — nastaveni obchodu

### API
- [x] /api/newsletter — prihlaseni k odberu
- [x] /api/comgate/create-payment — vytvoreni platby
- [x] /api/comgate/callback — callback z Comgate

## Komponenty
- Header (sticky, pruhledny -> tmave pozadi pri scrollu, dropdown menu, mobile hamburger)
- Footer (4 sloupce, zlate socialni ikony)
- ProductCard (tmava karta, hover zoom + zlaty border, badge, pridat do kosiku)
- ImagePlaceholder (pro produkty, kategorie, hero, restauraci)
- CartContext (localStorage persistence, add/remove/update/clear)

## Supabase
- Schema vytvoreno v supabase/schema.sql
- Seed data v supabase/seed.sql
- Tabulky: categories, products, customers, customer_addresses, orders, order_items, newsletter_subscribers, site_settings
- RLS policies pro verejne cteni kategorii/produktu, vlastni data zakazniku
- Full-text search na produktech
- Triggery pro updated_at a ts_vector
- Seed: 6 kategorii, 21 placeholder produktu

## Platebni integrace
- Comgate create-payment + callback (struktura pripravena, ceka na API klice)
- QR kod SPD format pro bankovni prevody
- Email sablona potvrzeni objednavky (HTML, dark theme)

## Co potrebuje klient dodat
1. **Supabase projekt** — URL + ANON_KEY + SERVICE_ROLE_KEY do .env.local
2. **Skutecne fotky produktu** — zatim placeholdery, nahraji do Supabase Storage
3. **Comgate API klice** — COMGATE_MERCHANT_ID + COMGATE_SECRET
4. **Resend API klic** — RESEND_API_KEY pro emailove notifikace
5. **Bankovni ucet** — pro QR platby (IBAN + cislo uctu)
6. **Telefonni cislo** — finalni cislo pro kontakt
7. **Finalni seznam produktu a ceny** — aktualni sortiment a cenova politika
8. **Logo (SVG/PNG)** — zatim textove logo "WOOD & STEAK"

## Jak spustit
```bash
cd ~/Downloads/wood-and-steak
npm install
# Doplnit .env.local se Supabase udaji:
# NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
# NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx
# SUPABASE_SERVICE_ROLE_KEY=xxx

# Spustit schema.sql a seed.sql v Supabase SQL editoru

npm run dev
# Otevre se na http://localhost:3000
```

## Struktura projektu
```
src/
  app/
    (shop)/           — frontend e-shop
      layout.tsx      — header + footer + cart provider
      page.tsx        — homepage
      sortiment/      — katalog
      produkt/        — detail produktu
      kosik/          — kosik
      pokladna/       — checkout + dekujeme
      ucet/           — prihlaseni/ucet
      jak-nakupovat/
      obchodni-podminky/
      kontakt/
      o-restauraci/
    (admin)/
      admin/          — admin panel (dashboard, CRUD)
    api/
      newsletter/     — newsletter API
      comgate/        — platebni brana
  components/
    shop/             — Header, Footer, ProductCard, ImagePlaceholder
  context/
    CartContext.tsx    — kosik s localStorage
  lib/
    data.ts           — staticka data pro dev bez Supabase
    types.ts          — TypeScript typy
    utils.ts          — pomocne funkce (formatPrice, generateOrderNumber, cn)
    supabase*.ts      — Supabase klienti
    email-templates.ts — email sablony
    qr.ts             — QR kod generovani
  middleware.ts       — admin route protection
supabase/
  schema.sql          — databazove schema
  seed.sql            — seed data
```

## Git commits
- `6712ee8` — Initial commit from Create Next App
- `20991d1` — feat: Wood & Steak e-shop - complete initial build

## Design system
- **Barvy**: gold (#A48742), forest (#00221E), cream (#F5F1E8), off-black (#1A1A1A)
- **Fonty**: Playfair Display (nadpisy), DM Sans (body)
- **Buttony**: zlate outline (border-gold) s hover fill, nebo plne zlate na tmavem
- **Karty**: off-black bg, hover zlaty border + zoom obrazku
- **Oddelovace**: 1px solid gold, gold-divider CSS class
- **Animace**: fadeInUp, hover transitions 300ms
