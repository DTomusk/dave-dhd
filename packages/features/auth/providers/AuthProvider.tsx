import { registerUnauthorizedHandler } from "@davedhd/lib/auth/session";
import { getTokenStore } from "@davedhd/lib/auth/token-store";
import { useQueryClient } from "@tanstack/react-query";
import { createContext, useCallback, useEffect, useState } from "react";

type AuthContextValue = {
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const queryClient = useQueryClient();
    
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => getTokenStore().getToken() !== null
    );

    // useCallback ensures that the signIn and signOut functions are memoized and do not change on every render
    // they don't change often
    const signIn = useCallback((token: string) => {
        getTokenStore().setToken(token);
        setIsAuthenticated(true);
        void queryClient.invalidateQueries({ refetchType: "active" });
    }, [queryClient]);

    const signOut = useCallback(() => {
        getTokenStore().clearToken();
        queryClient.clear();
        setIsAuthenticated(false);
    }, [queryClient]);

    useEffect(() => {
        registerUnauthorizedHandler(signOut);
    }, [signOut]);

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );  
}