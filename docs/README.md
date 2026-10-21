# Frontend documentation

Documentation for the finalised, deployed portfolio **version 3**.
The stable frontend release is `v3`; its backend is Portfolio Agent
`v2`. Portfolio documentation is versioned `v3` with the overall website.
Source code remains the authority for current behaviour; the separate
portfolio documentation repository covers product and shared decisions.

## Development

- [Setup and commands](development/setup.md): environment variables,
  local development and verification.

## Architecture

- [Application state](architecture/contexts.md): context ownership,
  provider lifetime and chat state transitions.
- [Code organisation](architecture/code-organisation.md): responsibilities
  of routes, components, helpers, service functions and types.
- [Backend integration](architecture/server-actions.md): Server Actions,
  HTTP transport, cookie handling and telemetry context.

- [Metadata and search discovery](architecture/metadata.md): approved page
  copy, canonical URLs, sitemap, robots and preview-image hand-off.

## Observability

- [PostHog integration](observability/README.md): SDK setup, identity,
  replay and correlation across browser, frontend server and agent.
- [Events](observability/events.md): capture points and property contracts.
- [Attribution and redirects](observability/attribution.md): acquisition
  source, profile URLs and navigation metadata.
- [Exceptions](observability/exceptions.md): UI errors, exception reporting
  and request correlation.
- [Logs](observability/logs.md): console output, structured browser logs
  and dashboard filters.

## Documentation scope

These files describe the deployed release. Runtime configuration,
provider settings and delivery diagnostics remain operational concerns.
Minor releases and small fixes continue after this stable baseline;
release tags are created from `main`.
