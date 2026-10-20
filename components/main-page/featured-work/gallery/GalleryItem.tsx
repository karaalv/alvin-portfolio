/** Selected-work card with live text over decorative artwork. */
import Link from '@/components/shared/TrackedLink';
import { getImageProps } from 'next/image';
import type { GalleryItemProps } from '@/types/components/main-page/featured-work/gallery-item';
import styles from '@styles/components/main-page/featured-work/gallery/gallery-item.module.css';

/** Render a single link with distinct artwork and website titles. */
export default function GalleryItem({
    work,
    position,
    cardTitle,
    cardLabel,
    tag,
    date,
    href,
    backgroundImage,
}: GalleryItemProps) {
    const { props: image } = getImageProps({
        src: backgroundImage,
        width: 175,
        height: 175,
        alt: '',
    });

    return (
        <li>
            <Link
                href={href}
                analytics={{
                    destination: work
                        .toLowerCase()
                        .replaceAll(' ', '_'),
                    project: work
                        .toLowerCase()
                        .replaceAll(' ', '_'),
                    position: position ?? 1,
                    source_section: 'featured_gallery',
                    link_category: 'project',
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${work}: ${cardLabel}`}
                className={styles.container}
            >
                <div
                    className={styles.media}
                    style={{
                        backgroundImage: `url("${image.src}")`,
                    }}
                    aria-hidden="true"
                >
                    <span className={styles.card_title}>
                        {cardTitle}
                    </span>
                </div>
                <div className={styles.info}>
                    <h3 className={styles.card_label}>
                        {cardLabel}
                    </h3>
                    <div className={styles.metadata}>
                        <span className={styles.tag}>
                            {tag}
                        </span>
                        <span className={styles.date}>
                            {date}
                        </span>
                    </div>
                </div>
            </Link>
        </li>
    );
}
