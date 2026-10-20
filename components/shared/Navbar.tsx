'use client';

/** Shared desktop navigation and expandable mobile menu. */
import { ArrowUpRight, PanelLeft } from 'lucide-react';
import Link from '@/components/shared/TrackedLink';
import { useId, useState } from 'react';
import NameLogo from '@components/branding/NameLogo';
import typography from '@styles/shared/typography.module.css';
import styles from '@styles/components/shared/navbar.module.css';

const SECTIONS = [
    { label: 'Work', href: '/#featured' },
    { label: 'Experience', href: '/#experience' },
    { label: 'Links', href: '/links' },
];

/** Render homepage links and the chat entry point. */
export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const menuId = useId();

    function closeMenu() {
        setIsOpen(false);
    }

    function renderSections() {
        return SECTIONS.map((section, index) => (
            <Link
                key={section.href}
                href={section.href}
                analytics={{
                    destination:
                        section.label.toLowerCase(),
                    position: index + 1,
                    source_section: 'navbar_sections',
                    link_category: 'navigation',
                }}
                className={`${typography.body} ${typography.medium} ${styles.section_link}`}
                onClick={closeMenu}
            >
                {section.label}
            </Link>
        ));
    }

    function renderChatLink() {
        return (
            <Link
                href="/chat"
                analytics={{
                    destination: 'agent_chat',
                    position: 1,
                    source_section: 'navbar_chat',
                    link_category: 'navigation',
                }}
                className={`${typography.body} ${typography.large} ${styles.chat_link}`}
                onClick={closeMenu}
            >
                Try chat
                <ArrowUpRight
                    size={24}
                    aria-hidden="true"
                />
            </Link>
        );
    }

    return (
        <header
            className={styles.container}
            onKeyDown={(event) => {
                if (event.key === 'Escape') {
                    closeMenu();
                }
            }}
        >
            <div className={styles.content}>
                <div className={styles.logo_sections}>
                    <Link
                        href="/"
                        analytics={{
                            destination: 'portfolio',
                            position: 1,
                            source_section: 'navbar_logo',
                            link_category: 'navigation',
                        }}
                        className={styles.logo}
                        aria-label="Alvin, homepage"
                        onClick={closeMenu}
                    >
                        <NameLogo />
                    </Link>
                    <nav
                        aria-label="Main navigation"
                        className={styles.desktop_sections}
                    >
                        {renderSections()}
                    </nav>
                </div>
                <div className={styles.desktop_chat}>
                    {renderChatLink()}
                </div>
                <button
                    type="button"
                    className={styles.menu_toggle}
                    aria-label={
                        isOpen
                            ? 'Close navigation'
                            : 'Open navigation'
                    }
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    onClick={() => setIsOpen(!isOpen)}
                >
                    <PanelLeft
                        size={24}
                        aria-hidden="true"
                    />
                </button>
            </div>
            <nav
                id={menuId}
                aria-label="Mobile navigation"
                className={styles.mobile_menu}
                hidden={!isOpen}
            >
                <div className={styles.mobile_content}>
                    {renderSections()}
                    {renderChatLink()}
                </div>
            </nav>
        </header>
    );
}
