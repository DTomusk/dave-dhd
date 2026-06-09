import { zodResolver } from "@hookform/resolvers/zod/src/index.js";
import RegistrationForm from "../features/auth/components/RegistrationForm";
import { loginSchema, type LoginSchema } from "../features/auth/schemas/loginSchema";
import { useForm } from "react-hook-form";

export default function RegistrationPage() {
    const form = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = (data: LoginSchema) => {
        console.log("Form submitted:", data);
    }
    
    return (
        <RegistrationForm
            action="Sign up"
            form={form}
            onSubmit={onSubmit}
        />
    )
}