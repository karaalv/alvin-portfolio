/** Portfolio experience entries and their expandable rows. */
import type { ExperienceItemProps } from '@/types/components/main-page/experience';
import ExperienceItem from '@components/main-page/experience/ExperienceItem';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/main-page/experience/experience.module.css';

const EXPERIENCE: ExperienceItemProps[] = [
    {
        company: 'African Guarantee Fund',
        date: 'Sept 2026 - present',
        role: 'IT Development Intern',
        description:
            'Assisted with software and systems work within the IT ' +
            'development team, developing an understanding of how ' +
            'internal digital tools support African Guarantee Fund’s ' +
            'operations and financial services across business functions.',
    },
    {
        company: 'Tracom Services Limited',
        date: 'Aug 2023 - Sept 2023',
        role: 'Machine Learning Intern',
        description:
            'Developed AI tools for report and meeting summarisation, ' +
            'implemented contextual search across internal documents, ' +
            'and built workflows that condensed lengthy technical ' +
            'material into useful insights for business and sales teams.',
    },
    {
        company: 'Fintech Transformative Technology',
        date: 'Jul 2022 - Aug 2022',
        role: 'Backend Development Intern',
        description:
            'Developed PostgreSQL queries for multi-regional banking ' +
            'data, tested backend APIs, evaluated REST and SOAP ' +
            'integration approaches, and built Java components ' +
            'supporting complex mathematical operations within ' +
            'distributed commercial financial services systems.',
    },
];

/** Render experience in reverse chronological order. */
export default function Experience() {
    return (
        <section
            id="experience"
            aria-labelledby="experience-heading"
            className={styles.container}
        >
            <h2
                id="experience-heading"
                className={`${typography.heading} ${typography.medium} ${styles.heading}`}
            >
                Experience
            </h2>
            <ul className={styles.items}>
                {EXPERIENCE.map((item) => (
                    <ExperienceItem
                        key={item.company}
                        {...item}
                    />
                ))}
            </ul>
        </section>
    );
}
