/** List canonical public pages without tracking parameters. */
import type { MetadataRoute } from 'next';
import {
    canIndexSite,
    SITE_ORIGIN,
} from '@/server/metadata/config';

/** Exclude non-production builds, redirects and error pages. */
export default function sitemap(): MetadataRoute.Sitemap {
    if (!canIndexSite()) return [];
    return ['/', '/links', '/chat', '/privacy'].map(
        (path) => ({
            url: new URL(path, SITE_ORIGIN).href,
        }),
    );
}
