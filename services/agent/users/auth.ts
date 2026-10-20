'use server';

/**
 * Claim the visitor cookie using the access token received over
 * WebSocket.
 */
import { httpAgent } from '@/services/agent/interface';
import { requireEmptyData } from '@/lib/http/responses';
import type { HttpResponse } from '@/types/api/http/responses';

/**
 * Relay the verified backend Set-Cookie response to the
 * browser.
 */
export async function claimAccessCookie(
    claimToken: string,
    posthogSessionId?: string | null,
): Promise<HttpResponse<null>> {
    if (
        typeof claimToken !== 'string' ||
        !claimToken.trim()
    )
        throw new Error('A claim token is required.');
    return requireEmptyData(
        await httpAgent('/api/users/claim-cookie', {
            method: 'POST',
            posthogSessionId,
            data: { claim_token: claimToken },
        }),
    );
}
