# Setup and commands

## Local development

Install dependencies and start the frontend:

```sh
npm ci
npm run dev
```

The development server binds to `127.0.0.1`, normally on port `3000`.
Run the agent service separately when testing live chat or history.
The backend must allow the frontend origin and use compatible cookie
settings.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `PORTFOLIO_AGENT_DOMAIN` | Server-side agent host or origin, without an API path. |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Public PostHog project token used by browser and server reporting. |
| `NEXT_PUBLIC_POSTHOG_HOST` | PostHog ingestion host. |

Example local agent origin:

```dotenv
PORTFOLIO_AGENT_DOMAIN=http://127.0.0.1:3001
```

A domain without a protocol defaults to HTTPS. Do not include credentials,
query parameters or `/api`. Both HTTP and WebSocket destinations are
constructed from this origin.

Environment files are ignored by Git. Next.js loads the environment for
its execution mode, including `.env.development` during development and
`.env.production` for production builds. `.env.staging` is not loaded
automatically; inject staging values through the deployment environment.
Do not use `NODE_ENV=staging` as a substitute.

Public PostHog values are included in the browser build, so supply them
before building. Choose the correct project for each deployment to keep
non-production traffic separate. With either PostHog value absent, the
explicit capture helpers skip remote reporting; console output remains.

## Search indexing by deployment

The metadata policy uses `NODE_ENV` and Vercel system variables to keep
development, previews and `developing` deployments out of search.
Production uses `https://alvinkaranja.dev` as its canonical origin.
See [metadata and search discovery](../architecture/metadata.md) for the
conditions, generated sitemap/robots and preview-image hand-off.

## Verification commands

```sh
npm run lint
npx tsc --noEmit
npm run build
```

Other available commands:

| Command | Purpose |
| --- | --- |
| `npm start` | Serve an existing production build. |
| `npm run lint:fix` | Apply supported ESLint fixes. |
| `npm run format:check` | Check source formatting. |
| `npm run format` | Format matching source files. |

There is currently no committed frontend test runner or `npm test`
script. Validate changed interactions against the development server.
For telemetry changes, inspect the appropriate PostHog project as well
as local output; successful SDK calls do not prove ingestion.
