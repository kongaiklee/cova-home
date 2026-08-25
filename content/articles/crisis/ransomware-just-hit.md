---
title: "We Just Discovered Ransomware on Our Systems — What Do I Do Now?"
slug: "/crisis/ransomware-just-hit"
category: "crisis"
intent: "steady-the-ship"
topics: ["Cyber"]
industries: []
agencies: ["Singapore Statutes", "PDPC", "CSA"]
article_number: 81
published: "2026-05-04"
source_verified: "2026-05-04"
word_count: 1696
status: "published"
hero_image: "/assets/blog/crisis.jpg"
canonical_url: "https://covarage.com/crisis/ransomware-just-hit"
meta_description: "The first 4 hours determine the outcome. Hour 0: isolate affected systems (disconnect from network — do NOT power off, which destroys forensic evidence)...."
og_title: "We Just Discovered Ransomware on Our Systems — What Do I Do Now?"
og_description: "The first 4 hours determine the outcome. Hour 0: isolate affected systems (disconnect from network — do NOT power off, which destroys forensic evidence)...."
---

> **The Answer in 60 Seconds**
>
> The first 4 hours determine the outcome. **Hour 0:** isolate affected systems (disconnect from network — do NOT power off, which destroys forensic evidence). **Hour 0–1:** call your cyber insurer's 24-hour incident hotline before calling your IT vendor — engaging your own forensics first often voids panel-forensics cover. **Hour 1–4:** insurer-panel forensics begins; assess scope, identify variant, determine if data exfiltration occurred. **Day 1–30:** assess if breach is notifiable under [PDPA Section 26D](https://sso.agc.gov.sg/Act/PDPA2012); if yes, notify [PDPC](https://www.pdpc.gov.sg/) within **3 calendar days** of determination. Do NOT pay ransom without insurer and panel counsel involvement (sanctions screening, conditions of policy cover). Do NOT speak to attackers without panel negotiator. Document everything in time-stamped log.

### The Step-by-Step

A ransomware incident is a fast-moving regulatory and operational crisis. Decisions made in the first hours determine whether the cyber insurance responds, whether the regulatory exposure is manageable, and whether the business survives the operational disruption. The sequence below assumes you hold standalone Cyber insurance with panel access — if you don't, see [Article 72](/comparison/cyber-standalone-vs-par-sublimit) on the structural gap.

#### Hour 0 — Detection and immediate response

Detection typically comes from one of:
- Encrypted file extensions appearing across systems
- Ransom note files (often `README.txt`, `HELP_DECRYPT.txt`, or similar) on multiple machines
- Unable to access shared drives, ERP, or critical applications
- Endpoint protection alerts about mass file modifications
- Operational complaints from staff ("everything's gone" / "files won't open")

**Within 5 minutes:**

- **Disconnect affected machines from the network.** Unplug Ethernet cables; disable Wi-Fi; if cloud-managed, isolate via management console. **Do not power off** — RAM contents and current process state are forensically valuable; powering off destroys this evidence.
- **Disconnect affected servers from each other.** Lateral movement is how ransomware spreads; segment the environment.
- **Stop all backups currently running** — running backups can overwrite clean copies with encrypted versions.
- **Notify senior management immediately** — incident commander designation matters; this is not an IT-only decision.

#### Hour 0–1 — Call the insurer first, IT vendor second

This is the single most-violated rule in ransomware response, and the most expensive.

**Call your cyber insurer's 24-hour incident hotline first.** Standalone Cyber policies typically have:
- Panel forensics (CrowdStrike, Mandiant, Kroll, Stroz Friedberg, etc.)
- Panel breach counsel (Singapore-based law firms with cyber practice)
- Panel ransomware negotiators
- Panel public relations
- Panel data recovery specialists

Engaging your own IT vendor or forensics firm first — even one you trust and have worked with for years — typically means:
- Panel-forensics cover not paid (insurer reimburses only panel work)
- Evidence may be inadvertently destroyed by well-meaning but non-specialist response
- Coordination with breach counsel becomes harder

**The insurer's panel will dispatch within 1–4 hours.** They take over technical incident response with the right tools and expertise.

If you do not have standalone Cyber insurance, the calculus is different — you'll engage your IT vendor or an emergency forensics firm directly, and pay out of pocket. The hourly rates for emergency cyber forensics are typically S$300–S$800+ per hour; full incident response can be S$50,000–S$500,000+ for an SME-scale event.

