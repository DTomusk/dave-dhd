import { type LoginSchema } from "../features/auth/schemas/loginSchema";
import { useForm } from "react-hook-form";
import { Box, Button, Card, Container, Flex, Heading, TextField, Text } from "@radix-ui/themes";
import FormFieldLabel from "../components/form/FormFieldLabel";

export default function RegistrationPage() {
    const {
        register,
        handleSubmit,
        formState: { isSubmitting, errors },
    } = useForm<LoginSchema>();

    const onSubmit = (data: LoginSchema) => {
        console.log("Form submitted:", data);
    }
    
    return (
        // <RegistrationForm
        //     action="Sign up"
        //     form={form}
        //     onSubmit={onSubmit}
        // />
        <Container size="1" minHeight="100vh">
            {/* Flex centers the card both vertically and horizontally */}
            <Flex minHeight="100vh" align="center" justify="center">
                {/* Box defines the maximum width of the card */}
                <Box maxWidth="400px" width="100%">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Card size="4">
                            <Heading as="h3" size="6" trim="start" mb="5">
                                Sign up
                            </Heading>

                            <Box mb="5">
                                <FormFieldLabel htmlFor={"username-field"} label={"Username"} />
                                <TextField.Root
                                    id={"username-field"}
                                />
                            </Box>

                            <Box mb="5">
                                <FormFieldLabel htmlFor={"password-field"} label={"Password"} />
                                <TextField.Root
                                    id={"password-field"}
                                />
                            </Box>

                            <Flex mt="6" justify="end">
                                <Button type="submit" loading={isSubmitting}>Sign up</Button>
                            </Flex>
                        </Card>
                    </form>
                </Box>
            </Flex>
        </Container>
    )
}