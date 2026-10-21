/** Resolve server-side agent configuration for both HTTP and WebSocket calls. */
import 'server-only';

/** Return an HTTP(S) origin from a configured host or supported URL. */
export function getPortfolioAgentOrigin(): URL {
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
            url.protocol = 'https:';
            break;
        case 'http:':
        case 'ws:':
            url.protocol = 'http:';
            break;
        default:
            throw new Error(
                'Unsupported portfolio agent protocol.',
            );
    }
    return url;
}
