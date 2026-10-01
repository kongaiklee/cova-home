---
title: "How to File a Cyber Insurance Claim After a Ransomware Attack"
slug: "/procedural-howto/cyber-ransomware-claim-process"
category: "procedural-howto"
intent: "get-it-right"
topics: ["Cyber"]
industries: []
agencies: []
article_number: 37
published: "2026-05-03"
source_verified: "2026-05-03"
updated: "2026-08-30"
word_count: 1168
status: "published"
hero_image: "/assets/blog/procedural-howto.jpg"
canonical_url: "https://covarage.com/guides/procedural-howto/cyber-ransomware-claim-process"
meta_description: "Isolate, preserve evidence, notify the cyber insurer as your policy requires, and check whether it pays only for panel or pre-approved response firms."
og_title: "How to File a Cyber Insurance Claim After a Ransomware Attack"
og_description: "Isolate, preserve evidence, notify the cyber insurer as your policy requires, and check whether it pays only for panel or pre-approved response firms."
---

### The Answer in 60 Seconds

> CSA's Ransomware Response Checklist and the PDPC's breach guidance set out the steps on your side: **isolate** affected systems, **preserve evidence** and **assess data-breach notifiability**. Your cyber policy's own terms decide when to **notify your cyber insurer** and whether you must **use the insurer's panel or pre-approved firms** before paying or responding to attackers. If the breach is notifiable under **Section 26D(1) of the PDPA**, notify the PDPC "as soon as practicable, but in any case, no later than three (3) calendar days" (PDPC, Guide on Managing and Notifying Data Breaches under the PDPA). SingCERT incident reports go through csa.gov.sg/resources/singcert/cyber-aid; ransomware reports are also lodged with the Singapore Police. The Cybersecurity (Amendment) Act 2024 added new reporting duties for CII owners (effective 31 October 2025) - for non-CII SMEs, PDPA remains the primary regulatory clock.

### The Step-by-Step

The first 4 hours after detection define whether you have an insurable, defensible incident or a self-inflicted disaster. Here's the order.

**Step 1 - Hour 0-1: Contain and disconnect.**
- Isolate affected hosts from the network (unplug, disable Wi-Fi, segment the VLAN).
- Do **not** wipe machines, reboot, or "clean up." Forensic value depends on memory and disk being preserved.
- Do **not** pay the ransom yet - and do not engage with the attacker.

**Step 2 - Hour 0-2: Activate your incident response plan.**
- Convene the response team: IT lead, DPO (if appointed), legal, senior management.
- Time-stamp every action in an Incident Record Log. PDPC's Guide on Managing and Notifying Data Breaches under the PDPA (revised 15 March 2021) says the details of the breach and the response should be recorded in an Incident Record Log, and that the organisation must document the steps it took to assess the breach.

**Step 3 - Hour 0-4: Notify the cyber insurer.**
This matters more than people realise. Cyber policies can name **panel** firms for forensics, legal and PR, and the terms differ: one Singapore wording pays for a forensics, PR or law firm the business appoints itself only where the insurer approved that firm before the appointment, while another pays for non-panel response vendors with a different excess. Calling your own forensics firm before notifying the insurer can mean the insurer will not reimburse those fees.

The notification window is set by your policy's notice clause. One Singapore cyber wording, for example, requires written notice "as soon as practicable" after a responsible officer becomes aware of the event and makes that a condition precedent to cover. Read your policy. CMS Singapore notes late notification can let the insurer refuse cover.

**Step 4 - Hour 4-24: Engage the insurer's incident response team.**
Panel forensics will:
- Image affected systems (preserves court-admissible evidence).
- Identify the ransomware variant and any data exfiltration ("double extortion").
- Determine scope: which records, how many individuals, what data types.

