/**
 * Primitive metadata shared by browser and server exceptions.
 */
export interface ApplicationExceptionContext {
    source: string;
    operation: string;
    requestId?: string | null;
    status?: number | null;
    posthogSessionId?: string | null;
    [key: string]:
        | string
        | number
        | boolean
        | null
        | undefined;
}
