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
 * Packages response into AgentMemory format.
 * @param response - The response string from the agent.
 * @param source - The source of the response.
 */
export function packageResponse(
    response: string,
    source: 'agent' | 'user'
): AgentMemory {
    return {
        id: generateNonce(),
        user_id: generateNonce(),
        source: source,
        content: response,
        created_at: getTimestamp(),
        illusion: true,
        agent_canvas: null
    }
}

/**
 * Rate limit a function to only be called once every interval.
 * @param func The function to rate limit.
 * @param interval The interval in milliseconds.
 * @returns A rate limited version of the function.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function rateLimit<F extends (...args: any[]) => void>(
    func: F,
    interval: number = 300
): F {
    const queue: Parameters<F>[] = [];
    let isRunning = false;

    function runNext() {
        if (queue.length === 0) {
            isRunning = false;
            return;
        }
        isRunning = true;
        const args = queue.shift()!;
        func(...args);
        setTimeout(runNext, interval);
    }

    return function (...args: Parameters<F>) {
        queue.push(args);
        if (!isRunning) runNext();
    } as F;
}
