/** Limit socket creation to visitors who enter the chat route. */
import { createPageMetadata } from '@/server/metadata/pages';
import type { ReactNode } from 'react';
import SocketProvider from '@/contexts/SocketContext';

export const metadata = createPageMetadata(
    'Get to Know Alvin | AI Assistant',
    'Curious about Alvin’s work? Ask his AI assistant about the projects he has built, his background and how he approaches things.',
    '/chat',
);

/** Keep the shared chat data while releasing the socket on navigation away. */
export default function ChatLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <SocketProvider>{children}</SocketProvider>;
}
