'use client';

/**
 * Shared visible history and agent activity for the current
 * visitor.
 */
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
import {
    AgentDeltaBuffer,
    appendAgentMemoryChunks,
} from '@/lib/chat/deltas';
import type { StreamManagerItem } from '@/types/services/agent/streaming';
import type { AgentChatMemory } from '@/types/services/agent/memory';
import { useAppContext } from '@/contexts/AppContext';
import { deleteAgentMemory } from '@/services/agent/memory/deletion';
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
    const [isDeletingHistory, setIsDeletingHistory] =
        useState(false);
    const deletingHistoryRef = useRef(false);
    const deltaBuffers = useRef(
        new Map<string, AgentDeltaBuffer>(),
    );
    const historySession = useRef({
        offset: 0,
        loading: false,
        hasMore: false,
    });

    /**
     * Serialise page requests and ignore results from an obsolete
     * session.
     */
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
        deltaBuffers.current.clear();
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

    const [userMessage, setUserMessage] = useState('');
    const [isThinking, setIsThinking] = useState(false);
    const [thinkingCaptions, setThinkingCaptions] =
        useState<string[]>([]);
    const [isResponding, setIsResponding] = useState(false);
    /**
     * Order chunks by memory and transition from thinking to text.
     */
    const appendAgentDelta = useCallback(
        (item: StreamManagerItem) => {
            let buffer = deltaBuffers.current.get(
                item.memory_id,
            );
            if (!buffer) {
                buffer = new AgentDeltaBuffer();
                deltaBuffers.current.set(
                    item.memory_id,
                    buffer,
                );
            }
            const chunks = buffer.push(item);
            if (chunks === null) return;
            setIsThinking(false);
            setIsResponding(true);
            // Reserve the message even when its first chunk is still missing.
            const ready =
                chunks.length > 0
                    ? chunks
                    : [{ ...item, payload: '' }];
            setMemories((current) =>
                appendAgentMemoryChunks(current, ready),
            );
        },
        [],
    );

    /**
     * Flush pending text before ending a turn, including short
     * gaps.
     */
    const finishAgentDeltas = useCallback(() => {
        const chunks = [
            ...deltaBuffers.current.values(),
        ].flatMap((buffer) => buffer.finish());
        if (chunks.length > 0)
            setMemories((current) =>
                appendAgentMemoryChunks(current, chunks),
            );
    }, []);

    /**
     * Delete server history before clearing cached messages and
     * offsets.
     */
    const deleteChatHistory =
        useCallback(async (): Promise<boolean> => {
            if (
                deletingHistoryRef.current ||
                isThinking ||
                isResponding
            )
                return false;
            deletingHistoryRef.current = true;
            setIsDeletingHistory(true);
            const previousSession = historySession.current;
            const deletingSession = {
                offset: 0,
                loading: false,
                hasMore: false,
            };
            historySession.current = deletingSession;
            setIsHistoryLoading(false);
            try {
                await deleteAgentMemory();
                if (
                    historySession.current !==
                    deletingSession
                )
                    return false;
                deltaBuffers.current.clear();
                setMemories([]);
                setChatHistoryOffset(0);
                setHasMoreHistory(false);
                setThinkingCaptions([]);
                setIsThinking(false);
                setIsResponding(false);
                return true;
            } catch {
                if (
                    historySession.current ===
                    deletingSession
                ) {
                    historySession.current = {
                        ...previousSession,
                        loading: false,
                    };
                    setError(
                        createApplicationError(
                            'Unable to delete chat',
                            'Your chat history could not be deleted. Please try again.',
                        ),
                    );
                }
                return false;
            } finally {
                deletingHistoryRef.current = false;
                setIsDeletingHistory(false);
            }
        }, [isThinking, isResponding, setError]);

    const value = useMemo(
        () => ({
            memories,
            setMemories,
            appendAgentDelta,
            finishAgentDeltas,
            deleteChatHistory,
            isDeletingHistory,
            userMessage,
            setUserMessage,
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
            appendAgentDelta,
            finishAgentDeltas,
            deleteChatHistory,
            isDeletingHistory,
            userMessage,
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
