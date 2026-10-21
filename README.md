# Alvin Karanja Portfolio

> **Release status:** Portfolio v3 is finalised and deployed. Stable releases: frontend `v3`, Portfolio Agent `v2` and portfolio documentation `v3`.

Version 3 of the frontend for [alvinkaranja.dev](https://alvinkaranja.dev), built
with Next.js, React, TypeScript and CSS Modules.

This repository contains:

- Responsive portfolio pages covering selected projects and experience.
- A social links page with source-aware profile redirects.
- A streamed chat interface with history, pagination and deletion.
- Server-side HTTP integration with the separate
  [Portfolio Agent](https://github.com/karaalv/portfolio-agent) backend.
- PostHog analytics, session replay, exception capture and browser logs.

See [the documentation](docs/README.md) for setup, application
architecture and integration details. Agent orchestration, retrieval,
data storage and backend infrastructure belong to the agent service.

## Versioning

Documentation follows the overall portfolio version. Subsequent work is
maintained through minor releases or small fixes, rather than another
open-ended redesign. Stable release tags are created from `main`.

## Licence

Licensed under [Apache License 2.0](LICENSE).
See [NOTICE](NOTICE) for attribution and additional details.
