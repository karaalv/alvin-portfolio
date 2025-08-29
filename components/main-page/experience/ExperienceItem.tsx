/**
 * @description This component is the common
 * style and layout for all experience items.
 */

import styles from '@styles/main-page/experience/ExperienceItem.module.css';
import fonts from '@styles/common/Typography.module.css';

interface ExperienceItemProps {
    company: string;
    date: string;
    role: string;
    description: string[];
}

export default function ExperienceItem({
    company,
    date,
    role,
    description,
}: ExperienceItemProps) {
    const renderDescription = () => {
        return description.map((item, index) => (
            <li key={index} className={fonts.body}>
                {item}
            </li>
        ));
    };

    return (
        <div className={styles.container}>
            <div className={styles.sub_container}>
                <div className={styles.header}>
                    <p className={styles.company_font}>
                        {company}
                    </p>
                    <p className={styles.date_font}>
                        {date}
                    </p>
                </div>
                <div className={styles.content}>
                    <p className={styles.role_font}>
                        {role}
                    </p>
                    <ul className={styles.description}>
                        {renderDescription()}
                    </ul>
                </div>
            </div>
            <div className={styles.divider} />
        </div>
    );
}
