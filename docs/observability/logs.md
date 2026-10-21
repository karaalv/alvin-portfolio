# Application logs

## Console output

`lib/logging/console.ts` contains:

- `logApplicationException`: one console error per Error object, with
  runtime and correlation context.
- `logApplicationEvent`: informational output for explicit product events.

Both work without PostHog. Frontend server exceptions remain visible in
the deployment runtime's console output.

## Structured browser logs

`lib/posthog/logging.ts` sends selected records through `posthog.logger`:

| Record | Severity | `logger_name` |
| --- | --- | --- |
| Chat product event | `info` | `chat` |
| Navigation product event | `info` | `navigation` |
| Caught unexpected browser exception | `error` | Its context `source`, such as `chat-history` or `websocket`. |

The service name is `portfolio-web`, configured in
`lib/posthog/config.ts`. Records include `runtime: 'client'` and the
relevant event/exception properties. Error records add exception type,
message and stack. Chat logs do not include message content.

The browser SDK attaches identity and session correlation. Duplicate
protection applies to repeated reporting of the same exception object.
Failures in the logging path must not undo a completed action or prevent
UI error handling.

## Inspection in PostHog

Open Logs and filter by service `portfolio-web`. Narrow results using:

- `logger_name` for the interaction or failure area;
- severity for informational actions versus errors;
- `request_id` for related HTTP/chat activity;
- `destination`, `source_platform` and `source_section` for navigation.

Logs and product events are separate records. Use product events for
usage trends and funnels, logs for inspecting individual operations, and
Error Tracking for exception issues.

## Server forwarding boundary

`posthog-node` captures frontend server exceptions, but does not forward
arbitrary server console output to PostHog Logs. This repository does not
currently configure a server OpenTelemetry log provider/exporter.
The agent service's own logging pipeline is maintained separately.

The browser code also does not enable broad console forwarding. Selected
structured records are sent explicitly rather than forwarding every
console call from the app and its dependencies. A remote project setting
can independently enable console capture, so inspect that setting when
changing collection policy.
