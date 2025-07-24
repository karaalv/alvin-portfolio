/**
 * @description This component is the main chat
 * interface for the website.
 */

import { useState } from 'react'

// Components
import ChatInput from '@/components/chat-page/ChatInput'

// Styles
import styles from '@styles/chat-page/ChatSection.module.css'

export default function ChatSection() {
    const [messages, setMessages] = useState<string[]>([])
    
    return (
        <div className={styles.main_section}>
            {/* Chat Messages */}

            {/* Chat Input */}
            <ChatInput 
                messages={messages} 
                setMessages={setMessages}
            />
        </div>
    )
}