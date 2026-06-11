import { useForm } from "react-hook-form";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useRegister } from "../features/auth/hooks/useRegister";
import { useAuth } from "../lib/auth/useAuth";

export default function RegistrationPage() {
    const form = useForm<LoginSchema>();
    const mutation = useRegister();
    const { signIn } = useAuth();

    const onSubmit = async (formData: LoginSchema) => {
        console.log("Form submitted:", formData);
        const data = await mutation.mutateAsync(formData);

        // TODO: handle jwt 
        console.log("Registration successful, received data:", data);
        signIn(data.token);
    }
    
    return (
        <RegistrationForm
            form={form}
            action="Sign up"
            onSubmit={onSubmit}
        />
    )
}