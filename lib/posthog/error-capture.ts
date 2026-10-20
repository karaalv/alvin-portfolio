/**
 * Report handled browser failures and return safe UI feedback.
 */
import posthog from 'posthog-js';
import { createApplicationError } from '@/lib/errors/application';
import { isPostHogConfigured } from '@/lib/posthog/config';
import {
    exceptionProperties,
    isExpectedRejection,
    normaliseException,
} from '@/lib/posthog/exceptions';
import type { ApplicationError } from '@/types/application/error';
import type { ApplicationExceptionContext } from '@/types/posthog/exceptions';

const reported = new WeakSet<Error>();

/**
 * Reporting failures must never prevent displaying the error
 * banner.
 */
export function captureApplicationException(
    title: string,
    message: string,
    exception: unknown,
    context: ApplicationExceptionContext,
): ApplicationError {
    const error = normaliseException(exception, title);
    if (
        isPostHogConfigured() &&
        !isExpectedRejection(error) &&
        !reported.has(error)
    ) {
        reported.add(error);
        try {
            posthog.captureException(error, {
                ...exceptionProperties(error, context),
                runtime: 'client',
                application_error_title: title,
                application_error_message: message,
            });
        } catch {
            // Display feedback even when telemetry is unavailable.
        }
    }
    return createApplicationError(title, message);
}
