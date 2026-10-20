'use server';

/** Delete the authenticated visitor's stored agent memory. */
import { httpAgent } from '@/services/agent/interface';
import { requireEmptyData } from '@/lib/http/responses';
import type { HttpResponse } from '@/types/api/http/responses';

/** Let the backend derive ownership from the forwarded JWT cookie. */
export async function deleteAgentMemory(): Promise<
    HttpResponse<null>
> {
    return requireEmptyData(
        await httpAgent('/api/agent-memory/delete-memory', {
            method: 'DELETE',
        }),
    );
}
