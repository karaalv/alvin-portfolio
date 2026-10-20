'use client';

/** Suggested question that populates the shared chat draft. */
import { useChatContext } from '@/contexts/ChatContext';
import type { ChatPromptProps } from '@/types/components/chat/input';
import styles from '@styles/components/chat/input/chat-prompt.module.css';

/** Let visitors edit a suggestion before submitting it. */
export default function ChatPrompt({
    label,
    message,
}: ChatPromptProps) {
    const { setUserMessage, isThinking, isResponding } =
        useChatContext();
    return (
        <button
            type="button"
            className={styles.container}
            disabled={isThinking || isResponding}
            onClick={() => setUserMessage(message)}
        >
            {label}
        </button>
    );
}
