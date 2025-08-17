'use client'
/**
 * @description Root layout for the
 * website.
 */

// React & next utilities.
import React from "react";
import { SpeedInsights } from '@vercel/speed-insights/next';
import { GoogleTagManager } from "@next/third-parties/google";

// Styles.
import '@styles/common/Global.css'
import styles from '@styles/common/RootLayout.module.css'

// Contexts.
import AppProvider from "@/contexts/AppContext";

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
            <head>
                <title>Alvin Karanja | Portfolio</title>
                <link rel="icon" type="image/x-icon" href="/assets/favicon-16x16.png" />
                <GoogleTagManager gtmId="GTM-W8CMJRHW"/>
            </head>
            <body className={styles.body}>
                <AppProvider>
                    {children}
                </AppProvider>
                <SpeedInsights/>
            </body>
        </html>
    )
}