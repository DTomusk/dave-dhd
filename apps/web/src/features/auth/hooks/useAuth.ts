import { useContext } from "react";
import { AuthContext } from "../../../app/AuthProvider";

// Hook to access auth context (which includes sign in and sign out functions)
// If we're not in the auth context, throw an error
export function useAuth() {
    const ctx = useContext(AuthContext);

    if (!ctx) {
        throw new Error("useAuth must be used within an AuthProvider");
    }

    return ctx;
}