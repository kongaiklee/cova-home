# The customer stories page - covarage.com/customer-stories

This file is the whole page. Edit it, commit it and redeploy: nothing else moves, and no
code is touched. The page (`src/pages/company/CustomerStories.tsx`) reads it when the site is built.

How the file is laid out:

- Everything above the first line of three hyphens is this note. It is never shown.
- Between the two lines of three hyphens are the page's settings, one `name: value` a line:
  `title` (the browser tab and search results), `description` (the line search results show
  under the title), `eyebrow` (the small line above the heading), `headline`, `lede` (the line
  under the heading), `promises-heading` and one `promise` line for each point under it (in the
  order written; **bold** the point's first words), `footnote` (the small print under them),
  `button` (the button's words; it opens the request form on the home page) and `under-button`.
- Below the settings are the stories, newest first. `## A story's title` starts a story's card.
  Under it, in plain Markdown: a numbered list for its steps (`1. **The search.** What happened.`),
  or a paragraph if it is short. A line written in italics on its own (`*like this*`) is the
  card's small print. A quote is a line that starts `> `; the person's name and role go two lines
  under it, also after `> `, with a line holding only `>` between the two.
- Where each story comes from is in `customer-stories.sources.md` beside this file, which the
  page never reads: every story keeps a line there, and a new story needs a new line.

Never name a customer, or quote one, without their written permission. Words in square brackets
that are not a link are a placeholder, and the build stops on one. The build also stops on any
line that says Covarage is an insurer, a broker or an adviser, or makes a promise the site does
not make (`scripts/check-claims.mjs`). Use hyphens (-), never long dashes.

---
title: Customer stories | Covarage
description: Two Singapore businesses, from the first call to the policy in place: public liability in a week and a half, contractors' all risks in a day.
eyebrow: Customer stories
headline: From the first call to the policy in place.
lede: Two recent requests, told step by step. Your broker advises you. We do the insurance admin in between.
promises-heading: What every customer gets
promise: **You know where your request is, at every step.** Each request shows where it stands, and we tell you when it moves.
promise: **You know what the insurer needs from the start,** so fewer emails go back and forth.
promise: **A licensed broker advises you and arranges the cover.** We do the admin in between.
footnote: All cover is placed by licensed intermediaries. Names are left out.
button: Request a call
under-button: A person on our team calls or emails you back. No obligation.
---

## Public liability, in place in a week and a half

1. **The search.** The owner of a small business needed public liability cover. They first tried to buy it on an insurer's website and were pointed to a broker instead. They found Covarage through a search.
2. **The call back.** We called back within half an hour.
3. **What the insurer needs, up front.** We took down what the business does and what cover it needed, and listed the documents the insurer would ask for. The owner sent every one of them in two days.
4. **The policy.** The quote came back and the policy was in place in a week and a half.

*In our partner broker's experience, a case like this usually takes about four weeks.*

## Contractors' all risks, in place within 24 hours

A contractor needed contractors' all risks cover. It was in place within 24 hours.

