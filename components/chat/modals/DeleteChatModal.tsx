/** Chat deletion confirmation, ready for later API integration. */
import type { ChatModalProps } from '@/types/components/chat/modals';
import ChatModal from './ChatModal';
import styles from '@styles/components/chat/modals/chat-modal.module.css';

/** Present the confirmation without performing a deletion. */
export default function DeleteChatModal(
    props: ChatModalProps,
) {
    return (
        <ChatModal {...props} titleId="delete-chat-heading">
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
            <div className={styles.actions}>
                <button
                    type="button"
                    className={styles.button}
                    onClick={props.onClose}
                >
                    Cancel
                </button>
                {/* TODO: Connect deletion to the chat controller. */}
                <button
                    type="button"
                    className={`${styles.button} ${styles.destructive}`}
                    disabled
                >
                    Delete chat
                </button>
            </div>
        </ChatModal>
    );
}
