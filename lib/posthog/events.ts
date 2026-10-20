/** Capture typed browser events alongside local console logs. */
import posthog from 'posthog-js';
import { logPostHogEvent } from '@/lib/posthog/logging';
import { isPostHogConfigured } from '@/lib/posthog/config';
import { logApplicationEvent } from '@/lib/logging/console';
import type { ApplicationEventProperties } from '@/types/posthog/events';

/** Keep analytics failures separate from completed user actions. */
export function captureApplicationEvent<
    Event extends keyof ApplicationEventProperties,
>(
    event: Event,
    properties: ApplicationEventProperties[Event],
): void {
    logApplicationEvent(event, properties);
    logPostHogEvent(event, properties);
    if (!isPostHogConfigured()) return;
    try {
        posthog.capture(event, properties);
    } catch {
        // An analytics failure must not undo the user action.
    }
}
