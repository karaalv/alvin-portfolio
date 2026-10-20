/** Resolve bounded source labels without capturing raw URLs. */
import type {
    NavigationContext,
    SourcePlatform,
} from '@/types/posthog/navigation';

const STORAGE_KEY = 'portfolio:source-platform';
const SOURCES: Record<string, SourcePlatform> = {
    ig: 'instagram',
    instagram: 'instagram',
    tt: 'tiktok',
    tiktok: 'tiktok',
    x: 'x',
    twitter: 'x',
    linkedin: 'linkedin',
    youtube: 'youtube',
    google: 'google',
};
const HOSTS: Record<string, SourcePlatform> = {
    'instagram.com': 'instagram',
    'tiktok.com': 'tiktok',
    'x.com': 'x',
    'twitter.com': 'x',
    't.co': 'x',
    'linkedin.com': 'linkedin',
    'lnkd.in': 'linkedin',
    'youtube.com': 'youtube',
    'youtu.be': 'youtube',
    'google.com': 'google',
};
const VALID_SOURCES = new Set<SourcePlatform>([
    ...Object.values(SOURCES),
    'other',
    'direct_or_unknown',
]);
let source: SourcePlatform | undefined;

/** Classify only known referrer hosts, not arbitrary strings. */
function referrerSource(): SourcePlatform | undefined {
    if (!document.referrer) return;
    try {
        const referrer = new URL(document.referrer);
        if (referrer.origin === window.location.origin)
            return;
        for (const [host, platform] of Object.entries(
            HOSTS,
        )) {
            if (
                referrer.hostname === host ||
                referrer.hostname.endsWith(`.${host}`)
            )
                return platform;
        }
        return 'other';
    } catch {
        return;
    }
}

/** Preserve acquisition across internal navigation in this tab. */
export function getNavigationContext(): NavigationContext {
    if (typeof window === 'undefined')
        return {
            source_platform: 'direct_or_unknown',
            page_type: 'other',
            source_page: 'other',
        };
    const url = new URL(window.location.href);
    const utm = url.searchParams
        .get('utm_source')
        ?.trim()
        .toLowerCase();
    if (utm)
        source = Object.hasOwn(SOURCES, utm)
            ? SOURCES[utm]
            : 'other';
    if (!source) {
        source = referrerSource();
        if (!source) {
            try {
                const stored = sessionStorage.getItem(
                    STORAGE_KEY,
                ) as SourcePlatform | null;
                if (stored && VALID_SOURCES.has(stored))
                    source = stored;
            } catch {
                // Storage can be unavailable in restricted browsers.
            }
        }
    }
    source ??= 'direct_or_unknown';
    try {
        sessionStorage.setItem(STORAGE_KEY, source);
    } catch {
        // In-memory attribution still survives client navigation.
    }
    const path = url.pathname.replace(/\/$/, '') || '/';
    const pages = {
        '/': 'portfolio',
        '/links': 'links',
        '/chat': 'chat',
        '/privacy': 'privacy',
    } as const;
    const sourcePage =
        path in pages
            ? (path as keyof typeof pages)
            : 'other';
    return {
        source_platform: source,
        page_type:
            sourcePage === 'other'
                ? 'other'
                : pages[sourcePage],
        source_page: sourcePage,
    };
}
