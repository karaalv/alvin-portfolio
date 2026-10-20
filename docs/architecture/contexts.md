# Application state

## Provider hierarchy

```text
Root layout
└── AppProvider
    └── ChatProvider
        ├── Site and links pages
        └── Chat layout
            └── SocketProvider
                └── Chat page
```

The root providers persist across client-side navigation. Leaving `/chat`
releases its socket while retaining the chat state held above that route.

## Ownership

| Context | State and operations |
| --- | --- |
| `AppContext` | Application error/banner state, initial access-token snapshot and session-loading readiness. |
| `ChatContext` | Visible messages, draft and selected prompt, history pagination/deletion, thinking captions, response state and delta buffering. |
| `SocketContext` | Socket status, connection lifecycle, request submission and incoming-event dispatch. |

Components call the corresponding context hook. Each hook requires its
provider and throws if used outside that provider. The public contracts
are defined in `types/contexts/`.

## Session loading

`AppProvider` reads the incoming JWT cookie through a Server Action.
It identifies a returning visitor in PostHog using the token's subject,
or resets analytics identity when no cookie exists. `isSessionLoaded`
prevents the socket from opening before that initial check finishes.

The access token is an initial snapshot, not a live cookie subscription.
New visitors are identified after their socket-issued token is claimed.
The backend verifies authentication; decoding a token in the browser is
only used for presentation and analytics attribution.

The cookie remains HttpOnly, but returning its token to browser code
makes that returned copy JavaScript-readable. The cookie must cover the
frontend host for the frontend server to receive and forward it.

## History and streaming

`ChatProvider` loads the first visible history page when a token is
available. Older pages are prepended, with duplicate memory IDs removed.
The offset counts fetched records; an empty page ends pagination.
Requests are serialised and obsolete responses are ignored after a
session change or deletion.

Visible state uses `AgentChatMemory`, containing message content and
source. It does not render canonical model artefacts directly; the
separate `AgentMemory` contract represents those artefacts.

The socket sanitises a submitted draft, adds an optimistic user message
and sends the packaged request. Failed sends roll back that item.
A turn guard prevents duplicate submissions while a turn is active.
Thinking/responding state also disables input during agent activity.

Incoming deltas are passed to `ChatContext`, where per-memory buffers
order chunks and append text. The first text changes thinking to
responding; the terminal event flushes buffered content and clears busy
state. Captions are separate presentation state, not stored messages.

Deleting history waits for backend success before clearing memories,
pagination and delta buffers. Failures retain cached messages and display
an application error. Deletion is blocked during an active response.

## State transitions and presentation

History state resets when the access-token snapshot changes, using a
conditional update of this provider's own state before rendering the new
session. Effects manage fetching and invalidate old requests, rather
than synchronously resetting that state after a render.

Scrolling and pagination anchors belong to the message UI. It initially
shows the latest messages at the bottom, preserves position when older
history is prepended, and follows new output only while the visitor is
near the bottom.
