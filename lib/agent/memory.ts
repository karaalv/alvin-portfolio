/** Validate visible chat history returned by the agent service. */
import type { AgentChatMemory } from '@/types/services/agent/memory';

function isAgentChatMemory(
    value: unknown,
): value is AgentChatMemory {
    if (!value || typeof value !== 'object') return false;
    return (
        'memory_id' in value &&
        typeof value.memory_id === 'string' &&
        'user_id' in value &&
        typeof value.user_id === 'string' &&
        'memory_source' in value &&
        (value.memory_source === 'user' ||
            value.memory_source === 'agent') &&
        'created_at' in value &&
        typeof value.created_at === 'string' &&
        Number.isFinite(Date.parse(value.created_at)) &&
        'content' in value &&
        typeof value.content === 'string'
    );
}

/** Reject malformed history instead of trusting a generic type assertion. */
export function parseAgentChatMemories(
    value: unknown,
): AgentChatMemory[] {
    if (
        !Array.isArray(value) ||
        !value.every(isAgentChatMemory)
    ) {
        throw new Error('Invalid agent chat history.');
    }
    return value;
}
