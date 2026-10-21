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
    const followLatestRef = useRef(true);
    const contentRef = useRef<HTMLDivElement>(null);
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
            followLatestRef.current = true;
            return;
        }
        if (!previousFirstId.current) {
            followLatestRef.current = true;
            container.scrollTop = container.scrollHeight;
        } else if (
            firstId !== previousFirstId.current &&
            heightBeforePage.current !== null
        ) {
            container.scrollTop +=
                container.scrollHeight -
                heightBeforePage.current;
        } else if (followLatestRef.current) {
            container.scrollTop = container.scrollHeight;
        }
        previousFirstId.current = firstId;
        heightBeforePage.current = null;
    }, [memories, scrollContainerRef]);

    useEffect(() => {
        const container = scrollContainerRef.current;
        const content = contentRef.current;
        if (!container || !content) return;
        function recordScrollPosition() {
            if (!container) return;
            const distance =
                container.scrollHeight -
                container.clientHeight -
                container.scrollTop;
            followLatestRef.current = distance <= 96;
        }
        // Layout changes include streamed Markdown and composer resizing.
        const observer = new ResizeObserver(() => {
            if (followLatestRef.current)
                container.scrollTop =
                    container.scrollHeight;
        });
        container.addEventListener(
            'scroll',
            recordScrollPosition,
            { passive: true },
        );
        observer.observe(content);
        observer.observe(container);
        return () => {
            container.removeEventListener(
                'scroll',
                recordScrollPosition,
            );
            observer.disconnect();
        };
    }, [scrollContainerRef]);

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
            ref={contentRef}
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
