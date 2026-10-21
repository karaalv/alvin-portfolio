/** Right-aligned visitor message bubble. */
import type { MessageProps } from '@/types/components/chat/messages';
import styles from '@styles/components/chat/messages/user-message.module.css';

/** Display visitor text without interpreting markup. */
export default function UserMessage({
    content,
}: MessageProps) {
    return (
        <div className={styles.container}>
            <p className={styles.message}>{content}</p>
        </div>
    );
}
