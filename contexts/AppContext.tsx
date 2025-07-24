/**
 * @description App context for managing 
 * global application state.
 */

import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextProps {
    // Global application state
    message: string;
    setMessage: (message: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppProvider (
    { children }: { children: ReactNode }
) {
    const [message, setMessage] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    return (
        <AppContext.Provider 
            value={{
                message,
                setMessage,
                isLoading,
                setIsLoading,
                error,
                setError
            }}
        >
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const context = useContext(AppContext);
    if (!context) {
        throw new Error('useAppContext must be used within an AppProvider');
    }
    return context
}