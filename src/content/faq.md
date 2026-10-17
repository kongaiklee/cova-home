# The FAQ page - covarage.com/faq

This file is the whole page. Edit it, commit it and redeploy: nothing else moves, and no
code is touched. The page (`src/pages/company/Faq.tsx`) reads it when the site is built.

How the file is laid out:

- Everything above the first line of three hyphens is this note. It is never shown.
- Between the two lines of three hyphens are the page's settings, one `name: value` a line:
  `title` (the browser tab and search results), `description` (the line search results show
  under the title), `headline` (the big heading) and `lede` (the line under it).
- Below the settings is the page. `## A topic` starts a group of questions and puts the topic in
  the list beside them; `### A question?` starts a question; the lines under a question are its
  answer, in plain Markdown - paragraphs, **bold** for a button or screen name, lists, and links
  written `[the words](/privacy)` for a page on this site or `[support@covarage.com](mailto:support@covarage.com)`.
  Each answer opens when the question is clicked.
- Where each answer comes from is in `faq.sources.md` beside this file, which the page never
  reads: every answer keeps a line there, and a new answer needs a new line.

Words in square brackets that are not a link are a placeholder, and the build stops on one. The
build also stops on any line that says Covarage is an insurer, a broker or an adviser, or makes
a promise the site does not make (`scripts/check-claims.mjs`). Use hyphens (-), never long dashes.

---
title: Questions businesses ask us | Covarage
description: What Covarage does, what it costs, who places your cover, and how requests, renewals and your staff's cover work on the platform.
headline: Questions businesses ask us
lede: Can't find your answer? Choose **Ask Covarage** in the platform, or email [support@covarage.com](mailto:support@covarage.com).
---

## About Covarage

### What does Covarage do?

We keep your company's insurance in one place: your policies and their renewal dates, your staff and who is covered, your vehicles, and every request you make for cover. You run the business. Your broker advises you. We do the insurance admin in between.

### Is Covarage an insurer or a broker?

Neither. Covarage does not insure anything and is not a broker: it does not advise on, recommend, compare or arrange insurance. When you send a request, we pass your details, requirements and files to a licensed broker, who gives all advice.

### How much does Covarage cost?

Covarage is free for your company while in early access.

### Who places my cover?

A licensed broker. On any request, choose your own broker or ask for one from Covarage's network. All cover is placed by licensed intermediaries.

### Can I keep the broker I already have?

Yes. Invite them from **My brokers**. We check their firm on MAS's Financial Institutions Directory and confirm they work there, usually within one working day; they see nothing of your company until then. The check is not a recommendation of the broker.

## Getting started

### How do I start?

Choose **Request a call**. A person on our team calls or emails you back, and our team opens your account with you.

### Do I have to set everything up myself?

No. Send us what you already keep - a staff list, your policy schedules, your ACRA business profile - and our team builds your company record from it. You can also do it step by step, and skip any step until later.

## Requests and renewals

### How do I ask for a quote?

Choose **Request a quote or review**, tick the cover you want (or **Not sure yet**, and describe it in a note), add any files that help, and choose where it goes: your own broker, or a broker in Covarage's network.

### How will I know where my request is?

Every request shows where it stands - for example **With your broker** or **Quote ready for you** - and we tell you by email and in **Alerts** when it moves.

### How many quotes will I get?

Your broker sends at least three quotes, or fewer with their reason, shown to you as **Why fewer than three**.

### What happens when a policy is due to renew?

Turn on **Compare at renewal** and we open a renewal request 30 days before the policy ends and send it to the policy's broker, who obtains quotes for you. Nothing renews on Covarage's choice: you decide on each renewal.

### What is the quarterly check-in?

Once a quarter we ask whether anything has changed - new staff, new premises, new vehicles. Nothing changed? One tap. Something changed? Your answers go to your broker.

## Your staff

### Can my employees see their own cover?

Yes. Each employee sees the company cover they are on, and, on a company health policy, their benefits card and how to use it.

### Can my company see an employee's personal policies?

No. Cover an employee adds themselves is seen only by them and Covarage's team, and is shared with a doctor or clinic only for a booking they ask for. It is never shown to their company or the company's brokers.

## Your information

### Who sees my company's information?

The people your company gives access to, the brokers your company works with on the platform, and Covarage's team, for the task in hand. We pass details on only as our Privacy Policy sets out, and we never sell them: [platform.covarage.com/privacy](https://platform.covarage.com/privacy)

## Guides

### Where can I read what the law asks of my business?

Our guides explain what businesses in your trade commonly hold, and why. Your own cover is a conversation with a licensed adviser.

