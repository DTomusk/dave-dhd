import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import InputError from "./InputError";
import { colors, radius, spacing } from "@/theme/theme";
import Label from "./Label";
import Hint from "./Hint";
import { useState } from "react";

type NativeFormFieldProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    control: Control<TFieldValues>,
    name: TName,
    label?: string,
    placeholder?: string,
    rules: RegisterOptions<TFieldValues, TName>;
    secureTextEntry?: boolean;
    hint?: string;
    autoCapitalize?: "none" | "sentences" | "words" | "characters";
    // Initial number of lines to display. If greater than 1, the input will be multiline.
    numberOfLines?: number;
    // If true and numberOfLines is greater than 1, the input will expand to fit the content up to a maximum height.
    expandable?: boolean;
};

const MAX_HEIGHT = 200;

export default function NativeFormField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>({ 
    control, 
    name, 
    label,
    placeholder,
    rules,
    secureTextEntry,
    hint,
    autoCapitalize = "none",
    numberOfLines = 1,
    expandable = false,
}: NativeFormFieldProps<TFieldValues, TName>) {
    const { field, fieldState: { error } } = useController({ control, name, rules });
    const minHeight = 40 * numberOfLines; // Minimum height based on number of lines
    const [height, setHeight] = useState(minHeight); // Initial height based on number of lines

    return (
        <View style={styles.field}>
            {label && <Label text={label} />}
            {hint && <Hint text={hint} />}
            <View>
                <TextInput
                    style={[styles.input, expandable && { height }]}
                    placeholder={placeholder}
                    placeholderTextColor={styles.placeholder.color}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    value={String(field.value ?? "")}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    multiline={numberOfLines > 1}
                    numberOfLines={numberOfLines}
                    scrollEnabled={height > MAX_HEIGHT}
                    onContentSizeChange={(event) => {
                        if (expandable) {
                            const newHeight = Math.max(minHeight, event.nativeEvent.contentSize.height);
                            setHeight(Math.min(newHeight, MAX_HEIGHT));
                        }
                    }}
                />
            </View>
            {error && (
                <InputError message={error.message ?? "Unknown error"} />
            )}      
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: colors.border,
        borderRadius: radius.md,
        paddingHorizontal: spacing.md,
        paddingVertical: spacing.sm,
        fontSize: 16,
        color: colors.text,
        backgroundColor: colors.surface,
    },
    placeholder: {
        color: colors.textMuted,
    },
    field: {
        gap: spacing.sm,
    },
})