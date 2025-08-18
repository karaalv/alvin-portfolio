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
import { AgentMemory } from '@/types/service.types';

interface AppContextProps {
    // Message state
    message: string;
    setMessage: Dispatch<SetStateAction<string>>;

    // Loading and error state
    isLoading: boolean;
    setIsLoading: Dispatch<SetStateAction<boolean>>;

    error: string | null;
    setError: Dispatch<SetStateAction<string | null>>;

    // Canvas state
    canvasContent: string;
    setCanvasContent: Dispatch<SetStateAction<string>>;

    isCanvasOpen: boolean;
    setCanvasOpen: Dispatch<SetStateAction<boolean>>;

    // Responsive state
    isMobile: boolean;

    // Memory state
    memory: AgentMemory[];
    setMemory: Dispatch<SetStateAction<AgentMemory[]>>;

    // Thinking state
    thinkingSet: Set<string> | null;
    setThinkingSet: Dispatch<SetStateAction<Set<string> | null>>;

    // Writing state
    isAgentWriting: boolean;
    setIsAgentWriting: Dispatch<SetStateAction<boolean>>;
    agentWritingPhase: string | null;
    setAgentWritingPhase: Dispatch<SetStateAction<string | null>>;
    agentWritingThinking: Set<string> | null;
    setAgentWritingThinking: Dispatch<SetStateAction<Set<string> | null>>;
}

const AppContext = createContext<AppContextProps | undefined>(undefined);

export default function AppProvider (
    { children }: { children: ReactNode }
) {
    // Media query for mobile responsiveness
    const [isMobile] = useState(useMediaQuery({query: '(max-width: 786px)'}))
    // Message state
    const [message, setMessage] = useState<string>('');
    // Loading and error state
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // Canvas state
    const [canvasContent, setCanvasContent] = useState<string>('');
    const [isCanvasOpen, setCanvasOpen] = useState<boolean>(false);
    // Memory state
    const [memory, setMemory] = useState<AgentMemory[]>([]);
    // Agent thinking
    const [thinkingSet, setThinkingSet] = useState<Set<string> | null>(null);
    // Agent writing
    const [isAgentWriting, setIsAgentWriting] = useState<boolean>(false);
    const [agentWritingPhase, setAgentWritingPhase] = useState<string | null>(null);
    const [agentWritingThinking, setAgentWritingThinking] = useState<Set<string> | null>(null);

    // Memoisation
    const value = useMemo(
        () => ({
            message,
            setMessage,
            isLoading,
            setIsLoading,
            error,
            setError,
            canvasContent,
            setCanvasContent,
            isCanvasOpen,
            setCanvasOpen,
            isMobile,
            memory,
            setMemory,
            thinkingSet,
            setThinkingSet,
            isAgentWriting,
            setIsAgentWriting,
            agentWritingPhase,
            setAgentWritingPhase,
            agentWritingThinking,
            setAgentWritingThinking
        }),
        [
            message,
            isLoading,
            error,
            canvasContent,
            isCanvasOpen,
            isMobile,
            memory,
            thinkingSet,
            isAgentWriting,
            agentWritingPhase,
            agentWritingThinking
        ]
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