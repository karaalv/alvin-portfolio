'use client';

/**
 * Accessible dialog shell shared by the chat's visual modals.
 */
import { useEffect, useRef, type ReactNode } from 'react';
import { X } from 'lucide-react';
import type { ChatModalProps } from '@/types/components/chat/modals';
import styles from '@styles/components/chat/modals/chat-modal.module.css';

/**
 * Use the native dialog layer for focus, Escape and the
 * backdrop.
 */
export default function ChatModal({
    open,
    onClose,
    titleId,
    dismissible = true,
    children,
}: ChatModalProps & {
    titleId: string;
    dismissible?: boolean;
    children: ReactNode;
}) {
    const ref = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = ref.current;
        if (!dialog) return;
        if (open && !dialog.open) dialog.showModal();
        else if (!open && dialog.open) dialog.close();
    }, [open]);
    return (
        <dialog
            ref={ref}
            className={styles.dialog}
            aria-labelledby={titleId}
            onCancel={(event) => {
                event.preventDefault();
                if (dismissible) onClose();
            }}
            onClose={onClose}
        >
            <div className={styles.header}>
                <button
                    type="button"
                    className={styles.close}
                    aria-label="Close dialog"
                    onClick={onClose}
                    disabled={!dismissible}
                >
                    <X size={20} aria-hidden="true" />
                </button>
            </div>
            <div className={styles.content}>{children}</div>
        </dialog>
    );
}
