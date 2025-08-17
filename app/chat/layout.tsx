'use client'
/**
 * @description Layout for the chat page.
 * This is used to wrap the chat page
 * with necessary providers and styles.
 */

// Contexts.
import SocketProvider from '@/contexts/SocketContext'

export default function ChatLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <SocketProvider>
            {children}
        </SocketProvider>
    )
}