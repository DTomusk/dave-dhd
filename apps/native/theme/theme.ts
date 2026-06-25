import { StyleSheet } from "react-native";

// Design tokens
export const colors = {
  bg: "#f4f0eb",
  surface: "#ffffff",
  text: "#1f1f1f",
  textMuted: "#666",
  border: "#d9d9d9",
  primary: "#111111",
  primaryPressed: "#000000",
  primaryText: "#ffffff",
  secondaryText: "#111111",
  danger: "#b42318",
  dangerBg: "#fef3f2",
  dangerText: "#ffffff",
  dangerBorder: "#fecdca",
};

export const spacing = {
  sm: 8,
  md: 12,
  lg: 16,
};

export const radius = {
  md: 12,
  lg: 20,
};

// Global styles for the app
export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  keyboard: {
    flex: 1,
    padding: spacing.lg,
  },
});