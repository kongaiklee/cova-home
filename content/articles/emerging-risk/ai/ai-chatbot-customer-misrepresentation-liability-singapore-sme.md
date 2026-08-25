---
title: "AI Chatbots and Customer Misrepresentation: Singapore SME Liability When the Bot Says the Wrong Thing"
slug: "/emerging-risk/ai/ai-chatbot-customer-misrepresentation-liability-singapore-sme"
category: "emerging-risk"
subcategory: "ai"
intent: "beyond-the-basics"
topics: ["Professional Indemnity", "Cyber"]
industries: ["Tech / startup"]
agencies: ["Courts", "Singapore Statutes", "PDPC", "CCCS", "MAS", "CSA"]
article_number: 433
published: "2026-05-22"
source_verified: "2026-05-22"
word_count: 2228
status: "published"
hero_image: "/assets/blog/emerging-risk.jpg"
canonical_url: "https://covarage.com/guides/emerging-risk/ai/ai-chatbot-customer-misrepresentation-liability-singapore-sme"
meta_description: "A Singapore SME that deploys a customer-facing AI chatbot is legally responsible for what the chatbot says. The principle is anchored in [B2C2 Ltd v..."
og_title: "AI Chatbots and Customer Misrepresentation: Singapore SME Liability When the Bot Says the Wrong Thing"
og_description: "A Singapore SME that deploys a customer-facing AI chatbot is legally responsible for what the chatbot says. The principle is anchored in [B2C2 Ltd v..."
---

