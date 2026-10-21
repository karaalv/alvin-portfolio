/**
 * Transport or response failure from the Portfolio Agent HTTP
 * service.
 */
export class AgentHttpError extends Error {
    readonly status: number | null;
    readonly requestId: string | null;
    readonly serverReported: boolean;
    readonly serverErrorName?: string;

    constructor(
        message: string,
        status: number | null = null,
        requestId: string | null = null,
        options?: ErrorOptions & {
            serverReported?: boolean;
            serverErrorName?: string;
        },
    ) {
        super(message, options);
        this.name = 'AgentHttpError';
        this.status = status;
        this.requestId = requestId;
        this.serverReported =
            options?.serverReported ?? false;
        this.serverErrorName = options?.serverErrorName;
    }
}
