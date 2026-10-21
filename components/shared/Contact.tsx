/** Shared contact links, social profiles and portfolio footer. */
import { ArrowUpRight } from 'lucide-react';
import Link from '@/components/shared/TrackedLink';
import Image from 'next/image';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/shared/contact.module.css';

const EXPLORE_LINKS = [
    { label: 'Featured work', href: '/#featured' },
    { label: 'Selected work', href: '/#work' },
    { label: 'Experience', href: '/#experience' },
];

const SOCIAL_LINKS = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/kara.alvin/',
        icon: '/assets/contact/png/instagram.png',
    },
    {
        label: 'TikTok',
        href: 'https://www.tiktok.com/@kara_alvin',
        icon: '/assets/contact/png/tiktok.png',
    },
    {
        label: 'X',
        href: 'https://x.com/kara_alvin',
        icon: '/assets/contact/png/x.png',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/karaalv',
        icon: '/assets/contact/png/github.png',
    },
];

/** Render responsive contact navigation and social links. */
export default function Contact() {
    const headingClass = `${typography.label} ${styles.group_heading}`;
    const linkClass = `${typography.body} ${styles.link}`;
    const actionClass = `${typography.label} ${styles.link} ${styles.action}`;

    return (
        <footer id="contact" className={styles.container}>
            <div className={styles.content}>
                <div className={styles.link_groups}>
                    <nav
                        aria-label="Get in touch"
                        className={styles.group}
                    >
                        <h2 className={headingClass}>
                            Get in touch
                        </h2>
                        <div className={styles.links}>
                            <Link
                                href="mailto:alvinnjiiri@gmail.com"
                                analytics={{
                                    destination: 'email',
                                    method: 'email',
                                    position: 1,
                                    source_section:
                                        'footer_contact',
                                    link_category:
                                        'contact',
                                }}
                                className={actionClass}
                            >
                                Email me
                                <ArrowUpRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </Link>
                            <Link
                                href="/links"
                                analytics={{
                                    destination: 'links',
                                    position: 2,
                                    source_section:
                                        'footer_contact',
                                    link_category:
                                        'navigation',
                                }}
                                className={actionClass}
                            >
                                All links
                                <ArrowUpRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </nav>
                    <nav
                        aria-label="Explore"
                        className={styles.group}
                    >
                        <h2 className={headingClass}>
                            Explore
                        </h2>
                        <div className={styles.links}>
                            {EXPLORE_LINKS.map(
                                (link, index) => (
                                    <Link
                                        key={link.href}
                                        href={link.href}
                                        analytics={{
                                            destination:
                                                link.label
                                                    .toLowerCase()
                                                    .replaceAll(
                                                        ' ',
                                                        '_',
                                                    ),
                                            position:
                                                index + 1,
                                            source_section:
                                                'footer_explore',
                                            link_category:
                                                'navigation',
                                        }}
                                        className={
                                            linkClass
                                        }
                                    >
                                        {link.label}
                                    </Link>
                                ),
                            )}
                            <Link
                                href="/chat"
                                analytics={{
                                    destination:
                                        'agent_chat',
                                    position: 4,
                                    source_section:
                                        'footer_explore',
                                    link_category:
                                        'navigation',
                                }}
                                className={actionClass}
                            >
                                Try chat
                                <ArrowUpRight
                                    size={18}
                                    aria-hidden="true"
                                />
                            </Link>
                        </div>
                    </nav>
                    <nav
                        aria-label="Terms and policies"
                        className={styles.group}
                    >
                        <h2 className={headingClass}>
                            Terms &amp; Policies
                        </h2>
                        <div className={styles.links}>
                            <Link
                                href="/privacy"
                                analytics={{
                                    destination: 'privacy',
                                    position: 1,
                                    source_section:
                                        'footer_policies',
                                    link_category:
                                        'navigation',
                                }}
                                className={linkClass}
                            >
                                Privacy Policy
                            </Link>
                        </div>
                    </nav>
                </div>
                <div className={styles.bottom}>
                    <nav
                        aria-label="Social profiles"
                        className={styles.social_links}
                    >
                        {SOCIAL_LINKS.map((link, index) => (
                            <Link
                                key={link.label}
                                href={link.href}
                                analytics={{
                                    destination:
                                        link.label.toLowerCase(),
                                    position: index + 1,
                                    source_section:
                                        'footer_social',
                                    link_category: 'social',
                                }}
                                aria-label={link.label}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={
                                    styles.social_link
                                }
                            >
                                <Image
                                    src={link.icon}
                                    alt=""
                                    width={20}
                                    height={20}
                                    sizes="20px"
                                    className={
                                        styles.social_icon
                                    }
                                />
                            </Link>
                        ))}
                    </nav>
                    <p
                        className={`${typography.body} ${styles.copyright}`}
                    >
                        © {new Date().getFullYear()} Alvin
                        Karanja
                    </p>
                </div>
            </div>
        </footer>
    );
}
