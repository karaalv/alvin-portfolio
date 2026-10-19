'use client';

/** Presentational chat input with responsive content sizing. */
import { useEffect, useRef } from 'react';
import { ArrowUp } from 'lucide-react';
import type { ChatInputProps } from '@/types/components/chat/input';
import styles from '@styles/components/chat/input/chat-input.module.css';

/** Fit text to its CSS height limit without changing the desktop hero. */
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

/** Render an editable input with submission intentionally unwired. */
export default function ChatInput({
    variant = 'chat',
    placeholder = 'What does Alvin do?',
}: ChatInputProps) {
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
                placeholder={placeholder}
                className={styles.input}
                onInput={(event) =>
                    resizeTextarea(event.currentTarget)
                }
            />
            <button
                type="button"
                aria-label="Send message"
                className={styles.send}
                disabled
            >
                <ArrowUp size={24} aria-hidden="true" />
            </button>
        </div>
    );
}
