/** Backend cookie attributes supported by the Next.js cookie store. */
export interface ParsedResponseCookie {
    name: string;
    value: string;
    path?: string;
    domain?: string;
    expires?: Date;
    maxAge?: number;
    httpOnly?: boolean;
    secure?: boolean;
    sameSite?: 'lax' | 'strict' | 'none';
    priority?: 'low' | 'medium' | 'high';
    partitioned?: boolean;
}
