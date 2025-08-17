/**
 * @description This component is the main chat
 * interface for the website.
 */

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

// Types
import { AgentMemory } from '@/types/service.types'

interface ChatSectionProps {
    messages: AgentMemory[],
    canvasOpen: boolean,
    setMessages: React.Dispatch<React.SetStateAction<AgentMemory[]>>
}

export default function ChatSection(
    { messages, canvasOpen, setMessages }: ChatSectionProps
) {
    const { error, isLoading } = useAppContext()

    const renderMessages = () => {
        return (
            <div 
                className={`
                    ${styles.chat_messages} 
                    ${canvasOpen ? styles.chat_messages_small : styles.chat_messages_big}
                `}
            >
                {
                    messages.map((message) => {
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
            </div>
        )
    }
    
    return (
        <div className={styles.main_container}>
            {/* Chat Messages */}
            <div className={styles.content_container}>
                {messages.length > 0 ? renderMessages() : <PlaceHolder />}
                {isLoading && <Loader />}
                {/* Error Message */}
                {error && <ErrorMessage message={error} />}
            </div>

            {/* Chat Input */}
            <ChatInput 
                messages={messages}
                canvasOpen={canvasOpen}
                setMessages={setMessages}
            />
        </div>
    )
}