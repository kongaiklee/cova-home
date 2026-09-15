---
title: "Biometric Data and the PDPA: The Emerging Privacy-Liability Exposure for Singapore SMEs"
slug: "/emerging-risk/biometric-data-pdpa-liability-singapore"
category: "emerging-risk"
intent: "beyond-the-basics"
topics: ["Cyber"]
industries: []
agencies: ["Singapore Statutes"]
article_number: 496
published: "2026-05-31"
source_verified: "2026-09-12"
updated: "2026-09-15"
word_count: 3208
status: "published"
hero_image: "/assets/blog/emerging-risk.jpg"
canonical_url: "https://covarage.com/guides/emerging-risk/biometric-data-pdpa-liability-singapore"
meta_description: "A leaked password can be changed. A leaked fingerprint cannot. Why biometrics carry a heavier duty under Singapore's PDPA, and what section 24 expects."
og_title: "Biometric Data and the PDPA: The Emerging Privacy-Liability Exposure for Singapore SMEs"
og_description: "A leaked password can be changed. A leaked fingerprint cannot. Why biometrics carry a heavier duty under Singapore's PDPA, and what section 24 expects."
---

The fingerprint scanner at your office door, the facial-recognition camera in your reception area, the face-scan time-attendance terminal on the factory floor: each of them is quietly building a database of something you cannot revoke, reset, or reissue. An employee whose password leaks can change the password. An employee whose face template leaks cannot change their face. That asymmetry is the heart of the biometric privacy problem, and under Singapore law it sits squarely inside the Personal Data Protection Act 2012 (PDPA). ([PDPA 2012, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012).)

Biometric data was once the preserve of banks, airports, and government. It is now ordinary SME infrastructure. A coworking operator runs face entry. A clinic uses fingerprint login for its patient system. A logistics firm scans drivers' faces for time-attendance. None of these businesses think of themselves as handling sensitive data at scale. The PDPC does: its guide on biometric data in security applications records that it "has observed more incidents involving the mishandling of such data". ([Guide on the Responsible Use of Biometric Data in Security Applications, PDPC, 17 May 2022](https://www.pdpc.gov.sg/organisations/resources/guidance-by-topic/guide-on-the-responsible-use-of-biometric-data-in-security-applications).)



## Why biometric data is "personal data" under the PDPA

The PDPA defines personal data as data about an individual who can be identified from that data, or from that data and other information to which the organisation has or is likely to have access. ([PDPA 2012, section 2 interpretation, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012).) A fingerprint template, a facial-geometry vector, an iris scan, or a voiceprint is data about a specific identifiable individual. It is, by construction, the most identifying data a person carries, because the entire purpose of biometrics is to single out one human being from all others.

That places biometric data inside the PDPA's obligations: Consent and Purpose Limitation (Part 4), Notification of purpose ([section 20](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P13-)), Access and Correction (Part 5), Accuracy, Protection, Retention and Transfer Limitation (Part 6), the Accountability duties in Part 3, and the data-breach notification duties in Part 6A. Two of those obligations carry the sharpest liability edge for an SME running a scanner: the Protection Obligation in section 24, and the breach-notification duty in section 26D.

