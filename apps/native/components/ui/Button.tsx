import { colors, radius, spacing } from "@/theme/theme";
import { Text, Pressable, StyleSheet, ActivityIndicator } from "react-native";

type ButtonProps = {
    title: string;
    onPress: () => void;
    variant?: "primary" | "secondary";
    disabled?: boolean;
    isLoading?: boolean;
}

export default function Button({ title, onPress, variant = "primary", disabled = false, isLoading = false }: ButtonProps) {
    const buttonStyle = variant === "primary" ? styles.buttonPrimary : styles.buttonSecondary;
    const textStyle = variant === "primary" ? styles.buttonTextPrimary : styles.buttonTextSecondary;

    return (
        <Pressable style={[styles.buttonBase, buttonStyle, disabled && styles.buttonDisabled]} onPress={onPress} disabled={disabled}>
            {isLoading ? <ActivityIndicator color={textStyle.color} /> : <Text style={textStyle}>{title}</Text>}
        </Pressable>
    );
}

const styles = StyleSheet.create({
    buttonBase: {
    marginTop: spacing.sm,
    backgroundColor: colors.primary,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    minHeight: 48,
    paddingVertical: spacing.md,
  },
  buttonPrimary: {
    backgroundColor: colors.primary,
  },
  buttonSecondary: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  buttonTextBase: {
    fontSize: 16,
    fontWeight: "600",
  },
  buttonTextPrimary: {
    color: colors.primaryText,
  },
  buttonTextSecondary: {
    color: colors.secondaryText,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
})