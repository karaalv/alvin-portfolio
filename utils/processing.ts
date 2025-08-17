/**
 * @description This file contains
 * utility functions for processing
 * on the client-side.
 */
import { AgentMemory } from "@/types/service.types"

/**
 * Current timestamp in UTC. (ISO 8601)
 * 
 * @param dateString Optional date string to 
 * convert to timestamp.
 * @returns {string}
 */
export function getTimestamp(dateString?: string): string {
    const date = dateString ? new Date(dateString) : new Date()
    return date.toISOString()
}

/**
 * @returns {string} - Random nonce
 */
export function generateNonce(): string {
    return (
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15)
    )
}

/**
 * Packages the agent response into the desired format.
 * @param response - The response string from the agent.
 * @returns The packaged agent memory object.
 */
export function packageAgentResponse(
    response: string
): AgentMemory {
    return {
        id: generateNonce(),
        user_id: generateNonce(),
        source: 'agent',
        content: response,
        created_at: getTimestamp(),
        illusion: true,
        agent_canvas: null
    }
}