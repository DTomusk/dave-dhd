import { RouterProvider } from "react-router-dom"
import { router } from "./app/AppRoutes"
import "@radix-ui/themes/styles.css"

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App
