/** Validate untrusted socket frames before dispatching typed responses. */
import {
    WebSocketResponseType,
    type WebSocketResponse,
} from '@/types/api/ws/response';
import type { ApiResponseMetaData } from '@/types/api/shared/metadata';
import type { StreamManagerItem } from '@/types/services/agent/streaming';

function isRecord(
    value: unknown,
): value is Record<string, unknown> {
    return (
        typeof value === 'object' &&
        value !== null &&
        !Array.isArray(value)
    );
}

function isTimestamp(value: unknown): value is string {
    return (
        typeof value === 'string' &&
        Number.isFinite(Date.parse(value))
    );
}

function isMetadata(
    value: unknown,
): value is ApiResponseMetaData {
    return (
        isRecord(value) &&
        typeof value.request_id === 'string' &&
        typeof value.success === 'boolean' &&
        typeof value.message === 'string' &&
        isTimestamp(value.timestamp)
    );
}

function isStreamItem(
    value: unknown,
): value is StreamManagerItem {
    return (
        isRecord(value) &&
        typeof value.stream_id === 'string' &&
        isTimestamp(value.timestamp) &&
        value.type === 'text' &&
        typeof value.user_id === 'string' &&
        typeof value.memory_id === 'string' &&
        typeof value.sequence_number === 'number' &&
        Number.isInteger(value.sequence_number) &&
        value.sequence_number >= 0 &&
        typeof value.payload === 'string'
    );
}

/** Reject malformed envelopes, unknown event types and mismatched payloads. */
export function parseWebSocketResponse(
    raw: unknown,
): WebSocketResponse {
    if (typeof raw !== 'string') {
        throw new Error(
            'Expected a JSON text WebSocket frame.',
        );
    }
    const value: unknown = JSON.parse(raw);
    if (!isRecord(value) || !isMetadata(value.meta)) {
        throw new Error(
            'Invalid WebSocket response metadata.',
        );
    }
    const { meta, type, payload } = value;
    switch (type) {
        case WebSocketResponseType.HEARTBEAT:
        case WebSocketResponseType.AGENT_START:
        case WebSocketResponseType.AGENT_END:
        case WebSocketResponseType.SET_USER_TOKEN:
        case WebSocketResponseType.WARNING:
        case WebSocketResponseType.ERROR:
            if (typeof payload === 'string')
                return { meta, type, payload };
            break;
        case WebSocketResponseType.TOOL_MESSAGE:
        case WebSocketResponseType.AGENT_THINKING_CAPTIONS:
            if (
                Array.isArray(payload) &&
                payload.every(
                    (item: unknown) =>
                        typeof item === 'string',
                )
            ) {
                return { meta, type, payload };
            }
            break;
        case WebSocketResponseType.AGENT_DELTA:
            if (isStreamItem(payload))
                return { meta, type, payload };
            break;
        default:
            throw new Error(
                'Unsupported WebSocket response type.',
            );
    }
    throw new Error('Invalid WebSocket response payload.');
}
