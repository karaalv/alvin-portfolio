/** Limit socket creation to visitors who enter the chat route. */
import type { ReactNode } from 'react';
import SocketProvider from '@/contexts/SocketContext';

/** Keep the shared chat data while releasing the socket on navigation away. */
export default function ChatLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <SocketProvider>{children}</SocketProvider>;
}
