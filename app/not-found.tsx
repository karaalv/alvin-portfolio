/** Root 404 content with the shared site navigation and contact. */
import SiteLayout from '@components/shared/SiteLayout';
import styles from '@styles/pages/not-found-page.module.css';
import typography from '@styles/shared/typography.module.css';

/** Render the Figma not-found heading for unmatched routes. */
export default function NotFoundPage() {
    return (
        <SiteLayout>
            <section className={styles.container}>
                <h1
                    className={`${typography.heading} ${typography.large} ${styles.title}`}
                >
                    Page not found.
                </h1>
            </section>
        </SiteLayout>
    );
}
