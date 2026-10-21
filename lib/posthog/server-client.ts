/** Own the optional Node SDK without importing browser code. */
import 'server-only';
import { PostHog } from 'posthog-node';

let client: PostHog | null = null;

/**
 * Reuse one SDK client; reporting explicitly flushes per
 * failure.
 */
export function getPostHogServerClient(): PostHog | null {
    const token =
        process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN;
    const host = process.env.NEXT_PUBLIC_POSTHOG_HOST;
    if (!token || !host) return null;
    client ??= new PostHog(token, {
        host,
        flushAt: 1,
        flushInterval: 0,
        requestTimeout: 3000,
        fetchRetryCount: 0,
        enableExceptionAutocapture: false,
    });
    return client;
}
