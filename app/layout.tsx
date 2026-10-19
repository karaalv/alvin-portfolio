'use client';
/**
 * @description Root layout for the
 * website.
 */

// React & next utilities.
import React from 'react';

// Styles.
import '@styles/shared/global.css';
import styles from '@styles/layouts/root-layout.module.css';

// Contexts.
import AppProvider from '@/contexts/AppContext';

/**
 * Root layout.
 *
 * @param children
 * @returns Root app layout
 */
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={styles.html}>
            <head>
                <title>Alvin Karanja | Portfolio</title>
                <link
                    rel="icon"
                    type="image/x-icon"
                    href="/assets/favicon-16x16.png"
                />
            </head>
            <body className={styles.body}>
                <AppProvider>{children}</AppProvider>
            </body>
        </html>
    );
}
