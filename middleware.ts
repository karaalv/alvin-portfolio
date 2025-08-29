/**
 * @description Middleware for handling
 * user sessions for API requests.
 */
import { NextResponse, NextRequest } from 'next/server';
import { getUserSession } from '@services/interface';

const BOTS =
    /(bot|crawler|spider|crawling|preview|facebookexternalhit|slackbot|twitterbot|whatsapp|discord|linkedinbot)/i;

export default async function middleware(
    request: NextRequest,
) {
    // --- Checks before session creation ---

    // Skip non page requests
    if (!['GET', 'HEAD'].includes(request.method)) {
        return NextResponse.next();
    }

    // Skip prefetch requests
    const isPrefetch =
        request.headers.get('x-middleware-prefetch') ===
            '1' ||
        request.headers.get('purpose') === 'prefetch' ||
        request.headers.get('sec-purpose') === 'prefetch';
    if (isPrefetch) return NextResponse.next();

    // Skip non html requests
    const accept = request.headers.get('accept') || '';
    const isDocument = accept.includes('text/html');
    if (!isDocument) return NextResponse.next();

    // Skip bots
    const userAgent =
        request.headers.get('user-agent') || '';
    const isBot = BOTS.test(userAgent);
    if (isBot) return NextResponse.next();

    // Check for existing session cookies
    const hasUuid = request.cookies.has('UUID');
    const hasJwt = request.cookies.has('JWT');
    if (hasUuid && hasJwt) return NextResponse.next();

    // If no current session create session
    // and set cookies
    const res = NextResponse.next();

    try {
        const session = await getUserSession();
        const setCookie =
            session.headers.get('set-cookie') || '';
        res.headers.append('set-cookie', setCookie);
    } catch {
        // Pass through errors
    }
    return res;
}

export const config = {
    // Exclude paths from middleware, especially API and static files
    matcher: [
        '/((?!api|_next|favicon.ico|robots.txt|sitemap.xml|assets|images|fonts).*)',
    ],
};
