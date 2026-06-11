import { RouterProvider } from "react-router-dom"
import { router } from "./app/AppRoutes"
import "@radix-ui/themes/styles.css"
import { QueryClientProvider } from "@tanstack/react-query"
import { queryClient } from "./app/queryClient"


function App() {
  return (
    // Allows the query client to be accessed throughout the app
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}

export default App
