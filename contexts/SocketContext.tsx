'use client';

/**
 * Own one chat socket and release it when its provider
 * unmounts.
 */
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
import { captureApplicationEvent } from '@/lib/posthog/events';
import { getPostHogSessionId } from '@/lib/posthog/session';
import { identifyPostHogUser } from '@/lib/posthog/identity';
import { decodeJwt } from 'jose';
import { useChatContext } from '@/contexts/ChatContext';
import { sanitiseInput } from '@/lib/chat/sanitisation';
import { generateUuid } from '@/lib/ids/generate';
import {
    createWsAgentMessageRequest,
    createWsHeartbeatRequest,
} from '@/lib/websocket/requests';
import { claimAccessCookie } from '@/services/agent/users/auth';
import { useAppContext } from '@/contexts/AppContext';
import { unwrapServerAction } from '@/lib/http/actions';
import { captureApplicationException } from '@/lib/posthog/error-capture';
import { createApplicationError } from '@/lib/errors/application';
import { parseWebSocketResponse } from '@/lib/websocket/parsing';
import { getPortfolioAgentWsUrl } from '@/server/agent/websocket';
import { WebSocketResponseType } from '@/types/api/ws/response';
import type {
    SocketContextValue,
    SocketStatus,
} from '@/types/contexts/socket';
import { WebSocketRequestType } from '@/types/api/ws/request';
import type { WebSocketRequest } from '@/types/api/ws/request';

const HEARTBEAT_INTERVAL_MS = 30_000;

const SocketContext = createContext<
    SocketContextValue | undefined
>(undefined);

/**
 * Own chat submission, socket feedback and connection
 * lifecycles.
 */
