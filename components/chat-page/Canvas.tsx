/**
 * @description This component renders the
 * agent canvas for the chat page.
 */

import { useEffect, useRef, useState } from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { useChatContext } from '@contexts/ChatContext';

import { X } from 'lucide-react'
import styles from '@styles/chat-page/Canvas.module.css'

export default function Canvas() {

    const { 
        isAgentWriting,
        canvasContent, 
        setCanvasOpen 
    } = useChatContext();
    const [displayContent, setDisplayContent] = useState<string>('');
    const streamingWindow = useRef<number>(0);
    const endRef = useRef<HTMLDivElement | null>(null);

    // Scroll to Bottom
    const scrollToBottom = () => {
        endRef.current?.scrollIntoView(
            { behavior: 'smooth' }
        );
    };

    useEffect(() => {
        if (!isAgentWriting) return;
        scrollToBottom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [displayContent]);

    // Streaming illusion
    useEffect(() => {
        if (!canvasContent) return;

        let interval: number;
        
        if (isAgentWriting) {
            const chars = canvasContent.split("");
            const step = 8;

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
            }, 100);
        } else {
            setDisplayContent(canvasContent);
        }

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [canvasContent]);

    const renderContent = () => {
        return (
            <ReactMarkdown
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
                {displayContent}
            </ReactMarkdown>
        )
    }

    const renderLoader = () => {
        return (
            <div className={styles.loader_container}>
                <div className={`${styles.shimmer} ${styles.line_long}`} />
                <div className={`${styles.shimmer} ${styles.line_long}`} />
                <div className={`${styles.shimmer} ${styles.line_short}`} />
            </div>
        )
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <X 
                    className={styles.icon}
                    onClick={() => {
                        if (isAgentWriting) return;
                        setCanvasOpen(false);
                    }} 
                    style={{
                        cursor: isAgentWriting ? 'not-allowed' : 'pointer'
                    }}
                />
            </div>
            {canvasContent ? renderContent() : <></>}
            {isAgentWriting && renderLoader()}
            <div ref={endRef} />
        </div>
    )
}