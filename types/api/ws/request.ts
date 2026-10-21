/** Client message types accepted by the portfolio agent socket. */
export enum WebSocketRequestType {
    AGENT_MESSAGE = 'agent_message',
    HEARTBEAT = 'heartbeat',
}

/** Both request kinds carry text; missing request IDs are generated upstream. */
export interface WebSocketRequest {
    type: WebSocketRequestType;
    payload: string;
    request_id?: string | null;
}
