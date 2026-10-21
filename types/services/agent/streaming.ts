/** Incremental text payload emitted by the agent stream manager. */
export interface StreamManagerItem {
    stream_id: string;
    timestamp: string;
    type: 'text';
    user_id: string;
    memory_id: string;
    sequence_number: number;
    payload: string;
}
