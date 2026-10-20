'use server';

/**
 * Construct the agent socket URL using server-only
 * configuration.
 */
import { cookies } from 'next/headers';
import { runAgentServerAction } from '@/server/agent/actions';
import type { ServerActionResult } from '@/types/api/http/actions';
import { getPortfolioAgentOrigin } from '@/server/agent/origin';

/**
 * Read the visitor cookie and preserve the configured host and
 * port.
 */
export async function getPortfolioAgentWsUrl(
    posthogSessionId?: string | null,
): Promise<ServerActionResult<string>> {
    return runAgentServerAction(
        async (requestId) => {
            const url = getPortfolioAgentOrigin();
            url.protocol =
                url.protocol === 'https:' ? 'wss:' : 'ws:';
            url.pathname = '/api/agent/ws/agent-chat';
            const token = (await cookies()).get(
                'JWT',
            )?.value;
            if (token)
                url.searchParams.set('access_token', token);
            url.searchParams.set('request_id', requestId);
            if (posthogSessionId)
                url.searchParams.set(
                    'session_id',
                    posthogSessionId,
                );
            return url.toString();
        },
        {
            source: 'websocket',
            operation: 'prepare-url',
            posthogSessionId,
        },
    );
}
