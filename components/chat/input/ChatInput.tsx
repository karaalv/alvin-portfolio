'use client';

/**
 * Shared chat draft with activity feedback and animated
 * placeholder copy.
 */
import { useEffect, useRef, useState } from 'react';
import { useSocketContext } from '@/contexts/SocketContext';
import { useChatContext } from '@/contexts/ChatContext';
import { useTypewriterPlaceholder } from '@/hooks/chat/useTypewriterPlaceholder';
import { ArrowUp } from 'lucide-react';
import type { ChatInputProps } from '@/types/components/chat/input';
import styles from '@styles/components/chat/input/chat-input.module.css';

/**
 * Fit text to its CSS height limit without changing the desktop
 * hero.
 */
function resizeTextarea(textarea: HTMLTextAreaElement) {
    textarea.style.height = 'auto';
    const maximum = Number.parseFloat(
        getComputedStyle(textarea).maxHeight,
    );
    if (Number.isFinite(maximum)) {
        textarea.style.height = `${Math.min(textarea.scrollHeight, maximum)}px`;
    } else {
        textarea.style.removeProperty('height');
    }
}

/**
 * Send the shared draft on Enter or click; Shift+Enter adds a line.
 */
export default function ChatInput({
    variant = 'chat',
    placeholder,
}: ChatInputProps) {
    const {
        userMessage,
        setUserMessage,
        setSelectedPromptLabel,
        isThinking,
        isResponding,
        isDeletingHistory,
    } = useChatContext();
    const { sendAgentMessage } = useSocketContext();
    const [focused, setFocused] = useState(false);
    const busy =
        isThinking || isResponding || isDeletingHistory;
    const animatedPlaceholder = useTypewriterPlaceholder(
        focused ||
            userMessage.length > 0 ||
            busy ||
            !!placeholder,
    );
    const containerRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const textarea = inputRef.current;
        if (!container || !textarea) return;

        resizeTextarea(textarea);
        let lastWidth =
            container.getBoundingClientRect().width;
        const observer = new ResizeObserver(([entry]) => {
            const width =
                entry.borderBoxSize[0]?.inlineSize ??
                entry.contentRect.width;
            if (width !== lastWidth) {
                lastWidth = width;
                resizeTextarea(textarea);
            }
        });
        observer.observe(container);
        return () => observer.disconnect();
    }, [variant]);

    useEffect(() => {
        if (inputRef.current)
            resizeTextarea(inputRef.current);
    }, [userMessage]);

    return (
        <div
            ref={containerRef}
            className={styles.container}
            data-variant={variant}
        >
            <textarea
                ref={inputRef}
                rows={1}
                aria-label="Message the portfolio agent"
                value={userMessage}
                disabled={busy}
                placeholder={
                    placeholder ?? animatedPlaceholder
                }
                onKeyDown={(event) => {
                    if (
                        event.key === 'Enter' &&
                        !event.shiftKey &&
                        !event.nativeEvent.isComposing
                    ) {
                        event.preventDefault();
                        if (!busy) sendAgentMessage();
                    }
                }}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onChange={(event) => {
                    setSelectedPromptLabel(null);
                    setUserMessage(
                        event.currentTarget.value,
                    );
                }}
                className={styles.input}
                onInput={(event) =>
                    resizeTextarea(event.currentTarget)
                }
            />
            <button
                type="button"
                aria-label="Send message"
                className={styles.send}
                onClick={sendAgentMessage}
                disabled={busy || !userMessage.trim()}
            >
                <ArrowUp size={24} aria-hidden="true" />
            </button>
        </div>
    );
}
