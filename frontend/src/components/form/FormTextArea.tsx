import { Box, Text, TextArea } from "@radix-ui/themes";
import FormFieldLabel from "./FormFieldLabel";
import { useController, type Control, type FieldPath, type FieldValues, type RegisterOptions } from "react-hook-form";
import type { ComponentPropsWithoutRef } from "react";

type NativeTextAreaProps = Omit<
  ComponentPropsWithoutRef<typeof TextArea>,
  "name" | "value" | "defaultValue" | "onChange" | "onBlur" | "ref"
>;


export type FormTextAreaProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    control: Control<TFieldValues>,
    name: TName,
    label?: string,
    placeholder?: string,
    rules?: RegisterOptions<TFieldValues, TName>,

    disabled?: boolean,
    hint?: string,
} & NativeTextAreaProps;

export default function FormTextArea<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({ 
    control,
    name,
    label,
    rules,
    disabled = false,
    hint,
    ...textAreaProps
}: FormTextAreaProps<TFieldValues, TName>) {
    const {
        field,
        fieldState: { error },
    } = useController({ control, name, rules });
    return (
        <Box mb="5">
            {label && <FormFieldLabel htmlFor={name} label={label} />}
            <TextArea
                {...field}
                {...textAreaProps}
                value={field.value ?? ""}
                disabled={disabled}
                color={error ? "red" : undefined}
            />
            {error && (
                <Text size="2" color="red">
                    {error.message}
                </Text>
            )}
            {hint && !error && (
                <Text size="2" color="gray">
                    {hint}
                </Text>
            )}
        </Box>
    );
}