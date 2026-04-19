# Wood & Steak — Overnight Premium Polish Report

**Start:** 2026-04-19 (overnight run)
**Engineer:** Claude Opus 4.7 autonomní agent
**Plán:** `/Users/adstart_rota/.claude/plans/toto-je-kompletn-overnight-crispy-nebula.md`

---

## Baseline stav (před polish)

### Tech
- Next.js **16.2.3** s Turbopack, React 19.2.4, Tailwind CSS v4
- TypeScript strict, 0 chyb při build
- 22 routes, sedm v admin panelu
- Dev server: `http://localhost:3100` (port 3000 obsazený cizí Next.js 14 aplikací)

### Git baseline
- Branch: `main`
- Commit před polish: `1fd2621` refactor: improve admin settings page

### Environment variables — status (pouze přítomnost)
- `NEXT_PUBLIC_SUPABASE_URL` — set
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — set
- `SUPABASE_SERVICE_ROLE_KEY` — set
- `COMGATE_MERCHANT_ID` — set (likely test)
- `COMGATE_SECRET` — set
- `RESEND_API_KEY` — set
- `BANK_IBAN` — set
- `BANK_ACCOUNT` — set

*Skutečná konektivita k Supabase ověřena v Úloze 13.*

### Baseline screenshoty
32 screenshotů zachyceno v `screenshots/before/` — 16 routes × desktop (1440×900) + mobile (375×812).

### Known issues baseline
- `public/images/hero-*.jpg` = 6.3/6.2/6.2/13 MB (CELKEM 32 MB) → nutný reencode do WebP
- Palette `#1A120B` místo briefem požadovaného `#00221E`
- Missing routes: `/prihlaseni`, `/registrace`, `/ochrana-osobnich-udaju`, `/admin/objednavky/[id]`, `/admin/zakaznici/[id]`, `/admin/vzhled`, custom 404
- Missing packages: `framer-motion`, `sonner`, `recharts`, `@dnd-kit/*`
- Admin panel má UI, ale 0% wiring na Supabase

---

## Progress log

### ✅ Úloha 1 — Diagnostika + baseline
**Hotovo:**
- Uncommitted state zkommitován jako snapshot
- `.next` cache vyčištěná
- Dev server běží na portu 3100 (Turbopack, `Ready in 210ms`)
- Baseline screenshoty zachyceny (32 png)
- `@playwright/test` nainstalováno jako devDep
- `scripts/screenshot.mjs` vytvořen (reusable)
- REPORT-polish.md vytvořen

### ⏳ Další úlohy — viz plán
