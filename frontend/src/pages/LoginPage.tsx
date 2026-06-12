import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";
import AuthForm from "../features/auth/components/AuthForm";

export default function LoginPage() {
    const navigate = useNavigate();
    const form = useForm<LoginSchema>();
    const mutation = useLogin();
    const { signIn, isAuthenticated } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/", { replace: true });
        }
    }, [isAuthenticated, navigate]);

    const onSubmit = async (formData: LoginSchema) => {
        await mutation.mutateAsync(formData, {
            onSuccess: async (response) => {
                await signIn(response.token);
                navigate("/", { replace: true });
            }
        })
    }
    
    return (
        <AuthForm
            form={form}
            action="login"
            onSubmit={onSubmit}
        />
    )
}