export default function SocketProvider({
    children,
}: {
    children: ReactNode;
}) {
    const { setError, isSessionLoaded } = useAppContext();
    const {
        selectedPromptLabel,
        setSelectedPromptLabel,
        userMessage,
        setUserMessage,
        setMemories,
        appendAgentDelta,
        finishAgentDeltas,
        isThinking,
        isResponding,
        isDeletingHistory,
        setIsThinking,
        setIsResponding,
        setThinkingCaptions,
    } = useChatContext();
    const userIdRef = useRef<string | null>(null);
    const requestIdRef = useRef<string | null>(null);
    const turnActiveRef = useRef(false);
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
                if (
                    request.type ===
                    WebSocketRequestType.AGENT_MESSAGE
                )
                    requestIdRef.current =
                        request.request_id ?? null;
                return true;
            } catch (exception) {
                setError(
                    captureApplicationException(
                        'Unable to send your message',
                        'The message could not be sent. Please try again.',
                        exception,
                        {
                            source: 'websocket',
                            operation: 'send-message',
                            requestId: request.request_id,
                            message_type: request.type,
                        },
                    ),
                );
                return false;
            }
        },
        [setError],
    );

    /**
     * Display the cleaned draft optimistically, then send its wire
     * request.
     */
    const sendAgentMessage = useCallback(() => {
        if (
            turnActiveRef.current ||
            isThinking ||
            isResponding ||
            isDeletingHistory
        )
            return;
        const content = sanitiseInput(userMessage);
        if (!content) {
            setError(
                createApplicationError(
                    'Message is empty',
                    'Please enter a readable text message.',
                ),
            );
            return;
        }
        const userId = userIdRef.current;
        if (
            !userId ||
            wsRef.current?.readyState !== WebSocket.OPEN
        ) {
            setError(
                createApplicationError(
                    'Chat is not ready',
                    'Please wait for the chat connection before sending a message.',
                ),
            );
            return;
        }
        const memory = {
            memory_id: generateUuid(),
            user_id: userId,
            memory_source: 'user' as const,
            created_at: new Date().toISOString(),
            content,
        };
        // This local ID identifies the optimistic item, not a database write.
        setMemories((current) => [...current, memory]);
        turnActiveRef.current = true;
        const request =
            createWsAgentMessageRequest(content);
        if (!sendMessage(request)) {
            setMemories((current) =>
                current.filter(
                    (item) =>
                        item.memory_id !== memory.memory_id,
                ),
            );
            turnActiveRef.current = false;
            return;
        }
        captureApplicationEvent('chat_message_sent', {
            request_id: request.request_id,
            message_length: Array.from(content).length,
            message_source: selectedPromptLabel
                ? 'prompt'
                : 'typed',
            ...(selectedPromptLabel
                ? { prompt_label: selectedPromptLabel }
                : {}),
        });
        setSelectedPromptLabel(null);
        setUserMessage('');
        setThinkingCaptions([]);
        setIsThinking(true);
    }, [
        selectedPromptLabel,
        setSelectedPromptLabel,
        userMessage,
        isThinking,
        isResponding,
        isDeletingHistory,
        setError,
        setMemories,
        setUserMessage,
        setThinkingCaptions,
        setIsThinking,
        sendMessage,
    ]);

    useEffect(() => {
        if (!isSessionLoaded) return;
        let disposed = false;
        let socket: WebSocket | null = null;
        let failed = false;
        let heartbeatTimer:
            | ReturnType<typeof setInterval>
            | undefined;

        function stopHeartbeat() {
            if (heartbeatTimer !== undefined) {
                clearInterval(heartbeatTimer);
                heartbeatTimer = undefined;
            }
        }

        function endAgentTurn() {
            finishAgentDeltas();
            turnActiveRef.current = false;
            setIsThinking(false);
            setIsResponding(false);
            setThinkingCaptions([]);
        }

        /**
         * Claim the browser cookie without treating a claim failure as
         * bad JSON.
         */
        async function handleWsSetUserToken(token: string) {
            try {
                const userId = decodeJwt(token).sub;
                if (!userId)
                    throw new Error(
                        'Missing visitor identity.',
                    );
                userIdRef.current = userId;
                unwrapServerAction(
                    await claimAccessCookie(
                        token,
                        getPostHogSessionId(),
                    ),
                );
                if (!disposed) identifyPostHogUser(userId);
            } catch (exception) {
                if (!disposed)
                    setError(
                        captureApplicationException(
                            'Unable to save your session',
                            'Your chat cookie could not be saved. Please reload the page and try again.',
                            exception,
                            {
                                source: 'authentication',
                                operation: 'claim-cookie',
                            },
                        ),
                    );
            }
        }

        async function connect() {
            try {
                const url = unwrapServerAction(
                    await getPortfolioAgentWsUrl(
                        getPostHogSessionId(),
                    ),
                );
                // The provider may unmount while the server resolves the URL.
                if (disposed) return;
                requestIdRef.current = new URL(
                    url,
                ).searchParams.get('request_id');
                const accessToken = new URL(
                    url,
                ).searchParams.get('access_token');
                // Decode identity for local presentation only; the backend verifies it.
                userIdRef.current = accessToken
                    ? (decodeJwt(accessToken).sub ?? null)
                    : null;
                socket = new WebSocket(url);
                wsRef.current = socket;
                setSocketStatus('connecting');

                socket.onopen = () => {
                    if (disposed) return;
                    setSocketStatus('connected');
                    heartbeatTimer = setInterval(() => {
                        if (
                            socket?.readyState ===
                            WebSocket.OPEN
                        )
                            sendMessage(
                                createWsHeartbeatRequest(),
                            );
                    }, HEARTBEAT_INTERVAL_MS);
                };
                socket.onerror = (event) => {
                    if (disposed) return;
                    stopHeartbeat();
                    endAgentTurn();
                    failed = true;
                    setSocketStatus('error');
                    setError(
                        captureApplicationException(
                            'Unable to connect to chat',
                            'The chat connection encountered an error. Please reload the page and try again.',
                            event,
                            {
                                source: 'websocket',
                                operation:
                                    'transport-error',
                                requestId:
                                    requestIdRef.current,
                                ready_state:
                                    socket?.readyState,
                            },
                        ),
                    );
                };
                socket.onclose = (event) => {
                    stopHeartbeat();
                    if (disposed) return;
                    endAgentTurn();
                    if (wsRef.current === socket)
                        wsRef.current = null;
                    if (failed) return;
                    setSocketStatus('closed');
                    if (
                        !event.wasClean ||
                        event.code !== 1000
                    ) {
                        setError(
                            captureApplicationException(
                                'Chat connection closed',
                                'The connection was interrupted. Please reload the page to reconnect.',
                                new Error(
                                    'WebSocket connection interrupted.',
                                ),
                                {
                                    source: 'websocket',
                                    operation: 'close',
                                    requestId:
                                        requestIdRef.current,
                                    close_code: event.code,
                                    was_clean:
                                        event.wasClean,
                                },
                            ),
                        );
                    }
                };
                socket.onmessage = async (event) => {
                    if (disposed) return;
                    try {
                        const response =
                            parseWebSocketResponse(
                                event.data,
                            );
                        switch (response.type) {
                            case WebSocketResponseType.HEARTBEAT:
                                // Heartbeats carry no application state.
                                break;
                            case WebSocketResponseType.AGENT_START:
                                turnActiveRef.current = true;
                                setIsThinking(true);
                                break;
                            case WebSocketResponseType.AGENT_END:
                                endAgentTurn();
                                break;
                            case WebSocketResponseType.AGENT_DELTA:
                                appendAgentDelta(
                                    response.payload,
                                );
                                break;
                            case WebSocketResponseType.TOOL_MESSAGE:
                                // Tool notifications have no presentation state.
                                break;
                            case WebSocketResponseType.AGENT_THINKING_CAPTIONS:
                                setThinkingCaptions(
                                    response.payload,
                                );
                                break;
                            case WebSocketResponseType.SET_USER_TOKEN:
                                await handleWsSetUserToken(
                                    response.payload,
                                );
                                break;
                            case WebSocketResponseType.WARNING:
                                endAgentTurn();
                                setError(
                                    createApplicationError(
                                        'Chat warning',
                                        response.payload,
                                    ),
                                );
                                break;
                            case WebSocketResponseType.ERROR:
                                endAgentTurn();
                                setError(
                                    captureApplicationException(
                                        'Chat error',
                                        response.payload,
                                        new Error(
                                            response.payload,
                                        ),
                                        {
                                            source: 'websocket',
                                            operation:
                                                'agent-response',
                                            requestId:
                                                response
                                                    .meta
                                                    .request_id,
                                            backend_reported: true,
                                        },
                                    ),
                                );
                                break;
                        }
                    } catch (exception) {
                        endAgentTurn();
                        setError(
                            captureApplicationException(
                                'Unable to read the chat response',
                                'The server sent an unexpected response. Please try again.',
                                exception,
                                {
                                    source: 'websocket',
                                    operation:
                                        'parse-response',
                                    requestId:
                                        requestIdRef.current,
                                },
                            ),
                        );
                    }
                };
            } catch (exception) {
                if (disposed) return;
                setSocketStatus('error');
                setError(
                    captureApplicationException(
                        'Unable to start chat',
                        'The chat service could not be reached. Please reload the page and try again.',
                        exception,
                        {
                            source: 'websocket',
                            operation: 'connect',
                        },
                    ),
                );
            }
        }
        void connect();
        return () => {
            disposed = true;
            stopHeartbeat();
            endAgentTurn();
            userIdRef.current = null;
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
    }, [
        setError,
        isSessionLoaded,
        appendAgentDelta,
        finishAgentDeltas,
        setIsThinking,
        setIsResponding,
        setThinkingCaptions,
        sendMessage,
    ]);

    const value = useMemo(
        () => ({
            socketStatus,
            sendMessage,
            sendAgentMessage,
        }),
        [socketStatus, sendMessage, sendAgentMessage],
    );
    return (
        <SocketContext.Provider value={value}>
            {children}
        </SocketContext.Provider>
    );
}

/**
 * Require the chat-route socket provider before accessing the
 * transport.
 */
export function useSocketContext(): SocketContextValue {
    const value = useContext(SocketContext);
    if (!value)
        throw new Error(
            'useSocketContext must be used within a SocketProvider',
        );
    return value;
}
