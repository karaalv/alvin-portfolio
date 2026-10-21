/** Console output shared by browser and application server. */
import { exceptionProperties } from '@/lib/posthog/exceptions';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';
import type { ApplicationEventProperties } from '@/types/posthog/events';

const logged = new WeakSet<Error>();

/** Log an original exception once, even without analytics. */
export function logApplicationException(
    error: Error,
    context: ApplicationExceptionContext,
    runtime: 'client' | 'server',
): void {
    if (logged.has(error)) return;
    logged.add(error);
    try {
        console.error('[Application exception]', error, {
            ...exceptionProperties(error, context),
            runtime,
        });
    } catch {
        // Logging must not interrupt application error handling.
    }
}

/** Log product actions without message text or credentials. */
export function logApplicationEvent<
    Event extends keyof ApplicationEventProperties,
>(
    event: Event,
    properties: ApplicationEventProperties[Event],
): void {
    try {
        console.info(
            '[Application event]',
            event,
            properties,
        );
    } catch {
        // Console availability must not affect an interaction.
    }
}
