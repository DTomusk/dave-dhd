import { createBrowserRouter } from "react-router-dom";
import AppLayout from "../layout/AppLayout";
import HomePage from "../pages/HomePage";
import RegistrationPage from "../pages/RegistrationPage";
import ProtectedLayout from "./ProtectedLayout";
import LoginPage from "../pages/LoginPage";
import BrainDumpPage from "../pages/BrainDumpPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <AppLayout />,
        children: [
            {
                // Routes that need auth go here
                element: <ProtectedLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                    {
                        path: "brain-dumps",
                        element: <BrainDumpPage />,
                    },]      
            },  
            // Anonymously accessible routes go here
            {
                path: "auth",
                children: [{
                    path: "register",
                    element: <RegistrationPage />,
                },{
                    path: "login",
                    element: <LoginPage />,
                }]
            },
            {
                path: "*",
                element: <div>Not found</div>,
            }
        ],
    },
]);