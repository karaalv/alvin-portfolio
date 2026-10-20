/** Package page metadata consistently across public routes. */
import 'server-only';
import type { Metadata } from 'next';
import { canIndexSite } from '@/server/metadata/config';

const previewImage = {
    url: '/assets/media/preview-image.png',
    width: 1200,
    height: 630,
    alt: 'Alvin Karanja and alvinkaranja.dev surrounded by colourful painted brushstrokes.',
};

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
            images: [previewImage],
        },
        twitter: {
            card: 'summary_large_image',
            title,
            description,
            images: [previewImage],
        },
    };
}
