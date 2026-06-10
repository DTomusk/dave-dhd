import { useForm } from "react-hook-form";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";
import { useRegister } from "../features/auth/hooks/useRegister";

export default function RegistrationPage() {
    const form = useForm<LoginSchema>();
    const mutation = useRegister();

    const onSubmit = async (formData: LoginSchema) => {
        console.log("Form submitted:", formData);
        const data = await mutation.mutateAsync(formData);

        // TODO: handle jwt 
        console.log("Registration successful, received data:", data);
    }
    
    return (
        <RegistrationForm
            form={form}
            action="Sign up"
            onSubmit={onSubmit}
        />
    )
}