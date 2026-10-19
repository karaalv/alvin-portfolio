/** Render chat presentation in the supplied message order. */
import type { ChatMessagesProps } from '@/types/components/chat/messages';
import AgentMessage from './AgentMessage';
import UserMessage from './UserMessage';
import AgentThinking from './AgentThinking';
import styles from '@styles/components/chat/messages/chat-messages.module.css';

/** Group messages and optional activity without fetching history. */
export default function ChatMessages({
    messages,
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
            {messages.map((message) =>
                message.role === 'user' ? (
                    <UserMessage
                        key={message.id}
                        content={message.content}
                    />
                ) : (
                    <AgentMessage
                        key={message.id}
                        content={message.content}
                    />
                ),
            )}
            {thinking && (
                <AgentThinking caption={thinkingCaption} />
            )}
        </div>
    );
}
