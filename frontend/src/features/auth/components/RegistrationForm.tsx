import { Box, Button, Card, Container, Flex, Heading } from "@radix-ui/themes";
import FormField from "../../../components/form/FormField";
import PasswordField from "./PasswordField";

interface RegistrationFormProps {
    action: string;
}

export default function RegistrationForm({ action }: RegistrationFormProps) {
    return (
        // Container centers content and defines width
        <Container size="1" minHeight="100vh">
            {/* Flex centers the card both vertically and horizontally */}
            <Flex minHeight="100vh" align="center" justify="center">
                {/* Box defines the maximum width of the card */}
                <Box maxWidth="400px" width="100%">
                    <Card size="4">
                        <Heading as="h3" size="6" trim="start" mb="5">
                            {action}
                        </Heading>

                        <FormField
                            label="Username"
                            placeholder="Enter your username"
                            id="username-field"
                        />

                        <PasswordField
                            label="Password"
                            placeholder="Enter your password"
                            id="password-field"
                        />

                        <Flex mt="6" justify="end">
                            <Button>{action}</Button>
                        </Flex>
                    </Card>
                </Box>
            </Flex>
        </Container>
    )
}