/** Transport or response failure from the Portfolio Agent HTTP service. */
export class AgentHttpError extends Error {
    readonly status: number | null;
    readonly requestId: string | null;

    constructor(
        message: string,
        status: number | null = null,
        requestId: string | null = null,
    ) {
        super(message);
        this.name = 'AgentHttpError';
        this.status = status;
        this.requestId = requestId;
    }
}
