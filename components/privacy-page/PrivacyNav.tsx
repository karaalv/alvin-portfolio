/**
 * @description This component renders the
 * navigation for the privacy page.
 */

import styles from '@styles/privacy-page/PrivacyNav.module.css'

export default function PrivacyNav() {

    return (
        <div className={styles.container}>
            <p className={styles.section_text}>
                Pages
            </p>
            <a href="/" className={styles.link_text}>
                Portfolio
            </a>
            <a href="/chat" className={styles.link_text}>
                Chat
            </a>
        </div>
    )
}