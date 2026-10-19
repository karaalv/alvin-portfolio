/** Message presentation uses the agent's visible-history contract. */
import type { AgentChatMemory } from '@/types/services/agent/memory';

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
    memories: readonly AgentChatMemory[];
    thinking?: boolean;
    thinkingCaption?: string;
}
