/** Privacy policy using the documentation copy and shared site layout. */
import { createPageMetadata } from '@/server/metadata/pages';
import ReactMarkdown from 'react-markdown';
import { PRIVACY_POLICY_SECTIONS } from './content';
import styles from '@styles/pages/privacy-page.module.css';
import typography from '@styles/shared/typography.module.css';

export const metadata = createPageMetadata(
    'Privacy Policy | Alvin Karanja',
    'How Alvin Karanja’s portfolio handles chat data, cookies, analytics and privacy requests.',
    '/privacy',
);

/** Render the policy as readable sections without tables. */
export default function PrivacyPage() {
    return (
        <article className={styles.container}>
            <header className={styles.header}>
                <h1
                    className={`${typography.heading} ${typography.large} ${styles.title}`}
                >
                    Privacy Policy.
                </h1>
                <p
                    className={`${typography.label} ${typography.large} ${styles.updated}`}
                >
                    Draft · Last reviewed{' '}
                    <time dateTime="2026-10-19">
                        19 October 2026
                    </time>
                </p>
            </header>
            {PRIVACY_POLICY_SECTIONS.map(
                (section, index) => (
                    <section
                        key={section.heading}
                        aria-labelledby={`privacy-section-${index + 1}`}
                        className={styles.section}
                    >
                        <h2
                            id={`privacy-section-${index + 1}`}
                            className={`${typography.heading} ${typography.medium} ${styles.section_heading}`}
                        >
                            {section.heading}
                        </h2>
                        <div
                            className={`${typography.body} ${typography.medium} ${styles.body}`}
                        >
                            <ReactMarkdown>
                                {section.content}
                            </ReactMarkdown>
                        </div>
                    </section>
                ),
            )}
        </article>
    );
}
