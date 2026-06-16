import { useEffect } from "react";
import { useForm } from "react-hook-form";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useRegister } from "../features/auth/hooks/useRegister";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AuthForm from "../features/auth/components/AuthForm";
import Callout from "../components/ui/Callout";
import { Flex } from "@radix-ui/themes";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const form = useForm<LoginSchema>();
    const mutation = useRegister();
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
                action="register"
                onSubmit={onSubmit}
            />
        </Flex>
    )
}