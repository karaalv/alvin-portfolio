/** Validate the agent's JSON envelope before endpoint-specific parsing. */
import type { HttpResponse } from '@/types/api/http/responses';

/** Require metadata and data without claiming to validate generic payloads. */
export function isHttpResponse(
    value: unknown,
): value is HttpResponse<unknown> {
    if (
        !value ||
        typeof value !== 'object' ||
        !('meta' in value) ||
        !('data' in value)
    )
        return false;
    const meta = value.meta;
    return (
        !!meta &&
        typeof meta === 'object' &&
        'request_id' in meta &&
        typeof meta.request_id === 'string' &&
        'success' in meta &&
        typeof meta.success === 'boolean' &&
        'message' in meta &&
        typeof meta.message === 'string' &&
        'timestamp' in meta &&
        typeof meta.timestamp === 'string' &&
        Number.isFinite(Date.parse(meta.timestamp))
    );
}

/** Validate endpoints whose successful response intentionally has no data. */
export function requireEmptyData(
    response: HttpResponse<unknown>,
): HttpResponse<null> {
    if (response.data !== null)
        throw new Error(
            'Expected an empty agent response.',
        );
    return { ...response, data: null };
}
