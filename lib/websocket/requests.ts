/**
 * Package outbound chat and heartbeat requests with unique IDs.
 */
import { generateUuid } from '@/lib/ids/generate';
import {
    WebSocketRequestType,
    type WebSocketRequest,
} from '@/types/api/ws/request';

/**
 * Create an independent request ID for each outbound message.
 */
export function createWsAgentMessageRequest(
    message: string,
): WebSocketRequest & { request_id: string } {
    return {
        type: WebSocketRequestType.AGENT_MESSAGE,
        payload: message,
        request_id: generateUuid(),
    };
}

/** Keep the connection active without invoking the agent. */
export function createWsHeartbeatRequest(): WebSocketRequest & {
    request_id: string;
} {
    return {
        type: WebSocketRequestType.HEARTBEAT,
        payload: 'ping',
        request_id: generateUuid(),
    };
}
