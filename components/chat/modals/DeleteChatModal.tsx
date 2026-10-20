'use client';

/**
 * Confirm permanent history deletion and report request
 * progress.
 */
import { useChatContext } from '@/contexts/ChatContext';
import type { ChatModalProps } from '@/types/components/chat/modals';
import ChatModal from './ChatModal';
import styles from '@styles/components/chat/modals/chat-modal.module.css';

/**
 * Delete confirmed history and reveal failures in the page
 * banner.
 */
export default function DeleteChatModal(
    props: ChatModalProps,
) {
    const {
        memories,
        deleteChatHistory,
        isDeletingHistory,
        isThinking,
        isResponding,
    } = useChatContext();
    const busy =
        isThinking || isResponding || isDeletingHistory;
    const deleteDisabled = busy || memories.length === 0;
    const close = () => {
        if (!isDeletingHistory) props.onClose();
    };

    async function handleDelete() {
        if (deleteDisabled) return;
        await deleteChatHistory();
        props.onClose();
    }

    return (
        <ChatModal
            {...props}
            onClose={close}
            dismissible={!isDeletingHistory}
            titleId="delete-chat-heading"
        >
            <h2
                id="delete-chat-heading"
                className={styles.title}
            >
                Delete this chat?
            </h2>
            <p className={styles.body}>
                This will permanently delete your chat
                history. This cannot be undone.
            </p>
            {(isThinking || isResponding) && (
                <p className={styles.body} role="status">
                    Wait for the current response to finish
                    before deleting.
                </p>
            )}
            <div
                className={styles.actions}
                aria-busy={isDeletingHistory}
            >
                <button
                    type="button"
                    className={styles.button}
                    onClick={close}
                    disabled={isDeletingHistory}
                >
                    Cancel
                </button>
                <button
                    type="button"
                    className={`${styles.button} ${styles.destructive}`}
                    disabled={deleteDisabled}
                    onClick={() => void handleDelete()}
                >
                    {isDeletingHistory
                        ? 'Deleting…'
                        : 'Delete chat'}
                </button>
            </div>
        </ChatModal>
    );
}
