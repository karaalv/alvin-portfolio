/**
 * @description This component is the navigation
 * and action bar for the chat page.
 */
import { Info } from 'lucide-react'
import styles from '@styles/chat-page/ChatNav.module.css'

interface ChatNavProps {
    setDeleteConfirm: React.Dispatch<React.SetStateAction<boolean>>
    setInfoModal: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ChatNav(
    { setDeleteConfirm, setInfoModal }: ChatNavProps
) {
    return (
        <div className={styles.container}>
            <div className={styles.main_content}>
                <p className={styles.section_text}>
                    Pages
                </p>
                <a href="/" className={styles.link_text}>
                    Portfolio
                </a>
                <a href="/privacy" className={styles.link_text}>
                    Privacy
                </a>
                <div className={styles.divider} />
                <p className={styles.section_text}>
                    Actions
                </p>
                <p
                    className={styles.danger_text}
                    onClick={() => setDeleteConfirm(true)}
                >
                    Delete
                </p>
            </div>
            <div 
                className={styles.info_container}
                onClick={() => setInfoModal(true)}
            >
                <Info />
                <p className={styles.info_text}>
                    Info
                </p>
            </div>
        </div>
    )
}