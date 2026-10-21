# Exception capture

## Browser failures

`captureApplicationException(title, message, exception, context)`:

1. Normalises the source value to an `Error`, preserving native errors.
2. Writes unexpected failures to the browser console and structured logs.
3. Calls `posthog.captureException` when configured.
4. Returns an `ApplicationError` containing the UI title and message.

Contexts use the returned object inside `setError`. The chat error banner
reads that shared state. Capture points include session loading, history
retrieval/deletion, cookie claiming, socket transport and response parsing.
The SDK separately captures unhandled browser failures automatically.

## Frontend server failures

`captureApplicationServerException(exception, context)` reports the
original error using a reused `posthog-node` client. It attempts to attach
the visitor identity, adds operation/request/replay context and awaits
`flush()` before returning. SDK exception autocapture is disabled on this
client; the action wrapper is the deliberate capture boundary.

The reporter returns a boolean indicating its reporting path completed.
It does not guarantee that the event appears in the dashboard.
Reporting failures must not replace the original application failure.

## Expected failures

`AgentHttpError` values with HTTP status 400–499 are treated as expected
backend rejections by the capture helpers. They still produce UI feedback,
but are excluded from explicit exception capture and error logs.
Expected socket warnings and local validation states use plain UI errors.
Backend socket `ERROR` messages are reported as browser impact with their
request ID; the backend is responsible for its original exception.

## Correlation and safe transport

Shared properties include `source`, `operation`, `request_id`,
`http_status`, `runtime` and optional `$session_id`. Additional primitive
fields may describe an endpoint, page offset, message type or close code.
`AgentHttpError` correlation fields take precedence over fallback context.

Server Actions return safe failure records rather than serialising Error
objects. `unwrapServerAction` reconstructs `AgentHttpError` in the browser,
retaining the request ID, HTTP status, original error name and
`serverReported` flag. Server stacks remain server-side. The browser
capture then describes the UI failure using the same `request_id`.
See [backend integration](../architecture/server-actions.md).

Do not add request bodies, authentication cookies/tokens, raw socket URLs
or full response payloads as metadata. Native exceptions and stack traces
still require care because upstream libraries can include their own text.

## Duplicate protection

Exception and console helpers use `WeakSet<Error>` to avoid reporting the
same error object repeatedly in one runtime. Weak references do not keep
errors alive; garbage collection removes entries when those objects are
no longer otherwise referenced. Separate Error objects, including a server
error and its browser reconstruction, are separate reports by design.
