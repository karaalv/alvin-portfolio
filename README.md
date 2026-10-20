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
recording settings. Automatic exception capture is disabled for
now. Returning visitors are identified from their token's user
ID; a missing cookie resets the previous association. Successful
cookie claiming identifies newly created visitors.

HTTP service calls carry the current browser replay ID in
`X-POSTHOG-SESSION-ID`. WebSocket handshakes carry it as the
`session_id` query parameter, since browser WebSockets cannot
supply custom headers. These values provide replay context;
they do not authenticate the visitor.

## 👨🏾‍⚖️ License

This project is licensed under the [Apache License 2.0](./LICENSE).  
See the [NOTICE](./NOTICE) file for attribution and additional details.
