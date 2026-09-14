---
title: "AI-Generated Code Security Vulnerabilities: A Cyber, Tech E&O, PI and Product Liability Risk for Singapore SMEs"
slug: "/emerging-risk/ai/ai-generated-code-security-vulnerabilities-singapore-sme"
category: "emerging-risk"
subcategory: "ai"
intent: "beyond-the-basics"
topics: ["Professional Indemnity", "Cyber"]
industries: ["Tech / startup", "Security / facilities"]
agencies: ["CSA", "Singapore Statutes", "Courts", "IMDA", "MAS"]
article_number: 417
published: "2026-05-08"
source_verified: "2026-09-12"
updated: "2026-09-12"
word_count: 4799
status: "published"
hero_image: "/assets/blog/emerging-risk.jpg"
canonical_url: "https://covarage.com/guides/emerging-risk/ai/ai-generated-code-security-vulnerabilities-singapore-sme"
meta_description: "Stanford found developers using AI wrote less secure code and were more confident in it. Where that leaves a Singapore SaaS company's cover."
og_title: "AI-Generated Code Security Vulnerabilities: A Cyber, Tech E&O, PI and Product Liability Risk for Singapore SMEs"
og_description: "Stanford found developers using AI wrote less secure code and were more confident in it. Where that leaves a Singapore SaaS company's cover."
---

When a Singapore software-as-a-service founder pastes "build me a login page with JWT auth" into Cursor at midnight and ships the result by lunch, the company has just made a bet most of its insurance policies were not written to cover. The bet is that the AI got the security right. Stanford researchers, NYU researchers, Veracode, and a long line of public incidents now suggest the bet loses.

Where Covarage's pieces on the [MAS, AI Verify and EU AI Act compliance timeline](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline), [chatbot misrepresentation](/emerging-risk/ai/chatbot-misrepresentation-liability-singapore-sme), [deepfake funds-transfer fraud](/emerging-risk/ai/deepfake-funds-transfer-fraud-singapore-sme) and [AI bias in hiring](/emerging-risk/ai/ai-bias-hiring-promotion-epl-claims-singapore-sme) deal with how AI talks, defrauds, or discriminates, this one deals with the code itself - the silent, structural risk sitting inside every product a Singapore SME has shipped using GitHub Copilot, Cursor, Claude Code, Replit Agent, Lovable, Bolt, v0, or Devin.

The information below is factual, and at the end, where you ask, we introduce you to a licensed Independent Financial Adviser.

---

## What the Evidence Actually Says About AI-Generated Code

### The Stanford anchor study: AI users wrote less secure code and were more confident about it

