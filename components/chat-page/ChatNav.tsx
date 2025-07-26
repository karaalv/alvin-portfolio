/**
 * @description This component is the navigation
 * and action bar for the chat page.
 */

import styles from '@styles/chat-page/ChatNav.module.css'

interface ChatNavProps {
    isOpen: boolean,
    setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatNav(
    { isOpen, setDeleteConfirm }: ChatNavProps
) {
    return (
        <div className={`
            ${styles.container} 
            ${isOpen ? styles.open : styles.closed}
        `}>
            <div className={styles.glass_container}>
                <p className={styles.section_text}>Pages</p>
                <div className={styles.link_container}>
                    <a href="/" className={styles.link_text}>
                        Portfolio
                    </a>
                    <a href="/privacy" className={styles.link_text}>
                        Privacy
                    </a>
                </div>
                <div className={styles.divider} />
                <p className={styles.section_text}>Actions</p>
                <p 
                    className={styles.danger_text} 
                    onClick={() => setDeleteConfirm(true)}
                >
                    Delete
                </p>
            </div>
        </div>
    )
}