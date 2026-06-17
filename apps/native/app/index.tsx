import { 
  KeyboardAvoidingView, 
  Pressable,
  StyleSheet, 
  Text, 
  TextInput, 
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    // Ensures UI stays in visible part of the screen 
    // content doesn't get covered by notches, status bars etc.
    <SafeAreaView style={styles.screen}>
      {/* Shifts/resizes children when keyboard appears */}
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboard}
      >
        {/* A View is essentially a div, used to group elements, add spacing, alignment etc. */}
        <View style={styles.card}>
          <Text style={styles.title}>Register</Text>
          <Text style={styles.helper}>
            Already have an account? Log in here
          </Text>
          <View style={styles.field}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              autoCapitalize="none"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
          <Pressable style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// Global styles for the app
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f0eb",
  },
  keyboard: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 20,
    padding: 20,
    gap: 16,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 4,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#1f1f1f",
  },
  helper: {
    fontSize: 14,
    color: "#666",
  },
  field: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
  },
  input: {
    borderWidth: 1,
    borderColor: "#d9d9d9",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: "#111",
    backgroundColor: "#fff",
  },
  hint: {
    fontSize: 12,
    color: "#777",
  },
  button: {
    marginTop: 8,
    backgroundColor: "#111",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 14,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});