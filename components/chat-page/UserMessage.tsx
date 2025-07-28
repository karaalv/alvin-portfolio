/**
 * @description This component renders the
 * user message in the chat interface.
 */

import styles from '@styles/chat-page/UserMessage.module.css'
import fonts from '@styles/common/Typography.module.css'

export default function UserMessage(
    { message }: { message: string }
) {
    return (
        <div className={styles.container}>
            <div className={styles.user_message}>
                <p className={fonts.ai_chat}>
                    {message}
                </p>
            </div>
        </div>
    )
}