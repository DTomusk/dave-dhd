import { Box, TextField, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";
import FormFieldLabel from "./FormFieldLabel";
import { useController, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import { CircleAlert } from 'lucide-react';

export type FormFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    control: Control<TFieldValues>,
    name: TName,
    label?: string,
    placeholder?: string,
    rightSlot?: ReactNode,
    rules?: RegisterOptions<TFieldValues, TName>,

    type?: "text" | "password",
    disabled?: boolean,
}

export default function FormField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({ 
    control,
    name,
    label,
    placeholder,
    rules,
    type = "text",
    disabled = false,
    rightSlot,
}: FormFieldProps<TFieldValues, TName>) {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    return (
        <Box mb="5">
            {label && <FormFieldLabel htmlFor={name} label={label} />}
            <TextField.Root
                {...field}
                value={field.value ?? ""}
                placeholder={placeholder}
                type={type}
                disabled={disabled}
                color={error ? "red" : undefined}
            >
                {error && <TextField.Slot side="left">
                    <CircleAlert size={16} color="red" />
                </TextField.Slot>}
                {rightSlot ? <TextField.Slot side="right">{rightSlot}</TextField.Slot> : null}
            </TextField.Root>
            {error && (
                <Text size="2" color="red">
                    {error.message}
                </Text>
            )}
        </Box>
    );
}