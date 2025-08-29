/**
 * @description This component is used
 * to render the page navigation bar
 * for the main page.
 */
import Link from 'next/link';
import styles from '@styles/main-page/navbar/PageNav.module.css';

export default function PageNav() {
    return (
        <div className={styles.container}>
            <p className={styles.section_text}>Pages</p>
            <Link href="/chat" className={styles.link_text}>
                Chat
            </Link>
            <Link
                href="/privacy"
                className={styles.link_text}
            >
                Privacy
            </Link>
        </div>
    );
}
