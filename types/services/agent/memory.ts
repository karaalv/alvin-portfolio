/** Canonical stored model artefact, not returned by chat pagination. */
export interface AgentMemory {
    user_id: string;
    memory_id: string;
    turn_id: string;
    created_at: string;
    sequence: number;
    payload: unknown;
}

/** Visible history item returned by the agent's chat-page endpoint. */
export interface AgentChatMemory {
    memory_id: string;
    user_id: string;
    memory_source: 'user' | 'agent';
    created_at: string;
    content: string;
}
