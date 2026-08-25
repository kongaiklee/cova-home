---
title: "Our Systems Are Locked and the Attackers Want Bitcoin — What Do I Do Now?"
slug: "/crisis/cyber-extortion-ransomware"
category: "crisis"
intent: "steady-the-ship"
topics: ["Cyber"]
industries: []
agencies: ["PDPC", "Singapore Statutes", "CSA", "SPF"]
article_number: 164
published: "2026-05-05"
source_verified: "2026-05-05"
word_count: 1429
status: "published"
hero_image: "/assets/blog/crisis.jpg"
canonical_url: "https://covarage.com/crisis/cyber-extortion-ransomware"
meta_description: "Stop. Don't pay, don't power-cycle, don't communicate with attackers without specialist guidance. Disconnect affected systems from the network (don't..."
og_title: "Our Systems Are Locked and the Attackers Want Bitcoin — What Do I Do Now?"
og_description: "Stop. Don't pay, don't power-cycle, don't communicate with attackers without specialist guidance. Disconnect affected systems from the network (don't..."
---

> **The Answer in 60 Seconds**
>
> Stop. Don't pay, don't power-cycle, don't communicate with attackers without specialist guidance. **Disconnect** affected systems from the network (don't power off — power-on RAM may contain forensic evidence), **engage your Cyber Liability incident response panel** immediately (most policies have 24/7 panel access), **engage Cyber-experienced commercial counsel**, and notify **[PDPC](https://www.pdpc.gov.sg/)** within **3 days** if personal data has been or is likely to be compromised under [PDPA Section 26D](https://sso.agc.gov.sg/Act/PDPA2012). For [CSA-designated CII](https://www.csa.gov.sg/), incident reporting within **2 hours** is mandatory under the [Cybersecurity Act 2018 with 2024 amendments](https://sso.agc.gov.sg/Act/CA2018). [SPF](https://www.police.gov.sg/) reporting addresses the criminal dimension. **Insurance is central:** Cyber Liability with comprehensive ransomware / cyber-extortion provisions is foundational. The decision whether to pay ransom is operational, legal (potential sanctions exposure), and reputational — best made with specialist counsel and insurer engagement.

### The Step-by-Step

For Singapore SMEs, ransomware and cyber-extortion incidents have become increasingly common. The single most important thing: **engage your Cyber Liability panel before doing anything operational** — they have the playbook, the specialist providers, and the authority to coordinate response.

#### Hour 0–2 — Immediate response

The first 2 hours determine outcome trajectory.

**1. Don't pay.** Don't communicate with attackers, don't transfer cryptocurrency, don't engage with their negotiation channel. Specialist guidance first.

**2. Don't power-off.** Disconnect from the network instead. Power-on RAM may contain forensic evidence (encryption keys, attacker presence indicators, lateral movement traces). Specialist forensic teams will guide preservation.

**3. Engage Cyber Liability panel.** Most Cyber policies provide 24/7 incident response with pre-arranged forensic specialists, counsel, PR, and notification providers. The panel is the playbook.

**4. Document scope.** What systems are affected, the timeline of detection, observed operational impact, and commercial scope.

**Communication discipline:**

Internal: senior team awareness, designated spokesperson, operational coordination.

External (NOT YET): don't communicate with customers, suppliers, or media. Premature communication creates commercial and legal exposure that compounds the incident.

**Initial scope assessment:**

- Systems affected (full encryption, partial, specific data)
- Data exfiltration parallel to encryption (common in modern ransomware)
- Operational impact and continuity assessment
- Commercial scope of affected data and systems

#### Hour 2–24 — Engagement and assessment

**Cyber Liability panel response:**

The panel typically includes:

- **Forensic incident response specialists** — identify entry vector, scope assessment, exfiltration assessment, evidence preservation, recovery planning
- **Commercial counsel** (often pre-approved) — regulatory compliance, notification obligations, commercial scope, criminal / regulatory engagement
- **PR / communications specialist** — message preparation for affected stakeholders
- **Notification specialist** — affected individual communication coordination
- **Ransom negotiation specialist** (where applicable) — communication with attackers if engagement is decided

#### PDPA Section 26D notification

Per [PDPA Section 26D](https://sso.agc.gov.sg/Act/PDPA2012):

When personal data is likely to result in **significant harm** to individuals, organisations must notify:

- [PDPC](https://www.pdpc.gov.sg/) within **3 calendar days**
- Affected individuals as soon as practicable

**What counts as significant harm.** The PDPA framework, and the PDPC's Advisory Guidelines, treat certain data categories as carrying a presumption of significant harm — including NRIC and FIN numbers, account credentials, and financial information. A breach involving those categories is treated as notifiable.

**Significant scale (500+ individuals):**

A breach affecting 500 or more individuals is notifiable regardless of the significant-harm classification.

**Operational discipline:**

- Notification template and messaging coordinated with PDPC
- Affected individual communication
- Records of notification process

#### CSA notification (if CII)

Per the [Cybersecurity Act 2018 with 2024 amendments](https://sso.agc.gov.sg/Act/CA2018), for [CSA-designated CII](https://www.csa.gov.sg/) (see [Article 148](/document-legal/cybersecurity-act-cii-obligations)):

**2-hour reporting:**

Specific incident reporting within 2 hours of detection. Material non-compliance is a direct regulatory breach.

**FDI scope (post-2024 Amendment):**

Foundational Digital Infrastructure expanded reporting obligations.

#### SPF reporting

Cyber-extortion is a criminal matter. Engagement with [SPF Cybercrime](https://www.police.gov.sg/) is appropriate, with specific commercial confidentiality and operational coordination considerations.

#### Day 1–7 — Recovery decision

**Recovery options:**

**Option A: Backup restore.** Viable if backups are clean, isolated, and recent. Modern attackers often dwell in networks for weeks before triggering encryption — backups during dwell may be compromised.

**Option B: Decryption tool.** For some ransomware variants, free decryption tools exist (NoMoreRansom.org). Less common for sophisticated current variants.

**Option C: Pay ransom.** Complex decision requiring specialist guidance.

#### The ransom payment decision

**Factors against payment:**

- No guarantee of decryption (attackers don't always provide working keys)
- Re-victimisation risk (paying marks you as a paying target)
- Reputational impact when payment becomes public
- Incentivising further attacks against the broader ecosystem
- Potential sanctions exposure if payment goes to designated entities

**Factors potentially supporting payment:**

- Operational continuity necessity (industry / operational reality)
- Commercial considerations
- Data recovery where backups inadequate

**Sanctions considerations:**

International sanctions frameworks (US OFAC, EU, UK) restrict payments to designated entities and individuals. Many ransomware groups have known sanctions linkages. Payment without sanctions screening creates potential criminal exposure for company and individuals.

**Cyber Liability provisions:**

Most Cyber policies have:

- Cyber-extortion sub-limit (often lower than overall policy limit)
- Approval requirements (insurer typically approves before payment)
- Coordinated through the panel
- Sanctions screening at insurer level

#### Data exfiltration considerations

Modern ransomware combines encryption with data exfiltration:

**"Double extortion" / "Triple extortion":**

- Encryption for operational disruption
- Data exfiltration for additional leverage (threat to publish)
- Triple extortion adds DDoS or direct customer / supplier outreach

**Exfiltration response:**

- Scope assessment (what was taken, how sensitive)
- Notification considerations (PDPA, contractual, customer communication)
- Operational considerations for high-stakes data categories

#### Specific scenarios

**Scenario A: Small SME (general business) ransomware.** Standard recovery framework, PDPA assessment, insurance panel-driven response. Recovery typically days to weeks depending on backup quality.

**Scenario B: Professional services firm with significant client data.** Significant PDPA exposure, client communication priority, commercial sophistication required for client retention.

**Scenario C: CII operator (financial services, healthcare, telecom).** 2-hour CSA reporting, elevated regulatory engagement, sector-specific scrutiny, potential MAS / MOH / IMDA coordination depending on sector.

**Scenario D: SME with cross-border operations and customer data.** Multi-jurisdictional notification (Singapore PDPA + relevant foreign data protection authorities), commercial complexity, operational sophistication required.

#### Cyber Liability cover categories

**1. First-party costs:**

- Forensic investigation
- Commercial recovery
- Notification costs
- PR / communications

**2. Cyber-extortion:**

- Ransom payment (where approved)
- Negotiation costs
- Sanctions screening

**3. Business interruption:**

- Operational disruption from incident
- Waiting period (typically 8-12 hours)
- Operational scope

**4. Third-party liability:**

- Customer claims
- Specific regulatory exposure (defence costs)
- Commercial dispute scenarios

#### Long-term recovery and prevention

The asymmetry: prevention through cyber maturity costs proportionate; reactive incident response without preparation can be substantial. Investment in:

- MFA across all systems (foundational)
- Endpoint detection and response (EDR)
- Backups (offline / immutable / tested)
- Incident response infrastructure pre-arranged
- Specific staff awareness training

### Common Mistakes / What Goes Wrong

1. **Powering-off compromised systems before forensic preservation.** Evidence destruction.
2. **Communicating with attackers without specialist guidance.** Commercial / legal exposure.
3. **No Cyber Liability with appropriate cyber-extortion provisions.** Major cover gap.
4. **No incident response panel pre-engagement.** Crisis is wrong moment for provider selection.
5. **PDPA Section 26D notification missed or delayed.**
6. **CSA 2-hour reporting missed (if CII).**
7. **Premature external communication.** Commercial / reputational exposure.
8. **No viable backup / restore capability.** Operational dependency on payment.
9. **Sanctions exposure not assessed for ransom payment.** Potential criminal exposure.
10. **No prevention infrastructure post-incident.** Same vulnerability remains.

### What This Means for Your Business

For Singapore SMEs facing or planning for cyber-extortion:

1. **Comprehensive Cyber Liability with cyber-extortion provisions is foundational.** Don't operate without.
2. **Pre-engage the incident response panel.** Crisis is the wrong moment for first contact.
3. **Maintain offline / immutable backups.** Reduces operational dependency on payment.
4. **Build PDPA Section 26D notification readiness.** The 3-day clock is short.
5. **For CII, build 2-hour reporting capability.** Direct compliance requirement.
6. **Document prevention infrastructure.** Demonstrates cyber maturity to insurer and regulator.
7. **For specific industries (financial services, healthcare, CII), specialised counsel and broker.** Commercial sophistication matters.
8. **Annual review covering threat landscape evolution.** Threats evolve rapidly.

The asymmetry: prevention through cyber maturity and Cyber Liability cover costs proportionate; reactive incident response without preparation is substantial.

### Questions to Ask Your Adviser

1. For my organisation profile, what Cyber Liability scope is appropriate?
2. Does my Cyber include cyber-extortion provisions and approval framework?
3. For incident response, is there 24/7 panel access pre-arranged?
4. For CII / FDI scope, what specific compliance and cover applies?
5. For ransom payment scenarios, what sanctions and approval frameworks apply?

### Related Information
- [PDPA Section 26D Mandatory Data Breach Notification: The 3-Day Clock Explained](/document-legal/pdpa-section-26d-breach-notification)
- [Cybersecurity Act 2018 (with 2024 Amendments): What Singapore CII Owners and Service Providers Need to Know](/document-legal/cybersecurity-act-cii-obligations)
- /procedural-howto/bec-social-engineering-claim-process

*Published 5 May 2026. Source verified 5 May 2026.*
