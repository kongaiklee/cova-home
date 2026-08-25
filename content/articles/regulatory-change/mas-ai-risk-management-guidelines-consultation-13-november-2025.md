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
word_count: 2684
status: "published"
hero_image: "/assets/blog/regulatory-change.jpg"
canonical_url: "https://covarage.com/guides/regulatory-change/mas-ai-risk-management-guidelines-consultation-13-november-2025"
meta_description: "The Monetary Authority of Singapore consultation paper on Guidelines on Artificial Intelligence Risk Management (P017-2025) was issued on 13 November..."
og_title: "MAS Consultation on AI Risk Management Guidelines (13 November 2025): Tech E&O and D&O Implications for Singapore SME AI Vendors"
og_description: "The Monetary Authority of Singapore consultation paper on Guidelines on Artificial Intelligence Risk Management (P017-2025) was issued on 13 November..."
---

> **The Answer in 60 Seconds**
>
> The [Monetary Authority of Singapore consultation paper on Guidelines on Artificial Intelligence Risk Management (P017-2025)](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management) was issued on 13 November 2025, with the consultation window closing 31 January 2026. The proposed Guidelines establish an AI Risk Management framework (AIRG) for MAS-regulated financial institutions covering AI inventory, materiality assessment, three-lines-of-defence governance, full-lifecycle controls, third-party AI vendor due diligence, and explicit treatment of generative AI and AI agents. The AIRG follows from MAS's earlier work - the [Information Paper on AI Model Risk Management (December 2024)](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management) and the [Information Paper on Cyber Risks Associated with Generative AI (30 July 2024)](https://www.mas.gov.sg/regulation/circulars/cyber-risks-associated-with-generative-artificial-intelligence). For Singapore SMEs that *supply* AI products or services to MAS-regulated FIs - AI model vendors, AI-enabled SaaS providers, AI-enabled professional services firms - the AIRG creates downstream contractual obligations: FI customers will require vendor due diligence, indemnities, audit rights, incident-reporting clauses, and exit provisions calibrated to the AIRG framework. Tech E&O and Professional Indemnity wordings on AI vendor placements are being reset in 2025-2026 to respond to AI-specific exposures (hallucination, drift, autonomous-agent action, data poisoning). D&O exposure rises in parallel for SME AI-vendor directors, particularly where AI governance failures contribute to customer-side regulatory liability. This article walks through the AIRG framework, the contractual cascade onto SME vendors, the Tech E&O and PI wording shifts, and the operational checklist for SME AI vendors entering FI-supply relationships.

## The MAS AIRG Consultation Architecture

The MAS Guidelines on AI Risk Management are designed to consolidate MAS's expectations on AI governance for the financial institutions it regulates - banks, capital markets intermediaries, insurers, financial advisers, and licensed payment service providers. The consultation document, [P017-2025 issued 13 November 2025](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management), is the latest in a sequence of MAS AI-related publications building toward the formal Guidelines.

### The Sequence of MAS AI Publications

