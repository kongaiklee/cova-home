# Updating covarage.com's FAQ, Stories and CIMB pages - a guide for Rahil Bhagat and his AI agent

**Version 2.1 - 17 October 2026.**

**Who this is for:** Rahil, and the AI agent he runs to keep three parts of covarage.com up to date. **Read all of it before the
first change.** Where this guide and anything else in this repository disagree, this guide decides what you may change. The
repository's `CLAUDE.md` is Covarage's own engineering instructions, not yours.

---

## 1. The three pages and their files - and nothing else

| Page | Address | Its words | Where its facts come from (never shown) | On the site |
|---|---|---|---|---|
| **FAQ** | covarage.com/faq | `src/content/faq.md` | `src/content/faq.sources.md` | Live |
| **Stories** - an index, and one page per customer's story | covarage.com/stories and covarage.com/stories/`<name>` | `src/content/stories/<name>.md`, one file per story | `src/content/stories/<name>.sources.md` | Being built; each story shows only once Covarage marks it approved |
| **CIMB partnership** | covarage.com/stories/cimb | `src/content/partners/cimb.md` | `src/content/partners/cimb.sources.md` | Being built; shows only once Covarage marks it approved |

**Photos** for a story or a partner page go in `public/stories/<name>/`.

**Never change anything else:** no code (`src/pages/`, `src/components/`, `src/content/editable-page.ts`), no styles, no other
page, no `scripts/`, nothing else in `public/` (the sitemap is generated), no `package.json`, no settings files, no `.github/`,
no `CLAUDE.md`. If a change you want needs any of those, stop and ask Covarage (section 5).

## 2. How the files work

**The note at the top of each file is its full specification - read it first, every time.** Every file has three parts:

1. **The note** - everything above the first line of three hyphens. It is never shown.
2. **The settings** - between the two lines of three hyphens, one `name: value` a line (the page's `title`, its `description`
   for search results, its headline, and the others the note lists).
3. **The page** - everything below, in plain Markdown.

**The FAQ:** `## A topic` starts a group of questions; `### A question?` starts a question; the lines under it are its answer.
Each answer opens when its question is clicked, and a link to one question (`/faq#who-places-my-cover`) opens that answer.

**A story:** one file per business, named for it (`repair-sg.md` makes covarage.com/stories/repair-sg). The story is the
owner's own account, in their voice. **Its `approved` setting decides whether it is on the site:** while it reads `no`, the
page and its tile on the Stories index are hidden. **Only Covarage changes `approved`**, and only after the owner has approved
every word and every photo in writing. A new story starts at `approved: no`.

**The CIMB page:** the same `approved` rule - only Covarage changes it, once Covarage has reviewed the page.

**On every Stories and partner page**, under the story, the site adds: *"Covarage keeps your insurance file and connects you to
a licensed adviser. We do not give insurance advice."* It is part of the page, not of your file - leave it to the site.

**Every answer, story and claim keeps its line in the matching `.sources.md` file**, saying where its facts come from. A new
one needs a new line there.

## 3. The rules for the words

1. **Covarage is never an insurer, a broker or an adviser.** It does not advise on, recommend, compare or arrange insurance; a
   licensed broker does, and all cover is placed by licensed intermediaries. Never write anything that says or implies
   otherwise. The build refuses many such lines (`scripts/check-claims.mjs`), but not every one - the rule is yours, not the
   script's.
2. **A customer's name, words or photo appear only with their written permission, held by Covarage.** A story goes to its
   owner for approval of every word and every photo before Covarage marks it approved. Ask Covarage before naming anyone.
3. **No price, fee or promise the platform does not already make.** Today Covarage is free for companies while in early
   access - nothing more. Money is written `S$` (S$0, S$8).
4. **The FAQ's legal answers - those whose line in `faq.sources.md` cites "COO's sight"** (today: Is Covarage an insurer or a
   broker?, Can I keep the broker I already have?, Can my company see an employee's personal policies?, Who sees my company's
   information?) - **change only with Covarage's written sign-off.** Send the wording to Covarage; never merge it on your own
   reading. A new answer on what Covarage is, who sees what, or the law joins them.
5. **The CIMB page is in CIMB's own words.** Its account and Founders Card details are copied verbatim from the material CIMB
   cleared for its partners - never paraphrased, shortened or added to:
   - **no promotion with an end date**, so the page never needs updating when one ends;
   - **nothing CIMB marked "Do not publish"**;
   - **the Deposit Insurance Scheme paragraph stays word for word**;
   - **the button opens CIMB's own call-back form** - never a form on covarage.com;
   - **nothing about any commercial arrangement between Covarage and CIMB** - on this page or any other;
   - **"partner" is the right word** for CIMB on this page.
6. **The broker check's register is "MAS's Financial Institutions Directory"** (the firm) and the Register of
   Representatives (the person) - never "MAS's register of insurance brokers".
7. **Plain, standard words**, as a platform uses them. The platform's buttons and screen names go in **bold**, spelled exactly
   as on screen (for example **Request a quote**, **My brokers**). Link the platform's Privacy Policy as
   https://platform.covarage.com/privacy.
8. **Hyphens only** - never a long dash. **No placeholder in square brackets** in anything the site shows - the build stops on
   one.
9. **No personal data** beyond what a story's owner has approved for their own story - never an email address or phone number
   of a customer or their staff.
10. **Photos are real** - of the business and the people in the story, taken with their agreement. Never stock photos, never
    images made by AI.

## 4. How to make a change

1. **Start from `main`** of https://github.com/kongaiklee/cova-home (a public repository): fork it, or branch in it if Covarage
   has given you access - `git checkout main && git pull && git checkout -b rahil/<a-few-words>`.
2. **Edit** only the files in section 1. Keep each `.sources.md` in step.
3. **Build it:** `npm ci`, then `npm run build`. **It must pass.** The build checks the claims, the placeholders and every page
   setting, and names the file and line of any failure - fix it and run it again.
4. **Look at it:** `npm run preview`, then open each page you changed at desktop width and at phone width (390 pixels): nothing
   scrolls sideways, each question opens, each link and button works.
5. **Open a pull request into `main`** saying what changed, why, and the source of every new fact. For a story, say whether its
   owner has approved it. **Never push to `main` and never merge your own pull request.**
6. **Covarage reviews and merges.** Merging to `main` publishes covarage.com; nothing reaches the site before Covarage merges.

## 5. Who to ask

Covarage - Kong, by the channel he has agreed with Rahil. **Ask before you act** whenever a change needs a file outside section
1, a customer's name or photo, a legal answer, the `approved` setting, or anything the rules in
section 3 do not settle.
