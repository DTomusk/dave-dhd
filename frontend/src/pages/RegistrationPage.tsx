import { useForm } from "react-hook-form";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useRegister } from "../features/auth/hooks/useRegister";
import { useAuth } from "../features/auth/hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default function RegistrationPage() {
    const navigate = useNavigate();
    const form = useForm<LoginSchema>();
    const mutation = useRegister();
    const { signIn } = useAuth();

    const onSubmit = async (formData: LoginSchema) => {
        console.log("Form submitted:", formData);
        await mutation.mutateAsync(formData, {
            onSuccess: async (response) => {
                console.log("Registration successful:", response);
                await signIn(response.token);
                navigate("/", { replace: true });
            }
        })
    }
    
    return (
        <RegistrationForm
            form={form}
            action="Sign up"
            onSubmit={onSubmit}
        />
    )
}