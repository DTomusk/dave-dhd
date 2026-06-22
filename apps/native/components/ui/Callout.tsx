import { View, Text, StyleSheet, Animated, Pressable } from "react-native";
import { radius, spacing } from "@/theme/theme";
import { useEffect, useRef, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

type CalloutProps = {
  variant?: "info" | "warning" | "error" | "success";
  text: string;
  title?: string;
  disappearAfter?: number; // in milliseconds
  fadeLength?: number; // in milliseconds
  onDismiss?: () => void;
  dismissable?: boolean;
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
  disappearAfter,
  fadeLength,
  onDismiss,
  dismissable = false,
}: CalloutProps) {
  const tone = toneByVariant[variant];
  const [visible, setVisible] = useState(true);
  const opacity = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Don't worry if already invisible
    if (!visible) return;
    // If visible and no disappear after, don't set a timer
    if (!disappearAfter || disappearAfter <= 0) return;

    // Visible and disappear after: set timer
    const timer = setTimeout(() => {
      // Hide after timer and call onDismiss if provided
      Animated.timing(opacity, {
        toValue: 0,
        duration: fadeLength ?? 300,
        useNativeDriver: true,
      }).start(() => {
        setVisible(false);
        onDismiss?.();
      });
    }, disappearAfter);

    // Cleanup function to clear the timer if the component unmounts or if visible/disappearAfter changes
    return () => clearTimeout(timer);
  }, [visible, disappearAfter, fadeLength, onDismiss, text, title, variant]);

  if (!visible) return null;

  return (
    <Animated.View style={{ opacity }}>
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
          <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
            <Text style={[styles.title, { color: tone.text }]}>
              {title ?? tone.label}
            </Text>
            {dismissable && (
              <Pressable
              onPress={() => {
                Animated.timing(opacity, {
                  toValue: 0,
                  duration: fadeLength ?? 300,
                  useNativeDriver: true,
                }).start(() => {
                  setVisible(false);
                  onDismiss?.();
                });
              }}
              hitSlop={12}
              style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1 })}
            >
              <Ionicons name="close" size={16} color={tone.text} />
            </Pressable>
            )}
          </View>
          <Text style={[styles.text, { color: tone.text }]}>{text}</Text>
        </View>
      </View>
    </Animated.View>
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