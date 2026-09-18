# Credit Kaaran Website

React 19 + TypeScript marketing site for Credit Kaaran. Built with **Vinext/Vite**, **Tailwind CSS 4**, and **Three.js** for scroll motion. The site helps visitors explore credit cards, book consultations, and read learning content.

This README is written for a team cloning the repo to run, extend, and deploy the site.

---

## Quick start

### Requirements

- **Node.js 22.13+** (see `.nvmrc`)
- **npm** (ships with Node)

No database or API keys are required for local development of the public pages.

### Clone and run

```sh
git clone https://github.com/buildwithsriram/Credit-Kaaran-Website.git
cd Credit-Kaaran-Website
npm ci
npm run dev
```

Open **http://127.0.0.1:5173** in your browser.

If Chrome shows a connection error on `localhost`, use `127.0.0.1` instead.

With nvm:

```sh
nvm use
npm ci
npm run dev
```

### Other commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start the Vite dev server with hot reload |
| `npm run build` | Production build |
| `npm start` | Serve the production build locally |
| `npm test` | Build, then run route/component tests |
| `npm run lint` | ESLint |

---

## How the site is built

### Stack

| Layer | Technology |
| --- | --- |
| Framework | Vinext (Next.js App Router patterns on Vite) |
| UI | React 19, shadcn/Radix primitives, Lucide icons |
| Styling | Tailwind CSS 4 + custom CSS in `app/globals.css` and `app/refinements.css` |
| Motion | CSS transforms + Three.js scroll math on the homepage |
| Hosting target | Cloudflare Workers (see `worker/` and `vite.config.ts`) |

### Routing

Routes live under `app/` using the App Router file convention:

| Route | File | What it shows |
| --- | --- | --- |
| `/` | `app/page.tsx` | Homepage (hero, wallets, story, testimonials) |
| `/cards` | `app/cards/page.tsx` | Full card catalogue |
| `/cards/[category]` | `app/cards/[category]/page.tsx` | Category-filtered catalogue |
| `/card/[slug]` | `app/card/[slug]/page.tsx` | Individual card details |
| `/consultation` | `app/consultation/page.tsx` | Consultation services |
| `/consultation/[slug]` | `app/consultation/[slug]/page.tsx` | Service detail |
| `/courses`, `/webinars`, `/redemption` | respective `page.tsx` | Learning pages |
| `/learn/[slug]` | `app/learn/[slug]/page.tsx` | Free guides |
| `/about`, `/contact`, `/privacy`, `/disclosures` | respective `page.tsx` | Supporting pages |

Wallet overlays open from the homepage via query params:

- `/?wallet=cards` — card category picker
- `/?wallet=consultation` — consultation picker

### Shared layout

Every page is wrapped by `components/site-shell.tsx`:

- Header navigation and mobile menu
- Footer
- Wallet collection dialogs (cards + consultation)

Global styles load in `app/layout.tsx`:

```tsx
import "./globals.css";
import "./refinements.css";
```

---

## Project structure

```
app/                    Routes, page-level styles (card-details.css)
components/             React components
  premium-home.tsx      Homepage sections (hero, story, testimonials)
  site-shell.tsx        Header, footer, wallet dialogs, shared UI
  catalog.tsx           Card catalogue grid, filters, mobile deck
  card-details.tsx      Plastic-card dossier for /card/[slug]
  ui/                   shadcn primitives (Button, Dialog, Sheet, etc.)
lib/
  site-content.ts       ★ Main content source (cards, categories, services, FAQs)
  learning-content.ts   Free learning guides
public/                 Static assets served at the site root
worker/                 Cloudflare Worker entry
build/                  Vite/Cloudflare build integration
tests/                  Build and HTML smoke tests
```

**Most day-to-day content changes happen in `lib/site-content.ts` and `public/`, not in page components.**

For a deeper route map and interaction notes, see `SITE_ARCHITECTURE.md`.

---

## Editing content

### Brand links and global copy

Open `lib/site-content.ts`. The `brand` object controls site-wide links:

```ts
export const brand = {
  name: "Credit Kaaran",
  person: "Arvind R",
  instagram: "https://www.instagram.com/creditkaaaran/",
  topmate: "https://topmate.io/credit_karan",
  language: "Tamil · English · Tanglish",
  description: "...",
};
```

These values feed the header, footer, consultation handoffs, and several page CTAs.

### Card categories

Categories are defined in the `categories` array in `lib/site-content.ts`. Each category has:

