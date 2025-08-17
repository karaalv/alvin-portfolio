/**
 * @description This file contains type 
 * and interface definitions for the
 * service layer of the application.
 */

// --- API Interactions ---

export interface MetaData {
    success: boolean;
    message: string;
    timestamp: string;
}

export interface APIResponse<T> {
    metadata: MetaData;
    data: T;
}

export interface SocketResponse<T> {
    metadata: MetaData;
    type: string;
    data: T;
}

export interface SocketMessage {
    type: string;
    input: string;
}

// --- Agent Interactions ---

export interface AgentMemory {
    id: string;
    user_id: string;
    source: 'agent' | 'user';
    content: string;
    created_at: string;
    agent_canvas: AgentCanvas | null;
}

export interface AgentCanvas {
    id: string;
    title: string;
    content: string;
}