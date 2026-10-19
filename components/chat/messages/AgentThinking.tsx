/** Presentational agent activity and retrieval caption. */
import type { AgentThinkingProps } from '@/types/components/chat/messages';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/chat/messages/agent-thinking.module.css';

/** Keep activity visible without inventing model reasoning. */
export default function AgentThinking({
    caption,
}: AgentThinkingProps) {
    return (
        <div className={styles.container} role="status">
            <span
                className={`${typography.heading} ${typography.medium} ${styles.label}`}
            >
                Thinking
            </span>
            {caption && (
                <span
                    className={`${typography.body} ${typography.medium} ${styles.caption}`}
                >
                    {caption}
                </span>
            )}
        </div>
    );
}
