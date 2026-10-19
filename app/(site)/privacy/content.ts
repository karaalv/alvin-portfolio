/** Public privacy-policy copy, adapted from the documentation repo.
 * Tables are flattened into labelled paragraphs. Internal notes are omitted.
 */
export const PRIVACY_POLICY_SECTIONS = [
    {
        heading: '1. Who is responsible',
        content: `I am Alvin Karanja, the operator and data controller for
[alvinkaranja.dev](https://alvinkaranja.dev) and its portfolio chat
service. I am based in Kenya. For privacy questions or requests, email
[alvinnjiiri@gmail.com](mailto:alvinnjiiri@gmail.com).

This policy covers the portfolio, its AI chat and enquiries. You can
browse without using chat or sending me personal information.`,
    },
    {
        heading: '2. Information collected and why',
        content: `**Technical request information, including IP address, browser/device information, requested page and time of access.** Deliver the website, diagnose faults and protect against abuse. Hosting providers also process connection information.

**A randomly generated chat visitor ID, authentication cookie and activity timestamps.** Keep your conversation associated with your browser and prevent other visitors from accessing it.

**Messages you send, generated replies and supporting model/tool records used to continue the conversation.** Answer questions about my work, retrieve relevant portfolio information and maintain chat context.

**Request, connection and trace identifiers, errors, timings, model usage and IP/visitor usage counters or block records.** Investigate failures, control costs, enforce limits and secure the service.

**Your email address, name if supplied, and correspondence.** Respond to enquiries and handle privacy requests.


No account or real name is required for chat. Its identifiers are
**pseudonymous**, not a guarantee of anonymity: messages, IP addresses
and linked records can still be personal data.

Do not submit passwords, payment details, sensitive information,
confidential documents or unnecessary information about other people.`,
    },
    {
        heading: '3. AI processing and human access',
        content: `Messages and conversation context are sent to OpenAI for replies and
retrieval. Supporting records include tool inputs/results and model
continuation artefacts, beyond the visible chat.

The backend also sends model inputs/history and outputs to PostHog for
AI diagnostics, alongside model usage, cost and timing information.
**This can include the contents of your conversation.** Ordinary
operational logs are designed to exclude message bodies and
authentication secrets, but that exclusion does not apply to this
separate AI-content capture.

I may inspect these records to investigate faults, abuse or support
requests. Access is limited to authorised people and providers who need
it. Chat content is not published as portfolio content.

OpenAI states that API data is not used for model training by default,
unless the customer opts into sharing. See
[OpenAI's API data controls](https://developers.openai.com/api/docs/guides/your-data).`,
    },
    {
        heading: '4. Cookies, analytics and your choices',
        content: `The chat uses an essential \`JWT\` authentication cookie, lasting up to
six days. It allows the service to recognise your chat session. Blocking
or clearing it can prevent you from retrieving an earlier conversation.
Clearing browser storage does not delete records already held on servers.

The website does not use Google Tag Manager, Google Analytics or
Vercel Speed Insights. It does not currently run browser product
analytics or session recording. Vercel still hosts the website and
processes technical requests for delivery, operations and security.

PostHog remains part of the backend for diagnostics, tracing and AI
observability, including the conversation-content capture described
above. Removing browser analytics does not remove that processing.

There is no cookie-consent toast or browser analytics preference to
accept. You can manage cookies through your browser settings and use
the portfolio without chat. If optional tracking or recording is added,
this policy will be updated and any required consent obtained before
it starts. Using the website is not consent to optional tracking.`,
    },
    {
        heading: '5. Grounds for processing',
        content: `Under applicable data protection law, processing relies on:

- **Legitimate interests:** delivering the portfolio and requested chat,
  responding to enquiries, maintaining reliability and preventing abuse,
  where these interests are not overridden by your rights.
- **Legal obligations:** responding to valid legal demands and complying
  with applicable record-keeping or data protection duties.

Connection/chat information is needed for those features; other
disclosures are voluntary. AI-content diagnostics require a separate
necessity and lawful-basis assessment.`,
    },
    {
        heading: '6. Service providers and disclosures',
        content: `**Vercel.** Website hosting and delivery, operations and security; technical request information. Speed Insights is not enabled.

**Amazon Web Services (AWS).** Backend infrastructure, delivery, security and operational services; traffic and records handled by those services.

**MongoDB Atlas.** Database hosting for chat visitor records, conversation memory and usage/security records.

**OpenAI.** AI replies and retrieval support; submitted text, relevant context and model/tool inputs.

**PostHog.** Backend errors, operational logs, tracing and AI observability, including captured model inputs and outputs. No browser analytics or recording is currently implemented.

**Google (Gmail).** Email handling when you contact the listed Gmail address; correspondence and sender details. No website tag management or Google Analytics.


Providers may engage sub-processors under their service terms and data
processing agreements. Current lists are available through their legal
or trust pages. Their roles depend on the processing involved.

I do not sell personal information or use chat content for targeted
advertising. Disclosures may also be necessary for legal demands,
protecting rights/security, or at your request. External links lead to
providers with their own policies, which may receive referral and
connection information.`,
    },
    {
        heading: '7. International processing',
        content: `Service providers may process information outside Kenya, including in
the United States, United Kingdom and European Economic Area. The
infrastructure source specifies AWS backend hosting in London and
MongoDB Atlas in Ireland; provider support and onward processing may
occur elsewhere.

Transfers require safeguards recognised by applicable law, including
appropriate contractual protections and assessments, or another
permitted ground. Using the website is not consent to an unprotected
transfer. Contact me for details of applicable safeguards.`,
    },
    {
        heading: '8. How long information is kept',
        content: `**Chat authentication cookie.** Up to six days from token issuance. Cookie expiry does not itself delete server records.

**Application visitor record and conversation memory.** Eligible for deletion after seven days without recorded activity, then removed on the next successful daily cleanup. Continuing activity can extend retention of the conversation.

**IP/visitor usage records.** Eligible for deletion after ten days without a recorded request, checked at startup and daily. Daily counter resets do not delete the record.

**Access-block records.** A minimum 24-hour block, removed by cleanup at startup and every six hours. Blocks remain effective until removed.

**In-memory rate-limit records.** Eligible for cleanup after three days without activity, checked every twelve hours; also lost on process restart.

**Model inputs and outputs in PostHog AI events.** PostHog documents a 30-day window for designated large AI-content properties. Remaining event metadata follows a separate retention policy.

**Other PostHog events, logs/traces; hosting logs and backups.** Retention periods for enabled production services are not yet confirmed. These records are not covered by the seven-day chat cleanup.

**Correspondence and privacy-request records.** Kept while needed to address the enquiry or request, and afterwards only where necessary for a documented legal, dispute or accountability purpose. Reviewed for deletion when that purpose ends.


Outages or maintenance failures can delay scheduled deletion. Backup
copies follow the separately verified expiry schedule and are not used
for ordinary access after deletion. Necessary records may be retained
longer for a specific legal obligation or active dispute.

OpenAI has separate rules. The main chat stream disables response
storage, but other response helpers leave it at the provider default.
OpenAI documents default stored-response retention of at least 30 days
and abuse-monitoring retention normally up to 30 days, with exceptions.
Disabling response storage is not zero data retention. See the
[API data controls](https://developers.openai.com/api/docs/guides/your-data).

PostHog's 30-day AI-content rule does not delete the rest of an event,
copies in another product, or exports. See
[AI-event retention](https://posthog.com/docs/ai-observability/data-retention)
and [event retention](https://posthog.com/docs/data/events-retention).`,
    },
    {
        heading: '9. Your rights and deletion requests',
        content: `Subject to applicable law and its conditions, you may request
information, access, correction, deletion, restriction or portability,
object to processing, or withdraw consent.

Email the address above. I may ask for proportionate verification or
session information to locate pseudonymous records and will respond
within applicable statutory time limits. Without session information,
identification may be impossible. Do not email passwords or tokens.

The chat-memory deletion operation removes the visitor's stored model
memory from the application database. It does **not** automatically
remove their visitor record, usage/security records, PostHog events,
OpenAI-held records or backups. A wider privacy request is handled
across the relevant systems, subject to lawful retention exceptions
and provider processes.

You can complain directly to Kenya's
[Office of the Data Protection Commissioner](https://www.odpc.go.ke/),
or another applicable supervisory authority. The ODPC explains
[data-subject rights](https://www.odpc.go.ke/rights-of-a-data-subject/).`,
    },
    {
        heading: '10. Security, children and changes',
        content: `Measures include encrypted connections, scoped chat authentication,
restricted service access and abuse controls. No internet service can
guarantee absolute security. Where a personal-data breach triggers
notification duties, affected people and authorities will be notified
as required by law.

Chat is intended for adults, not children under 18. Contact me about
children's personal information so I can investigate and arrange
deletion where appropriate.

Chat does not make legal or similarly significant decisions about
visitors. Automated security limits may temporarily restrict access;
contact me to challenge an incorrect restriction.

This policy will be updated when processing changes. The published
version will show its revision date. Material changes will be brought
to your attention where required, and new consent obtained where
necessary.`,
    },
];
