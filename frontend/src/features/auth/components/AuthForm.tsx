import { Box, Button, Card, Flex, Heading, Text } from "@radix-ui/themes";
import FormField from "../../../components/form/FormField";
import PasswordField from "./PasswordField";
import type { LoginSchema } from "../schemas/loginSchema";
import type { UseFormReturn } from "react-hook-form";
import type { AuthAction } from "../types";
import Link from "../../../components/ui/Link";

type AuthFormProps = {
    form: UseFormReturn<LoginSchema>;
    action: AuthAction;
    onSubmit: (data: LoginSchema) => void;
}

export default function AuthForm(
    { form, action, onSubmit }: AuthFormProps
) {
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    const actionText = action === "login" ? "Log in" : "Register";

    return (
        <Box width="400px">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Card size="4">
                    <Heading as="h3" size="6" trim="start" mb="3">
                        {actionText}
                    </Heading>

                    {/* As p is required for applying margin (otherwise inline) */}
                    <Text as="p" mb="3">
                        {action === "login" ? "Don't have an account? " : "Already have an account? "}
                        {action === "login" ? (
                            <Link to="/auth/register">Register here</Link>
                        ) : (
                            <Link to="/auth/login">Log in here</Link>
                        )}
                    </Text>

                    <FormField
                        label="Username"
                        placeholder="Enter your username"
                        control={control}
                        name="username"
                        rules={{ required: "Username is required",
                            minLength: { value: 3, message: "Username must be at least 3 characters" },
                            maxLength: { value: 50, message: "Username must be at most 50 characters" },
                        }}
                        hint={action === "register" ? "Choose a username with at least 3 characters" : undefined}
                    />

                    <PasswordField
                        label="Password"
                        placeholder="Enter your password"
                        control={control}
                        name="password"
                        rules={{ required: "Password is required",
                            minLength: { value: 6, message: "Password must be at least 6 characters" },
                            maxLength: { value: 50, message: "Password must be at most 50 characters" },
                        }}
                        hint={action === "register" ? "Choose a password with at least 6 characters" : undefined}
                    />

                    <Flex mt="6" justify="end">
                        <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>{actionText}</Button>
                    </Flex>
                </Card>
            </form>
        </Box>
    )
}