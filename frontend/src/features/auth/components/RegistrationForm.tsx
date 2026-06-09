import { Box, Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import FormField from "../../../components/form/FormField";
import PasswordField from "./PasswordField";
import type { LoginSchema } from "../schemas/loginSchema";
import type { UseFormReturn } from "react-hook-form";

interface RegistrationFormProps {
    action: string;
    form: UseFormReturn<LoginSchema>;
    onSubmit: (data: LoginSchema) => void;
}

export default function RegistrationForm({ 
    action, 
    form,
    onSubmit,
}: RegistrationFormProps) {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = form
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
                                id="username-field"
                                error={errors.username}
                                {...register("username")}
                            />

                            <PasswordField
                                label="Password"
                                placeholder="Enter your password"
                                id="password-field"
                                error={errors.password}
                                {...register("password")}
                            />

                            <Flex mt="6" justify="end">
                                <Button type="submit" loading={isSubmitting}>{action}</Button>
                            </Flex>
                        </Card>
                    </form>
                </Box>
            </Flex>
        </Container>
    )
}