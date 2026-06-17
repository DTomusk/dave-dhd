import { Link as RouterLink } from "react-router-dom";
import { Link as ThemeLink } from "@radix-ui/themes";

type LinkProps = {
    to: string;
    children: React.ReactNode;
}

export default function Link({ to, children }: LinkProps) {
    return (
        <ThemeLink asChild>
            <RouterLink to={to}>{children}</RouterLink>
        </ThemeLink>
    )
}