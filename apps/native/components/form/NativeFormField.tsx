import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { StyleSheet, TextInput, View } from "react-native";
import InputError from "./InputError";
import { colors, radius, spacing } from "@/theme/theme";
import Label from "./Label";
import Hint from "./Hint";

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
    numberOfLines?: number;
};

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
}: NativeFormFieldProps<TFieldValues, TName>) {
    const { field, fieldState: { error } } = useController({ control, name, rules });

    return (
        <View style={styles.field}>
            {label && <Label text={label} />}
            {hint && <Hint text={hint} />}
            <View>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    placeholderTextColor={styles.placeholder.color}
                    autoCapitalize={autoCapitalize}
                    secureTextEntry={secureTextEntry}
                    value={String(field.value ?? "")}
                    onChangeText={field.onChange}
                    onBlur={field.onBlur}
                    multiline={numberOfLines > 1}
                    numberOfLines={numberOfLines}
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