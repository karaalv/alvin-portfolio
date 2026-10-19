/** Assistant response without a surrounding chat bubble. */
import ReactMarkdown from 'react-markdown';
import type { MessageProps } from '@/types/components/chat/messages';
import styles from '@styles/components/chat/messages/agent-message.module.css';

/** Render assistant Markdown, ready for later streaming integration. */
export default function AgentMessage({
    content,
}: MessageProps) {
    return (
        <div className={styles.container}>
            <ReactMarkdown>{content}</ReactMarkdown>
        </div>
    );
}
