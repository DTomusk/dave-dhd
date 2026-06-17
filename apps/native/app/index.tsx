import { 
  KeyboardAvoidingView, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { useForm } from "react-hook-form";
import AuthForm from "@/components/auth/AuthForm";
import { styles } from "@/theme";

export default function Index() {
  const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });
  const onSubmit = async (formData: LoginSchema) => {
    // Handle form submission logic here
    console.log("Form submitted:", formData);
    form.reset(); // Reset the form after submission
  }

  return (
    // Ensures UI stays in visible part of the screen 
    // content doesn't get covered by notches, status bars etc.
    <SafeAreaView style={styles.screen}>
      {/* Shifts/resizes children when keyboard appears */}
      <KeyboardAvoidingView
        behavior="padding"
        style={styles.keyboard}
      >
          <AuthForm
            form={form}
            action="register"
            onSubmit={onSubmit}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}