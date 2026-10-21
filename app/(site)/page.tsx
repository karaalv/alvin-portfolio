/** Homepage content within the shared site layout. */
import { createPageMetadata } from '@/server/metadata/pages';
import Hero from '@components/main-page/hero/Hero';
import FeaturedWork from '@components/main-page/featured-work/FeaturedWork';
import Experience from '@components/main-page/experience/Experience';
import styles from '@styles/pages/main-page.module.css';

export const metadata = createPageMetadata(
    'Alvin Karanja | Portfolio',
    'Explore Alvin Karanja’s projects, professional experience and work across software, AI and product development.',
    '/',
);

/** Render the version 3 portfolio sections. */
export default function MainPage() {
    return (
        <div className={styles.container}>
            <Hero />
            <FeaturedWork />
            <Experience />
        </div>
    );
}
