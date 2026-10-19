'use client';

/** Application-wide error state and visitor authentication snapshot. */
import {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState,
    type ReactNode,
} from 'react';
import type { ApplicationError } from '@/types/application/error';
import type { AppContextValue } from '@/types/contexts/app';
import { createApplicationError } from '@/lib/errors/application';
import { getAccessToken } from '@/server/auth/access-token';

const AppContext = createContext<
    AppContextValue | undefined
>(undefined);

/** Load the cookie through the server without making every page dynamic. */
export default function AppProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [error, setError] =
        useState<ApplicationError | null>(null);
    const [accessToken, setAccessToken] = useState<
        string | null
    >(null);

    useEffect(() => {
        let cancelled = false;
        async function loadAccessToken() {
            try {
                const token = await getAccessToken();
                if (!cancelled) setAccessToken(token);
            } catch {
                if (!cancelled)
                    setError(
                        createApplicationError(
                            'Unable to read your session',
                            'Your saved chat session could not be loaded. Please reload the page and try again.',
                        ),
                    );
            }
        }
        void loadAccessToken();
        return () => {
            cancelled = true;
        };
    }, []);

    const value = useMemo(
        () => ({ error, setError, accessToken }),
        [error, accessToken],
    );
    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    );
}

/** Require the application provider at the root of the tree. */
export function useAppContext(): AppContextValue {
    const value = useContext(AppContext);
    if (!value)
        throw new Error(
            'useAppContext must be used within an AppProvider',
        );
    return value;
}
