/** Send selected browser logs to PostHog's Logs product. */
import posthog from 'posthog-js';
import { isPostHogConfigured } from '@/lib/posthog/config';
import { exceptionProperties } from '@/lib/posthog/exceptions';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';
import type { ApplicationEventProperties } from '@/types/posthog/events';

const logged = new WeakSet<Error>();

/** Attach request context without forwarding arbitrary console output. */
export function logPostHogException(
    error: Error,
    context: ApplicationExceptionContext,
): void {
    if (!isPostHogConfigured() || logged.has(error)) return;
    logged.add(error);
    try {
        posthog.logger.error(error.message, {
            ...exceptionProperties(error, context),
            logger_name: context.source,
            runtime: 'client',
            'exception.type': error.name,
            'exception.message': error.message,
            'exception.stacktrace': error.stack,
        });
    } catch {
        logged.delete(error);
        // Log delivery must not interfere with error handling.
    }
}

/** Send structured product logs with their correlation fields. */
export function logPostHogEvent<
    Event extends keyof ApplicationEventProperties,
>(
    event: Event,
    properties: ApplicationEventProperties[Event],
): void {
    if (!isPostHogConfigured()) return;
    try {
        posthog.logger.info(event, {
            ...properties,
            logger_name: event.startsWith('chat_')
                ? 'chat'
                : 'navigation',
            runtime: 'client',
        });
    } catch {
        // Log delivery must not undo the completed action.
    }
}
