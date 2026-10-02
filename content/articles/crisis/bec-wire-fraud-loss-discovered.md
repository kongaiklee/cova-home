---
title: "Business Email Compromise / Vendor Email Compromise: Wire Fraud Discovered"
slug: "/crisis/bec-wire-fraud-loss-discovered"
category: "crisis"
intent: "steady-the-ship"
topics: ["Cyber"]
industries: []
agencies: ["Singapore Statutes", "CSA", "SPF", "SCAMSHIELD"]
article_number: 364
published: "2026-05-06"
source_verified: "2026-05-06"
updated: "2026-08-30"
word_count: 1693
status: "published"
hero_image: "/assets/blog/crisis.jpg"
canonical_url: "https://covarage.com/guides/crisis/bec-wire-fraud-loss-discovered"
meta_description: "Finance has found a payment sent to a fraudulent account. The first calls that can still recall funds in Singapore, and the evidence a claim needs."
og_title: "Business Email Compromise / Vendor Email Compromise: Wire Fraud Discovered"
og_description: "Finance has found a payment sent to a fraudulent account. The first calls that can still recall funds in Singapore, and the evidence a claim needs."
---

> **The Answer in 60 Seconds**
>
> Finance team has discovered an outbound payment to a fraudulent account. Either: (a) CFO impersonation email instructed a wire transfer; (b) supplier bank-detail change email diverted payment; (c) deepfake voice or video instruction approved a payment. The funds have left the bank - possibly converted to crypto, possibly through mule accounts. Critical first 4 hours: (1) **bank fraud team activation** - ScamShield advises contacting your bank immediately so it can act to prevent further loss, and lists banks' anti-scam hotlines; (2) Singapore Police Force e-Service report and ScamShield 1799 hotline; (3) attempt to recall SWIFT / FAST instruction; (4) freeze further outbound payments; (5) isolate affected mailboxes (suspended login, password reset, MFA enforcement). First 72 hours: forensic preservation of email logs (Microsoft 365 / Google Workspace audit), determine if account compromise vs spoofing only, [PDPA](https://sso.agc.gov.sg/Act/PDPA2012) notifiability assessment if customer data exposed. **The insurance trap:** commercial crime policies can exclude "voluntary parting" of funds (an employee tricked into authorising a payment); Social Engineering Fraud (SEF) cover, where offered, may be a sublimit on a crime or cyber policy. Some cyber policies respond only where there is a "system breach," not pure social engineering. SEF endorsement is the specific clause to demand at renewal. Notification: check each policy's notice condition; a cyber policy may require notice of a circumstance "as soon as practicable", and a crime policy written on a "discovery basis" is triggered by discovery of the loss. Notify every policy that may respond. Reference data: Singapore phishing +49% in 2024 (6,100 cases); Vendor Email Compromise +66% in H1 2024.

### The Sourced Detail

Business Email Compromise (BEC) and Vendor Email Compromise (VEC) are a cyber-financial loss risk for Singapore SMEs. The underlying scam is simple - impersonate authority, request a payment, exploit human trust - but the technical and insurance response is anything but simple. The first hours determine whether funds are recovered, whether the SME's cyber and crime covers respond, and whether PDPA notification obligations are triggered.

#### Reference data on the threat landscape

