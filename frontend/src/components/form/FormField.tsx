import { Box, TextField, Text } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef, ReactNode } from "react";
import FormFieldLabel from "./FormFieldLabel";
import { type FieldError } from "react-hook-form";

interface FormFieldProps extends Omit<ComponentPropsWithoutRef<typeof TextField.Root>, "id"> {
    label: string;
    id: string;
    rightSlot?: ReactNode;
    error?: FieldError;
}

export default function FormField({ 
    label, 
    id, 
    rightSlot, 
    error, 
    ...inputProps
}: FormFieldProps) {
    return (
        // TODO: might not want vertical spacing in this component
        <Box mb="5">
            <FormFieldLabel htmlFor={id} label={label} />
            <TextField.Root
                id={id}
                {...inputProps}
            >
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