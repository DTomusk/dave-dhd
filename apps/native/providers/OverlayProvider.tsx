import { createContext, ReactNode, useMemo, useState } from "react";

type OverlayContextValue = {
    showOverlay: (overlay: ReactNode) => void;
    hideOverlay: () => void;
};

export const OverlayContext = createContext<OverlayContextValue | null>(null);

export function OverlayProvider({ children }: { children: ReactNode }) {
    const [overlay, setOverlay] = useState<ReactNode>(null);

    const value = useMemo(() => ({
        showOverlay: setOverlay,
        hideOverlay: () => setOverlay(null),
    }), []);

    return (
        <OverlayContext.Provider value={value}>
            {children}
            {overlay}
        </OverlayContext.Provider>
    );

}