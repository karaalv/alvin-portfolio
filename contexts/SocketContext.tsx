/**
 * @description Socket context for managing
 * a singleton WebSocket connection.
 */

import { 
    createContext, useRef, ReactNode, useEffect, 
    useState, useContext, useCallback
} from 'react';

// Context and Utils
import { useAppContext } from '@contexts/AppContext';
import { packageResponse, rateLimit } from '@/utils/processing';

// Server side requests
import { getSocketURL } from '@/services/interface';

// Types
import { AgentMemory } from '@/types/service.types';
import { SocketMessage, SocketResponse } from '@/types/service.types';

interface SocketContextProps {
    connected: boolean;
    sendMessage: (message: SocketMessage) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export default function SocketProvider(
    { children }: { children: ReactNode }
) {
    const { 
        setError, 
        setMemory, 
        // Streaming state
        setIsLoading,
        setThinkingSet,
        // Writing state
        isCanvasOpen,
        setCanvasOpen,
        setCanvasContent,
        isAgentWriting,
        setIsAgentWriting,
        setAgentWritingPhase,
        setAgentWritingThinking
    } = useAppContext();
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const timeoutRef = useRef<number | null>(null);
    const backoffRef = useRef(1000);
    const pingRef = useRef<number | null>(null);
    const aliveRef = useRef<boolean>(true);
    const connectedRef = useRef<boolean>(false);

    // --- Utils ---
    const endIllusions = () => {
        setMemory(prev =>
            prev.map(message => {
                return {
                    ...message,
                    illusion: false
                }
            })
        )
    }

    // --- Error Handling ---

    const startTimeout = useCallback(() => {
        if (timeoutRef.current) clearTimeout(timeoutRef.current);
        timeoutRef.current = window.setTimeout(() => {
            setIsLoading(false);
            setError("Timeout, unable to reach server.");
        }, 30_000);
    }, [setError, setIsLoading]);

    const stopTimeout = useCallback(() => {
    if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
    }
    }, []);

    // --- Sending data ---
    
