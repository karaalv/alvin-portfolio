/** Parse individual Set-Cookie headers without splitting expiry dates. */
import type { ParsedResponseCookie } from '@/types/api/http/cookies';

/** Preserve flag attributes by presence, not by an optional string value. */
export function parseResponseCookie(
    header: string,
): ParsedResponseCookie {
    const [pair, ...attributes] = header.split(';');
    const separator = pair.indexOf('=');
    if (separator <= 0)
        throw new Error('Invalid response cookie.');
    const name = pair.slice(0, separator).trim();
    if (!name || /[\s(),;<>@:\[\]{}\/\\"?=]/.test(name)) {
        throw new Error('Invalid response cookie name.');
    }
    let value = pair.slice(separator + 1).trim();
    if (value.startsWith('"') && value.endsWith('"'))
        value = value.slice(1, -1);
    const cookie: ParsedResponseCookie = { name, value };
    for (const attribute of attributes) {
        const index = attribute.indexOf('=');
        const key = (
            index < 0
                ? attribute
                : attribute.slice(0, index)
        )
            .trim()
            .toLowerCase();
        const raw =
            index < 0
                ? ''
                : attribute.slice(index + 1).trim();
        const lower = raw.toLowerCase();
        switch (key) {
            case 'httponly':
                cookie.httpOnly = true;
                break;
            case 'secure':
                cookie.secure = true;
                break;
            case 'partitioned':
                cookie.partitioned = true;
                break;
            case 'path':
                cookie.path = raw;
                break;
            case 'domain':
                cookie.domain = raw;
                break;
            case 'expires': {
                const expires = new Date(raw);
                if (!Number.isFinite(expires.getTime()))
                    throw new Error(
                        'Invalid cookie expiry.',
                    );
                cookie.expires = expires;
                break;
            }
            case 'max-age': {
                if (
                    !/^-?\d+$/.test(raw) ||
                    !Number.isSafeInteger(Number(raw))
                )
                    throw new Error(
                        'Invalid cookie maximum age.',
                    );
                cookie.maxAge = Number(raw);
                break;
            }
            case 'samesite':
                if (
                    lower !== 'lax' &&
                    lower !== 'strict' &&
                    lower !== 'none'
                )
                    throw new Error(
                        'Invalid cookie SameSite attribute.',
                    );
                cookie.sameSite = lower;
                break;
            case 'priority':
                if (
                    lower !== 'low' &&
                    lower !== 'medium' &&
                    lower !== 'high'
                )
                    throw new Error(
                        'Invalid cookie priority.',
                    );
                cookie.priority = lower;
                break;
        }
    }
    return cookie;
}
