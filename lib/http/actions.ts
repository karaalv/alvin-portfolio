/** Restore typed failures returned by Next.js Server Actions. */
import { AgentHttpError } from '@/types/api/http/error';
import type { ServerActionResult } from '@/types/api/http/actions';

/**
 * Throw locally so UI catch points retain status and correlation
 * IDs.
 */
export function unwrapServerAction<T>(
    result: ServerActionResult<T>,
): T {
    if (result.ok) return result.data;
    throw new AgentHttpError(
        result.error.message,
        result.error.status,
        result.error.requestId,
        {
            serverReported: result.error.serverReported,
            serverErrorName: result.error.serverErrorName,
        },
    );
}
