# DžanAjla Studio

Produkcijski Next.js 14 web shop za promociju ručnih radova.

## Tech Stack

- **Next.js 14** (App Router, Server Components, Server Actions)
- **TypeScript** – strogo tipiziran kod
- **Tailwind CSS** – pastelna, elegantna tema
- **Supabase** – baza podataka i storage za slike
- **Nodemailer** – slanje email narudžbi

---

## Pokretanje lokalno

### 1. Kloniraj i instaliraj
```bash
npm install
```

### 2. Postavi varijable okruženja
```bash
cp .env.local.example .env.local
# Uredi .env.local i popuni sve varijable
```

### 3. Podesi Supabase
- Kreiraj projekt na supabase.com
- Pokreni SQL iz `supabase/schema.sql` u SQL editoru
- Kreiraj Storage bucket: **product-images** (Public: da)
- Kopiraj API ključeve u `.env.local`

### 4. Pokreni razvojni server
```bash
npm run dev
```

Otvori http://localhost:3000

---

## Struktura projekta

```
/app
  page.tsx                  # Homepage
  /category/[slug]/page.tsx # Stranica kategorije
  /product/[id]/page.tsx    # Stranica proizvoda (sa narudžbom)
  /admin/add-product/       # Admin forma za dodavanje
  /api/order/route.ts       # API ruta – slanje email narudžbe
  not-found.tsx             # 404 stranica

/components
  /layout        # Header, Footer, Container
  /home          # HeroSection, FeaturedCategories, FeaturedProducts, AboutSection
  /products      # ProductCard, ProductGrid, OrderModal, OrderButton
  /ui            # Badge

/lib
  supabase.ts         # Supabase klijent + upiti
  supabase-server.ts  # Supabase service role klijent
  mail.ts             # Nodemailer konfiguracija i email template
  utils.ts            # cn(), formatPrice(), slug helpers
  categories.ts       # Definicije kategorija

/types
  index.ts            # TypeScript tipovi

/supabase
  schema.sql          # SQL za kreiranje tabele i politike
```

---

## Admin panel

Pristup: `/admin/add-product`

- Zaštićen lozinkom (ADMIN_PASSWORD u .env.local)
- Upload slike direktno na Supabase Storage
- Unos podataka o proizvodu

---

## Deploy na Vercel

1. Pushaj na GitHub
2. Poveži sa Vercel projektom
3. Dodaj sve env varijable u Vercel Dashboard
4. Deploy!

*DžanAjla Studio – Rukotvorine s ljubavlju*
