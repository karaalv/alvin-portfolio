/** Metadata shared by HTTP and WebSocket response envelopes. */
export interface ApiResponseMetaData {
    request_id: string;
    success: boolean;
    message: string;
    timestamp: string;
}
