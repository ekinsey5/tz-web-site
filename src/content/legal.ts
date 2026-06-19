/**
 * Tether-Zero — legal / compliance content
 * ========================================
 * Single source of truth for the Privacy Policy, Terms of Service and the
 * SMS (A2P) opt-in disclosure. Kept separate from marketing copy (site.ts)
 * because these documents are compliance-critical: the bolded phrases in the
 * Mobile Messaging Compliance section are matched verbatim by mobile carriers
 * during Toll-Free / A2P 10DLC campaign vetting. Do not reword them.
 *
 * The same Mobile Messaging Compliance, Third-Party Integrations and California
 * Privacy Rights blocks are mirrored into the product app at
 * tether-web/src/content/legal/privacy-policy.en.md — keep the two in sync.
 *
 * Legal entity: SpringThought, LLC (operates the "Tether-Zero" product).
 * Values still pending product-owner confirmation are written as labeled
 * [PLACEHOLDER] tokens and surfaced in PLACEHOLDERS (src/content/site.ts).
 */

/** Local routes for the legal documents (used by footer + disclosure links). */
export const LEGAL_ROUTES = {
  privacy: "/privacy-policy",
  terms: "/terms-of-service",
} as const;

/** Last-updated / effective date stamp shown atop each legal document. */
export const LEGAL_LAST_UPDATED = "June 19, 2026";

/**
 * On-site SMS opt-in disclosure (A2P requirement).
 * Carriers require this exact disclosure wherever a phone number is collected.
 * NOTE: this site does not itself collect phone numbers — numbers are collected
 * in the product app's SMS two-factor enrollment flow, where an unchecked,
 * default-off consent checkbox alongside this text is the carrier-preferred
 * pattern. Here the disclosure is shown as informational copy.
 */
export const SMS_DISCLOSURE = {
  before:
    "By providing your phone number, you agree to receive transactional text messages from Tether-Zero for account alerts and notifications. Message frequency varies. Message and data rates may apply. Reply STOP to opt-out or HELP for assistance. View our ",
  termsLabel: "Terms of Service",
  between: " and ",
  privacyLabel: "Privacy Policy",
  after: ".",
} as const;

/* ------------------------------------------------------------------ */
/* Privacy Policy (US / CCPA)                                          */
/* ------------------------------------------------------------------ */

