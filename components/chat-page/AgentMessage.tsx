/**
 * @description This component renders the
 * agent message in the chat interface.
 */
import { useEffect, useState, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { DraftingCompass } from 'lucide-react'
import { useChatContext } from '@contexts/ChatContext';

// Styles
import styles from '@styles/chat-page/AgentMessage.module.css'
import fonts from '@styles/common/Typography.module.css'

// Types
import {AgentMemory} from '@/types/service.types'

export default function AgentMessage(
    { agentMemory }: { agentMemory: AgentMemory }
) {
    const {
        isAgentWriting,
        agentWritingPhase,
        agentWritingThinking,
        setCanvasContent,
        setCanvasOpen
    } = useChatContext();
    const [illusion] = useState<boolean>(agentMemory.illusion);
    const [displayContent, setDisplayContent] = useState<string>("");
    const streamingWindow = useRef<number>(0);
    const [currentThinking, setCurrentThinking] = useState<string>("");

    // --- Effects and State Update ---

    // Streaming illusion
    useEffect(() => {
        if (!agentMemory.content) return;
        
        let interval: number;
        
        if (illusion) {
            const chars = agentMemory.content.split("");
            const step = 3;

            const start = Math.min(streamingWindow.current, chars.length);
            const curr = chars.slice(0, start).join("");
            let index = start;

            interval = window.setInterval(() => {
                if (index < chars.length) {
                    index = Math.min(index + step, chars.length);
                    setDisplayContent(
                        curr + chars.slice(start, index).join("")
                    );
                    streamingWindow.current = index;
                } else {
                    if (interval) clearInterval(interval);
                }
            }, 60);
        } else {
            setDisplayContent(agentMemory.content);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agentMemory.content]);

    // Thinking iteration
    useEffect(() => {
        const headers = Array.from(agentWritingThinking ?? []);

        if (headers.length === 0) return;

        if (!currentThinking) {
            setCurrentThinking(headers[0]);
        }

        const interval = setInterval(() => {
            setCurrentThinking(prev => {
                const currentIndex = headers.indexOf(prev);
                const nextIndex = (currentIndex + 1) % headers.length;
                return headers[nextIndex];
            });
        }, 2000);

        return () => clearInterval(interval);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [agentWritingThinking])

    // --- Managing Canvas State ---

    const handleCanvasOpen = () => {
        if (!agentMemory.agent_canvas) return;
        if (isAgentWriting) return;
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
                    {currentThinking}
                </p>
                <p className={styles.canvas_writing_section}>
                    {agentWritingPhase}
                </p>
            </div>
        )
    }

    const renderCanvasIcon = () => {
        return (
            <button 
                className={styles.canvas_icon_container}
                onClick={handleCanvasOpen}
                disabled={isAgentWriting}
                style={{
                    cursor: isAgentWriting ? 'not-allowed' : 'pointer'
                }}
            >
                <DraftingCompass className={styles.icon} />
                {
                    isAgentWriting && illusion ? 
                        renderCanvasWriting() 
                    : 
                        renderCanvasTitle()
                    }
            </button>
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
            {!!agentMemory.agent_canvas && renderCanvasIcon()}
        </div>
    )
}