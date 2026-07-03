import { createContext, ReactNode, useMemo, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

type OverlayState = {
    content: ReactNode;
    dismissOnBackdropPress?: boolean;
    backdrop?: boolean;
} | null;

type OverlayContextValue = {
    showOverlay: (overlay: OverlayState) => void;
    hideOverlay: () => void;
};

export const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
    const [overlay, setOverlay] = useState<OverlayState>(null);

    const value = useMemo(() => ({
        showOverlay: setOverlay,
        hideOverlay: () => setOverlay(null),
    }), []);

    return (
        <OverlayContext.Provider value={value}>
            {children}
            {overlay?.backdrop && (
                <Pressable
                    style={StyleSheet.absoluteFill}
                    onPress={() => {
                    if (overlay.dismissOnBackdropPress) {
                        setOverlay(null);
                    }
                    }}
                />
            )}
            {overlay && (
                <View
                    pointerEvents="box-none"
                    style={styles.overlayHost}
                >
                    {overlay.content}
                </View>
            )}
        </OverlayContext.Provider>
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