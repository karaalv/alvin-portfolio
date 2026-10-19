/** Independent links layout with responsive voxel scenery. */
import type { ReactNode } from 'react';
import styles from '@styles/layouts/links-layout.module.css';

/** Centre the links card without the shared site navigation. */
export default function LinksLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <main className={styles.container}>{children}</main>
    );
}
