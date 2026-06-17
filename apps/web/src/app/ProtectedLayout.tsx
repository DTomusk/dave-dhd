import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";

export default function ProtectedLayout() {
    const { isAuthenticated } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/auth/login" replace />;
    }
    
    return <Outlet />;
}