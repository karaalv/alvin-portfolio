/**
 * Normalise exception values and correlate reporting runtimes.
 */
import { AgentHttpError } from '@/types/api/http/error';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';

/**
 * Preserve native stacks and avoid serialising arbitrary
 * objects.
 */
export function normaliseException(
    value: unknown,
    fallback: string,
): Error {
    if (value instanceof Error) return value;
    return new Error(
        typeof value === 'string' ? value : fallback,
    );
}

/** Expected backend rejections still produce UI feedback. */
export function isExpectedRejection(error: Error): boolean {
    return (
        error instanceof AgentHttpError &&
        error.status !== null &&
        error.status >= 400 &&
        error.status < 500
    );
}

/**
 * Keep request correlation consistent in browser and server
 * events.
 */
export function exceptionProperties(
    error: Error,
    context: ApplicationExceptionContext,
) {
    const {
        requestId,
        status,
        posthogSessionId,
        ...details
    } = context;
    const properties: Record<
        string,
        string | number | boolean | null
    > = {};
    for (const [key, value] of Object.entries(details)) {
        if (value !== undefined) properties[key] = value;
    }
    const correlatedId =
        error instanceof AgentHttpError
            ? (error.requestId ?? requestId)
            : requestId;
    const httpStatus =
        error instanceof AgentHttpError
            ? (error.status ?? status)
            : status;
    if (correlatedId) properties.request_id = correlatedId;
    if (httpStatus !== undefined && httpStatus !== null)
        properties.http_status = httpStatus;
    if (posthogSessionId)
        properties.$session_id = posthogSessionId;
    if (
        'digest' in error &&
        typeof error.digest === 'string'
    )
        properties.next_digest = error.digest;
    if (error instanceof AgentHttpError) {
        properties.server_reported = error.serverReported;
        if (error.serverErrorName)
            properties.server_error_name =
                error.serverErrorName;
    }
    return properties;
}
