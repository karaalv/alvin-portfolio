/** Social profiles and portfolio entry points on one links card. */
import Image from 'next/image';
import Link from '@/components/shared/TrackedLink';
import { ArrowUpRight } from 'lucide-react';
import type { LinksPageItem } from '@/types/pages/links';
import styles from '@styles/pages/links-page.module.css';

const LINKS: LinksPageItem[] = [
    {
        title: 'Instagram',
        subtitle: '@kara.alvin',
        href: 'https://www.instagram.com/kara.alvin/',
        icon: '/assets/links/icons/svg/instagram.svg',
        external: true,
    },
    {
        title: 'TikTok',
        subtitle: '@kara_alvin',
        href: 'https://www.tiktok.com/@kara_alvin',
        icon: '/assets/links/icons/svg/tiktok.svg',
        external: true,
    },
    {
        title: 'X',
        subtitle: '@kara_alvin',
        href: 'https://x.com/kara_alvin',
        icon: '/assets/links/icons/svg/x.svg',
        external: true,
    },
    {
        title: 'Talk to my agent',
        subtitle: 'Ask about my work',
        href: '/chat',
        icon: '/assets/links/icons/svg/message-bubble.svg',
    },
];

/** Render one destination, with a divider only before the next item. */
function renderLink(item: LinksPageItem, index: number) {
    return (
        <li key={item.href} className={styles.item}>
            <Link
                href={item.href}
                analytics={{
                    destination:
                        item.title === 'Talk to my agent'
                            ? 'agent_chat'
                            : item.title.toLowerCase(),
                    position: index + 1,
                    source_section: 'links_list',
                    link_category: item.external
                        ? 'social'
                        : 'navigation',
                }}
                target={
                    item.external ? '_blank' : undefined
                }
                rel={
                    item.external
                        ? 'noopener noreferrer'
                        : undefined
                }
                className={styles.link}
            >
                <Image
                    src={item.icon}
                    alt=""
                    width={50}
                    height={50}
                    className={styles.icon}
                />
                <span className={styles.text}>
                    <span className={styles.title}>
                        {item.title}
                    </span>
                    <span className={styles.subtitle}>
                        {item.subtitle}
                    </span>
                </span>
            </Link>
            {index < LINKS.length - 1 && (
                <div
                    className={styles.divider}
                    aria-hidden="true"
                />
            )}
        </li>
    );
}

/** Render the links card with a separate portfolio action. */
export default function LinksPage() {
    return (
        <section
            className={styles.card}
            aria-labelledby="links-heading"
        >
            <div className={styles.main}>
                <h1
                    id="links-heading"
                    className={styles.heading}
                >
                    The link in the bio.
                </h1>
                <nav
                    aria-label="Social profiles and agent"
                    className={styles.navigation}
                >
                    <ul className={styles.links}>
                        {LINKS.map(renderLink)}
                    </ul>
                </nav>
            </div>
            <Link
                href="/"
                className={styles.portfolio}
                analytics={{
                    destination: 'portfolio',
                    position: LINKS.length + 1,
                    source_section: 'links_portfolio',
                    link_category: 'navigation',
                }}
            >
                View Portfolio
                <ArrowUpRight
                    size={32}
                    aria-hidden="true"
                />
            </Link>
        </section>
    );
}
