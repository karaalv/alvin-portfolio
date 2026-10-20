/** Recover the frontend origin required by the agent's origin guard. */
import 'server-only';
import { headers } from 'next/headers';

/** Forward the browser Origin, or reconstruct it for a server-rendered call. */
export async function getRequestOrigin(): Promise<string> {
    const incoming = await headers();
    const origin = incoming.get('origin');
    if (origin) return new URL(origin).origin;
    const host = (
        incoming.get('x-forwarded-host') ||
        incoming.get('host')
    )
        ?.split(',')[0]
        .trim();
    const protocol =
        incoming
            .get('x-forwarded-proto')
            ?.split(',')[0]
            .trim() ||
        (process.env.NODE_ENV === 'development'
            ? 'http'
            : 'https');
    if (
        !host ||
        (protocol !== 'http' && protocol !== 'https')
    ) {
        throw new Error(
            'Unable to determine the frontend origin.',
        );
    }
    return new URL(`${protocol}://${host}`).origin;
}
