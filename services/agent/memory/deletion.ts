'use server';

/** Delete the authenticated visitor's stored agent memory. */
import { runAgentServerAction } from '@/server/agent/actions';
import type { ServerActionResult } from '@/types/api/http/actions';
import { httpAgent } from '@/services/agent/interface';
import { requireEmptyData } from '@/lib/http/responses';
import type { HttpResponse } from '@/types/api/http/responses';

/**
 * Let the backend derive ownership from the forwarded JWT
 * cookie.
 */
export async function deleteAgentMemory(
    posthogSessionId?: string | null,
): Promise<ServerActionResult<HttpResponse<null>>> {
    return runAgentServerAction(
        async (requestId) => {
            return requireEmptyData(
                await httpAgent(
                    '/api/agent-memory/delete-memory',
                    {
                        method: 'DELETE',
                        posthogSessionId,
                        headers: {
                            'X-Request-ID': requestId,
                        },
                    },
                ),
            );
        },
        {
            source: 'chat-history',
            operation: 'delete-memory',
            endpoint: '/api/agent-memory/delete-memory',
            method: 'DELETE',
            posthogSessionId,
        },
    );
}
