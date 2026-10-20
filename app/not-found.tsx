/** Root 404 content with the shared site navigation and contact. */
import type { Metadata } from 'next';
import { createPageMetadata } from '@/server/metadata/pages';
import { canIndexSite } from '@/server/metadata/config';
import SiteLayout from '@components/shared/SiteLayout';
import styles from '@styles/pages/not-found-page.module.css';
import typography from '@styles/shared/typography.module.css';

export const metadata: Metadata = {
    ...createPageMetadata(
        'Page Not Found | Alvin Karanja',
        'This page could not be found. Return to Alvin Karanja’s portfolio to explore his work.',
    ),
    alternates: { canonical: null },
    robots: { index: false, follow: canIndexSite() },
};

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
