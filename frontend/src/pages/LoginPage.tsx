import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useLogin } from "../features/auth/hooks/useLogin";
import AuthForm from "../features/auth/components/AuthForm";
import Callout from "../components/ui/Callout";
import { Flex } from "@radix-ui/themes/dist/cjs/components/index.js";

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
        const response = await mutation.mutateAsync(formData);
        await signIn(response.token);
        navigate("/", { replace: true });
    }
    
    return (
        <Flex direction="column" gap="6">
            {mutation.isError && (
                <Callout variant="error"
                    text={mutation.error.message}
                />
            )}
            <AuthForm
                form={form}
                action="login"
                onSubmit={onSubmit}
            />
        </Flex>
    )
}