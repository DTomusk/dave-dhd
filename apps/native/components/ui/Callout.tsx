import { View, Text, StyleSheet } from "react-native";
import { radius, spacing } from "@/theme/theme";

type CalloutProps = {
  variant?: "info" | "warning" | "error" | "success";
  text: string;
  title?: string;
};

const toneByVariant = {
  info: {
    accent: "#2563eb",
    background: "#eff6ff",
    text: "#1e3a8a",
    label: "Info",
  },
  warning: {
    accent: "#d97706",
    background: "#fffbeb",
    text: "#92400e",
    label: "Warning",
  },
  error: {
    accent: "#dc2626",
    background: "#fef2f2",
    text: "#991b1b",
    label: "Error",
  },
  success: {
    accent: "#16a34a",
    background: "#f0fdf4",
    text: "#166534",
    label: "Success",
  },
} as const;

export default function Callout({
  variant = "info",
  text,
  title,
}: CalloutProps) {
  const tone = toneByVariant[variant];

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: tone.background,
          borderColor: tone.accent,
        },
      ]}
    >
      <View style={[styles.accent, { backgroundColor: tone.accent }]} />
      <View style={styles.content}>
        <Text style={[styles.title, { color: tone.text }]}>
          {title ?? tone.label}
        </Text>
        <Text style={[styles.text, { color: tone.text }]}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    borderWidth: 1,
    borderRadius: radius.md,
    overflow: "hidden",
  },
  accent: {
    width: 4,
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    gap: 4,
  },
  title: {
    fontSize: 13,
    fontWeight: "700",
  },
  text: {
    fontSize: 14,
    lineHeight: 20,
  },
});