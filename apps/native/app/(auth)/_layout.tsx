import { styles } from "@/theme";
import { Slot } from "expo-router";
import { KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Currently, all routes in auth require keyboard avoiding view and safe area view, so we can wrap all auth routes in this layout for now
// If we add new routes that don't need those, we can remove them 
// TODO: redirect if user already logged in
export default function AuthLayout() {
    return (
        // Ensures UI stays in visible part of the screen 
        // content doesn't get covered by notches, status bars etc.
        <SafeAreaView style={styles.screen}>
            {/* Shifts/resizes children when keyboard appears */}
            <KeyboardAvoidingView
            behavior="padding"
            style={styles.keyboard}
            >
                <Slot />
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}