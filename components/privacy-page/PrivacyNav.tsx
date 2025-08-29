/**
 * @description This component renders the
 * navigation for the privacy page.
 */
import Link from 'next/link';
import styles from '@styles/privacy-page/PrivacyNav.module.css';

export default function PrivacyNav() {
    return (
        <div className={styles.container}>
            <p className={styles.section_text}>Pages</p>
            <Link href="/" className={styles.link_text}>
                Portfolio
            </Link>
            <Link href="/chat" className={styles.link_text}>
                Chat
            </Link>
        </div>
    );
}
