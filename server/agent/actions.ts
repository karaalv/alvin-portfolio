/** Report server failures and preserve safe correlation data. */
import 'server-only';
import { generateUuid } from '@/lib/ids/generate';
import { captureApplicationServerException } from '@/lib/posthog/server-error-capture';
import { normaliseException } from '@/lib/posthog/exceptions';
import { AgentHttpError } from '@/types/api/http/error';
import type { ServerActionResult } from '@/types/api/http/actions';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';

/**
 * Keep server stacks private while retaining request IDs in
 * production.
 */
export async function runAgentServerAction<T>(
    operation: (requestId: string) => Promise<T>,
    context: ApplicationExceptionContext,
): Promise<ServerActionResult<T>> {
    const requestId = generateUuid();
    try {
        return {
            ok: true,
            data: await operation(requestId),
        };
    } catch (exception) {
        const error = normaliseException(
            exception,
            'Application server request failed.',
        );
        const correlatedId =
            error instanceof AgentHttpError
                ? (error.requestId ?? requestId)
                : requestId;
        const status =
            error instanceof AgentHttpError
                ? error.status
                : null;
        const serverReported =
            await captureApplicationServerException(error, {
                ...context,
                requestId: correlatedId,
                status,
            });
        return {
            ok: false,
            error: {
                message:
                    error instanceof AgentHttpError
                        ? error.message
                        : 'The application server could not complete the request.',
                requestId: correlatedId,
                status,
                serverErrorName: error.name,
                serverReported,
            },
        };
    }
}
