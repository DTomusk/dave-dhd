export interface TokenStore {
    getToken(): string | null;
    setToken(token: string): void;
    clearToken(): void;
}

let _store: TokenStore;

export function initTokenStore(store: TokenStore): void {
    _store = store;
}

export function getTokenStore(): TokenStore {
    return _store;
}