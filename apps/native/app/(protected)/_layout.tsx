import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import { Redirect, Slot, Stack } from "expo-router";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Redirect href="/auth/login" />;
    }

    return (<Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="brain_dumps/index" options={{ title: "Brain Dumps" }} />
        <Stack.Screen name="brain_dumps/[id]" options={{ title: "" }} />
    </Stack>);
}