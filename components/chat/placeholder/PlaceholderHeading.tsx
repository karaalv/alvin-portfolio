/** Heading shown above the input before a conversation begins. */
import type { PlaceholderHeadingProps } from '@/types/components/chat/placeholder';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/chat/placeholder/placeholder-heading.module.css';

/** Collapse the empty-state heading alongside the composer transition. */
export default function PlaceholderHeading({
    visible = true,
}: PlaceholderHeadingProps) {
    return (
        <div
            className={styles.container}
            data-visible={visible}
            aria-hidden={!visible}
        >
            <div className={styles.clip}>
                <h1
                    className={`${typography.heading} ${typography.medium} ${styles.title}`}
                >
                    Get to know Alvin.
                </h1>
            </div>
        </div>
    );
}
