/** Presentational messages, independent of transport and storage. */
export interface ChatMessage {
    id: string;
    role: 'user' | 'assistant';
    content: string;
}

/** Plain text for one visible message. */
export interface MessageProps {
    content: string;
}

/** Thinking labels supplied by the future streaming controller. */
export interface AgentThinkingProps {
    caption?: string;
}

/** Ordered messages and optional agent activity. */
export interface ChatMessagesProps {
    messages: readonly ChatMessage[];
    thinking?: boolean;
    thinkingCaption?: string;
}
