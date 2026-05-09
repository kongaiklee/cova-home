# Cova TM — Session Handover

**Repo:** `cova-home` at `D:\covarage\cova-home`
**Owner:** Kong (`kongaiklee` / `hello.konglee@gmail.com`)
**Purpose:** Public marketing site for Covarage, a Singapore SME insurance brokerage.
**Workflow:** Kong writes specs → Claude executes → push to `staging`. Never push to `main`.

---

## TL;DR for a fresh Claude

You're picking up the Cova marketing site. Vite + React + TypeScript on Vercel. Kong sends you specs prefixed `TM: SPEC X` and expects surgical edits. Don't write code that depends on assumptions — ask for the current state of any file before editing it. Always end with `git diff` before commit so Kong can sanity-check. **Push only to `staging`. Never `main`.**

The site has two routing layers that are easy to confuse:

1. **React routes** (in `src/routes/index.tsx`) — currently just `/` (Landing) and `*` (NotFound). All landing content lives at `/`.
2. **Vercel rewrites** (in `vercel.json`) — `/for-partners`, `/for-brokers`, `/for-corpsecs`, `/for-partners/calculator` are NOT React routes. They rewrite to static HTML slide decks in `public/decks/`. The decks ARE the partner-facing pages.

If you forget point 2 and try to add a `LandingPartners.tsx`, you'll waste time and confuse Kong.

---

## Repo structure

```
cova-home/
├── public/
│   ├── assets/
│   │   ├── banner/                    # 15 banner images
│   │   └── images/
│   │       ├── 404/harbour-pause.jpg  # NotFound bg image
│   │       └── landing/               # boat.png (hero), insurer logos, feature imgs
│   ├── decks/
│   │   ├── CovaBroker_Mobile.html         # /for-brokers (rewrite)
│   │   ├── CovaPartnership_Mobile.html    # /for-partners and /for-corpsecs (rewrite)
│   │   ├── CovaPartnership_Calculator_Mobile.html  # /for-partners/calculator (rewrite)
│   │   ├── CovaConcierge_Mobile.html      # not currently routed
│   │   ├── CovaIntro_Mobile.html          # not currently routed
│   │   └── dashboard-demo/                # compiled vite build of a dashboard prototype
│   └── ig-content/                    # Instagram content templates (t1–t6)
├── src/
│   ├── components/
│   │   ├── Button.tsx
│   │   ├── FeatureSection.tsx
│   │   ├── NeedsForm.tsx              # lead capture form on hero (right column)
│   │   ├── SectionHero.tsx
│   │   └── landing/                   # insurer logo SVGs (Chinataiping, Fwd, Income, Raffles, Singlife, Zurich, etc.)
│   ├── layouts/MainLayout.tsx         # commented out in routes — not in use
│   ├── pages/
│   │   ├── Corporates.tsx             # commented out
│   │   ├── Features.tsx               # commented out
│   │   ├── Home.tsx                   # commented out
│   │   ├── NotFound.tsx               # 404 — harbour image, brand voice
│   │   └── landing/
│   │       ├── index.tsx              # composes the home page from sections below
│   │       ├── LandingHeader.tsx      # nav (logo + for-partners/for-brokers/login/signup)
│   │       ├── LandingHero.tsx        # boat sail bg + H1 + body + NeedsForm
│   │       ├── LandingBrokers.tsx
│   │       ├── LandingProducts.tsx
│   │       ├── LandingHandles.tsx
│   │       ├── LandingFeatures.tsx
│   │       ├── LandingMap.tsx
│   │       ├── LandingFooter.tsx
│   │       └── landingContainer.ts    # exports LANDING_CONTAINER_CLASS for consistent max-width
│   ├── routes/index.tsx               # only / and * are active; others commented out
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── vercel.json                        # rewrites — see Architecture section
├── package.json
├── vite.config.ts
├── deploy.sh                          # 10KB script — read before touching deployment
├── nginx.conf, nginx_http.conf        # legacy, likely unused (Vercel deploy now)
├── index.html
└── .env, eslint.config.js, prettier configs
```

---

## Tech stack

- **Build:** Vite
- **Framework:** React 18 + TypeScript
- **Routing:** react-router-dom (`useRoutes`)
- **Styling:** Tailwind CSS with custom theme tokens (see Brand section)
- **Icons:** lucide-react
- **Class composition:** clsx
- **Deployment:** Vercel (auto-deploys staging branch to preview URL)
- **Static decks:** raw HTML in `public/decks/` with embedded CSS/JS — no build step, served as-is

