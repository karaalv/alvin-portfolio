'use server';

/** Read the visitor token from incoming application cookies. */
import { cookies } from 'next/headers';
import { runAgentServerAction } from '@/server/agent/actions';
import type { ServerActionResult } from '@/types/api/http/actions';

/** Return a browser snapshot of the saved access token. */
export async function getAccessToken(): Promise<
    ServerActionResult<string | null>
> {
    return runAgentServerAction(
        async () =>
            (await cookies()).get('JWT')?.value || null,
        {
            source: 'authentication',
            operation: 'read-cookie',
        },
    );
}
