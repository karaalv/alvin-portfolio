'use client';

/** Expandable experience row with responsive header ordering. */
import { useId, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { ExperienceItemProps } from '@/types/components/main-page/experience';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/main-page/experience/experience-item.module.css';

/** Toggle a single description using the complete row header. */
export default function ExperienceItem({
    company,
    date,
    role,
    description,
}: ExperienceItemProps) {
    const [isOpen, setIsOpen] = useState(false);
    const descriptionId = useId();

    return (
        <li className={styles.container} data-open={isOpen}>
            <h3 className={styles.header_heading}>
                <button
                    type="button"
                    className={styles.header}
                    aria-expanded={isOpen}
                    aria-controls={descriptionId}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <span className={styles.title_date}>
                        <span className={styles.title}>
                            <span
                                className={`${typography.heading} ${typography.medium} ${styles.company}`}
                            >
                                {company}
                            </span>
                            <span
                                className={`${typography.body} ${styles.role}`}
                            >
                                {role}
                            </span>
                        </span>
                        <span
                            className={`${typography.body} ${styles.date}`}
                        >
                            {date}
                        </span>
                    </span>
                    <span className={styles.icon}>
                        <ChevronDown
                            size={24}
                            aria-hidden="true"
                            className={styles.chevron}
                        />
                    </span>
                </button>
            </h3>
            <div
                id={descriptionId}
                className={styles.description}
                aria-hidden={!isOpen}
            >
                <div className={styles.description_inner}>
                    <div
                        className={styles.description_body}
                    >
                        <p
                            className={`${typography.body} ${styles.description_text}`}
                        >
                            {description}
                        </p>
                    </div>
                </div>
            </div>
        </li>
    );
}
