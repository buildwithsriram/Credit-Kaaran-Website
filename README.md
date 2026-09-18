# Credit Kaaran

React 19 + TypeScript website with Vinext/Vite, Tailwind CSS and Three.js. Includes the home page, wallet category overlay, card dashboards, learning pages and consultation links.

## Run locally

### Requirements

- Node.js **22.13 or newer** (this repo includes `.nvmrc` set to `22`)
- npm (comes with Node)

No application secrets are required for the public content pages. A database is not required to view the site.

### Install and start the dev server

```sh
git clone https://github.com/buildwithsriram/Credit-Kaaran-Website.git
cd Credit-Kaaran-Website
npm ci
npm run dev
```

Vite prints the local address when it starts. Open that URL in your browser. The config binds to all interfaces (`0.0.0.0`); the usual local URL is:

```text
http://localhost:5173
```

If you already have Node installed with nvm:

```sh
nvm use
npm ci
npm run dev
```

### Other commands

```sh
npm run build    # production build
npm start        # serve the production build
npm test         # build, then run source tests
npm run lint     # ESLint
```

The standard npm commands are portable and do not require the legacy Linux helper scripts in `scripts/`.

### Useful local routes

| Path | What you should see |
| --- | --- |
| `/` | Home, welcome sequence, wallets |
| `/?wallet=cards` | Card category overlay |
| `/?wallet=consultation` | Consultation overlay |
| `/cards` | Card catalogue |
| `/consultation` | Consultation services |
| `/courses`, `/webinars`, `/redemption` | Learning and points pages |
| `/about`, `/contact`, `/privacy`, `/disclosures` | Supporting pages |

## Structure

- `app/`: routes and shared styles
- `components/`: wallet, card dashboard, home sections and UI primitives
- `lib/`: card and learning content
- `public/`: images, fonts and brand assets
- `worker/`: Cloudflare Worker entry
- `build/`: build integration
- `tests/`: existing source tests

## Hosting and integrations

This is a server-rendered Vinext application with Cloudflare integration, not a static GitHub Pages export. GitHub stores the source; hosting requires a compatible runtime and deployment configuration. The existing `.openai/hosting.json` identifies the original Sites project and is retained because the build imports it. It is not a credential. Do not assume uploading this repository publishes or transfers the existing site.

Card applications hand off to issuer links; consultation bookings hand off to Topmate. This package does not implement a bank application backend or payment processing. Review external links and any platform-specific authentication scaffolding before moving to another host.

## Export details

Imported from `credit-kaaran-github.zip` (source commit `7a7c9f8b51c7499f69050c51be91f01dae3e0215`). Website UI and assets are unchanged. The original dependency lockfile is included. Dependencies, generated output and the original Git history are excluded.

See `PROGRESS.md` and `SITE_ARCHITECTURE.md` for existing implementation notes.
