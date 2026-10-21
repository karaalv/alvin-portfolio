/** Featured spotlight followed by the selected-work gallery. */
import type { SpotlightProps } from '@/types/components/main-page/featured-work/spotlight';
import Spotlight from './spotlight/Spotlight';
import Gallery from './gallery/Gallery';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/main-page/featured-work/featured-work.module.css';

const SPOTLIGHT: SpotlightProps = {
    title: 'Mwalika: Navigating eCitizen',
    description:
        'A conversational guide to Kenyan government services, backed by structured public data.',
    date: 'March 2026',
    href: 'https://github.com/karaalv/mwalika-documentation',
    ctaLabel: 'View on GitHub',
    mediaAlt:
        'Painted Kenyan market scene illustrating Mwalika.',
    desktopMedia: {
        videoSrc:
            '/assets/featured-work/spotlight/mwalika-desktop-loop.mp4',
        imageSrc:
            '/assets/featured-work/spotlight/mwalika-desktop.png',
    },
    mobileMedia: {
        videoSrc:
            '/assets/featured-work/spotlight/mwalika-mobile-loop.mp4',
        imageSrc:
            '/assets/featured-work/spotlight/mwalika-mobile.png',
    },
};

/** Compose the work section from typed project data. */
export default function FeaturedWork() {
    return (
        <section
            id="featured"
            aria-labelledby="featured-work-heading"
            className={styles.container}
        >
            <h2
                id="featured-work-heading"
                className={`${typography.heading} ${typography.medium} ${styles.heading}`}
            >
                Featured Work
            </h2>
            <div className={styles.content}>
                <Spotlight {...SPOTLIGHT} />
                <Gallery />
            </div>
        </section>
    );
}
