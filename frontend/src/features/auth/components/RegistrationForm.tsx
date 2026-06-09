import { Box, Button, Card, Container, Flex, Heading, Text, TextField } from "@radix-ui/themes";

export default function RegistrationForm() {
    return (
        <Container size="1" minHeight="100vh">
            <Flex minHeight="100vh" align="center" justify="center">
                <Box maxWidth="400px" width="100%">
                    <Card size="4">
                        <Heading as="h3" size="6" trim="start" mb="5">
                            Sign up
                        </Heading>

                        <Box mb="5">
                            <Flex mb="1">
                                <Text
                                    as="label"
                                    htmlFor="username-field"
                                    size="2"
                                    weight="bold"
                                >
                                    Username
                                </Text>
                            </Flex>
                            <TextField.Root
                                placeholder="Enter your username"
                                id="username-field"
                            />
                        </Box>

                        <Box mb="5" position="relative">
                            <Flex mb="1">
                                <Text
                                    as="label"
                                    size="2"
                                    weight="bold"
                                    htmlFor="password-field"
                                >
                                    Password
                                </Text>
                            </Flex>
                            <TextField.Root
                                placeholder="Enter your password"
                                id="password-field"
                            />
                        </Box>

                        <Flex mt="6" justify="end">
                            <Button>Sign in</Button>
                        </Flex>
                    </Card>
                </Box>
            </Flex>
        </Container>
    )
}