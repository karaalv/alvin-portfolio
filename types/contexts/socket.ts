/** Connection lifecycle and transport operations exposed by the socket. */
import type { WebSocketRequest } from '@/types/api/ws/request';

export type SocketStatus =
    | 'connecting'
    | 'connected'
    | 'closed'
    | 'error';

export interface SocketContextValue {
    socketStatus: SocketStatus;
    sendMessage: (request: WebSocketRequest) => boolean;
}
