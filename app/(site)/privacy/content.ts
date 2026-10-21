/** Current v3 privacy copy from the documentation policy. */
export const PRIVACY_POLICY_SECTIONS = [
    {
        heading: '1. Who is responsible',
        content: `I am Alvin Karanja, the operator and data controller for
[alvinkaranja.dev](https://alvinkaranja.dev) and its portfolio chat
service. I am based in Kenya. For privacy questions or requests, email
[alvinnjiiri@gmail.com](mailto:alvinnjiiri@gmail.com).

This policy covers the portfolio, links page, AI chat, browser analytics,
session replay and enquiries. No account or real name is required to
browse or use chat. Browsing without chat still generates technical and
analytics information.`,
    },
    {
        heading: '2. Information collected and why',
        content: `**Technical information.** IP address, browser and device information,
page URLs, referrers, timestamps and request information support website
delivery, usage measurement, fault diagnosis and abuse prevention.
Hosting providers also process connection information.

**Browser activity and attribution.** Page views and departures, link and
button interactions, scroll activity, traffic-source tags and selected
product events show how visitors use the site and which destinations
they choose. Heatmaps summarise interactions. The website records chat
submission and deletion events, including request IDs, message lengths,
prompt labels where applicable and loaded-message counts.

**Session and visitor identifiers.** Analytics cookies and browser storage
associate visits, events and recordings. A randomly generated chat user
ID, authentication cookie and activity timestamps associate a
conversation with its visitor. When chat identity is available, PostHog
analytics and recordings can be associated with that same user ID.

**Conversation data.** Messages, replies, relevant history and supporting
model/tool artefacts support portfolio questions, contextual retrieval
and continued conversations.

**Diagnostic and security information.** Errors, exception messages and
stacks, operational logs, request/connection/trace identifiers, timings,
model usage and usage/block records support reliability, cost monitoring
and abuse prevention. These records may be correlated with a visitor,
browser session or conversation.

**Correspondence.** Email address, name if supplied and correspondence
are used to respond to enquiries and privacy requests.

These identifiers are **pseudonymous**, not a guarantee of anonymity.
Messages, IP addresses, visible page content and linked records can still
contain personal information. Do not submit passwords, payment details,
sensitive or confidential information, or unnecessary information about
other people.`,
    },
    {
        heading:
            '3. Conversation processing and AI diagnostics',
        content: `Messages and relevant conversation context are sent to OpenAI to produce
answers and support retrieval. Conversation history and model/tool
continuation artefacts are stored in MongoDB Atlas.

The backend also sends model inputs/history and outputs to PostHog for
AI diagnostics, alongside model, token, cost and timing information.
**This can include the contents of your conversation.** Deleting visible
chat history does not automatically delete these separate provider-held
diagnostic records.

Session replay reconstructs activity within this website, including page
content, navigation, scrolling and interactions. Visible chat messages
and replies may appear in recordings. Input masking depends on SDK and
project settings; it is not a guarantee that conversation content is
excluded once displayed or sent through the separate AI-diagnostic path.
See [PostHog’s replay privacy controls](https://posthog.com/docs/session-replay/privacy)
for the distinction between input and page-text masking.

Explicit product-event properties and ordinary application log fields do
not deliberately include message bodies or authentication tokens.
Automatic collection, visible page content and exception details are
separate paths and may contain additional information.

I may inspect conversations, recordings and diagnostics to understand
usage, investigate faults or abuse, and respond to requests. Access is
limited to authorised people and service providers. Conversations are
not published as portfolio content.

OpenAI states that API data is not used for model training by default
unless the customer opts into sharing. Its storage and abuse-monitoring
rules are separate from this website's database retention. See
[OpenAI's API data controls](https://developers.openai.com/api/docs/guides/your-data).`,
    },
    {
        heading:
            '4. Cookies, browser storage and your choices',
        content: `Chat uses an essential \`JWT\` authentication cookie lasting up to six days
from token issuance. It allows the service to recognise the visitor's
conversation. Blocking or clearing it can prevent access to earlier
chat history; cookie expiry does not itself delete server records.

PostHog uses first-party analytics identifiers and browser storage to
measure visits and interactions, associate sessions and provide replay,
heatmaps and error diagnostics. The site also stores a normalised traffic
source in tab-scoped session storage so attribution survives internal
navigation. Source-aware profile URLs add UTM tags identifying the
platform whose link was used.

Analytics starts when the configured browser SDK loads; recording is
subject to the project's capture settings. The current interface has no
cookie-consent banner or in-site analytics preference control. Browser
storage settings, content blockers or JavaScript restrictions may limit
browser collection and may affect website features. Clearing storage
resets browser-held information but does not remove data already sent to
service providers. Contact me about objections or deletion requests.
Using the website is not presented as consent to optional tracking.

The website does not use Google Tag Manager, Google Analytics or Vercel
Speed Insights. Vercel still processes technical requests to host and
deliver the site.`,
    },
    {
        heading: '5. Processing purposes',
        content: `Information is used to deliver the portfolio and requested chat,
understand traffic and content engagement, improve the user experience,
diagnose failures, prevent abuse, manage operating costs and respond to
enquiries and privacy requests. Records may also be processed where
necessary to meet legal obligations or address a specific dispute.

I do not sell personal information or use chat content for targeted
advertising. Analytics identity represents a website/chat visitor, not a
social-platform login or verified real-world identity.`,
    },
    {
        heading: '6. Service providers and disclosures',
        content: `**Vercel.** Frontend hosting, delivery, technical operations and security.

**Amazon Web Services (AWS).** Backend hosting, delivery, operational
services and infrastructure logs.

**MongoDB Atlas.** Application visitor records, conversation memory and
usage/security records.

**OpenAI.** AI replies, contextual retrieval support and processing of
submitted text and relevant model/tool context.

**PostHog.** Browser product/web analytics, heatmaps, session replay,
visitor/session correlation, browser and server exception capture,
selected browser logs, backend operational logs/traces and AI
observability, including captured model inputs and outputs.

**Google (Gmail).** Correspondence when you contact the listed address.
Google tag management and Google Analytics are not used on the site.

Providers may use sub-processors under their service terms and data
processing agreements. Information may also be disclosed for legal
requirements, protection of rights/security or at your request.
External destinations have their own privacy practices and may receive
connection and referral information when visited.`,
    },
    {
        heading: '7. International processing',
        content: `Providers may process information outside Kenya, including in the United
States, United Kingdom and European Economic Area. The infrastructure
configuration places the AWS backend in London and MongoDB Atlas in
Ireland. PostHog is configured with its US ingestion host. Provider
support and onward processing can occur in other locations.

International processing is subject to applicable data-protection
requirements. Contact me for information about the providers and
transfer arrangements relevant to a request.`,
    },
    {
        heading: '8. How long information is kept',
        content: `**Chat authentication cookie.** Up to six days from token issuance.

**Application visitor records and conversation memory.** Eligible for
deletion after seven days without recorded activity, then removed on
the next successful daily cleanup. Continuing activity extends retention.

**IP/visitor usage records.** Eligible for deletion after ten days without
a recorded request, checked at startup and daily. Resetting daily usage
counters does not delete the record.

**Access-block records.** A minimum 24-hour block, removed by cleanup at
startup and every six hours. A block remains effective until removed.

**In-memory rate-limit records.** Eligible for cleanup after three days
without activity, checked every twelve hours; also lost on process
restart.

**PostHog AI-content properties.** PostHog documents a 30-day window for
designated large AI-event properties, including model inputs and outputs.
Remaining event metadata has a separate retention policy. This does not
remove copies that appear in replay, exports or other products. See
[AI-event retention](https://posthog.com/docs/ai-observability/data-retention).

**Analytics events, session replay, exceptions, logs, traces and provider
backups.** These follow the enabled provider/product retention settings
and applicable service arrangements. They are not covered by the
seven-day chat cleanup. Periods differ between products; contact me for
the retention details relevant to your request. No universal seven-day
deletion period applies to all information collected by this website.

**Correspondence and privacy requests.** Retained while needed to handle
the matter and afterwards only where needed for an applicable legal,
dispute or accountability purpose.

OpenAI applies its own storage and abuse-monitoring rules. The main
chat stream disables response storage, which does not establish zero
data retention across all provider systems or other API operations.
See [API data controls](https://developers.openai.com/api/docs/guides/your-data).

Outages can delay scheduled cleanup. Provider-held copies and backups
follow their separate expiry schedules. Specific records may be kept
longer where necessary for a legal obligation or active dispute.`,
    },
    {
        heading: '9. Your rights and deletion requests',
        content: `Subject to applicable law and its conditions, you may request
information, access, correction, deletion, restriction or portability,
object to processing or withdraw consent where consent is the basis.

Email the address above. Proportionate verification or session
information may be needed to locate pseudonymous records. Without it,
identification may be impossible. Do not email passwords or tokens.

The chat deletion action removes stored conversation memory from the
application database. It does **not** automatically remove the visitor
record, usage/security records, PostHog analytics/replay/AI records,
OpenAI-held information or backups. Broader privacy requests are handled
across the relevant systems, subject to lawful retention exceptions and
provider processes.

You can complain to Kenya's
[Office of the Data Protection Commissioner](https://www.odpc.go.ke/)
or another applicable supervisory authority. The ODPC explains
[data-subject rights](https://www.odpc.go.ke/rights-of-a-data-subject/).`,
    },
    {
        heading:
            '10. Security, children and policy changes',
        content: `Measures include encrypted connections, scoped chat authentication,
restricted service access and abuse controls. No internet service can
guarantee absolute security. Notifications about personal-data breaches
are made where required by applicable law.

Chat is intended for adults, not children under 18. Contact me about
children's personal information so I can investigate and arrange
appropriate deletion.

Chat does not make legal or similarly significant decisions about
visitors. Automated security limits may temporarily restrict access;
contact me to challenge an incorrect restriction.

This policy is the current policy for portfolio version 3. Its revision
date changes when processing or disclosures change. Material changes
are communicated where required.`,
    },
];
