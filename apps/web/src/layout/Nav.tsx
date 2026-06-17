import { Button, Flex, Text } from "@radix-ui/themes";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import Link from "../components/ui/Link";
import { useNavigate } from "react-router-dom";

export default function Nav() {
    const { isAuthenticated, signOut } = useAuth();
    const navigate = useNavigate();
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
                <Text onClick={() => navigate("/")}>DaveDHD</Text>
                <Flex gap="5" align="center">
                    {isAuthenticated && (
                        <Link to="/brain-dumps">Brain dumps</Link>
                    )}
                    {isAuthenticated && (
                        <Button onClick={signOut}>Log out</Button>
                    )}
                </Flex>
            </Flex>
        </header>
    )
}