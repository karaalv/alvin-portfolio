# Frontend documentation

Implementation documentation for portfolio **version 3**. The
[root README notice](../README.md) distinguishes implementation from
deployment finalisation. Source code remains the authority for current behaviour; the separate portfolio
documentation repository covers product content and cross-service plans.

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

These files describe implemented behaviour, not proof of production
configuration or delivery to PostHog. Local mocked checks and a successful
build do not establish that a deployed environment is ingesting telemetry.
