import { Box, Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import FormField from "../../../components/form/FormField";
import PasswordField from "./PasswordField";
import type { LoginSchema } from "../schemas/loginSchema";
import type { UseFormReturn } from "react-hook-form";

type RegistrationFormProps = {
    form: UseFormReturn<LoginSchema>;
    action: string;
    onSubmit: (data: LoginSchema) => void;
}

export default function RegistrationForm(
    { form, action, onSubmit }: RegistrationFormProps
) {
    const { handleSubmit, control, formState: { isSubmitting } } = form;

    return (
        // Container centers content and defines width
        <Container size="1" minHeight="100vh">
            {/* Flex centers the card both vertically and horizontally */}
            <Flex minHeight="100vh" align="center" justify="center">
                {/* Box defines the maximum width of the card */}
                <Box maxWidth="400px" width="100%">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card size="4">
                            <Heading as="h3" size="6" trim="start" mb="5">
                                {action}
                            </Heading>

                            <FormField
                                label="Username"
                                placeholder="Enter your username"
                                control={control}
                                name="username"
                                rules={{ required: "Username is required",
                                    minLength: { value: 3, message: "Username must be at least 3 characters" },
                                    maxLength: { value: 50, message: "Username must be at most 50 characters" },
                                }}
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
                            />

                            <Flex mt="6" justify="end">
                                <Button type="submit" loading={isSubmitting} disabled={isSubmitting}>{action}</Button>
                            </Flex>
                        </Card>
                    </form>
                </Box>
            </Flex>
        </Container>
    )
}