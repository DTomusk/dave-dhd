import { ChevronLeftIcon } from "lucide-react";
import { Button, Text } from "@radix-ui/themes";
import { useNavigate } from "react-router-dom";

type BackLinkProps = {
    to: string;
    text?: string;
}

export default function BackLink({ to, text = "Back" }: BackLinkProps) {
    const navigate = useNavigate();
    return (
        <Button variant="ghost" onClick={() => navigate(to)}>
            <ChevronLeftIcon size={16} />
            <Text size="3">{text}</Text>
        </Button>
    );
}