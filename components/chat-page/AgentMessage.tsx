/**
 * @description This component renders the
 * agent message in the chat interface.
 */
import { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import { DraftingCompass } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'

// Styles
import styles from '@styles/chat-page/AgentMessage.module.css'
import fonts from '@styles/common/Typography.module.css'

// Types
import {AgentMemory, AgentCanvas} from '@/types/service.types'

export default function AgentMessage(
    { agentMemory }: { agentMemory: AgentMemory }
) {
    const {setCanvasContent, setCanvasOpen} = useAppContext();
    const [isWriting, setIsWriting] = useState(true);
    const hasCanvas = useState<boolean>(!!agentMemory.agent_canvas);

    // --- Managing Canvas State ---

    const handleCanvasOpen = () => {
        if (!agentMemory.agent_canvas) return;
        setCanvasContent(agentMemory.agent_canvas.content);
        setTimeout(() => {
            setCanvasOpen(true);
        }, 100);
    }

    // --- Rendering Canvas Icon ---

    const renderCanvasTitle = () => {
        return (
            <p className={styles.canvas_title}>
                {agentMemory.agent_canvas!.title}
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
            <div 
                className={styles.canvas_icon_container}
                onClick={handleCanvasOpen}
            >
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
            {hasCanvas && renderCanvasIcon()}
        </div>
    )
}