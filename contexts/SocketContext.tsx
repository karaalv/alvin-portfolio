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
import { packageAgentResponse } from '@/utils/processing';

// Server side requests
import { getSocketURL } from '@/services/interface';

// Types
import { SocketMessage, SocketResponse } from '@/types/service.types';


interface SocketContextProps {
    connected: boolean;
    sendMessage: (message: SocketMessage) => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export default function SocketProvider(
    { children }: { children: ReactNode }
) {
    const { message, setMessage, setError, setMemory, setIsLoading } = useAppContext();
    const wsRef = useRef<WebSocket | null>(null);
    const [connected, setConnected] = useState<boolean>(false);
    const backoffRef = useRef(1000);
    const pingRef = useRef<number | null>(null);
    const aliveRef = useRef<boolean>(true);

    // Sending data
    const sendMessage = useCallback((message: SocketMessage) => {
        const ws = wsRef.current;
        if (!ws || ws.readyState !== WebSocket.OPEN) return false;
        ws.send(JSON.stringify(message));
        return true;
    }, [])

    // --- Managing State Updates ---

    /**
     * Updates the agent response in 
     * chat history.
     */
    const updateAgentResponse = (agentMessage: string) => {
        if (!agentMessage) return;
        const packaged = packageAgentResponse(agentMessage);
        setIsLoading(false);
        setMemory((prev) => [...prev, packaged]);
    }

    useEffect(() => {
        aliveRef.current = true;

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

                    backoffRef.current = 1000; // Reset backoff on successful connection
                    if (pingRef.current) clearInterval(pingRef.current); // Clear any existing ping intervals

                    pingRef.current = window.setInterval(() => {
                        if (ws.readyState === WebSocket.OPEN) {
                            ws.send(JSON.stringify({ type: "ping", data: "ping" }));
                        }
                    }, 10000); // Send a ping every 10 seconds

                    // If persistent message exists send
                    if (message && message.trim()) {
                        sendMessage({ type: "message", data: message });
                        setMessage('');
                    }
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
                        switch (response.type) {
                            case "ping":
                                break;
                            case "agent_memory":
                                console.log("New message:", response);
                                updateAgentResponse(response.data as string);
                                break;
                            case "agent_thinking":
                                console.error("WebSocket error:", response);
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