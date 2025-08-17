/**
 * @description This component renders the
 * agent message in the chat interface.
 */
import { useEffect, useState, useRef } from 'react'
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
    const [illusion] = useState<boolean>(agentMemory.illusion);
    const [displayContent, setDisplayContent] = useState<string>('');
    const [hasCanvas] = useState<boolean>(!!agentMemory.agent_canvas);

    // Streaming illusion
    useEffect(() => {
        if (!agentMemory.content) return;
        
        let interval: number;
        
        if (illusion) {
            setDisplayContent("");
            const chars = agentMemory.content.split("");
            let index = 0;

            interval = window.setInterval(() => {
                if (index < chars.length) {
                    setDisplayContent(chars.slice(0, index + 1).join(""));
                    index += 1;
                } else {
                    if (interval) clearInterval(interval);
                }
            }, 40);
        } else {
            setDisplayContent(agentMemory.content);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
                    {displayContent}
                </ReactMarkdown>
                <p style={{ color: 'var(--highlight)' }}>
                    Alvin AI
                </p>
            </div>
            {hasCanvas && renderCanvasIcon()}
        </div>
    )
}