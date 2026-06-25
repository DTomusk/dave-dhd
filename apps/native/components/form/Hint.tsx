import { Text, StyleSheet } from "react-native";
import { colors, spacing } from "@/theme/theme";

export default function Hint({ text }: { text: string }) {
  return <Text style={styles.hint}>{text}</Text>;
}

const styles = StyleSheet.create({
  hint: {
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
});