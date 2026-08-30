---
title: "AI Vendor Procurement for Singapore SMEs: The Indemnity Clause That Actually Matters"
slug: "/emerging-risk/ai/ai-vendor-procurement-indemnity-singapore-sme"
category: "emerging-risk"
subcategory: "ai"
intent: "beyond-the-basics"
topics: ["Cyber"]
industries: ["Tech / startup"]
agencies: ["CSA", "MAS", "PDPC"]
article_number: 434
published: "2026-05-22"
source_verified: "2026-05-22"
word_count: 1967
status: "published"
hero_image: "/assets/blog/emerging-risk.jpg"
canonical_url: "https://covarage.com/guides/emerging-risk/ai/ai-vendor-procurement-indemnity-singapore-sme"
meta_description: "AI tools are bought on the vendor's standard terms, and those terms decide who carries the risk. What to read before signing an AI procurement contract."
og_title: "AI Vendor Procurement for Singapore SMEs: The Indemnity Clause That Actually Matters"
og_description: "AI tools are bought on the vendor's standard terms, and those terms decide who carries the risk. What to read before signing an AI procurement contract."
---

> **The Answer in 60 Seconds**
>
> Singapore SMEs buying AI tools - SaaS chatbots, document-processing engines, image generators, agentic coding tools - are typically procuring under the **vendor's standard terms**, which allocate most of the downstream risk to the buyer. The single most consequential clause is the **indemnity** (who pays when the AI causes harm to a third party), and the most overlooked is the **input-data licence** (what the vendor may do with the SME's data passed to the model). The [Cyber Security Agency of Singapore's Guidelines and Companion Guide on Securing AI Systems](https://www.csa.gov.sg/resources/publications/guidelines-and-companion-guide-on-securing-ai-systems/) published **15 October 2024** sets out the security-control floor; the [MAS Guidelines on Outsourcing](https://www.mas.gov.sg/regulation/guidelines/guidelines-on-outsourcing) published 11 December 2023 and effective 11 December 2024 set the financial-institution-grade benchmark that increasingly applies to SME counterparties of FIs; the [IMDA Model AI Governance Framework](https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework) is the de facto procurement standard for Singapore organisations buying AI. This article sets out the seven contract terms an SME should look for, the two terms that should never be accepted as-is, and how the controls connect to the SME's existing insurance position.

### The Sourced Detail

The AI vendor procurement landscape in Singapore in 2026 is dominated by US-domiciled foundation-model providers (OpenAI, Anthropic, Google, Meta), Singapore- and regional-domiciled application-layer SaaS, and a long tail of point-solution tools. The terms presented to SMEs at the point of sale are typically the vendor's online click-through agreement; negotiating those terms is possible for larger contracts but rare for sub-S$100,000 annual commitments.

The result is that most SMEs are operating under vendor terms they have not read in detail. The contract risk is invisible until the AI causes a problem, at which point the indemnity allocation determines who pays.

#### The CSA Guidelines as the procurement floor

The [CSA Guidelines and Companion Guide on Securing AI Systems](https://www.csa.gov.sg/resources/publications/guidelines-and-companion-guide-on-securing-ai-systems/) published 15 October 2024 set out five lifecycle phases (planning and design, development, deployment, operations and maintenance, end-of-life) with a series of recommended controls at each. While the Guidelines are technically non-binding, they have rapidly become the benchmark Singapore organisations apply when procuring AI tools, including for AI-vendor due diligence.

The Guidelines' procurement-relevant questions for an SME considering an AI vendor include:

- What does the vendor do with the SME's input data? (training, retention, sharing)
- How does the vendor secure the data in transit and at rest?
- What is the vendor's incident-notification protocol?
- What is the vendor's model-update and behaviour-drift protocol?
- What is the vendor's data-residency arrangement?

The answers should be in the vendor's contract and in its security documentation; if they are not, that is itself a procurement signal.

The [CSA Draft Addendum on Securing Agentic AI](https://www.csa.gov.sg/news-events/press-releases/csa-releases-an-addendum-to-support-system-owners-in-securing-agentic-ai-system/), opened for public consultation in October 2025, extends the framework for autonomous AI agents - where the procurement stakes are higher because the agent can take actions, not just produce outputs.

#### The MAS Outsourcing benchmark

The [MAS Guidelines on Outsourcing](https://www.mas.gov.sg/regulation/guidelines/guidelines-on-outsourcing) - published 11 December 2023, in force from 11 December 2024 - apply directly to financial institutions. They are nominally not binding on non-FI SMEs, but they set the contractual standard that:

- FIs increasingly require their SME counterparties to meet (for example, FIs require their AI-tool sub-providers to meet outsourcing-grade controls).
- Insurance underwriters apply when assessing the SME's vendor-management discipline at PI or cyber renewal.

The MAS Outsourcing Guidelines' contract checklist includes: clear scope of services, service-level commitments, business continuity, security and confidentiality, audit rights, sub-contracting controls, termination and exit, and data return-and-destruction at end of contract. For AI tools, these translate to specific clauses an SME should look for in any vendor agreement.

#### The IMDA Model AI Governance Framework

The [IMDA Model AI Governance Framework](https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework), with companion guides on Generative AI and implementation, sets out four ethical-AI principles (transparency, explainability, repeatability and reproducibility, safety) and operationalises them through a self-assessment framework. The Framework's "Verify AI" platform (now Project Moonshot under the AI Verify Foundation) is the procurement-side tool an SME can run against a vendor's AI tool to assess governance maturity.

The Framework is non-binding but has been adopted by both [the Singapore government as a procurement benchmark](https://aiverifyfoundation.sg/) and by financial-institution AI risk-management practice.

#### The seven contract terms to look for

A defensible AI vendor contract from the SME's perspective should address seven terms.

**1. Input-data licence and use.** What may the vendor do with the SME's input data? The acceptable position: vendor uses the input data only to provide the service to the SME, does not use the SME's data to train the underlying model, does not share the data with third parties beyond named sub-processors, and retains the data only for the period necessary to provide the service. Some major foundation-model providers offer "enterprise" tiers with these terms; "free" or "consumer" tiers typically do not.

**2. Output ownership and licence.** Who owns the outputs the AI produces from the SME's inputs? The acceptable position: the SME owns the outputs (subject to the vendor's underlying model rights). Some vendor agreements retain joint or vendor ownership; this should be a deal-breaker for content the SME intends to use commercially.

**3. Confidentiality.** Standard confidentiality terms covering the SME's inputs, with carve-outs only for public-domain data and information the vendor independently developed.

**4. Service-level commitments.** Uptime, response time, and incident notification commitments. AI tools that are mission-critical to the SME require service levels that reflect that criticality.

**5. Indemnity.** Vendor indemnifies the SME against third-party claims that the AI output infringes intellectual property rights. Major foundation-model providers and SaaS vendors increasingly offer "IP indemnity" for AI outputs - but the indemnity scope varies materially. The acceptable position: vendor indemnifies the SME for IP infringement claims arising from the AI's output, subject to reasonable conditions (the SME using the output as intended, not modifying it beyond ordinary use).

**6. Liability cap.** A liability cap is standard; the question is whether the cap is at a level that meaningfully responds to the SME's exposure. Caps at 12 months' fees are common; caps at the vendor's individual annual fee may be inadequate for high-impact AI deployments.

**7. Termination and data return.** On termination, the vendor returns the SME's data and provides a structured exit period. The acceptable position: 30-90 days exit support, data return in usable format, destruction certificate for any retained data.

#### The two terms that should never be accepted as-is

**Term A: Unlimited training-data licence.** A clause that permits the vendor to use the SME's input data to train the underlying model is, for most SMEs, unacceptable. The data may include personal data (engaging the PDPA), confidential commercial information, or content with third-party IP rights. Once the model is trained, the data is effectively in the model and cannot be retracted.

**Term B: Disclaimer of all AI-output warranties.** A clause that disclaims warranties on the accuracy, completeness, or fitness for purpose of AI outputs, combined with an indemnity allocating all downstream risk to the SME, leaves the SME carrying the entire chatbot-misrepresentation exposure (see [AI chatbots and customer misrepresentation](/emerging-risk/ai/ai-chatbot-customer-misrepresentation-liability-singapore-sme)). This combination should be a negotiated change before signature.

#### How procurement connects to insurance

The SME's insurance position interacts with vendor terms in three ways.

**Cyber liability cover.** A vendor's data breach affecting the SME's customer data may be a covered event under the SME's cyber policy, but the cover typically operates by indemnifying the SME for amounts the SME pays out, then subrogating to the vendor. If the vendor's contract caps the vendor's liability at a low figure, the subrogation recovery is correspondingly limited.

**Professional indemnity cover.** Where the SME's AI tool produces output the SME uses in professional services, the PI policy responds to third-party claims based on that output. The vendor's indemnity may operate as a secondary recovery; the wording of "other insurance" clauses determines priority.

**Tech E&O cover.** Where the SME is itself a technology provider integrating AI tools into its own offering, Tech E&O is the primary cover. The vendor's contract terms (especially indemnity) directly shape the SME's Tech E&O underwriting and pricing.

#### What an SME should do at every AI vendor purchase

Five-step procurement process for any AI tool above a low materiality threshold:

1. **Read the vendor's terms** end-to-end, paying particular attention to the seven terms above and watching for the two prohibited terms.
2. **Run a CSA Guidelines self-assessment** against the vendor's security and governance posture.
3. **Assess PDPA implications** of the data flow, including whether the vendor is a data intermediary or a separate controller.
4. **Confirm insurance interaction** with the SME's licensed adviser before binding the contract - is the SME's existing cover affected? Are there exclusions that engage?
5. **Document the decision** with the rationale, including any negotiated changes to the standard terms.

The process scales: for low-materiality tools (a S$50/month productivity SaaS), it is a 20-minute exercise; for high-materiality tools (a S$50,000/year customer-facing AI), it is a multi-week exercise involving legal, security, and insurance advisers.

### Common Mistakes / What Goes Wrong

1. **Click-through acceptance without reading.** The default failure mode.
2. **Using the consumer tier when an enterprise tier with restricted data use exists.** The price difference is rarely material to the exposure delta.
3. **No CSA Guidelines or IMDA Framework assessment.** Procurement decisions made without the benchmark.
4. **Vendor's "AI training" right not negotiated.** Input data ends up in the model permanently.
5. **No PDPA assessment** of the data flow.
6. **No insurance check** before binding.
7. **No documented procurement decision.** Two years later, no one knows why the tool was chosen.
8. **Indemnity from vendor not aligned with the SME's downstream exposure.** Cap too low to matter.
9. **Sub-processors not disclosed by the vendor.** The data chain is invisible to the SME.
10. **No exit plan.** Migration at end of contract is impossible without prior structuring.

### What This Means for Your Business

1. **Establish an AI vendor procurement standard** - the seven terms above, plus the two prohibited terms.

2. **Apply the [CSA Guidelines on Securing AI Systems](https://www.csa.gov.sg/resources/publications/guidelines-and-companion-guide-on-securing-ai-systems/)** as the security floor.

3. **Apply the [IMDA Model AI Governance Framework](https://www.pdpc.gov.sg/help-and-resources/2020/01/model-ai-governance-framework)** as the governance benchmark.

4. **Reference the [MAS Outsourcing Guidelines](https://www.mas.gov.sg/regulation/guidelines/guidelines-on-outsourcing)** for FI-counterparty work or high-criticality tools.

5. **Run a PDPA assessment** on every data flow into an AI vendor.

6. **Confirm insurance interaction** with the licensed adviser before binding.

7. **Document the procurement decision** including any negotiated changes.

8. **Audit AI vendors annually** as part of the [60-minute insurance audit](/procedural-howto/business-insurance-audit-60-minutes-singapore) and the cyber-cover renewal.

### Questions to Ask Your Adviser

1. For each of our AI vendor agreements, which of our insurance covers responds, and to what extent?
2. Do any of our cyber, PI or Tech E&O wordings contain AI-vendor-specific exclusions or conditions?
3. If a vendor's data breach exposes our customer data, what is the subrogation recovery position?
4. What is your due-diligence support model when we are considering a new AI vendor?
5. At our next renewal, will any of our covers be affected by changes in our AI vendor stack?

### Related Information
- [When Your AI Agent Goes Rogue: Insurance Implications for Singapore SMEs After the Replit Database Wipe](/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme)
- [AI Chatbots and Customer Misrepresentation: Singapore SME Liability When the Bot Says the Wrong Thing](/emerging-risk/ai/ai-chatbot-customer-misrepresentation-liability-singapore-sme)
- [AI Training Data Licensing: The Anthropic Bartz Settlement and Singapore SMEs Using Generative AI](/emerging-risk/ai/ai-training-data-licensing-anthropic-bartz-singapore-sme)

*Published 22 May 2026. Source verified 22 May 2026.*

---
