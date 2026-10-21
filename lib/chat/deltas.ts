/** Assemble ordered agent text with a bounded gap tolerance. */
import type { AgentChatMemory } from '@/types/services/agent/memory';
import type { StreamManagerItem } from '@/types/services/agent/streaming';

const MAX_PENDING_CHUNKS = 10;

/** Own the sequence cursor and pending chunks for one memory. */
export class AgentDeltaBuffer {
    private nextSequence = 0;
    private pending = new Map<number, StreamManagerItem>();
    private finished = false;

    /** Ignore duplicates; skip a gap once ten newer chunks wait. */
    push(
        item: StreamManagerItem,
    ): StreamManagerItem[] | null {
        if (
            this.finished ||
            item.sequence_number < this.nextSequence ||
            this.pending.has(item.sequence_number)
        )
            return null;
        this.pending.set(item.sequence_number, item);
        return this.drain(false);
    }

    /**
     * Release trailing chunks despite gaps and reject late
     * arrivals.
     */
    finish(): StreamManagerItem[] {
        this.finished = true;
        return this.drain(true);
    }

    private drain(flush: boolean): StreamManagerItem[] {
        const ready: StreamManagerItem[] = [];
        while (this.pending.size > 0) {
            const item = this.pending.get(
                this.nextSequence,
            );
            if (item) {
                ready.push(item);
                this.pending.delete(this.nextSequence);
                this.nextSequence += 1;
            } else if (
                flush ||
                this.pending.size >= MAX_PENDING_CHUNKS
            ) {
                this.nextSequence = Math.min(
                    ...this.pending.keys(),
                );
            } else {
                break;
            }
        }
        return ready;
    }
}

/**
 * Append text to matching memories, creating agent messages as
 * needed.
 */
export function appendAgentMemoryChunks(
    memories: AgentChatMemory[],
    chunks: readonly StreamManagerItem[],
): AgentChatMemory[] {
    if (chunks.length === 0) return memories;
    const next = [...memories];
    const indices = new Map(
        next.map((memory, index) => [
            memory.memory_id,
            index,
        ]),
    );
    for (const chunk of chunks) {
        const index = indices.get(chunk.memory_id);
        if (index === undefined) {
            indices.set(chunk.memory_id, next.length);
            next.push({
                memory_id: chunk.memory_id,
                user_id: chunk.user_id,
                memory_source: 'agent',
                created_at: chunk.timestamp,
                content: chunk.payload,
            });
        } else {
            next[index] = {
                ...next[index],
                content:
                    next[index].content + chunk.payload,
            };
        }
    }
    return next;
}