export const PRIVACY_POLICY = `# 1. Introduction

Tether-Zero is a personal finance service operated by SpringThought, LLC, doing business as "Tether-Zero" ("SpringThought," "Tether-Zero," "we," "our," or "us"). We are committed to protecting your privacy and helping you understand how we collect, use, and safeguard your personal information.

This Privacy Policy describes our practices regarding the collection, use, and disclosure of information when you use our website, web application, mobile applications, and related services (collectively, the "Service").

By accessing or using the Service, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree with our policies and practices, please do not use our Service.

# 2. Information We Collect

We collect several types of information from and about users of our Service.

## 2.1 Information You Provide Directly

- **Account Information:** Your name, email address, and password when you create an account.
- **Profile Information:** Optional details such as profile picture and preferences.
- **Mobile Phone Number:** If you enable SMS-based security codes or alerts, we collect the mobile phone number you provide and your consent to receive text messages.
- **Financial Connections:** When you link a financial account, the account and transaction information made available through our bank-connection provider (see Third-Party Applications and Integrations).
- **Communications:** Information you provide when you contact support, respond to surveys, or participate in promotions.

## 2.2 Information Collected Automatically

- **Device Information:** Hardware model, operating system and version, unique device identifiers, and mobile network information.
- **Log Information:** IP address, browser type, referring/exit pages, pages viewed, and other usage and browsing behavior.
- **Location Information:** General location derived from your IP address.
- **Usage Information:** How you interact with the Service, including features used and the time, frequency, and duration of activities.

## 2.3 Information from Third Parties

- **Authentication Providers:** If you register or log in using a third-party service (such as Google), we receive information from that service as permitted by your settings.
- **Bank-Connection Provider:** Account and transaction data you authorize us to access through Plaid.
- **Analytics Partners:** Aggregated analytics data that helps us understand how users interact with our Service.

# 3. How We Use Your Information

We use the information we collect to:

- Create and manage your account.
- Provide, maintain, and improve the Service.
- Send transactional text messages and account alerts you have requested.
- Process transactions and send related information.
- Provide customer support and respond to your requests.
- Send technical notices, updates, security alerts, and administrative messages.
- Detect, investigate, and prevent fraudulent or illegal activity.
- Comply with applicable laws, regulations, and legal processes.

# 4. How We Share and Disclose Information

We do not sell your personal information. We may share your information in the following limited circumstances:

- **Service Providers:** With third-party vendors who perform services on our behalf, such as cloud hosting, bank connectivity, analytics, and customer support. They may use your information only to perform those services for us.
- **Business Transfers:** In connection with a merger, acquisition, or sale of assets, your information may be transferred as part of that transaction.
- **Legal Requirements:** When required by law or in response to valid legal requests.
- **With Your Consent:** When you give us explicit consent to share.

# 5. Mobile Messaging Compliance

Tether-Zero operates a mobile messaging program to send transactional text alerts to registered users.

- **Opt-In Consent:** Mobile phone numbers collected for SMS consent will not be shared with third parties or affiliates for marketing or promotional purposes. Your consent is specific to Tether-Zero and will not be sold, rented, or shared.
- **Information Sharing:** No mobile information will be shared with third parties/affiliates for marketing/promotional purposes. All the above categories exclude text messaging originator opt-in data and consent; this information will not be shared with any third parties.
- **Opt-Out:** You can cancel the SMS service at any time. Just text "STOP" to our toll-free number [SMS_TOLL_FREE_NUMBER]. After you send the SMS message "STOP" to us, we will send you an SMS message to confirm that you have been unsubscribed.

For help, reply HELP or contact us at [SMS_HELP_CONTACT]. Message frequency varies. Message and data rates may apply.

# 6. Third-Party Applications and Integrations

To provide certain features, Tether-Zero integrates with trusted third-party service providers. These providers receive only the information necessary to perform their services and are obligated to protect it.

## 6.1 Plaid

We use Plaid Inc. ("Plaid") to connect your financial accounts and securely access account and transaction information from your financial institutions. When you link an account, you provide your credentials directly to Plaid; Tether-Zero does not receive or store your online banking login credentials. Plaid's collection and use of your information is governed by the Plaid End User Privacy Policy, available at https://plaid.com/legal/. By connecting an account, you authorize us and Plaid to access and use this information in accordance with this Privacy Policy and Plaid's policy.

## 6.2 Unsplash

We use Unsplash to provide optional images, such as cover photos for savings goals. When images are served from Unsplash, your browser may send standard technical information (such as your IP address and device or browser type) to Unsplash. Unsplash's handling of this information is governed by the Unsplash Privacy Policy, available at https://unsplash.com/privacy.

# 7. Data Retention

We retain your personal information for as long as necessary to fulfill the purposes for which it was collected, including to provide the Service and to satisfy legal, accounting, or reporting requirements.

When your personal information is no longer necessary for these purposes, we will securely delete or anonymize it. You may request deletion of your account and associated data at any time as described in this Policy.

# 8. Data Security

We implement appropriate technical and organizational measures designed to protect your personal information, including:

- **Encryption:** Industry-standard encryption (TLS/SSL) to protect data in transit.
- **Access Controls:** Access to personal information is limited to personnel who need it to perform their roles.
- **Infrastructure Security:** Systems are hosted on secure cloud infrastructure with regular security reviews.

No method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal information, we cannot guarantee its absolute security.

# 9. Your California Privacy Rights

If you are a California resident, the California Consumer Privacy Act, as amended by the California Privacy Rights Act ("CCPA"), provides you with specific rights regarding your personal information:

- **Right to Know:** You may request that we disclose the categories and specific pieces of personal information we have collected, the sources of that information, the purposes for collecting it, and the categories of third parties with whom we share it.
- **Right to Delete:** You may request that we delete personal information we have collected from you, subject to certain exceptions.
- **Right to Correct:** You may request that we correct inaccurate personal information we maintain about you.
- **Right to Opt Out of Sale or Sharing:** We do not sell your personal information, and we do not share it for cross-context behavioral advertising.
- **Right to Non-Discrimination:** We will not discriminate against you for exercising any of your CCPA rights.

We do not sell or share the personal information of consumers, including the mobile phone numbers and SMS opt-in data of our users. To exercise any of these rights, contact us at privacy@tether-zero.com. We will verify your request before fulfilling it and may ask you to provide information to confirm your identity. You may also designate an authorized agent to make a request on your behalf.

# 10. Children's Privacy

Our Service is not directed to individuals under the age of 13, and we do not knowingly collect personal information from children under 13. If you believe a child has provided us with personal information without parental consent, please contact us at privacy@tether-zero.com.

# 11. Changes to This Policy

We may update this Privacy Policy from time to time to reflect changes in our practices or for other operational, legal, or regulatory reasons. When we make material changes, we will update the "Last Updated" date above and, where appropriate, notify you by email or through a notice on our Service.

# 12. Contact Us

If you have questions, concerns, or requests regarding this Privacy Policy or our privacy practices, please contact us:

**SpringThought, LLC (Tether-Zero)**

**Email:** privacy@tether-zero.com

**Address:** [REGISTERED_ADDRESS]
`;

