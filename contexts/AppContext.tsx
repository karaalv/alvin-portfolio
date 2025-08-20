/**
 * @description App context for managing 
 * global application state.
 */

import { 
    createContext, useContext, ReactNode, 
    useState, Dispatch, SetStateAction,
    useMemo
} from 'react';
import { useMediaQuery } from "react-responsive";

interface AppContextProps {
    // Message state from AI engagement
    // section
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;
    // Responsive state
    isMobile: boolean;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppProvider (
    { children }: { children: ReactNode }
) {
    // Media query for mobile responsiveness
    const [isMobile] = useState(useMediaQuery({query: '(max-width: 786px)'}))
    const [message, setMessage] = useState<string>('');

    // Memoisation
    const value = useMemo(
        () => ({
            message,
            setMessage,
            isMobile,

        }),
        [message, isMobile]
    );

    return (
        <AppContext.Provider value={value}>
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