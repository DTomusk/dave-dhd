import { getToken } from "../auth/token";
import { ApiError } from "./error";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

// This function should be called for all API requests
export async function apiFetch<T>(
    endpoint: string, 
    options: RequestInit = {}
): Promise<T> {
    // Replace with auth token retrieval logic
    let token = getToken();

    // Attempt API request
    let response = await sendRequest(endpoint, options, token);

    // TODO: once refreshes are implemented, check if initial response is 401
    // If so, try refreshing and calling again

    // Handle error response
    if (!response.ok) {
        await handleErrorResponse(response);
    }

    const data = await parseResponse(response);
    return data as T;
}

// This function is responsible for making the actual fetch call, with proper headers and body handling
async function sendRequest(
    endpoint: string,
    options: RequestInit,
    token: string | null,
) {
    const isFormData = options.body instanceof FormData;

    const headers = buildHeaders(options, isFormData, token);

    const shouldSerialize =
        options.body &&
        !isFormData &&
        typeof options.body === 'object' &&
        !(options.body instanceof Blob);

    const body = shouldSerialize
        ? JSON.stringify(options.body)
        : options.body;

    return fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
        body,
        credentials: 'include',
    });
}

// Builds headers for request
function buildHeaders(
    options: RequestInit,
    isFormData: boolean,
    token: string | null,
) {
    const shouldSetJsonContentType =
        !isFormData && options.body;

    return {
        ...(options.headers || {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...(shouldSetJsonContentType ? { 'Content-Type': 'application/json' } : {}),
    };
}

async function parseResponse(response: Response) {
    const text = await response.text();

    if (!text) {
        return null;
    }

    try {
        return JSON.parse(text);
    } catch {
        return text;
    }
}

async function handleErrorResponse(response: Response) {
    const errorText = await response.text();
    let errorData: any = {};

    try {
        errorData = errorText ? JSON.parse(errorText) : {};
    } catch (e) {
        // If response isn't JSON, use raw text
        errorData = { message: errorText || 'An error occurred' };
    }

    throw new ApiError(errorData.message || 'An error occurred', response.status, errorData);
}