import { IconButton, TextField } from "@radix-ui/themes";
import { useState, type ComponentPropsWithoutRef } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import FormField from "../../../components/form/FormField";

interface PasswordFieldProps extends Omit<ComponentPropsWithoutRef<typeof TextField.Root>, "id" | "type"> {
    label: string;
    id: string;
}

export default function PasswordField({ label, id, ...inputProps }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            label={label}
            id={id}
            type={showPassword ? "text" : "password"}
            rightSlot={
                <IconButton
                    type="button"
                    size="1"
                    variant="ghost"
                    highContrast
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <EyeClosedIcon /> : <EyeOpenIcon />}
                </IconButton>
            }
            {...inputProps}
        />
    )
}