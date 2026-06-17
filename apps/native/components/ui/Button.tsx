import { styles } from "@/theme";
import { Text, Pressable } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
}

export default function Button({ title, onPress, variant = "primary", disabled = false }: ButtonProps) {
    const buttonStyle = variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary;
    const textStyle = variant === "primary" ? styles.buttonTextPrimary : styles.buttonTextSecondary;

    return (
        <Pressable style={[styles.buttonBase, buttonStyle]} onPress={onPress} disabled={disabled}>
            <Text style={textStyle}>{title}</Text>
        </Pressable>
    );
}