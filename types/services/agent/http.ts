/** Options accepted by the server-side agent HTTP client. */
export interface HttpAgentOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    query?: Record<string, string | number | boolean>;
    data?: unknown;
    headers?: Record<string, string>;
}
