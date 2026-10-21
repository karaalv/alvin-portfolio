'use client';

/** Show agent activity and cycle through retrieval captions. */
import { useEffect, useState } from 'react';
import { useChatContext } from '@/contexts/ChatContext';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/chat/messages/agent-thinking.module.css';

/**
 * Restart at the first caption when the caption list changes.
 */
function ThinkingCaption({
    captions,
}: {
    captions: readonly string[];
}) {
    const [index, setIndex] = useState(0);
    useEffect(() => {
        if (captions.length < 2) return;
        const timer = window.setInterval(() => {
            setIndex(
                (current) =>
                    (current + 1) % captions.length,
            );
        }, 2000);
        return () => window.clearInterval(timer);
    }, [captions]);
    return (
        <span
            className={`${typography.body} ${typography.medium} ${styles.caption}`}
        >
            {captions[index]}
        </span>
    );
}

/**
 * Stop caption timers when thinking ends or no captions remain.
 */
export default function AgentThinking() {
    const { isThinking, thinkingCaptions } =
        useChatContext();
    if (!isThinking) return null;
    return (
        <div className={styles.container} role="status">
            <span
                className={`${typography.heading} ${typography.medium} ${styles.label}`}
            >
                Thinking
            </span>
            {thinkingCaptions.length > 0 && (
                <ThinkingCaption
                    key={JSON.stringify(thinkingCaptions)}
                    captions={thinkingCaptions}
                />
            )}
        </div>
    );
}
