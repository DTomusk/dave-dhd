import { useForm } from "react-hook-form";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import type { LoginSchema } from "../features/auth/schemas/loginSchema";

export default function RegistrationPage() {
    const form = useForm<LoginSchema>();

    const onSubmit = (data: LoginSchema) => {
        console.log("Form submitted:", data);
    }
    
    return (
        <RegistrationForm
            form={form}
            action="Sign up"
            onSubmit={onSubmit}
        />
    )
}