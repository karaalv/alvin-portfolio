'use client';

/** Own one chat socket and release it when its provider unmounts. */
import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type ReactNode,
} from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { createApplicationError } from '@/lib/errors/application';
import { parseWebSocketResponse } from '@/lib/websocket/parsing';
import { getPortfolioAgentWsUrl } from '@/server/agent/websocket';
import { WebSocketResponseType } from '@/types/api/ws/response';
import type {
    SocketContextValue,
    SocketStatus,
} from '@/types/contexts/socket';
import type { WebSocketRequest } from '@/types/api/ws/request';

const SocketContext = createContext<
    SocketContextValue | undefined
>(undefined);

/** Connect only while the chat route is mounted; response handlers follow later. */
export default function SocketProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { setError } = useAppContext();
    const wsRef = useRef<WebSocket | null>(null);
    const [socketStatus, setSocketStatus] =
        useState<SocketStatus>('connecting');

    const sendMessage = useCallback(
        (request: WebSocketRequest): boolean => {
            const socket = wsRef.current;
            if (
                !socket ||
                socket.readyState !== WebSocket.OPEN
            ) {
                setError(
                    createApplicationError(
                        'Chat is not connected',
                        'Please wait for the connection before sending a message.',
                    ),
                );
                return false;
            }
            try {
                socket.send(JSON.stringify(request));
                return true;
            } catch {
                setError(
                    createApplicationError(
                        'Unable to send your message',
                        'The message could not be sent. Please try again.',
                    ),
                );
                return false;
            }
        },
        [setError],
    );

    useEffect(() => {
        let disposed = false;
        let socket: WebSocket | null = null;
        let failed = false;

        async function connect() {
            try {
                const url = await getPortfolioAgentWsUrl();
                // The provider may unmount while the server resolves the URL.
                if (disposed) return;
                socket = new WebSocket(url);
                wsRef.current = socket;
                setSocketStatus('connecting');

                socket.onopen = () => {
                    if (!disposed)
                        setSocketStatus('connected');
                };
                socket.onerror = () => {
                    if (disposed) return;
                    failed = true;
                    setSocketStatus('error');
                    setError(
                        createApplicationError(
                            'Unable to connect to chat',
                            'The chat connection encountered an error. Please reload the page and try again.',
                        ),
                    );
                };
                socket.onclose = (event) => {
                    if (disposed) return;
                    if (wsRef.current === socket)
                        wsRef.current = null;
                    if (failed) return;
                    setSocketStatus('closed');
                    if (
                        !event.wasClean ||
                        event.code !== 1000
                    ) {
                        setError(
                            createApplicationError(
                                'Chat connection closed',
                                'The connection was interrupted. Please reload the page to reconnect.',
                            ),
                        );
                    }
                };
                socket.onmessage = (event) => {
                    if (disposed) return;
                    try {
                        const response =
                            parseWebSocketResponse(
                                event.data,
                            );
                        switch (response.type) {
                            case WebSocketResponseType.HEARTBEAT:
                                // TODO: Handle the server heartbeat.
                                break;
                            case WebSocketResponseType.AGENT_START:
                                // TODO: Start the agent's activity state.
                                break;
                            case WebSocketResponseType.AGENT_END:
                                // TODO: Complete the active agent turn.
                                break;
                            case WebSocketResponseType.AGENT_DELTA:
                                // TODO: Merge the text delta into visible history.
                                break;
                            case WebSocketResponseType.TOOL_MESSAGE:
                                // TODO: Handle tool invocation notifications.
                                break;
                            case WebSocketResponseType.AGENT_THINKING_CAPTIONS:
                                // TODO: Update the retrieval progress captions.
                                break;
                            case WebSocketResponseType.SET_USER_TOKEN:
                                // TODO: Claim the token cookie and refresh application state.
                                break;
                            case WebSocketResponseType.WARNING:
                                // TODO: Display the server warning.
                                break;
                            case WebSocketResponseType.ERROR:
                                // TODO: Display the server error.
                                break;
                        }
                    } catch {
                        setError(
                            createApplicationError(
                                'Unable to read the chat response',
                                'The server sent an unexpected response. Please try again.',
                            ),
                        );
                    }
                };
            } catch {
                if (disposed) return;
                setSocketStatus('error');
                setError(
                    createApplicationError(
                        'Unable to start chat',
                        'The chat service could not be reached. Please reload the page and try again.',
                    ),
                );
            }
        }
        void connect();
        return () => {
            disposed = true;
            if (!socket) return;
            socket.onopen = null;
            socket.onmessage = null;
            socket.onerror = null;
            socket.onclose = null;
            if (wsRef.current === socket)
                wsRef.current = null;
            if (
                socket.readyState === WebSocket.OPEN ||
                socket.readyState === WebSocket.CONNECTING
            ) {
                socket.close(1000, 'Chat page closed.');
            }
        };
    }, [setError]);

    const value = useMemo(
        () => ({ socketStatus, sendMessage }),
        [socketStatus, sendMessage],
    );
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

/** Require the chat-route socket provider before accessing the transport. */
export function useSocketContext(): SocketContextValue {
    const value = useContext(SocketContext);
    if (!value)
        throw new Error(
            'useSocketContext must be used within a SocketProvider',
        );
    return value;
}
