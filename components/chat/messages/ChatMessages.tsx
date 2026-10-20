'use client';

/**
 * Render chronological history and request older pages near the
 * top.
 */
import { useEffect, useLayoutEffect, useRef } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import type { ChatMessagesProps } from '@/types/components/chat/messages';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';
import AgentThinking from './AgentThinking';
import styles from '@styles/components/chat/messages/chat-messages.module.css';

/**
 * Observe the scroll viewport and preserve position when
 * history is prepended.
 */
export default function ChatMessages({
    scrollContainerRef,
    memories,
}: ChatMessagesProps) {
    const anchorRef = useRef<HTMLDivElement>(null);
    const previousFirstId = useRef<string | undefined>(
        undefined,
    );
    const heightBeforePage = useRef<number | null>(null);
    const {
        chatHistoryOffset,
        hasMoreHistory,
        fetchNextChatPage,
    } = useChatContext();

    useLayoutEffect(() => {
        const container = scrollContainerRef.current;
        const firstId = memories[0]?.memory_id;
        if (!container || !firstId) {
            previousFirstId.current = undefined;
            return;
        }
        if (!previousFirstId.current) {
            container.scrollTop = container.scrollHeight;
        } else if (
            firstId !== previousFirstId.current &&
            heightBeforePage.current !== null
        ) {
            container.scrollTop +=
                container.scrollHeight -
                heightBeforePage.current;
        }
        previousFirstId.current = firstId;
        heightBeforePage.current = null;
    }, [memories, scrollContainerRef]);

    useEffect(() => {
        const anchor = anchorRef.current;
        const container = scrollContainerRef.current;
        if (
            !anchor ||
            !container ||
            !hasMoreHistory ||
            chatHistoryOffset === 0
        )
            return;
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (!entry.isIntersecting) return;
                heightBeforePage.current =
                    container.scrollHeight;
                void fetchNextChatPage();
            },
            {
                root: container,
                rootMargin: '200px 0px 0px 0px',
            },
        );
        observer.observe(anchor);
        return () => observer.disconnect();
    }, [
        chatHistoryOffset,
        hasMoreHistory,
        fetchNextChatPage,
        scrollContainerRef,
    ]);

    return (
        <div
            className={styles.container}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
        >
            <div
                ref={anchorRef}
                className={styles.history_anchor}
                aria-hidden="true"
            />
            {memories.map((memory) =>
                memory.memory_source === 'user' ? (
                    <UserMessage
                        key={memory.memory_id}
                        content={memory.content}
                    />
                ) : (
                    <AgentMessage
                        key={memory.memory_id}
                        content={memory.content}
                    />
                ),
            )}
            <AgentThinking />
        </div>
    );
}
