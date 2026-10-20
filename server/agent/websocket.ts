'use server';

/** Construct the agent socket URL using server-only configuration. */
import { getAccessToken } from '@/server/auth/access-token';
import { generateUuid } from '@/lib/ids/generate';
import { getPortfolioAgentOrigin } from '@/server/agent/origin';

/** Read the visitor cookie and preserve the configured host and port. */
export async function getPortfolioAgentWsUrl(): Promise<string> {
    const url = getPortfolioAgentOrigin();
    url.protocol =
        url.protocol === 'https:' ? 'wss:' : 'ws:';
    url.pathname = '/api/agent/ws/agent-chat';
    const token = await getAccessToken();
    if (token) url.searchParams.set('access_token', token);
    url.searchParams.set('request_id', generateUuid());
    return url.toString();
}
