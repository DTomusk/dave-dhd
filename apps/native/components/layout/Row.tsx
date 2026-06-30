import { StyleSheet, View } from "react-native";

export default function Row({ children }: { children: React.ReactNode }) {
    return (
        <View style={styles.row}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
    },
});