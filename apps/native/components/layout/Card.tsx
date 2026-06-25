import { colors, radius, spacing } from "@/theme/theme";
import { View, StyleSheet, Pressable } from "react-native";

type CardProps = {
    children: React.ReactNode;
    onPress?: () => void;
};

export default function Card({ children, onPress }: CardProps) {
    if (onPress) {
        return (
            <Pressable style={styles.card} onPress={onPress}>
                {children}
            </Pressable>
        );
    }
    
    return (
        <View style={styles.card}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: colors.surface,
        borderRadius: radius.lg,
        padding: spacing.lg,
        gap: spacing.md,
        shadowColor: "#000",
        shadowOpacity: 0.08,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 8 },
        elevation: 4,
      },     
});