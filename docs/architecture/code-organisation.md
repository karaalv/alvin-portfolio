# Code organisation

## Folder responsibilities

| Folder | Responsibility |
| --- | --- |
| `app/` | App Router pages, layouts and route composition. |
| `components/` | UI components, grouped by feature or shared use. |
| `contexts/` | Shared React state and interaction orchestration. |
| `lib/` | Focused parsing, packaging, formatting and integration helpers. |
| `services/agent/` | Server-side HTTP transport and endpoint operations for the agent API. |
| `server/` | Frontend server concerns, including cookies, configuration and action wrapping. |
| `types/` | TypeScript interfaces, unions and shared contracts. |
| `styles/` | Global variables, typography and component/layout CSS Modules. |
| `public/assets/` | Images, icons and video assets. |
| `docs/` | Frontend implementation documentation. |

## Routes and layouts

The root layout installs the application and chat providers.
The `(site)` route group supplies the shared navbar and contact section
for the home and privacy pages. The not-found page uses the shared site
layout directly. `/links` has its own layout. `/chat` has a dedicated
layout that owns the socket provider.

Profile redirects live in `next.config.mjs`, not duplicate page components.
See [attribution](../observability/attribution.md).

## Components and helpers

Keep visual composition in components and shared interaction state in
contexts. Put processing logic in a named helper module rather than a
large generic utilities file. Examples:

- `lib/chat/sanitisation.ts`: clean outgoing message text.
- `lib/chat/deltas.ts`: buffer streamed chunks and update visible memories.
- `lib/websocket/parsing.ts`: validate incoming socket envelopes.
- `lib/websocket/requests.ts`: package requests and generate request IDs.
- `lib/http/actions.ts`: unwrap serialised Server Action results.
- `lib/posthog/`: analytics configuration, events, exceptions and logs.
- `lib/logging/console.ts`: console output shared by both runtimes.

Not every helper in `lib/` is pure or safe in both runtimes. Browser
PostHog modules use `posthog-js`; server SDK modules explicitly import
`server-only`. Follow those boundaries when sharing code.

`TrackedLink` is a small client component used by otherwise static
components. It preserves link behaviour and adds explicit analytics
without converting entire pages into client components.

## Types and styles

Context contracts live in `types/contexts/`; API envelopes in `types/api/`;
agent service contracts in `types/services/agent/`; component props in
`types/components/`; telemetry contracts in `types/posthog/`.

TypeScript types do not validate external data. The HTTP and WebSocket
parsers perform runtime validation before data enters chat state.

CSS Modules follow the component structure. Shared tokens and typography
live in `styles/shared/`; layout styles live in `styles/layouts/`.
New CSS Module filenames use kebab case. Global CSS supplies variables
and shared browser-level rules rather than component-specific styling.
