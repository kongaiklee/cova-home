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
word_count: 1168
status: "published"
hero_image: "/assets/blog/procedural-howto.jpg"
canonical_url: "https://covarage.com/guides/procedural-howto/cyber-ransomware-claim-process"
meta_description: "The first 4 hours after detection define whether you have an insurable, defensible incident or a self-inflicted disaster. Here's the order."
og_title: "How to File a Cyber Insurance Claim After a Ransomware Attack"
og_description: "The first 4 hours after detection define whether you have an insurable, defensible incident or a self-inflicted disaster. Here's the order."
---

### The Answer in 60 Seconds

> Per CSA's SingCERT (csa.gov.sg/resources/singcert) and the PDPC (pdpc.gov.sg), the post-ransomware sequence is: **isolate** affected systems, **preserve evidence**, **notify your cyber insurer within hours** per the policy notification clause, **engage the insurer's panel forensics** before paying or responding to attackers, **assess data-breach notifiability**, and - if the breach is notifiable under **Section 26D(1) of the PDPA** - notify the PDPC "as soon as practicable, but in any case, no later than three (3) calendar days" (PDPC, Report Your Organisation's Data Breach page). SingCERT incident reports go through csa.gov.sg/resources/singcert/cyber-aid; ransomware reports are also lodged with the Singapore Police. The Cybersecurity (Amendment) Act 2024 added new reporting duties for CII owners (effective 31 October 2025) - for non-CII SMEs, PDPA remains the primary regulatory clock.

### The Step-by-Step

The first 4 hours after detection define whether you have an insurable, defensible incident or a self-inflicted disaster. Here's the order.

**Step 1 - Hour 0-1: Contain and disconnect.**
- Isolate affected hosts from the network (unplug, disable Wi-Fi, segment the VLAN).
- Do **not** wipe machines, reboot, or "clean up." Forensic value depends on memory and disk being preserved.
- Do **not** pay the ransom yet - and do not engage with the attacker.

**Step 2 - Hour 0-2: Activate your incident response plan.**
- Convene the response team: IT lead, DPO (if appointed), legal, senior management.
- Time-stamp every action in an Incident Record Log. PDPC's Guide to Managing Data Breaches 2.0 explicitly requires this log.

**Step 3 - Hour 0-4: Notify the cyber insurer.**
This matters more than people realise. Most cyber policies have a **panel forensics, panel legal, panel PR** model - meaning the insurer covers these costs only if you use the panel. Calling your own forensics firm before notifying the insurer often means the insurer won't reimburse those fees.

The insurer's notification window is typically "as soon as reasonably practicable" but some wordings say "within 72 hours" or "immediately." Read your policy. CMS Singapore notes late notification can let the insurer refuse cover.

**Step 4 - Hour 4-24: Engage the insurer's incident response team.**
Panel forensics will:
- Image affected systems (preserves court-admissible evidence).
- Identify the ransomware variant and any data exfiltration ("double extortion").
- Determine scope: which records, how many individuals, what data types.

**Step 5 - Day 1-30: Run the data-breach assessment expeditiously.**
PDPC's Guide on Managing and Notifying Data Breaches under the PDPA states the assessment should be conducted "expeditiously" within 30 days from initial awareness. Two thresholds trigger PDPC notification:
- **Significant harm** to affected individuals (e.g., NRIC, financial account, health data, login credentials per the Notification of Data Breaches Regulations 2021 Schedule), **or**
- **500 or more individuals** affected.

**Step 6 - Notify PDPC within 3 calendar days of assessment.**
Per Section 26D(1) of the PDPA and the PDPC's Guide (Part III, footnote 6): "The first day of the three days starts on the day after the organisation makes the determination that there is a notifiable breach. To illustrate, if an organisation determines on 1st January that a data breach is notifiable, it must notify the Commission by 4th January." Use the PDPC online breach-notification form. If significant harm is likely, notify affected individuals "as soon as practicable, at the same time or after notifying the Commission."

**Step 7 - Notify SingCERT and the Police (recommended).**
SingCERT incident reporting: csa.gov.sg/resources/singcert/cyber-aid. Per CSA: "If you have submitted a report to us, we will review your report and get back to you within 3 working days." For ransomware specifically, the Singapore Police Force ransomware page states: "Lodge an online police report. Upon lodging a police report, the Singapore Cyber Emergency Response Team (SingCERT)…will also be notified."

**Step 8 - Decide: pay, restore, or both - with the insurer in the loop.**
The insurer's policy and panel will inform this decision. There is no Singapore law prohibiting ransom payment per se, but payments can implicate sanctions screening (the attacker may be sanctioned), money-laundering reporting, and reputation risks. Cyber policies vary on whether ransom payment is covered and under what conditions.

**Step 9 - Document Business Interruption losses.**
Most cyber policies cover business interruption - lost gross profit during downtime, increased cost of working, dependent BI if a key vendor is hit. The forensic clock (when systems are first impaired to when they are restored) and your management accounts are the two critical inputs. Keep daily logs.

**Step 10 - Submit the claim and supporting documentation.**
The insurer will issue a claim form. Documents typically include: incident timeline, forensics report, PDPC notification (where filed), SingCERT report, BI loss calculation with management accounts, all panel-vendor invoices.

**Note for CII owners.** The Cybersecurity (Amendment) Act 2024, with key provisions in force from **31 October 2025**, expands incident reporting for owners of Critical Information Infrastructure to **within 2 hours** of becoming aware of certain incidents (CSA press release, "Provisions in the Cybersecurity (Amendment) Act to Come Into Force on 31 October 2025"). Most SMEs are not CII; this 2-hour clock is in addition to, not in place of, the PDPA 3-day clock for personal-data breaches.

### Common Mistakes / What Goes Wrong

1. **Calling your own IT vendor before the insurer.** Burns your panel-forensics cover.
2. **Wiping or rebuilding machines too fast.** Destroys evidence; insurer may decline because cause-of-loss can't be established.
3. **Negotiating with attackers solo.** Specialist negotiators (often via the insurer panel) materially affect outcomes; DIY raises sanctions risk.
4. **Missing the PDPC 3-day window because "we were still investigating."** PDPC accepts initial notification with the information available; you can update later. Late notification is itself a regulatory issue.
5. **Confusing PDPC notification with SingCERT reporting.** They are different. PDPC is mandatory if thresholds are met. SingCERT is encouraged for almost all incidents.

### What This Means for Your Business

For SMEs without dedicated security teams, cyber insurance is increasingly less about *paying for a breach* and more about **buying access to the panel response infrastructure** - forensics, legal, breach-counsel, PR. The financial backstop matters; the response capability often matters more in the first 72 hours.

Three things to do *before* an incident:
1. Run a tabletop exercise annually. PDPC explicitly recommends this.
2. Pre-identify your insurer's incident hotline and save it offline (not just on the systems that may be encrypted).
3. Maintain offline, immutable backups. The fastest way out of a ransomware crisis is a clean restore. Insurance pays for the loss; backups prevent it.

### Questions to Ask Your Adviser

1. What is my policy's notification window - hours or days?
2. Who is on the insurer's panel for forensics, legal, breach counsel, and PR?
3. Does my policy cover ransom payments, and under what conditions (sanctions screening, prior consent)?
4. What is the BI waiting period (often 8-12 hours) and indemnity period?
5. Is system restoration cost (rebuild, reinstall) covered separately from BI?

### Related Information
- PDPA mandatory data breach notification: the 3-day clock explained
- Cybersecurity (Amendment) Act 2024: what changed on 31 October 2025
- Cyber insurance buying basics for Singapore SMEs

*Published 3 May 2026. Source verified 3 May 2026.*

---