| Field | Purpose |
| --- | --- |
| `slug` | URL segment (`/cards/cashback`) |
| `name`, `short`, `line`, `description` | Display copy |
| `icon` | Icon key mapped in `site-shell.tsx` (`wallet`, `plane`, `fuel`, etc.) |
| `tone` | Visual theme: `blue`, `silver`, or `carbon` |
| `checks` | Bullet points shown on card detail pages |

### Credit cards

Cards live in the `cards` array. Example shape:

```ts
{
  slug: "axis-ace",
  name: "ACE",
  issuer: "Axis Bank",
  categories: ["cashback"],
  summary: "A cashback credit card built around everyday payments.",
  network: "Visa",
  tone: "blue",
  url: "https://www.axis.bank.in/cards/credit-card/axis-bank-ace-credit-card",
  sourceKind: "product", // or "directory"
}
```

**To add a card:**

1. Add an entry to `cards` in `lib/site-content.ts`.
2. Use a unique `slug` (lowercase, hyphenated).
3. Set `categories` to one or more category slugs.
4. Set `url` to the official issuer/product page.
5. The route `/card/[slug]` is generated automatically via `generateStaticParams()`.

**To update apply links:** edit the card's `url`, or add/update entries in the `verifiedLinks` map at the bottom of `site-content.ts`.

### Consultation services

Services are in the `services` array (`slug`, `name`, `price`, `duration`, `summary`, `outcomes`, etc.). Each maps to `/consultation/[slug]`. Bookings hand off to Topmate via `brand.topmate`.

### FAQs

The `faqs` array in `site-content.ts` powers the homepage FAQ accordion.

### Learning guides

Free guides live in `lib/learning-content.ts`. Each guide has sections, a source link, and a `next` route for navigation.

### Homepage copy that is not in site-content

Some homepage text is inline in `components/premium-home.tsx`:

- Hero headline and intro
- Intro word-reveal paragraph
- Wallet story steps
- Testimonials array (names, quotes, dates, photo paths)
- Featured card slugs in the “starting points” rail

Search inside `premium-home.tsx` for the text you want to change.

### Static page copy

Pages like `/about`, `/contact`, `/privacy`, and `/courses` keep their copy in the respective `app/*/page.tsx` files.

---

## Replacing images and assets

### Where files go

Put static files in `public/`. They are served from the site root:

| File in repo | URL in browser |
| --- | --- |
| `public/wallet-blue.webp` | `/wallet-blue.webp` |
| `public/testimonials/portrait-1.jpg` | `/testimonials/portrait-1.jpg` |
| `public/favicon.svg` | `/favicon.svg` |

### Current image inventory

| Asset | Used for |
| --- | --- |
| `public/wallet-blue.webp` | Cards wallet (hero, story animation) |
| `public/wallet-black.webp` | Consultation wallet |
| `public/wallet-pocket.png` | Legacy pocket texture (if referenced) |
| `public/testimonials/portrait-1.jpg` | Testimonial avatar (Vasanth) |
| `public/testimonials/portrait-3.jpg` | Testimonial avatar (Pushparaj) |
| `public/testimonials/portrait-6.jpg` | Testimonial avatar (Ramkumar) |
| `public/favicon.svg` | Browser tab icon |

### How to swap an image

1. **Replace the file** in `public/` with the same filename, **or**
2. Add a new file and update the reference in code.

Example — change a testimonial photo:

```ts
// components/premium-home.tsx
{ name: "Vasanth", photo: "/testimonials/portrait-1.jpg", ... }
```

Replace `public/testimonials/portrait-1.jpg`, or point `photo` to a new path like `/testimonials/vasanth.jpg`.

Example — change wallet leather texture:

```tsx
// components/premium-home.tsx and components/site-shell.tsx
src="/wallet-blue.webp"
```

Drop in a new WebP/PNG with the same path, or update the `src` string.

### Image guidelines

- **Wallets:** transparent or clean-background WebP works best. Current assets are ~1000×667.
- **Testimonial portraits:** square or portrait JPG/WebP; displayed as circular avatars.
- **Favicon:** SVG preferred; update `app/layout.tsx` metadata if you change the path.
- **Card artwork:** most cards use the programmatic `CardFace` component (CSS gradients), not photos. You only need custom art if you add an `art` field to a card record.

### Card faces (no image file needed)

Most cards render via the `CardFace` component in `components/site-shell.tsx`. Colors come from tone classes (`card-blue`, `card-silver`, `card-carbon`) defined in `app/globals.css`. To change card visual style globally, edit those CSS classes rather than uploading images.

---

## Brand and design tokens

Core colors are CSS variables in `app/globals.css`:

