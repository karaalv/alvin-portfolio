/** Relay backend cookie updates through the frontend server response. */
import 'server-only';
import { cookies } from 'next/headers';
import { parseResponseCookie } from '@/lib/http/cookies';

/** Call inside a Server Action or Route Handler when cookies are returned. */
export async function applyResponseCookies(
    headers: Headers,
): Promise<void> {
    const parsed = headers
        .getSetCookie()
        .map(parseResponseCookie);
    if (parsed.length === 0) return;
    const store = await cookies();
    for (const cookie of parsed) store.set(cookie);
}
