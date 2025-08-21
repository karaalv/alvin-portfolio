/**
 * @description Chat context for managing
 * state tied to chat/Websocket interactions.
 */

import { 
    createContext, useContext, ReactNode, 
    useState, Dispatch, SetStateAction,
    useMemo
} from 'react';
import { AgentMemory } from '@/types/service.types';

interface ChatContextProps {
    // Info
    userUsage: number | null;
    setUserUsage: Dispatch<SetStateAction<number | null>>;
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

const ChatContext = createContext<ChatContextProps | undefined>(undefined);

export default function ChatProvider (
    { children }: { children: ReactNode }
) {
    // Info
    const [userUsage, setUserUsage] = useState<number | null>(null);
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

    const value = useMemo(
        () => ({
            userUsage,
            setUserUsage,
            isLoading,
            setIsLoading,
            error,
            setError,
            canvasContent,
            setCanvasContent,
            isCanvasOpen,
            setCanvasOpen,
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
            userUsage,
            isLoading,
            error,
            canvasContent,
            isCanvasOpen,
            memory,
            thinkingSet,
            isAgentWriting,
            agentWritingPhase,
            agentWritingThinking
        ]
    );

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    const context = useContext(ChatContext);
    if (!context) {
        throw new Error('useChatContext must be used within a ChatProvider');
    }
    return context
}