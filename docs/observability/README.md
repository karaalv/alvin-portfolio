# PostHog integration

## Responsibilities

The frontend reports browser activity, UI failures and failures in its
own Server Actions. The agent service separately reports backend
exceptions, logs and AI traces.

| Signal | Implementation |
| --- | --- |
| Pageviews, page leaves, interactions and heatmaps | Browser `posthog-js` SDK. |
| Session replay | Browser SDK, subject to project recording settings. |
| Product events | Explicit typed browser capture helpers. |
| Browser exceptions | SDK unhandled capture and explicit caught-error helpers. |
| Frontend server exceptions | `posthog-node` at the Server Action boundary. |
| Structured browser logs | `posthog.logger`, service `portfolio-web`. |
| Frontend server console logs | Local/runtime output; no OTLP exporter configured. |

See [events](events.md), [exceptions](exceptions.md) and [logs](logs.md)
for their individual contracts.

## Initialisation

`instrumentation-client.ts` calls `initialisePostHog` before React becomes
interactive. `lib/posthog/config.ts` owns the browser SDK configuration:

- Automatic pageviews on history changes and automatic page leaves.
- Interaction autocapture and heatmaps.
- Session recording enabled, subject to project configuration.
- Unhandled browser exception capture.
- Structured logs under `portfolio-web`.
- Source/page enrichment of the existing `$pageview` event.

Both browser and server reporting use
`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and `NEXT_PUBLIC_POSTHOG_HOST`.
Explicit capture helpers skip remote reporting when either is absent.
See [setup](../development/setup.md) for build-time environment handling.

## Visitor identity

Visitors are anonymous application users, not logged-in accounts.
When an existing JWT is available, `AppProvider` decodes its subject for
`posthog.identify(userId)`. A missing cookie triggers `posthog.reset()`.
For a new visitor, successful cookie claiming triggers identification.
Token decoding here is analytics attribution, not authentication.

After identification, browser events and logs use the SDK's current
identity automatically. Do not manually attach `distinct_id` to each
browser event. Frontend server exception capture supplies identity
explicitly, using the JWT subject when available or a request-scoped
fallback without creating a person profile.

## Cross-service correlation

| Field | Purpose |
| --- | --- |
| `request_id` | Connect a browser action/failure to frontend-server and backend processing. |
| `$session_id` | Associate explicit frontend-server exception reports with browser replay when supplied. |
| `runtime` | Distinguish browser (`client`) from frontend server (`server`) reports. |
| `server_reported` | Indicate that the server exception helper completed its reporting path. |

Browser replay IDs travel to HTTP endpoints through
`X-POSTHOG-SESSION-ID`, and to the agent socket through the `session_id`
query parameter. Neither field authenticates the visitor. Browser logs
receive identity and session context directly from the SDK.

The source platform used in navigation events is acquisition metadata,
not user identity. See [attribution](attribution.md).

## Verification and limits

Local checks cover capture payloads, failure isolation, source attribution
and production compilation. Profile redirects were verified locally as
HTTP 307 responses. This does not establish production ingestion.

After deployment, inspect events, exceptions, logs and replay in the
correct project. Browser blocking, recording settings, network loss and
page closure can prevent delivery; `$pageleave` is best effort.
