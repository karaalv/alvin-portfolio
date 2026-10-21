# Backend integration and Server Actions

## Runtime boundaries

HTTP calls to the agent backend run on the frontend server. Client
components invoke exported Server Actions in `services/agent/` or
`server/`. These use `httpAgent` for external HTTP transport.

The WebSocket is different: the server constructs its URL, then the
browser connects directly to the agent. Next.js does not proxy the
stream. `SocketProvider` owns that browser connection.

## HTTP request flow

```text
Context or component
  → endpoint Server Action
  → runAgentServerAction(operation, context)
  → httpAgent(endpoint, options)
  → agent backend
  → serialised action result
  → unwrapServerAction(result)
  → state update or captured UI exception
```

The endpoint actions implement history retrieval, memory deletion and
cookie claiming. They validate arguments and endpoint-specific response
data; the shared transport validates the HTTP response envelope.

`httpAgent` resolves `PORTFOLIO_AGENT_DOMAIN`, rejects unsupported endpoint
origins, sends JSON as appropriate and uses uncached requests. It forwards:

- The service's `JWT` cookie, not all frontend cookies.
- The frontend `Origin` required by the agent's origin checks.
- `X-Request-ID` for request correlation.
- `X-POSTHOG-SESSION-ID` when browser replay context is supplied.

Backend `Set-Cookie` headers are parsed and applied to the frontend
response in the Server Action. A server-side fetch does not automatically
place those backend cookies in the visitor's browser.

## Action wrapping and telemetry context

`runAgentServerAction` creates a request ID and passes it to the
operation. The operation supplies it to the outbound HTTP request.
The wrapper also receives primitive context describing the call, such as:

```ts
{
    source: 'chat-history',
    operation: 'fetch-page',
    endpoint: '/api/agent-memory/fetch-chat-page',
    method: 'GET',
    posthogSessionId,
    offset,
}
```

This metadata describes the operation without copying its request body.
On failure, the wrapper preserves the backend's request ID when available,
reports the original server exception and returns safe error details.
The server reporter converts fields into shared PostHog properties,
including `request_id`, `http_status` and `$session_id`.

This wrapper instruments failures. It does not emit a product event or
log for every successful HTTP call. Successful chat actions emit their
explicit events at their browser interaction boundaries.

## Serialised results

Actions return a discriminated union:

```ts
{ ok: true, data: result }
{ ok: false, error: {
    message,
    requestId,
    status,
    serverErrorName,
    serverReported,
} }
```

`unwrapServerAction` returns the successful result or reconstructs an
`AgentHttpError`. The browser catches that error, displays a suitable
message and reports its own failure context with the same request ID.

This preserves custom error fields across production Server Actions,
where Next.js sanitises thrown errors. Original server stacks are not
included in the action result. Unexpected non-HTTP failures receive a
generic browser-facing message.

Endpoint data still needs runtime validation. A generic type annotation
alone does not establish that the backend returned valid data.

## WebSocket preparation

`getPortfolioAgentWsUrl` reads the server-side agent origin and cookie,
sets `/api/agent/ws/agent-chat`, converts HTTP(S) to WS(S), and adds
`access_token`, a handshake `request_id`, and optional `session_id`.
Browser WebSockets cannot add arbitrary HTTP headers.

Subsequent socket requests carry independently generated request IDs.
The browser stores the active agent-message ID for failure correlation;
heartbeats do not replace it. Socket URLs and authentication tokens are
not added to explicit telemetry metadata.
