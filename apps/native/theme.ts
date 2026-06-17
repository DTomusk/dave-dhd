import { StyleSheet } from "react-native";

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
  danger: "#ff4d4f",
  dangerText: "#ffffff",
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
    justifyContent: "center",
    padding: spacing.lg,
  },
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
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: colors.text,
  },
  helper: {
    fontSize: 14,
    color: colors.textMuted,
  },
  field: {
    gap: spacing.sm,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.text,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.text,
    backgroundColor: colors.surface,
  },
  hint: {
    fontSize: 12,
    color: colors.textMuted,
  },
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
  error: {
    fontSize: 12,
    color: colors.danger,
  },
  placeholder: {
    color: colors.textMuted,
  },
});