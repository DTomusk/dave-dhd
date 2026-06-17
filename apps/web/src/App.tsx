import { RouterProvider } from "react-router-dom"
import { router } from "./app/AppRoutes"
import "@radix-ui/themes/styles.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "@davedhd/features/auth/providers/AuthProvider"
import { createQueryClient } from "@davedhd/lib/api/queryClient"

const queryClient = createQueryClient();

function App() {
  return (
    // Allows the query client to be accessed throughout the app
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
