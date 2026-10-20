'use server';

/**
 * Retrieve visible chat history for the visitor's authenticated
 * identity.
 */
import { httpAgent } from '@/services/agent/interface';
import { parseAgentChatMemories } from '@/lib/agent/memory';
import type { HttpResponse } from '@/types/api/http/responses';
import type { AgentChatMemory } from '@/types/services/agent/memory';

/**
 * Fetch a page using the backend's newest-first offset
 * semantics.
 */
export async function retrieveAgentChatPage(
    offset = 0,
    posthogSessionId?: string | null,
): Promise<HttpResponse<AgentChatMemory[]>> {
    if (!Number.isSafeInteger(offset) || offset < 0)
        throw new Error(
            'The history offset must be a non-negative integer.',
        );
    const response = await httpAgent(
        '/api/agent-memory/fetch-chat-page',
        { query: { offset }, posthogSessionId },
    );
    return {
        ...response,
        data: parseAgentChatMemories(response.data),
    };
}
