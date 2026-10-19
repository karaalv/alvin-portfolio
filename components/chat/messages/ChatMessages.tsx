/** Render chat presentation in the supplied message order. */
import type { ChatMessagesProps } from '@/types/components/chat/messages';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';
import AgentThinking from './AgentThinking';
import styles from '@styles/components/chat/messages/chat-messages.module.css';

/** Group messages and optional activity without fetching history. */
export default function ChatMessages({
    memories,
    thinking = false,
    thinkingCaption,
}: ChatMessagesProps) {
    return (
        <div
            className={styles.container}
            role="log"
            aria-label="Conversation"
            aria-live="polite"
        >
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
            {thinking && (
                <AgentThinking caption={thinkingCaption} />
            )}
        </div>
    );
}
