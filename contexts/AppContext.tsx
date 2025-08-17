/**
 * @description App context for managing 
 * global application state.
 */

import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextProps {
    message: string;
    setMessage: (message: string) => void;
    isLoading: boolean;
    setIsLoading: (loading: boolean) => void;
    error: string | null;
    setError: (error: string | null) => void;
    canvasContent: string;
    setCanvasContent: (content: string) => void;
    isCanvasOpen: boolean;
    setCanvasOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppProvider (
    { children }: { children: ReactNode }
) {
    // Message state
    const [message, setMessage] = useState<string>('');
    // Loading and error state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Canvas state
    const [canvasContent, setCanvasContent] = useState<string>('');
    const [isCanvasOpen, setCanvasOpen] = useState<boolean>(false);

    return (
        <AppContext.Provider 
            value={{
                message,
                setMessage,
                isLoading,
                setIsLoading,
                error,
                setError,
                canvasContent,
                setCanvasContent,
                isCanvasOpen,
                setCanvasOpen
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