The PDPC has signalled that it treats certain categories of identifier as warranting heightened care. Its Advisory Guidelines on the PDPA for NRIC and other National Identification Numbers (issued 31 August 2018) state that organisations "are generally not allowed to collect, use or disclose NRIC numbers" except where the law requires it or where it is "necessary to accurately establish or verify the identities of the individuals to a high degree of fidelity", because the NRIC number is "a permanent and irreplaceable identifier". ([Advisory Guidelines on the PDPA for NRIC and other National Identification Numbers, PDPC](https://www.pdpc.gov.sg/organisations/regulations-decisions/regulatory-guidance/advisory-guidelines-on-the-personal-data-protection-act-for-nric-and-other-national-identification-numbers).) The breach-notification Regulations put biometric data that is used to access an account, together with the account identifier, on the list of data whose breach is deemed to cause significant harm. ([Personal Data Protection (Notification of Data Breaches) Regulations 2021, regulation 3(1)(b)](https://sso.agc.gov.sg/SL/PDPA2012-S64-2021).) The instruction that runs through the PDPC's biometric guide is minimisation: "minimise the personal data stored in the system by storing only the biometric templates and discarding the biometric samples as soon as practicable", and protect what is stored with encryption at rest and in transit.

### The Sourced Detail

#### The Protection Obligation: section 24

Section 24 of the PDPA requires an organisation to protect personal data in its possession or under its control by making reasonable security arrangements to prevent (a) unauthorised access, collection, use, disclosure, copying, modification or disposal, or similar risks, and (b) the loss of any storage medium or device on which personal data is stored. ([PDPA 2012, section 24, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P14-).)

The statutory test is "reasonable security arrangements." Reasonableness is not fixed in the statute, and the PDPC's biometric guide sets out what it expects for templates: encrypt them, link them "only to Universally Unique Identifiers (UUIDs) or hashes of identifiers" rather than to names, and segregate their storage from other data. Because biometric templates are irreversible and uniquely identifying, the arrangements a regulator would consider reasonable for a face-template database are more demanding than those for, say, a list of business email addresses. The same statutory words, a higher practical bar.

For an SME running biometric access or attendance systems, the PDPC's guide lists the arrangements: store only the one-way template and discard the raw sample as soon as practicable; encrypt data at rest and in transit and encrypt the templates themselves; link templates to unique identifiers or hashes rather than names; segregate template storage from other data; and confirm in writing whether the device or its cloud service sends templates offsite. ([Guide on the Responsible Use of Biometric Data in Security Applications, PDPC, 17 May 2022](https://www.pdpc.gov.sg/organisations/resources/guidance-by-topic/guide-on-the-responsible-use-of-biometric-data-in-security-applications).) The fact that a third-party device manufacturer holds the data does not transfer the obligation away from you. If the data is under your control for your purposes, section 24 is yours to satisfy.

#### Consent, purpose, and the "is it necessary" question

Before protection even arises, the threshold question is whether you should be collecting the biometric at all. The PDPA's Consent and Purpose Limitation obligations require that you collect personal data only for purposes a reasonable person would consider appropriate, and with consent unless the Act or another written law permits collection without it. ([PDPA 2012, sections 13 and 18, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P12-).) ([PDPA 2012, Part 4, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P12-).)

The hard edge for biometrics is the employment context. The PDPC's guide says an employer "may rely on the employment exception where the collection, use or disclosure of the employee's biometric sample is reasonable for the purpose of managing the employment relationship", and names "biometric access control of staff entry into the office premises" as an example of a legitimate purpose within that exception; where consent is the basis instead, section 14(2)(a) bars an organisation from requiring consent "beyond what is reasonable to provide the product or service" as a condition of providing it. ([Guide on the Responsible Use of Biometric Data in Security Applications, PDPC](https://www.pdpc.gov.sg/organisations/resources/guidance-by-topic/guide-on-the-responsible-use-of-biometric-data-in-security-applications); [PDPA 2012, section 14, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr14-).) A deployment that offers a non-biometric route (a PIN, a card, a manual override) keeps the biometric within what section 14(2)(a) calls reasonable for the service, and section 20 requires staff to be told the purposes of collection on or before it happens; telling them where the template is stored and for how long goes beyond the statute and is the practice the PDPC's guide describes. Collecting a face scan because the vendor's device offered the feature, rather than because the purpose required it, runs against the guide's instruction to "minimise the personal data stored in the system".

#### The breach-notification duty: Part 6A and section 26D

If biometric data is compromised, the PDPA's mandatory breach-notification regime engages. A data breach is notifiable if it results in, or is likely to result in, significant harm to an affected individual, or is, or is likely to be, of a significant scale. ([PDPA 2012, section 26B, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-).)

Where an organisation assesses that a breach is notifiable, section 26D requires it to notify the Personal Data Protection Commission as soon as is practicable, and in any case no later than 3 calendar days after the day the organisation makes that assessment. The organisation must also notify each affected individual where the breach is one likely to result in significant harm, in a manner reasonable in the circumstances. ([PDPA 2012, section 26D, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-).)

Two features of this regime bite hard for biometric breaches. First, the clock runs from the day you *assess* the breach as notifiable, not the day you finish investigating, so a slow or undocumented assessment does not buy you time. Second, the "significant harm" trigger has a deemed limb: under the Notification of Data Breaches Regulations 2021 a breach of an account identifier together with "biometric data or other data that is used or required to allow access to or use of the individual's account" is deemed to result in significant harm, and outside that limb you must judge for yourself whether harm is likely, a judgment that is hard to argue against for an identifier the person can never reset. ([Personal Data Protection (Notification of Data Breaches) Regulations 2021, regulation 3, Singapore Statutes Online](https://sso.agc.gov.sg/SL/PDPA2012-S64-2021).) The dedicated explainer on the [3-day clock under section 26D](/document-legal/pdpa-section-26d-breach-notification) walks through how the assessment window is counted.

#### The carve-out under section 26B(4): keep it inside the organisation

There is one structural relief worth knowing. Section 26B(4) provides that a data breach relating only to the unauthorised access, collection, use, disclosure, copying or modification of personal data *within* an organisation is deemed not to be a notifiable data breach. ([PDPA 2012, section 26B(4), Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-).) ([PDPA 2012, section 26B(4), Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-).) An internal-only misstep that never exposes the template outside your walls falls outside the notification duty. That is a narrow carve-out, not a safe harbour: the moment a template database is exfiltrated, copied to a vendor cloud without control, or accessed by an outside party, the carve-out is gone.

## The liability exposure

Biometric privacy failures expose an SME on two fronts: a regulatory front (PDPC enforcement) and a civil front (action by affected individuals).

#### Front one: PDPC financial penalties

A contravention of the Protection Obligation or the breach-notification duty can attract enforcement, including a direction to remedy and a financial penalty. The PDPA's financial-penalty regime was amended, and the maximum-penalty structure changed when section 24 of the Personal Data Protection (Amendment) Act 2020 came into force. ([PDPA 2012, section 48J Financial penalties, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P22-).) The ceiling is 10% of the organisation's annual turnover in Singapore where that turnover exceeds S$10 million, and S$1 million in any other case, for contraventions on or after 1 October 2022; the dated explainer on the [PDPA financial-penalty regime](/regulatory-change/pdpa-2022-penalty) sets out who the higher cap reaches. ([PDPA 2012, section 48J(3), Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48J-).) 

What matters for planning is the shape of the exposure: the penalty scales with the size of the organisation and the seriousness of the contravention, and intentional or negligent failure to protect is exactly the kind of conduct the regime targets. A biometric database is a high-value, high-harm target, and "the type and nature of the personal data affected" is one of the matters the Commission must weigh when it sets the penalty. ([PDPA 2012, section 48J(6)(b), Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48J-).)

#### Front two: civil action under section 48O

Alongside regulatory enforcement, the PDPA gives individuals a private right of action: a person who suffers loss or damage directly as a result of a contravention of Parts 4, 5, 6 or 6A has a right of action in civil proceedings, the court can grant an injunction, a declaration or damages, and where the Commission has made a decision on the contravention the action waits until that decision is final with no further appeal. ([PDPA 2012, section 48O, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48O-).) For a single breached database affecting a whole workforce or customer base, the civil exposure is not one claim. It is as many claims as there are individuals, each carrying their own claim for the harm flowing from an identifier they can never change.

The regulator is one front; the affected people are the other. They prepare for the regulator and forget the affected people. A face-template leak across a 200-person workforce is a regulatory matter and a relationship with 200 individuals, each of whom has a statutory right of action for any loss or damage the leak directly causes them and an irreversible grievance.

## How cyber and privacy insurance responds

Insurance does not cure a biometric breach. It funds the response and, where the policy is structured for it, the liability. Three product strands are relevant: the privacy-liability and breach-response cover inside a cyber policy, the regulatory-defence sublimit, and the careful question of whether a regulatory penalty is even insurable.

#### Privacy liability and breach-response cover

A cyber policy bundles breach-response services (forensics, legal advice on notification, credit or identity monitoring, public-relations support) with third-party privacy liability (defence and damages for claims by affected individuals). For a biometric breach, the breach-response cover is what funds the section 26D assessment and notification machinery under deadline pressure, and the privacy-liability cover is what responds to civil claims brought under section 48O. The structure, triggers, and common gaps of SME cyber cover are the subject of the [Singapore cyber-fraud and social-engineering analysis](/emerging-risk/ai/deepfake-funds-transfer-fraud-singapore-sme), which sets out how sublimits and conditions operate in the published wordings.

The exposures to map against the policy are specific to biometrics:

- **Does the privacy-liability section cover statutory causes of action**, including the PDPA [section 48O](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48O-) private right, or only common-law claims?
- **Is there a regulatory-investigation sublimit**, and does it fund a PDPC investigation and any subsequent representations, not just litigation?
- **How does the policy treat data held by your scanner vendor**? If the template database lives in a vendor cloud, is that within the policy's definition of your computer system or data?
- **What is the retroactive date**? A biometric system installed years ago can have been leaking since installation; a tight retroactive date excludes a breach that began before the policy incepted.

#### The penalty-insurability question

Whether a financial penalty imposed by a regulator can lawfully be indemnified by insurance is a question of public policy, not just policy wording. Published cyber wordings grant fines-and-penalties cover only for fines "insurable by law" or "lawfully insurable", which pushes the question onto the law of the relevant jurisdiction. Treat the response and defence cost as the part of the cover that pays regardless of the insurability question, and the penalty indemnity as conditional. Treat any penalty indemnity as conditional, confirm the position in writing with the adviser, and do not let the existence of a fines extension lull you into under-investing in the [section 24](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16-) controls that prevent the breach in the first place.

## Common Mistakes

1. **Treating a biometric template as just another field in the HR system.** It is the most identifying, least revocable data you hold. The PDPA's "reasonable security arrangements" test uses the same words for every dataset, and the PDPC's biometric guide spells out what it expects for templates: encryption, linkage only to unique identifiers or hashes, and segregated storage. ([PDPA 2012, Singapore Statutes Online](https://sso.agc.gov.sg/Act/PDPA2012).)
2. **Assuming the device vendor's security is your compliance.** If the data is under your control for your purposes, the [section 24](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16-) obligation is yours. A cloud-connected scanner sending templates offsite is your exposure to manage, not the vendor's to absorb.
3. **Collecting biometrics because the device offered the feature.** Over-collection runs against the PDPC's instruction to minimise the biometric data stored. If a PIN or card achieves the purpose, deploying a face scan instead is hard to defend as proportionate.
4. **Relying on consent when the employment exception is the basis.** The PDPC's guide says employers "may rely on the employment exception" for biometric staff access control where the collection is reasonable for managing the employment relationship; where you rely on consent instead, [section 14](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P12-)(2)(a) bars requiring consent beyond what is reasonable for the service, and a non-biometric fallback keeps you inside that line.
5. **Starting the 3-day clock late.** [Section 26D](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) runs from the day you assess the breach as notifiable. A vague or undocumented assessment does not extend the window; it just makes a late notification harder to explain.
6. **Preparing for the regulator and forgetting the people.** The [section 48O](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48O-) private right means a single breached database can generate many individual civil claims, each tied to an identifier the person can never reset.
7. **Assuming "fines covered" means the penalty is funded.** Published wordings condition penalty cover on the fine being insurable by law. The dependable part of the policy is response and defence cost.

## What This Means for Your Business

If you run any biometric system (door access, time-attendance, facial-recognition CCTV, voice login), treat it as a regulated data asset, not a hardware purchase.

**Step 1: Inventory and justify.** List every biometric system, what it captures, why, where the data is stored, who can access it, and how long it is kept. For each, answer the proportionality question: does the purpose require a biometric, or would a card or PIN do? Retire the ones that fail.

**Step 2: Map the data flow to the vendor.** Confirm in writing whether templates leave your premises, whether they are stored as one-way templates or raw images, where the cloud sits, and what the vendor's own security and breach-notification commitments are. A vendor breach affecting your data is still your [section 26D](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) problem.

**Step 3: Harden against [section 24](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16-).** One-way templating, encryption at rest and in transit, strict access control, segregation from general IT, logging. Document the arrangements, because "reasonable" is judged in hindsight and a documented design is your evidence.

**Step 4: Fix consent and fallback.** Provide a non-biometric alternative. Notify staff and customers in writing of what is collected, why, the retention period, and how to raise a concern. Keep the notice.

**Step 5: Write the breach playbook now.** Define who assesses a breach, how the [section 26C](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) assessment is documented and dated, since the section 26D 3-day notification clock starts the day that assessment concludes, and who notifies the PDPC and affected individuals. The clock is short; the time to design the process is before the incident.

**Step 6: Audit the insurance against the biometric scenario.** Confirm the cyber policy covers statutory privacy claims ([section 48O](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48O-)), funds a PDPC investigation, treats vendor-held templates as covered data, and carries a retroactive date that reaches back far enough. Establish the penalty-insurability position in writing.

## Questions to Ask Your Adviser

1. Does my cyber policy's privacy-liability section respond to a **statutory claim under PDPA [section 48O](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=pr48O-)**, or only to common-law privacy claims?
2. Is there a dedicated **regulatory-investigation and defence sublimit**, and does it fund a PDPC investigation and representations, not just litigation?
3. How does the policy define "my data" and "my computer system" when the **biometric templates are held in a vendor's cloud**? Is that data covered?
4. Is **regulatory penalty cover** included, and is it conditioned on "where insurable by law"? What is the realistic expectation for Singapore?
5. What is the **retroactive date**, and does it reach back before my oldest biometric system was installed?
6. Does **breach-response cover** fund the [section 26C](https://sso.agc.gov.sg/Act/PDPA2012?ProvIds=P16A-) assessment and the section 26D notification process, including individual notifications to a whole workforce, under the 3-day deadline?
7. Are losses arising from a **vendor's** breach of my biometric data within cover, or excluded as a third-party-system event?
8. If a single biometric database breach generates **many individual civil claims**, how does the policy aggregate them: one claim, one retention, or many?



### Related Information

- [PDPA Section 24 Protection Obligation: What "Reasonable Security Arrangements" Actually Means](/document-legal/pdpa-section-24-protection-obligation)
- [PDPA Section 26D Mandatory Data Breach Notification: The 3-Day Clock Explained](/document-legal/pdpa-section-26d-breach-notification)
- [PDPA Amendment: 10% Turnover Penalty for Data Breaches](/regulatory-change/pdpa-2022-penalty)
- [Deepfake Funds-Transfer Fraud: Cyber, Crime, and Social Engineering Insurance for Singapore SMEs](/emerging-risk/ai/deepfake-funds-transfer-fraud-singapore-sme)

*Published 31 May 2026. Source verified 12 September 2026.*

---
