'use server'
/**
 * @description This file acts as the 
 * interface to backend services.
 */
import { SignJWT } from "jose";
import { APIResponse, AgentMemory } from "@/types/service.types"

// --- Constants ---

const TOKEN_EXPIRY = "1m"
const te = new TextEncoder()

// --- Utility Functions ---

/**
 * Creates a JWT token for the frontend.
 * @returns A JWT token as a string.
 */
export async function createFrontendToken(): Promise<string> {
    const timestamp = new Date().toISOString();
    const secret = te.encode(process.env.FRONTEND_SECRET);
    
    return await new SignJWT({ timestamp })
        .setProtectedHeader({ alg: "HS256" })
        .setIssuedAt()
        .setExpirationTime(TOKEN_EXPIRY)
        .sign(secret);
}

// --- Main Interface Function ---

// Overloads 
async function fetchAPI<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE',
    parsed: true,
    data?: unknown
): Promise<APIResponse<T>>;

async function fetchAPI(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE',
    parsed?: false,
    data?: unknown
): Promise<Response>;

/**
 * Main interface function for 
 * API calls.
 * @param endpoint 
 * @param method 
 * @param data 
 * @returns {Promise<APIResponse<T> | Response>}
 */
async function fetchAPI<T>(
    endpoint: string,
    method: 'GET' | 'POST' | 'DELETE',
    parsed: boolean = true,
    data?: unknown
): Promise<APIResponse<T> | Response> {
    const token = await createFrontendToken();
    const options: RequestInit = {
        method,
        headers: {
            'Content-Type': 'application/json',
            'frontend-token': `${token}`
        },
        credentials: 'include',
    }

    if (method!== 'GET' && data) {
        options.body = JSON.stringify(data);
    }

    const response = await fetch(
        `${process.env.API_URL}${endpoint}`,
        options
    )

    // if (!response.ok) {
    //     throw new Error("Failed to fetch API");
    // }

    if (!parsed) {
        return response
    }

    const responseParsed = await response.json() as APIResponse<T>;
    return responseParsed;
}

// --- Endpoints ---

/**
 * Fetches the user session information.
 * @returns The user session data.
 */
export async function getUserSession(){
    const response = await fetchAPI(
        '/users/session', 
        'GET',
        false
    );
    return response;
}

/**
 * Fetches the agent memory information.
 * @returns The agent memory data.
 */
export async function getAgentMemory(
): Promise<AgentMemory[]> {
    const response = await fetchAPI<AgentMemory[]>(
        '/agent/memory', 
        'GET',
        true
    );
    return response.data;
}

/**
 * Deletes the agent memory information.
 * @returns A boolean indicating success or failure.
 */
export async function deleteAgentMemory(
): Promise<boolean> {
    const response = await fetchAPI(
        '/agent/clear-memory',
        'DELETE',
        true
    );
    return response.metadata.success;
}