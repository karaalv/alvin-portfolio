/** Shared page structure for the portfolio and its information pages. */
import type { ReactNode } from 'react';
import Navbar from '@components/shared/Navbar';
import Contact from '@components/shared/Contact';
import styles from '@styles/layouts/site-group-layout.module.css';

/** Keep navigation above content and contact below it. */
export default function SiteLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            <div className={styles.contact}>
                <Contact />
            </div>
        </div>
    );
}
