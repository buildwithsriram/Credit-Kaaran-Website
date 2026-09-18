# Credit Kaaran

React 19 + TypeScript website with Vinext/Vite, Tailwind CSS and Three.js. Includes the home page, wallet category overlay, card dashboards, learning pages and consultation links.

## Run locally

Install Node.js 22.13 or newer and npm, then run:

```sh
npm ci
npm run dev
```

Open the local address printed by Vite.

```sh
npm run build
npm start
```

The standard commands are portable and do not require the legacy Linux helper scripts. No application secrets are required for the public content pages.

## Add to GitHub

Create an empty GitHub repository. Extract this archive and run these commands inside this folder, replacing YOUR-USERNAME and YOUR-REPO:

```sh
git init
git add .
git commit -m "Import Credit Kaaran website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

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

Exported from source commit `7a7c9f8b51c7499f69050c51be91f01dae3e0215`. Website UI and assets are unchanged. Only setup documentation and npm command portability were adjusted for this export. The original dependency lockfile is included. Dependencies, generated output and Git history are excluded.

See `PROGRESS.md` and `SITE_ARCHITECTURE.md` for existing implementation notes. A fresh dependency install/build was not run for this export; prior project checks are recorded in the progress file.
