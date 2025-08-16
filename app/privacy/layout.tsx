'use client'
/**
 * @description Layout for the privacy page.
 * This is used to wrap the privacy page
 * with necessary providers and styles.
 */

// Contexts.
import ResponsiveProvider from '@contexts/ResponsiveContext'

export default function PrivacyLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <ResponsiveProvider>
            {children}
        </ResponsiveProvider>
    )
}