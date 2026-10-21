/** Publish crawl rules and the production sitemap location. */
import type { MetadataRoute } from 'next';
import {
    canIndexSite,
    SITE_ORIGIN,
} from '@/server/metadata/config';

/** Allow crawling so non-production noindex tags remain visible. */
export default function robots(): MetadataRoute.Robots {
    return {
        rules: { userAgent: '*', allow: '/' },
        ...(canIndexSite()
            ? { sitemap: `${SITE_ORIGIN}/sitemap.xml` }
            : {}),
    };
}