- **November 2018** - [Principles to Promote Fairness, Ethics, Accountability and Transparency (FEAT) in the Use of AI and Data Analytics in Singapore's Financial Sector](https://www.mas.gov.sg/news/media-releases/2018/mas-introduces-new-fairness-ethics-accountability-and-transparency-principles), the foundational FEAT principles.
- **February 2022** - Veritas Initiative published the FEAT methodology and assessment toolkit through industry collaboration.
- **30 July 2024** - [Information Paper on Cyber Risks Associated with Generative AI](https://www.mas.gov.sg/regulation/circulars/cyber-risks-associated-with-generative-artificial-intelligence), identifying four GenAI-driven cyber risk categories: deepfake-driven impersonation, AI-enhanced phishing and social engineering, model manipulation, and AI-enabled malware.
- **December 2024** - [Information Paper on AI Model Risk Management](https://www.mas.gov.sg/publications/monographs-or-information-paper/2024/artificial-intelligence-model-risk-management), articulating the expectations on FIs for AI model governance, validation, and ongoing monitoring.
- **12 March 2025** - [Joint Advisory on Scams Involving Digital Manipulation](https://www.mas.gov.sg/news/media-releases/2025/joint-pnr-by-spf-mas-and-csa) issued jointly with SPF and CSA, operationalising deepfake-driven funds-transfer fraud defences.
- **13 November 2025** - [Consultation Paper on Guidelines on Artificial Intelligence Risk Management (P017-2025)](https://www.mas.gov.sg/publications/consultations/2025/consultation-paper-on-guidelines-on-artificial-intelligence-risk-management), proposing the formal AIRG framework.
- **2026** - Expected publication of the final AIRG Guidelines and a forthcoming AI Risk Management Handbook with illustrative practices.

### The AIRG Framework Components

Per the consultation paper, the AIRG covers six structural components:

**1. AI Inventory.** Every MAS-regulated FI must maintain an AI inventory covering all AI systems used by the FI, including third-party AI embedded in vendor products. The inventory captures materiality dimensions - impact (severity if AI fails), complexity (interpretability of the model), and reliance (degree of human-in-the-loop oversight).

**2. Board and Senior Management Oversight.** Documented accountability for AI risk at senior management and board level. The Guidelines articulate expectations on AI policy approval, AI-risk reporting, and the integration of AI risk into the FI's overall risk-management framework.

**3. Three Lines of Defence.** Business ownership (first line); independent risk and compliance (second line); internal audit (third line). Each line carries explicit AI-specific responsibilities.

**4. Full-Lifecycle Controls.** Controls span data acquisition, development, testing, deployment, monitoring, and decommissioning. The lifecycle framework requires ongoing monitoring of model drift, performance degradation, and unintended discrimination.

**5. Third-Party AI Governance.** Vendor due diligence, contractual indemnities, incident-reporting clauses, and exit provisions. This is the component that creates the contractual cascade onto SME AI vendors.

**6. Generative AI and AI Agents.** Express treatment of generative AI and agentic AI, drawing on MAS's Project MindForge (the industry sandbox programme run with major Singapore-incorporated banks) and the FEAT principles.

## The Contractual Cascade onto SME AI Vendors

The single most consequential AIRG provision for SME AI vendors is the third-party AI governance component. FIs will pass through their AIRG obligations to vendors via contract. The cascade typically manifests as:

### Vendor Due Diligence

Pre-contract due diligence becomes more rigorous. FI customers will require AI vendors to provide:

- Model cards / system cards describing the AI's intended use, training data lineage, performance metrics, and known limitations.
- Bias and fairness testing results.
- Adversarial robustness testing results.
- Cyber-security posture documentation.
- Data-handling and privacy compliance documentation (PDPA, GDPR where applicable).
- Incident-response procedures.
- Personnel competence documentation (AI development team qualifications).
- ISO/IEC 42001:2023 (AI Management System) alignment or equivalent.
- Compliance with [IMDA Model AI Governance Framework for Generative AI (30 May 2024)](https://aiverifyfoundation.sg/resources/mgf-gen-ai/) and [AI Verify](https://aiverifyfoundation.sg/what-is-ai-verify/) toolkit testing where applicable.

For SME vendors, the documentation expectation is the operational baseline. Vendors that cannot produce this documentation are increasingly screened out of FI procurement.

### Contractual Indemnities

FI customers are negotiating broader indemnities from AI vendors covering:

- Vendor breach of AI-specific representations and warranties.
- AI hallucination, drift, or autonomous-agent action causing customer-side loss.
- Third-party claims against the FI arising from the AI's output.
- Regulatory penalties imposed on the FI arising from the AI vendor's failures.
- IP infringement claims arising from the AI's training data or output.

The indemnity scope is materially broader than traditional software vendor indemnities. AI vendor contracts in 2025-2026 routinely carry indemnity caps at multiples of annual contract value, with carve-outs for fraud, gross negligence, and IP infringement that uncap altogether.

### Audit Rights

FI customers are negotiating audit rights covering:

- Vendor-side AI development practices.
- Vendor's incident-response performance.
- Vendor's compliance with the AIRG-aligned representations.
- Sample-based testing of the AI's performance, bias, and security characteristics.

### Incident-Reporting Clauses

Vendor-side AI incidents must be reported to the FI customer within defined windows (typically 24-72 hours for security incidents, 7 days for performance incidents). The clauses cascade FI reporting obligations to the vendor.

### Exit Provisions

The AIRG expects FIs to maintain the ability to exit AI vendor relationships without operational disruption. Exit provisions in vendor contracts now typically include data-return obligations, model-source-code or model-weight access rights (for IP-sensitive cases, sometimes via escrow), transition support, and post-exit data-deletion certification.

## The Tech E&O and PI Wording Shifts

The contractual cascade above produces direct underwriting consequences for Tech E&O and Professional Indemnity policies covering AI vendors. The 2025-2026 market is repricing the AI exposure.

### Tech E&O Treatment

Singapore Tech E&O wordings traditionally responded to "wrongful acts" - errors, omissions, or negligent acts in the rendering of technology services. The wording mapped well onto deterministic-software exposures. It maps less well onto AI exposures because:

- AI hallucination is not always a "negligent act" in the traditional sense - the AI may have operated within its design specification.
- Model drift can produce loss without a discrete wrongful act.
- Autonomous-agent action may produce loss without human involvement in the loss-producing decision.

Underwriters are responding with several wording shifts:

- **Affirmative AI endorsements** that explicitly bring AI-caused losses within the wrongful-act trigger. Coalition's AI affirmative endorsement and similar products are increasingly available.
- **AI-specific exclusions** in standard wordings, requiring buy-back endorsements to restore cover.
- **Sub-limits for AI-related losses** within the overall Tech E&O limit.
- **Vendor-specific underwriting** - premium and terms calibrated to the specific AI capabilities the vendor offers, with detailed model-card review at quote stage.

### PI Treatment

Professional Indemnity wordings covering AI-enabled professional services (e.g., AI-assisted legal research, AI-assisted accounting, AI-assisted medical diagnosis) face parallel pressure. The wording shift typically involves:

- Express clarification that AI-output-related losses fall within the PI trigger where the professional adopted the AI output as professional advice.
- Sub-limits for AI-related professional services until the vendor's competence and processes have been validated.
- Documentation requirements on AI-tool usage (which tools, which prompts, what human review was applied).

### D&O Treatment

D&O exposure for SME AI-vendor directors rises in parallel. The exposure paths:

- **Customer-side regulatory action** flowing back to the vendor where the AI caused the FI customer to breach MAS-administered rules.
- **Direct PDPC enforcement** under the [PDPA 2012](https://sso.agc.gov.sg/Act/PDPA2012) section 26D where AI-related processing breached the PDPA. The MBS S$315,000 penalty (October 2025) and the escalating PDPC enforcement signals demonstrate the regulator's appetite to penalise systemic data-protection failures.
- **Class action or representative action** by affected individuals where AI-driven decisions caused widespread harm.
- **Customer contractual liability** flowing back to the directors where the company is in financial difficulty.

D&O cover for AI-vendor directors typically requires the underlying Tech E&O / PI cover to be in place, with clear coverage allocation between defence costs at the entity level (Tech E&O / PI) and at the director level (D&O).

## The Operational Checklist for SME AI Vendors

The AIRG framework, even before formal finalisation, is shaping FI procurement practice now. SME AI vendors selling into the FI market should be operating to the framework:

- **Documented AI inventory** for the vendor's own internal AI use, mapped to materiality dimensions.
- **Model cards / system cards** for every commercial AI product, including intended use, training data lineage, performance metrics, known limitations, and ongoing monitoring approach.
- **Bias and fairness testing** with documented methodology and results.
- **Adversarial robustness testing** including prompt injection defences, data poisoning resistance, and model extraction protections.
- **Cyber-security posture** - MFA across all administrative accounts, sensitive-data segregation, backup-restore procedures, incident-response plan.
- **Data-handling compliance** - PDPA Data Protection Officer appointed and registered, DPIAs for high-risk AI processing, retention and deletion policies.
- **Incident-response procedures** documented and tested, with the 3-day PDPA notification clock built into the workflow.
- **AI Verify alignment** - periodic testing against the AI Verify principles where customer-facing AI is in scope.
- **Personnel competence** - documented training records for AI development and governance personnel.
- **ISO/IEC 42001:2023 alignment** or equivalent - formal AI Management System framework.
- **Insurance programme alignment** - Tech E&O / PI / D&O / Cyber programme reviewed against AI-specific exposures, with affirmative AI endorsement where available.

## Interaction with Other Singapore AI Frameworks

The AIRG sits within a broader Singapore AI governance architecture. The interactions:

**[IMDA Model AI Governance Framework for Generative AI (30 May 2024)](https://aiverifyfoundation.sg/resources/mgf-gen-ai/).** Applies to all AI deployers in Singapore (not only FIs). The MGF for Generative AI articulates nine governance dimensions and is the cross-sector reference. SME AI vendors aligning to the MGF satisfy a substantial portion of overseas regulator expectations and most FI customer requirements.

**[PDPC Advisory Guidelines on Use of Personal Data in AI (1 March 2024)](https://www.pdpc.gov.sg/-/media/files/pdpc/pdf-files/advisory-guidelines/advisory-guidelines-on-the-use-of-personal-data-in-ai-recommendation-and-decision-systems.pdf).** Operative now. Articulates DPIA expectations for AI processing of personal data, the three consent exceptions (Business Improvement, Research, Legitimate Interests), and the calibrated explainability expectations.

**[Cybersecurity (Amendment) Act 2024](https://sso.agc.gov.sg/Acts-Supp/19-2024/Published/20240704?DocDate=20240704)** - a tranche of provisions came into force on 31 October 2025, expanding the Critical Information Infrastructure framework. The Act also enacted a Foundational Digital Infrastructure regime, but those provisions are not yet commenced as of May 2026. AI services that are foundational to CII operation may fall within scope. The CSA Draft Addendum (closing 31 December 2025; finalisation expected in 2026) specifically addresses agentic AI.

**[EU AI Act, Regulation (EU) 2024/1689](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1689).** Extraterritorial reach to Singapore SME AI vendors where the AI output is used in the EU. The high-risk obligations apply from 2 August 2026.

## Common Mistakes Singapore SME AI Vendors Make

**Treating the AIRG consultation as advisory.** It is. But FI customers will incorporate AIRG expectations into vendor contracts ahead of formal finalisation. The contractual cascade is already operating.

**Underestimating the documentation burden.** Model cards, bias testing, adversarial robustness testing - these are not nice-to-haves. They are procurement gate items.

**Accepting uncapped indemnities to win business.** Some FI procurement is requesting uncapped indemnities for AI-related losses. SMEs accepting these are exposed beyond their insurance capacity.

**Failing to align insurance to contractual obligations.** Tech E&O / PI cover must respond to the contractual indemnities the SME is giving. Where there is a gap, the SME wears the residual.

**Conflating "AI vendor" with "software vendor" on insurance.** The exposures differ. Software vendor PI wordings may not respond to AI-specific exposures.

**Missing the D&O implication.** AI governance failures at the SME level can produce director-level exposure. The D&O programme should be sized accordingly.

**Forgetting the PDPC and other regulators.** MAS is not the only regulator in scope. PDPC, IMDA, CSA, and (extraterritorially) the EU AI Act all create parallel exposures.

**Not coordinating Tech E&O and Cyber.** AI-related cyber incidents (model exfiltration, training-data poisoning) sit at the boundary of Tech E&O and Cyber cover. The coordination between the two policies must be specified.

## What This Means for Your Business

If you are an SME AI vendor selling into the Singapore FI sector, the AIRG framework is now shaping your procurement environment. The operational uplift - AI inventory, model cards, bias testing, ISO 42001 alignment - is the table-stakes investment. Without it, FI procurement screening produces a "no" before commercial negotiations begin.

The insurance side is the financial backstop. Your licensed adviser handling Tech E&O, PI, D&O, and Cyber should walk you through the AI-specific underwriting environment, the affirmative AI endorsement availability, the limit adequacy against your contractual indemnity exposure, and the wording amendments that respond to hallucination, drift, and autonomous-agent action.

For SME AI vendors not selling into MAS-regulated FIs, the AIRG framework is not directly applicable. But the broader [IMDA MGF](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline) framework, the PDPC AI guidelines, and (where the SME has EU exposure) the EU AI Act all create parallel obligations. The operational baseline is the same.

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

- [MAS AIRG, IMDA MGF, EU AI Act: The 2026-2027 AI Compliance Timeline for Singapore SMEs](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline) (article 411)
- [When Your AI Agent Goes Rogue: Insurance Implications for Singapore SMEs After the Replit Database Wipe](/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme) (article 413)
- [AI-Generated Code Security Vulnerabilities for Singapore SMEs](/emerging-risk/ai/ai-generated-code-security-vulnerabilities-singapore-sme) (article 417)
- [PI vs Tech E&O for SaaS](/comparison/pi-vs-tech-eo-for-saas)
- [Cybersecurity (Amendment) Act 2024 First Year Review](/regulatory-change/cybersecurity-act-2024-first-year)
- [Cyber Architecture Tower vs Monoline](/comparison/cyber-architecture-tower-vs-monoline)
- [Composite Management Liability Package vs Standalone Modules](/comparison/composite-management-liability-package-vs-standalone-modules-sme) (article 393)

*Published 14 May 2026. Source verified 14 May 2026.*

---
