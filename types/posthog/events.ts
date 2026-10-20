/** Properties accepted by manually captured product events. */
export interface ApplicationEventProperties {
    chat_message_sent: {
        request_id: string;
        message_length: number;
        message_source: 'typed' | 'prompt';
        prompt_label?: string;
    };
    chat_history_deleted: {
        request_id: string;
        loaded_message_count: number;
    };
}
