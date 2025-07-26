/**
 * @description This component is the main chat
 * interface for the website.
 */

import { useState } from 'react'
import { useAppContext } from '@/contexts/AppContext'

// Components
import ChatInput from '@/components/chat-page/ChatInput'
import UserMessage from '@/components/chat-page/UserMessage'
import AgentMessage from '@/components/chat-page/AgentMessage'
import PlaceHolder from '@components/chat-page/PlaceHolder'
import ErrorMessage from '@components/chat-page/ErrorMessage'

// Styles
import styles from '@styles/chat-page/ChatSection.module.css'

// Types
import { AgentMemory } from '@/types/service.types'

export default function ChatSection() {
    const {error} = useAppContext()
    const [messages, setMessages] = useState<AgentMemory[]>([
        {
            user_id: '1',
            chat_id: '1',
            content: 'Hello! How can I assist you today?',
            source: 'user',
            timestamp: new Date().toISOString(),
            canvas: null

        },
        {
            user_id: '1',
            chat_id: '2',
            content: 'Hi there! I have a question about your services.',
            source: 'agent',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '3',
            content: 'Sure! I would be happy to help you with that.',
            source: 'user',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '4',
            content: 'Great! I am looking for information on your pricing.',
            source: 'agent',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '5',
            content: 'Our pricing starts at $99 per month for basic services.',
            source: 'user',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '6',
            content: 'That sounds good! Can you tell me more about the features included?',
            source: 'agent',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '7',
            content: 'Sure! The basic plan includes access to all our core features, including 24/7 support, regular updates, and more.',
            source: 'user',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '8',
            content: 'That sounds great! I will sign up for the basic plan.',
            source: 'agent',
            timestamp: new Date().toISOString(),
            canvas: null
        },
        {
            user_id: '1',
            chat_id: '9',
            content: 'Thank you for choosing our services! If you have any other questions, feel free to ask.',
            source: 'user',
            timestamp: new Date().toISOString(),
            canvas: null
        }
    ])


    const renderMessages = () => {
        return (
            <div className={styles.chat_messages}>
                {
                    messages.map((message) => {
                        if (message.source === 'user') {
                            return (
                                <UserMessage 
                                    key={message.chat_id} 
                                    message={message.content} 
                                />
                            )
                        } else if (message.source === 'agent') {
                            return (
                                <AgentMessage 
                                    key={message.chat_id} 
                                    message={message.content} 
                                />
                            )
                        }
                    })
                }
            </div>
        )
    }
    
    return (
        <div className={styles.main_container}>
            {/* Chat Messages */}
            <div className={styles.content_container}>
                {messages.length > 0 ? renderMessages() : <PlaceHolder />}
                {/* Error Message */}
                {error && <ErrorMessage message={error} />}
            </div>

            {/* Chat Input */}
            <ChatInput 
                messages={messages} 
                setMessages={setMessages}
            />
        </div>
    )
}