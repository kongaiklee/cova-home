---
title: "Ransomware Active Negotiation Phase: Data Exfiltration, Sanctions Screening, Payment Decision"
slug: "/crisis/ransomware-active-negotiation-phase"
category: "crisis"
intent: "steady-the-ship"
topics: ["Property & Fire", "Cyber"]
article_number: 365
published: "2026-05-06"
source_verified: "2026-05-06"
word_count: 1695
status: "published"
hero_image: "/assets/blog/crisis.jpg"
canonical_url: "https://covarage.com/crisis/ransomware-active-negotiation-phase"
meta_description: "You are 24+ hours into a ransomware incident. Encryption is confirmed across multiple systems. The threat actor has issued a ransom demand, often with a..."
og_title: "Ransomware Active Negotiation Phase: Data Exfiltration, Sanctions Screening, Payment Decision"
og_description: "You are 24+ hours into a ransomware incident. Encryption is confirmed across multiple systems. The threat actor has issued a ransom demand, often with a..."
---

> **The Answer in 60 Seconds**
>
> You are 24+ hours into a ransomware incident. Encryption is confirmed across multiple systems. The threat actor has issued a ransom demand, often with a leak-site countdown for exfiltrated data. Existing /crisis articles cover the initial detection and the [PDPA](https://sso.agc.gov.sg/Act/PDPA2012) Section 26D 3-day notification clock. This article addresses the negotiation phase — the decision to pay, the regulatory and legal exposure, and the operational playbook. Critical decisions in the next 24-72 hours: (1) **engage external Digital Forensics & Incident Response (DFIR) firm and ransomware negotiator** — do NOT engage attacker directly without specialist support; (2) **separate breach coach legal counsel** from corporate counsel — privilege and conflict of interest considerations; (3) **OFAC and MAS sanctions screening of threat actor** — payment to a sanctioned entity is a criminal offence under [Terrorism (Suppression of Financing) Act 2002](https://sso.agc.gov.sg/Act/TSFA2002) and [US Treasury Office of Foreign Assets Control (OFAC)](https://ofac.treasury.gov/) lists; (4) **board-level "pay vs not-pay" decision** with structured CEO / CFO / Board chair input. Statutory exposure: [PDPA Section 26D](https://sso.agc.gov.sg/Act/PDPA2012) 3-day notification; [Cybersecurity (Amendment) Act 2024](https://sso.agc.gov.sg/Acts-Supp/19-2024/Published/20240704) supply-chain reporting if firm is a CII vendor; [CSA SingCERT](https://www.csa.gov.sg/) voluntary reporting. Insurance angles: cyber policy ransomware negotiation services pre-approval; ransom payment sub-limit; business interruption waiting period (typically 8-12 hours); data restoration; regulatory defence costs; third-party liability if customer data exposed. Reference: CSA recorded 132 ransomware cases in 2022, mostly affecting SMEs in manufacturing and retail.

### The Sourced Detail

Active ransomware negotiation is one of the most consequential 72-hour periods in SME crisis management. Decisions made in this phase commit the SME to specific payment positions, regulatory disclosure positions, and litigation exposures. Most insurance covers require specific pre-approvals during this phase that, if missed, exclude eventual recovery.

#### Reference enforcement and threat data

Per [CSA Singapore Cyber Landscape 2022 report](https://www.csa.gov.sg/) (released 23 June 2023): "The cases affected mostly Small-and-Medium Enterprises (SMEs) from sectors such as manufacturing and retail, as they may hold valuable data as well as Intellectual Property (IP), which cybercriminals often seek to extort and monetise for financial gain."

PDPC enforcement against ransomware-related Protection Obligation breaches per [Article 357](#article-357) framework:
- Singapore Data Hub Pte Ltd: SGD 17,500 (decision 7 April 2025) for 689,000-record exfiltration
- People Central Pte Ltd: SGD 17,500 (decision 8 January 2026) for 95,000 individuals plus 24,765 emergency contacts
- These are smaller-tier penalties; substantial breaches face larger penalties under the 10% turnover regime

#### Statutory framework engaged

**Primary statute (data protection).** [Personal Data Protection Act 2012](https://sso.agc.gov.sg/Act/PDPA2012) — Section 24 Protection Obligation; Section 26D 3-day notification.

**Cybersecurity framework.** [Cybersecurity Act 2018](https://sso.agc.gov.sg/Act/CA2018) and [Cybersecurity (Amendment) Act 2024](https://sso.agc.gov.sg/Acts-Supp/19-2024/Published/20240704) — applicable to Critical Information Infrastructure (CII) and certain regulated entities.

**Sanctions framework.**
- [Terrorism (Suppression of Financing) Act 2002](https://sso.agc.gov.sg/Act/TSFA2002) — Singapore criminal exposure for payment to sanctioned terrorist entities
- [US OFAC](https://ofac.treasury.gov/) — extraterritorial application; SDN list and SDGT list
- UN Security Council sanctions list
- Specific sanctions against ransomware-as-a-service operators (Conti, REvil, etc.)

**Cyber criminal framework.** [Computer Misuse Act 1993](https://sso.agc.gov.sg/Act/CMA1993) — applies to perpetrators; victim has standing as complainant.

#### Hour-by-hour response (continuing from initial detection)

**Hour 24-48 — Negotiation infrastructure.**

- Engage external DFIR firm (pre-engaged retainer typically activates here)
- Engage specialist ransomware negotiator (separate firm, typically through cyber insurer panel)
- Engage breach coach legal counsel (separate from corporate counsel)
- Cyber insurer engagement and pre-approval for negotiator engagement
- Police engagement (Singapore Police Force; FBI / IC3 if US nexus)

**Hour 24-48 — Sanctions screening.**

- Threat actor identification (often by tactic / leak site / ransom note style)
- Wallet address verification
- OFAC SDN check via Treasury website
- US Treasury "Specially Designated Nationals" (SDN) list
- US Treasury "SDGT" (Specially Designated Global Terrorist) list
- UN Security Council consolidated sanctions list
- MAS Targeted Financial Sanctions list
- Specific Russia / Belarus sanctions (post-2022)

**If sanctions match identified:** payment is criminal offence; cannot proceed regardless of business impact.

**Hour 48-72 — Decision framework.**

Board-level "pay vs not-pay" decision incorporating:

**Pay considerations:**
- Operational impact of continued shutdown
- Data exfiltration consequences (regulatory, reputational, litigation)
- Likelihood of decryption working (variable; typically 60-80%)
- Likelihood of further extortion (high; ~30% repeat extortion rate)
- Ethical / policy considerations
- Insurance coverage implications

**Not-pay considerations:**
- Backup restoration capability
- Data exfiltration acceptable (already lost)
- Regulatory exposure manageable
- Forensic recovery capability
- Specific ethical / policy commitments

**Hybrid considerations:**
- Pay only for decryptor (not data deletion)
- Pay reduced amount through negotiation
- Specific structuring for sanctions / tax / accounting treatment

#### Forensic and operational restoration

**Hour 72+ — Restoration phase.**

- Backup restoration assessment
- Forensic determination of attack vector
- Patching and hardening of affected systems
- Specific malware removal (ransomware, persistence mechanisms, backdoors)
- Credential reset across all systems
- MFA enforcement
- Network segmentation review
- Logging and monitoring enhancement

**Specific data exfiltration handling:**
- Affected data scope identification
- Affected individual identification
- PDPA notification trigger assessment
- Cross-border notification (GDPR, US state laws if applicable)
- Customer / partner notification

#### Insurance angle — multi-cover engagement

**Cyber policy.**

Most cyber policies cover:
- Forensic investigation costs
- Ransomware negotiation services
- Ransom payment (specific sublimit, typically USD 250,000 - USD 5m)
- Data restoration costs
- Business interruption (typically 8-12 hour waiting period)
- Regulatory defence costs
- PDPA notification costs
- Customer notification costs (call centre, credit monitoring)
- Public relations / reputation management

**Critical pre-approvals required:**
- Negotiator engagement
- Forensic firm engagement
- Specific ransom payment authorization
- Recovery / restoration vendor engagement

**Specific exclusions to assess:**
- Pre-existing vulnerability (where SME knew of vulnerability)
- War and terrorism (some policies exclude state-sponsored attacks)
- Specific sanctions exclusions
- Specific ransomware exclusions on some policies

**Crime policy.**
- Funds Transfer Fraud sublimit (where ransom paid in cryptocurrency)
- Specific Bitcoin / cryptocurrency exclusions

**D&O.**
- Claims-made notification on receipt of any regulatory correspondence (PDPC, MAS for FIs)
- Defence costs cover for personal liability

**Errors and Omissions / PI.**
- Where customer data exposure leads to customer claims

#### Decision to pay — what insurance allows

**Cyber insurer requirements before sanctioning payment:**
- Sanctions screening completed and clean
- Negotiator engagement at insurer-approved rates
- Specific authorization from claims handler
- Documentation of decision rationale
- Specific channel for payment (insurer typically specifies)

**Tax and accounting treatment:**
- Ransom payment generally not tax-deductible
- Specific accounting classification (usually extraordinary loss)
- IRAS reporting considerations

**Cryptocurrency considerations:**
- Specific exchange relationships
- Anti-money laundering / CFT compliance
- Singapore licensed Digital Payment Token Service Providers
- Specific KYC requirements

#### Decision to not pay — what to expect

**Operational consequences:**
- Restoration timeline 14-90 days typical
- Specific operational workarounds during restoration
- Customer / supplier communication
- Revenue impact assessment

**Threat actor escalation:**
- Public leak site posting of exfiltrated data
- Customer / partner notification by attacker
- Specific extortion of individual customers
- Data sale on dark markets

**Regulatory exposure:**
- PDPC investigation likely
- Specific Section 24 Protection Obligation breach assessment
- Penalty exposure per [Article 357](#article-357) framework

**Litigation exposure:**
- Customer civil claims for data exposure
- Specific class action potential (post-FIDReC small business expansion per [Article 360](#article-360))
- Cross-border claims if affected individuals abroad

#### CSA SingCERT engagement

[CSA SingCERT](https://www.csa.gov.sg/our-programmes/singcert) operates voluntary reporting for cybersecurity incidents:
- Specific reporting form
- Anonymisation options
- Specific incident handling support
- Sector-specific advisories

For SMEs: SingCERT engagement is generally beneficial — provides technical guidance, supports law enforcement investigation, and demonstrates proactive response to PDPC.

#### Communication strategy

**Internal:**
- Single spokesperson protocol
- Regular update cadence
- Specific disclosure to staff (need-to-know basis)
- Mental health support for affected staff

**External:**
- No public statement until forensic understanding sufficient
- Specific customer notification per PDPA Section 26D
- Media engagement strategy
- Specific stakeholder management (banks, key customers, regulators)

**With attacker:**
- Negotiator-mediated only
- No direct contact from SME personnel
- Specific channel discipline (only one platform / chat)
- Recording and documentation of all communications

### Common Mistakes / What Goes Wrong

1. **Direct contact with attacker.** SME personnel engage attacker without specialist support; negotiation compromised.

2. **Sanctions screening missed.** Payment to sanctioned entity creates criminal exposure.

3. **Negotiator engagement without insurer pre-approval.** Cost recovery compromised.

4. **Breach coach not separate from corporate counsel.** Privilege issues; conflicts of interest.

5. **Backup quality unverified.** "Pay vs not-pay" decision made without restoration capability assessment.

6. **PDPA notification timing missed.** 3-day clock not properly tracked.

7. **Specific exclusions not assessed.** Pre-existing vulnerability, war exclusion, sanctions exclusion not considered.

8. **Ransom payment tax / accounting treatment unconsidered.** Subsequent issues with IRAS, auditors.

9. **Communication leak.** Specific incident details escape before full forensic understanding.

10. **No post-incident review.** Same vulnerability re-exploited; repeat ransomware victimisation.

### What This Means for Your Business

For Singapore SMEs facing active ransomware negotiation:

1. **Pre-engaged DFIR retainer** — relationship and rates established before incident.

2. **Cyber insurance coverage map** — pre-approvals, sublimits, exclusions, notification requirements.

3. **Sanctions screening capability** — OFAC, MAS, UN list checks.

4. **Breach coach legal counsel** — separate from corporate counsel, privilege protected.

5. **Backup restoration capability** — tested, validated, current.

6. **PDPA notification framework** — assessment, drafting, regulator engagement.

7. **Communication discipline** — single spokesperson, structured cadence.

8. **Board-level decision protocol** — for "pay vs not-pay" determination.

9. **Tax and accounting framework** — for ransom payment if made.

10. **Post-incident review and remediation** — vulnerability identified and addressed.

The cost of ransomware response is substantial — typical SME total cost (incident response, recovery, regulatory, notification, reputation) SGD 500,000 - SGD 5m+ depending on scale. The cost of pre-incident preparation is bounded — typical cyber maturity programme SGD 50,000 - SGD 200,000 per year for a meaningful capability.

### Questions to Ask Your Adviser

1. For our cyber insurance, are negotiator engagement, ransom payment, and forensic firm pre-approvals clear?
2. For sanctions screening, do we have capability to verify threat actor identity against OFAC, MAS, UN lists?
3. For backup restoration, is current capability tested and would it support not-pay decision?
4. For PDPA notification, is 3-day clock tracking and drafting capability ready?
5. For board decision protocol, is "pay vs not-pay" framework agreed pre-incident?

### Related Information
- [Cyber-Extortion Event Response: Singapore Framework for Ransomware, Data Theft, and Payment Decisions](/crisis/cyber-extortion-event-response)
- [We Just Discovered Ransomware on Our Systems — What Do I Do Now?](/crisis/ransomware-just-hit)
- [PDPC Enforcement Escalation 2024-2026: Marina Bay Sands SGD 315,000 and the Pattern Insurers Are Underwriting Against](/regulatory-change/pdpc-enforcement-escalation-mbs-marina-bay-sands-2025)

*Published 6 May 2026. Source verified 6 May 2026. COVA is an introducer under [MAS Notice FAA-N02](https://www.mas.gov.sg/regulation/notices/notice-faa-n02). We do not recommend insurance products. We provide factual information sourced from primary regulators and route you to a licensed IFA who can match a policy to your specific situation.*
