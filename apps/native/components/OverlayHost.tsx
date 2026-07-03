import { ReactNode } from "react";
import { StyleSheet, View } from "react-native";

// TODO: not sure about best place for this component yet
export function OverlayHost({ children }: { children: ReactNode }) {
    if (!children) {
        return null;
    }

    return (
        <View
            pointerEvents="box-none"
            style={styles.overlayHost}
        >
            {children}
        </View>
    );
}

const styles = StyleSheet.create({
    overlayHost: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1000,
    },
});