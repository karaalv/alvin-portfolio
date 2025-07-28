'use client'
/**
 * @description Layout for the privacy page.
 * This is used to wrap the privacy page
 * with necessary providers and styles.
 */

// Contexts.
import AppProvider from '@/contexts/AppContext'
import ResponsiveProvider from '@contexts/ResponsiveContext'

export default function PrivacyLayout(
    { children }: { children: React.ReactNode }
) {
    return (
        <AppProvider>
            <ResponsiveProvider>
                {children}
            </ResponsiveProvider>
        </AppProvider>
    )
}