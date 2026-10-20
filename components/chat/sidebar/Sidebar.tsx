/** Persistent desktop navigation and mobile chat drawer. */
import Link from '@/components/shared/TrackedLink';
import { ArrowUpRight, PanelLeftClose } from 'lucide-react';
import NameLogo from '@components/branding/NameLogo';
import type { SidebarProps } from '@/types/components/chat/sidebar';
import styles from '@styles/components/chat/sidebar/sidebar.module.css';

/** Render chat navigation and available history actions. */
export default function Sidebar({
    open,
    onClose,
    onInfo,
    onDelete,
    deleteDisabled,
}: SidebarProps) {
    return (
        <aside
            id="chat-sidebar"
            aria-label="Chat navigation"
            className={styles.container}
            data-open={open}
        >
            <header className={styles.header}>
                <Link
                    href="/"
                    analytics={{
                        destination: 'portfolio',
                        position: 1,
                        source_section: 'chat_sidebar_logo',
                        link_category: 'navigation',
                    }}
                    aria-label="Alvin, homepage"
                    className={styles.logo}
                >
                    <NameLogo />
                </Link>
                <button
                    type="button"
                    className={styles.close}
                    aria-label="Close sidebar"
                    onClick={onClose}
                >
                    <PanelLeftClose
                        size={24}
                        aria-hidden="true"
                    />
                </button>
            </header>
            <nav
                className={styles.navigation}
                aria-label="Chat options"
            >
                <div className={styles.group}>
                    <Link
                        href="/"
                        analytics={{
                            destination: 'portfolio',
                            position: 1,
                            source_section: 'chat_sidebar',
                            link_category: 'navigation',
                        }}
                        className={styles.action}
                    >
                        Visit portfolio
                        <ArrowUpRight
                            size={24}
                            aria-hidden="true"
                        />
                    </Link>
                    <button
                        type="button"
                        className={`${styles.action} ${styles.destructive}`}
                        onClick={onDelete}
                        disabled={deleteDisabled}
                    >
                        Delete chat
                    </button>
                </div>
                <div className={styles.group}>
                    <button
                        type="button"
                        className={`${styles.action} ${styles.secondary}`}
                        onClick={onInfo}
                    >
                        Info
                    </button>
                    <Link
                        href="/privacy"
                        analytics={{
                            destination: 'privacy',
                            position: 2,
                            source_section: 'chat_sidebar',
                            link_category: 'navigation',
                        }}
                        className={`${styles.action} ${styles.secondary}`}
                    >
                        Privacy
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