#### Hour 1–4 — Forensics and scope assessment

Panel forensics will:
- **Isolate and image** affected systems (preserves court-admissible evidence)
- **Identify the ransomware variant** — different families have different behaviours, decryption availability, and attribution
- **Determine if data was exfiltrated** ("double extortion" — data stolen and encrypted)
- **Map the attack timeline** — initial compromise, lateral movement, encryption execution
- **Identify the entry vector** — phishing, exposed RDP, vulnerable VPN, supply chain, insider
- **Assess scope** — which systems, which data, which records

**Do not communicate with the attackers** during this phase. The panel ransomware negotiator (if engaged) handles all communication. Direct communication risks escalation, sanctions exposure, and loss of negotiating position.

#### Hour 4–24 — Initial containment and decision points

Once scope is understood, key decisions:

**1. Restore from backups vs decrypt vs negotiate**

- **Restore from backups** — preferred if backups are clean, complete, and accessible. Forensics confirms backup integrity before restoration begins.
- **Decrypt** — some ransomware variants have available decryptors (No More Ransom Project, vendor releases). Panel forensics checks first.
- **Negotiate ransom** — last resort. Considerations:
  - Panel negotiator should handle, not the company
  - Sanctions screening on the attacker (paying sanctioned entities is illegal regardless of cyber insurance)
  - Insurance coverage of ransom payment varies by policy
  - Successful payment doesn't always result in successful decryption
  - Future targeting risk (paid victims sometimes re-targeted)

**2. Public communications**

Hold all public statements until the insurer's panel PR has reviewed. Premature disclosure can:
- Aggravate regulatory exposure
- Trigger third-party claims
- Affect contractual obligations
- Damage customer relationships

A typical sequence:
- Internal communication to staff (factual, supportive, security-aware)
- Customer communication (only as needed for service disruption; coordinate with breach counsel)
- Regulatory notification (required where applicable)
- Public statement (only if necessary; coordinated)

#### Day 1–7 — Regulatory assessment

