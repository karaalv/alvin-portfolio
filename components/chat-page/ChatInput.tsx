'use client'
/**
 * @description This component is the main 
 * chat input interface for the website.
 */

import { useRef } from 'react'
import { ArrowUp } from 'lucide-react'
import { useAppContext } from '@/contexts/AppContext'

// Styles
import styles from '@styles/chat-page/ChatInput.module.css'
import fonts from '@styles/common/Typography.module.css'


interface ChatInputProps {
    messages: string[]
    setMessages: React.Dispatch<React.SetStateAction<string[]>>
}

export default function ChatInput(
    { messages, setMessages }: ChatInputProps
) {
    const {
        message,
        setMessage,
        isLoading, 
        setIsLoading, 
        error, 
        setError 
    } = useAppContext()
    const inputRef = useRef<HTMLTextAreaElement>(null)


    // --- Send message function ---
    const sendMessage = () => {
        if (!message.trim() || isLoading) return
        setIsLoading(true)
        setError(null)

        // Simulate sending a message
        setTimeout(() => {
            setMessages([...messages, message])
            setMessage('')
            setIsLoading(false)
        }, 1000)
    }

    // --- Handle input and key press ---
    
    const chatInput = (
        event: React.ChangeEvent<HTMLTextAreaElement>
    ) => {
        const textArea = event.currentTarget
        
        // Reset height to auto to get the correct scrollHeight
        textArea.style.height = 'auto'

        // Set height based on scroll height, but respect min and max heights
        const maxHeight = parseInt(getComputedStyle(textArea).maxHeight)
        const newHeight = Math.min(textArea.scrollHeight, maxHeight)
        textArea.style.height = `${newHeight}px`

        setMessage(event.target.value)
    }

    const handleKeyPress = (
        event: React.KeyboardEvent<HTMLTextAreaElement>
    ) => {
        if (event.key === 'Enter' && !event.shiftKey) {
            event.preventDefault()
            sendMessage()
        }
    }

    return (
        <div className={styles.main_container}>
            <div className={styles.sub_container}>
                {/* Input */}
                <textarea
                    ref={inputRef}
                    className={`${styles.chat_input} ${fonts.ai_chat}`}
                    placeholder='Type your message here...'
                    value={message}
                    onChange={chatInput}
                    onKeyDown={handleKeyPress}
                    disabled={isLoading}
                    rows={1}
                />
                {/* Icon */}
                <div 
                    className={styles.icon_container}
                    onClick={sendMessage}
                    style={{ 
                        cursor: message.trim() && !isLoading ? 'pointer' : 'default',
                        opacity: message.trim() && !isLoading ? 1 : 0.5 
                    }}
                >
                    {isLoading ? (
                        <div className={styles.loading_square} />
                    ) : (
                        <ArrowUp className={styles.icon_con} />
                    )}
                </div>
            </div>
            <p className={styles.copyright}>
                © 2025 Alvin Karanja — Responses may not 
                always be accurate.
            </p>
        </div>
    )
}