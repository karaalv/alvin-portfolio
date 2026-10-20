/** Independent links layout with responsive voxel scenery. */
import { createPageMetadata } from '@/server/metadata/pages';
import type { ReactNode } from 'react';
import styles from '@styles/layouts/links-layout.module.css';

export const metadata = createPageMetadata(
    'Find Alvin Karanja Online',
    'Follow Alvin’s thoughts on technology and entrepreneurship, explore his projects and connect across platforms.',
    '/links',
);

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
