import { OverlayContext } from "@/providers/OverlayProvider";
import { useContext } from "react";

export function useOverlay() {
    const ctx = useContext(OverlayContext);
    if (!ctx) {
        throw new Error("useOverlay must be used within an OverlayProvider");
    }

    return ctx;
}