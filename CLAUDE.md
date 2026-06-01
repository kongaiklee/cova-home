# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public marketing site for Covarage (COVA) — a Singapore SME insurance brokerage. Vite + React 19 + TypeScript, deployed on Vercel. There is no backend in this repo; lead-capture forms redirect users to a separate work app at `VITE_APP_COVARAGE_URL`.

`HANDOVER.md` is a detailed session-handover doc (brand system, deck nav grammar, workflow, outstanding tasks, pitfalls) — read it for anything not covered here.

## Commands

```bash
npm run dev        # Vite dev server (usually already running — confirm before telling the user to start it)
npm run build      # tsc -b && vite build
npm run preview    # preview the production build
npm run lint       # eslint .
npm run lint:fix   # eslint . --fix
npm run fm:check   # prettier --check .
npm run fm:fix     # prettier --write .
```

No test suite exists.

## The two routing layers (most important thing to understand)

The site mixes a React SPA with static HTML decks, and they are easy to confuse:

1. **React routes** (`src/routes/index.tsx`) — only `/` (Landing) and `*` (NotFound) are active. `MainLayout`, `Home`, `Features`, `Corporates` are commented out and not in use. All landing content lives at `/`.
2. **Vercel rewrites** (`vercel.json`) — `/for-partners`, `/for-brokers`, `/for-corpsecs`, `/for-partners/calculator` are NOT React routes. They rewrite to self-contained static HTML slide decks in `public/decks/`. The decks *are* those partner-facing pages.

A bug on `/for-partners` is in `vercel.json` or the deck HTML — never in React code. A change to a deck cannot affect React routes, and vice versa.

`vercel.json` rewrite order matters: most-specific routes first, catch-all `/(.*) → /` last. Static files in `public/` are served before rewrites, so direct `.html` access still works. Adding a new clean URL means adding a rewrite *before* the catch-all.

## Architecture

- The landing page is composed in `src/pages/landing/index.tsx` from eight section components (`LandingHeader`, `LandingHero`, `LandingBrokers`, `LandingProducts`, `LandingHandles`, `LandingFeatures`, `LandingMap`, `LandingFooter`). Edit a section, not a monolith.
- `src/components/NeedsForm.tsx` is the hero lead-capture form (stage / intent / insurance lines). It currently redirects submissions to the work app; a real `/api/leads` endpoint is pending.
- Decks in `public/decks/` are hand-written HTML with embedded CSS/JS — no build step, served as-is. Keep their bottom-nav grammar consistent (see `HANDOVER.md`).

## Styling

Tailwind CSS v4 via `@tailwindcss/vite` — **there is no `tailwind.config.js`**. Theme tokens are defined in an `@theme` block in `src/index.css` (e.g. `--color-primary`, `--color-background-primary`, `--color-landing-hero-from/to`). Add or change design tokens there. ESLint's `better-tailwindcss` plugin uses `src/index.css` as its entry point.

## Conventions

- **Branch:** push to `staging` only — never `main`. Vercel auto-deploys `staging` to a preview URL.
- **Commit messages:** `<type>(<scope>): <description>` — work driven by specs is suffixed `(SPEC X)`.
- Apply edits surgically — don't refactor surrounding code or add features outside the request's scope.
- Don't edit `.env`; hand env-var changes to the owner for the Vercel dashboard / `vercel env add`.
- The owner is on Windows — give shell commands in PowerShell syntax.
