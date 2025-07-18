/**
 * @description App context for managing 
 * global application state.
 */

import { createContext, useContext, ReactNode, useState } from 'react';

interface AppContextProps {
    // Define any global state properties here
    aiPrompt: string;
    setAiPrompt: (prompt: string) => void;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppProvider (
    { children }: { children: ReactNode }
) {
    const [aiPrompt, setAiPrompt] = useState<string>('');

    return (
        <AppContext.Provider value={{ aiPrompt, setAiPrompt }}>
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