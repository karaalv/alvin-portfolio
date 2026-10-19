/** Apply shared navigation and contact to the site route group. */
import type { ReactNode } from 'react';
import SiteLayout from '@components/shared/SiteLayout';

/** Wrap site pages without changing their public URLs. */
export default function SiteGroupLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <SiteLayout>{children}</SiteLayout>;
}
