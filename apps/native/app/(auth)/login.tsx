import AuthForm from "@/components/auth/AuthForm";
import Callout from "@/components/ui/Callout";
import { styles } from "@/theme";
import { useAuth } from "@davedhd/features/auth/hooks/useAuth";
import { useLogin } from "@davedhd/features/auth/hooks/useLogin";
import { LoginSchema } from "@davedhd/features/auth/schemas/loginSchema";
import { useRouter } from "expo-router";
import { useForm } from "react-hook-form";
import { KeyboardAvoidingView, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Login() {
    const form = useForm<LoginSchema>({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const router = useRouter();

  const mutation = useLogin();
  const { signIn } = useAuth();

  const onSubmit = async (formData: LoginSchema) => {
    mutation.mutate(formData, {
      onSuccess: async (response) => {
        await signIn(response.token);
        form.reset();
        router.push("/");
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
            action="login"
            onSubmit={onSubmit}
          />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}