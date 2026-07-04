import { useCallback } from "react";
import { useOverlay } from "./useOverlay";
import ActionMenu, { Action } from "@/components/ui/ActionMenu";

export function useActionMenu() {
    const { showOverlay } = useOverlay();

    const openActionMenu = useCallback((actions: Action[], closeOnSelect = true) => {
        showOverlay({
            content: (
                <ActionMenu actions={actions} closeOnSelect={closeOnSelect} />
            ),
            dismissOnBackdropPress: true,
            backdrop: true,
        });
    }, [showOverlay]);

    return { openActionMenu };
}