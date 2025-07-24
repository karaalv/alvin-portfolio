/**
 * @description This component renders the
 * agent message in the chat interface.
 */
import ReactMarkdown from 'react-markdown'

// Styles
import styles from '@styles/chat-page/AgentMessage.module.css'
import fonts from '@styles/common/Typography.module.css'

export default function AgentMessage(
    { message }: { message: string }
) {
    return (
        <div 
            className={`
                ${styles.agent_message}
                ${fonts.ai_chat}
            `}
        >
            <ReactMarkdown>
                {message}
            </ReactMarkdown>
            <p style={{ color: 'var(--highlight)' }}>
                Alvin AI
            </p>
        </div>
    )
}