'use client';

/** Shared visible history and agent activity for the current visitor. */
import {
    createContext,
    useCallback,
    useEffect,
    useRef,
    useContext,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { ChatContextValue } from '@/types/contexts/chat';
import type { AgentChatMemory } from '@/types/services/agent/memory';
import { useAppContext } from '@/contexts/AppContext';
import { retrieveAgentChatPage } from '@/services/agent/memory/retrieval';
import { createApplicationError } from '@/lib/errors/application';

const ChatContext = createContext<
    ChatContextValue | undefined
>(undefined);

/** Cache visible history and own pagination for this visitor. */
export default function ChatProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [memories, setMemories] = useState<
        AgentChatMemory[]
    >([]);
    const { accessToken, setError } = useAppContext();
    const [chatHistoryOffset, setChatHistoryOffset] =
        useState(0);
    const [hasMoreHistory, setHasMoreHistory] =
        useState(false);
    const [isHistoryLoading, setIsHistoryLoading] =
        useState(false);
    const historySession = useRef({
        offset: 0,
        loading: false,
        hasMore: false,
    });

    /** Serialise page requests and ignore results from an obsolete session. */
    const fetchNextChatPage = useCallback(async () => {
        const session = historySession.current;
        if (session.loading || !session.hasMore) return;
        session.loading = true;
        setIsHistoryLoading(true);
        try {
            const { data } = await retrieveAgentChatPage(
                session.offset,
            );
            if (historySession.current !== session) return;
            session.offset += data.length;
            session.hasMore = data.length > 0;
            setMemories((current) => {
                const ids = new Set(
                    current.map(
                        (memory) => memory.memory_id,
                    ),
                );
                return [
                    ...data.filter(
                        (memory) =>
                            !ids.has(memory.memory_id),
                    ),
                    ...current,
                ];
            });
            setChatHistoryOffset(session.offset);
            setHasMoreHistory(session.hasMore);
        } catch {
            if (historySession.current === session)
                setError(
                    createApplicationError(
                        'Unable to load chat history',
                        'Your saved messages could not be loaded. Please try again.',
                    ),
                );
        } finally {
            session.loading = false;
            if (historySession.current === session)
                setIsHistoryLoading(false);
        }
    }, [setError]);

    useEffect(() => {
        const session = {
            offset: 0,
            loading: false,
            hasMore: !!accessToken,
        };
        historySession.current = session;
        setMemories([]);
        setChatHistoryOffset(0);
        setHasMoreHistory(session.hasMore);
        setIsHistoryLoading(false);
        if (accessToken) void fetchNextChatPage();
        return () => {
            // Invalidate in-flight requests on token changes and unmount.
            historySession.current = {
                offset: 0,
                loading: false,
                hasMore: false,
            };
        };
    }, [accessToken, fetchNextChatPage]);

    const [isThinking, setIsThinking] = useState(false);
    const [thinkingCaptions, setThinkingCaptions] =
        useState<string[]>([]);
    const [isResponding, setIsResponding] = useState(false);
    const value = useMemo(
        () => ({
            memories,
            setMemories,
            chatHistoryOffset,
            hasMoreHistory,
            isHistoryLoading,
            fetchNextChatPage,
            isThinking,
            setIsThinking,
            thinkingCaptions,
            setThinkingCaptions,
            isResponding,
            setIsResponding,
        }),
        [
            memories,
            chatHistoryOffset,
            hasMoreHistory,
            isHistoryLoading,
            fetchNextChatPage,
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
