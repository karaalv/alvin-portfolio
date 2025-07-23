/**
 * @description This component renders the
 * navigation for the privacy page.
 */

import styles from '@styles/privacy-page/PrivacyNav.module.css'

interface PrivacyNavProps {
    isOpen: boolean
}

export default function PrivacyNav(
    { isOpen }: PrivacyNavProps
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
                    <a href="/chat" className={styles.link_text}>
                        Chat
                    </a>
                </div>
            </div>
        </div>
    )
}