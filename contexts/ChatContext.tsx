'use client';

/** Shared visible history and agent activity for the current visitor. */
import {
    createContext,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { ChatContextValue } from '@/types/contexts/chat';
import type { AgentChatMemory } from '@/types/services/agent/memory';

const ChatContext = createContext<
    ChatContextValue | undefined
>(undefined);

/** Own chat data without coupling it to history fetching or transport. */
export default function ChatProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [memories, setMemories] = useState<
        AgentChatMemory[]
    >([]);
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingCaptions, setThinkingCaptions] =
        useState<string[]>([]);
    const [isResponding, setIsResponding] = useState(false);
    const value = useMemo(
        () => ({
            memories,
            setMemories,
            isThinking,
            setIsThinking,
            thinkingCaptions,
            setThinkingCaptions,
            isResponding,
            setIsResponding,
        }),
        [
            memories,
            isThinking,
            thinkingCaptions,
            isResponding,
        ],
    );
    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
}

/** Expose all chat state and its setters to descendants. */
export function useChatContext(): ChatContextValue {
    const value = useContext(ChatContext);
    if (!value)
        throw new Error(
            'useChatContext must be used within a ChatProvider',
        );
    return value;
}
