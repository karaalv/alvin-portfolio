/**
 * @description 404 Not Found Page.
 */

import Contact from '@components/main-page/contact/Contact'

import styles from '@styles/pages/NotFoundPage.module.css'
import fonts from '@styles/common/Typography.module.css'

export default function NotFoundPage() {
    return (
        <div className={styles.page_container}>
            <div className={styles.content_container}>
                {/* Header */}
                <div className={styles.header_container}>
                    <p className={fonts.sub_heading}>
                        404
                    </p>
                    <div className={styles.divider}></div>
                    <p className={fonts.sub_heading}>
                        Page not found.
                    </p>
                </div>
                {/* Text */}
                <p className={fonts.body}>
                    Looks like the page you are looking for doesn&apos;t
                    exist, you can explore my portfolio at these pages:
                </p>
                {/* Links */}
                <div className={styles.link_container}>
                    <a href="/" className={styles.link_text}>Portfolio</a>
                    <a href="/chat" className={styles.link_text}>Chat</a>
                </div>
            </div>
            <div className={styles.contact_container}>
                <Contact />
            </div>
        </div>
    );
}