/** Manage browser analytics identity for portfolio visitors. */
import posthog from 'posthog-js';
import { isPostHogConfigured } from '@/lib/posthog/config';

/** Associate analytics with the backend-issued visitor ID. */
export function identifyPostHogUser(userId: string): void {
    if (isPostHogConfigured()) posthog.identify(userId);
}

/** Clear the visitor association when their cookie is absent. */
export function resetPostHogUser(): void {
    if (isPostHogConfigured()) posthog.reset();
}
