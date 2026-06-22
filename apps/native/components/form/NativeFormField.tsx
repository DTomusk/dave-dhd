import { styles } from "@/theme/theme";
import { Control, FieldPath, FieldValues, RegisterOptions, useController } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import InputError from "./InputError";

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
            {label && <Text style={styles.label}>{label}</Text>}
            {hint && <Text style={styles.hint}>{hint}</Text>}
            <View style={styles.field}>
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