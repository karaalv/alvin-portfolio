/*** Webpage Root Layout ***/

/* Imports */

// React & next utilities.
import React from "react";
import { Metadata } from "next";
import { SpeedInsights } from '@vercel/speed-insights/next';

// Styles.
import '@/styles/Globals.css'
import styles from '@/styles/RootLayout.module.css'

// Export metadata.
export const metadata: Metadata = {
    title: 'Alvin Karanja | Portfolio',
    icons: {
        icon: '/assets/favicon-16x16.png'
    }
}

/**
 * Root layout.
 * 
 * @param children 
 * @returns Root app layout
 */
export default function RootLayout(
    {children}: {children: React.ReactNode}
){
    return(
        <html lang="en" className={styles.html}>
            <body className={styles.body}>
                {children}
                <SpeedInsights/>
            </body>
        </html>
    )
}