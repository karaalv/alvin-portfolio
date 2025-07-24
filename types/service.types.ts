/**
 * @description This file contains type 
 * and interface definitions for the
 * service layer of the application.
 */

// --- Agent Interactions ---

export interface AgentMemory {
    user_id: string;
    chat_id: string;
    timestamp: string;
    content: string;
    source: 'agent' | 'user';
    canvas: string[] | null;
}