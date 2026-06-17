import { InfoCircledIcon } from "@radix-ui/react-icons";
import { Callout as RadixCallout } from "@radix-ui/themes";

type CalloutProps = {
    variant?: "info" | "warning" | "error" | "success";
    text: string;
}

const calloutColorByVariant = {
    info: "blue",
    warning: "yellow",
    error: "red",
    success: "green",
} as const;

export default function Callout({ text, variant }: CalloutProps) {
    const color = calloutColorByVariant[variant ?? "info"];

    return (
        <RadixCallout.Root color={color} variant="surface">
            <RadixCallout.Icon>
                <InfoCircledIcon />
            </RadixCallout.Icon>
            <RadixCallout.Text>
                {text}
            </RadixCallout.Text>
        </RadixCallout.Root>
    )
}