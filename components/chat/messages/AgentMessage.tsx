/** Assistant response without a surrounding chat bubble. */
import ReactMarkdown from 'react-markdown';
import type { MessageProps } from '@/types/components/chat/messages';
import styles from '@styles/components/chat/messages/agent-message.module.css';

/** Render accumulated assistant text as Markdown. */
export default function AgentMessage({
    content,
}: MessageProps) {
    return (
        <div className={styles.container}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