Per the [Cyber Security Agency of Singapore (CSA)](https://www.csa.gov.sg/) Singapore Cyber Landscape 2024/2025 report (released 3 September 2025), around 6,100 phishing attempts were reported to CSA in 2024, a 49% increase from 4,100 in 2023, and banking and financial services remained the most spoofed industry, with 56% of all phishing attempts impersonating banking and financial services organisations.

Per the [Perception Point H1 2024 Cybersecurity Trends & Insights report](https://www.prnewswire.com/) (released 4 September 2024): "VEC attacks, a subset of BEC targeting supply chain communications, rose by 66% in H1 2024."

#### Statutory framework engaged

**Primary statute (data protection).** [Personal Data Protection Act 2012](https://sso.agc.gov.sg/Act/PDPA2012) - Section 24 Protection Obligation; Section 26D 3-day breach notification.

**Primary statute (cyber).** [Computer Misuse Act 1993](https://sso.agc.gov.sg/Act/CMA1993) - provides framework for criminal prosecution of perpetrators.

**Cybersecurity reporting.** [Cybersecurity Act 2018](https://sso.agc.gov.sg/Act/CA2018) - for Critical Information Infrastructure (CII) and certain regulated entities.

**MAS framework (for FIs).** Notice on Cyber Hygiene applicable to financial institutions; FAA-N17 fraud reporting for financial advisers.

#### Hour-by-hour response

**Hour 0-1 - Bank engagement.**

- **Call bank fraud team immediately** - every minute counts; Singapore banks maintain dedicated fraud lines
- Identify the wire reference / SWIFT MT details
- Request immediate recall of payment
- Request bank's intervention with receiving bank (SWIFT / FAST)
- Document the conversation (date, time, officer name, reference)

**Hour 0-1 - Internal containment.**

- Halt all further outbound payments pending review
- Suspend login of affected mailbox(es)
- Force password reset and MFA enforcement
- Notify all approval signatories
- Identify the original instruction (email, voice call, video call)

**Hour 1-2 - Police and regulator notification.**

- [Singapore Police Force e-Services](https://www.police.gov.sg/e-Services) - file police report
- [ScamShield 1799](https://www.scamshield.gov.sg/) hotline
- The SPF Anti-Scam Command (ASCom) brings together the Police's scam investigation, intervention and enforcement units; it handles scams generally, not only BEC or wire fraud
- Document case reference

**Hour 2-4 - Insurance notification.**

- **Crime policy notification (commercial crime / fidelity / SEF):**
  - Check the notice condition; crime policies can require notice soon after a loss is discovered
  - Identify policy schedule and limits
  - Identify SEF sublimit specifically
  - Identify deductible / retention
- **Cyber policy notification:**
  - Check the notice condition; cyber policies can require notice of a circumstance "as soon as practicable"
  - Identify whether cover requires "system breach" trigger
  - Pre-engaged forensic and legal panel activation
- **D&O policy notification (where executive impersonation):**
  - Claims-made trigger
  - Defence costs cover

**Hour 4-12 - Forensic preservation.**

- Microsoft 365 / Google Workspace audit log preservation
- Specific logs needed:
  - Login attempts (failed and successful)
  - Mailbox forwarding rule changes
  - Sign-in IP addresses
  - Conditional access policy logs
- Email server logs (sender domain, headers, routing)
- Voice / video call logs if instruction by phone
- Backup systems where original instructions may be preserved

**Hour 12-72 - Investigation depth.**

- Engage external Digital Forensics & Incident Response (DFIR) firm
- Determine compromise vs spoofing:
  - **Account compromise:** attacker had control of legitimate mailbox
  - **Spoofing only:** attacker sent from look-alike domain
  - The technical distinction substantially affects PDPA notifiability and insurance coverage
- Forwarding rule investigation - common attacker technique
- Email lateral movement - did attacker access other systems?
- Customer / supplier data exposure assessment

#### PDPA notifiability assessment

Under [the section 26D filing process](/procedural-howto/how-to-file-pdpa-data-breach-notification-singapore), PDPA notification required where:
- Unauthorised access to personal data
- Likely to result in significant harm to affected individuals
- Affects 500 or more individuals (regardless of harm)

For BEC, the question is whether attacker accessed:
- Customer email and personal data (notifiable if the breach is likely to cause significant harm to an affected individual or affects 500 or more individuals)
- Supplier email and personal data (notifiable on the same test: significant harm to an affected individual is likely, or 500 or more individuals are affected)
- Internal HR / payroll data (notifiable if the breach is likely to cause significant harm to an affected individual or affects 500 or more individuals; a breach of an individual's full name, alias or identification number together with their salary or other remuneration is deemed to cause significant harm, subject to the exclusions in the Personal Data Protection (Notification of Data Breaches) Regulations 2021, such as publicly available data)
- Pure financial transaction data of corporate counterparties (typically not personal data)

**3-day clock starts** when SME makes the assessment that breach is notifiable - not when first detected. Conservative assessment recommended.

#### The insurance trap: why standard cover may not respond

**Commercial crime / fidelity policy.**

Commercial crime policies can cover:
- Direct theft by employee
- Forgery of internal documents
- Computer fraud (theft via direct system access)

Policies can exclude or sublimit:
- "Voluntary parting" of funds - i.e., where employee is induced to authorise payment
- Social engineering - i.e., where instruction comes from outside but employee acts
- This is exactly the BEC scenario

**Social Engineering Fraud (SEF) endorsement.**

Specific endorsement to crime policy or cyber policy:
- Verification conditions (some wordings require call-back or multi-channel verification)
- Specific exclusions for repeated patterns

**Cyber policy.**

Some cyber policies require:
- "System breach" or "security incident" trigger
- Pure social engineering may not trigger
- BEC may not trigger if no actual system compromise
- Specific "Funds Transfer Fraud" or "Cyber Fraud" sublimits exist on some policies

**The result.** Without specific SEF endorsement and clear policy wording on BEC scenarios, SMEs may face full BEC loss with no insurance recovery. Pre-incident broker discussion is critical.

#### What to ask broker now

Before incident:
- Is SEF endorsement on crime policy?
- Is "Funds Transfer Fraud" sublimit on cyber policy?
- What verification protocol does insurer require?
- Are sublimits adequate for typical exposure?

Post-incident:
- Notification timing per each policy
- Specific exclusions to assess
- Defence and recovery cost cover
- Coordination with bank recovery efforts

#### Recovery probability factors

Recovery probability depends on:
- **Speed of detection** - ScamShield advises acting fast, as scam syndicates typically move funds quickly between multiple bank accounts, including overseas accounts
- **Destination** - domestic Singapore bank vs offshore vs crypto
- **Beneficiary type** - established business vs mule account vs newly opened account
- **Police engagement quality** - case prioritisation
- **Bank cooperation** - SPF cannot freeze or seize an overseas account or compel a foreign bank to reverse a transaction, so recovery from offshore accounts is harder

ScamShield states that "the chance of recovery once the funds have been transferred out of Singapore is very low".

#### Common BEC patterns

**CFO impersonation.**
Attacker impersonates CFO and emails Finance team requesting urgent wire transfer. Often timed for after-hours when verification difficult.

**Supplier bank detail change.**
Attacker impersonates legitimate supplier and emails Accounts Payable with "new bank details" for upcoming payment.

**Vendor Email Compromise.**
Attacker actually compromises a supplier's mailbox; legitimate-looking emails from real domain redirect payments.

**Deepfake voice / video.**
Attacker uses AI-generated voice or video clip impersonating CEO instructing payment to specific party.

**Title-deed / property transaction.**
Attacker intercepts conveyancing transaction and substitutes payment instructions.

#### Defensive controls (post-incident review)

For each pattern, defensive controls should include:
- Multi-channel verification (callback to known number, in-person confirmation)
- Specific second-signatory requirements
- Maximum amount thresholds for single-channel approval
- MFA on all email accounts
- Specific email security rules (forwarding rule monitoring, foreign sign-in alerts)
- Supplier bank detail change verification protocol

### Common Mistakes / What Goes Wrong

1. **Bank notification delay.** Recovery window closes; funds dispersed.

2. **No SEF endorsement.** A standard crime policy may exclude social engineering losses, leaving a typical BEC loss uncovered.

3. **Cyber policy "system breach" trigger.** Pure social engineering may not be covered.

4. **PDPA notifiability missed.** Customer data exposure not assessed.

5. **Forensic preservation gap.** Email logs auto-rotated; evidence lost.

6. **Police report unfiled.** Insurers can ask for a police report as evidence of the loss; check the policy's claims conditions.

7. **Multiple-channel verification absent.** Same controls that allowed BEC remain.

8. **Mailbox compromise undetected.** Attacker may retain access for further theft.

9. **Customer notification gap.** Affected customers / suppliers not informed.

10. **Repeated patterns.** Same SME victim of repeat BEC due to publicly known weakness.

### What This Means for Your Business

For Singapore SMEs facing BEC scenarios:

1. **Bank fraud lines** - preprogrammed in finance team contacts.

2. **Police engagement protocol** - e-Services and ScamShield 1799 procedure.

3. **Insurance coverage map** - SEF endorsement, FTF sublimit, cyber trigger language.

4. **Forensic capability** - pre-engaged DFIR firm with retainer.

5. **Email security controls** - MFA, forwarding rule monitoring, foreign sign-in alerts.

6. **Verification protocol** - multi-channel for all material transactions.

7. **PDPA assessment framework** - quick determination of notifiability.

8. **Communication plan** - internal, customer, supplier.

9. **Annual broker review** - endorsements, sublimits, exclusions.

10. **Tabletop exercise** - annual BEC simulation with finance and IT.

### Questions to Ask Your Adviser

1. For our crime policy, is SEF endorsement specifically included and what is the sublimit?
2. For our cyber policy, what triggers cover (system breach? pure social engineering? both?)
3. For email security, are MFA, forwarding rule monitoring, foreign sign-in alerts in place?
4. For verification protocol, is multi-channel verification mandatory for material transactions?
5. For incident response, is pre-engaged DFIR firm with retainer established?

### Related Information
- [Cyber-Extortion Event Response: Singapore Framework for Ransomware, Data Theft, and Payment Decisions](/crisis/cyber-extortion-event-response)
- [We Just Discovered an Employee Has Embezzled From Us - What Do I Do Now?](/crisis/employee-embezzlement-discovered)
- [PDPC Enforcement Escalation 2024-2026: Marina Bay Sands SGD 315,000 and the Pattern Insurers Are Underwriting Against](/regulatory-change/pdpc-enforcement-escalation-mbs-marina-bay-sands-2025)

*Published 6 May 2026. Source verified 6 May 2026.*
