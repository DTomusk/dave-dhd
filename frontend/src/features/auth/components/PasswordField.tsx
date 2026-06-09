import { Box, IconButton, TextField } from "@radix-ui/themes";
import FormFieldLabel from "../../../components/form/FormFieldLabel";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

interface PasswordFieldProps {
    label: string;
    placeholder: string;
    id: string;
}

export default function PasswordField({ label, placeholder, id }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <Box mb="5">
            <FormFieldLabel htmlFor={id} label={label} />
            <TextField.Root
                placeholder={placeholder}
                id={id}
                type={showPassword ? "text" : "password"}
            >
                <TextField.Slot side="right">
                    <IconButton 
                        type="button"
                        size="1"
                        variant="ghost"
                        highContrast
                        onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? (
                            <EyeClosedIcon />
                        ) : (
                            <EyeOpenIcon />
                        )}
                    </IconButton>
                </TextField.Slot>
            </TextField.Root>
        </Box>
    )
}