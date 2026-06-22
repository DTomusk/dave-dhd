import { colors, radius, spacing } from "@/theme/theme";
import { Text, StyleSheet, View } from "react-native";

interface InputErrorProps {
    message: string;
}

export default function InputError({ message }: InputErrorProps) {
    return (
        <View style={styles.errorContainer}>
            <Text style={styles.error}>
                {message}
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    errorContainer: {
        backgroundColor: colors.dangerBg,
        padding: spacing.md,
        borderRadius: radius.md,
        borderColor: colors.dangerBorder,
        borderWidth: 1,
    },
    error: {
        fontSize: 13,
        color: colors.danger,
        lineHeight: 18,
        fontWeight: "500",
    },
})