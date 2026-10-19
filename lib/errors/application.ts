/** Package consistent, user-facing application errors. */
import type { ApplicationError } from '@/types/application/error';

/** Keep display copy separate from transport errors and sensitive payloads. */
export function createApplicationError(
    title: string,
    message: string,
): ApplicationError {
    return { title, message };
}
