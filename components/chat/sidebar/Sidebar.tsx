/** Persistent desktop navigation and mobile chat drawer. */
import Link from 'next/link';
import { ArrowUpRight, PanelLeftClose } from 'lucide-react';
import NameLogo from '@components/branding/NameLogo';
import type { SidebarProps } from '@/types/components/chat/sidebar';
import styles from '@styles/components/chat/sidebar/sidebar.module.css';

/** Expose presentation controls while chat actions remain unwired. */
export default function Sidebar({
    open,
    onClose,
    onInfo,
    onDelete,
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
                        className={`${styles.action} ${styles.secondary}`}
                    >
                        Privacy
                    </Link>
                </div>
            </nav>
        </aside>
    );
}
