/** Presentational prompt pill, ready for later chat integration. */
import type { ChatPromptProps } from '@/types/components/chat/input';
import styles from '@styles/components/chat/input/chat-prompt.module.css';

/** Display one suggested prompt without applying it to the input. */
export default function ChatPrompt({
    label,
}: ChatPromptProps) {
    return (
        <button type="button" className={styles.container}>
            {label}
        </button>
    );
}
