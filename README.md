# ANDARA — Handmade Colombian leather shoes

E-Business final project, Universidad de Medellín. A shop site with two full versions:

- **NZ · English**: NZD prices, UK/AU sizes, card / Afterpay / PayPal / wallets
- **HU · Magyar**: HUF prices, EU sizes, utánvét / bankkártya / Barion / SimplePay

Switching versions (flag switch in the header, or `?m=nz` / `?m=hu` in the URL) changes the language, currency, sizes, payment methods, legal texts and Frai's answers.

Pages: Home · AI Proposal (FitFinder + Frai chatbot, both live) · Strategy · Our market today.

## Structure

```
public/            the whole static site (deploy this folder)
  index.html
  css/styles.css
  js/content.js    ALL copy, prices, legal texts, chatbot answers (edit text here)
  js/app.js        router, FitFinder, Frai, bag, modals
  js/art.js        drawn placeholders shown if a photo is missing
  images/          hero.jpg, trail.jpg, chelsea.jpg, ciudad.jpg, about.jpg
api/chat.js        Vercel serverless route for Frai (keeps the API key secret)
api/_frai.js       Frai system prompt + market facts, shared with Netlify
netlify/functions/ same function for Netlify
scripts/fetch-images.mjs  downloads the Unsplash photos at build time
```

## Run locally

```
npm run images   # optional: download photos
npm start        # http://localhost:3000
```

Or just open `public/index.html` in a browser — everything works, Frai uses its keyword answers.

## Deploy (free)

**Vercel (recommended, enables the AI chatbot)**
1. Import the repo at vercel.com/new. Settings are read from `vercel.json`.
2. Optional: Project → Settings → Environment Variables → `ANTHROPIC_API_KEY`. Redeploy.

**Netlify**: import the repo; `netlify.toml` sets everything. Same optional `ANTHROPIC_API_KEY`.

**GitHub Pages**: Settings → Pages → Source: GitHub Actions. The workflow in `.github/workflows/pages.yml` deploys on push to `main`. (No serverless there, so Frai runs on keyword answers only.)

## Frai, the chatbot

With `ANTHROPIC_API_KEY` set, Frai answers with Claude (model overridable via `FRAI_MODEL`). Without a key, offline, or if the API fails, it answers instantly from keyword rules in `content.js`, so the demo always works. Each reply is labelled `Frai · AI` or `Frai · quick answer`.

## Photos

Photos come from Unsplash (free licence) and are credited in the footer. To use your own, drop a JPG with the same name into `public/images/` — existing files are never overwritten. **Check the downloaded photos before the presentation** and swap any that don't fit.
