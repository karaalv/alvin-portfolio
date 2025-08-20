'use client'
/**
 * @description This component is the main chat
 * interface for the website.
 */
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { useChatContext } from '@contexts/ChatContext';

// Components
import ChatInput from '@/components/chat-page/ChatInput'
import UserMessage from '@/components/chat-page/UserMessage'
import AgentMessage from '@/components/chat-page/AgentMessage'
import PlaceHolder from '@components/chat-page/PlaceHolder'
import ErrorMessage from '@components/chat-page/ErrorMessage'
import Loader from '@components/chat-page/Loader'

// Styles
import styles from '@styles/chat-page/ChatSection.module.css'

export default function ChatSection() {
    const { 
        error, 
        isLoading,
        memory,
        isCanvasOpen
    } = useChatContext()
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const [visibleFromScroll, setVisibleFromScroll] = useState<boolean>(false);
    const initialScrollRef = useRef<boolean>(false);

    // Scroll to Bottom
    const scrollToBottom = (smooth: boolean) => {
        messagesEndRef.current?.scrollIntoView(
            { behavior: smooth ? 'smooth' : 'instant' }
        );
    };

    const isNearBottom = (el: HTMLElement | null) => {
        if (!el) return false;
        return (el.scrollHeight - el.scrollTop - el.clientHeight) < 150;
    };

    // --- Component State ---

    // Scroll on new messages
    useEffect(() => {
        const container = messagesEndRef.current?.parentElement;
        if (!container) return;

        if (isNearBottom(container)) {
            scrollToBottom(true);
        }
    }, [memory, error, isLoading]);

    // Scroll on load
    useLayoutEffect(() => {
        if (memory.length > 0 && !initialScrollRef.current) {
            const id = setTimeout(() => {
                scrollToBottom(false);
                initialScrollRef.current = true;
                setVisibleFromScroll(true);
            }, 60);
            return () => clearTimeout(id);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [memory]);

    // --- Message Rendering ---

    const renderMessages = () => {
        return (
            <div 
                className={`
                    ${styles.chat_messages} 
                    ${isCanvasOpen ? styles.chat_messages_small : styles.chat_messages_big}
                `}
                style={{ opacity: visibleFromScroll ? 1 : 0 }}
            >
                {
                    memory.map((message) => {
                        if (message.source === 'user') {
                            return (
                                <UserMessage 
                                    key={message.id} 
                                    message={message.content} 
                                />
                            )
                        } else if (message.source === 'agent') {
                            return (
                                <AgentMessage 
                                    key={message.id} 
                                    agentMemory={message} 
                                />
                            )
                        }
                    })
                }
                <div ref={messagesEndRef} />
            </div>
        )
    }
    
    return (
        <div className={styles.main_container}>
            {/* Chat Messages */}
            <div className={styles.content_container}>
                {memory?.length > 0 ? renderMessages() : <PlaceHolder />}
                {isLoading && <Loader />}
                {/* Error Message */}
                {error && <ErrorMessage message={error} />}
            </div>
            {/* Chat Input */}
            <ChatInput />
        </div>
    )
}