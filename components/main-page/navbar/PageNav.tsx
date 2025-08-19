/**
 * @description This component is used 
 * to render the page navigation bar
 * for the main page.
 */

import styles from '@styles/main-page/navbar/PageNav.module.css'

export default function PageNav() {
    return (
        <div className={styles.container}>
            <p className={styles.section_text}>
                Pages
            </p>
            <a href="/chat" className={styles.link_text}>
                Chat
            </a>
            <a href="/privacy" className={styles.link_text}>
                Privacy
            </a>
        </div>
    )
}