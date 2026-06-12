import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import ProtectedLayout from "./ProtectedLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                element: <ProtectedLayout />,
                children: [
                {
                    index: true,
                    element: <HomePage />,
                }]      
            },          
            {
                path: "auth",
                children: [{
                    path: "register",
                    element: <RegistrationPage />,
                }]
            }
        ],
    },
]);