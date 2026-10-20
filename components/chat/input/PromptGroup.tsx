/** Shared suggested questions for the hero and empty chat. */
import type { PromptGroupProps } from '@/types/components/chat/input';
import { CHAT_PROMPTS } from '@/lib/chat/input';
import ChatPrompt from './ChatPrompt';
import styles from '@styles/components/chat/input/prompt-group.module.css';

/**
 * Render the suggestions and collapse them when a conversation
 * starts.
 */
export default function PromptGroup({
    visible = true,
    variant = 'chat',
}: PromptGroupProps) {
    return (
        <div
            className={styles.container}
            data-visible={visible}
            data-variant={variant}
            aria-hidden={!visible}
            inert={!visible}
        >
            <div className={styles.clip}>
                <div
                    className={styles.prompts}
                    role="group"
                    aria-label="Suggested questions"
                >
                    {CHAT_PROMPTS.map(
                        ({ label, message }) => (
                            <ChatPrompt
                                key={label}
                                label={label}
                                message={message}
                            />
                        ),
                    )}
                </div>
            </div>
        </div>
    );
}