    const sendMessage = useCallback((message: SocketMessage) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return false;
        ws.send(JSON.stringify(message));
        startTimeout();
        return true;
    }, [startTimeout])

    // --- Managing State Updates ---

    /**
     * Updates the agent response in 
     * chat history.
     * Socket type: 'agent_memory'
     * @param agentMessage The message from the agent.
     */
    const updateAgentResponse = (agentMessage: string) => {
        if (!agentMessage) return;
        const packaged = packageResponse(agentMessage, 'agent');
        // Clean up loading state
        setThinkingSet(null);
        // Send message to UI
        setMemory((prev) => [...prev, packaged]);
    }

    /**
     * Updates the thinking set with new headers.
     * Socket type: 'agent_thinking'
     * @param headers Array of header strings to 
     * add to the thinking set.
     */
    const updateThinkingSet = (headers: string[]) => {
        if (!headers || headers.length === 0) return;

        setThinkingSet(prev => {
            const currentSet = new Set(prev ?? []);
            headers.forEach(header => currentSet.add(header));
            return currentSet;
        });
    };

    const limitedUpdateThinkingSet = rateLimit(updateThinkingSet);

    /**
     * Updates the agent writing illusion.
     * Socket type: 'agent_writing'
     * @param agentMemory The memory of the agent
     * to start writing.
     */
    const updateAgentWriting = (agentMemory: AgentMemory) => {
        // State management
        if (!isAgentWriting) setIsAgentWriting(true);
        if (!isCanvasOpen) setCanvasOpen(true);

        // Set streaming message with new
        // data
        setMemory((prev) => {
            const set = new Set(prev.map(m => m.id));
            if (set.has(agentMemory.id)) {
                return prev.map(message => {
                    if (message.id === agentMemory.id) {
                        return {
                            ...message,
                            content: agentMemory.content,
                            agent_canvas: agentMemory.agent_canvas
                        };
                    }
                    return message;
                })
            } else {
                return [...prev, agentMemory];
            }
        })
        // Set canvas content
        setCanvasContent(agentMemory.agent_canvas!.content);
    };

    const limitedAgentWriting = rateLimit(updateAgentWriting);

    /**
     * Updates the agent writing thinking set.
     * Socket type: 'agent_writing_thinking'
     * @param headers Array of header strings to
     * add to the thinking set.
     */
    const updateAgentWritingThinking = (headers: string[]) => {
        if (!headers || headers.length === 0) return;

        setAgentWritingThinking(prev => {
            const currentSet = new Set(prev ?? []);
            headers.forEach(header => currentSet.add(header));
            return currentSet;
        });
    };

    const limitedAgentWritingThinking = rateLimit(updateAgentWritingThinking);

    /**
     * Updates the agent writing phase.
     * Socket type: 'agent_writing_phase'
     * @param phase The current phase of the agent 
     * writing process.
     */
    const updateAgentWritingPhase = (phase: string) => {
        // End writing state
        if (phase === "<complete>") {
            setIsAgentWriting(false);
            setAgentWritingThinking(null);
            setAgentWritingPhase(null);
            return;
        }

        setAgentWritingPhase(phase);
        endIllusions();
    };

    const limitedAgentWritingPhase = rateLimit(updateAgentWritingPhase);

    // --- Connection ---

    useEffect(() => {
        aliveRef.current = true;
        if (wsRef.current || connectedRef.current) return;
        
        async function connect() {
            try {
                const url = await getSocketURL();
                if (!aliveRef.current) return;

                // Connect to WebSocket
                const ws = new WebSocket(url);
                wsRef.current = ws;

                // --- Connection management ---

                ws.onopen = () => {
                    setConnected(true);
                    connectedRef.current = true;

                    backoffRef.current = 1000; // Reset backoff on successful connection
                    if (pingRef.current) clearInterval(pingRef.current); // Clear any existing ping intervals

                    pingRef.current = window.setInterval(() => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ type: "ping", data: "ping" }));
                        }
                    }, 10000); // Send a ping every 10 seconds
                }

                ws.onerror = (error) => {
                    console.error("WebSocket error:", error);
                    setError("Error connecting to Server.");
                }

                ws.onclose = () => {
                    setConnected(false);
                    if (pingRef.current) {
                        clearInterval(pingRef.current);
                        pingRef.current = null;
                    }
                    wsRef.current = null;
                    // Reconnect if mounted
                    if (!aliveRef.current) return;
                    backoffRef.current = Math.min(backoffRef.current * 2, 30000);
                    setTimeout(connect, backoffRef.current);
                }

                // --- Messages ---

                ws.onmessage = (event) => {
                    try{
                        const dataRaw = JSON.parse(event.data);                        
                        // Handle message types
                        const response: SocketResponse<unknown> = dataRaw;
                        if (response.type !== "ping") {
                            console.log("New message:", response);
                            stopTimeout();
                        }
                        switch (response.type) {
                            case "ping":
                                break;
                            case "agent_memory":
                                setIsLoading(false);
                                setError(null);
                                updateAgentResponse(response.data as string);
                                break;
                            case "agent_thinking":
                                limitedUpdateThinkingSet(response.data as string[]);
                                break;
                            case "agent_writing":
                                setIsLoading(false);
                                setError(null);
                                limitedAgentWriting(response.data as AgentMemory);
                                break;
                            case "agent_writing_thinking":
                                limitedAgentWritingThinking(response.data as string[]);
                                break;
                            case "agent_writing_phase":
                                limitedAgentWritingPhase(response.data as string);
                                break;
                            default:
                                console.warn("Unknown WebSocket message type:", response);
                        }

                    } catch (error) {
                        console.error("Error parsing WebSocket message:", error);
                    }
                }

            } catch (error) {
                // Stop connection on error and 
                // Throw error.
                console.error("Error initializing WebSocket:", error);
                setError("Error connecting to Server.");
            }
        }

        connect();
        
        // Clean up
        return () => {
            aliveRef.current = false;
            if (pingRef.current) {
                clearInterval(pingRef.current);
                pingRef.current = null;
            }
            wsRef.current?.close();
            wsRef.current = null;
            connectedRef.current = false;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <SocketContext.Provider value={{ 
            connected,
            sendMessage
         }}>
            {children}
        </SocketContext.Provider>
    );
}

export function useSocketContext() {
    const context = useContext(SocketContext);
    if (!context) {
        throw new Error("useSocketContext must be used within a SocketProvider");
    }
    return context;
}