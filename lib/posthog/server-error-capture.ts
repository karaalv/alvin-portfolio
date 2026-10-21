/**
 * Capture original server failures with request and replay
 * context.
 */
import { logApplicationException } from '@/lib/logging/console';
import 'server-only';
import { cookies } from 'next/headers';
import { decodeJwt } from 'jose';
import { getPostHogServerClient } from '@/lib/posthog/server-client';
import {
    exceptionProperties,
    isExpectedRejection,
    normaliseException,
} from '@/lib/posthog/exceptions';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';

const reported = new WeakSet<Error>();

/**
 * Flush queued telemetry before a serverless request can finish.
 */
export async function captureApplicationServerException(
    exception: unknown,
    context: ApplicationExceptionContext,
): Promise<boolean> {
    const error = normaliseException(
        exception,
        'Application server request failed.',
    );
    if (isExpectedRejection(error)) return false;
    logApplicationException(error, context, 'server');
    if (reported.has(error)) return true;
    try {
        const client = getPostHogServerClient();
        if (!client) return false;
        let userId: string | undefined;
        try {
            const token = (await cookies()).get(
                'JWT',
            )?.value;
            // Analytics attribution only; backend authentication is separate.
            if (token) userId = decodeJwt(token).sub;
        } catch {
            // Cookie failures must not replace the original exception.
        }
        reported.add(error);
        client.captureException(
            error,
            userId ??
                `request:${context.requestId ?? 'unknown'}`,
            {
                ...exceptionProperties(error, context),
                runtime: 'server',
                ...(userId
                    ? {}
                    : { $process_person_profile: false }),
            },
        );
        await client.flush();
        return true;
    } catch {
        reported.delete(error);
        console.error(
            'PostHog server exception capture failed.',
        );
        return false;
    }
}
