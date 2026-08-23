# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Public marketing site for Covarage (COVA) — a Singapore technology platform for SME insurance administration. COVA is not an insurer, broker or financial adviser and holds no MAS licence. Never describe COVA as advising, recommending, comparing, ranking, quoting, arranging, binding, underwriting, or handling premium or claims. Vite + React 19 + TypeScript, deployed on Vercel. There is no backend in this repo; lead-capture forms redirect users to a separate work app at `VITE_APP_COVARAGE_URL`.

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

## Prohibited words and claims - standing constraint

Added by FIX-SPEC-A Task 4.9. This repo previously described COVA as "a Singapore SME insurance
brokerage", which is why compare/quote/bind copy kept reappearing. Fixing copy without fixing the
premise guarantees regression.

**COVA is a technology platform. It is not an insurer, an insurance broker or a financial adviser,
and it holds no licence from the Monetary Authority of Singapore.** MAS does not register
introducers, so COVA is never "MAS-registered" or "registered with MAS".

Never introduce any of these into this repo:

```text
registered with MAS / MAS-registered / regulated by MAS (about COVA)
exclusively / exclusive
the full market / access to all insurers / shops the entire market
best deal / best match / most competitive option / the right answer is
compare, rank, recommend, advise, arrange, bind, place, underwrite (as things COVA does)
we match you / we match them / we match to you / matched to your industry
we route the lead / routed by specialisation / priority matching
premium, claims, money handled by COVA
our concierge team / our booking page / our health screening packages (IASO's, not COVA's)
guarantee (of any bill, benefit or outcome)
always free / free for every company / free-to-use / no subscription (about the platform)
our adviser / COVA's adviser / our licensed advisers / COVA is licensed
automated renewal reminders / reminds you before they lapse (the feature does not exist)
```

Two further standing constraints:

- **Do not assert an FAA-N02 introducer appointment.** No executed appointment exists yet. Until it
  does, describe what COVA does and say it holds no MAS licence. Do not write "acts as an introducer
  under MAS Notice FAA-N02" anywhere.
- **Pricing.** The platform is free while in early access. Never publish an unbounded promise
  ("always free", "we will never charge you") - it forecloses the paywall. Never publish a price
  until the paywall exists.

**Statements that a THIRD PARTY is MAS-registered are true and must be preserved.** Insurers,
brokers and financial advisers genuinely are registered. Do not sweep them.

### No reverse marketing - KONG, 2026-08-23

Verbatim: *"there is NO NEED to state what isnt available. that isnt marketing, that is REVERSE
MARKETING if u are actively trying to tell someone not to consider you"*, and earlier the same day:
*"the bus company doesn't need to state it isn't licensed or registered by MAS. neither does the
hawker. why do we if we are not?"*

**State what COVA DOES. Never append a denial of a capability to marketing copy.**

A denial is itself a claim about the perimeter - you only deny what a reader might otherwise
assume - so a page full of denials argues the opposite of what it intends.

| Do not write | Write instead |
|---|---|
| `COVA does not assess your requirements.` | `Whether any of it applies to your business is a question for a licensed adviser.` |
| `COVA expresses no view on who is right for you.` | `The intermediary gives all advice.` |
| `COVA does not compare, rank or express a view.` | `Which route suits a business is a question for a licensed adviser.` |
| `COVA is not licensed or registered by MAS` (in body copy) | say nothing; the footer disclaimer carries it once |

**The exceptions, and they are the only two.** The counsel-approved disclaimer at the foot of a
page or deck, which is a legal notice and not marketing; and the IASO attribution, which names a
related party and is required disclosure. Both stay verbatim. Neither belongs in body copy a
second time.

### An internal memo is not marketing copy - KONG, 2026-08-24

Verbatim: *"guys u all really like writing additional shit from INTERNAL MEMOS to the MARKETING
SITE"* and *"do u understand the difference between an internal memo and marketing customer facing
copy?"*

**A memo explains the mechanism to US and hedges for US. Marketing copy tells the READER what they
get.** If a sentence only makes sense to someone who has read our rulings, it is a memo.

This was written after the partner calculator shipped reading *"The referral fee, passed through to
you in full while in early access"* - our own money-flow vocabulary plus a caveat that told a
partner their cut was temporary, on the one page whose job is to make the offer worth taking.

| Do not write | Write instead |
|---|---|
| `The referral fee, passed through to you in full` | `Yours in full.` |
| `Passed through to you` (a row label) | `You keep` |
| `... while in early access` on what WE PAY someone | say nothing; the estimate footnote already qualifies it |
| `Wholesale pass-through`, `processing fee`, `value metric` | describe the outcome, not our model |

**`Free while in early access` is ruled for what COVA CHARGES and does not transfer to what COVA
PAYS.** Adjustability on an earnings figure belongs in the disclaimer footnote - *"Estimate only.
Actual fees depend on product mix and renewal behaviour."* - never in the headline.

**No governance artefact ever ships in a served file**, comments included. No `PENDING_KONG`, no
`COVA_RULINGS`, no `FIX-SPEC-A/B`, no `KONG <date>`, no `nodes/<seat>/` path. A build gate enforces
a rule; a comment on the marketing site publishes it. `INTERNAL-MEMO-LEAK` in
`scripts/check-claims.mjs` fails the build on all of those.
