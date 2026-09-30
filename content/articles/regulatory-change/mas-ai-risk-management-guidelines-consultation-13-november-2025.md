---
title: "MAS Consultation on AI Risk Management Guidelines (13 November 2025): Tech E&O and D&O Implications for Singapore SME AI Vendors"
slug: "/regulatory-change/mas-ai-risk-management-guidelines-consultation-13-november-2025"
category: "regulatory-change"
intent: "know-where-you-stand"
topics: ["Professional Indemnity", "Management Liability (D&O)", "Cyber"]
industries: ["Tech / startup", "Professional services"]
agencies: ["MAS", "Singapore Statutes", "PDPC"]
article_number: 389
published: "2026-05-14"
source_verified: "2026-05-14"
updated: "2026-08-30"
word_count: 2684
status: "published"
hero_image: "/assets/blog/regulatory-change.jpg"
canonical_url: "https://covarage.com/guides/regulatory-change/mas-ai-risk-management-guidelines-consultation-13-november-2025"
meta_description: "MAS consulted on AI risk management guidelines in November 2025. What supervisory expectations are forming for Singapore firms, and who should read them."
og_title: "MAS Consultation on AI Risk Management Guidelines (13 November 2025): Tech E&O and D&O Implications for Singapore SME AI Vendors"
og_description: "MAS consulted on AI risk management guidelines in November 2025. What supervisory expectations are forming for Singapore firms, and who should read them."
---

> **The Answer in 60 Seconds**
>
> The [Monetary Authority of Singapore consultation paper on Guidelines on Artificial Intelligence Risk Management (P017-2025)](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management) was issued on 13 November 2025, with the consultation window closing 31 January 2026. The proposed Guidelines establish an AI Risk Management framework (AIRG) for MAS-regulated financial institutions covering AI inventory, materiality assessment, Board and senior management oversight, full-lifecycle controls, third-party AI vendor due diligence, and explicit treatment of generative AI and AI agents. The AIRG follows from MAS's earlier work - the [Information Paper on AI Model Risk Management (December 2024)](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management) and the [Information Paper on Cyber Risks Associated with Generative AI (30 July 2024)](https://www.mas.gov.sg/regulation/circulars/cyber-risks-associated-with-generative-artificial-intelligence). For Singapore SMEs that *supply* AI products or services to MAS-regulated FIs - AI model vendors, AI-enabled SaaS providers, AI-enabled professional services firms - the proposed Guidelines expect FIs to manage third-party AI risk, including testing providers' AI in the FI's own use cases, assessing their transparency and fairness practices, planning for failures of third-party AI or a vendor ending support, and updating legal agreements (for example with clauses on performance guarantees, data protection and the right to audit), so FI customers may pass these expectations to vendors through contract. Whether a Tech E&O or Professional Indemnity wording responds to AI-specific exposures (hallucination, drift, autonomous-agent action, data poisoning) depends on the wording. D&O exposure rises in parallel for SME AI-vendor directors, particularly where AI governance failures contribute to customer-side regulatory liability. This article walks through the AIRG framework, the contractual cascade onto SME vendors, the Tech E&O and PI wording shifts, and the operational checklist for SME AI vendors entering FI-supply relationships.

## The MAS AIRG Consultation Architecture

The MAS Guidelines on AI Risk Management are designed to consolidate MAS's expectations on AI governance for the financial institutions it regulates - banks, capital markets intermediaries, insurers, financial advisers, and licensed payment service providers. The consultation document, [P017-2025 issued 13 November 2025](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management), sits in a sequence of MAS AI-related publications building toward the formal Guidelines.

### The Sequence of MAS AI Publications