| Token | Value | Usage |
| --- | --- | --- |
| `--snow` | `#f8f7f4` | Page background |
| `--blue` | `#4366b0` | Primary brand, headings accent |
| `--orange` | `#f49e1e` | Accent (monogram dot, highlights) |
| `--ink` | `#171717` | Body text, dark sections |
| `--gray` | `#6b6b6b` | Secondary text |

Fonts load from Google Fonts in `globals.css`:

- **Raleway** — headings
- **Inter** — body text

Homepage-specific layout and animation overrides live in `app/refinements.css`. Card detail styling is in `app/card-details.css`.

---

## Common implementation tasks

### Add a new credit card

1. Add the card object to `cards` in `lib/site-content.ts`.
2. Assign at least one category slug in `categories`.
3. Set the official `url`.
4. Run `npm run dev` and open `/card/your-slug`.
5. Confirm it appears in `/cards` and the correct category page.

### Add a new category

1. Add to `categories` in `lib/site-content.ts`.
2. Pick an existing `icon` key or add a new mapping in `site-shell.tsx` `Icon` component.
3. Assign cards to the new category slug.
4. Open `/cards/your-category-slug`.

### Change navigation links

Edit the `nav` array in `components/site-shell.tsx` and the footer links in the same file.

### Change homepage featured cards

Edit `featuredSlugs` near the top of `components/premium-home.tsx`:

```ts
const featuredSlugs = ["axis-ace", "scapia", "hdfc-swiggy", "hsbc-travelone", "sbi-cashback"];
```

The first slot is the Cashback card used in the scroll “fly into starting points” animation.

### Change consultation pricing

Edit the `price` field on the relevant service in `lib/site-content.ts`.

### Update SEO metadata

Page titles and descriptions are set per route via Next.js `metadata` exports, for example in `app/about/page.tsx`. Global defaults are in `app/layout.tsx`.

---

## Build and deploy

### Production build

```sh
npm run build
npm start
```

`npm test` runs the build first, then checks that key routes render expected HTML.

### Cloudflare Workers

The repo includes Cloudflare Worker scaffolding:

- `worker/index.ts` — worker entry
- `vite.config.ts` — Cloudflare Vite plugin + Vinext
- `.openai/hosting.json` — binding names (not a secret)

Deploying to Cloudflare requires Wrangler credentials and a configured Worker environment. The public marketing pages do not need D1/R2 for basic operation, but the build plugin expects the hosting config file to exist.

### Before going live

- [ ] Update `robots` in `app/layout.tsx` if the site should be indexed (`index: true`).
- [ ] Verify all card `url` values point to current issuer pages.
- [ ] Verify `brand.instagram` and `brand.topmate` links.
- [ ] Replace testimonial photos if you have approved client images.
- [ ] Run `npm run build && npm test`.
- [ ] Test `/`, `/cards`, `/card/simplyclick`, and `/consultation` on desktop and a ~390px mobile viewport.

---

## Testing checklist after changes

| Area | What to verify |
| --- | --- |
| Homepage | Welcome skip, both wallets open, scroll story fans cards, Cashback flies to Starting points on mobile |
| Catalogue | Search, category deck/swipe, View details + Apply links |
| Card details | Flip card, fees tab, apply sheet opens external link |
| Consultation | Service cards, Topmate handoff |
| Mobile | No horizontal overflow; wallet dialogs open as bottom sheets |

---

## What this site does not include

- No on-site payment or card application forms (users go to issuer/Topmate URLs).
- No user accounts or stored PII.
- No CMS — content is TypeScript data files, not a database.
- Course checkout and webinar registration are placeholders until real links are supplied.

Do not invent fees, ratings, customer identities, or affiliate tracking URLs. Update `lib/site-content.ts` and `/disclosures` together when links change.

---

## Further reading

- `SITE_ARCHITECTURE.md` — full route map, entrance sequence, integration notes
- `PROGRESS.md` — recent design change log
- `components/premium-home.tsx` — homepage layout and motion
- `components/catalog.tsx` — catalogue filters and mobile category deck
- `components/card-details.tsx` — card product page UI

---

## Getting help

If something does not appear after a content change:

1. Confirm you edited the correct file (`site-content.ts` vs inline page copy).
2. Restart the dev server (`Ctrl+C`, then `npm run dev`).
3. Hard-refresh the browser.
4. Run `npm run lint` to catch TypeScript errors.

For card slugs, category slugs, and routes, use lowercase hyphenated names consistently (`hdfc-swiggy`, not `HDFC Swiggy`).
