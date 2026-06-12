import { Button, Flex, Text } from "@radix-ui/themes";
import { useAuth } from "../features/auth/hooks/useAuth";

export default function Nav() {
    const { isAuthenticated, signOut } = useAuth();
    return (
        <header
            style={{
                position: "sticky",
                top: 0,
                zIndex: 10,
                padding: "1rem 0",
                borderBottom: "1px solid var(--gray-5)",
                background: "var(--color-panel)",
            }}
        >
            <Flex align="center" justify="between">
                <Text>DaveDHD</Text>
                {isAuthenticated && (
                    <Button onClick={signOut}>Log out</Button>
                )}
            </Flex>
        </header>
    )
}