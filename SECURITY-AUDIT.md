# Security & admin audit — Wood & Steak

Audit date: 2026-04-21. Reviewer: Claude. Scope: every API route, every admin
page, proxy/middleware, env usage, Comgate integration, email templates,
`next.config.ts`.

---

## ✅ Fixed in this pass

### CRITICAL (blocks production)

1. **Admin panel now has real auth.**
   - `src/proxy.ts` (Next 16 renamed middleware → proxy) — optimistic gate
     + Supabase session cookie refresh. Any unauthenticated request to
     `/admin/**` or `/ucet/**` is redirected to `/prihlaseni`.
   - `src/app/(admin)/admin/layout.tsx` — authoritative server-side check on
     every render: session must exist AND user email must be in the
     `ADMIN_EMAILS` env allowlist. Fail-closed: if the env var is empty,
     nobody can access admin.
   - `src/components/admin/AdminShell.tsx` — new client shell with real
     email + working logout button (calls `supabase.auth.signOut()`).

2. **Comgate callback will no longer silently accept unverified payments.**
   - Returns `503` (not `200 OK`) when credentials are missing — Comgate
     retries instead of dropping the signal.
   - Verifies `refId` from the Comgate status response matches the callback
     `refId` (prevents replay of another merchant's transId with spoofed
     order reference).
   - Returns proper status codes (`502`, `400`, `500`) instead of swallowing
     everything to `200 OK`.

3. **Comgate create-payment hardened.**
   - Shape validation on all inputs (`orderId`, `amount`, `email`,
     `orderNumber`) — regex-checked, type-checked, bounded.
   - Amount bounded to 100 Kč … 500 000 Kč — blocks the 1-heller probe
     trick until the full orders-table flow is implemented.
   - `NEXT_PUBLIC_APP_URL` validated against an origin allowlist
     (`localhost`, `*.vercel.app`, `*.woodandsteak.cz`) — closes the open
     redirect via misconfigured env.
   - `orderNumber` URL-encoded in redirect params.
   - NOTE: amount is still client-supplied. Full fix requires an orders
     table — see "Remaining work" below.

### HIGH

4. **Email templates HTML-escape all user-supplied values.**
   - `src/lib/email-templates.ts` — new `esc()` helper escapes `&<>"'`.
   - QR code data URL validated (must start with `data:image/`) — prevents
     arbitrary `<img src>` injection.

5. **Security headers added.**
   - `next.config.ts` — `X-Frame-Options: DENY`, `X-Content-Type-Options:
     nosniff`, `Referrer-Policy`, `Strict-Transport-Security` (2-year
     HSTS + preload), `Permissions-Policy` (camera/mic/geo off), and a
     CSP that restricts scripts/images/connect/frame sources.

6. **Newsletter endpoint — real email validation + IP rate limiting.**
   - `src/app/api/newsletter/route.ts` — regex validation (was just
     `.includes("@")`). In-memory sliding-window rate limit: 5 req /
     60 s / IP. Returns `429` over the limit.

7. **Order number generation uses crypto.**
   - `src/lib/utils.ts` — replaces `Math.random()` with
     `crypto.getRandomValues()`. 32 bits of entropy → no more
     enumeration of 9000-order space.

---

## ⚠️ Remaining CRITICAL — blocks real orders

### 1. Checkout is a UI stub (`src/app/(shop)/pokladna/page.tsx`)

The form's `handleSubmit` just `setTimeout`s and calls `router.push`. No
API route is called, no order persists, no payment is initiated. Comgate
`create-payment` route exists but is never called from the checkout page.
Currently anyone can visit `/pokladna/dekujeme?order=ANYTHING` and see a
fake-looking confirmation.

**Work required:**
- `src/app/api/orders/route.ts` — new POST route: validates cart against
  server-side product prices from Supabase, persists order row, returns
  `{ orderId, orderNumber, total }`. Order number generated server-side.
- Checkout `handleSubmit` calls `POST /api/orders`, then based on chosen
  payment method either redirects to Comgate (calling
  `/api/comgate/create-payment` with just `orderId`) or shows the bank
  transfer / cash-on-delivery confirmation.
- `/pokladna/dekujeme` page should look up the order by `orderNumber`
  and only render if found — currently it just echoes the URL param.

### 2. Contact form is a no-op (`src/app/(shop)/kontakt/page.tsx`)

`handleSubmit` sets a local "sent" flag but nothing is emailed. Users
think their message went through. Wire to `/api/contact` using Resend.

### 3. Admin pages are UI stubs

Every admin mutation (Save settings, Add category, Edit product, Change
order status, Send note, Export CSV) only calls `toast.success` or
`setState`. Nothing persists. Full list below.

Access is now gated so this is no longer a security hole — it's a
functionality gap.

---

## 🧾 Admin page status (each page)

| Page | Auth | Data | Mutations | Broken UX |
|---|---|---|---|---|
| `/admin` | ✅ | hardcoded fake stats (156 orders, 487 650 Kč…) | — | dashboard lies about numbers |
| `/admin/produkty` | ✅ | `src/lib/data.ts` mock | ❌ add / edit / delete all no-op | image column shows "IMG" literal |
| `/admin/produkty/[id]` | ✅ | **ignores `id` param** — always Rib Eye defaults | ❌ save no-op | can't actually edit any product |
| `/admin/kategorie` | ✅ | `src/lib/data.ts` mock | ❌ add / edit / delete / reorder all no-op | — |
| `/admin/objednavky` | ✅ | hardcoded array | ❌ row click does nothing despite `cursor-pointer` | can't open detail from list |
| `/admin/objednavky/[id]` | ✅ | hardcoded, built from URL `id` | ❌ email / cancel / status change → `toast` only | — |
| `/admin/zakaznici` | ✅ | hardcoded array | — | rows not clickable, detail unreachable from list |
| `/admin/zakaznici/[id]` | ✅ | hardcoded | ❌ save note → `toast` only | — |
| `/admin/newsletter` | ✅ | hardcoded 11 fake subscribers | ❌ export CSV no-op | — |
| `/admin/vzhled` | ✅ | `localStorage` only | ❌ shop pages never read that key — changes invisible to visitors | — |
| `/admin/nastaveni` | ✅ | `useState` defaults | ❌ save no-op, lost on refresh | — |

---

## 🚀 Before deploy — ENV VARS you MUST add on Vercel

```
ADMIN_EMAILS=bartolomejrota@gmail.com,another@admin.cz
COMGATE_TEST_MODE=false           # on production
NEXT_PUBLIC_APP_URL=https://<your-domain-or-vercel-url>
```

All other vars from `.env.local` (Supabase URL + anon key, Supabase
service role, Comgate merchant + secret, Resend API key, bank fields)
must also be present.

If `ADMIN_EMAILS` is unset or empty, **the admin panel becomes
unreachable by anyone** — that is the fail-closed default. Set it before
the first login attempt.

---

## 📋 Suggested sequencing to finish

1. Add `ADMIN_EMAILS` locally, create an admin account via `/registrace`,
   verify you can log in and see `/admin`.
2. Write Supabase migrations for `products`, `categories`, `orders`,
   `order_items`, `newsletter_subscribers`, `contact_messages`.
3. Seed real data from `src/lib/data.ts` into `products` + `categories`.
4. Build `/api/orders` route + rewire checkout.
5. Wire every admin page to real Supabase CRUD (start with produkty →
   kategorie → objednávky → zákazníci → nastavení → newsletter → vzhled).
6. Real contact form → Resend.
7. Replace dashboard fake stats with real aggregations.
8. Delete `src/lib/data.ts` once admin panel drives everything.
