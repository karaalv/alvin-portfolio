/**
 * Message presentation uses the agent's visible-history
 * contract.
 */
import type { RefObject } from 'react';
import type { AgentChatMemory } from '@/types/services/agent/memory';

/** Plain text for one visible message. */
export interface MessageProps {
    content: string;
}

/**
 * Ordered history and the scroll viewport used for pagination.
 */
export interface ChatMessagesProps {
    scrollContainerRef: RefObject<HTMLDivElement | null>;
    memories: readonly AgentChatMemory[];
}
