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

// --- Agent Interactions ---

export interface AgentMemory {
    user_id: string;
    chat_id: string;
    timestamp: string;
    content: string;
    source: 'agent' | 'user';
    canvas: AgentCanvas | null;
}

export interface AgentCanvas {
    id: string;
    content: string;
}