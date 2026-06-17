export interface TokenStore {
    getToken(): string | null;
    setToken(token: string): void;
    clearToken(): void;
}

let _store: TokenStore | undefined;

export function initTokenStore(store: TokenStore): void {
    if (!store) throw new Error("Token store must be provided");
    if (
        typeof store.getToken !== "function" ||
        typeof store.setToken !== "function" ||
        typeof store.clearToken !== "function"
    ) {
        throw new Error("Token store must implement getToken, setToken, and clearToken methods");
    }
    _store = store;
}

export function getTokenStore(): TokenStore {
    if (!_store) throw new Error("Token store is not initialized");
    return _store;
}