---

## Architecture: the two routing layers

This is the most important thing to understand. Drawing it explicitly:

```
USER GOES TO            HOW IT'S SERVED                    WHAT THEY SEE
/                       React route → <Landing />          Full marketing page (all sections)
/for-partners           Vercel rewrite → static HTML       CovaPartnership_Mobile.html (deck)
/for-brokers            Vercel rewrite → static HTML       CovaBroker_Mobile.html (deck)
/for-corpsecs           Vercel rewrite → static HTML       CovaPartnership_Mobile.html (same as partners)
/for-partners/calculator  Vercel rewrite → static HTML     CovaPartnership_Calculator_Mobile.html
/anything-else          SPA fallback → <NotFound />        404 page with harbour image
```

Current `vercel.json`:

```json
{
  "rewrites": [
    { "source": "/for-partners/calculator", "destination": "/decks/CovaPartnership_Calculator_Mobile.html" },
    { "source": "/for-partners", "destination": "/decks/CovaPartnership_Mobile.html" },
    { "source": "/for-corpsecs", "destination": "/decks/CovaPartnership_Mobile.html" },
    { "source": "/for-brokers", "destination": "/decks/CovaBroker_Mobile.html" },
    { "source": "/(.*)", "destination": "/" }
  ]
}
```

**Order matters.** More specific (`/for-partners/calculator`) before less specific (`/for-partners`). Catch-all `/(.*)` last.

Static files in `/public/` are served before rewrites are applied — so `/decks/CovaPartnership_Mobile.html` directly is also accessible.

---

## Brand system

### Colors (CSS vars used in decks; Tailwind tokens in React app)

| Name        | Hex      | Usage                          | Tailwind token (React app) |
| ----------- | -------- | ------------------------------ | -------------------------- |
| Horizon     | `#5F88AE` | Primary blue                   | `bg-primary`, `text-primary` |
| Open Water  | `#C2D4E2` | Light blue                     | `landing-hero-to` (gradient end) |
| Teak        | `#423226` | Warm brown (CTAs in decks)     | `text-text-primary` (likely) |
| Dock Green  | `#426248` | Accent                         | — |
| Anchor      | `#414141` | Dark gray                      | — |
| Mist        | `#888888` | Subtle gray                    | `text-text-secondary` |
| Sailcloth   | `#FDFBF9` | Warm off-white                 | `bg-background-primary` |

Tailwind theme tokens used in code (verify in `tailwind.config` if you need to add new ones):
- `bg-primary`, `bg-primary-hover`, `bg-primary/40`
- `bg-background-primary`
- `text-text-primary`, `text-text-secondary`
- `border-border-primary`
- `from-landing-hero-from to-landing-hero-to` (hero gradient)

### Typography

- **Display:** DM Serif Display (`font-serif`)
- **Body:** Inter (default `font-sans`)

### Voice

Maritime metaphors. Direct. Broker-friendly. Singapore SME focus.

- Hero: *"Built to navigate uncertainty. Every business hits open water. Covarage is the harbour you come back to."*
- 404: *"Off course. Happens. Let's get you back to the harbour."*
- Common words: harbour, anchor, navigate, open water, sail.

Don't reach for these — use sparingly, and only when they earn their place. Default to plain English.

### Insurance lines (in `NeedsForm`)

