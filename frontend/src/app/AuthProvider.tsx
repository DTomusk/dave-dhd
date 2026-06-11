import { createContext, useState } from "react";
import { queryClient } from "./queryClient";
import { clearToken, getToken, setToken } from "../lib/auth/token";

type AuthContextValue = {
    isAuthenticated: boolean;
    signIn: (token: string) => void;
    signOut: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
        () => getToken() !== null
    );

    const signIn = (token: string) => {
        setToken(token);
        setIsAuthenticated(true);
        void queryClient.invalidateQueries({ refetchType: "active" });
    };

    const signOut = () => {
        clearToken();
        queryClient.clear();
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, signIn, signOut }}>
            {children}
        </AuthContext.Provider>
    );  
}