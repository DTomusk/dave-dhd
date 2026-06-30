import { Pressable, StyleSheet } from "react-native";

export default function IconButton({ icon, onPress }: { icon: React.ReactNode; onPress: () => void }) {
    return (
        <Pressable
          hitSlop={10}
          onPress={(e) => {
            e.stopPropagation();
            onPress();
          }}
          style={({ pressed }) => [{ opacity: pressed ? 0.6 : 1 }, styles.iconButton]}
        >
          {icon}
        </Pressable>
    )
}

const styles = StyleSheet.create({
    iconButton: {
        padding: 8,
        borderRadius: 8,
        alignItems: "center",
        justifyContent: "center",
    },
});