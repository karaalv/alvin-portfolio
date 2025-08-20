'use client'
/**
 * @description Layout for the chat page.
 * This is used to wrap the chat page
 * with necessary providers and styles.
 */

// Contexts.
import ChatProvider from '@/contexts/ChatContext'
import SocketProvider from '@/contexts/SocketContext'

export default function ChatLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <ChatProvider>
            <SocketProvider>
                {children}
            </SocketProvider>
        </ChatProvider>
    )
}