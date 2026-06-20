import { Stack } from "expo-router";
import { createQueryClient } from "@davedhd/lib/api/queryClient"
import { initTokenStore } from '@davedhd/lib/auth/token-store'
import { initApiClient } from '@davedhd/lib/api/client'
import { QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@davedhd/features/auth/providers/AuthProvider"
import { memoryTokenStore } from "@/lib/token";
import { SafeAreaProvider } from "react-native-safe-area-context";

const queryClient = createQueryClient();
initTokenStore(memoryTokenStore);
initApiClient(process.env.EXPO_PUBLIC_API_URL ?? "");

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SafeAreaProvider>
          <Stack />
        </SafeAreaProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}
