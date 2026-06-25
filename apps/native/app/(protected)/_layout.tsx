import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import { Redirect, Slot } from "expo-router";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/auth/login" />;
    }

    return <Slot />;
}