- **November 2018** - [Principles to Promote Fairness, Ethics, Accountability and Transparency (FEAT) in the Use of AI and Data Analytics in Singapore's Financial Sector](https://www.mas.gov.sg/news/media-releases/2018/mas-introduces-new-feat-principles-to-promote-responsible-use-of-ai-and-data-analytics), the foundational FEAT principles.
- **February 2022** - Veritas Initiative published the FEAT methodology and assessment toolkit through industry collaboration.
- **30 July 2024** - [Information Paper on Cyber Risks Associated with Generative AI](https://www.mas.gov.sg/regulation/circulars/cyber-risks-associated-with-generative-artificial-intelligence), covering four threat areas: deepfakes and GenAI-enabled phishing, malware generation and enhancement, data leakage from GenAI deployments, and GenAI model and output manipulation.
- **December 2024** - [Information Paper on AI Model Risk Management](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management), setting out good practices in AI model risk management observed in MAS's thematic review of banks, which MAS encourages all FIs to reference.
- **12 March 2025** - [Joint Advisory on Scams Involving Digital Manipulation](https://www.mas.gov.sg/news/media-releases/2025/joint-pnr-by-spf-mas-and-csa) issued jointly with SPF and CSA, operationalising deepfake-driven funds-transfer fraud defences.
- **13 November 2025** - [Consultation Paper on Guidelines on Artificial Intelligence Risk Management (P017-2025)](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management), proposing the formal AIRG framework.
- **20 March 2026**: MAS announced the Project MindForge AI Risk Management Toolkit, developed by an industry consortium and including an AI Risk Management Operationalisation Handbook aligned with the proposed Guidelines, and said it was reviewing responses to the consultation.

### The AIRG Framework Components

Per the consultation paper, the proposed Guidelines cover four areas: oversight of AI risk management; key AI risk management systems, policies and procedures; AI life cycle controls; and capabilities and capacity for the use of AI. Points they cover include:

**1. AI Inventory.** MAS proposes that FIs using AI as an integrated part of their business processes maintain an accurate, up-to-date inventory of AI use cases, systems or models, including third-party AI. Each is assessed for risk materiality on at least three dimensions: impact (the consequences of a failure or poor performance), complexity (the nature and novelty of the AI technology, its application or its data), and reliance (the AI's autonomy, the degree of human involvement or oversight, and the availability of alternatives).

**2. Board and Senior Management Oversight.** Documented accountability for AI risk at senior management and board level. The Guidelines articulate expectations on AI policy approval, AI-risk reporting, and the integration of AI risk into the FI's overall risk-management framework.

**3. Roles and control functions.** The Board, or a committee it delegates, approves the overall AI risk governance approach; senior management implements it; control functions are designated for AI identification, the AI inventory and risk materiality assessment; and an FI whose overall AI risk exposure is material should set up a dedicated cross-functional committee.

**4. Full-Lifecycle Controls.** Controls span data acquisition, development, testing, deployment, monitoring, and decommissioning. The lifecycle framework requires ongoing monitoring of model drift, performance degradation, and unintended discrimination.

**5. Third-Party AI Management.** Testing third-party AI in the FI's own use cases, receiving notice of updates or changes, and considering areas such as the provider's transparency and fairness practices, supply chain risk assessments, concentration risk, contingency plans for failures of third-party AI or a vendor ending support, and legal agreements (for example clauses on performance guarantees, data protection, the right to audit, and notification when AI is introduced); MAS's outsourcing and third-party expectations also apply. This is the component that creates the contractual cascade onto SME AI vendors.

**6. Generative AI and AI Agents.** Express treatment of generative AI and agentic AI, building on the FEAT principles and MAS's work with industry, including Project MindForge (a collaborative industry initiative led by MAS with a consortium of banks, insurers and capital markets firms).

## The Contractual Cascade onto SME AI Vendors

The proposed Guidelines reach SME AI vendors mainly through third-party AI management, under which FIs should consider updating legal agreements with AI providers, for example with clauses on performance guarantees, data protection, the right to audit, and notification when AI is introduced. FI customers may pass these expectations to vendors through due diligence and contract, which can include:

### Vendor Due Diligence

FI customers may ask AI vendors to provide:

- Model cards / system cards describing the AI's intended use, training data lineage, performance metrics, and known limitations.
- Bias and fairness testing results.
- Adversarial robustness testing results.
- Cyber-security posture documentation.
- Data-handling and privacy compliance documentation (PDPA, GDPR where applicable).
- Incident-response procedures.
- Personnel competence documentation (AI development team qualifications).
- ISO/IEC 42001:2023 (AI Management System) alignment or equivalent.
- Compliance with [IMDA Model AI Governance Framework for Generative AI (30 May 2024)](https://aiverifyfoundation.sg/resources/mgf-gen-ai/) and [AI Verify](https://aiverifyfoundation.sg/what-is-ai-verify/) toolkit testing where applicable.

For SME vendors, the documentation expectation is the operational baseline.

### Contractual Indemnities

FI customers may seek indemnities from AI vendors covering:

- Vendor breach of AI-specific representations and warranties.
- AI hallucination, drift, or autonomous-agent action causing customer-side loss.
- Third-party claims against the FI arising from the AI's output.
- Regulatory penalties imposed on the FI arising from the AI vendor's failures.
- IP infringement claims arising from the AI's training data or output.

### Audit Rights

FI customers may seek audit rights covering:

- Vendor-side AI development practices.
- Vendor's incident-response performance.
- Vendor's compliance with the AIRG-aligned representations.
- Sample-based testing of the AI's performance, bias, and security characteristics.

### Incident-Reporting Clauses

Contracts can require vendor-side AI incidents to be reported to the FI customer within set windows.

### Exit Provisions

The proposed Guidelines ask FIs to consider developing robust contingency plans for failures or unexpected behaviour of third-party AI, or a vendor discontinuing support, particularly where the risk materiality is high. Exit provisions in vendor contracts can include data-return obligations, model-source-code or model-weight access rights (for IP-sensitive cases, sometimes via escrow), transition support, and post-exit data-deletion certification.

## The Tech E&O and PI Wording Shifts

The contractual cascade above produces direct underwriting consequences for Tech E&O and Professional Indemnity policies covering AI vendors.

### Tech E&O Treatment

Singapore Tech E&O wordings traditionally responded to "wrongful acts" - errors, omissions, or negligent acts in the rendering of technology services. The wording mapped well onto deterministic-software exposures. It maps less well onto AI exposures because:

- AI hallucination is not always a "negligent act" in the traditional sense - the AI may have operated within its design specification.
- Model drift can produce loss without a discrete wrongful act.
- Autonomous-agent action may produce loss without human involvement in the loss-producing decision.

Underwriters are responding with several wording shifts:

- **Affirmative AI endorsements** that state how AI-involved incidents are covered. Coalition added one to its US surplus and Canada cyber policies in March 2024, widening the definition of a security failure or data breach to include an AI security event, and the funds transfer fraud trigger to include fraudulent instructions sent using deepfakes or other AI.
- **AI-specific endorsements in liability wordings**. In the US, Verisk's ISO filed optional general liability endorsements addressing generative AI exposures, with a proposed effective date of 1 January 2026.

### PI Treatment

Professional Indemnity wordings covering AI-enabled professional services (e.g., AI-assisted legal research, AI-assisted accounting, AI-assisted medical diagnosis) raise parallel questions. A wording may address them with:

- Express clarification that AI-output-related losses fall within the PI trigger where the professional adopted the AI output as professional advice.
- Sub-limits for AI-related professional services until the vendor's competence and processes have been validated.
- Documentation requirements on AI-tool usage (which tools, which prompts, what human review was applied).

### D&O Treatment

D&O exposure for SME AI-vendor directors rises in parallel. The exposure paths:

- **Customer-side regulatory action** flowing back to the vendor where the AI caused the FI customer to breach MAS-administered rules.
- **Direct PDPC enforcement** under the [PDPA 2012](https://sso.agc.gov.sg/Act/PDPA2012), which lets the PDPC impose financial penalties (section 48J) where AI-related processing breached the PDPA. The MBS S$315,000 penalty (October 2025) and the escalating PDPC enforcement signals demonstrate the regulator's appetite to penalise systemic data-protection failures.
- **Class action or representative action** by affected individuals where AI-driven decisions caused widespread harm.
- **Customer contractual liability** flowing back to the directors where the company is in financial difficulty.

D&O cover for AI-vendor directors sits alongside the company's Tech E&O / PI cover, and how defence costs are allocated between the entity level (Tech E&O / PI) and the director level (D&O) depends on the wordings.

## The Operational Checklist for SME AI Vendors

The proposed Guidelines are not yet final. A checklist for SME AI vendors selling into the FI market:

- **Documented AI inventory** for the vendor's own internal AI use, mapped to materiality dimensions.
- **Model cards / system cards** for every commercial AI product, including intended use, training data lineage, performance metrics, known limitations, and ongoing monitoring approach.
- **Bias and fairness testing** with documented methodology and results.
- **Adversarial robustness testing** including prompt injection defences, data poisoning resistance, and model extraction protections.
- **Cyber-security posture** - MFA across all administrative accounts, sensitive-data segregation, backup-restore procedures, incident-response plan.
- **Data-handling compliance** - PDPA Data Protection Officer designated, with business contact details made available to the public (for example on BizFile+ or the organisation's website), DPIAs for high-risk AI processing, retention and deletion policies.
- **Incident-response procedures** documented and tested, with the 3-day PDPA notification clock built into the workflow.
- **AI Verify alignment** - periodic testing against the AI Verify principles where customer-facing AI is in scope.
- **Personnel competence** - documented training records for AI development and governance personnel.
- **ISO/IEC 42001:2023 alignment** or equivalent - formal AI Management System framework.
- **Insurance programme alignment** - Tech E&O / PI / D&O / Cyber programme reviewed against AI-specific exposures, with affirmative AI endorsement where available.

## Interaction with Other Singapore AI Frameworks

The AIRG sits within a broader Singapore AI governance architecture. The interactions:

**[IMDA Model AI Governance Framework for Generative AI (30 May 2024)](https://aiverifyfoundation.sg/resources/mgf-gen-ai/).** Not limited to FIs: it sets out practical suggestions, not legal requirements, for the wider AI ecosystem. The MGF for Generative AI articulates nine governance dimensions and is the cross-sector reference.

**[PDPC Advisory Guidelines on Use of Personal Data in AI (1 March 2024)](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/advisory-guidelines-on-the-use-of-personal-data-in-ai-recommendation-and-decision-systems.pdf).** Operative now. Articulates DPIA expectations for AI processing of personal data, the three consent exceptions (Business Improvement, Research, Legitimate Interests), and the calibrated explainability expectations.

**[Cybersecurity (Amendment) Act 2024](https://sso.agc.gov.sg/Acts-Supp/19-2024/Published/20240704?DocDate=20240704)** - a tranche of provisions came into force on 31 October 2025, expanding the Critical Information Infrastructure framework. The Act also enacted a Foundational Digital Infrastructure regime, but those provisions are not yet commenced as of May 2026. AI services that are foundational to CII operation may fall within scope. CSA's Addendum on Securing Agentic AI, released on 17 June 2026 after a public consultation that closed on 31 December 2025, addresses agentic AI.

**[EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689).** Extraterritorial reach to Singapore SME AI vendors where the AI output is used in the EU. Regulation (EU) 2026/1744 (the Digital Omnibus on AI) moved the high-risk obligations to 2 December 2027 for Annex III systems (previously 2 August 2026) and to 2 August 2028 for high-risk AI covered by Annex I (previously 2 August 2027).

## Common Mistakes Singapore SME AI Vendors Make

**Treating the AIRG consultation as advisory.** It is. But FI customers may build the proposed expectations into vendor contracts before the Guidelines are final.

**Underestimating the documentation burden.** Model cards, bias testing, adversarial robustness testing - these are not nice-to-haves.

**Accepting uncapped indemnities to win business.** An uncapped indemnity for AI-related losses can exceed the limits of the SME's insurance.

**Failing to align insurance to contractual obligations.** Tech E&O / PI cover must respond to the contractual indemnities the SME is giving. Where there is a gap, the SME wears the residual.

**Conflating "AI vendor" with "software vendor" on insurance.** The exposures differ. Software vendor PI wordings may not respond to AI-specific exposures.

**Missing the D&O implication.** AI governance failures at the SME level can produce director-level exposure. The D&O programme should be sized accordingly.

**Forgetting the PDPC and other regulators.** MAS is not the only regulator in scope. PDPC, IMDA, CSA, and (extraterritorially) the EU AI Act all create parallel exposures.

**Not coordinating Tech E&O and Cyber.** AI-related cyber incidents (model exfiltration, training-data poisoning) sit at the boundary of Tech E&O and Cyber cover. The coordination between the two policies must be specified.

## What This Means for Your Business

If you are an SME AI vendor selling into the Singapore FI sector, the proposed AIRG framework bears on your procurement environment. The operational uplift - AI inventory, model cards, bias testing, ISO 42001 alignment - is the table-stakes investment.

The insurance side is the financial backstop. Your licensed adviser handling Tech E&O, PI, D&O, and Cyber should walk you through the AI-specific underwriting environment, the affirmative AI endorsement availability, the limit adequacy against your contractual indemnity exposure, and the wording amendments that respond to hallucination, drift, and autonomous-agent action.

For SME AI vendors not selling into MAS-regulated FIs, the AIRG framework is not directly applicable. But the PDPA (explained for AI in the PDPC AI guidelines) and, where the SME has EU exposure, the EU AI Act create parallel obligations, and the voluntary [IMDA MGF](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline) framework sets out parallel practices. The operational baseline is the same.

## Questions to Ask Your Adviser

1. Does my current Tech E&O wording include affirmative AI coverage, or is it silent / excluded? What is the affirmative-AI endorsement option and what does it cost?
2. How does the Tech E&O policy respond to hallucination, model drift, and autonomous-agent action - are these "wrongful acts" within the trigger, or are they outside the wording?
3. What is the limit adequacy for my Tech E&O cover against the contractual indemnity exposure I am giving to FI customers, and against the cap multiples I am negotiating?
4. Does my PI wording cover AI-enabled professional services, and what documentation requirements does the insurer require on AI tool usage?
5. What is the D&O cover position for an SME AI vendor - does it respond to PDPC enforcement, MAS-flow-through regulatory action, and class-action or representative claims?
6. How is the boundary between Tech E&O and Cyber treated for AI-specific incidents (model exfiltration, training data poisoning), and which policy responds first?
7. What is the cover position for customer-side regulatory penalties imposed on the FI as a result of my AI's failures - does my Tech E&O indemnify these as third-party damages, or are they excluded as fines?
8. How does my insurance programme respond to EU AI Act exposures for AI output used in the EU, and is there a separate EU placement that should be considered?

## Related Information

- [MAS AIRG, IMDA MGF, EU AI Act: The 2026-2027 AI Compliance Timeline Every Singapore SME Now Faces](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline)
- [When Your AI Agent Goes Rogue: Insurance Implications for Singapore SMEs After the Replit Database Wipe](/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme)
- [AI-Generated Code Security Vulnerabilities: A Cyber, Tech E&O, PI and Product Liability Risk for Singapore SMEs](/emerging-risk/ai/ai-generated-code-security-vulnerabilities-singapore-sme)
- [Professional Indemnity vs Tech E&O: What's the Difference for SaaS and Technology Companies?](/comparison/pi-vs-tech-eo-for-saas)
- [Cybersecurity Act 2024 Amendment First-Year Compliance Review](/regulatory-change/cybersecurity-act-2024-first-year)
- [Cyber Architecture Tower vs Monoline Policy Comparison](/comparison/cyber-architecture-tower-vs-monoline)
- [Composite Management Liability Package vs Standalone D&O / EPL / Crime / PI / Cyber Modules: A Singapore SME Decision Framework](/comparison/composite-management-liability-package-vs-standalone-modules-sme)
- [Professional Indemnity Insurance for Singapore Service Businesses: The Complete Guide](/document-legal/professional-indemnity-complete-guide-singapore)

*Published 14 May 2026. Source verified 14 May 2026.*

---
