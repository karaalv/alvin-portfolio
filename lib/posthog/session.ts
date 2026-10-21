/** Read browser replay context for backend request correlation. */
import posthog from 'posthog-js';
import { isPostHogConfigured } from '@/lib/posthog/config';

/** Return the actual replay ID without generating a substitute. */
export function getPostHogSessionId(): string | null {
    return isPostHogConfigured()
        ? posthog.get_session_id() || null
        : null;
}
