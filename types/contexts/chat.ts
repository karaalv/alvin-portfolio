/** Chat state exposed to the page and future stream handlers. */
import type { Dispatch, SetStateAction } from 'react';
import type { StreamManagerItem } from '@/types/services/agent/streaming';
import type { AgentChatMemory } from '@/types/services/agent/memory';

export interface ChatContextValue {
    memories: AgentChatMemory[];
    setMemories: Dispatch<
        SetStateAction<AgentChatMemory[]>
    >;
    appendAgentDelta: (item: StreamManagerItem) => void;
    finishAgentDeltas: () => void;
    deleteChatHistory: () => Promise<boolean>;
    isDeletingHistory: boolean;
    selectedPromptLabel: string | null;
    setSelectedPromptLabel: Dispatch<
        SetStateAction<string | null>
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
