import { StyleSheet, Text } from "react-native";
import { colors } from "@/theme/theme";

export default function Label({ text }: { text: string }) {
  return <Text style={styles.label}>{text}</Text>;
}

const styles = StyleSheet.create({
    label: {
        fontSize: 14,
        fontWeight: "600",
        color: colors.text,
    },
})