/* ------------------------------------------------------------------ */
/* Terms of Service (mirrored from the product app, entity corrected)  */
/* ------------------------------------------------------------------ */

export const TERMS_OF_SERVICE = `# 1. Agreement to Terms

By accessing or using Tether-Zero (the "Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access or use the Service.

These Terms constitute a legally binding agreement between you ("User," "you," or "your") and SpringThought, LLC, doing business as "Tether-Zero" ("Tether-Zero," "we," "us," or "our"), governing your access to and use of the Service.

**By creating an account or using the Service, you represent and warrant that:**

- You are at least 18 years of age, or the age of legal majority in your jurisdiction
- You have the legal capacity to enter into these Terms
- You are not prohibited from using the Service under applicable laws
- All registration information you submit is truthful and accurate
- You will maintain the accuracy of such information

# 2. Description of Service

Tether-Zero provides a personal finance application that helps users budget, track transactions, pay down debt, and work toward savings goals. The Service includes, but is not limited to:

- User account creation and management
- Budgeting, transaction, and debt-payoff tools
- Collaboration and sharing features within a household
- Access to web and mobile applications
- Integration capabilities with third-party services

## 2.1 Service Availability

We strive to maintain high availability of the Service but do not guarantee uninterrupted access. The Service may be temporarily unavailable due to scheduled maintenance, emergency repairs, or factors outside our reasonable control.

## 2.2 Service Modifications

We reserve the right to modify, suspend, or discontinue any part of the Service at any time, with or without notice. We will not be liable to you or any third party for any modification, suspension, or discontinuation of the Service.

# 3. User Accounts

To access certain features of the Service, you must create an account.

## 3.1 Account Registration

When creating an account, you agree to provide accurate, current, and complete information; maintain and promptly update it; safeguard your login credentials; accept responsibility for activity under your account; and notify us immediately of any unauthorized use.

## 3.2 Account Security

You are responsible for safeguarding your account credentials. We recommend you create a strong, unique password, do not share your credentials, and enable two-factor authentication where available. We will never ask you for your password via email, phone, or any other channel.

# 4. Acceptable Use Policy

You agree to use the Service only for lawful purposes and in accordance with these Terms.

## 4.1 Prohibited Activities

You shall not violate any applicable law; infringe the rights of others; transmit defamatory, obscene, or abusive material; impersonate any person or entity; interfere with or disrupt the Service; attempt to gain unauthorized access to any systems; use automated means to access the Service; introduce malicious code; harvest others' personal information; or send unsolicited commercial communications (spam).

# 5. Intellectual Property Rights

The Service and its original content, features, and functionality are and will remain the exclusive property of SpringThought, LLC and its licensors, and are protected by copyright, trademark, and other laws. Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use the Service for your personal use. You may not modify, reverse engineer, resell, or use the Service to build a competing product.

# 6. User Content

"User Content" means any data, text, files, or other materials that you upload, submit, store, or send through the Service. You retain ownership of your User Content. By uploading it, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, process, display, and transmit your User Content solely as necessary to provide the Service to you. You are responsible for maintaining your own copies of your User Content.

# 7. Third-Party Links and Services

The Service may contain links to, or integrate with, third-party websites or services that we do not own or control, including Plaid and Unsplash. We assume no responsibility for the content, privacy policies, or practices of any third-party services. Your use of those services is governed by their terms and policies.

# 8. Payment Terms

Certain features of the Service may require payment of fees as described on our pricing page. All fees are stated in U.S. dollars unless otherwise specified and are non-refundable except as expressly stated. Subscriptions automatically renew at the end of each billing period; you may cancel at any time through your account settings, with cancellation taking effect at the end of the current billing period. Fees do not include taxes, for which you are responsible.

# 9. Disclaimers and Warranties

**THE SERVICE IS PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.**

The Service does not provide professional advice (legal, financial, medical, or otherwise). Any information provided through the Service is for general informational purposes only and should not be relied upon as professional advice.

# 10. Limitation of Liability

**TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL SPRINGTHOUGHT, LLC, ITS DIRECTORS, EMPLOYEES, PARTNERS, AGENTS, SUPPLIERS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES**, including loss of profits, data, use, or goodwill. Our total liability for any claims arising out of or relating to these Terms or the Service shall not exceed the greater of the amounts you paid to us in the twelve (12) months preceding the claim or one hundred U.S. dollars ($100).

# 11. Indemnification

You agree to defend, indemnify, and hold harmless SpringThought, LLC and its affiliates and their respective directors, officers, employees, and agents from and against any claims, damages, losses, liabilities, costs, and expenses (including attorneys' fees) arising from your use of the Service, your violation of these Terms, your violation of any third-party right, or your User Content. This obligation survives termination of these Terms.

# 12. Termination

You may terminate your account at any time through your account settings or by contacting us at support@tether-zero.com. We may suspend or terminate your account immediately, without prior notice, for any breach of these Terms, violation of law, or fraudulent activity. Upon termination, all rights and licenses granted to you will end and you must cease all use of the Service.

# 13. Governing Law and Dispute Resolution

These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.

**PLEASE READ THIS SECTION CAREFULLY. IT AFFECTS YOUR LEGAL RIGHTS.** Before filing a claim, you agree to try to resolve the dispute informally by contacting us at legal@tether-zero.com. If a dispute is not resolved within 30 days, you or SpringThought, LLC may bring a formal proceeding.

# 14. Changes to Terms

We reserve the right to modify these Terms at any time. When we make material changes, we will update the "Last Updated" date above and notify you by email or through a prominent notice on the Service. Your continued use of the Service after the changes take effect constitutes your acceptance of the new Terms.

# 15. General Provisions

**Entire Agreement:** These Terms, together with our [Privacy Policy](/privacy-policy), constitute the entire agreement between you and SpringThought, LLC regarding the Service.

**Severability:** If any provision is held invalid, the remaining provisions continue in full force and effect.

**Waiver:** Our failure to enforce any right or provision shall not constitute a waiver.

**Assignment:** You may not assign these Terms without our prior written consent. We may assign these Terms without restriction.

# 16. Contact Information

If you have any questions about these Terms, please contact us:

**SpringThought, LLC (Tether-Zero)**

**Email:** legal@tether-zero.com

**Address:** [REGISTERED_ADDRESS]

For general support inquiries, please contact support@tether-zero.com.
`;
