/**
 * @description This component is used 
 * to render the page navigation bar
 * for the main page.
 */

/**
 * @description This component renders the
 * navigation for the privacy page.
 */

import styles from '@styles/main-page/navbar/PageNav.module.css'

interface PageNavProps {
    isOpen: boolean
}

export default function PageNav(
    { isOpen }: PageNavProps
) {

    return (
        <div className={`
            ${styles.container} 
            ${isOpen ? styles.open : styles.closed}
        `}>
            <div className={styles.glass_container}>
                <p className={styles.section_text}>Pages</p>
                <div className={styles.link_container}>
                    <a href="/chat" className={styles.link_text}>
                        Chat
                    </a>
                    <a href="/privacy" className={styles.link_text}>
                        Privacy
                    </a>
                </div>
            </div>
        </div>
    )
}