**Step 5 - Day 1-30: Run the data-breach assessment expeditiously.**
PDPC's Guide on Managing and Notifying Data Breaches under the PDPA states the assessment should be conducted "expeditiously" within 30 days from initial awareness. Two thresholds trigger PDPC notification:
- **Significant harm** to affected individuals (for example, under reg 3 of the Personal Data Protection (Notification of Data Breaches) Regulations 2021 a breach is deemed to cause significant harm where it relates to an individual's full name, alias or identification number, such as an NRIC number, together with data listed in Part 1 of the Schedule, such as a bank account or credit card number or specified medical information; or to an account identifier together with its password or other access data), **or**
- **500 or more individuals** affected.

**Step 6 - Notify PDPC within 3 calendar days of assessment.**
Per Section 26D(1) of the PDPA and the PDPC's Guide (Part III, footnote 6): "The first day of the three days starts on the day after the organisation makes the determination that there is a notifiable breach. To illustrate, if an organisation determines on 1st January that a data breach is notifiable, it must notify the Commission by 4th January." Use the PDPC online breach-notification form. If significant harm is likely, notify affected individuals "as soon as practicable, at the same time or after notifying the Commission."

**Step 7 - Notify SingCERT and the Police (recommended).**
SingCERT incident reporting: csa.gov.sg/resources/singcert/cyber-aid. Per CSA: "If you have submitted a report to us, we will review your report and get back to you within 3 working days." For ransomware specifically, the Singapore Police Force ransomware page states: "Lodge an online police report. Upon lodging a police report, the Singapore Cyber Emergency Response Team (SingCERT)…will also be notified."

**Step 8 - Decide: pay, restore, or both - with the insurer in the loop.**
The insurer's policy and panel will inform this decision. There is no Singapore law prohibiting ransom payment per se, but payments can implicate sanctions screening (the attacker may be sanctioned), money-laundering reporting, and reputation risks. Cyber policies vary on whether ransom payment is covered and under what conditions.

**Step 9 - Document Business Interruption losses.**
Cyber policies can include business interruption cover: lost profit during downtime, extra costs of keeping the business running and, in some wordings, interruption of a provider's system you rely on. The forensic clock (when systems are first impaired to when they are restored) and your management accounts are the two critical inputs. Keep daily logs.

**Step 10 - Submit the claim and supporting documentation.**
The insurer will issue a claim form. Documents typically include: incident timeline, forensics report, PDPC notification (where filed), SingCERT report, BI loss calculation with management accounts, all panel-vendor invoices.

**Note for CII owners.** The Cybersecurity (Amendment) Act 2024, with key provisions in force from **31 October 2025**, expands the incidents that owners of Critical Information Infrastructure must report to CSA **within 2 hours** of becoming aware of them, adding incidents suspected of being caused by Advanced Persistent Threats and incidents that disrupt an essential service through non-interconnected systems under the owner's control (CSA press release, "Provisions in the Cybersecurity (Amendment) Act to Come Into Force on 31 October 2025"). The 2-hour window itself has applied to CII owners since the Cybersecurity (Critical Information Infrastructure) Regulations 2018. Most SMEs are not CII; this 2-hour clock is in addition to, not in place of, the PDPA 3-day clock for personal-data breaches.

### Common Mistakes / What Goes Wrong

1. **Calling your own IT vendor before the insurer.** Can cost you cover for those fees if your policy pays only for panel or pre-approved firms.
2. **Wiping or rebuilding machines too fast.** Destroys evidence; insurer may decline because cause-of-loss can't be established.
3. **Negotiating with attackers solo.** Some cyber policies provide specialist help to negotiate with the attacker, and a payment made without checks can raise criminal-law and sanctions risks.
4. **Missing the PDPC 3-day window because "we were still investigating."** PDPC accepts initial notification with the information available; you can update later. Late notification is itself a regulatory issue.
5. **Confusing PDPC notification with SingCERT reporting.** They are different. PDPC is mandatory if thresholds are met. SingCERT is encouraged for almost all incidents.

### What This Means for Your Business

For SMEs without dedicated security teams, cyber insurance is increasingly less about *paying for a breach* and more about **buying access to the panel response infrastructure** - forensics, legal, breach-counsel, PR. The financial backstop matters; the response capability often matters more in the first 72 hours.

Three things to do *before* an incident:
1. Run a tabletop exercise annually. PDPC recommends joint tabletop exercises that simulate both cybersecurity incidents and data breaches, and periodic exercises or walkthroughs of the breach plan.
2. Pre-identify your insurer's incident hotline and save it offline (not just on the systems that may be encrypted).
3. Maintain offline, immutable backups. The fastest way out of a ransomware crisis is a clean restore. Insurance pays for the loss; backups prevent it.

### Questions to Ask Your Adviser

1. What is my policy's notification window - hours or days?
2. Who is on the insurer's panel for forensics, legal, breach counsel, and PR?
3. Does my policy cover ransom payments, and under what conditions (sanctions screening, prior consent)?
4. What is the BI waiting period (the hours of downtime before cover starts) and indemnity period?
5. Is system restoration cost (rebuild, reinstall) covered separately from BI?

### Related Information
- [PDPA Section 26D Mandatory Data Breach Notification: The 3-Day Clock Explained](/document-legal/pdpa-section-26d-breach-notification)
- [Cybersecurity (Amendment) Act 2024: What's In Force Now (and What Isn't)](/regulatory-change/cyber-act-2024)
- [Cyber Insurance for Singapore SMEs: The Complete Guide](/document-legal/cyber-insurance-complete-guide-singapore-sme)

*Published 3 May 2026. Source verified 3 May 2026.*

---