**PDPA assessment under [Section 26C](https://sso.agc.gov.sg/Act/PDPA2012):**

The organisation must conduct an expeditious assessment of whether the breach is notifiable. The assessment considers:
- Categories of personal data affected
- Number of individuals affected
- Likely harm

A breach is notifiable if it (a) results in or is likely to result in significant harm to affected individuals, or (b) affects 500 or more individuals.

**Significant harm categories** include NRIC + name, account credentials, financial information, health data, biometric data — see [Article 66](/document-legal/pdpa-section-26d-breach-notification).

For ransomware specifically, the question of "data exfiltration" is critical:
- If only encrypted (not exfiltrated): may not constitute a confidentiality breach; may not trigger Section 26D
- If exfiltrated: strongly likely to trigger Section 26D

Forensics determines this. Some ransomware groups exfiltrate as standard; others do not. Recent variants typically do.

**If notifiable to PDPC:**
- Notify within **3 calendar days** of determining the breach is notifiable
- Use the [PDPC online breach notification form](https://eservice.pdpc.gov.sg/case/db)
- Notify affected individuals where significant harm is likely

**For CII operators:**

Per the [Cybersecurity (Amendment) Act 2024](https://www.csa.gov.sg/news-events/press-releases/provisions-in-the-cybersecurity--amendment--act-to-come-into-force-on-31-october-2025/), CII owners must report prescribed cybersecurity incidents to CSA **within 2 hours** of becoming aware. Most SMEs are not CII operators — see [Article 76](/document-legal/cybersecurity-act-cii-designation).

#### Week 1–4 — Recovery and remediation

**System restoration:**
- Rebuild affected systems from clean images or known-good backups
- Patch vulnerabilities exploited in the attack
- Reset all credentials (assume all credentials in the affected environment are compromised)
- Implement multi-factor authentication (if not already)
- Enhanced monitoring and detection
- Forensic verification before reconnecting to network

**Customer/partner notifications:**
- For affected individuals: as required under PDPA
- For business customers: per contractual obligations (some contracts require breach notification within specified windows)
- For credit card data: PCI-DSS notification obligations may apply

**Documentation:**
- Time-stamped incident log
- Section 26C assessment record
- Notifications sent (PDPC, individuals, partners)
- Forensic findings
- Remediation actions
- Costs incurred

#### Insurance claim under standalone Cyber

Standard Cyber claim file:
- Incident notification (initial and updates)
- Forensic report
- PDPC notification (where applicable)
- Affected individual notifications
- Panel vendor invoices (forensics, legal, PR, negotiator)
- Business interruption loss calculation with management accounts
- System restoration costs
- Ransom payment evidence (if paid and covered)
- Third-party claim correspondence (if any)
- Time records and operational impact documentation

The insurer will work with the claim throughout — typically 3–9 months for a moderate incident, longer for complex cases involving regulatory action or third-party claims.

### Common Mistakes / What Goes Wrong

1. **Calling IT vendor before cyber insurer.** Burns panel-forensics cover.
2. **Powering off affected machines.** Destroys forensic evidence in RAM.
3. **Continuing backups during incident.** Overwrites clean backups with encrypted versions.
4. **Negotiating ransom solo.** Sanctions exposure, legal complications, often poor outcome.
5. **Public disclosure before legal review.** Aggravates regulatory and contractual exposure.
6. **Late PDPC notification ("we were still investigating").** Late notification is a separate breach.
7. **Engaging own forensics with the intent to "save the insurer money."** Insurer doesn't reimburse non-panel work.
8. **Assuming cyber under PAR sub-limit will respond adequately.** Most PAR cyber sub-limits are S$50k–S$250k — rarely enough for a real incident.
9. **No incident response plan rehearsed.** First-time responders make first-time mistakes; tabletop exercises matter.
10. **Treating PDPC and SingCERT as the same.** Different regulators, different reporting purposes.

### What This Means for Your Business

For Singapore SMEs without a dedicated security team — which is most SMEs — the value of standalone Cyber insurance is increasingly less about indemnity and more about **access to incident response infrastructure**. Panel forensics, panel breach counsel, panel PR, panel negotiators — these are services SMEs cannot easily access at incident time on a one-off basis.

The pre-incident discipline that saves businesses:

1. **Standalone Cyber insurance with appropriate limits and panel.** See [Article 72](/comparison/cyber-standalone-vs-par-sublimit).
2. **Insurer's 24-hour incident hotline saved offline** — on mobile phones, laminated cards, anywhere not on the systems that may be encrypted.
3. **Tabletop exercise annually.** PDPC explicitly recommends this in the [Guide on Managing and Notifying Data Breaches](https://www.pdpc.gov.sg/help-and-resources/2021/01/guide-on-managing-and-notifying-data-breaches-under-the-pdpa). For SMEs, a 2-hour annual exercise covering a representative scenario.
4. **Offline, immutable backups.** The fastest way out of ransomware is a clean restore. Insurance pays for the loss; backups prevent it.
5. **Multi-factor authentication everywhere.** Most SME ransomware incidents start with credential compromise.
6. **Patching discipline.** Unpatched VPN appliances, RDP exposed to the internet, unpatched email gateways — these are the most common entry vectors.
7. **Phishing-resistant email security.** Filtering, user training, attachment sandboxing.

The objective post-incident is to limit damage; the objective pre-incident is to make damage less likely. Both are necessary. Insurance funds the response but does not prevent the incident.

### Questions to Ask Your Adviser

1. What is my Cyber policy's notification window, and what's the 24-hour hotline?
2. Who is on the insurer's panel for forensics, breach counsel, ransomware negotiation, and PR?
3. Does my policy cover ransom payment, and under what conditions (sanctions screening, prior consent)?
4. What is the BI waiting period and indemnity period for cyber-caused interruption?
5. What pre-incident services does the policy include (tabletop exercises, vulnerability scanning, training)?

### Related Information
- [How to File a Cyber Insurance Claim After a Ransomware Attack](/procedural-howto/cyber-ransomware-claim-process)
- [PDPA Section 26D Mandatory Data Breach Notification: The 3-Day Clock Explained](/document-legal/pdpa-section-26d-breach-notification)
- [Standalone Cyber Insurance vs Cyber Sub-Limit Under PAR: What's the Difference?](/comparison/cyber-standalone-vs-par-sublimit)

*Published 4 May 2026. Source verified 4 May 2026.*
