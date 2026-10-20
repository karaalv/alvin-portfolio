'use client';

/** Presentational chat page, independent of the previous API contract. */
import { useRef, useState } from 'react';
import { PanelLeft } from 'lucide-react';
import Sidebar from '@components/chat/sidebar/Sidebar';
import ChatInput from '@components/chat/input/ChatInput';
import PromptGroup from '@components/chat/input/PromptGroup';
import PlaceholderHeading from '@components/chat/placeholder/PlaceholderHeading';
import ChatMessages from '@components/chat/messages/ChatMessages';
import InfoModal from '@components/chat/modals/InfoModal';
import DeleteChatModal from '@components/chat/modals/DeleteChatModal';
import ErrorBanner from '@components/chat/feedback/ErrorBanner';
import { useAppContext } from '@/contexts/AppContext';
import { useChatContext } from '@/contexts/ChatContext';
import styles from '@styles/pages/chat-page.module.css';

/** Compose the empty and conversation layouts without chat operations. */
export default function ChatPage() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const { error, setError } = useAppContext();
    const { memories, isThinking, thinkingCaptions } =
        useChatContext();
    const hasMessages = memories.length > 0;

    return (
        <main
            className={styles.container}
            onKeyDown={(event) => {
                if (event.key === 'Escape')
                    setSidebarOpen(false);
            }}
        >
            <button
                type="button"
                className={styles.backdrop}
                hidden={!sidebarOpen}
                aria-label="Close sidebar"
                onClick={() => setSidebarOpen(false)}
            />
            <Sidebar
                open={sidebarOpen}
                onClose={() => setSidebarOpen(false)}
                onInfo={() => {
                    setSidebarOpen(false);
                    setInfoOpen(true);
                }}
                onDelete={() => {
                    setSidebarOpen(false);
                    setDeleteOpen(true);
                }}
            />
            <div className={styles.chat_side}>
                <header className={styles.mobile_header}>
                    <button
                        type="button"
                        className={styles.toggle}
                        aria-label="Open sidebar"
                        aria-controls="chat-sidebar"
                        aria-expanded={sidebarOpen}
                        onClick={() => setSidebarOpen(true)}
                    >
                        <PanelLeft
                            size={24}
                            aria-hidden="true"
                        />
                    </button>
                </header>
                <div
                    className={styles.content}
                    data-state={
                        hasMessages
                            ? 'conversation'
                            : 'empty'
                    }
                >
                    <div
                        ref={scrollContainerRef}
                        className={styles.messages}
                        hidden={!hasMessages}
                    >
                        <div
                            className={
                                styles.message_content
                            }
                        >
                            <ChatMessages
                                scrollContainerRef={
                                    scrollContainerRef
                                }
                                memories={memories}
                                thinking={isThinking}
                                thinkingCaption={
                                    thinkingCaptions[0]
                                }
                            />
                        </div>
                    </div>
                    <div className={styles.composer}>
                        <PlaceholderHeading
                            visible={!hasMessages}
                        />
                        <div className={styles.input_area}>
                            {error !== null && (
                                <ErrorBanner
                                    title={error.title}
                                    message={error.message}
                                    onDismiss={() =>
                                        setError(null)
                                    }
                                />
                            )}
                            <ChatInput />
                        </div>
                        <PromptGroup
                            visible={!hasMessages}
                        />
                    </div>
                    <div
                        className={styles.spacer}
                        aria-hidden="true"
                    />
                </div>
            </div>
            <InfoModal
                open={infoOpen}
                onClose={() => setInfoOpen(false)}
            />
            <DeleteChatModal
                open={deleteOpen}
                onClose={() => setDeleteOpen(false)}
            />
        </main>
    );
}
