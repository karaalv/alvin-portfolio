/** Inline chat error, positioned by the composer above its input. */
import { TriangleAlert, X } from 'lucide-react';
import type { ErrorBannerProps } from '@/types/components/chat/feedback';
import styles from '@styles/components/chat/feedback/error-banner.module.css';

/** Display a dismissible error without blocking the conversation. */
export default function ErrorBanner({
    title = 'Something went wrong',
    message,
    onDismiss,
}: ErrorBannerProps) {
    return (
        <div className={styles.container} role="alert">
            <TriangleAlert
                size={24}
                className={styles.icon}
                aria-hidden="true"
            />
            <div className={styles.content}>
                <p className={styles.title}>{title}</p>
                <p className={styles.message}>{message}</p>
            </div>
            <button
                type="button"
                className={styles.dismiss}
                aria-label="Dismiss error"
                onClick={onDismiss}
            >
                <X size={16} aria-hidden="true" />
            </button>
        </div>
    );
}
