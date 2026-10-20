/** Chat state exposed to the page and future stream handlers. */
import type { Dispatch, SetStateAction } from 'react';
import type { AgentChatMemory } from '@/types/services/agent/memory';

export interface ChatContextValue {
    memories: AgentChatMemory[];
    setMemories: Dispatch<
        SetStateAction<AgentChatMemory[]>
    >;
    userMessage: string;
    setUserMessage: Dispatch<SetStateAction<string>>;
    chatHistoryOffset: number;
    hasMoreHistory: boolean;
    isHistoryLoading: boolean;
    fetchNextChatPage: () => Promise<void>;
    isThinking: boolean;
    setIsThinking: Dispatch<SetStateAction<boolean>>;
    thinkingCaptions: string[];
    setThinkingCaptions: Dispatch<SetStateAction<string[]>>;
    isResponding: boolean;
    setIsResponding: Dispatch<SetStateAction<boolean>>;
}