WICA, FDW, Public Liability, Fire/PAR, Motor, Group Medical, PI, D&O, Cyber, Marine Cargo, Fidelity. "Not sure — help me" is the catch-all (note: there's a UTF-8 corruption on this label currently — `â€"` should be `—`).

---

## Decks

Decks are mobile-first slide-based pitches in `public/decks/`. Each one is a self-contained HTML file with embedded CSS/JS — no build dependency.

### Bottom nav grammar (consistent across decks)

```
[ ⌂ ]  ←  1 / 10  →  [ context link ]
 home          slide nav         optional CTA (e.g. "CALC →")
```

- **⌂** (left): home anchor, links to `/`, gray (`var(--mist)`), 32×32 tap target
- **← / count / →** (center): slide navigation, brand-blue circles
- **context link** (right): optional, used for cross-linking related decks (e.g. partner deck links to calculator)

When adding a new deck or new bottom-nav link, match this grammar exactly. The visual rhythm is part of the brand.

### Adding a new deck

1. Create `public/decks/CovaXxx_Mobile.html`
2. Add a Vercel rewrite in `vercel.json`: `{ "source": "/your-route", "destination": "/decks/CovaXxx_Mobile.html" }`
3. Insert BEFORE the catch-all `/(.*)` rule
4. Add cross-links to/from sibling decks if relevant
5. Keep the bottom nav grammar consistent

---

## TM workflow

Kong's specs come prefixed `TM: SPEC X — <description>`. Letters of the alphabet roughly track chronologically. Recent ones in the git log:

- `SPEC E/F/G` — vercel rewrites + nav rebuild + section pruning
- `SPEC H` — collapse hero copy to single brand-voice block
- `SPEC J` (revised) — dual-layer text-shadow on hero
- `SPEC I` — 404 page with harbour image (shipped as combined Phase 1+2 since Phase 1 wasn't pre-applied)

### How a TM spec works

Kong writes a spec with explicit Find/Replace blocks. The spec assumes a specific starting state. Your job:

1. **Verify the starting state matches.** If Kong's spec has `Find: <h1 className="...">Title</h1>` and the actual file has different className strings, the spec will fail. Ask Kong to paste the current file before applying.
2. **Apply edits surgically.** Don't refactor surrounding code. Don't "improve" things outside the spec scope. Don't add new features.
3. **Show the diff.** Always include `git diff <file>` in the deploy block so Kong can sanity-check before pushing.
4. **Hand back the verified file.** If a spec is more than 2 trivial edits, it's better to write the full replacement file than to have Kong do find/replaces in PowerShell.

### Commit message format

`<type>(<scope>): <description> (SPEC X)` — e.g. `feat(hero): dual-layer text-shadow for sail legibility (SPEC J revised)`

---

## Conventions

- **Branch:** push to `staging` only. Confirm `git status` shows `On branch staging` before any push.
- **PowerShell:** Kong is on Windows. Use PowerShell syntax (`Copy-Item`, `Get-ChildItem`, `Get-Content`), not bash. He runs commands; you give them.
- **Downloads folder:** files Kong downloads from Claude land in `$env:USERPROFILE\Downloads`. Filename may keep the original upload extension (e.g. `.png` even when content is JPEG). Rename on copy if needed.
- **No .env edits.** Don't touch `.env`. Hand env-var changes to Kong as a PowerShell snippet for `vercel env add` or to set in the Vercel dashboard.
- **LF/CRLF warnings on commit are harmless.** Git normalizes line endings on commit.
- **Vite dev server is usually already running.** Don't tell Kong to `npm run dev` unless he confirms it isn't.

---

## Recent state (as of last session)

### Shipped to staging

- ✅ Hero: dual-layer text-shadow on H1 + 2 body paragraphs (SPEC J revised)
- ✅ NotFound: rebuilt with harbour image, brand voice, single CTA "Take me home"
- ✅ Partner deck: home button (⌂) + CALC link in bottom nav
- ✅ Broker deck: home button in bottom nav
- ✅ NEW Partner Calculator page: estimates annual referral revenue based on (clients/quarter, avg premium, broker rate). 80% partner share. CTA "Contact Partnerships" → `mailto:zul@covarage.com`.
- ✅ vercel.json: rewrite added for `/for-partners/calculator`
- ✅ Home page sections: restored after accidental prune in SPEC E/F/G (LandingProducts, LandingHandles, LandingFeatures, LandingMap)

### Outstanding

- 🟡 **NeedsForm → API endpoint:** handover spec written for Hiroshi (CTO). He builds `/api/leads` POST endpoint that persists to a custom DB on Vercel and returns intent-routed `redirect_url`. Frontend swap pending his endpoint.
- 🟡 **`consult` intent:** to be added as a 4th option in `NeedsForm.tsx`. Purpose still TBD by Kong (different from `advice` how?). Don't add until Kong confirms label and downstream `/work/consult` page is built on the work app.
- 🟡 **"Not sure — help me" UTF-8 fix** in `NeedsForm.tsx`: `â€"` → `—`
- 🟡 **404 text-shadow:** harbour image's bright sky may need same dual-layer treatment as hero. Pending visual review by Kong.
- 🟡 **Nav links text-shadow:** if FOR PARTNERS / FOR BROKERS / LOGIN / SIGNUP nav becomes hard to read on the lightest gradient area, apply lighter shadow `[text-shadow:0_1px_6px_rgba(0,0,0,0.25)]`.
- 🟡 **Partner CTA email alias:** currently `mailto:zul@covarage.com`. Swap to `partnerships@covarage.com` when alias exists.

---

## Known pitfalls (lessons learned the hard way)

1. **Always check the current file before applying Find/Replace.** A previous TM session pruned 4 sections from `src/pages/landing/index.tsx` (Products, Handles, Features, Map). Kong didn't realize this until he tested staging. Diagnosing took ~30 min. Show diffs before committing.

2. **Static HTML decks in `public/` cannot affect React routes.** If something on `/for-partners` looks broken, the bug is either in `vercel.json`, the deck itself, or a previous commit to React land — never in your deck-only edit.

3. **The catch-all `/(.*) → /` in vercel.json** sends ALL unmatched paths to `/`. Static files in `/public/` are served first, so direct `.html` access still works. But if you add new clean-URL routes, add them BEFORE the catch-all.

4. **Don't assume Phase 1 of a multi-phase spec has shipped.** If Kong sends Phase 2 and the Phase 2 Find blocks don't match the actual file, Phase 1 isn't there. Either get Phase 1 spec from Kong or write a combined Phase 1+2 file.

5. **You can't read Kong's local filesystem.** When Kong asks "check what's in D:/...", give him a PowerShell command to run; he pastes results. He explicitly framed himself as "your hands and eyes."

6. **PowerShell `mailto:` URLs in shell commands:** be careful about escaping `&` and `?` in command-line strings. Use single quotes or escape properly.

7. **Em-dashes are banned in code/style files** per Kong's writing style for the Yi Dao manuscript — but the rule is for prose. Em-dashes in CSS/JS strings or copy variables are fine. The "Not sure — help me" string in `NeedsForm.tsx` is intentional copy.

---

## People & external systems

- **Kong** — owner, decision maker on product, voice, brand. PMs everything.
- **Hiroshi** — CTO. Owns the work-app side (`/work/quotation`, `/work/consult`, `/work/upload`). Will build `/api/leads` endpoint when handover lands.
- **Zul** — partnerships. Email currently `zul@covarage.com`; will move to `partnerships@covarage.com`.
- **Work app** — separate codebase at `${VITE_APP_COVARAGE_URL}`. Marketing site forms redirect users there. Not in this repo.
- **Vercel deployments** — staging branch auto-deploys to `https://cova-home-git-staging-hellokonglee-gmailcoms-projects.vercel.app`. Production URL is the real domain (Kong promotes manually from staging).

---

## File-by-file quick reference

| File | What it does |
| ---- | ------------ |
| `src/pages/landing/index.tsx` | Composes home page from 8 section components in order |
| `src/pages/landing/LandingHeader.tsx` | Top nav — logo + for-partners/for-brokers/login/signup links |
| `src/pages/landing/LandingHero.tsx` | Hero with boat sail bg, H1, body, and NeedsForm in right column |
| `src/components/NeedsForm.tsx` | Lead capture form (stage / intent / lines). Currently redirects all submissions to `/work/signup` — pending API endpoint. |
| `src/pages/NotFound.tsx` | 404 page with harbour image, "Off course." copy, single CTA |
| `vercel.json` | Vercel rewrites for clean partner/broker URLs |
| `public/decks/CovaPartnership_Mobile.html` | Partner pitch deck (10 slides) — also serves /for-corpsecs |
| `public/decks/CovaPartnership_Calculator_Mobile.html` | Partner earnings calculator — Contact Partnerships CTA |
| `public/decks/CovaBroker_Mobile.html` | Broker pitch deck (11 slides) |
| `public/decks/CovaConcierge_Mobile.html` | Not currently routed — leave alone unless Kong asks |
| `public/decks/CovaIntro_Mobile.html` | Not currently routed — leave alone unless Kong asks |

---

## Quick start checklist for the new session

When Kong sends his first spec:

1. Read the spec end-to-end before doing anything.
2. Identify which file(s) it touches.
3. Ask Kong to paste current state of those files (`Get-Content <path>`).
4. Verify Find blocks match.
5. Either edit surgically (str_replace) or write a full replacement file (for >3 changes).
6. Run a sanity diff on your end.
7. Hand back: file + PowerShell deploy block + `git diff` step + commit message.
8. Confirm staging branch before push.

If anything in the spec assumes shipped state you can't verify, **ask before pushing**. The cost of asking is one round trip. The cost of getting it wrong is reverting on staging while Kong's customers might be looking at it.
