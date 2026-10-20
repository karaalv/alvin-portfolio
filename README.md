# Personal Portfolio 👨🏾‍💻

This repository contains the **frontend code** for my personal portfolio website. Here, I showcase my skills, featured projects, and professional history in a clean, modern UI.

One highlight is a custom-built **RAG (Retrieval-Augmented Generation) AI agent** that can:
- Answer questions about my work and experience
- Generate tailored CVs and cover letters
- Provide insights into my projects and skills

Try it out ... 👀

## ⚡️ Features

- Swiss-inspired web design focused on clarity and speed
- Fully responsive for seamless experience on all devices
- Modern glassmorphism effects for visual appeal
- Integrated AI agent for dynamic Q&A and document generation

## 🛠️ Tech Stack

- [Next.js](https://nextjs.org/) & [React](https://react.dev/) – Core framework and UI
- [TypeScript](https://www.typescriptlang.org/) – Static typing
- Modular Vanilla CSS for styling

## 🔗 Backend

The backend and RAG agent service are maintained separately.  
You can find the backend repository [here](https://github.com/karaalv/portfolio-agent).

### Chat integration scaffold

Set the server-side `PORTFOLIO_AGENT_DOMAIN` variable to the agent host or origin, for example `https://api.alvinkaranja.dev` or `http://127.0.0.1:8000`. Do not include `/api` or a socket path. The server constructs `/api/agent/ws/agent-chat`, converts HTTP(S) to WS(S), and adds the incoming `JWT` cookie when present.

`AppProvider` wraps `ChatProvider` at the application root. `SocketProvider` mounts only on `/chat` and closes its connection when that route unmounts. Context types live in `types/contexts/`, pure helpers in `lib/`, and Next.js server functions in `server/`.

The token in AppContext is an initial, in-memory cookie snapshot. The cookie must be scoped to include the frontend host for its server to receive it. Although the cookie remains HttpOnly, returning its value to the client makes that returned copy readable by JavaScript. Cookie presence does not establish token validity; the backend validates it.

History uses the visible `AgentChatMemory` schema. Canonical model artefacts have a separate `AgentMemory` type with an `unknown` payload. WebSocket frames are validated before dispatch, but event handlers, token claiming, history loading and message submission remain TODOs.

## Browser analytics

PostHog starts in `instrumentation-client.ts`. Configure
`NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` and
`NEXT_PUBLIC_POSTHOG_HOST` before building the frontend.
Development and staging env files contain the development project
configuration. Production is left unconfigured until its own
values are supplied. Next.js does not load `.env.staging`
automatically, so staging deployments must inject those values.

The SDK captures page views, navigation, interaction events and
heatmaps, and enables session recording subject to the project's
recording settings. Unhandled browser exceptions are captured
automatically. Returning visitors are identified from their token's user
ID; a missing cookie resets the previous association. Successful
cookie claiming identifies newly created visitors.

HTTP service calls carry the current browser replay ID in
`X-POSTHOG-SESSION-ID`. WebSocket handshakes carry it as the
`session_id` query parameter, since browser WebSockets cannot
supply custom headers. These values provide replay context;
they do not authenticate the visitor.

### Navigation analytics

Explicit link, project and contact events include destination, acquisition
source and click placement. Automatic pageviews carry source and page
classification. See the [frontend analytics contract](../portfolio-documentation/analytics/frontend.md)
for fields, source attribution and tagged profile URLs. Source-aware
redirect routes remain optional and unimplemented.

### Product events and logs

`lib/posthog/events.ts` captures typed events and writes their
properties through `lib/logging/console.ts`. Analytics failures
never interrupt chat. No message text or credentials are added
to these events or their console logs.

- `chat_message_sent`: after the socket accepts the send call,
  with `request_id`, sanitised `message_length` in Unicode code
  points, `message_source` (`typed` or `prompt`), and optional
  `prompt_label`. Editing a suggestion changes its source to
  `typed`. Sending does not confirm backend processing.
- `chat_history_deleted`: after backend success, with its
  `request_id` and `loaded_message_count`, the number of visible
  messages cached before deletion, not MongoDB's deletion count.

Browser errors and chat events are also sent as structured logs
through `lib/posthog/logging.ts`. In PostHog Logs, filter by service
`portfolio-web`; use `logger_name` (`chat` for chat events, `navigation`
for navigation events or the error source), `runtime` and `request_id` to narrow results. Browser
identity and session correlation are attached by the SDK. Broad
console forwarding is not enabled by the code. Server console
logs still require a separate OpenTelemetry exporter to reach
PostHog Logs; server exception capture remains active.

Exception helpers also log unexpected failures to the browser or
server console, including the original exception, runtime and
correlation metadata. Console logging works without PostHog.
Expected HTTP 4xx rejections remain UI feedback only.

### Exception capture

`lib/posthog/error-capture.ts` exposes
`captureApplicationException`, which reports a caught browser
exception and returns the title/message used by the error banner.
Session loading, history, deletion and WebSocket failure handlers
supply their operation and relevant metadata. Expected warnings
and HTTP 4xx rejections still display feedback without being
reported as exceptions.

`lib/posthog/server-error-capture.ts` exposes
`captureApplicationServerException`. It uses `posthog-node` to
capture original server exceptions and flushes before returning.
Both SDKs use the project token and host configured above;
reporting is skipped when either is absent. Telemetry failures
must not prevent application error handling.

Server Actions return a serialisable success/failure envelope.
The browser reconstructs `AgentHttpError` from failures because
Next.js sanitises thrown server errors in production. Server
stacks remain private. Filter PostHog exceptions by `request_id`
to correlate the server cause with the browser failure; `runtime`
distinguishes them and `server_reported` indicates whether server
reporting completed. HTTP calls preserve the backend request ID,
including failures before a valid response envelope arrives.
Browser replay context is forwarded as `$session_id` on server
reports where available. Request bodies, cookies, tokens and
socket URLs are not added as exception metadata.

## 👨🏾‍⚖️ License

This project is licensed under the [Apache License 2.0](./LICENSE).  
See the [NOTICE](./NOTICE) file for attribution and additional details.
