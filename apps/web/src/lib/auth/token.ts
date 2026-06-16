import type { TokenStore } from "../../../../../packages/lib/auth/token-store";

const JWT_TOKEN_KEY = "jwt";

export function getToken(): string | null {
    return localStorage.getItem(JWT_TOKEN_KEY);
}

export function setToken(token: string): void {
    localStorage.setItem(JWT_TOKEN_KEY, token);
}

export function clearToken(): void {
    localStorage.removeItem(JWT_TOKEN_KEY);
}

// Web implementation of TokenStore using localStorage
export const localStorageTokenStore: TokenStore = {
    getToken,
    setToken,
    clearToken,
};