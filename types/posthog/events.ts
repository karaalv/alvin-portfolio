/** Properties accepted by manually captured product events. */
import type { NavigationContext } from '@/types/posthog/navigation';

interface NavigationEventProperties
    extends NavigationContext {
    position: number;
    source_section: string;
}

export interface ApplicationEventProperties {
    link_clicked: NavigationEventProperties & {
        destination: string;
        link_category:
            | 'navigation'
            | 'social'
            | 'project'
            | 'contact';
        is_external: boolean;
    };
    project_viewed: NavigationEventProperties & {
        project: string;
    };
    contact_clicked: NavigationEventProperties & {
        method: string;
    };
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
