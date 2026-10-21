# Product events

## Capture path

`captureApplicationEvent` in `lib/posthog/events.ts` accepts the event
names and properties defined in `types/posthog/events.ts`. It writes a
console log, sends a structured PostHog log and captures the product
event. Telemetry failures must not interrupt the underlying interaction.

PostHog supplies timestamps, browser identity and session context.
Explicit event properties do not include message text, cookies, tokens,
email addresses or raw destination/referrer URLs. This restriction
concerns these custom payloads, not the SDK's separate automatic fields.

## Chat events

### `chat_message_sent`

Captured after `socket.send()` returns successfully. This measures browser
submission, not confirmed backend receipt or successful agent completion.
A failed send rolls back the optimistic message and emits no send event.

| Property | Meaning |
| --- | --- |
| `request_id` | ID of the outbound agent-message request. |
| `message_length` | Sanitised message length in Unicode code points. |
| `message_source` | `typed` or `prompt`. |
| `prompt_label` | Selected suggestion label, only for an unchanged prompt. |

Editing a suggestion clears its prompt attribution. Failed sends retain
the draft; successful sends clear both draft and selected prompt.

### `chat_history_deleted`

Captured after the backend confirms deletion and before cached history
is cleared. Failed deletion emits no success event.

| Property | Meaning |
| --- | --- |
| `request_id` | Request ID from the successful backend response. |
| `loaded_message_count` | Number of visible messages cached before deletion. |

The loaded count is not the total number of MongoDB records deleted.

## Navigation events

All explicit navigation events carry:

| Property | Meaning |
| --- | --- |
| `source_platform` | Normalised acquisition source. |
| `source_page` | `/`, `/links`, `/chat`, `/privacy` or `other`. |
| `page_type` | `portfolio`, `links`, `chat`, `privacy` or `other`. |
| `source_section` | Placement, such as `links_list` or `footer_social`. |
| `position` | One-based position within that placement. |

`source_platform` tells where the visitor came from; `source_page` and
`source_section` tell where they activated the link.

### `link_clicked`

Captured by `TrackedLink` for deliberate navigation from the links page,
navbar, footer, project links and chat sidebar. Additional properties:

- `destination`: stable destination label, such as `instagram`, `email`,
  `agent_chat`, `portfolio` or a project identifier.
- `link_category`: `navigation`, `social`, `project` or `contact`.
- `is_external`: whether the destination origin differs from the site.
  Non-web destinations such as email count as external.

Desktop and mobile navbar links share semantic positions. Primary clicks,
keyboard activation and middle clicks are handled. Right clicks and
cancelled clicks are ignored. Analytics do not delay navigation.

### `project_viewed`

Emitted alongside `link_clicked` when a spotlight or gallery project link
is activated. Adds `project` with one of the current project IDs:

- `mwalika`;
- `kenya_ecitizen_services_dataset`;
- `portfolio_agent`;
- `gatsby`;
- `warwick_racing`;
- `getaway`.

This indicates deliberate navigation, not passive visibility or proof
that the external destination loaded.

### `contact_clicked`

Emitted alongside `link_clicked` for the footer email action.
Adds `method: 'email'`. It measures intent, not a sent email.

## Automatic events

The existing `$pageview` event is enriched with `source_platform`,
`source_page` and `page_type` through `before_send`. No second manual
pageview is emitted. Automatic `$pageleave` and interaction events remain
enabled. Autocaptured clicks are distinct from `link_clicked`.

## Adding an event

Extend `ApplicationEventProperties`, then capture at the operation's
meaningful boundary. Use bounded labels and primitive properties rather
than visitor-provided text. State whether the event represents intent,
submission or confirmed success. Update this contract with that meaning.
