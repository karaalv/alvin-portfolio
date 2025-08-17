/**
 * @description This component renders the
 * agent message in the chat interface.
 */
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { DraftingCompass } from 'lucide-react'

// Styles
import styles from '@styles/chat-page/AgentMessage.module.css'
import fonts from '@styles/common/Typography.module.css'

// Types
import {AgentMemory, AgentCanvas} from '@/types/service.types'

export default function AgentMessage(
    { agentMemory }: { agentMemory: AgentMemory }
) {

    const [isWriting, setIsWriting] = useState(false);

    const renderCanvasTitle = () => {
        return (
            <p className={styles.canvas_title}>
                Machine Learning Resume
            </p>
        )
    }

    const renderCanvasWriting = () => {
        return (
            <div className={styles.canvas_writing_container}>
                <p>
                    Reading context from:
                </p>
                <p className={styles.shimmer_text}>
                    Undergraduate Degree Information
                </p>
                <p className={styles.canvas_writing_section}>
                    Writing relevant experience
                </p>
            </div>
        )
    }

    const renderCanvasIcon = () => {
        return (
            <div className={styles.canvas_icon_container}>
                <DraftingCompass className={styles.icon} />
                {isWriting ? renderCanvasWriting() : renderCanvasTitle()}
            </div>
        )
    }

    return (
        <div 
            className={`
                ${styles.agent_message}
                ${fonts.ai_chat}
            `}
        >
            <div className={styles.message_content}>
                <ReactMarkdown>
                    {agentMemory.content}
                </ReactMarkdown>
                <p style={{ color: 'var(--highlight)' }}>
                    Alvin AI
                </p>
            </div>
            {renderCanvasIcon()}
        </div>
    )
}