/** Root document, shared providers and default metadata. */
import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@styles/shared/global.css';
import styles from '@styles/layouts/root-layout.module.css';
import AppProvider from '@/contexts/AppContext';
import ChatProvider from '@/contexts/ChatContext';
import { createPageMetadata } from '@/server/metadata/pages';
import { SITE_ORIGIN } from '@/server/metadata/config';

export const metadata: Metadata = {
    ...createPageMetadata(
        'Alvin Karanja | Portfolio',
        'Explore Alvin Karanja’s projects, professional experience and work across software, AI and product development.',
    ),
    metadataBase: new URL(SITE_ORIGIN),
    icons: {
        icon: {
            url: '/assets/favicons/favicon-35x35.svg',
            type: 'image/svg+xml',
            sizes: 'any',
        },
        apple: {
            url: '/assets/favicons/apple-icon.png',
            type: 'image/png',
            sizes: '180x180',
        },
    },
};

/** Keep shared client state inside the server document shell. */
export default function RootLayout({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <html
            lang="en"
            className={styles.html}
            data-scroll-behavior="smooth"
        >
            <body className={styles.body}>
                <AppProvider>
                    <ChatProvider>{children}</ChatProvider>
                </AppProvider>
            </body>
        </html>
    );
}
