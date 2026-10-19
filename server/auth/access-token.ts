'use server';

/** Read the visitor token from this application's incoming cookies. */
import { cookies } from 'next/headers';

/** Returning this value exposes an in-memory copy to the requesting client. */
export async function getAccessToken(): Promise<
    string | null
> {
    return (await cookies()).get('JWT')?.value || null;
}
