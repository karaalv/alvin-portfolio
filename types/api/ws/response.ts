/** Discriminated response payloads matching the agent's wire schema. */
import type { ApiResponseMetaData } from '@/types/api/shared/metadata';
import type { StreamManagerItem } from '@/types/services/agent/streaming';

export enum WebSocketResponseType {
    HEARTBEAT = 'heartbeat',
    AGENT_START = 'agent_start',
    AGENT_END = 'agent_end',
    AGENT_DELTA = 'agent_delta',
    TOOL_MESSAGE = 'tool_message',
    AGENT_THINKING_CAPTIONS = 'agent_thinking_captions',
    SET_USER_TOKEN = 'set_user_token',
    WARNING = 'warning',
    ERROR = 'error',
}

interface ResponseEnvelope<TType, TPayload> {
    meta: ApiResponseMetaData;
    type: TType;
    payload: TPayload;
}

type TextResponseType =
    | WebSocketResponseType.HEARTBEAT
    | WebSocketResponseType.AGENT_START
    | WebSocketResponseType.AGENT_END
    | WebSocketResponseType.SET_USER_TOKEN
    | WebSocketResponseType.WARNING
    | WebSocketResponseType.ERROR;

type TextResponse = {
    [TType in TextResponseType]: ResponseEnvelope<
        TType,
        string
    >;
}[TextResponseType];

/** Python sets arrive as JSON arrays, not JavaScript sets. */
export type WebSocketResponse =
    | TextResponse
    | ResponseEnvelope<
          WebSocketResponseType.AGENT_DELTA,
          StreamManagerItem
      >
    | ResponseEnvelope<
          WebSocketResponseType.TOOL_MESSAGE,
          string[]
      >
    | ResponseEnvelope<
          WebSocketResponseType.AGENT_THINKING_CAPTIONS,
          string[]
      >;
