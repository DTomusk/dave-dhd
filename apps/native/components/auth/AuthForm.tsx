import NativeFormField from "../form/NativeFormField";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { UseFormReturn } from "react-hook-form";
import type { AuthAction } from "@davedhd/features/auth/types";
import Button from "../ui/Button";
import { useRouter } from "expo-router";
import Card from "../layout/Card";
import Title from "../ui/Title";


type AuthFormProps = {
    form: UseFormReturn<LoginSchema>;
    action: AuthAction;
    onSubmit: (data: LoginSchema) => void;
}

export default function AuthForm({ form, action, onSubmit }: AuthFormProps) {
    const { handleSubmit, control, formState } = form;
    const router = useRouter();

    const actionText = action === "login" ? "Log in" : "Register";

    return (
        <Card
            header={<Title text={actionText} />}>
            <NativeFormField
                control={control}
                name="username"
                label="Username"
                placeholder="Enter your username"
                rules={{ 
                    required: "Username is required",
                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                    maxLength: { value: 50, message: "Username must be at most 50 characters" },
                }}
            />
            <NativeFormField
                control={control}
                name="password"
                label="Password"
                placeholder="Enter your password"
                rules={{ 
                    required: "Password is required",
                    minLength: { value: 6, message: "Password must be at least 6 characters" },
                    maxLength: { value: 50, message: "Password must be at most 50 characters" },
                }}
                secureTextEntry
            />
            <Button
                title={actionText}
                onPress={handleSubmit(onSubmit)}
                variant="primary"
                disabled={formState.isSubmitting}
                isLoading={formState.isSubmitting}
            />
            <Button
                title={action === "login" ? "Register" : "Log in"}
                onPress={() => {
                    router.replace(action === "login" ? "/auth/register" : "/auth/login");
                }}
                variant="secondary"
                disabled={formState.isSubmitting}
            />
        </Card>
    )
}