'use server';

/** Construct the agent socket URL using server-only configuration. */
import { getAccessToken } from '@/server/auth/access-token';
import { generateUuid } from '@/lib/ids/generate';

/** Accept a host or origin, preserving local HTTP and explicit ports. */
export async function getPortfolioAgentWsUrl(): Promise<string> {
    const domain =
        process.env.PORTFOLIO_AGENT_DOMAIN?.trim();
    if (!domain)
        throw new Error(
            'PORTFOLIO_AGENT_DOMAIN is required.',
        );

    const url = new URL(
        domain.includes('://')
            ? domain
            : `https://${domain}`,
    );
    if (
        url.username ||
        url.password ||
        url.search ||
        url.hash ||
        url.pathname !== '/'
    ) {
        throw new Error(
            'PORTFOLIO_AGENT_DOMAIN must be a host or origin.',
        );
    }
    switch (url.protocol) {
        case 'https:':
        case 'wss:':
            url.protocol = 'wss:';
            break;
        case 'http:':
        case 'ws:':
            url.protocol = 'ws:';
            break;
        default:
            throw new Error(
                'Unsupported portfolio agent protocol.',
            );
    }
    url.pathname = '/api/agent/ws/agent-chat';
    const token = await getAccessToken();
    if (token) url.searchParams.set('access_token', token);
    url.searchParams.set('request_id', generateUuid());
    return url.toString();
}