> **The Answer in 60 Seconds**
>
> A Singapore SME that deploys a customer-facing AI chatbot is **legally responsible for what the chatbot says**. The principle is anchored in [B2C2 Ltd v Quoine Pte Ltd \[2020\] SGCA(I) 02](https://www.elitigation.sg/gd/s/2020_SGCAI_2), in which a five-judge Court of Appeal held that the knowledge and intention of an algorithmic system is attributed to the programmer who caused it to operate as it did. International precedent has now caught up: in the widely-reported British Columbia Civil Resolution Tribunal decision *Moffatt v Air Canada* (February 2024), the airline was held liable for a refund promise its chatbot made that contradicted the airline's own published policy. For Singapore SMEs the exposure operates on three fronts at once: **misrepresentation liability** under the [Consumer Protection (Fair Trading) Act 2003 (CPFTA)](https://sso.agc.gov.sg/Act/CPFTA2003) administered by CCCS; **professional indemnity** exposure where the chatbot gives advice within a regulated activity; and **personal data** exposure under the [PDPA's Data Protection Obligations](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations) when the chatbot collects or processes individuals' data. This article sets out the Singapore legal framework, the four scenarios where chatbot deployments most often go wrong, and which insurance covers are operationally relevant.

### The Sourced Detail

The deployment of customer-facing AI chatbots in Singapore SMEs accelerated through 2024-2025 with the broad availability of foundation-model APIs from OpenAI, Anthropic, Google and Meta, plus the proliferation of low-code chatbot platforms (Intercom Fin, Zendesk AI, plus open-source LangChain stacks). The technical accessibility has outpaced the legal and insurance discipline around what to do when the chatbot makes a mistake that costs the customer money or breaches the customer's data.

The Singapore framework that governs the exposure is already in place; the absence is not regulatory clarity but operational awareness of what already applies.

#### The legal anchor: B2C2 v Quoine attribution

In [*Quoine Pte Ltd v B2C2 Ltd* \[2020\] SGCA(I) 02](https://www.elitigation.sg/gd/s/2020_SGCAI_2), the Singapore Court of Appeal (sitting as the Singapore International Commercial Court appellate panel) held by majority that for the purposes of doctrines like unilateral mistake, the knowledge attributed to an algorithmic trading system is the knowledge of the **programmer who caused the software to operate as it did**, not of the machine. The case concerned deterministic algorithms; Lord Mance, dissenting, noted that non-deterministic generative AI may require further development of the doctrine.

The controlling principle for SMEs is clear regardless of the doctrinal frontier: **a Singapore SME cannot point at its chatbot and disclaim responsibility for what the chatbot said to a customer**. The chatbot is the SME's agent in fact and in law, and the SME owns the consequences of its outputs.

The international counterpart is the British Columbia Civil Resolution Tribunal's February 2024 decision in *Moffatt v Air Canada*, in which the airline was held liable for the misstatement its chatbot made about a bereavement-fare refund policy. The CRT's reasoning - that a company is responsible for all information on its website, whether produced by a chatbot or a static page - mirrors the Singapore attribution principle and is now cited internationally as the operative authority on chatbot misrepresentation liability.

#### Consumer-protection exposure - the CPFTA route

The [Consumer Protection (Fair Trading) Act 2003](https://sso.agc.gov.sg/Act/CPFTA2003), administered by the [Competition and Consumer Commission of Singapore (CCCS)](https://www.cccs.gov.sg/), prohibits "unfair practices" in consumer transactions under section 4. The Second Schedule to the Act sets out the illustrative examples of unfair practices including representations that goods or services have characteristics they do not have, that they are of a particular standard quality or grade when they are not, and that a price benefit is available when it is not.

A chatbot that tells a customer the SME's product carries a feature it does not have, or that a discount is available when it is not, or that a refund policy operates differently from the published policy, exposes the SME to a CPFTA claim. Lower-value consumer claims may be brought before the Small Claims Tribunal under the [Small Claims Tribunals Act 1984](https://sso.agc.gov.sg/Act/SCTA1984) (general limit S$20,000, raised to S$30,000 with written consent of the parties); claims above the SCT's jurisdiction proceed to the State Courts.

The Lemon Law provisions in CPFTA Part 3 (sections 13 to 18) apply where the chatbot was party to the sale of defective goods.

#### Professional-indemnity exposure - the regulated-activity route

Where the chatbot operates within a regulated activity - a financial-advice chatbot, a healthcare-advice chatbot, a legal-advice chatbot - the exposure extends to professional indemnity.

For financial advice, [MAS Notice FAA-N16](https://www.mas.gov.sg/regulation/notices/notice-faa-n16) sets out the reasonable-basis-for-recommendation requirement under the [Financial Advisers Act 2001](https://sso.agc.gov.sg/Act/FAA2001). A chatbot that produces a recommendation without a reasonable basis breaches the Notice; the FA principal carries the regulatory exposure. [MAS Notice FAA-N03](https://www.mas.gov.sg/regulation/notices/notice-faa-n03) sets out the information-to-clients and product-information-disclosure standard; a chatbot that fails to make required disclosures is a breach of the Notice, regardless of whether the failure was instructed by a human.

For healthcare advice, the [Healthcare Services Act 2020](https://sso.agc.gov.sg/Act/HSA2020) and the Medical Registration Act regime govern who may give medical advice; a chatbot that gives advice falling within those regimes without supervision is potentially in breach.

For legal advice, the [Legal Profession Act 1966](https://sso.agc.gov.sg/Act/LPA1966) restricts who may give legal advice in Singapore; a chatbot that gives legal advice without lawyer supervision exposes the deploying SME.

In each regulated-activity case, the professional indemnity cover for the activity should respond to a third-party claim arising from chatbot output - **if** the policy wording does not contain an AI-output exclusion, and **if** the activity is within the policy's scope.

#### Personal-data exposure - the PDPA route

A customer-facing chatbot typically collects personal data: the customer's name, contact details, account information, payment information, free-text descriptions of issues, and conversation history. The collection engages the [PDPA's Data Protection Obligations](https://www.pdpc.gov.sg/overview-of-pdpa/the-legislation/personal-data-protection-act/data-protection-obligations):

- **Consent and Notification Obligations** - the customer must be aware of the purposes of collection.
- **Purpose Limitation Obligation** - data collected by the chatbot may only be used for purposes the customer was notified of.
- **Protection Obligation (section 24)** - reasonable security arrangements over the collected data, including the chatbot's logs and the model provider's storage.
- **Retention Limitation Obligation (section 25)** - cease retaining once the purpose has ended.

A chatbot integrated with a foundation-model API (OpenAI, Anthropic, Google) typically transmits the conversation to the model provider's infrastructure. The model provider becomes a data intermediary for those purposes, and the SME's PDPA obligations extend to ensuring the intermediary's arrangements are appropriate.

Where a chatbot deployment causes a notifiable data breach - the Part 6A architecture under sections 26A to 26E of the PDPA, with the notifiable threshold at section 26B (significant harm or 500+ affected individuals) and the 3-calendar-day notification window at section 26D - the breach must be reported to PDPC.

#### The four failure scenarios

Four scenarios recur across documented chatbot deployments and align with the legal exposures above.

**Scenario 1: The chatbot promises something the business does not deliver.** The Air Canada pattern. The chatbot, drawing on its training and the immediate context, generates a refund promise, a feature claim, or a price commitment that the business does not honour. The CPFTA route applies, and the misrepresentation may be enforceable as contract under the Singapore law of unilateral mistake (subject to the *Quoine* attribution analysis).

**Scenario 2: The chatbot gives advice within a regulated activity.** The FA, healthcare, or legal-advice pattern. The chatbot crosses into regulated territory without the supervision the regime requires. The regulator's enforcement route applies, and the professional indemnity exposure attaches.

**Scenario 3: The chatbot leaks personal data.** The PDPA route. A misconfigured chatbot exposes one customer's data to another, or stores data with insufficient security, or retains data beyond the legitimate purpose. The Part 6A notification obligations may engage.

**Scenario 4: The chatbot is prompt-injected.** A malicious customer constructs a prompt that causes the chatbot to disclose information, take an unauthorised action, or generate harmful output. This is the OWASP **LLM06:2025 Excessive Agency** pattern at [OWASP's published taxonomy](https://genai.owasp.org/llmrisk/llm062025-excessive-agency/). The exposure depends on what the chatbot had access to that the customer could induce it to misuse.

#### Insurance covers that may respond

Three covers are operationally relevant; each carries its own AI-output considerations.

**Professional indemnity (PI).** PI is claims-made and typically responds to third-party claims arising from professional services. Where the chatbot is performing professional services (advice, advisory, design, consulting), the PI policy should respond - subject to two policy-wording checks: whether the wording carries an "AI" or "automated decision-making" exclusion (some 2024-2025 wordings introduced these), and whether the chatbot's activity falls within the policy's defined "professional services".

**Public liability (PL).** PL typically responds to bodily injury and property damage; pure economic loss arising from misrepresentation is usually not covered under standard PL. PL is not the cover that responds to a misrepresentation claim.

**Cyber liability.** Where the chatbot is the vector for a data breach, the cyber policy responds to the breach event - PDPA-driven notification costs, third-party claims, regulatory fines (where insurable). The cyber policy's response to AI-specific events depends on whether the wording has been updated to address AI-related causes of loss. Affirmative AI endorsements emerging in the global cyber market (across multiple insurers) explicitly address this; whether the SME's incumbent cyber policy carries such an endorsement is a wording question.

**Technology errors and omissions (Tech E&O).** Where the SME develops, integrates, or resells the chatbot as part of a technology offering, Tech E&O may respond to third-party claims arising from defects in the technology. The same wording check applies for AI-specific exclusions.

#### Governance controls that reduce the exposure

Five controls reduce the chatbot's failure-mode surface, drawn from the [CSA Guidelines and Companion Guide on Securing AI Systems](https://www.csa.gov.sg/resources/publications/guidelines-and-companion-guide-on-securing-ai-systems/) published 15 October 2024 and updated practice since:

1. **Scope the chatbot's authority narrowly.** The chatbot answers customer questions about products, hours, policies; it does not make refund decisions, change prices, or commit the business to terms outside the published policy.
2. **Constrain the chatbot's responses to verified knowledge.** Retrieval-augmented-generation (RAG) over the business's own published policies, not free-form generation from the base model.
3. **Disclose the chatbot's nature.** Customers should know they are speaking to an AI, including under any future Singapore regulation on AI disclosure.
4. **Human-in-the-loop on irreversible actions.** Any action that commits the business (refund, price change, contract amendment) routes to human review.
5. **Log everything.** Conversation history retained for the appropriate retention period, with access controls and the ability to reconstruct any disputed interaction.

### Common Mistakes / What Goes Wrong

1. **Treating the chatbot as a separate legal person.** It is not; the SME owns its outputs.
2. **Assuming the PI policy responds without checking AI-exclusion wording.** A 2024-2025 wording change may have removed cover.
3. **No human-in-the-loop on refunds, discounts, or contract terms.** The cheapest control is the most often skipped.
4. **No disclosure to customers that they are speaking to AI.** Sector norms are shifting toward affirmative disclosure.
5. **Foundation-model API integration without PDPA assessment.** The model provider may be storing or training on the data.
6. **Free-form generation rather than RAG over published policy.** The chatbot says things the business does not say.
7. **No conversation logging.** A disputed interaction cannot be reconstructed.
8. **The chatbot is granted access to systems beyond its task scope.** OWASP LLM06 Excessive Agency.
9. **No CPFTA-style "unfair practice" review** of the chatbot's typical responses.
10. **No notification protocol** if the chatbot triggers a PDPA notifiable breach.

### What This Means for Your Business

1. **Treat the chatbot as your agent in law.** B2C2 v Quoine attribution applies.
2. **Scope authority narrowly** - chatbots answer; humans commit.
3. **Run RAG over your own published policies**, not free-form generation.
4. **Disclose to customers** that they are interacting with AI.
5. **Check your PI, cyber and Tech E&O wordings** for AI-specific exclusions before assuming cover responds.
6. **Implement the CSA Guidelines on Securing AI Systems** as the operational benchmark.
7. **Maintain conversation logs** with PDPA-aligned retention.
8. **Establish a PDPA breach-notification protocol** that covers chatbot-triggered events.

### Questions to Ask Your Adviser

1. For our PI, cyber and Tech E&O wordings, do they contain AI-specific exclusions or AI-specific endorsements?
2. If our chatbot makes a misrepresentation that the customer relies on, which policy responds and to what extent?
3. For our chatbot's foundation-model API integration, what is the PDPA assessment, and does our cyber cover address the model provider as a data intermediary?
4. If our chatbot triggers a PDPA notifiable breach, what is your claim-notification support model?
5. Has the market introduced affirmative AI endorsements that we should consider at the next renewal?

### Related Information
- [When Your AI Agent Goes Rogue: Insurance Implications for Singapore SMEs After the Replit Database Wipe](/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme)
- [AI Vendor Procurement for Singapore SMEs: The Indemnity Clause That Actually Matters](/emerging-risk/ai/ai-vendor-procurement-indemnity-singapore-sme)
- [AI Hallucinations in Professional and Advisory Services: The Singapore PI Exposure](/emerging-risk/ai/ai-hallucinations-professional-advisory-pi-singapore)

*Published 22 May 2026. Source verified 22 May 2026.*

---
