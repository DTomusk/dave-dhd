import { Box, Flex, Text, TextArea } from "@radix-ui/themes";
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
    maxLength?: number,
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
    maxLength,
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
            <Flex justify="end" mt="1" gap="2">
            {error && (
                <Text size="2" color="red">
                    {error.message}
                </Text>
            )}
            {maxLength && (
                <Text size="2" color="gray">
                    {field.value?.length ?? 0}/{maxLength}
                </Text>
            )}
            {hint && !error && (
                <Text size="2" color="gray">
                    {hint}
                </Text>
            )}
            </Flex>
        </Box>
    );
}