import type { TokenStore } from "@davedhd/lib/auth/token-store";

let token: string | null = null;

export const memoryTokenStore: TokenStore = {
  getToken() {
    return token;
  },
  setToken(nextToken: string) {
    token = nextToken;
  },
  clearToken() {
    token = null;
  },
};