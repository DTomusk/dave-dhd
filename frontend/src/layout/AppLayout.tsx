import { Box, Flex } from "@radix-ui/themes";
import { Outlet } from "react-router-dom";
import Nav from "./Nav";

export default function AppLayout() {
    return (
        <Box minHeight="100vh">
            <Nav />
            <main>
                <Flex align="center" justify="center" minHeight="calc(100vh - 73px)">
                    <Outlet />
                </Flex>
            </main>
        </Box>
    )
}