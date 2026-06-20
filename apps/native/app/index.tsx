import { 
  KeyboardAvoidingView,
  View, 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { useForm } from "react-hook-form";
import AuthForm from "@/components/auth/AuthForm";
import { styles } from "@/theme";
import { useRegister } from "@davedhd/features/auth/hooks/useRegister";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import Callout from "@/components/ui/Callout";

export default function Index() {
  const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const mutation = useRegister();
  const { signIn } = useAuth();

  const onSubmit = async (formData: LoginSchema) => {
    mutation.mutate(formData, {
      onSuccess: async (response) => {
        await signIn(response.token);
        form.reset();
      },
      onError: (error) => {
        console.error(error);
      },
    });
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
          {mutation.isError && (
            <View style={{ marginBottom: 16 }}>
              <Callout variant="error" 
                text={mutation.error.message ?? "An error occurred"} 
              />
            </View>
          )}
          <AuthForm
            form={form}
            action="register"
            onSubmit={onSubmit}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}