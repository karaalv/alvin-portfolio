/** Application-wide error state and the current visitor token. */
import type { Dispatch, SetStateAction } from 'react';
import type { ApplicationError } from '@/types/application/error';

export interface AppContextValue {
    error: ApplicationError | null;
    setError: Dispatch<
        SetStateAction<ApplicationError | null>
    >;
    accessToken: string | null;
    isSessionLoaded: boolean;
}
