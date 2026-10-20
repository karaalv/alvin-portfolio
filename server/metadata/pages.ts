/** Package page metadata consistently across public routes. */
import 'server-only';
import type { Metadata } from 'next';
import { canIndexSite } from '@/server/metadata/config';

/** Share approved copy with search and social preview tags. */
export function createPageMetadata(
    title: string,
    description: string,
    path?: string,
): Metadata {
    const index = canIndexSite();
    return {
        title,
        description,
        ...(path
            ? { alternates: { canonical: path } }
            : {}),
        robots: { index, follow: index },
        openGraph: {
            title,
            description,
            ...(path ? { url: path } : {}),
            siteName: 'Alvin Karanja',
            locale: 'en_GB',
            type: 'website',
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
        },
    };
}
