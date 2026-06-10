import { IconButton } from "@radix-ui/themes";
import { useState } from "react";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import FormField, { type FormFieldProps } from "../../../components/form/FormField";
import type { FieldError, FieldPath, FieldValues } from "react-hook-form";

export default function PasswordField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({ control,
    name,
    label,
    placeholder,
    rules,
    disabled = false,
}: FormFieldProps<TFieldValues, TName> & { error?: FieldError }) {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <FormField
            label={label}
            control={control}
            name={name}
            placeholder={placeholder}
            rules={rules}
            type={showPassword ? "text" : "password"}
            disabled={disabled}
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
        />
    )
}