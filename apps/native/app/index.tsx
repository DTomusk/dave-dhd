import {KeyboardAvoidingView, Pressable, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  return (
    // Ensures UI stays in visible part of the screen 
    // content doesn't get covered by notches, status bars etc.
    <SafeAreaView>
      {/* Shifts/resizes children when keyboard appears */}
      <KeyboardAvoidingView
        behavior="padding"
      >
        {/* A View is essentially a div, used to group elements, add spacing, alignment etc. */}
        <View>
          <Text>Register</Text>
          <Text>
            Already have an account? Log in here
          </Text>
          <View>
            <Text>Username</Text>
            <TextInput
              placeholder="Enter your username"
              autoCapitalize="none"
            />
          </View>
          <View>
            <Text>Password</Text>
            <TextInput
              placeholder="Enter your password"
              secureTextEntry
            />
          </View>
          <Pressable onPress={() => {}}>
            <Text>Register</Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
