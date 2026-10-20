/**
 * Server-only HTTP transport for the Portfolio Agent service.
 */
import 'server-only';
import { cookies } from 'next/headers';
import { generateUuid } from '@/lib/ids/generate';
import { AgentHttpError } from '@/types/api/http/error';
import { isHttpResponse } from '@/lib/http/responses';
import { getPortfolioAgentOrigin } from '@/server/agent/origin';
import { getRequestOrigin } from '@/server/http/origin';
import { applyResponseCookies } from '@/server/http/cookies';
import type { HttpResponse } from '@/types/api/http/responses';
import type { HttpAgentOptions } from '@/types/services/agent/http';

/**
 * Return a validated envelope; endpoint helpers must validate
 * its data.
 */
export async function httpAgent<T = unknown>(
    endpoint: string,
    options: HttpAgentOptions = {},
): Promise<HttpResponse<T>> {
    if (
        !endpoint.startsWith('/api/') ||
        endpoint.includes('#')
    ) {
        throw new Error(
            'Agent endpoints must be relative /api/ paths.',
        );
    }
    const origin = getPortfolioAgentOrigin();
    const url = new URL(endpoint, origin);
    if (url.origin !== origin.origin)
        throw new Error('Invalid agent endpoint origin.');
    for (const [key, value] of Object.entries(
        options.query ?? {},
    ))
        url.searchParams.set(key, String(value));
    const method = options.method ?? 'GET';
    if (method === 'GET' && options.data !== undefined)
        throw new Error(
            'GET requests cannot contain a body.',
        );
    const requestHeaders = new Headers(options.headers);
    requestHeaders.set('Accept', 'application/json');
    requestHeaders.set('Origin', await getRequestOrigin());
    if (options.posthogSessionId)
        requestHeaders.set(
            'X-POSTHOG-SESSION-ID',
            options.posthogSessionId,
        );
    const requestId =
        requestHeaders.get('X-Request-ID') ||
        generateUuid();
    requestHeaders.set('X-Request-ID', requestId);
    // Forward only the service's authentication cookie, not unrelated site cookies.
    requestHeaders.delete('Cookie');
    const token = (await cookies()).get('JWT')?.value;
    if (token)
        requestHeaders.set(
            'Cookie',
            `JWT=${encodeURIComponent(token)}`,
        );
    if (options.data !== undefined)
        requestHeaders.set(
            'Content-Type',
            'application/json',
        );

    let response: Response;
    try {
        response = await fetch(url, {
            method,
            headers: requestHeaders,
            body:
                options.data === undefined
                    ? undefined
                    : JSON.stringify(options.data),
            cache: 'no-store',
            redirect: 'error',
        });
    } catch (exception) {
        throw new AgentHttpError(
            'Unable to reach the agent service.',
            null,
            requestId,
            { cause: exception },
        );
    }
    const responseRequestId =
        response.headers.get('X-Request-ID') || requestId;
    await applyResponseCookies(response.headers);
    let value: unknown;
    try {
        value = await response.json();
    } catch (exception) {
        throw new AgentHttpError(
            'The agent returned an invalid JSON response.',
            response.status,
            responseRequestId,
            { cause: exception },
        );
    }
    if (!isHttpResponse(value)) {
        throw new AgentHttpError(
            'The agent returned an invalid response envelope.',
            response.status,
            responseRequestId,
        );
    }
    if (!response.ok || !value.meta.success) {
        throw new AgentHttpError(
            value.meta.message,
            response.status,
            value.meta.request_id || responseRequestId,
        );
    }
    return value as HttpResponse<T>;
}
