/** Generate random UUID identifiers shared across application features. */

/** Return a canonical UUID v4 string, matching Python's uuid4(). */
export function generateUuid(): string {
    return crypto.randomUUID();
}
