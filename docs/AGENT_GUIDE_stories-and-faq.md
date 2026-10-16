# For Rahil Bhagat's AI agent - editing covarage.com's Customer stories and FAQ pages

**Version 1.0 - 17 October 2026.** Written by Covarage on Kong's order of 16 October 2026: Covarage builds both pages first, and Rahil's agent then edits those two pages only, each change reviewed before it goes live.

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-10-17 03:2x | First version, written from the two pages as built on the `cova-home` branch `site-1-stories-faq` (`cc16749`). |

**Who this is for:** the AI agent that Rahil Bhagat runs to keep two pages of covarage.com up to date. **Read all of it before your first change.** If anything here and anything else in the repository disagree, this guide decides what you may do; the repository's `CLAUDE.md` is Covarage's own engineering instructions, not yours.

---

## 1. What you may change - and nothing else

**Four files, all in `src/content/`:**

| File | What it is |
|---|---|
| `faq.md` | every word of covarage.com/faq |
| `faq.sources.md` | where each FAQ answer comes from - never shown on the site |
| `customer-stories.md` | every word of covarage.com/customer-stories |
| `customer-stories.sources.md` | where each story comes from - never shown on the site |

**Never change anything else** - no code (`src/pages/`, `src/content/editable-page.ts`), no styles, no other page, no `scripts/`, no `public/` (the sitemap is generated), no `package.json`, no settings files, no `.github/`. If a change you want needs any of those, stop and ask Covarage (s5).

## 2. How the two pages work

**The note at the top of each page's file is its full specification - read it first, every time.** In short:
- Everything above the first line of three hyphens is the note; it is never shown.
- Between the two lines of three hyphens are the page's settings, one `name: value` a line (`title`, `description`, `headline`, `lede`, and on the stories page `eyebrow`, `promises-heading`, `promise`, `footnote`, `button`, `under-button`).
- **FAQ:** `## A topic` starts a group; `### A question?` starts a question; the lines under it are the answer in plain Markdown. Each answer opens when its question is clicked.
- **Customer stories:** `## A story's title` starts a story's card, newest first; a numbered list for its steps (`1. **The search.** What happened.`) or a short paragraph; a line in italics on its own is the card's small print; a quote is a line starting `> `, with the person's name and role two lines under it.
- **Every answer and every story keeps its line in the matching `.sources.md` file**; a new one needs a new line there, saying where its facts come from.

## 3. The rules for the words

1. **Covarage is never an insurer, a broker or an adviser.** It does not advise on, recommend, compare or arrange insurance; a licensed broker does, and all cover is placed by licensed intermediaries. Never write anything that says or implies otherwise. The build refuses many such lines (`scripts/check-claims.mjs`), but not every one - the rule is yours, not the script's.
2. **Never name or quote a customer without their written permission, held by Covarage.** Ask Covarage (s5) first; the stories page leaves names out until then.
3. **No price, fee or promise the platform does not already make.** Today Covarage is free for companies while in early access - nothing more.
4. **The legal answers - those whose line in `faq.sources.md` cites "COO's sight"** (today: Insurer or a broker?, Keep my broker, Personal policies, Who sees my information?) - **change only with Covarage's written sign-off**; send the wording to Covarage, never merge it on your own reading. A new answer on what Covarage is, who sees what, or the law joins them.
5. **The broker check's register is "MAS's Financial Institutions Directory"** (the firm) and the Register of Representatives (the person) - never "MAS's register of insurance brokers".
6. **Plain, standard words**, as a platform uses them. The platform's buttons and screen names go in **bold**, spelled exactly as on screen (for example **Request a quote**, **My brokers**). Link the platform's Privacy Policy as https://platform.covarage.com/privacy.
7. **Hyphens only** - never a long dash. **No placeholder in square brackets** - the build stops on one.
8. **No personal data** in any of the four files - no names, emails or phone numbers of customers or their staff.

## 4. How to make a change

1. **Branch from `main`:** `git checkout main && git pull && git checkout -b rahil/<a-few-words>`.
2. **Edit** only the files in s1. Keep each `.sources.md` in step.
3. **Build it:** `npm ci`, then `npm run build`. **It must pass.** The build checks the claims, the placeholders and every page setting, and names the file and line of any failure - fix and run it again.
4. **Look at it:** `npm run preview`, then open `/faq` and `/customer-stories` at desktop width and at phone width (390 pixels): nothing scrolls sideways, each question opens, each link works.
5. **Open a pull request into `main`** that says what changed, why, and the source of every new fact. **Never push to `main` and never merge your own pull request.**
6. **Covarage reviews and merges.** Merging to `main` publishes covarage.com through Vercel; nothing reaches the site before Covarage's merge.

## 5. Who to ask

Covarage - Kong, by the channel he has agreed with Rahil. Ask before you act whenever a change needs a file outside s1, a customer's name, a legal answer, or anything the rules in s3 do not settle.
