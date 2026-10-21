/** Grid of selected projects and their documented card content. */
import type { GalleryItemProps } from '@/types/components/main-page/featured-work/gallery-item';
import GalleryItem from './GalleryItem';
import styles from '@styles/components/main-page/featured-work/gallery/gallery.module.css';

const ITEMS: GalleryItemProps[] = [
    {
        work: 'Kenya eCitizen Services Dataset',
        cardTitle: '286 agencies ·\n27 ministries',
        cardLabel:
            '5,489 eCitizen services, structured for research',
        tag: 'Data',
        date: 'Feb 2026',
        href: 'https://www.kaggle.com/datasets/alvinkaranja/kenya-ecitizen-services-dataset-february-2026',
        backgroundImage:
            '/assets/featured-work/gallery/dataset-painted.png',
    },
    {
        work: 'Portfolio Agent',
        cardTitle: 'Custom\ncontextual\nretrieval',
        cardLabel: 'A chat agent for my portfolio',
        tag: 'AI',
        date: 'Mar 2026',
        href: 'https://github.com/karaalv/portfolio-agent',
        backgroundImage:
            '/assets/featured-work/gallery/portfolio-agent-painted.png',
    },
    {
        work: 'Gatsby',
        cardTitle: 'Ethereum\n× IPFS',
        cardLabel: 'Verifiable tickets in a mobile app',
        tag: 'Blockchain',
        date: 'Aug 2024',
        href: 'https://github.com/karaalv/Gatsby-Public',
        backgroundImage:
            '/assets/featured-work/gallery/gatsby-painted.png',
    },
    {
        work: 'Warwick Racing',
        cardTitle: 'FSUK 2024 ·\n9th in EV class',
        cardLabel: 'Electrical systems for a racing EV',
        tag: 'Engineering',
        date: 'Jul 2024',
        href: 'https://www.linkedin.com/feed/update/urn:li:activity:7227297553308897282/',
        backgroundImage:
            '/assets/featured-work/gallery/warwick-racing-painted.png',
    },
    {
        work: 'Getaway',
        cardTitle: 'Deterministic\ntraffic ·\nvoxel art',
        cardLabel: 'A 3D driving game for browsers',
        tag: 'Game',
        date: 'Jan 2024',
        href: 'https://github.com/karaalv/Getaway',
        backgroundImage:
            '/assets/featured-work/gallery/getaway-painted.png',
    },
];

/** Render the responsive selected-work grid. */
export default function Gallery() {
    return (
        <ul
            id="work"
            aria-label="Selected work"
            className={styles.container}
        >
            {ITEMS.map((item, index) => (
                <GalleryItem
                    key={item.work}
                    {...item}
                    position={index + 1}
                />
            ))}
        </ul>
    );
}
