/**
 * Safe error details preserved across Server Action boundaries.
 */
export interface ServerActionFailure {
    message: string;
    requestId: string;
    status: number | null;
    serverErrorName: string;
    serverReported: boolean;
}

/**
 * Return failures as data so production retains correlation IDs.
 */
export type ServerActionResult<T> =
    | { ok: true; data: T }
    | { ok: false; error: ServerActionFailure };