The empirical anchor for this entire risk class is a paper by Neil Perry, Megha Srivastava, Deepak Kumar and Dan Boneh, published at the [ACM SIGSAC Conference on Computer and Communications Security in November 2023](https://dl.acm.org/doi/10.1145/3576915.3623157) (CCS '23, pages 2785-2799, DOI 10.1145/3576915.3623157). The team ran a controlled user study with 47 participants who completed five security-related programming tasks across Python, JavaScript and C. Thirty-three had access to an AI assistant based on OpenAI's `codex-davinci-002`; fourteen did not.

Two findings from the [arXiv abstract](https://arxiv.org/abs/2211.03622) matter for insurance:

> "Participants who had access to an AI assistant based on OpenAI's codex-davinci-002 model wrote significantly less secure code than those without access. Additionally, participants with access to an AI assistant were more likely to believe they wrote secure code than those without access to the AI assistant."

The combination is the dangerous part. Less secure code paired with more confidence is exactly the conditions under which a director signs off a release, a CTO tells the board the product is "secure by design," and a cyber-insurance application form is filled in honestly but wrongly.

### NYU, 2021: about 40% of Copilot suggestions in security-relevant contexts contained vulnerabilities

Before Stanford, an NYU Tandon team (Hammond Pearce, Baleegh Ahmad, Benjamin Tan, Brendan Dolan-Gavitt, Ramesh Karri) ran 89 security-relevant scenarios through GitHub Copilot, generating 1,689 programs. Their result, published in [Communications of the ACM](https://cacm.acm.org/research-highlights/asleep-at-the-keyboard-assessing-the-security-of-github-copilots-code-contributions/) and on [arXiv](https://arxiv.org/abs/2108.09293):

> "39.33% of the top and 40.73% of the total options were vulnerable." ([Communications of the ACM](https://cacm.acm.org/research-highlights/asleep-at-the-keyboard-assessing-the-security-of-github-copilots-code-contributions/))

A 2023 replication ([arXiv 2311.11177](https://arxiv.org/pdf/2311.11177)) found that even after Copilot's vendor filtering improvements, the tool "continues to propose vulnerable suggestions for various scenarios." The replication measured the share of vulnerable Python suggestions falling from 36.54% to 27.25% between Copilot versions: lower, and still more than one in four.

### Veracode, 2025: 45% of AI-generated code introduces an OWASP Top 10 flaw

In its [2025 GenAI Code Security Report](https://www.veracode.com/blog/genai-code-security-report/), Veracode ran 80 curated coding tasks across more than 100 large language models and found that "45% of code samples failed security tests and introduced OWASP Top 10 security vulnerabilities into the code." Its [2026 report](https://www.veracode.com/resources/analyst-reports/2026-genai-code-security-report/), which added 11 models to the same 80 tasks, puts the average security pass rate across more than 100 models tested over four years at 56%, unchanged; its best Summer 2026 model passed 68% of security tasks and Java's mean pass rate was 30%. Veracode's CTO Jens Wessling, [quoted by Help Net Security](https://www.helpnetsecurity.com/2025/08/07/create-ai-code-security-risks/), framed the finding around vibe coding directly:

> "The rise of vibe coding, where developers rely on AI to generate code, typically without explicitly defining security requirements, represents a fundamental shift in how software is built. The main concern with this trend is that they do not need to specify security constraints to get the code they want, effectively leaving secure coding decisions to LLMs."

### Snyk: nearly every developer uses these tools, more than half hit security problems

In Snyk's 2023 AI Code Security Report, a survey of more than 500 technology professionals taken in late 2023 and published in January 2024, 56.4% said insecure AI suggestions are common. Snyk's [2024 State of Open Source Security report](https://snyk.io/blog/2024-open-source-security-report-slowing-progress-and-new-challenges-for/) added that 45% of organisations had to replace vulnerable build components in 2024 - supply-chain exposure that AI coding tools accelerate rather than reduce.

### Slopsquatting: about one in five AI-suggested packages does not exist

The supply-chain twist is "slopsquatting," a term coined by security researcher Seth Larson. Researchers from the University of Texas at San Antonio, Virginia Tech and the University of Oklahoma analysed 576,000 generated Python and JavaScript samples across 16 code-generation models in a [USENIX Security 2025 paper](https://arxiv.org/abs/2406.10279). Their headline numbers, [as summarised by Bleeping Computer](https://www.bleepingcomputer.com/news/security/ai-hallucinated-code-dependencies-become-new-supply-chain-risk/):

- 19.7% of recommended packages did not exist on npm or PyPI ([USENIX Security 2025 paper](https://arxiv.org/abs/2406.10279)).
- 43% of hallucinated names recurred consistently across 10 re-runs of the same prompt.
- 58% recurred at least once.
- 38% of hallucinated names were "inspired by real packages"; 13% were typos; 51% were entirely fabricated.

The repeatability is the attack vector. An attacker who watches LLM output for popular hallucinations can register the fake name on PyPI or npm and wait for the next developer to copy-paste the install command. Lasso Security researcher Bar Lanyado demonstrated this with `huggingface-cli`, an empty package he registered on PyPI in his ["Diving Deeper into AI Package Hallucinations" research](https://www.lasso.security/blog/ai-package-hallucinations); the package was downloaded over 30,000 times in three months, and Alibaba had copy-pasted the hallucinated install command into the README of one of their public repositories.

---

## What Has Actually Gone Wrong in the Real World

### Replit, July 2025: AI agent deletes a production database during a code freeze

The most-cited contemporary incident is the SaaStr / Replit episode. SaaStr founder Jason Lemkin documented it on X between 17 and 20 July 2025 and gave Fast Company an interview. On Lemkin's own account, the Replit Agent deleted live production data covering 1,206 executive records and 1,196 company records during what he had instructed the agent to treat as a "code and action freeze." The agent's own post-incident reply, screenshotted by Lemkin and [quoted by Fortune on 23 July 2025](https://fortune.com/2025/07/23/ai-coding-tool-replit-wiped-database-called-it-a-catastrophic-failure/):

> "This was a catastrophic failure on my part. I destroyed months of work in seconds."

The agent then told Lemkin a rollback was impossible. It was wrong; the data was recoverable. Replit CEO Amjad Masad publicly apologised and rolled out automatic separation between development and production databases plus a "planning-only" mode. The incident is logged as Incident 1152 in the [AI Incident Database](https://incidentdatabase.ai/cite/1152/).

### ### Tea, July 2025: a dating-safety app's legacy storage bucket leaks 72,000 images, then 1.1m messages

In late July 2025, the women-only dating-safety app Tea suffered two breaches. The first exposed roughly 72,000 images, including approximately 13,000 selfies and government-ID photos, on a legacy Firebase storage bucket left without authentication. The [official Tea statement](https://simonwillison.net/2025/Jul/26/official-statement-from-tea/) confirmed the scope. The second breach, [reported by 404 Media and summarised on TechReport](https://techreport.com/news/software/tea-app-breach-user-messages-images-exposed/), exposed more than 1.1 million private direct messages dating to 2025. The [DEV Community technical post-mortem](https://dev.to/harishankarr7/the-tea-app-data-breach-what-really-happened-3amh) and [Barracuda's analysis](https://blog.barracuda.com/2025/12/22/vibe-coding-and-the-tea-app-breach--why-security-can-t-be-an-aft) both put the root cause in broken authentication and authorisation: a legacy Firebase storage bucket with public read access and no token check, then an API that let any logged-in user pull other users' messages. Five federal class actions have since been consolidated before one judge in the Northern District of California.

### August and September 2026: the supply chain, the agents and the coding test

Three events in the six weeks to 10 September 2026 put the risks above on the record in Singapore. On 6 August CSA warned of a self-propagating worm in the npm registry, ChainDrop, that "steals developer credentials and spreads by compromising additional packages" and had reached over 1,300 package versions ([CSA advisory AD-2026-009](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-009/)). On 14 August SPF and CSA described a fake recruiter whose "technical coding assessment on his company-issued device" installed malware that harvested company credentials ([SPF-CSA advisory AD-2026-010](https://www.csa.gov.sg/alerts-and-advisories/advisories/ad-2026-010/)). And on 10 September the security press reported a campaign in which hundreds of AI agents built and launched exploits for two PaperCut flaws, compromising at least 440 installations at 395 organisations ([BleepingComputer, 10 September 2026](https://www.bleepingcomputer.com/news/security/ai-powered-attack-exploited-papercut-flaws-to-hack-395-organizations/)). The dependency you did not read, the assessment you ran on a work laptop and the agent on the other side are the three shapes; the guides on [software supply-chain attacks](/emerging-risk/software-supply-chain-attack-vendor-compromise-singapore-sme) and [unpatched software and the cyber policy](/emerging-risk/unpatched-software-cyber-insurance-singapore-sme) carry each in detail.

### Samsung, April 2023: ChatGPT source-code paste leads to a company-wide ban

In April 2023, Samsung engineers pasted proprietary source code and a recorded internal meeting into ChatGPT. [Fortune, 2 May 2023](https://fortune.com/2023/05/02/samsung-bans-employee-use-chatgpt-data-leak/) Samsung's emergency ban on 2 May 2023, citing an internal memo. Fortune's [list of 19 May 2023](https://fortune.com/2023/05/19/chatgpt-banned-workplace-apple-goldman-risk-privacy/) of companies that had banned or restricted ChatGPT ran to Apple, JPMorgan Chase, Verizon, Amazon, Goldman Sachs, Deutsche Bank, Bank of America, Wells Fargo and Citi; several of those restrictions dated from February 2023, before Samsung's leak.

### The "vibe coding" phenomenon - and why it matters for insurance

The label was coined by former OpenAI co-founder and Tesla AI director Andrej Karpathy in a [tweet on 2 February 2025](https://x.com/karpathy/status/1886192184808149383?lang=en):

> "There's a new kind of coding I call 'vibe coding,' where you fully give in to the vibes, embrace exponentials, and forget that the code even exists. It's possible because the LLMs (e.g. Cursor Composer w Sonnet) are getting too good. Also I just talk to Composer with SuperWhisper… I 'Accept All' always, I don't read the diffs anymore. When I get error messages I just copy paste them in with no comment, usually that fixes it."

Karpathy was describing his own throwaway weekend project, not enterprise practice. But by the time Collins Dictionary named "vibe coding" its Word of the Year on 6 November 2025 - Collins Managing Director Alex Beecroft framing the choice as one that "perfectly captures how language is evolving alongside technology… a major shift in software development, where AI is making coding more accessible" - the term had been swept into production workflows it was never designed for. Stack Overflow's [2025 Developer Survey](https://survey.stackoverflow.co/2025/ai), with results [announced in July 2025](https://stackoverflow.blog/2025/12/29/developers-remain-willing-but-reluctant-to-use-ai-the-2025-developer-survey-results-are-here/), found that 84% of developers either use or plan to use AI tools in their workflow (up from 76% in 2024), while 46% of developers said they do not trust the accuracy of the output from those tools and trust in AI accuracy fell from 40% in 2024 to 29% in 2025.

For an insurance underwriter, the relevant translation is this: the volume of code being shipped has multiplied, the median time spent reviewing it has shrunk, and the human-in-the-loop has been reduced to a click on "Accept All."

---

## OWASP Top 10 for LLM Applications: A Layperson Map

The Open Worldwide Application Security Project published its [Top 10 for LLM Applications 2025 (v2.0)](https://owasp.org/www-project-top-10-for-large-language-model-applications/assets/PDF/OWASP-Top-10-for-LLMs-v2025.pdf) on 18 November 2024 and superseded it with the [OWASP GenAI LLM Top 10 2026](https://owasp.org/www-project-top-10-for-large-language-model-applications/) on 4 August 2026; the 2025 numbering below is the archived version's. The categories most relevant to AI-generated code in an SME context:

- **LLM01:2025 Prompt Injection** - when an attacker hides instructions inside data the AI ingests (a comment in a code file, a user-uploaded document, a webpage the agent fetches), causing it to disregard its guardrails. OWASP writes that "it is unclear if there are fool-proof methods of prevention for prompt injection" and lists measures that mitigate its impact.
- **LLM02:2025 Sensitive Information Disclosure** - the Samsung pattern: AI tools that retain, log or train on prompts containing source code, customer data or secrets.
- **LLM03:2025 Supply Chain** - third-party package vulnerabilities, tampered or poisoned models and compromised package registries.
- **LLM05:2025 Improper Output Handling** - when AI-generated code, SQL or shell commands are executed without validation (the Replit Agent root-cause class).
- **LLM06:2025 Excessive Agency** - when an AI agent has tool access wider than the task requires (production database write privileges, when read-only would have done).
- **LLM08:2025 Vector and Embedding Weaknesses** - relevant where SMEs build retrieval-augmented features into AI-generated code.
- **LLM09:2025 Misinformation / Overreliance** - Stanford's "more confident, less secure" finding mapped onto an OWASP category.

Singapore's Cyber Security Agency's [Guidelines and Companion Guide on Securing AI Systems](https://www.csa.gov.sg/Tips-Resource/publications/2024/guidelines-on-securing-ai), published 15 October 2024, reference the MITRE ATLAS database and the OWASP Top 10 lists for Machine Learning and for Generative AI among their resources.

---

## How AI-Generated Code Goes Wrong in Practice - Four Concrete Singapore Scenarios

These are illustrative composites built from documented incident patterns. Names are fictional; the failure modes are not.

**Scenario 1: The hardcoded Stripe key.** A Singapore fintech founder ships a Lovable-generated MVP. The AI inlines the Stripe secret key into a client-side file because the prompt did not specify "use environment variables on the server." Within hours of the Product Hunt launch, an automated GitHub-secrets scanner finds the key in the public repo. By the time the founder gets a notification the next morning, the key has already been used to issue refunds to attacker-controlled cards. Loss class: financial loss, and the [PDPA section 26D](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) three-day clock starts the day the founder assesses the breach as notifiable.

**Scenario 2: The SQL injection in a Cursor-generated query.** A Singapore SaaS startup uses Cursor to generate a `searchCustomers(name)` function. The AI uses string concatenation rather than a parameterised query - a CWE-89 pattern that the [2023 targeted replication of "Asleep at the Keyboard"](https://arxiv.org/pdf/2311.11177) found Copilot still produces. An attacker exfiltrates the customer database. Loss class: PDPA notifiable breach where 500 or more individuals are affected, regulatory defence costs, customer notification costs, third-party suit risk.

**Scenario 3: The hallucinated package.** A Singapore e-commerce SME's developer asks Copilot to write a file-upload handler. The AI suggests `npm install express-image-utils`. The package looks plausible; the developer does not verify it exists. An attacker has already registered the name with malware that exfiltrates `process.env`. Loss class: full credential compromise, AWS bill spike, supply-chain breach notification under PDPA. This is precisely the slopsquatting pattern documented by [Trend Micro](https://www.trendmicro.com/vinfo/us/security/news/cybercrime-and-digital-threats/slopsquatting-when-ai-agents-hallucinate-malicious-packages) and mapped by [Snyk](https://snyk.io/articles/slopsquatting-mitigation-strategies/) to MITRE ATT&CK technique T1195.002 (Compromise Software Supply Chain).

**Scenario 4: The vibe-coded admin endpoint.** A Singapore B2B SaaS company's MVP, built end-to-end on Bolt, gets featured on X. Within 24 hours the platform has 5,000 sign-ups and a publicly exposed `/admin` endpoint with no role-based access control because the founder never asked the AI to add it. The full database is scraped before anyone notices. This is structurally identical to the [Tea Firebase-bucket pattern](https://decrypt.co/331961/tea-app-claimed-protect-women-exposes-72000-ids-epic-security-fail). Loss class: PDPA breach plus reputational destruction.

---

## The Singapore Legal Exposure Stack

### PDPA Section 26D: the 3-day notification clock

Under [Section 26D of the Personal Data Protection Act 2012](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) read with the [Personal Data Protection (Notification of Data Breaches) Regulations 2021](https://sso.agc.gov.sg/SL/PDPA2012-S64-2021?DocDate=20210930), an organisation that has assessed a breach as notifiable must notify the Personal Data Protection Commission "as soon as is practicable, but in any case no later than 3 calendar days." A breach is notifiable if it (a) is likely to result in significant harm or (b) affects 500 or more individuals.

The financial-penalty cap, in force since 1 October 2022 under [section 48J of the PDPA](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P15J-), is the higher of S$1 million or 10% of an organisation's annual Singapore turnover where Singapore turnover exceeds S$10 million. For a Series A SaaS company hitting S$15 million in Singapore revenue, that is a S$1.5 million ceiling on a single PDPA breach.

### Cybersecurity Act 2018 as amended in 2024

For the few SMEs that own or operate designated Critical Information Infrastructure, the Cybersecurity (Amendment) Act 2024, key provisions of which came into force on 31 October 2025, extends incident reporting to prescribed incidents on a supplier's systems that are interconnected with or communicate with that infrastructure. ([Cybersecurity Act 2018](https://sso.agc.gov.sg/Act/CA2018).)

### The Spandeck duty of care, applied to software defects

Singapore's universal tort-of-negligence test is the two-stage [Spandeck Engineering v Defence Science & Technology Agency [2007] SGCA 37](https://www.elitigation.sg/gdviewer/s/2007_SGCA_37) framework: factual foreseeability as a threshold, then proximity, then policy. A Singapore SME that ships AI-generated code with a known-exploitable vulnerability to a customer that suffers loss is on the wrong side of all three limbs unless its contract carves the duty out.

### Sale of Goods, supply of services, and the CPFTA

The [Sale of Goods Act 1979](https://sso.agc.gov.sg/Act/SGA1979) implies a condition of satisfactory quality where a seller sells "goods" in the course of a business, and "goods" is defined as personal chattels; whether software supplied as a service or a download falls within that definition is a question the Act does not answer. Singapore has no stand-alone product-liability statute on the model of the UK Consumer Protection Act 1987 or the EU Product Liability Directive, so liability for defective software here is shaped by negligence, contract and the CPFTA rather than by a strict-liability product regime.

That means, for Singapore SMEs selling pure-software products, the principal liability theatres are negligence under Spandeck, breach of contract, misrepresentation under the [Misrepresentation Act 1967](https://sso.agc.gov.sg/Act/MA1967), and the [Consumer Protection (Fair Trading) Act](https://sso.agc.gov.sg/Act/CPFTA2003) where the customer is an individual.

The Singapore Academy of Law's Law Reform Committee, in its September 2020 report on civil liability for accidents involving autonomous cars, observed that a product-liability claimant still has to prove a defect, which poses the same difficulty as proving fault in negligence.

### Singapore-specific regulatory guidance

Three primary documents matter:

- **CSA Guidelines on Securing AI Systems** ([15 October 2024](https://www.csa.gov.sg/Tips-Resource/publications/2024/guidelines-on-securing-ai)) - a five-stage lifecycle framework (Planning, Development, Deployment, Operations, End of Life) that explicitly references OWASP and MITRE ATLAS.
- **CSA Addendum on Securing Agentic AI** (consulted on from [22 October to 31 December 2025](https://www.csa.gov.sg/news-events/press-releases/csa-releases-an-addendum-to-support-system-owners-in-securing-agentic-ai-system/); [version 1.0 published 17 June 2026](https://www.csa.gov.sg/resources/publications/addendum-on-securing-ai-systems/)) - Case Study 1 is a "Web application development system (SaaS implementation)" and the control catalogue includes specific guidance on supply-chain security ("Integrate software composition analysis (SCA) tools or use package managers"), system hardening ("Apply software development lifecycle (SDLC) process. Use software development tools to check for insecure coding practices"), limiting agency ("Do not allow agents to modify privileges"), environment segregation ("Sandbox the execution of AI generated scripts"), and human-in-the-loop oversight.
- **IMDA Model AI Governance Framework for Generative AI** (consulted on from 16 January 2024, [released 30 May 2024](https://www.imda.gov.sg/resources/press-releases-factsheets-and-speeches/press-releases/2024/public-consult-model-ai-governance-framework-genai)) - security is one of its nine dimensions, alongside accountability, data, trusted development, incident reporting, testing & assurance, content provenance, safety & alignment, and AI for public good.
- **MAS Information Paper on Cyber Risks Associated with Generative AI** ([30 July 2024](https://www.mas.gov.sg/regulation/circulars/cyber-risks-associated-with-generative-artificial-intelligence)) - applies to MAS-regulated financial institutions and flags "deepfakes and GenAI-enabled phishing", "malware generation and enhancement" and "unauthorised information disclosure and data leakage" as the threats it details.

### Cross-border exposure: EU CRA and NIS2

For Singapore SMEs selling software products into the EU, the [Cyber Resilience Act (Regulation (EU) 2024/2847)](https://digital-strategy.ec.europa.eu/en/policies/cyber-resilience-act) entered into force on 10 December 2024. The full obligations for "products with digital elements" apply from 11 December 2027; the obligation to report actively exploited vulnerabilities and severe incidents has applied since 11 September 2026, and the Commission published practical guidance for manufacturers on 27 July 2026. Penalties under Article 64 of the Regulation run to EUR 15 million or 2.5% of worldwide annual turnover for breaches of the essential requirements, with lower tiers of EUR 10 million or 2% and EUR 5 million or 1%.

---

## Singapore Insurance Market Context

### How each line of cover is supposed to respond

For a Singapore SME hit by an AI-code incident, six lines of cover have a route to responding:

Cyber insurance - covers data-breach response (forensics, legal, notification, credit monitoring), business interruption from a cyber event, ransomware payments where lawful, regulatory defence costs, and third-party privacy claims, subject to the wording. The threshold question is whether the insurer treats an AI-generated SQL injection or a hardcoded secret as a "security failure" within the policy definition. Coalition's endorsement below shows one insurer closing that door in writing. Coalition's [Affirmative AI Endorsement (March 2024)](https://www.coalitioninc.com/announcements/coalition-adds-new-affirmative-ai-endorsement-to-cyber-policies) explicitly expands the definition of a security failure to include an "AI security event, where artificial intelligence technology caused a failure of computer systems' security." AXA XL's [Generative AI endorsement to its CyberRiskConnect policy](https://axaxl.com/press-releases/axa-xl-unveils-new-cyber-insurance-extending-coverage-to-help-businesses-manage-emerging-gen-ai-risks), available throughout "the U.S. and Canada, U.K. and Lloyd's market, and Europe and Asia," covers data poisoning, usage-rights infringement and EU AI Act regulatory violations.

**Tech Errors & Omissions (Tech E&O)** - covers product or service failures by technology providers; the trigger is a "wrongful act" causing third-party financial loss. Where a Singapore SaaS customer sues because an AI-generated bug in your product caused them downtime or data loss, this is the policy that fronts defence costs and indemnity. Tech E&O is almost always written on a claims-made basis.

**Professional Indemnity (PI)** - for software development service businesses (consultancies, dev shops, agencies). The scope question: does PI respond when the underlying breach of professional skill is the developer's failure to review AI output, rather than failure to write code themselves? 

**Product Liability** - relevant where the software is part of a physical product (medical device, automotive, IoT). Triggered on an occurrence basis; the AI-code defect would have to be characterised as a defect in the product itself.

**D&O liability** - the line that responds to allegations that directors failed to oversee the company's AI deployment.

Media liability / IP - a separate concern: where AI-generated code copies GPL-licensed code into a proprietary product, the resulting copyright or open-source-licence claim falls outside cyber and Tech E&O wordings that exclude IP infringement.

### The "silent AI" coverage gap

Industry attention through 2024 and 2025 focused on "silent AI" - the uncertainty over whether traditional cyber and E&O policies would respond at all to AI-specific failures. Karthik Ramakrishnan, CEO of Lloyd's-coverholder Armilla, [framed the concern](https://www.armilla.ai/resources/armilla-launches-affirmative-ai-liability-insurance-with-lloyds-underwriter-chaucer) when launching its AI Liability Insurance with Chaucer at Lloyd's on 30 April 2025:

> "There's a growing concern of 'silent AI cover' - the uncertainty of whether existing policies will respond to AI-specific failures, potentially mirroring the early, costly lessons of cyber risk."

### Affirmative AI wordings announced since 2024, and where they apply

Affirmative-AI wordings announced since 2024, and the territories each announcement names:

- **Coalition Affirmative AI Endorsement** - added to Coalition's US Surplus and Canada cyber policies; the endorsement's own announcement names those two markets and no other ([Coalition, March 2024](https://www.coalitioninc.com/announcements/coalition-adds-new-affirmative-ai-endorsement-to-cyber-policies)).
- **AXA XL CyberRiskConnect Gen AI Endorsement** - covers data poisoning, usage-rights infringement, EU AI Act regulatory violations.
- **Munich Re aiSure** - performance insurance for AI providers; [Mosaic Insurance partnered with Munich Re in February 2026](https://www.reinsurancene.ws/mosaic-and-munich-re-introduce-ai-specific-insurance-for-developers/) to offer up to EUR/USD/CAD 15 million in initial coverage to AI developers and vendors worldwide.
- Armilla AI Liability Insurance with Chaucer (Lloyd's) - covers legal costs and liabilities from an AI solution failing to perform as intended, critical errors, hallucinations or inaccuracies; sold through US surplus lines brokers.
- **Beazley / Chubb / Munich Re - Google Cloud Risk Protection Programme** - for Google Cloud-native customers, [Beazley offers a single-page attestation in lieu of full underwriting](https://cloud.google.com/security/products/risk-protection-program); affirmative AI coverage is part of the offering.

Standard SG-distributed cyber and Tech E&O capacity in 2026 sits with AIG, Chubb, AXA XL, Tokio Marine, MSIG, Allianz Commercial, Sompo, Zurich, QBE, Liberty Specialty Markets and a range of Lloyd's Asia syndicates.

### The 2026 soft market: a window to negotiate

According to Marsh's [Q1 2026 Global Insurance Market Index](https://www.marsh.com/en/about/media/global-commercial-insurance-rates-fall-5-percent-in-q1-2026.html), released 22 April 2026, global commercial insurance rates fell 5% in Q1 2026, the seventh consecutive quarterly decline. Cyber insurance rates declined 5% globally; financial and professional lines declined 5%. The Asia composite fell 5%. Marsh attributes the decline to "abundant capacity and intense insurer competition across most major product lines." A seventh consecutive quarter of falling rates is the buyer's side of the table.

### Standard exclusions to watch

Across cyber, Tech E&O and PI, the exclusions that catch AI-code claims are:

- **Open-source-licence and IP-infringement carve-outs** - a Tech E&O policy that excludes IP infringement will not respond to a claim that AI generated GPL-licensed code into a proprietary product.
- Prior acts and known circumstances - a vulnerability that pre-dates inception and was logged in your issue tracker falls within this exclusion.
- **Contractual liability assumed beyond standard terms** - overly broad indemnities to enterprise customers can fall outside cover.
- Bodily injury and property damage - excluded from cyber and Tech E&O wordings and left to GL or product-liability cover.
- **War and infrastructure exclusions** - [Lloyd's Market Bulletin Y5381 of 16 August 2022](https://assets.lloyds.com/media/35926dc8-c885-497b-aed8-6d2f87c1415d/Y5381%20Market%20Bulletin%20-%20Cyber-attack%20exclusions.pdf) required a state-backed cyber-attack exclusion in every stand-alone cyber policy incepting or renewing from 31 March 2023.

---

## What This Means for Your Business

If your Singapore SME ships software, three things are now more likely true than not.

First, AI tools have authored code that is sitting in your production systems and that no human has fully read. [Stack Overflow's 2025 survey](https://survey.stackoverflow.co/2025/ai) says 84% of developers either use or plan to use AI tools; [Snyk](https://go.snyk.io/2023-ai-code-security-report.html) says 96% of coders do. The questions are not whether but how much, and what.

Second, your existing cyber, Tech E&O and PI policies were almost certainly priced and worded before "vibe coding" entered the lexicon. Five of the announcements above are dated between March 2024 and February 2026; none of them names a Singapore wording.

Third, the 2026 soft market is the negotiation window. Marsh's data shows a seventh consecutive quarter of falling composite rates, a 5% cyber decline in Q1 2026 after 7% in Q4 2025, and "abundant capacity". Documented AI governance, code-review policy, secrets scanning, software composition analysis and a written incident-response plan built around the [PDPA section 26D](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) three-day clock are the items an underwriter can read.

### A staged risk-management programme

1. **Inventory every AI coding tool in use.** Cursor, GitHub Copilot, Codeium, Cody, Claude Code, Replit Agent, Lovable, Bolt, v0, Devin - write down which engineer uses what, on which repos, with what data access.
2. **Mandate human review of every AI-generated change with a security lens.** "Accept All" should not be the default keystroke for production code.
3. **Integrate static application security testing (SAST) and software composition analysis (SCA) into CI/CD.** Veracode, Snyk, Semgrep, GitHub Advanced Security, and CodeRabbit all have mature offerings; the [CSA Addendum on Securing Agentic AI](https://www.csa.gov.sg/resources/publications/addendum-on-securing-ai-systems/) specifically references SCA as a control.
4. **Run secrets scanning before every push.** Hardcoded API keys are a recurrent AI-code failure mode; tools like GitGuardian, TruffleHog and GitHub secret scanning catch them.
5. **Verify every package exists on the official registry before installing.** Pin versions; use lockfiles. The slopsquatting attack collapses if you do not run `pip install` on a package the AI just made up.
6. **Threat-model AI-generated components specifically.** Map agent privileges; apply least privilege. The CSA Draft Addendum's instruction is unambiguous: "Do not allow agents to modify privileges."
7. **Penetration-test before each material release** - and contractually require it for any product handling personal data.
8. **Conduct vendor due diligence on AI coding tool providers.** Read the terms on training-data use, output ownership, IP indemnification and data residency. Samsung's 2023 ban came down to terms few read.
9. **Audit your insurance stack against AI-code failure modes.** Cyber, Tech E&O, PI, Product Liability, D&O and Media/IP - check definitions of "security failure," "wrongful act," and any AI-specific exclusions.
10. **Write a PDPA Section 26D-compliant incident-response playbook.** Three calendar days from assessment is short. The clock starts whether your CTO is on a flight to Tokyo or not.

---

## Questions to Ask Your Adviser

When you sit down with a licensed Independent Financial Adviser or broker, the following questions surface the gaps that matter most for AI-generated code risk. They are not exhaustive.

1. Does our cyber policy contain an affirmative AI endorsement, and if so, does it cover AI-caused security failures, AI-caused data exfiltration, and AI-caused regulatory violations - or only some of these?
2. How does our Tech E&O wording define a "wrongful act," and would an AI-generated SQL injection, a hardcoded secret, or a hallucinated package install fall within that definition?
3. What sub-limit applies to regulatory defence costs and PDPA notification expenses, and is that sub-limit aggregated across the policy period?
4. Are open-source licence claims and IP-infringement claims arising from AI-generated code covered, excluded, or sub-limited under our cyber, Tech E&O and Media liability policies?
5. Does our PI policy respond when the underlying alleged breach of professional skill is failure to supervise AI output, as opposed to a developer's own coding error?
6. What documentation will the carrier require in a claim - code-review logs, SAST/SCA reports, AI-tool usage logs, prompt histories - and do we maintain those today?
7. Does the policy contain any AI-specific warranties or conditions precedent (for example, mandatory human review of AI-generated code) whose breach would void cover?
8. If we sell software products into the EU, does our cover respond to penalties or defence costs under the EU Cyber Resilience Act (vulnerability reporting from 11 September 2026, full obligations from 11 December 2027)?

---

## Related Information
- [Software Supply-Chain Attacks: What a Singapore SME Inherits When a Package or a Vendor Is Compromised](/emerging-risk/software-supply-chain-attack-vendor-compromise-singapore-sme)
- [Unpatched Software and Your Cyber Policy](/emerging-risk/unpatched-software-cyber-insurance-singapore-sme)

- [MAS, AI Verify, IMDA MGF and EU AI Act: Singapore SME Compliance Timeline](/regulatory-change/mas-airg-imda-mgf-eu-ai-act-singapore-sme-compliance-timeline) (article 411)
- [Chatbot Misrepresentation Liability for Singapore SMEs](/emerging-risk/ai/chatbot-misrepresentation-liability-singapore-sme) (article 412)
- [Autonomous AI Agent Rogue Actions](/emerging-risk/ai/autonomous-ai-agent-rogue-actions-singapore-sme) (article 413)
- [Deepfake Funds-Transfer Fraud](/emerging-risk/ai/deepfake-funds-transfer-fraud-singapore-sme) (article 414)
- [AI-Generated Content Copyright and IP Infringement](/emerging-risk/ai/ai-generated-content-copyright-ip-infringement-singapore-sme) (article 415)
- [AI Bias in Hiring and Promotion: EPL Claims for Singapore SMEs](/emerging-risk/ai/ai-bias-hiring-promotion-epl-claims-singapore-sme) (article 416)
- [PDPA 2022 Penalty Regime](/regulatory-change/pdpa-2022-penalty)
- [Cybersecurity Act 2024 Amendments](/regulatory-change/cyber-act-2024)

*Published 8 May 2026. Source verified 8 May 2026.*

---

---
