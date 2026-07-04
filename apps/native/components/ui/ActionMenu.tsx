import { useOverlay } from "@/hooks/useOverlay";
import Button from "./Button";
import { View } from "react-native";

export type Action = {
    label: string;
    onPress: () => void;
}

type ActionMenuProps = {
    actions: Action[];
    closeOnSelect?: boolean;
}

export default function ActionMenu({ actions, closeOnSelect = true }: ActionMenuProps) {
    const { hideOverlay } = useOverlay();

    return (
        <View>
            {actions.map(action => (
                <Button
                    key={action.label}
                    title={action.label}
                    onPress={() => {
                        action.onPress();
                        if (closeOnSelect) {
                            hideOverlay();
                        }
                    }}
                />
            ))}
        </View>
    );
}