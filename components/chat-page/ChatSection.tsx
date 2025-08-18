'use client'
/**
 * @description This component is the main chat
 * interface for the website.
 */
import { useEffect, useRef } from 'react';
import { useAppContext } from '@/contexts/AppContext'

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
    } = useAppContext()
    const messagesEndRef = useRef<HTMLDivElement | null>(null);

    // Scroll to Bottom
    const scrollToBottom = (smooth: boolean) => {
        messagesEndRef.current?.scrollIntoView(
            { behavior: smooth ? 'smooth' : 'auto' }
        );
    };

    const isNearBottom = (el: HTMLElement) => {
        return el.scrollHeight - el.scrollTop - el.clientHeight < 50;
    };

    // --- Component State ---

    // Scroll on new messages
    useEffect(() => {
        const container = messagesEndRef.current?.parentElement;
        if (!container) return;

        if (isNearBottom(container)) {
            scrollToBottom(true);
        }
    }, [memory, error]);

    // Scroll on load
    useEffect(() => {
        scrollToBottom(false);
    }, []);

    // --- Message Rendering ---

    const renderMessages = () => {
        return (
            <div 
                className={`
                    ${styles.chat_messages} 
                    ${isCanvasOpen ? styles.chat_messages_small : styles.chat_messages_big}
                `}
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