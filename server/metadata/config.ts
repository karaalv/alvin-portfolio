/** Canonical site origin and deployment indexing policy. */
import 'server-only';

export const SITE_ORIGIN = 'https://alvinkaranja.dev';

/** Keep development, staging and previews out of search. */
export function canIndexSite(): boolean {
    if (process.env.NODE_ENV !== 'production') return false;
    const target = process.env.VERCEL_TARGET_ENV;
    const environment = process.env.VERCEL_ENV;
    const branch = process.env.VERCEL_GIT_COMMIT_REF;
    if (target && target !== 'production') return false;
    if (environment && environment !== 'production')
        return false;
    if (branch && branch !== 'main') return false;
    return true;
}
