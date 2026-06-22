import { StyleSheet, Text } from "react-native";
import { colors } from "@/theme/theme";

export default function Title({ text }: { text: string }) {
  return <Text style={styles.title}>{text}</Text>;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 28,
        fontWeight: "700",
        color: colors.text,
    },
})